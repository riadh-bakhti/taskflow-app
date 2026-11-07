import { useEffect, useState } from 'react';

/**
 * Custom hook that keeps a piece of state synchronised with localStorage.
 * It plays the role of the StorageService described in the class diagram.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn('Unable to read localStorage for key', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Unable to write localStorage for key', key, error);
    }
  }, [key, value]);

  return [value, setValue];
}
