import { useEffect, useRef } from 'react';

import './InfinityScroll.scss';

export type TInfinityScrollProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loadNextPage: () => Promise<void>;
  isNextPageLoading: boolean;
  hasNextPage: boolean;
  loader?: React.ReactNode;
  getItemKey: (item: T) => string | number;
  threshold?: number;
};
export const InfinityScroll = <T,>({
  items,
  renderItem,
  loadNextPage,
  isNextPageLoading,
  hasNextPage,
  loader,
  getItemKey,
  threshold = 0.1
}: TInfinityScrollProps<T>) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasNextPage && !isNextPageLoading) {
        loadNextPage().catch((error) => {
          if (error.message !== 'Request aborted') {
            console.error('Error loading next page:', error);
          }
        });
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '400px',
      threshold: 0
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasNextPage, isNextPageLoading, loadNextPage, threshold]);

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
