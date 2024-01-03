import classNames from 'classnames';
import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
  data: any;
}

const RightSectionWrapper = ({ children, data }: WrapperProps) => {
  return (
    <div className={classNames(data && data.hidden && 'opacity-[0.5]')}>
      {children}
    </div>
  );
};

export default RightSectionWrapper;
