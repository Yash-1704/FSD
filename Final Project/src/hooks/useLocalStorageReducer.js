import { useReducer, useEffect } from 'react';

/**
 * Same idea as useLocalStorage, but for useReducer instead of useState.
 * Used for state whose updates are better described as actions (cart,
 * notes) rather than a single value.
 *
 * useReducer's third argument is an "init" function applied lazily to the
 * second argument — it only runs once, on mount, which is exactly where we
 * want the localStorage read to happen.
 */
export function useLocalStorageReducer(reducer, initialValue, key) {
  const [state, dispatch] = useReducer(reducer, initialValue, (initial) => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initial;
    } catch (error) {
      console.error(`useLocalStorageReducer: failed to read "${key}"`, error);
      return initial;
    }
  });

  // Unlike useLocalStorage (which writes inside its setter), a reducer's
  // dispatch doesn't give us a hook to run code after state updates — so
  // persistence happens here instead, as a side effect that re-runs
  // whenever `state` changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`useLocalStorageReducer: failed to write "${key}"`, error);
    }
  }, [key, state]);

  return [state, dispatch];
}
