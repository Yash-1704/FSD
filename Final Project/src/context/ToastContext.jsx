import { createContext, useContext, useCallback, useMemo, useReducer, useRef } from 'react';

const ToastContext = createContext(null);

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'REMOVE':
      return state.filter((toast) => toast.id !== action.id);
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  // Plain useReducer here, not useLocalStorageReducer — a toast that
  // survives a refresh doesn't make sense, so this state is intentionally
  // memory-only.
  const [toasts, dispatch] = useReducer(toastReducer, []);

  // A ref, not state: this counter needs to persist across renders, but
  // updating it should never itself cause a re-render — only dispatching
  // the reducer action should.
  const idCounter = useRef(0);

  const removeToast = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);

  const showToast = useCallback((message, type = 'info') => {
    const id = ++idCounter.current;
    dispatch({ type: 'ADD', toast: { id, message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 3500);
  }, []);

  const value = useMemo(() => ({ toasts, showToast, removeToast }), [toasts, showToast, removeToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
