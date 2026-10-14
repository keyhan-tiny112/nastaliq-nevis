import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { TextField } from '@/components/TextField';
import { Toast } from '@/components/Toast';
import { NastaliqStage } from '@/components/stage/NastaliqStage';
import { DEFAULT_TEXT } from '@/constants/nastaliq';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { copyImageToClipboard, downloadBlob, renderTextToBlob } from '@/lib/exportImage';
import { About } from '@/components/About';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { message, show } = useToast();
  const [text, setText] = useState(DEFAULT_TEXT);
  const [guides, setGuides] = useState(true);
  const [run, setRun] = useState(0);
  const shown = useDebouncedValue(text, 350);

  // هر بار متن (بعد از مکث تایپ) عوض شد، نوشتن از اول پخش می‌شود
  useEffect(() => {
    setRun((r) => r + 1);
  }, [shown]);

  const replay = () => setRun((r) => r + 1);

  const copyImage = async () => {
    if (!shown.trim()) return;
    // رندر و کپی همزمان شروع می‌شوند تا clipboard.write همان لحظهٔ کلیک
    // (داخل user activation) صدا زده شود؛ وگرنه GitHub Pages کپی را رد می‌کند.
    const blobPromise = renderTextToBlob(shown);
    try {
      await copyImageToClipboard(blobPromise);
      show('تصویر کپی شد');
    } catch {
      try {
        downloadBlob(await blobPromise);
        show('کپی ممکن نشد؛ تصویر دانلود شد');
      } catch {
        show('خطا در ساخت تصویر');
      }
    }
  };

  return (
    <>
      <Navbar
        theme={theme}
        guides={guides}
        onCopy={copyImage}
        onToggleTheme={toggleTheme}
        onToggleGuides={() => setGuides((g) => !g)}
        onReplay={replay}
      />
      <main className="page">
        <TextField value={text} onChange={setText} theme={theme} />
        <NastaliqStage text={shown} run={run} guides={guides} />
        <p className="caption">
          هر ◇ یک «نقطه» (پهنای قلم) است. اعداد بالا پهنای هر حرف را به نقطه نشان می‌دهند؛ خط‌های هوا و زمین تقریبی‌اند.
        </p>
        <About />
      </main>
      <Toast message={message} />
    </>
  );
}
