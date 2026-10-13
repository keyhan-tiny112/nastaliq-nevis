/**
 * label هم برای دسترس‌پذیری است و هم در منوی موبایل کنار آیکون دیده می‌شود
 * (در دسکتاپ با CSS مخفی است).
 */
export function IconButton({ label, className = '', children, ...props }) {
  return (
    <button type="button" className={`icon-btn ${className}`.trim()} aria-label={label} title={label} {...props}>
      {children}
      <span className="icon-btn__label" aria-hidden="true">
        {label}
      </span>
    </button>
  );
}