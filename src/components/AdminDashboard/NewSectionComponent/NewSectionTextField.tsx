import _ from 'lodash';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
import {
  FieldErrors,
  UseControllerProps,
  useController,
} from 'react-hook-form';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
});

type TextFieldProps = {
  labelComponent?: ReactNode;
  label: string;
  errors?: FieldErrors;
} & UseControllerProps<any>;

function NewSectionTextField({
  labelComponent,
  label,
  errors,
  ...props
}: TextFieldProps) {
  const { field } = useController(props);
  const [letterCount, setLetterCount] = useState(0);

  useEffect(() => {
    if (field.value) {
      const content = field.value as string;
      const sanitizedContent = content.replace(/<[^>]+>/g, '');
      const letters = sanitizedContent.length;
      setLetterCount(letters);
    }
  }, [field.value]);

  const labelStyle =
    'font-semibold text-[16px] flex items-center justify-between leading-[140%] lg:text-[18px] lg:leading-[22px] text-[#444444] inline-block';

  const fieldName = props.name?.split('.').slice(0, -1).join('.');

  const error =
    _.get(errors, fieldName + '.en') || _.get(errors, fieldName + '.spa');
  return (
    <div className="w-full">
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
      <div className="mt-[14px] min-h-[55px] w-[100%] relative">
        <QuillNoSSRWrapper
          onChange={field.onChange}
          value={field.value as string}
          theme="snow"
          className="text-[16px] leading-[160%] border border-[#E5DDED] rounded-[12px] bg-[#F8F8F8] text-primary-text font-medium"
          placeholder="Type here..."
          defaultValue={props.defaultValue as string}
          onBlur={field.onBlur}
        />
        <div className="absolute bottom-[10px] right-[10px] text-[14px] text-primary-text font-normal">
          {letterCount}/600
        </div>
      </div>
      {error && (
        <div className="mt-1 text-sm text-red-500">
          {error?.message?.toString()}
        </div>
      )}
    </div>
  );
}

export default NewSectionTextField;
