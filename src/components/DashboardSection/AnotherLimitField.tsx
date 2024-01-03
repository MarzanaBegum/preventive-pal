import _ from 'lodash';
import { InputHTMLAttributes, ReactNode } from 'react';
import {
  FieldErrors,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type InputFieldProps = {
  labelComponent?: ReactNode;
  label: string;
  errors?: FieldErrors;
  className?: string;
} & UseControllerProps<any> &
  InputHTMLAttributes<HTMLInputElement>;

const AnotherLimitField = ({
  labelComponent,
  label,
  className,
  errors,
  ...props
}: InputFieldProps) => {
  const labelStyle =
    'font-semibold text-[14px] flex items-center justify-between leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#444444] inline-block';
  const inputStyle =
    'outline-[#E5DDED] w-[100%] focus:outline-none h-[55px] text-primary-text bg-[#F8F8F8] text-[16px] font-medium border border-[#E5DDED] rounded-[6px] mt-[16px] px-[16px] py-[18px] ';

  const { field } = useController(props);

  const fieldName = props.name.split('.').slice(0, -1).join('.');

  const error =
    _.get(errors, fieldName + '.en') || _.get(errors, fieldName + '.spa');

  console.log(errors);

  return (
    <>
      <div className="flex flex-col w-full">
        <label className={`${labelStyle}`} htmlFor={props.name}>
          {label}
          <div className="flex gap-[10px] text-[#444444] text-[16px] font-normal">
            Text color {labelComponent}
          </div>
        </label>
        <div className="relative">
          <input
            id={props.name}
            className={`${inputStyle} ${className}`}
            maxLength={20}
            placeholder={props.placeholder}
            {...field}
            value={props.value}
          />
          <div className="absolute bottom-[10px] right-[10px] text-[14px] text-primary-text font-normal">
            {field.value?.length || 0}/20
          </div>
        </div>
        {error && (
          <div className="mt-1 text-sm text-red-500">
            {error?.message?.toString()}
          </div>
        )}
      </div>
    </>
  );
};

AnotherLimitField.displayName = 'TextLimitInput';

export default AnotherLimitField;
