'use client';

import { Trophy, History, Play, Cloud } from 'lucide-react';

import type { ExamController } from '../hooks/use-exam';

// Identidade do site e navegação entre as três abas.
export function ExamHeader({ controller }: { controller: Pick<ExamController, 'attempts' | 'activeTab' | 'handleSwitchTab'> }) {
  const { attempts, activeTab, handleSwitchTab } = controller;
  return (<><header className="sticky top-0 z-30 bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9900] to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Cloud className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  Simulado <span className="text-[#FF9900]">AWS SAA-C03</span>
                </h1>
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  Solutions Architect
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Banco Oficial de 30 Questões • Nota de Corte: 720/1000
              </p>
            </div>
          </div>

          {/* Navegação por Abas */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => handleSwitchTab('simulado')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'simulado'
                  ? 'bg-[#FF9900] text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Simulado</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('ranking')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ranking'
                  ? 'bg-[#FF9900] text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Ranking</span>
              {attempts.length > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === 'ranking'
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {attempts.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('historico')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'historico'
                  ? 'bg-[#FF9900] text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Gabaritos</span>
            </button>
          </nav>
        </div>
      </header></>);
}
