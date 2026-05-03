import React, { useState } from 'react';
import { SButton } from '../button';
import './confirm-box.scss';

interface ConfirmBoxProps {
  show?: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onClose?: () => void;
}

const SConfirmBox: React.FC<ConfirmBoxProps> = ({
  show = false,
  title = '',
  content = '',
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose?.();
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      if (onConfirm) {
        await onConfirm();
      }
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      if (onCancel) {
        await onCancel();
      }
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  if (!show) return null;

  return (
    <div className="sw-confirm-box">
      <div className="sw-confirm-box__mask" />
      <div className="sw-confirm-box__container">
        <div className="sw-confirm-box__header">
          <div className="sw-confirm-box__title">{title}</div>
          <span
            className="sw-confirm-box__close"
            style={{ opacity: isLoading ? 0.5 : 1 }}
            onClick={handleClose}
          >
            ✕
          </span>
        </div>
        <div className="sw-confirm-box__body">{content}</div>
        <div className="sw-confirm-box__footer">
          <SButton disabled={isLoading} onClick={handleCancel}>
            {cancelText}
          </SButton>
          <SButton type="primary" loading={isLoading} onClick={handleConfirm}>
            {confirmText}
          </SButton>
        </div>
      </div>
    </div>
  );
};

export default SConfirmBox;