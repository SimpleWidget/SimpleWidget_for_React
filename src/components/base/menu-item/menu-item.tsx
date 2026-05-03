import React, { useContext } from 'react';
import { MenuContext } from '../menu';

interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const SMenuItem: React.FC<MenuItemProps> = ({
  index = '',
  disabled = false,
  children,
}) => {
  const { mode, activeIndex, handleSelect } = useContext(MenuContext);
  const isActive = activeIndex === index;

  const handleClick = () => {
    if (!disabled && index) {
      handleSelect(index);
    }
  };

  return (
    <div
      className={`sw-menu__item ${isActive ? 'sw-menu__item--active' : ''} ${disabled ? 'sw-menu__item--disabled' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default SMenuItem;