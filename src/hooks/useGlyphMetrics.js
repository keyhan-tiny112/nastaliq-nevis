import { useLayoutEffect, useState } from 'react';
import { measureInk } from '@/lib/inkMetrics';

const NON_LETTER = /[\s\u064B-\u065F\u0670]/; // فاصله و اعراب

/** کرانهٔ متن و محدودهٔ هر حرف را از خود SVG می‌خواند. */
export function useGlyphMetrics(textRef, text, fontVersion) {
  const [metrics, setMetrics] = useState({ left: -150, right: 150, chars: [], ink: { ascent: 0, descent: 0, left: -150, right: 150 } });

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const box = el.getBBox();
    const chars = [];
    try {
      for (let i = 0; i < text.length; i++) {
        if (NON_LETTER.test(text[i])) continue;
        const r = el.getExtentOfChar(i);
        if (r.width > 2) chars.push([r.x, r.width]);
      }
    } catch {
      /* برخی مرورگرها getExtentOfChar را پشتیبانی نمی‌کنند */
    }
    setMetrics({ left: box.x, right: box.x + box.width, chars, ink: measureInk(text) });
  }, [textRef, text, fontVersion]);

  return metrics;
}
