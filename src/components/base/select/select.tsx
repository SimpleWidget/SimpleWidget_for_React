import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import '../../../theme/select.scss';

interface SelectProps {
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  size?: 'large' | 'middle' | 'small' | 'mini';
  children?: ReactNode;
  onChange?: (value: string | number) => void;
  onClear?: () => void;
  onVisibleChange?: (visible: boolean) => void;
}

interface SelectContextType {
  props: SelectProps;
  visible: boolean;
  filterText: string;
  selectedLabel: string;
  handleOptionClick: (value: string | number, label: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Option must be used within Select');
  }
  return context;
};

const SSelect: React.FC<SelectProps> = ({
  value = '',
  placeholder = '请选择',
  disabled = false,
  clearable = false,
  filterable = false,
  size = 'middle',
  children,
  onChange,
  onClear,
  onVisibleChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setVisible(false);
        onVisibleChange?.(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onVisibleChange]);

  const handleOptionClick = (val: string | number, label: string) => {
    setSelectedLabel(label);
    setVisible(false);
    setFilterText('');
    onChange?.(val);
  };

  const showClear = clearable && !!value && !disabled;

  const wrapperClassName = [
    'sw-select__placeholder',
    selectedLabel || value ? 'sw-select__placeholder--hidden' : '',
  ].filter(Boolean).join(' ');

  const classNames = [
    'sw-select',
    `sw-select--${size}`,
    disabled ? 'sw-select--disabled' : '',
    visible ? 'sw-select--open' : '',
  ].filter(Boolean).join(' ');

  const arrowClassName = [
    'sw-select__arrow',
    visible ? 'sw-select__arrow--open' : '',
  ].filter(Boolean).join(' ');

  return (
    <SelectContext.Provider
      value={{
        props: { value, placeholder, disabled, clearable, filterable, size },
        visible,
        filterText,
        selectedLabel,
        handleOptionClick,
      }}
    >
      <div ref={selectRef} className={classNames}>
        <div className="sw-select__wrapper" onClick={() => !disabled && setVisible(!visible)}>
          <span className="sw-select__value">
            <span className={wrapperClassName}>{placeholder}</span>
            {selectedLabel && <span className="sw-select__label">{selectedLabel}</span>}
          </span>
          <span className="sw-select__suffix">
            {showClear ? (
              <span className="sw-select__clear" onClick={(e) => { e.stopPropagation(); setSelectedLabel(''); onClear?.(); }}>
                <i className="sw-icon sw-icon-circle-close" />
              </span>
            ) : (
              <span className={arrowClassName}>
                <i className="sw-icon sw-icon-arrow-down" />
              </span>
            )}
          </span>
        </div>
        {visible && <div className="sw-select__dropdown">{children}</div>}
      </div>
    </SelectContext.Provider>
  );
};

export default SSelect;