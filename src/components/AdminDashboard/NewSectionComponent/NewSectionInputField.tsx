import _ from 'lodash';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  labelComponent?: ReactNode;
  errors?: FieldErrors;
  onNewChange?: (e: any) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const NewSectionInputField = React.forwardRef(
  (
    {
      label,
      className,
      labelComponent,
      onNewChange,
      errors,
      ...props
    }: InputFieldProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const labelStyle =
      'font-semibold text-[14px]  flex items-center gap-3 justify-between leading-[19.07px] lg:text-[18px] lg:leading-[140%] capitalize text-[#444444] inline-block';
    const inputStyle = `outline-[#E5DDED] w-[100%] focus:outline-none h-[55px] text-[16px] leading-[19px] font-medium border rounded-[6px] mt-[16px] px-[16px] py-[18px] placeholder:text-[#AEAEAE] placeholder:normal-case ${
      props.disabled
        ? 'border-[#E6D9F2] bg-[#F2ECF9] text-[#989898]'
        : 'border-[#E5DDED] bg-[#F8F8F8] text-[#50505]'
    }`;

    const fieldName = props.name?.split('.').slice(0, -1).join('.');

    const error =
      _.get(errors, fieldName + '.en') ||
      _.get(errors, fieldName + '.spa') ||
      _.get(errors, props.name + '');

    return (
      <>
        <div className="flex flex-col w-full">
          <label className={`${labelStyle}`} htmlFor={props.name}>
            {label}{' '}
            {labelComponent && (
              <span className="flex items-center gap-[10px]">
                <p className="text-[#444444] font-normal text-[16px] leading-[25px]">
                  Text color
                </p>{' '}
                {labelComponent}
              </span>
            )}
          </label>
          <input
            ref={ref}
            id={props.name}
            className={`${inputStyle} ${className}`}
            {...props}
            value={props.value}
          />
          {error && (
            <div className="mt-1 text-sm text-red-500">
              {error?.message?.toString()}
            </div>
          )}
        </div>
      </>
    );
  }
);

NewSectionInputField.displayName = 'NewSectionInputField';

export default NewSectionInputField;
