import React from 'react';
import './skeleton.scss';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
  active?: boolean;
}

const SSkeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height = '16px',
  lines = 1,
  active = true,
}) => {
  const getStyles = () => {
    const style: Record<string, string> = {};
    if (typeof width === 'number') {
      style.width = `${width}px`;
    } else {
      style.width = width;
    }
    if (variant !== 'text') {
      if (typeof height === 'number') {
        style.height = `${height}px`;
      } else {
        style.height = height;
      }
    }
    return style;
  };

  return (
    <div className="sw-skeleton">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`sw-skeleton__item sw-skeleton--${variant} ${active ? 'sw-skeleton--active' : ''}`}
          style={getStyles()}
        />
      ))}
    </div>
  );
};

export default SSkeleton;