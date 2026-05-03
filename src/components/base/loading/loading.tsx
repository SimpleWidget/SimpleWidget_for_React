import React from 'react';
import './loading.scss';

interface LoadingProps {
  visible?: boolean;
  text?: string;
  color?: string;
  fullscreen?: boolean;
  background?: string;
}

const SLoading: React.FC<LoadingProps> = ({
  visible = false,
  text = '',
  color = '',
  fullscreen = false,
  background = '',
}) => {
  const className = `sw-loading ${fullscreen ? 'sw-loading--fullscreen' : ''}`.trim();

  const style: Record<string, string> = {};
  if (color) {
    style['--sw-loading-color'] = color;
  }
  if (background) {
    style['--sw-loading-background'] = background;
  }

  if (!visible) return null;

  return (
    <div className={className} style={style}>
      <div className="sw-loading__animation">
        <svg viewBox="0 0 50 50" className="sw-loading__spinner">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <animate attributeName="stroke-dasharray" values="1,150;90,150;90,150" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-35;-125" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      {text && <span className="sw-loading__text">{text}</span>}
    </div>
  );
};

export default SLoading;