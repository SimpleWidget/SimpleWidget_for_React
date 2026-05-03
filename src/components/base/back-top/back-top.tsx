import React, { useState, useEffect } from 'react';
import './back-top.scss';

interface BackTopProps {
  visibleHeight?: number;
  top?: number;
  children?: React.ReactNode;
}

const SBackTop: React.FC<BackTopProps> = ({
  visibleHeight = 200,
  top = 0,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollTop > visibleHeight);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [visibleHeight]);

  const handleClick = () => {
    window.scrollTo({ top, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="sw-back-top" onClick={handleClick}>
      {children || '↑'}
    </div>
  );
};

export default SBackTop;