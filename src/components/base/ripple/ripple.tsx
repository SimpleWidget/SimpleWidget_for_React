import React, { useRef } from 'react';
import './ripple.scss';

type FightingType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

interface RippleProps {
  ripplesColor?: string;
  duration?: number;
  type?: FightingType;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SRipple: React.FC<RippleProps> = ({
  ripplesColor = '',
  duration = 400,
  type = 'default',
  disabled = false,
  children,
}) => {
  const rippleRef = useRef<HTMLDivElement>(null);

  const COLOR_LIST: Record<string, string> = {
    default: '#f0f0f0',
    primary: '#2d5af1',
    success: '#52b35e',
    danger: '#ff0200',
    warning: '#fcc202',
    info: '#1d1d1f',
  };

  const handleClick = (evt: React.MouseEvent) => {
    if (disabled) return;

    const color = ripplesColor || COLOR_LIST[type] || COLOR_LIST.default;
    const rippleEl = document.createElement('span');
    rippleEl.className = 'sw-ripple__animation';

    const rect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    rippleEl.style.left = `${x}px`;
    rippleEl.style.top = `${y}px`;
    rippleEl.style.background = color;

    if (rippleRef.current) {
      rippleRef.current.appendChild(rippleEl);

      setTimeout(() => {
        rippleEl.remove();
      }, duration);
    }
  };

  return (
    <div ref={rippleRef} className="sw-ripple" onClick={handleClick}>
      {children}
    </div>
  );
};

export default SRipple;