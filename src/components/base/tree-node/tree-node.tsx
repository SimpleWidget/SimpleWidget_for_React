import React from 'react';

interface TreeNodeProps {
  label: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const STreeNode: React.FC<TreeNodeProps> = ({
  label,
  children,
  disabled = false,
}) => {
  return (
    <div className="sw-tree__node">
      <div className="sw-tree__node-content" onClick={() => {}}>
        <span className="sw-tree__arrow">▶</span>
        <span className="sw-tree__label">{label}</span>
      </div>
      {children && <div className="sw-tree__children">{children}</div>}
    </div>
  );
};

export default STreeNode;