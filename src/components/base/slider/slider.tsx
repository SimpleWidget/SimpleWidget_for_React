import React, { useMemo } from 'react';
import './slider.scss';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showInput?: boolean;
}

const SSlider: React.FC<SliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showInput = false,
}) => {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const className = `sw-slider ${disabled ? 'sw-slider--disabled' : ''}`;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange?.(val);
  };

  return (
    <div className={className}>
      <div className="sw-slider__track">
        <div className="sw-slider__fill" style={{ width: `${percentage}%` }} />
        <div className="sw-slider__thumb" style={{ left: `${percentage}%` }} />
      </div>
      {showInput && (
        <input
          type="number"
          className="sw-slider__input"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleInput}
        />
      )}
    </div>
  );
};

export default SSlider;