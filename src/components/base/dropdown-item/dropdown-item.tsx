import React, { useContext } from 'react';

interface DropdownItemProps {
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const SDropdownItem: React.FC<DropdownItemProps> = ({
  disabled = false,
  onClick,
  children,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`sw-dropdown__item ${disabled ? 'sw-dropdown__item--disabled' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default SDropdownItem;