export type ToastOption = {
    text: React.ReactNode | null | undefined;
    time?: number;
    width?: number;
    force?: boolean;
    onToastEnd?: () => void;
    onToastStart?: () => void;
};

const toastOptions: ToastOption[] = [];
const runners: ((...args: any[]) => any)[] = [];

export const useUnsafeWaitingToasts = () => {
    const notify = () => {
        runners.map((runner) => runner());
    };

    const subscribe = (callback: (...args: any[]) => void) => {
        runners.push(callback);
    };

    const clear = () => {
        runners.splice(0, runners.length);
    };

    const insert = (toastOption: ToastOption) => {
        toastOptions.push(toastOption);
        notify();
    };

    const removeAllToast = () => {
        console.log(toastOptions);
        toastOptions.splice(0, toastOptions.length);
    };

    return {
        insert,
        subscribe,
        toastOptions,
        removeAllToast,
        clear,
    };
};

export const useToast = () => {
    const { insert, removeAllToast } = useUnsafeWaitingToasts();

    const toast = (toastOption: ToastOption) => {
        if (toastOption?.force) {
            removeAllToast();
        }
        insert(toastOption);
    };

    return toast;
};

export const TOAST_TIME_INTERVAL_SHORT = 2000;
export const TOAST_TIME_INTERVAL_LONG = 4000;