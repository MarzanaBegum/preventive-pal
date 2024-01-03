import { ReactNode } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

type TextFieldProps = {
  labelComponent?: ReactNode;
  label: string;
} & ReactQuillProps;

function CustomTextField({ labelComponent, label, ...props }: TextFieldProps) {
  const labelStyle =
    'font-semibold text-[14px]  flex items-center gap-3 leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#101010] inline-block';
  return (
    <div>
      <label className={`${labelStyle}`}>
        {label} {labelComponent}
      </label>
      <div className="outline-[#E0E0E0] w-[100%] focus:outline-none min-h-[55px] text-[#6D6D6D] bg-[#FFFFFF] text-[14px] font-medium border border-[#E0E0E0] rounded  mt-[10px] px-[5px] py-[6px] mb-[10px]">
        <ReactQuill
          theme="snow"
          placeholder="enter description here"
          {...props}
        />
      </div>
    </div>
  );
}

export default CustomTextField;
