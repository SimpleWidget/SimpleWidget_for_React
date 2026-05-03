import React, { useState } from 'react';
import './tooltip.scss';

type TooltipPosition = 'top' | 'bottom' | 'right' | 'left';
type TooltipState = 'hover' | 'active' | 'always';

interface TooltipProps {
  content?: string | number;
  position?: TooltipPosition;
  disabled?: boolean;
  state?: TooltipState;
  noArrow?: boolean;
  bold?: boolean;
  bright?: boolean;
  background?: string;
  fontColor?: string;
  children?: React.ReactNode;
}

const STooltip: React.FC<TooltipProps> = ({
  content = '',
  position = 'bottom',
  disabled = false,
  state = 'hover',
  noArrow = false,
  bold = false,
  bright = false,
  background = '',
  fontColor = '',
  children,
}) => {
  const [visible, setVisible] = useState(state === 'always');

  const handleMouseEnter = () => {
    if (state === 'hover' && !disabled) {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (state === 'hover' && !disabled) {
      setVisible(false);
    }
  };

  const className = [
    'sw-tooltip',
    `sw-tooltip--${position}`,
    disabled ? 'sw-tooltip--disabled' : '',
    bold ? 'sw-tooltip--bold' : '',
    noArrow ? 'sw-tooltip--no-arrow' : '',
    bright ? 'sw-tooltip--bright' : '',
  ].filter(Boolean).join(' ');

  const style: Record<string, string> = {};
  if (background) {
    style['--sw-tooltip-background'] = background;
  }
  if (fontColor) {
    style['--sw-tooltip-font-color'] = fontColor;
  }

  return (
    <div
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && content && (
        <div className={`sw-tooltip__content sw-tooltip--${position}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default STooltip;