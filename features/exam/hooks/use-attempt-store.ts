'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ExamAttempt, RankingEntry } from '../types';
import { STORAGE_KEY, NAME_STORAGE_KEY } from '../constants';
import { ensureStudySession } from '../../../lib/supabase/client';
import { fetchOwnAttempts, saveCloudAttempt, fetchGlobalRanking } from '../services/attempt-repository';

export type CloudStatus = 'connecting' | 'syncing' | 'ready' | 'offline' | 'error';

// O cache permite continuar offline. O banco confirma os IDs para não duplicar tentativas reenviadas.
export function useAttemptStore(setCandidateName: Dispatch<SetStateAction<string>>) {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [cloudRanking, setCloudRanking] = useState<RankingEntry[]>([]);
  const [hasGlobalRanking, setHasGlobalRanking] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>('connecting');
  const [pendingCount, setPendingCount] = useState(0);
  const [cloudError, setCloudError] = useState('');
  const attemptsRef = useRef<ExamAttempt[]>([]);
  const syncing = useRef(false);
  const active = useRef(true);

  const remember = useCallback((records: ExamAttempt[]) => {
    attemptsRef.current = records;
    setAttempts(records);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); return true; }
    catch { return false; }
  }, []);

  const refreshRanking = useCallback(async () => {
    if (syncing.current || !active.current) return;
    if (!navigator.onLine) { setCloudStatus('offline'); return; }
    syncing.current = true;
    setCloudStatus('syncing');
    setCloudError('');
    try {
      await ensureStudySession();
      const remote = await fetchOwnAttempts();
      const cloudIds = new Set(remote.map((attempt) => attempt.id));
      const pending = attemptsRef.current.filter((attempt) => !cloudIds.has(attempt.id));
      if (!active.current) return;
      setPendingCount(pending.length);
      const uploaded: ExamAttempt[] = [];
      let rejected = 0;
      for (const attempt of pending) {
        try { uploaded.push(await saveCloudAttempt(attempt)); }
        catch (error) { rejected++; console.error('Tentativa mantida localmente para reenvio:', error); }
        if (!active.current) return;
      }
      // Preserva resultados criados durante uma requisição e os antigos que ainda não foram aceitos.
      const canonical = new Map([...remote, ...uploaded].map((attempt) => [attempt.id, attempt]));
      const local = attemptsRef.current.filter((attempt) => !canonical.has(attempt.id));
      const combined = [...canonical.values(), ...local].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (!active.current) return;
      remember(combined);
      if (uploaded.length) setSaveSuccess(true);
      setPendingCount(local.length);
      const ranking = await fetchGlobalRanking(combined);
      if (!active.current) return;
      setCloudRanking(ranking);
      setHasGlobalRanking(true);
      setCloudStatus(rejected ? 'error' : local.length ? 'syncing' : 'ready');
      if (rejected) setCloudError('Algumas tentativas continuam neste navegador e ainda não foram aceitas pelo banco. Você pode tentar sincronizar novamente.');
    } catch (error) {
      if (!active.current) return;
      console.error('Não foi possível sincronizar as tentativas:', error);
      setCloudStatus(navigator.onLine ? 'error' : 'offline');
      setCloudError('Não foi possível atualizar o banco agora. Suas tentativas locais serão reenviadas ao reconectar.');
    } finally { syncing.current = false; }
  }, [remember]);

  useEffect(() => {
    active.current = true;
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((attempt): attempt is ExamAttempt => Boolean(attempt && typeof attempt.id === 'string' && typeof attempt.candidateName === 'string' && Array.isArray(attempt.answers)));
          attemptsRef.current = valid;
          setAttempts(valid);
        }
        const name = window.localStorage.getItem(NAME_STORAGE_KEY);
        if (name) setCandidateName(name);
      } catch (error) { console.error('Erro ao ler dados locais:', error); }
      finally { setLoadingHistory(false); }
      void refreshRanking();
    }, 0);
    const refresh = () => { if (document.visibilityState === 'visible') void refreshRanking(); };
    const online = () => { void refreshRanking(); };
    const offline = () => setCloudStatus('offline');
    const polling = window.setInterval(refresh, 30000);
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      active.current = false;
      window.clearTimeout(timer);
      window.clearInterval(polling);
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [refreshRanking, setCandidateName]);

  const saveAttempt = useCallback((attempt: ExamAttempt) => {
    setSaveSuccess(remember([attempt, ...attemptsRef.current.filter((item) => item.id !== attempt.id)]));
    setPendingCount((count) => count + 1);
    void refreshRanking();
  }, [remember, refreshRanking]);

  // Offline: o rótulo da tela deixa claro quando só o ranking deste navegador está disponível.
  const localRanking: RankingEntry[] = [...attempts].sort((a, b) => b.awsScore - a.awsScore || a.timeSeconds - b.timeSeconds || b.createdAt.localeCompare(a.createdAt))
    .map((attempt) => ({ ...attempt, canReview: true, detailId: attempt.id }));
  return { attempts, rankedAttempts: hasGlobalRanking ? cloudRanking : localRanking, rankingSource: hasGlobalRanking ? 'global' : 'local',
    loadingHistory, saveSuccess, setSaveSuccess, saveAttempt, refreshRanking, cloudStatus, cloudError, pendingCount };
}
