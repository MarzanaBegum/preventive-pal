import React, { InputHTMLAttributes } from 'react';

type ToggleFieldProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const ToggleField = React.forwardRef(
  (
    { label, className, ...props }: ToggleFieldProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="w-full flex justify-between items-center">
        <span className="font-semibold text-[18px] leading-[140%] text-[#101010]">
          {label}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="w-11 h-6 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#fff] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary bg-[#CDCDCD]" />
        </label>
      </div>
    );
  }
);

ToggleField.displayName = 'ToggleField';

export default ToggleField;
