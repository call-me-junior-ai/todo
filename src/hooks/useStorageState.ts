import { useState, useEffect } from 'react';

export function useStorageState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    try {
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch {
      console.error(`Error parsing localStorage key "${key}":`, storedValue);
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
