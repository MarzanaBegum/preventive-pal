import React, { InputHTMLAttributes, ReactNode, useState } from 'react';

type InputFieldProps = {
  labelComponent?: ReactNode;
  onNewChange?: (e: any) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const ScrollBtnField = React.forwardRef(
  (
    { className, labelComponent, onNewChange, ...props }: InputFieldProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const labelStyle =
      'font-semibold text-[14px] flex items-center justify-between leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#444444] inline-block';
    const inputStyle =
      'outline-[#E5DDED] w-[100%] focus:outline-none h-[55px] text-primary-text bg-[#F8F8F8] text-[16px] font-medium border border-[#E5DDED] rounded-[6px] mt-[16px] px-[16px] py-[18px] ';

    const [letterCount, setLetterCount] = useState(0);

    return (
      <>
        <div className="flex flex-col w-full">
          <label className={`${labelStyle}`} htmlFor={props.name}>
            Scroll Button
            <div className="flex gap-[10px] text-[#444444] text-[16px] font-normal">
              Text color {labelComponent}
            </div>
          </label>
          <div className="relative">
            <input
              ref={ref}
              id={props.name}
              className={`${inputStyle} ${className}`}
              {...props}
              maxLength={20}
              onChange={(e) => {
                const value = e.target.value.slice(0, 20);
                if (value) {
                  onNewChange && onNewChange(value);
                }
                setLetterCount(value.length);
              }}
            />
            <div className="absolute bottom-[10px] right-[10px] text-[14px] text-primary-text font-normal">
              {letterCount}/20
            </div>
          </div>
        </div>
      </>
    );
  }
);

ScrollBtnField.displayName = 'ScrollBtnField';

export default ScrollBtnField;
