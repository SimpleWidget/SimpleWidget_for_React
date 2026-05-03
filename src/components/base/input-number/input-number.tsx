import React from 'react';
import './input-number.scss';

interface InputNumberProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'large' | 'middle' | 'small' | 'mini';
}

const SInputNumber: React.FC<InputNumberProps> = ({
  value = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  size = 'middle',
}) => {
  const className = [
    'sw-input-number',
    disabled ? 'sw-input-number--disabled' : '',
    `sw-input-number--${size}`,
  ].filter(Boolean).join(' ');

  const decrease = () => {
    if (disabled) return;
    const newVal = value - step;
    if (newVal >= min) {
      onChange?.(newVal);
    }
  };

  const increase = () => {
    if (disabled) return;
    const newVal = value + step;
    if (newVal <= max) {
      onChange?.(newVal);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange?.(val);
    }
  };

  return (
    <div className={className}>
      <button className="sw-input-number__decrease" onClick={decrease} disabled={disabled}>-</button>
      <input
        className="sw-input-number__input"
        type="number"
        value={value}
        disabled={disabled}
        onChange={handleInput}
      />
      <button className="sw-input-number__increase" onClick={increase} disabled={disabled}>+</button>
    </div>
  );
};

export default SInputNumber;