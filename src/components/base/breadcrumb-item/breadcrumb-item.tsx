import React from 'react';

interface BreadcrumbItemProps {
  to?: string;
  children?: React.ReactNode;
}

const SBreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ to, children }) => {
  return (
    <div className="sw-breadcrumb__item">
      {to ? <a className="sw-breadcrumb__link" href={to}>{children}</a> : <span>{children}</span>}
      <span className="sw-breadcrumb__separator">/</span>
    </div>
  );
};

export default SBreadcrumbItem;