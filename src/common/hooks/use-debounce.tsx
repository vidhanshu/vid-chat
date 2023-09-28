import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, milliSeconds: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(function() {
    const handler = setTimeout(function() {
      setDebouncedValue(value);
    }, milliSeconds);

    return function() {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};