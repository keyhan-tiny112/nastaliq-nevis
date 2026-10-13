// اندازه‌ها در دستگاه مختصات SVG (viewBox) هستند، نه پیکسل صفحه.
export const FONT_SIZE = 96;
export const FONT_FAMILY = '"Noto Nastaliq Urdu", serif';

/** «نقطه» واحد اندازه‌گیری در نستعلیق است (عرض قلم). الف ≈ ۵ نقطه. */
export const NUQTA = FONT_SIZE / 9;

export const MIN_BASELINE_Y = 270; // کمترین فاصلهٔ خط زمین (کرسی) از بالای بوم
export const RULER_HEADROOM = 80; // جای خط‌کش نقطه بالای بلندترین نقطهٔ کلمه
export const RULER_GAP = 48; // فاصلهٔ خط اندازهٔ حروف تا بالای جوهر کلمه
export const BOTTOM_PAD = 40;

export const DEFAULT_TEXT = 'نستعلیق';
export const MAX_LENGTH = 40;
export const NARROW_BREAKPOINT = 600;
export const THEME_STORAGE_KEY = 'nastaliq-theme';
