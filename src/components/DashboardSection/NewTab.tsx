import React, { InputHTMLAttributes } from 'react';

type ToggleFieldProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const OpenNewTab = React.forwardRef(
  (
    { label, ...props }: ToggleFieldProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex  items-center">
        <input
          ref={ref}
          id={props.name}
          type="checkbox"
          {...props}
          className="relative h-[20px] w-[20px] appearance-none rounded-[6px] border-[0.125rem] border-solid border-primary outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0  before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.3rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:after:-mt-px checked:focus:after:ml-[0.3rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-primary dark:checked:border-primary dark:checked:bg-primary"
        />
        <label
          htmlFor={props.name}
          className="text-[16px] pl-[10px] block leading-[1] cursor-pointer font-normal  text-[#444444]"
        >
          {label}
        </label>
      </div>
    );
  }
);

OpenNewTab.displayName = 'OpenNewTab';

export default OpenNewTab;
