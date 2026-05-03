import React, { createContext, useContext, useState } from 'react';
import '../dropdown/dropdown.scss';

interface DropdownContextType {
  isShow: boolean;
  setIsShow: (show: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType>({
  isShow: false,
  setIsShow: () => {},
});

interface DropdownProps {
  trigger?: 'hover' | 'click';
  children?: React.ReactNode;
}

export const SDropdown: React.FC<DropdownProps> = ({
  trigger = 'hover',
  children,
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsShow(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsShow(!isShow);
    }
  };

  return (
    <DropdownContext.Provider value={{ isShow, setIsShow }}>
      <div
        className={`sw-dropdown ${isShow ? 'sw-dropdown--show' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sw-dropdown__trigger" onClick={handleClick}>
          {children && children[0]}
        </div>
        {children && children[1] && (
          <div className={`sw-dropdown__menu ${isShow ? 'sw-dropdown__menu--show' : ''}`}>
            {children[1]}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

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
  const { setIsShow } = useContext(DropdownContext);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsShow(false);
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