import { useEffect, useState } from 'react';

const INTRO_DELAY = 900; // ms: اول خط‌های راهنما کشیده می‌شوند

/** پیشرفت نوشتن از ۰ تا ۱؛ با تغییر `run` از اول شروع می‌شود. */
export function useWriteProgress(run, length) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }
    const duration = 1400 + length * 260;
    let start;
    let id;
    const tick = (now) => {
      start ??= now;
      const k = (now - start - INTRO_DELAY) / duration;
      setProgress(Math.min(1, Math.max(0, k)));
      if (k < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
    // عمداً فقط به `run` وابسته است: طول متن همان لحظهٔ شروع خوانده می‌شود
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return progress;
}
