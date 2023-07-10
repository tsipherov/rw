import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue = "") => {
  const [localValue, setLocalValue] = useState(() => {
    const value = localStorage.getItem(key);
    if (value && value !== "undefined") {
      return JSON.parse(value);
    }
    return initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localValue));
  }, [localValue, key]);

  return [localValue, setLocalValue];
};
