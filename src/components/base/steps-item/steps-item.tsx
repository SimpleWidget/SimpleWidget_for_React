import React from 'react';

interface StepsItemProps {
  title: string;
  description?: string;
  status?: 'wait' | 'active' | 'finish' | 'error';
  children?: React.ReactNode;
}

const SStepsItem: React.FC<StepsItemProps> = ({
  title,
  description,
  status = 'wait',
  children,
}) => {
  return (
    <div className="sw-steps__item">
      <div className={`sw-steps__dot sw-steps__dot--${status}`}>
        {status === 'finish' ? '✓' : status === 'error' ? '✕' : '1'}
      </div>
      <div className="sw-steps__content">
        <div className="sw-steps__title">{title}</div>
        {description && <div className="sw-steps__description">{description}</div>}
      </div>
      {children}
    </div>
  );
};

export default SStepsItem;