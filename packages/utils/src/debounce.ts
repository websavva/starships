export type DebounceFn<T extends (...args: any[]) => any> = T & {
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): DebounceFn<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunc = (...args: Parameters<T>) => {
    debouncedFunc.cancel();

    timeout = setTimeout(() => func(...args), wait);
  };

  debouncedFunc.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debouncedFunc as DebounceFn<T>;
}
