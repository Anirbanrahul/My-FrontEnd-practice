import { useState, useEffect } from 'react';

/**
 * Custom Hook: useDebounce
 * Delays updating value until delay (ms) passes without changes.
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Cleanup on change or unmount
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
