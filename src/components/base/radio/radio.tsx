import React, { createContext, useContext, useState } from 'react';
import '../../../theme/radio.scss';

interface RadioProps {
  value?: string | number;
  label?: string | number;
  disabled?: boolean;
  border?: boolean;
  children?: React.ReactNode;
  onChange?: (value: string | number) => void;
}

interface RadioGroupContextType {
  value: string | number;
  disabled: boolean;
  setValue: (val: string | number) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio must be used within RadioGroup');
  }
  return context;
};

export const RadioGroup: React.FC<{
  value?: string | number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  children?: React.ReactNode;
}> = ({ value = '', disabled = false, onChange, children }) => {
  const [localValue, setLocalValue] = useState<string | number>(value);

  const setValue = (val: string | number) => {
    setLocalValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ value: localValue, disabled, setValue }}>
      <div className="sw-radio-group">{children}</div>
    </RadioGroupContext.Provider>
  );
};

const SRadio: React.FC<RadioProps> = ({
  value,
  label,
  disabled = false,
  border = false,
  children,
  onChange,
}) => {
  const groupContext = useContext(RadioGroupContext);

  const isInGroup = !!groupContext;
  const isChecked = isInGroup ? groupContext.value === label : value === label;

  const handleChange = () => {
    if (groupContext) {
      groupContext.setValue(label);
      onChange?.(label);
    }
  };

  const isDisabled = disabled || (groupContext?.disabled ?? false);

  const classNames = [
    'sw-radio',
    isChecked ? 'sw-radio--checked' : '',
    isDisabled ? 'sw-radio--disabled' : '',
    border ? 'sw-radio--border' : '',
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames} onClick={handleChange}>
      <input
        type="radio"
        className="sw-radio__input"
        value={label}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => {}}
      />
      <span className="sw-radio__box" />
      <span className="sw-radio__text">
        {children}
        {!children && label}
      </span>
    </label>
  );
};

export default SRadio;