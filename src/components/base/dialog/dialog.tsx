import React from 'react';
import '../../../theme/dialog.scss';

interface DialogProps {
  visible: boolean;
  title?: string;
  width?: string | number;
  fullscreen?: boolean;
  showMask?: boolean;
  maskClose?: boolean;
  appendToBody?: boolean;
  showHeader?: boolean;
  showCloseIcon?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const SDialog: React.FC<DialogProps> = ({
  visible = false,
  title = '',
  width,
  fullscreen = false,
  showMask = true,
  maskClose = true,
  showHeader = true,
  showCloseIcon = true,
  children,
  onClose,
}) => {
  const handleMaskClick = () => {
    if (maskClose) {
      onClose?.();
    }
  };

  const dialogClassName = [
    'sw-dialog',
    fullscreen ? 'sw-dialog__fullscreen' : '',
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {};
  if (width) {
    containerStyle.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (!visible) return null;

  return (
    <div className={dialogClassName}>
      {showMask && <div className="sw-dialog__mask" onClick={handleMaskClick} />}
      <div className="sw-dialog__wrapper">
        <div className="sw-dialog__container" style={containerStyle}>
          {showHeader && (
            <header className="sw-dialog__header">
              <div className="sw-dialog__header-before" />
              <div className="sw-dialog__header-center">{title}</div>
              <div className="sw-dialog__header-after">
                {showCloseIcon && (
                  <span className="sw-dialog__close" onClick={onClose}>✕</span>
                )}
              </div>
            </header>
          )}
          <section className="sw-dialog__body">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default SDialog;