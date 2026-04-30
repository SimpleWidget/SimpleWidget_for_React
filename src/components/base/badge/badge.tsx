import React, { useState, useEffect } from 'react';
import '../../../theme/badge.scss';

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  value?: string | number;
  max?: number;
  dot?: boolean;
  show?: boolean;
  type?: BadgeType;
  background?: string;
  color?: string;
  children?: React.ReactNode;
}

const SBadge: React.FC<BadgeProps> = ({
  value = '',
  max = 99,
  dot = false,
  show = true,
  type = 'danger',
  background,
  color,
  children,
}) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (!show) {
      setIsShow(false);
      return;
    }
    if (typeof value === 'number') {
      setIsShow(value > 0);
    } else {
      setIsShow(value !== '' && value !== undefined);
    }
  }, [show, value]);

  const displayValue = dot ? '' : (typeof value === 'number' && max !== undefined ? (value > max ? `${max}+` : value) : value);

  const classNames = [
    'sw-badge',
    `sw-badge-${type}`,
    dot ? 'sw-badge-dot' : '',
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {};
  if (background) style.background = background;
  if (color) style.color = color;

  return (
    <div className="sw-badge" style={style}>
      {children}
      {isShow && (
        <sup className={`sw-badge__content ${dot ? 'sw-badge__dot' : ''}`}>
          {displayValue}
        </sup>
      )}
    </div>
  );
};

export default SBadge;