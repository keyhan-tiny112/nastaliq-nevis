// لایهٔ نازک روی کتابخانهٔ metal-fx؛ تنظیمات پیش‌فرض پروژه فقط اینجا نگه‌داری می‌شود.
// اگر WebGL2 در دسترس نباشد، خود metal-fx فرزند را بدون افکت نشان می‌دهد.
// اگر افکت در زمان اجرا خطا بدهد، همان فرزند ساده نمایش داده می‌شود تا صفحه خراب نشود.
import { MetalFx } from 'metal-fx';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function MetalFrame({ children, theme = 'light', preset = 'chromatic', strength = 1 }) {
  return (
    <ErrorBoundary fallback={children}>
      <MetalFx preset={preset} strength={strength} theme={theme} style={{ display: 'flex', width: '100%' }}>
        {children}
      </MetalFx>
    </ErrorBoundary>
  );
}
