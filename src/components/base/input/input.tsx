import React, { useState } from 'react';
import '../../../theme/input.scss';

interface InputProps {
  value?: string | number;
  type?: 'text' | 'password' | 'number';
  size?: 'large' | 'middle' | 'small' | 'mini';
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  name?: string;
  placeholder?: string;
  clear?: boolean;
  showPassword?: boolean;
  search?: boolean;
  maxLength?: number;
  max?: number;
  min?: number;
  icon?: string;
  width?: string | number;
  height?: string | number;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onEnter?: (e: React.KeyboardEvent) => void;
  onSearch?: (value: string | number) => void;
  onClear?: () => void;
}

const SInput: React.FC<InputProps> = ({
  value = '',
  type = 'text',
  size = 'middle',
  disabled = false,
  readonly = false,
  autofocus = false,
  name = 'sw-input',
  placeholder = '',
  clear = false,
  showPassword = false,
  search = false,
  maxLength,
  max,
  min,
  icon,
  width,
  height,
  onChange,
  onInput,
  onFocus,
  onBlur,
  onEnter,
  onSearch,
  onClear,
}) => {
  const [showPass, setShowPass] = useState(false);

  const inputType = type === 'password' && showPass ? 'text' : type;

  const classNames = [
    'sw-input',
    `sw-input-${size}`,
    disabled ? 'sw-input-disabled' : '',
    search ? 'sw-input-search' : '',
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    onInput?.(e.target.value);
  };

  const handleClear = () => {
    onClear?.();
  };

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter?.(e);
      if (search) {
        onSearch?.(value);
      }
    }
  };

  return (
    <div className={classNames} style={style}>
      <div className="sw-input__wrapper">
        {icon && <span className={`sw-input__icon sw-icon ${icon}`} />}
        <input
          className="sw-input__inner"
          type={inputType}
          value={value}
          disabled={disabled}
          readOnly={readonly}
          autoFocus={autofocus}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          max={max}
          min={min}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={handleKeyUp}
        />
        {clear && value && (
          <span className="sw-input__clear-btn sw-icon sw-icon-close" onClick={handleClear} />
        )}
        {showPassword && (
          <span
            className={`sw-input__password-btn sw-icon ${showPass ? 'sw-icon-eye-outline' : 'sw-icon-eye-off-outline'}`}
            onClick={togglePassword}
          />
        )}
      </div>
      {search && (
        <div className="sw-input__search" onClick={() => onSearch?.(value)}>
          <button className="sw-input__search-btn sw-button sw-button-primary sw-button-middle">
            搜索
          </button>
        </div>
      )}
    </div>
  );
};

export default SInput;