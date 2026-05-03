import React, { useState } from 'react';
import './tree.scss';

interface TreeNode {
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}

interface TreeProps {
  data?: TreeNode[];
  showCheckbox?: boolean;
  defaultExpandAll?: boolean;
  onSelect?: (node: TreeNode) => void;
}

const STree: React.FC<TreeProps> = ({
  data = [],
  showCheckbox = false,
  defaultExpandAll = false,
  onSelect,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandAll ? data.map((_, i) => String(i)) : []);

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSelect = (node: TreeNode) => {
    onSelect?.(node);
  };

  const renderNode = (node: TreeNode, index: string, parentIndex = '') => {
    const key = parentIndex ? `${parentIndex}-${index}` : index;
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedKeys.includes(key);

    return (
      <div key={key} className="sw-tree__node">
        <div className="sw-tree__node-content" onClick={() => handleSelect(node)}>
          {hasChildren && (
            <span
              className={`sw-tree__arrow ${isExpanded ? 'sw-tree__arrow--expanded' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(key);
              }}
            >
              ▶
            </span>
          )}
          {showCheckbox && <span className="sw-tree__checkbox">☐</span>}
          <span className="sw-tree__label">{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="sw-tree__children">
            {node.children!.map((child, childIndex) => renderNode(child, String(childIndex), key))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sw-tree">
      {data.map((node, index) => renderNode(node, String(index)))}
    </div>
  );
};

export default STree;