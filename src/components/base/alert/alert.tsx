import React, { useState } from 'react';
import '../../../theme/alert.scss';

interface AlertProps {
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  close?: boolean;
  simple?: boolean;
  center?: boolean;
  round?: boolean;
  fixed?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const SAlert: React.FC<AlertProps> = ({
  type = 'default',
  title,
  close = false,
  simple = false,
  center = false,
  round = false,
  fixed = false,
  children,
  onClose,
}) => {
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false);
    onClose?.();
  };

  const classNames = [
    'sw-alert',
    `sw-alert__${type}`,
    simple ? 'sw-alert--simple' : '',
    center ? 'sw-alert--center' : '',
    round ? 'sw-alert--round' : '',
    fixed ? 'sw-alert--fixed' : '',
  ].filter(Boolean).join(' ');

  if (!isShow) return null;

  return (
    <div className={classNames}>
      <div className="sw-alert__content">
        {title && <div className="sw-alert__title">{title}</div>}
        {children && <div className="sw-alert__sub-title">{children}</div>}
      </div>
      {close && <span className="sw-alert__close" onClick={handleClose}>✕</span>}
    </div>
  );
};

export default SAlert;