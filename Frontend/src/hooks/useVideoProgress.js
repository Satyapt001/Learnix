import { useEffect, useRef } from 'react';
import api from '../lib/api';

export default function useVideoProgress(moduleId, enabled = true) {
  const lastSent = useRef(0);

  useEffect(() => {
    if (!enabled || !moduleId) return;
    // Load server progress (stub returns 0) and local fallback
    const local = Number(localStorage.getItem(`vp:${moduleId}`) || 0);
    (async () => {
      try {
        const r = await api.get(`/videos/${moduleId}/progress`);
        const serverT = Number(r.data?.lastTime || 0);
        const start = Math.max(serverT, local);
        if (start) window.dispatchEvent(new CustomEvent('video:resume', { detail: { moduleId, time: start } }));
      } catch {
        if (local) window.dispatchEvent(new CustomEvent('video:resume', { detail: { moduleId, time: local } }));
      }
    })();
  }, [moduleId, enabled]);

  const onTime = async (timeSec) => {
    if (!enabled || !moduleId) return;
    localStorage.setItem(`vp:${moduleId}`, String(timeSec));
    const now = Date.now();
    if (now - lastSent.current > 5000) {
      lastSent.current = now;
      try {
        await api.post(`/videos/${moduleId}/progress`, { lastTime: Math.floor(timeSec), completed: false });
      } catch {
        // ignore
      }
    }
  };

  const onComplete = async () => {
    if (!enabled || !moduleId) return;
    try {
      await api.post(`/videos/${moduleId}/progress`, { lastTime: Number(localStorage.getItem(`vp:${moduleId}`) || 0), completed: true });
    } catch {
      // ignore
    }
  };

  return { onTime, onComplete };
}