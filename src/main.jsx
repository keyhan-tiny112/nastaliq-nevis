import { createRoot } from 'react-dom/client';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/noto-nastaliq-urdu/400.css';
import './styles/index.css';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

// نکته: عمداً <StrictMode> نیست؛ کتابخانهٔ WebGL ـِ metal-fx دو بار mount شدنِ حالت توسعه را
// خوب تحمل نمی‌کند. (ErrorBoundary هر خطایی را روی صفحه نشان می‌دهد تا صفحه سفید نماند.)
createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    fallback={(error) => (
      <pre style={{ padding: 24, whiteSpace: 'pre-wrap', direction: 'ltr' }}>
        {String(error?.stack || error)}
      </pre>
    )}
  >
    <App />
  </ErrorBoundary>,
);
