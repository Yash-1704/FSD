import { useState, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

/**
 * Fetches `url` and tracks { data, isLoading, error }. Re-fetches whenever
 * `url` changes (e.g. a :id route param), and cancels the in-flight request
 * on cleanup — both on unmount and when `url` changes again before the
 * previous request finished, which avoids a slow, stale response
 * overwriting a newer one's state.
 *
 * Pass `enabled: false` to skip fetching entirely — used by
 * ProductDetailsPage to delay fetching "related products" until the main
 * product (and therefore its category) has actually loaded.
 */
export function useFetch(url, { enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(enabled && Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !url) return;

    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(url, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [url, enabled]);

  return { data, isLoading, error };
}
