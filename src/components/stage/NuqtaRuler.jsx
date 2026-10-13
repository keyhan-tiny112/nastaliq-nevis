import { NUQTA } from '@/constants/nastaliq';
import { diamondPath } from '@/lib/geometry';
import { toPersianDigits } from '@/lib/persian';

const MAX_DIAMONDS = 120;

/**
 * خط‌کش «نقطه»: لوزی‌ها دقیقاً به اندازهٔ پهنای جوهر کلمه‌اند و بالای بلندترین نقطهٔ آن می‌نشینند
 * (rulerY = خط اندازهٔ حروف). پهنای هر حرف هم همزمان با قلم ظاهر می‌شود.
 */
export function NuqtaRuler({ rulerY, inkLeft, inkRight, right, width, chars, progress }) {
  const count = Math.min(Math.floor((inkRight - inkLeft) / NUQTA), MAX_DIAMONDS);
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          className="nuqta"
          d={diamondPath(inkRight - (i + 0.5) * NUQTA, rulerY + 26)}
          style={{ animationDelay: `${0.3 + i * 0.014}s` }}
        />
      ))}
      {chars.map(([x, w], i) => (
        <g key={i} className={`bracket${progress >= (right - x) / width ? ' is-on' : ''}`}>
          <path d={`M${x} ${rulerY - 6}v12M${x + w} ${rulerY - 6}v12M${x} ${rulerY}H${x + w}`} />
          <text className="stage-label" x={x + w / 2} y={rulerY - 12} textAnchor="middle">
            {toPersianDigits(Math.round((w / NUQTA) * 2) / 2)}
          </text>
        </g>
      ))}
    </>
  );
}
