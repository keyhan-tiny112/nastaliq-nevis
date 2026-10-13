import { Component } from 'react';

/**
 * خطای رندر را می‌گیرد تا صفحه سفید نشود.
 * fallback می‌تواند یک عنصر یا تابعی باشد که خطا را می‌گیرد.
 */
export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const { fallback } = this.props;
    return typeof fallback === 'function' ? fallback(error) : fallback;
  }
}
