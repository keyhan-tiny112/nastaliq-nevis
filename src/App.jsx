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
    try {
      const blob = await renderTextToBlob(shown);
      try {
        await copyImageToClipboard(blob);
        show('تصویر کپی شد');
      } catch {
        downloadBlob(blob);
        show('کپی ممکن نشد؛ تصویر دانلود شد');
      }
    } catch {
      show('خطا در ساخت تصویر');
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
      </main>
      <Toast message={message} />
    </>
  );
}
