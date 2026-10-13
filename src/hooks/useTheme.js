import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { THEME_STORAGE_KEY } from '@/constants/nastaliq';

const readStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

/** تم روشن/تاریک (پیش‌فرض روشن) با انیمیشن circle-reveal از View Transitions API */
export function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* حالت خصوصی مرورگر */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      flushSync(() => setTheme(next));
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) apply();
    else document.startViewTransition(apply);
  }, [theme]);

  return { theme, toggle };
}
