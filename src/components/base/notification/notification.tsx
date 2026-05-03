import React, { useState, useEffect } from 'react';
import './notification.scss';

interface NotificationProps {
  title?: string;
  message?: string;
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  close?: boolean;
  duration?: number;
  round?: boolean;
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClose?: () => void;
}

const SNotification: React.FC<NotificationProps> = ({
  title = '',
  message = '',
  type = 'default',
  close = false,
  duration = 2500,
  round = false,
  placement = 'top-right',
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const className = [
    'sw-notification',
    `sw-notification__${type}`,
    `sw-notification__${placement}`,
    round ? 'sw-notification__round' : '',
  ].filter(Boolean).join(' ');

  if (!visible) return null;

  return (
    <div className={className}>
      <div className="sw-notification__content">
        {title && <h3 className="sw-notification__title">{title}</h3>}
        <div className="sw-notification__message">{message}</div>
      </div>
      {close && <span className="sw-notification__close" onClick={handleClose}>✕</span>}
    </div>
  );
};

export default SNotification;

let notificationContainer: HTMLElement | null = null;

export function showNotification(options: {
  title?: string;
  message: string;
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  duration?: number;
  close?: boolean;
  round?: boolean;
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'sw-notification-container';
    document.body.appendChild(notificationContainer);
  }

  const typeColors: Record<string, string> = {
    default: '#f0f0f0',
    primary: '#2d5af1',
    success: '#52b35e',
    danger: '#ff0200',
    warning: '#fcc202',
  };

  const textColors: Record<string, string> = {
    default: '#333',
    primary: '#fff',
    success: '#fff',
    danger: '#fff',
    warning: '#333',
  };

  const type = options.type || 'default';
  const placement = options.placement || 'top-right';

  let positionStyle = '';
  if (placement === 'top-left') {
    positionStyle = 'top: 20px; left: 20px;';
  } else if (placement === 'top-right') {
    positionStyle = 'top: 20px; right: 20px;';
  } else if (placement === 'bottom-left') {
    positionStyle = 'bottom: 20px; left: 20px;';
  } else if (placement === 'bottom-right') {
    positionStyle = 'bottom: 20px; right: 20px;';
  }

  const div = document.createElement('div');
  div.style.cssText = `position: fixed; ${positionStyle}; z-index: 9999;`;
  notificationContainer.appendChild(div);

  div.innerHTML = `
    <div style="
      padding: 13px 20px;
      font-size: 14px;
      min-width: 300px;
      max-width: 500px;
      background: ${typeColors[type]};
      color: ${textColors[type]};
      border-radius: ${options.round ? '10px' : '4px'};
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: flex-start;
      gap: 10px;
      transition: all 0.4s ease-out;
    ">
      <div style="flex: 1;">
        ${options.title ? `<h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 500;">${options.title}</h3>` : ''}
        <div style="font-size: 15px; font-weight: 500;">${options.message}</div>
      </div>
      ${options.close ? '<span onclick="this.parentElement.parentElement.remove()" style="cursor:pointer;position:absolute;top:12px;right:12px;opacity:0.7">✕</span>' : ''}
    </div>
  `;

  if (options.duration && options.duration > 0) {
    setTimeout(() => {
      div.remove();
    }, options.duration);
  }
}