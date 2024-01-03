import _ from 'lodash';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';

type PropsType = {
  label?: string;
  labelComponent?: ReactNode;
  errors?: FieldErrors;
  haddleOnChange?: (e: any) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const LinkUrlField = React.forwardRef(
  (
    {
      className,
      labelComponent,
      label,
      errors,
      haddleOnChange,
      ...props
    }: PropsType,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const inputStyle =
      'outline-[#E5DDED] w-[100%] focus:outline-none h-[55px] text-primary-text bg-[#F8F8F8] text-[16px] font-medium border border-[#E5DDED] rounded-[6px] mt-[16px] px-[16px] py-[18px] ';

    const error = _.get(errors, props.name || '');

    return (
      <>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <label
              htmlFor={props.name}
              className="font-semibold text-[18px] leading-[140%] text-[#444444]"
            >
              {label}
            </label>
            <div>{labelComponent}</div>
          </div>
          <div className="relative">
            <input
              ref={ref}
              id={props.name}
              className={`${inputStyle} ${className}`}
              {...props}
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  haddleOnChange && haddleOnChange(value);
                }
              }}
            />
            {error && (
              <div className="mt-1 text-sm text-red-500">
                {error?.message?.toString()}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

LinkUrlField.displayName = 'LinkUrlField';

export default LinkUrlField;
