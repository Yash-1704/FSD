import { useState, useCallback } from 'react';

/**
 * A boolean useState with pre-built helpers, since "toggle/open/close" shows
 * up for every menu, drawer, and dropdown in the app.
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse }];
}
