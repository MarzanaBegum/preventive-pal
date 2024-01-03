import { ReactNode } from 'react';

export type IconType = {
  height?: number | string;
  width?: number | string;
  color?: string;
  stroke?: string;
  className?: string;
  onClick?: any;
};
type SvgIcon = {
  svg: ({ width, height, color, className }: IconType) => ReactNode;
};
function CustomIcon({ svg, ...props }: IconType & SvgIcon) {
  return <>{svg({ ...props })}</>;
}

CustomIcon.defaultProps = {
  height: 24,
  width: 24,
  color: '#000',
  stroke: '#222222',
  className: '',
};

export default CustomIcon;
