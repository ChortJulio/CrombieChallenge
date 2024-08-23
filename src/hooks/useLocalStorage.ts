import { useEffect } from "react";
import { IUseLocalStorage } from "../interfaces";

export const useLocalStorage = ({
  value,
  localStorageKey,
}: IUseLocalStorage) => {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return;
};