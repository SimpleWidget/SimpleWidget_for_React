import React from 'react';
import './layout.scss';

interface LayoutProps {
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const SLayout: React.FC<LayoutProps> = ({
  direction = 'horizontal',
  children,
}) => {
  const className = `sw-layout ${direction === 'vertical' ? 'sw-layout--vertical' : ''}`;

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SLayout;