import React, { useState } from 'react';
import '../../../theme/avatar.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'large' | 'middle' | 'small' | 'mini' | number;
  round?: boolean;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  text?: string;
}

const SAvatar: React.FC<AvatarProps> = ({
  src = '',
  alt = '',
  size = 'middle',
  round = false,
  fit = 'cover',
  text = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  const sizeStyle: React.CSSProperties = {};
  if (typeof size === 'number') {
    sizeStyle.width = `${size}px`;
    sizeStyle.height = `${size}px`;
  }

  const classNames = [
    'sw-avatar',
    typeof size === 'string' ? `sw-avatar--${size}` : '',
    round ? 'sw-avatar--round' : '',
    `sw-avatar--fit-${fit}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={sizeStyle}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          className="sw-avatar__img"
          style={{ objectFit: fit }}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : text ? (
        <span className="sw-avatar__text">{text}</span>
      ) : (
        <span className="sw-avatar__error">{alt || '加载失败'}</span>
      )}
    </div>
  );
};

export default SAvatar;