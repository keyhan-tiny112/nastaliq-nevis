import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const EXIT_MS = 200; // باید با مدت انیمیشن بستن در card.css یکی باشد
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * پنجرهٔ مک به صورت مدل: روی همهٔ عناصر (portal در body) باز می‌شود، پشتش را تار می‌کند،
 * با دایرهٔ قرمز، کلیک روی پس‌زمینه یا Escape بسته می‌شود. چرخش/افکت موس ندارد.
 */
export function Card({ open, onClose, title, children, blur = 10, className = '' }) {
  const [mounted, setMounted] = useState(open); // برای انیمیشن بسته‌شدن، کمی بیشتر در DOM می‌ماند
  const windowRef = useRef(null);
  const closeRef = useRef(onClose);
  const pressedOnBackdrop = useRef(false);
  const titleId = useId();
  closeRef.current = onClose;

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const id = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open || !mounted) return;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // پشت مدل اسکرول نشود
    windowRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') return closeRef.current?.();
      if (e.key !== 'Tab') return;
      // فوکوس داخل پنجره می‌ماند
      const items = [...(windowRef.current?.querySelectorAll(FOCUSABLE) ?? [])];
      if (!items.length) return e.preventDefault();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === windowRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`card-overlay ${className}`.trim()}
      data-state={open ? 'open' : 'closed'}
      style={{ '--card-blur': `${blur}px` }}
      // بستن فقط وقتی که هم فشردن و هم رها کردن روی پس‌زمینه باشد (انتخاب متن داخل کارت اشتباهی نبندد)
      onMouseDown={(e) => {
        pressedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedOnBackdrop.current && e.target === e.currentTarget) onClose?.();
      }}
    >
      <section
        ref={windowRef}
        className="card__window"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        <header className="card__bar">
          <span className="card__dots">
            <button type="button" className="card__dot card__dot--close" aria-label="بستن" onClick={onClose} />
            <i className="card__dot card__dot--min" aria-hidden="true" />
            <i className="card__dot card__dot--max" aria-hidden="true" />
          </span>
          {title && (
            <span id={titleId} className="card__title">
              {title}
            </span>
          )}
        </header>
        <div className="card__body">{children}</div>
      </section>
    </div>,
    document.body,
  );
}