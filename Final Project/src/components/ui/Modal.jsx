import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

/**
 * Rendered with createPortal straight into document.body. Logically this
 * component still lives wherever it's used in the tree (props, context, and
 * event bubbling all work normally) — only its actual DOM position changes,
 * which is what lets it visually sit above everything else regardless of
 * any parent's overflow/z-index.
 */
export function Modal({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null);
  useOnClickOutside(panelRef, onClose);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div ref={panelRef} className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
