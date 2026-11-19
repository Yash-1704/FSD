import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './common/Button';

/**
 * Error boundaries catch errors thrown while RENDERING anywhere in their
 * child tree, and show a fallback instead of letting the whole app crash to
 * a blank screen. They must be class components — getDerivedStateFromError
 * and componentDidCatch have no hook equivalent as of now.
 *
 * They do NOT catch errors inside event handlers or inside useEffect
 * callbacks — those still need their own try/catch (see useFetch).
 */
export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback(this.state.error, this.handleReset);
    }

    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-danger/30 bg-danger-soft p-8 text-center">
        <AlertTriangle className="text-danger" size={28} />
        <p className="font-medium text-ink">Something went wrong.</p>
        <p className="text-sm text-ink-muted">
          {this.props.message || 'This section failed to load.'}
        </p>
        <Button variant="outline" size="sm" onClick={this.handleReset}>
          Try again
        </Button>
      </div>
    );
  }
}
