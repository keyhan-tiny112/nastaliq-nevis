import { useEffect, useRef, useState } from 'react';
import { NARROW_BREAKPOINT } from '@/constants/nastaliq';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IconButton } from './IconButton';
import { CopyIcon } from './icons/CopyIcon';
import { MenuIcon } from './icons/MenuIcon';
import { PenIcon } from './icons/PenIcon';
import { ReplayIcon } from './icons/ReplayIcon';
import { RulerIcon } from './icons/RulerIcon';
import { ThemeIcon } from './icons/ThemeIcon';
import { GithubIcon } from './icons/GithubIcon';
import { InfoIcon } from './icons/InfoIcon';
import { Card } from './Card';

const ABOUT_TEXT = `
<h1>نستعلیق‌نویس</h1>

<p>
  یادگیری خط نستعلیق با انیمیشن. متنی می‌نویسی و می‌بینی که با یک قلم متحرک از راست به چپ نوشته می‌شود؛ همراه با خط‌های هوا و زمین، ردیف لوزی‌های «نقطه» و پهنای هر حرف، درست مثل وقتی که استاد جلوی چشمت می‌نویسد.
</p>

<p>
  سایت عمداً ساده است: یک navbar، یک input و یک بوم خروجی.
</p>

<h2>ویژگی‌ها</h2>

<ul>
  <li><strong>نوشتن زنده:</strong> هر متنی (تا ۴۰ نویسه) را به نستعلیق می‌نویسد؛ قلم متحرک کلمه را از راست به چپ آشکار می‌کند.</li>
  <li><strong>خط‌های اندازه‌گیری:</strong> خط هوا، زمین (کرسی) و عمق، ردیف لوزی‌های «نقطه» به اندازهٔ پهنای کلمه، پشتهٔ پنج‌نقطه‌ای الف و پهنای هر حرف بر حسب نقطه.</li>
  <li><strong>خط‌کش هوشمند:</strong> ارتفاع و پهنای واقعی کلمه اندازه‌گیری می‌شود و خط‌کش همیشه بالای بلندترین نقطهٔ کلمه می‌نشیند، نه داخل آن.</li>
  <li><strong>کپی به صورت تصویر:</strong> نستعلیق نوشته‌شده را به صورت PNG در کلیپ‌بورد می‌گذارد (اگر مرورگر اجازه ندهد، تصویر دانلود می‌شود).</li>
  <li><strong>تم روشن و تاریک:</strong> پیش‌فرض روشن است. تغییر تم با انیمیشن <code>circle-reveal</code> انجام می‌شود و انتخاب کاربر ذخیره می‌شود.</li>
  <li><strong>input با افکت فلزی:</strong> با کتابخانهٔ <code>metal-fx</code>؛ اگر WebGL2 در دسترس نباشد، input عادی نمایش داده می‌شود.</li>
  <li><strong>موبایل:</strong> در صفحه‌های کوچک، دکمه‌های navbar داخل یک منوی همبرگری با آیکن متحرک جمع می‌شوند.</li>
  <li><strong>آیکن‌های متحرک:</strong> کپی، پاک‌کردن، اطلاعات، همبرگر و … همه با CSS خالص انیمیشن دارند.</li>
  <li><strong>کارت مدل:</strong> پنجرهٔ مک‌مانند روی همهٔ عناصر، با پس‌زمینهٔ تار.</li>
  <li><strong>دسترسی پذیری:</strong> برچسب برای همهٔ دکمه‌ها، مدیریت فوکوس در مدل، و احترام به <code>prefers-reduced-motion</code>.</li>
</ul>

<h2>استک</h2>

<table>
  <thead>
    <tr>
      <th>بخش</th>
      <th>ابزار</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>رابط</td>
      <td>React 18</td>
    </tr>
    <tr>
      <td>ساخت و توسعه</td>
      <td>Vite 5</td>
    </tr>
    <tr>
      <td>افکت فلزی input</td>
      <td><code>metal-fx</code></td>
    </tr>
    <tr>
      <td>فونت‌ها</td>
      <td><code>@fontsource/noto-nastaliq-urdu</code>، <code>@fontsource/vazirmatn</code></td>
    </tr>
  </tbody>
</table>

<p>
  همهٔ وابستگی‌ها از npm می‌آیند و هیچ CDN‌ای لازم نیست؛ پروژه آفلاین هم اجرا می‌شود.
</p>

<h2>اجرا</h2>

<h3>از سایت (افراد عادی)</h3>

برید به سایت <a href="https://keyhan-tiny112.github.io/nastaliq-nevis" target="_blank" rel="noopener noreferrer">https://keyhan-tiny112.github.io/nastaliq-nevis</a> و از نستعلیق‌نویس استفاده کنید. هیچ نصب یا ثبت‌نامی لازم نیست.

<h3>از سورس (توسعه‌دهنده)</h3>

<p>
  Node.js نسخهٔ ۱۸ یا بالاتر لازم است (<code>.nvmrc</code>: نسخهٔ ۲۰).
</p>

<pre><code class="language-bash">npm install
npm run dev        # سرور توسعه، آدرس را خودش در مرورگر باز می‌کند
npm run build      # خروجی نهایی در dist/
npm run preview    # پیش‌نمایش خروجی build</code></pre>

<p>با bun هم کار می‌کند:</p>

<pre><code class="language-bash">bun install
bun run dev</code></pre>

<p>
  پوشهٔ <code>dist/</code> فقط فایل استاتیک است و روی هر هاستی (Netlify، Vercel، GitHub Pages، Nginx و …) قابل انتشار است.
</p>

<h2>ساختار پروژه</h2>

<pre><code>├── index.html                 نقطهٔ ورود، متاهای SEO و اسکریپت تم اولیه
├── vite.config.js             alias «@» → src، تنظیم سرور و تقسیم chunk ها
├── package.json
├── public/                    فایل‌های ثابت
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
└── src/
    ├── main.jsx               راه‌اندازی React، فونت‌ها و استایل
    ├── App.jsx                حالت کلی برنامه و اتصال بخش‌ها
    ├── constants/             اندازه‌ها و ثابت‌های نستعلیق (نقطه، خط زمین، …)
    ├── components/
    │   ├── Navbar.jsx         نوار بالا و منوی همبرگری موبایل
    │   ├── TextField.jsx      input با افکت metal-fx و دکمهٔ پاک‌کردن
    │   ├── Card.jsx           پنجرهٔ مک به صورت مدل
    │   ├── IconButton.jsx · Toast.jsx · ErrorBoundary.jsx
    │   ├── icons/             آیکن‌های متحرک (Copy، Cancel، Info، Menu، …)
    │   └── stage/             بوم نستعلیق: خط‌ها، خط‌کش نقطه، الف، قلم (PenNib)
    ├── hooks/                 useTheme، useWriteProgress، useGlyphMetrics، …
    ├── lib/                   توابع خالص: خروجی تصویر، اندازهٔ جوهر، ارقام فارسی
    ├── libs/                  لایهٔ اتصال به کتابخانه‌های بیرونی (metalFx.jsx)
    └── styles/                توکن‌های رنگ و استایل هر بخش</code></pre>

<p>
  نکتهٔ مهم: خود <code>metal-fx</code> از npm نصب می‌شود (<code>node_modules</code>). پوشهٔ <code>src/libs</code> فقط تنظیمات پیش‌فرض پروژه برای آن را نگه می‌دارد. آیکن‌های متحرک کامپوننت‌اند چون حرکتشان با CSS و حالت React کنترل می‌شود، برای همین در <code>src/components/icons</code> هستند و <code>public</code> فقط آیکن سایت را دارد.
</p>

<h2>نحوهٔ کار</h2>

<ol>
  <li><strong>اندازه‌گیری:</strong> پس از بارگذاری فونت، پهنای کلمه و محدودهٔ هر حرف از خود SVG (<code>getBBox</code> و <code>getExtentOfChar</code>) خوانده می‌شود. ارتفاع و پهنای واقعی جوهر کلمه هم با <code>canvas.measureText</code> گرفته می‌شود (<code>src/lib/inkMetrics.js</code>).</li>
  <li><strong>چیدمان:</strong> ارتفاع بوم از خود کلمه می‌آید. خط زمین طوری پایین می‌رود که خط‌کش بالای بلندترین نقطهٔ کلمه جا شود.</li>
  <li><strong>نوشتن:</strong> <code>useWriteProgress</code> عددی از ۰ تا ۱ می‌سازد. با آن، یک <code>clipPath</code> کلمه را از راست به چپ آشکار می‌کند و <code>PenNib</code> همراه آن حرکت می‌کند. اول خط‌های راهنما کشیده می‌شوند، بعد نوشتن شروع می‌شود.</li>
  <li><strong>واحد «نقطه»:</strong> اندازهٔ همه‌چیز بر پایهٔ <code>NUQTA</code> (عرض قلم) حساب می‌شود. الف نستعلیق ۵ نقطه است.</li>
</ol>

<h2>تنظیمات</h2>

<p>
  ثابت‌های اصلی در <code>src/constants/nastaliq.js</code> هستند:
</p>

<table>
  <thead>
    <tr>
      <th>ثابت</th>
      <th>کار</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>FONT_SIZE</code></td>
      <td>اندازهٔ فونت داخل بوم (و واحد <code>NUQTA</code> از آن می‌آید)</td>
    </tr>
    <tr>
      <td><code>MIN_BASELINE_Y</code></td>
      <td>کمترین فاصلهٔ خط زمین از بالای بوم</td>
    </tr>
    <tr>
      <td><code>RULER_HEADROOM</code> / <code>RULER_GAP</code></td>
      <td>جا و فاصلهٔ خط‌کش بالای کلمه</td>
    </tr>
    <tr>
      <td><code>DEFAULT_TEXT</code></td>
      <td>متن اولیه</td>
    </tr>
    <tr>
      <td><code>MAX_LENGTH</code></td>
      <td>بیشترین طول متن</td>
    </tr>
    <tr>
      <td><code>NARROW_BREAKPOINT</code></td>
      <td>مرز حالت موبایل (پیش‌فرض ۶۰۰ پیکسل)</td>
    </tr>
  </tbody>
</table>

<p>
  رنگ‌ها فقط دو متغیر هستند (<code>--bg</code> و <code>--fg</code>) در <code>src/styles/tokens.css</code>؛ بقیه از آن‌ها ساخته می‌شوند. برای تم جدید همین دو را عوض کن.
</p>

<h3>استفاده از <code>Card</code></h3>

<pre><code class="language-jsx">const [open, setOpen] = useState(false);

&lt;IconButton label="درباره" onClick={() =&gt; setOpen(true)}&gt;
  &lt;InfoIcon /&gt;
&lt;/IconButton&gt;

&lt;Card open={open} onClose={() =&gt; setOpen(false)} title="درباره نستعلیق‌نویس"&gt;
  ...
&lt;/Card&gt;</code></pre>

<p>
  با دایرهٔ قرمز، کلیک روی پس‌زمینه یا <code>Escape</code> بسته می‌شود. شدت تاری پس‌زمینه با prop به نام <code>blur</code> (پیش‌فرض ۱۰ پیکسل) تنظیم می‌شود.
</p>

<h2>محدودیت‌ها</h2>

<ul>
  <li>نوشتن به صورت آشکارشدن تدریجی با قلم متحرک است، نه ردگیریِ مسیر واقعیِ هر حرف.</li>
  <li>موقعیت خط‌های هوا و زمین تقریبی است و به فونت وابسته است.</li>
  <li>بازتاب فلزی <code>metal-fx</code> به WebGL2 نیاز دارد.</li>
  <li>کپی تصویر به کلیپ‌بورد در همهٔ مرورگرها یکسان پشتیبانی نمی‌شود؛ در این حالت تصویر دانلود می‌شود.</li>
  <li>تغییر تم با انیمیشن، به View Transitions API نیاز دارد. در مرورگرهایی که ندارند، تم بدون انیمیشن عوض می‌شود.</li>
</ul>

<h2>سپاس و مجوزها</h2>

<ul>
  <li><a href="https://www.npmjs.com/package/metal-fx"><code>metal-fx</code></a> (مجوز MIT)، ساخته‌شده بر پایهٔ Paper Shaders (Apache 2.0).</li>
  <li>فونت‌های Noto Nastaliq Urdu و Vazirmatn از طریق <a href="https://fontsource.org">Fontsource</a> (مجوز OFL 1.1).</li>
  <li>حرکت آیکن‌های کپی و پاک‌کردن، بازسازی CSS از <a href="https://hugeicons-animated.com">hugeicons-animated</a> است.</li>
  <li>انیمیشن تغییر تم از <a href="https://transition-kit.space">Transition Kit</a> (<code>circle-reveal</code>) الهام گرفته است.</li>
  <li>مسیر آیکن GitHub از <a href="https://feathericons.com">Feather</a> (مجوز MIT) است.</li>
</ul>
`

