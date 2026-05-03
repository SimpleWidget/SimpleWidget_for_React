import React from 'react';
import './link.scss';

type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type LinkUnderline = 'always' | 'hover' | 'never';

interface LinkProps {
  type?: LinkType;
  underline?: LinkUnderline;
  disabled?: boolean;
  href?: string;
  children?: React.ReactNode;
}

const SLink: React.FC<LinkProps> = ({
  type = 'primary',
  underline = 'hover',
  disabled = false,
  href = '',
  children,
}) => {
  const className = [
    'sw-link',
    `sw-link--${type}`,
    `sw-link--underline-${underline}`,
    disabled ? 'sw-link--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <a className={className} href={disabled ? undefined : href}>
      {children}
    </a>
  );
};

export default SLink;