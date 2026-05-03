import React, { useState, useEffect, useRef } from 'react';
import './count-down.scss';

interface CountDownProps {
  time?: number;
  format?: string;
  autoStart?: boolean;
  onFinish?: () => void;
  onChange?: (current: number) => void;
  children?: React.ReactNode;
}

const SCountDown: React.FC<CountDownProps> = ({
  time = 0,
  format = 'HH:mm:ss',
  autoStart = true,
  onFinish,
  onChange,
  children,
}) => {
  const [currentTime, setCurrentTime] = useState(time);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = format;
    result = result.replace('DD', String(days).padStart(2, '0'));
    result = result.replace('HH', String(hours).padStart(2, '0'));
    result = result.replace('mm', String(minutes).padStart(2, '0'));
    result = result.replace('ss', String(seconds).padStart(2, '0'));
    result = result.replace('S', String(Math.floor((ms % 1000) / 100)));

    return result;
  };

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev - 1000;
        onChange?.(newTime);
        if (newTime <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onFinish?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => stop();
  }, []);

  return (
    <div className="sw-count-down">
      {children || formatTime(currentTime)}
    </div>
  );
};

export default SCountDown;