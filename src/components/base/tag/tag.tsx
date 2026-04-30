import React from 'react';
import '../../../theme/tag.scss';

type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
type TagSize = 'large' | 'middle' | 'small' | 'mini';

interface TagProps {
  type?: TagType;
  size?: TagSize;
  close?: boolean;
  round?: boolean;
  simple?: boolean;
  block?: boolean;
  line?: boolean;
  background?: string;
  color?: string;
  children?: React.ReactNode;
  onClose?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
}

const STag: React.FC<TagProps> = ({
  type = 'primary',
  size = 'middle',
  close = false,
  round = false,
  simple = false,
  block = false,
  line = false,
  background,
  color,
  children,
  onClose,
  onClick,
}) => {
  const classNames = [
    'sw-tag',
    `sw-tag-${type}`,
    `sw-tag-${size}`,
    round ? 'sw-tag-round' : '',
    simple ? 'sw-tag-simple' : '',
    block ? 'sw-tag-block' : '',
    line ? 'sw-tag-line' : '',
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {};
  if (background) style.backgroundColor = background;
  if (color) style.color = color;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.(e);
  };

  return (
    <span className={classNames} style={style} onClick={onClick}>
      {children}
      {close && (
        <span className="sw-tag__close" onClick={handleClose}>
          <i className="sw-icon sw-icon-close" />
        </span>
      )}
    </span>
  );
};

export default STag;