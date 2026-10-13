import { NUQTA } from '@/constants/nastaliq';
import { diamondPath } from '@/lib/geometry';

/** پشتهٔ پنج‌نقطه‌ای کنار حرف اول: ارتفاع الف نستعلیق */
export function AlifMeasure({ x, baseline }) {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          className="nuqta"
          d={diamondPath(x, baseline - (i + 0.5) * NUQTA)}
          style={{ animationDelay: `${0.9 + i * 0.1}s` }}
        />
      ))}
      <text className="stage-label" x={x} y={baseline + 22} textAnchor="middle">
        الف = ۵ نقطه
      </text>
    </>
  );
}
