import React from 'react';
import '../../../theme/button.scss';

interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default';
  size?: 'medium' | 'large' | 'small' | 'mini' | 'middle';
  disabled?: boolean;
  nativeType?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const SButton: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  disabled = false,
  nativeType = 'button',
  children,
  onClick,
}) => {
  const classNames = [
    'sw-button',
    `sw-button-${type}`,
    `sw-button-${size}`,
    disabled ? 'sw-button-disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      type={nativeType as 'button' | 'submit' | 'reset'}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SButton;