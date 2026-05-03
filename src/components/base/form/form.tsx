import React, { createContext, useContext } from 'react';

interface FormContextType {
  model: Record<string, any>;
  labelWidth?: string | number;
  labelPosition?: 'left' | 'top';
}

const FormContext = createContext<FormContextType>({
  model: {},
  labelPosition: 'left',
});

interface FormProps {
  model?: Record<string, any>;
  labelWidth?: string | number;
  labelPosition?: 'left' | 'top';
  onSubmit?: (data: any) => void;
  children?: React.ReactNode;
}

export const SForm: React.FC<FormProps> = ({
  model = {},
  labelWidth = '80px',
  labelPosition = 'left',
  onSubmit,
  children,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(model);
  };

  return (
    <FormContext.Provider value={{ model, labelWidth, labelPosition }}>
      <form
        className={`sw-form sw-form--label-${labelPosition}`}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

interface FormItemProps {
  label?: string;
  prop?: string;
  children?: React.ReactNode;
}

export const SFormItem: React.FC<FormItemProps> = ({
  label = '',
  children,
}) => {
  const { labelWidth } = useContext(FormContext);

  const width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;

  return (
    <div className="sw-form__item">
      {label && (
        <label className="sw-form__item-label" style={{ width }}>
          {label}
        </label>
      )}
      <div className="sw-form__item-control">
        {children}
      </div>
    </div>
  );
};