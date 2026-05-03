import React from 'react';
import '../../../theme/progress.scss';

interface ProgressProps {
  percentage?: number;
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  height?: string | number;
  showText?: boolean;
  stripe?: boolean;
}

const SProgress: React.FC<ProgressProps> = ({
  percentage = 0,
  type = 'primary',
  height,
  showText = true,
  stripe = false,
}) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const classNames = [
    'sw-progress',
    'sw-progress--line',
    `sw-progress__${type}`,
    stripe ? 'sw-progress--stripe' : '',
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {};
  if (height) {
    containerStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div className={classNames}>
      <div className="sw-progress__container" style={containerStyle}>
        <div className="sw-progress__bar" style={{ width: `${clampedPercentage}%` }} />
      </div>
      {showText && <span className="sw-progress__text">{clampedPercentage}%</span>}
    </div>
  );
};

export default SProgress;