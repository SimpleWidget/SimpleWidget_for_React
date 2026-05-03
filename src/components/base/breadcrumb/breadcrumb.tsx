import React from 'react';
import '../../../theme/breadcrumb.scss';

interface BreadcrumbProps {
  separator?: string;
  children?: React.ReactNode;
}

const SBreadcrumb: React.FC<BreadcrumbProps> = ({
  separator = '/',
  children,
}) => {
  return (
    <div className="sw-breadcrumb">
      {children}
    </div>
  );
};

interface BreadcrumbItemProps {
  to?: string;
  children?: React.ReactNode;
  separator?: string;
}

const SBreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  to,
  children,
  separator = '/',
}) => {
  return (
    <div className="sw-breadcrumb__item">
      {to ? (
        <a className="sw-breadcrumb__link" href={to}>{children}</a>
      ) : (
        <span>{children}</span>
      )}
      <span className="sw-breadcrumb__separator">{separator}</span>
    </div>
  );
};

export { SBreadcrumb, SBreadcrumbItem };
export default SBreadcrumb;