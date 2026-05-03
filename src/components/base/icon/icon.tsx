import React from 'react';

interface IconProps {
  name: string;
}

const SIcon: React.FC<IconProps> = ({ name }) => {
  return <i className={`sw-icon-${name}`} />;
};

export default SIcon;