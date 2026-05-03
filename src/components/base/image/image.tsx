import React, { useState } from 'react';
import './image.scss';

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  round?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

const SImage: React.FC<ImageProps> = ({
  src = '',
  alt = '',
  width,
  height,
  fit = 'cover',
  round = false,
  block = false,
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const className = [
    'sw-image',
    block ? 'sw-image--block' : '',
    round ? 'sw-image--round' : '',
    `sw-image--fit-${fit}`,
  ].filter(Boolean).join(' ');

  const style: Record<string, string> = {};
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  if (hasError) {
    return (
      <div className={className} style={style}>
        <div className="sw-image__error">
          {children || alt || '加载失败'}
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <img src={src} alt={alt} onError={handleError} />
    </div>
  );
};

export default SImage;