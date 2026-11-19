import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ICONS = { success: CheckCircle2, error: AlertCircle, info: Info };

// Mounted once, at the root of the app (see App.jsx). Any component,
// anywhere, can trigger a toast via useToast().showToast(...) without
// needing to render this itself — that's the point of putting it behind
// context rather than passing toast state down as props.
export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-md border border-border bg-surface p-3 shadow-lg"
          >
            <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
            <p className="flex-1 text-sm text-ink">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-ink-faint hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
}
