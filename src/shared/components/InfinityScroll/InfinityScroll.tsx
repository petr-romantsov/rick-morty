import { memo, useCallback, useEffect, useRef } from 'react';

import './InfinityScroll.scss';

const SENTINEL_OBSERVER_THRESHOLD = '100px';

export type TInfinityScrollProps = {
  children: React.ReactNode;
  loadNextPage: () => void;
  isNextPageLoading: boolean;
  hasNextPage: boolean;
  loader?: React.ReactNode;
  threshold?: number;
};

const InfinityScrollInner = ({
  children,
  loadNextPage,
  isNextPageLoading,
  hasNextPage,
  loader
}: TInfinityScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasNextPage && !isNextPageLoading) {
        loadNextPage();
      }
    },
    [hasNextPage, isNextPageLoading, loadNextPage]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: SENTINEL_OBSERVER_THRESHOLD,
      threshold: 0
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [handleIntersection]);

  return (
    <div className='infinityScroll'>
      {children}
      {loader && isNextPageLoading && <div>{loader}</div>}
      <div className='infinityScroll__sentinel' ref={sentinelRef}></div>
    </div>
  );
};

export const InfinityScroll = memo(InfinityScrollInner) as typeof InfinityScrollInner;
