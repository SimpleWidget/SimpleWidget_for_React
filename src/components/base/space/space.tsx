import React from 'react';
import './space.scss';

interface SpaceProps {
  size?: 'small' | 'middle' | 'large';
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const SSpace: React.FC<SpaceProps> = ({
  size = 'middle',
  direction = 'horizontal',
  children,
}) => {
  const className = `sw-space sw-space--${size} ${direction === 'vertical' ? 'sw-space--vertical' : ''}`;

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SSpace;