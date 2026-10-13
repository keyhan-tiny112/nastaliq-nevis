import { useRef } from 'react';
import {
  BOTTOM_PAD,
  FONT_FAMILY,
  FONT_SIZE,
  MIN_BASELINE_Y,
  NARROW_BREAKPOINT,
  NUQTA,
  RULER_GAP,
  RULER_HEADROOM,
} from '@/constants/nastaliq';
import { useFontVersion } from '@/hooks/useFontVersion';
import { useGlyphMetrics } from '@/hooks/useGlyphMetrics';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useWriteProgress } from '@/hooks/useWriteProgress';
import { AlifMeasure } from './AlifMeasure';
import { GuideLines } from './GuideLines';
import { NuqtaRuler } from './NuqtaRuler';


export function NastaliqStage({ text, run, guides }) {
  const narrow = useMediaQuery(`(max-width: ${NARROW_BREAKPOINT - 1}px)`);
  const textRef = useRef(null);
  const fontVersion = useFontVersion();
  const { left, right, chars, ink } = useGlyphMetrics(textRef, text, fontVersion);
  const progress = useWriteProgress(run, text.length);

  const width = Math.max(right - left, 1);
  const side = narrow ? 90 : 150;
  const viewWidth = Math.max(narrow ? 420 : 720, width + side * 2);
  // ارتفاع بوم از خودِ کلمه می‌آید: خط‌کش همیشه بالای بلندترین نقطهٔ جوهر است، نه داخل کلمه
  const baseline = Math.max(MIN_BASELINE_Y, ink.ascent + RULER_HEADROOM);
  const rulerY = baseline - ink.ascent - RULER_GAP;
  const viewHeight = baseline + Math.max(ink.descent, 5 * NUQTA + 12) + BOTTOM_PAD;
  const penX = right - progress * width; // قلم از راست به چپ حرکت می‌کند
  const done = progress >= 1;

  return (
    <section className="stage" aria-label="خروجی نستعلیق">
      <svg
        className="stage__svg"
        style={{ minWidth: Math.round(viewWidth * 0.55) }}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        role="img"
        aria-label={`نوشتن «${text}» به خط نستعلیق`}
      >
        <defs>
          <clipPath id="reveal">
            <rect x={penX - (done ? 400 : 0)} y={0} width={right - penX + (done ? 800 : 60)} height={viewHeight} />
          </clipPath>
        </defs>

        {/* key={run}: با هر پخش دوباره، انیمیشن‌های CSS از اول شروع می‌شوند */}
        <g key={run} transform={`translate(${viewWidth / 2} 0)`}>
          {guides && (
            <>
              <GuideLines viewWidth={viewWidth} baseline={baseline} showLabels={!narrow} />
              <NuqtaRuler
                rulerY={rulerY}
                inkLeft={ink.left}
                inkRight={ink.right}
                right={right}
                width={width}
                chars={chars}
                progress={progress}
              />
              <AlifMeasure x={Math.max(right, ink.right) + 40} baseline={baseline} />
            </>
          )}

          <g clipPath="url(#reveal)">
            <text
              ref={textRef}
              x={0}
              y={baseline}
              textAnchor="middle"
              direction="rtl"
              fontSize={FONT_SIZE}
              fill="var(--fg)"
              style={{ fontFamily: FONT_FAMILY }}
            >
              {text}
            </text>
          </g>
        </g>
      </svg>
    </section>
  );
}
