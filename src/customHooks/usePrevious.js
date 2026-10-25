import { useRef, useEffect } from 'react';

/**
 * Custom Hook: usePrevious
 * Returns value from previous render cycle.
 */
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
