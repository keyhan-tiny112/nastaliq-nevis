import { useEffect, useState } from 'react';
import { FONT_FAMILY, FONT_SIZE } from '@/constants/nastaliq';

/**
 * عددی که با هر بار بارگذاری فونت بالا می‌رود؛ وابستگیِ اندازه‌گیری حروف.
 * (فونت‌ها بر اساس unicode-range تکه‌تکه و تنبل بارگذاری می‌شوند.)
 */
export function useFontVersion() {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    let alive = true;
    const bump = () => alive && setVersion((v) => v + 1);
    document.fonts.load(`${FONT_SIZE}px ${FONT_FAMILY}`, 'نستعلیق').then(bump, bump);
    document.fonts.addEventListener('loadingdone', bump);
    return () => {
      alive = false;
      document.fonts.removeEventListener('loadingdone', bump);
    };
  }, []);
  return version;
}
