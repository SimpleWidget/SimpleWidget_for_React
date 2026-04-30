import React, { useContext } from 'react';
import { useSelectContext } from './select';
import '../../../theme/option.scss';

interface OptionProps {
  value: string | number;
  label?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SOption: React.FC<OptionProps> = ({
  value,
  label,
  disabled = false,
  children,
}) => {
  const context = useSelectContext();

  const displayLabel = label || value?.toString() || '';
  const isActive = context.props.value === value;
  const isDisabled = disabled || !!context.props.disabled;

  const isFiltered = context.filterText
    ? displayLabel.toLowerCase().includes(context.filterText.toLowerCase())
    : true;

  const handleClick = () => {
    if (isDisabled) return;
    context.handleOptionClick(value, displayLabel);
  };

  const classNames = [
    'sw-option',
    isActive ? 'sw-option--active' : '',
    isDisabled ? 'sw-option--disabled' : '',
  ].filter(Boolean).join(' ');

  if (!isFiltered) return null;

  return (
    <div className={classNames} onClick={handleClick}>
      {children || displayLabel}
    </div>
  );
};

export default SOption;