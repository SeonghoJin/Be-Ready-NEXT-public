import { useEffect, useState } from 'react';
import {
  TOAST_TIME_INTERVAL_LONG,
  ToastOption,
  useUnsafeWaitingToasts,
} from './util';
import { timer } from '@./common';
import Toast from './Toast';

function UnsafeToastContainer() {
  const [waiting, setWaiting] = useState(false);
  const [currentToast, setCurrentToast] = useState<ToastOption | null>(null);
  const [start, setStart] = useState(false);
  const { toastOptions, subscribe, clear } = useUnsafeWaitingToasts();

  useEffect(() => {
    subscribe(() => {
      setStart(true);
    });

    return () => {
      clear();
    };
  }, [clear, subscribe]);

  useEffect(() => {
    if (toastOptions.length === 0 && waiting === false) {
      setStart(false);
      setCurrentToast(null);
    }

    if (toastOptions.length === 0) {
      return;
    }

    if (waiting) {
      return;
    }

    setWaiting(true);

    const firstToast = toastOptions.shift();

    if (!firstToast) {
      setCurrentToast(null);
      setWaiting(false);
      setStart(false);
      return;
    }

    setCurrentToast(firstToast);
    firstToast?.onToastStart?.();
    (async () => {
      await timer(firstToast.time ?? TOAST_TIME_INTERVAL_LONG);
      firstToast?.onToastEnd?.();
      setWaiting(false);
      setStart(false);
    })();
  }, [waiting, start, toastOptions]);

  return <>{currentToast && <Toast toastOption={currentToast} />}</>;
}

export default UnsafeToastContainer;
