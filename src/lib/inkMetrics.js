import { FONT_FAMILY, FONT_SIZE } from '@/constants/nastaliq';

let ctx;
const getCtx = () => (ctx ??= document.createElement('canvas').getContext('2d'));

/**
 * کرانهٔ واقعیِ «جوهر» کلمه نسبت به نقطهٔ وسط‌چین (x=0) و خط زمین (y=0).
 * نستعلیق بالا و پایین خط زمین می‌زند، پس ارتفاع باید از خود نوشته خوانده شود.
 */
export function measureInk(text) {
  const c = text && getCtx();
  if (!c) return { ascent: 0, descent: 0, left: 0, right: 0 };
  c.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
  c.direction = 'rtl';
  c.textAlign = 'center';
  c.textBaseline = 'alphabetic';
  const m = c.measureText(text);
  const num = (v, d) => (Number.isFinite(v) ? v : d);
  return {
    ascent: num(m.actualBoundingBoxAscent, FONT_SIZE * 1.3),
    descent: num(m.actualBoundingBoxDescent, FONT_SIZE * 0.8),
    left: -num(m.actualBoundingBoxLeft, m.width / 2),
    right: num(m.actualBoundingBoxRight, m.width / 2),
  };
}
