import { useState, useEffect } from "react";

/**
 * A custom React hook to persist state value in localStorage. It uses lazy initial state to prevent unnecessary JSON parsing on every render.
 * @param {any} defaultValue - The default value for the state.
 * @param {string} key - The localStorage key under which to store the state value.
 * @returns A stateful value and a function to update it.
 */
export function useStorageState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      // Only persist to localStorage if the value is not undefined.
      if (value !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error saving localStorage key “${key}”:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
