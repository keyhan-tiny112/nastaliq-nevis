import { IconBase } from './IconBase';

// حرکت (تکان خوردن هنگام hover/focus) در styles/icons.css است
export function RulerIcon() {
  return (
    <IconBase className="ruler-icon">
      <g className="ruler-icon__body">
        <rect x="2" y="8" width="20" height="8" rx="2" />
        <path d="M6 8v3M10 8v4M14 8v3M18 8v4" />
      </g>
    </IconBase>
  );
}
