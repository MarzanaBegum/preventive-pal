import classNames from 'classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

type InputFieldProps = {
  label?: string;
  labelComponent?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

function CustomInputField({
  label,
  className,
  labelComponent,
  ...props
}: InputFieldProps) {

  const labelStyle =
    'font-semibold text-[16px] gap-3 leading-[19.07px] lg:text-[18px] lg:leading-[25.2px] text-[#101010] inline-block';

  return (
    <div className="">
      {label ? <label className={classNames(
        labelStyle
      )} htmlFor={props.name}>
        {label} {labelComponent}
      </label> : null}

      <input
        id={props.name}
        className={classNames(
          'outline-[#E0E0E0] w-[100%] focus:outline-none h-[55px] text-[#6D6D6D] bg-[#FFFFFF] text-[16px] font-medium border border-[#E0E0E0] rounded  px-[16px] py-[18px] disabled:bg-[#EAEAEA] disabled:text-[#B0B0B0] disabled:cursor-not-allowed',
          label && 'mt-[16px]',
          className
        )}
        {...props}
      />
    </div>
  );
}

export default CustomInputField;