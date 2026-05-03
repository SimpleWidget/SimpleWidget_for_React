import React from 'react';
import '../../../theme/empty.scss';

interface EmptyProps {
  content?: string;
  imageSize?: string | number;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const SEmpty: React.FC<EmptyProps> = ({
  content = '',
  imageSize = 60,
  children,
}) => {
  const sizeStyle = typeof imageSize === 'number' ? `${imageSize}px` : imageSize;

  return (
    <div className="sw-empty">
      <div className="sw-empty__wrapper">
        {children || (
          <svg width={sizeStyle} height={sizeStyle} viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="25" stroke="#d0d0d0" strokeWidth="2" fill="none" />
            <line x1="20" y1="30" x2="40" y2="30" stroke="#d0d0d0" strokeWidth="2" />
          </svg>
        )}
      </div>
      <p className="sw-empty__content">{content || '暂无数据'}</p>
    </div>
  );
};

export default SEmpty;