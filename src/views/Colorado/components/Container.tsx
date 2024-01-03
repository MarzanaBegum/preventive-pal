import React, { MutableRefObject } from 'react';

interface Props {
  children: React.ReactNode;
  className: string;
  ref?: MutableRefObject<null>;
}

const Container = ({
  children,
  className,
  ref,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <section
      className={`w-full h-[100svh] relative flex items-center justify-center text-center overflow-hidden ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </section>
  );
};

export default Container;
