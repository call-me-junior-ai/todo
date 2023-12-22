import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const useStorageState = <T,>(
  defaultValue: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useLocalStorage<T>(key, defaultValue);

  const [value, setValue] = useState<T>(storedValue);

  useEffect(() => {
    setStoredValue(value);
  }, [value]);

  return [value, setValue];
};

export { useStorageState };

