type classnamesArgs = string | number | boolean | null | undefined | Record<string, any> | classnamesArgs[];

export function classnames(...args: classnamesArgs[]): string {
  return args
    .flatMap((arg) => {
      if (typeof arg === 'string') {
        return arg;
      }

      if (Array.isArray(arg)) {
        return classnames(...arg);
      }

      if (typeof arg === 'object' && arg !== null) {
        return Object.entries(arg)
          .filter(([key, value]) => !!value)
          .map(([key, value]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ');
}
