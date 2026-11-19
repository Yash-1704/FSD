import { useState, useCallback } from 'react';

/**
 * Behaves like useState, but the value is read from and written to
 * localStorage under `key`. Supports the same "updater function" form
 * useState's setter does: setValue(prev => ...).
 *
 * The read only happens once, inside useState's initializer — that
 * function runs a single time on mount, not on every render.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: failed to read "${key}"`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch (error) {
          console.error(`useLocalStorage: failed to write "${key}"`, error);
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
