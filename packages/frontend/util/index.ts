import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

export const timer = (time: number) =>
  new Promise((res) => setTimeout(res, time));

export const API_DELAY_MS = 100;

export const c = classnames;


export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export const useKey = (): [number, () => void] => {
  const [key, setKey] = useState(0);
  const refresh = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return [key, refresh];
};

export function isDifferentArray(a: unknown[] = [], b: unknown[] = []) {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}