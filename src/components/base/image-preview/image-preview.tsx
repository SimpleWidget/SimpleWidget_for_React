import React, { useState } from 'react';
import './image-preview.scss';

interface ImagePreviewProps {
  src?: string;
}

const SImagePreview: React.FC<ImagePreviewProps> = ({ src = '' }) => {
  const [isShow, setIsShow] = useState(false);

  const open = () => setIsShow(true);
  const close = () => setIsShow(false);

  if (!src) return null;

  return (
    <div className="sw-image-preview">
      <img src={src} alt="" onClick={open} style={{ cursor: 'pointer' }} />
      {isShow && (
        <div className="sw-image-preview__mask" onClick={close}>
          <div className="sw-image-preview__content">
            <img src={src} alt="" onClick={e => e.stopPropagation()} />
            <span className="sw-image-preview__close" onClick={close}>✕</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SImagePreview;