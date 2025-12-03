import { type DependencyList, type EffectCallback, useEffect } from 'react';

type TUseDebounceEffectProps = {
  effect: EffectCallback;
  deps: DependencyList;
  delay: number;
};

export const useDebounceEffect = ({ effect, deps, delay }: TUseDebounceEffectProps) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};
