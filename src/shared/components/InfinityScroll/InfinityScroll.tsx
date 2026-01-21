import { memo, useEffect, useRef } from 'react';

import './InfinityScroll.scss';

const SENTINEL_OBSERVER_THRESHOLD = '400px';

export type TInfinityScrollProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loadNextPage: () => void;
  isNextPageLoading: boolean;
  hasNextPage: boolean;
  loader?: React.ReactNode;
  getItemKey: (item: T) => string | number;
  threshold?: number;
};

const InfinityScrollInner = <T,>({
  items,
  renderItem,
  loadNextPage,
  isNextPageLoading,
  hasNextPage,
  loader,
  getItemKey
}: TInfinityScrollProps<T>) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasNextPage && !isNextPageLoading) {
        loadNextPage();
      }
    };

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
  }, [hasNextPage, isNextPageLoading, loadNextPage]);

  return (
    <div className='infinityScroll'>
      <ul className='infinityScroll__list'>
        {items.map((item) => (
          <li className='infinityScroll__item' key={getItemKey(item)}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
      {loader && isNextPageLoading && <div className='infinityScroll__loader'>{loader}</div>}
      <div className='infinityScroll__sentinel' ref={sentinelRef}></div>
    </div>
  );
};

export const InfinityScroll = memo(InfinityScrollInner) as typeof InfinityScrollInner;
