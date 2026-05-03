import React, { createContext, useContext, useState, useEffect } from 'react';

interface RadioGroupContextType {
  modelValue: string | number;
  disabled: boolean;
  setChange: (val: string | number) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType>({
  modelValue: '',
  disabled: false,
  setChange: () => {},
});

interface RadioGroupProps {
  modelValue?: string | number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  children?: React.ReactNode;
}

export const SRadioGroup: React.FC<RadioGroupProps> = ({
  modelValue = '',
  disabled = false,
  onChange,
  children,
}) => {
  const [value, setValue] = useState(modelValue);

  useEffect(() => {
    setValue(modelValue);
  }, [modelValue]);

  const setChange = (val: string | number) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ modelValue: value, disabled, setChange }}>
      <div className="sw-radio-group">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export const useRadioGroupContext = () => useContext(RadioGroupContext);

export default SRadioGroup;