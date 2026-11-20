import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const modules = new Map();

// Carrega os módulos puros do projeto sem precisar iniciar o servidor Next.js.
function loadTypeScript(file) {
  if (modules.has(file)) return modules.get(file);
  const compiledModule = { exports: {} };
  modules.set(file, compiledModule.exports);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const loadDependency = (name) => {
    const resolved = path.resolve(path.dirname(file), name);
    return loadTypeScript(fs.existsSync(`${resolved}.ts`) ? `${resolved}.ts` : `${resolved}/index.ts`);
  };
  Function('exports', 'require', 'module', compiled)(compiledModule.exports, loadDependency, compiledModule);
  return compiledModule.exports;
}

const { QUESTIONS_DB: bank } = loadTypeScript(`${project}/features/exam/data/questions.ts`);
const rules = loadTypeScript(`${project}/features/exam/exam-rules.ts`);
assert.equal(rules.EXAM_DURATION_SECONDS, 7800);
assert(bank.length >= 65);

// Repetir o sorteio detecta questões duplicadas e perda das cotas por domínio.
for (let run = 0; run < 50; run++) {
  const selected = rules.selectExamQuestions(bank);
  assert.equal(selected.length, 65);
  assert.equal(new Set(selected.map((question) => question.id)).size, 65);
  const quotas = { 'Segurança': 19, 'Resiliência': 17, 'Alto Desempenho': 16, 'Otimização de Custos': 13 };
  for (const [domain, count] of Object.entries(quotas)) {
    assert.equal(selected.filter((question) => question.domain === domain).length, count);
  }
}
assert.throws(() => rules.selectExamQuestions(bank.slice(0, 10)), /insuficiente/);
const singleDomain = bank.map((question) => ({ ...question, domain: 'Segurança' }));
assert.equal(rules.selectExamQuestions(singleDomain).length, 65);

// Seleção parcial não vale acerto, e a ordem dos cliques não altera a correção.
const multi = bank.find((question) => question.requiredCount > 1);
assert(!rules.createAnswerRecord(multi, multi.correctIndices.slice(0, 1)).isCorrect);
assert(rules.createAnswerRecord(multi, [...multi.correctIndices].reverse()).isCorrect);
const completed = rules.completeAnswers(bank.slice(0, 65), [rules.createAnswerRecord(bank[0], bank[0].correctIndices)]);
assert.equal(completed.length, 65);
assert.equal(completed.filter((answer) => answer.isCorrect).length, 1);
assert.equal(completed.filter((answer) => !answer.selectedIndices.length).length, 64);
console.log('Regras verificadas: sorteio, pesos aproximados, duração, respostas múltiplas e questões pendentes.');

