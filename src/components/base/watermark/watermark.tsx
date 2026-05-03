import React, { useRef, useEffect } from 'react';
import './watermark.scss';

interface WatermarkProps {
  text?: string;
  gap?: number;
  children?: React.ReactNode;
}

const SWatermark: React.FC<WatermarkProps> = ({
  text = 'watermark',
  gap = 20,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 200;
        canvas.height = 100;
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.rotate(-15 * Math.PI / 180);
        ctx.fillText(text, 20, 50);
        containerRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
        containerRef.current.style.backgroundRepeat = 'repeat';
        containerRef.current.style.backgroundPosition = '0 0';
      }
    }
  }, [text, gap]);

  return (
    <div ref={containerRef} className="sw-watermark">
      {children}
    </div>
  );
};

export default SWatermark;