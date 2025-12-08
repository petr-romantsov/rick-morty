import { useRef } from 'react';

type TUseDebounceProps<T extends (...args: any[]) => any> = {
  cb: T;
  delay: number;
};

export const useDebounce = <T extends (...args: any[]) => any>({ cb, delay }: TUseDebounceProps<T>) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return function (...args: Parameters<T>) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => cb(...args), delay);
  };
};
