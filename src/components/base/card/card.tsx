import React, { useState } from 'react';
import '../../../theme/card.scss';

interface CardProps {
  title?: string;
  round?: boolean;
  padding?: string | number;
  shadow?: 'hover' | 'always';
  close?: boolean;
  titleBold?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const SCard: React.FC<CardProps> = ({
  title = '',
  round = false,
  padding = 16,
  shadow = '',
  close = false,
  titleBold = false,
  children,
  onClose,
}) => {
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false);
    onClose?.();
  };

  const classNames = [
    'sw-card',
    round ? 'sw-card--round' : '',
    shadow === 'hover' ? 'sw-card--shadow' : '',
    shadow === 'always' ? 'sw-card--shadow-always' : '',
  ].filter(Boolean).join(' ');

  const paddingStyle = typeof padding === 'number' ? `${padding}px` : padding;

  if (!isShow) return null;

  return (
    <div className={classNames}>
      {(title || children) && (
        <header className="sw-card__header">
          <span className={`sw-card__title ${titleBold ? 'sw-card__title-bold' : ''}`}>
            {title}
          </span>
          {close && <span className="sw-card__close" onClick={handleClose}>✕</span>}
        </header>
      )}
      <main className="sw-card__body" style={{ padding: paddingStyle }}>
        {children}
      </main>
    </div>
  );
};

export default SCard;