export function Navbar({ theme, guides, onCopy, onToggleTheme, onToggleGuides, onReplay, github_link = "https://github.com/keyhan-tiny112/nastaliq-nevis" }) {
  const [open, setOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const mobile = useMediaQuery(`(max-width: ${NARROW_BREAKPOINT - 1}px)`);
  const rootRef = useRef(null);

  // با بزرگ شدن صفحه، منو بسته می‌شود
  useEffect(() => {
    if (!mobile) setOpen(false);
  }, [mobile]);

  // کلیک بیرون از نوار یا Escape منو را می‌بندد
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // بستن کارت درباره با Escape
  useEffect(() => {
    if (!showAbout) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowAbout(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [showAbout]);

  // هر انتخاب از منو، منو را هم می‌بندد
  const act = (fn) => () => {
    fn();
    setOpen(false);
  };

  return (
    <>
      <header className="navbar" ref={rootRef}>
        <h1 className="navbar__brand">
          <PenIcon />
          نستعلیق‌نویس
        </h1>

        <IconButton
          className="navbar__burger"
          label={open ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={open}
          aria-controls="navbar-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon open={open} />
        </IconButton>

        <div id="navbar-menu" className="navbar__actions" data-open={open}>
          <IconButton label="کپی نستعلیق به صورت تصویر" onClick={act(onCopy)}>
            <CopyIcon />
          </IconButton>

          <IconButton label="پخش دوباره" onClick={act(onReplay)}>
            <ReplayIcon />
          </IconButton>

          <IconButton
            label="نمایش خط‌کش‌ها"
            aria-pressed={guides}
            onClick={act(onToggleGuides)}
          >
            <RulerIcon />
          </IconButton>

          <IconButton
            label={theme === 'light' ? 'حالت تاریک' : 'حالت روشن'}
            onClick={act(onToggleTheme)}
          >
            <ThemeIcon theme={theme} />
          </IconButton>

          <IconButton label="درباره" onClick={act(() => setShowAbout(true))}>
            <InfoIcon />
          </IconButton>

          <IconButton
            label="GitHub - گیت هاب"
            onClick={act(() =>
              window.open(github_link, "_blank", "noopener,noreferrer")
            )}
          >
            <GithubIcon />
          </IconButton>
        </div>
      </header>

      <Card open={showAbout} onClose={() => setShowAbout(false)} title="~/about.html">
        <div className="about-card" dangerouslySetInnerHTML={{ __html: ABOUT_TEXT }} />
        <p className="about-card__credit">
          اثری از <a href="https://github.com/keyhan-tiny112" target="_blank" rel="noopener noreferrer"><strong>کیهان</strong></a>، ۲۰۲۶
        </p>
      </Card>
    </>
  );
}
