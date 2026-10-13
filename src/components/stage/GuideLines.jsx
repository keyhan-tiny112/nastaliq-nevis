import { NUQTA } from '@/constants/nastaliq';

export function GuideLines({ viewWidth, baseline, showLabels }) {
  const half = viewWidth / 2;
  const lines = [
    { label: 'هوا', y: baseline - 6 * NUQTA, base: false },
    { label: 'زمین (کرسی)', y: baseline, base: true },
    { label: 'عمق', y: baseline + 5 * NUQTA, base: false },
  ];
  return lines.map(({ label, y, base }, i) => (
    <g key={label}>
      <line
        className={`guide-line${base ? ' guide-line--base' : ''}`}
        x1={-half + 16}
        x2={half - 16}
        y1={y}
        y2={y}
        style={{ '--length': viewWidth, animationDelay: `${i * 0.15}s` }}
      />
      {showLabels && (
        <text className="stage-label stage-label--muted" x={-half + 64} y={y - 7} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  ));
}
