import { IconBase } from './IconBase';

/** همبرگر منو که با open به ✕ تبدیل می‌شود (حرکت در styles/icons.css) */
export function MenuIcon({ open }) {
  return (
    <IconBase className="menu-icon" data-open={open}>
      <path d="M4 7h16" className="menu-icon__top" />
      <path d="M4 12h16" className="menu-icon__mid" />
      <path d="M4 17h16" className="menu-icon__bot" />
    </IconBase>
  );
}
