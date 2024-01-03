import { SelectStyles } from '@/utils/select-styles';
import _ from 'lodash';
import { ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';
import ReactSelect, { Props } from 'react-select';

type SelectFieldProps = {
  label: string;
  labelComponent?: ReactNode;
  errors?: FieldErrors;
} & Props &
  UseControllerProps<any>;

function SelectField({
  label,
  className,
  labelComponent,
  errors,
  ...props
}: SelectFieldProps) {
  const labelStyle =
    'font-semibold text-[14px]  flex items-center gap-3 leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#101010] inline-block';
  const { field } = useController(props);

  const error = _.get(errors, props.name || '');

  return (
    <>
      <div className="flex flex-col w-full">
        <label className={`${labelStyle}`} htmlFor={props.name}>
          {label} {labelComponent}
        </label>
        <div className="pt-[10px]"></div>
        <ReactSelect
          styles={SelectStyles}
          value={
            field.value
              ? props.options?.find((x: any) => x.value === field.value)
              : ''
          }
          onChange={(val: any) => {
            field.onChange(val.value);
          }}
          options={props.options}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1">
            {error?.message?.toString()}
          </div>
        )}
      </div>
    </>
  );
}

export default SelectField;
