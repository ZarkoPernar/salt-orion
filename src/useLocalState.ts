import { useEffect, useState } from "react";

export function getLocalState<T>(key: string) {
  const init = localStorage.getItem(key);

  return typeof init === "string" ? (JSON.parse(init) as T) : null;
}

export function useLocalState<T>(key: string, initialState?: T) {
  const val = useState<T | null>(initialState ?? null);
  const [state, setState] = val;
  // initialization
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // synchronization
  useEffect(() => {
    setState(getLocalState<T>(key));
  }, [key, setState]);

  return val;
}
