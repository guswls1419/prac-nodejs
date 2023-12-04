/* eslint-disable react/no-unknown-property */
import React, { FC } from 'react';

interface EllipseProps {
  size?: string;
  fill?: string;
}

const Ellipse: FC<EllipseProps> = ({ size = '30', fill = '#B47AEA' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill={fill} />
    </svg>
  );
};

export default Ellipse;
