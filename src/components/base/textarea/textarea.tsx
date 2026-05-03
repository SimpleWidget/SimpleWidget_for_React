import React from 'react';
import '../../../theme/textarea.scss';

interface TextareaProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

const STextarea: React.FC<TextareaProps> = ({
  value = '',
  placeholder = '',
  disabled = false,
  rows = 3,
  maxLength,
  showCount = false,
  onChange,
  onFocus,
  onBlur,
}) => {
  const classNames = [
    'sw-textarea',
    disabled ? 'sw-textarea--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <textarea
        className="sw-textarea__inner"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showCount && maxLength && (
        <span className="sw-textarea__count">
          {value.length} / {maxLength}
        </span>
      )}
    </div>
  );
};

export default STextarea;