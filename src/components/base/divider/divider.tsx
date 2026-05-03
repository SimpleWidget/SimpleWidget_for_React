import React from 'react';
import './divider.scss';

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  color?: string;
}

const SDivider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  color = '#e0e0e0',
}) => {
  const className = `sw-divider ${direction === 'vertical' ? 'sw-divider--vertical' : ''}`;

  return (
    <div className={className} style={{ backgroundColor: color }} />
  );
};

export default SDivider;