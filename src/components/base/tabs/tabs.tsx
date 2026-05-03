import React, { createContext, useContext, useState } from 'react';
import '../../../theme/tabs.scss';

interface TabsContextType {
  activeName: string | number;
  changeTab: (name: string | number) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsItem must be used within Tabs');
  }
  return context;
};

interface TabsProps {
  value?: string | number;
  children?: React.ReactNode;
  onChange?: (name: string | number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  value = 0,
  children,
  onChange,
}) => {
  const [activeName, setActiveName] = useState<string | number>(value);

  const changeTab = (name: string | number) => {
    setActiveName(name);
    onChange?.(name);
  };

  return (
    <TabsContext.Provider value={{ activeName, changeTab }}>
      <div className="sw-tabs">
        <div className="sw-tabs__head">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, { isTab: true });
            }
            return child;
          })}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

interface TabsItemProps {
  label: string;
  name?: string | number;
  children?: React.ReactNode;
  isTab?: boolean;
}

export const TabsItem: React.FC<TabsItemProps> = ({
  label,
  name = 0,
  children,
  isTab,
}) => {
  const context = useTabsContext();
  const isActive = context.activeName === name;

  if (isTab) {
    return (
      <div
        className={`sw-tabs__nav-item ${isActive ? 'sw-tabs__nav-item--active' : ''}`}
        onClick={() => context.changeTab(name)}
      >
        {label}
      </div>
    );
  }

  if (isActive) {
    return <div className="sw-tabs__panel sw-tabs__panel--active">{children}</div>;
  }

  return null;
};

export default Tabs;