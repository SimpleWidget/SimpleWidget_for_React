import React, { createContext, useContext, useState, useEffect } from 'react';

interface CheckboxGroupContextType {
  modelValue: string[];
  disabled: boolean;
  setChange: (val: string[]) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType>({
  modelValue: [],
  disabled: false,
  setChange: () => {},
});

interface CheckboxGroupProps {
  modelValue?: string[];
  disabled?: boolean;
  onChange?: (value: string[]) => void;
  children?: React.ReactNode;
}

export const SCheckboxGroup: React.FC<CheckboxGroupProps> = ({
  modelValue = [],
  disabled = false,
  onChange,
  children,
}) => {
  const [value, setValue] = useState(modelValue);

  useEffect(() => {
    setValue(modelValue);
  }, [modelValue]);

  const setChange = (val: string[]) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <CheckboxGroupContext.Provider value={{ modelValue: value, disabled, setChange }}>
      <div className="sw-checkbox-group">
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

export default SCheckboxGroup;