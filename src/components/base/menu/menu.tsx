import React, { createContext, useContext, useState } from 'react';
import './menu.scss';

interface MenuContextType {
  mode: 'horizontal' | 'vertical';
  activeIndex: string;
  handleSelect: (index: string) => void;
}

const MenuContext = createContext<MenuContextType>({
  mode: 'vertical',
  activeIndex: '',
  handleSelect: () => {},
});

interface MenuProps {
  mode?: 'horizontal' | 'vertical';
  defaultActive?: string;
  onSelect?: (index: string) => void;
  children?: React.ReactNode;
}

export const SMenu: React.FC<MenuProps> = ({
  mode = 'vertical',
  defaultActive = '',
  onSelect,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  const handleSelect = (index: string) => {
    setActiveIndex(index);
    onSelect?.(index);
  };

  return (
    <MenuContext.Provider value={{ mode, activeIndex, handleSelect }}>
      <div className={`sw-menu sw-menu--${mode}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

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