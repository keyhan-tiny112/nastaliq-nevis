const DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** 2.5 → «۲٫۵» */
export const toPersianDigits = (value) =>
  String(value)
    .replace(/\d/g, (d) => DIGITS[d])
    .replace('.', '٫');
