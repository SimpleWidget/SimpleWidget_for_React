import React, { createContext, useContext } from 'react';

interface StepsContextType {
  current: number;
}

const StepsContext = createContext<StepsContextType>({ current: 1 });

interface StepsProps {
  current?: number;
  children?: React.ReactNode;
}

export const SSteps: React.FC<StepsProps> = ({
  current = 1,
  children,
}) => {
  return (
    <StepsContext.Provider value={{ current }}>
      <div className="sw-steps">
        {children}
      </div>
    </StepsContext.Provider>
  );
};

interface StepsItemProps {
  title: string;
  description?: string;
  status?: 'wait' | 'active' | 'finish' | 'error';
  children?: React.ReactNode;
}

export const SStepsItem: React.FC<StepsItemProps> = ({
  title,
  description,
  status = 'wait',
  children,
}) => {
  const { current } = useContext(StepsContext);

  const getStatus = (): string => {
    if (status === 'active') return 'active';
    if (status === 'finish') return 'finish';
    if (status === 'error') return 'error';
    return 'wait';
  };

  return (
    <div className="sw-steps__item">
      <div className={`sw-steps__dot sw-steps__dot--${getStatus()}`}>
        <span>{getStatus() === 'finish' ? '✓' : getStatus() === 'error' ? '✕' : '1'}</span>
      </div>
      <div className="sw-steps__content">
        <div className="sw-steps__title">{title}</div>
        {description && <div className="sw-steps__description">{description}</div>}
      </div>
      {children}
    </div>
  );
};