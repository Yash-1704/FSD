import { useState, useEffect } from 'react';

/**
 * Returns a version of `value` that only updates after it has stopped
 * changing for `delay` ms. Used on the products search input so we're not
 * re-filtering the list (or updating the URL) on every single keystroke.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // If `value` changes again before the timer fires, this cleanup cancels
    // the stale timer — otherwise you'd get a debounced update for every
    // keystroke eventually firing, just delayed, instead of only the last one.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
