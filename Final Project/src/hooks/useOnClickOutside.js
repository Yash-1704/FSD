import { useEffect } from 'react';

/**
 * Calls `handler` when a mousedown happens outside the element `ref` points
 * to. Used to close dropdowns and modals when the user clicks away.
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}
