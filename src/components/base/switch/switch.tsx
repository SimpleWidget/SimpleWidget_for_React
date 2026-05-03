import React from 'react';
import '../../../theme/switch.scss';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  onChange?: (value: boolean) => void;
}

const SSwitch: React.FC<SwitchProps> = ({
  checked = false,
  disabled = false,
  activeColor,
  inactiveColor,
  onChange,
}) => {
  const classNames = [
    'sw-switch',
    checked ? 'sw-switch--checked' : '',
    disabled ? 'sw-switch--disabled' : '',
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {};
  if (checked && activeColor) style['--sw-switch-active-color'] = activeColor;
  if (!checked && inactiveColor) style['--sw-switch-inactive-color'] = inactiveColor;

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <div className={classNames} style={style} onClick={handleClick}>
      <span className="sw-switch__core" />
    </div>
  );
};

export default SSwitch;