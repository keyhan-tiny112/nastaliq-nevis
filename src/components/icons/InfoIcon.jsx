import { useEffect, useRef, useState } from 'react';
import { IconBase } from './IconBase';

/**
 * آیکون «i» با دو انیمیشن CSS:
 *  - hover/focus: نقطه می‌پرد و ساقه کمی کش می‌آید
 *  - click: حلقه دوباره کشیده می‌شود، ساقه و نقطه دوباره ظاهر می‌شوند و موجی بیرون می‌رود
 * کلیک را از نزدیک‌ترین button/a والد می‌خواند، پس لازم نیست onClick بدهی.
 * حرکت‌ها در styles/icons.css هستند.
 */
export function InfoIcon() {
  const anchorRef = useRef(null);
  const [clicks, setClicks] = useState(0); // تغییر key، انیمیشن را از اول پخش می‌کند
  const [active, setActive] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    const host = anchor?.closest('button, a, [role="button"]') ?? anchor?.ownerSVGElement;
    if (!host) return;
    const onClick = () => {
      setClicks((c) => c + 1);
      setActive(true);
    };
    host.addEventListener('click', onClick);
    return () => host.removeEventListener('click', onClick);
  }, []);

  return (
    <IconBase className="info-icon">
      <g ref={anchorRef}>
        <g key={clicks} className={active ? 'info-icon__burst' : undefined}>
          <circle cx="12" cy="12" r="10" pathLength="1" className="info-icon__ring" />
          {active && (
            <circle cx="12" cy="12" r="10" className="info-icon__ripple" onAnimationEnd={() => setActive(false)} />
          )}
          <path d="M12 17v-6" pathLength="1" className="info-icon__stem" />
          <path d="M12 7.5h.01" className="info-icon__dot" />
        </g>
      </g>
    </IconBase>
  );
}
