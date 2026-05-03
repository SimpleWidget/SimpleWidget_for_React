import React from 'react';

interface TabsItemProps {
  label: string;
  name?: string | number;
  children?: React.ReactNode;
}

const STabsItem: React.FC<TabsItemProps> = ({
  label,
  name = 0,
  children,
}) => {
  return (
    <div className="sw-tabs__panel">
      {children}
    </div>
  );
};

export default STabsItem;