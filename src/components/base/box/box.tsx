import React from 'react';
import './box.scss';

interface BoxProps {
  padding?: string | number;
  margin?: string | number;
  border?: boolean;
  radius?: boolean;
  children?: React.ReactNode;
}

const SBox: React.FC<BoxProps> = ({
  padding = 0,
  margin = 0,
  border = false,
  radius = false,
  children,
}) => {
  const styles: Record<string, string> = {};
  if (padding) {
    styles.padding = typeof padding === 'number' ? `${padding}px` : padding;
  }
  if (margin) {
    styles.margin = typeof margin === 'number' ? `${margin}px` : margin;
  }

  const className = `sw-box ${border ? 'sw-box--border' : ''} ${radius ? 'sw-box--radius' : ''}`.trim();

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export default SBox;