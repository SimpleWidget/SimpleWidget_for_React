import React, { useRef, useEffect } from 'react';
import './infinite-scrolling.scss';

interface InfiniteScrollingProps {
  distance?: number;
  onLoadMore?: () => void;
  loading?: React.ReactNode;
  children?: React.ReactNode;
}

const SInfiniteScrolling: React.FC<InfiniteScrollingProps> = ({
  distance = 100,
  onLoadMore,
  loading,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < distance) {
        onLoadMore?.();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [distance, onLoadMore]);

  return (
    <div ref={containerRef} className="sw-infinite-scrolling">
      {children}
      {loading && <div className="sw-infinite-scrolling__loading">{loading}</div>}
    </div>
  );
};

export default SInfiniteScrolling;