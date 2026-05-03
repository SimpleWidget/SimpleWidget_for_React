import React, { useContext } from 'react';
import { FormContext } from '../form';

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

export default SFormItem;