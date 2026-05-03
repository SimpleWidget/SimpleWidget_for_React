import React, { createContext, useContext, useState } from 'react';
import '../../../theme/checkbox.scss';

interface CheckboxProps {
  value?: boolean | string[];
  label?: string | number | boolean;
  disabled?: boolean;
  border?: boolean;
  showLabel?: boolean;
  children?: React.ReactNode;
  onChange?: (value: boolean | string[]) => void;
}

interface CheckboxGroupContextType {
  value: string[];
  disabled: boolean;
  setValue: (val: string[]) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

export const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error('Checkbox must be used within CheckboxGroup');
  }
  return context;
};

export const CheckboxGroup: React.FC<{
  value?: string[];
  disabled?: boolean;
  onChange?: (value: string[]) => void;
  children?: React.ReactNode;
}> = ({ value = [], disabled = false, onChange, children }) => {
  const [localValue, setLocalValue] = useState<string[]>(value);

  const setValue = (val: string[]) => {
    setLocalValue(val);
    onChange?.(val);
  };

  return (
    <CheckboxGroupContext.Provider value={{ value: localValue, disabled, setValue }}>
      <div className="sw-checkbox-group">{children}</div>
    </CheckboxGroupContext.Provider>
  );
};

const SCheckbox: React.FC<CheckboxProps> = ({
  value,
  label,
  disabled = false,
  border = false,
  showLabel = true,
  children,
  onChange,
}) => {
  const groupContext = useContext(CheckboxGroupContext);

  const isInGroup = !!groupContext;
  const isChecked = isInGroup
    ? groupContext.value.includes(label as string)
    : value === true;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isInGroup) {
      const arr = [...groupContext.value];
      if (e.target.checked) {
        arr.push(label as string);
      } else {
        const idx = arr.indexOf(label as string);
        if (idx > -1) arr.splice(idx, 1);
      }
      groupContext.setValue(arr);
      onChange?.(arr);
    } else {
      const newValue = e.target.checked;
      onChange?.(newValue);
    }
  };

  const isDisabled = disabled || (groupContext?.disabled ?? false);

  const classNames = [
    'sw-checkbox',
    isChecked ? 'sw-checkbox--checked' : '',
    isDisabled ? 'sw-checkbox--disabled' : '',
    border ? 'sw-checkbox--border' : '',
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className="sw-checkbox__input"
        value={label}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className="sw-checkbox__box" />
      <span className="sw-checkbox__text">
        {children}
        {!children && showLabel && label}
      </span>
    </label>
  );
};

export default SCheckbox;