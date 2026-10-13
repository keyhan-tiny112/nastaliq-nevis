import { FONT_FAMILY, FONT_SIZE } from '@/constants/nastaliq';

/** متن نستعلیق را روی canvas می‌کشد و Blob تصویر PNG برمی‌گرداند. */
export async function renderTextToBlob(text, { scale = 2, padding = 70 } = {}) {
  const size = FONT_SIZE * scale;
  const font = `${size}px ${FONT_FAMILY}`;
  await document.fonts.load(font, text);
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.direction = 'rtl';
  const metrics = ctx.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent || size * 0.8;
  const descent = metrics.actualBoundingBoxDescent || size * 0.5;

  canvas.width = Math.ceil(metrics.width + padding * 2);
  canvas.height = Math.ceil(ascent + descent + padding * 2);

  const css = getComputedStyle(document.body);
  ctx.fillStyle = css.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = css.color;
  ctx.font = font; // با تغییر اندازهٔ canvas تنظیمات ریست می‌شود
  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, padding + ascent);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png'),
  );
}

export async function copyImageToClipboard(blob) {
  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
}

export function downloadBlob(blob, filename = 'nastaliq.png') {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
