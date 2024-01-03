import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

// type ToggleFieldProps = {
//   label: string;
// } & InputHTMLAttributes<HTMLInputElement>;

type ToggleFieldProps = {
  label: string;
  defaultData?: any;
  toggle: boolean | undefined;
  setToggle: any;
} & InputHTMLAttributes<HTMLInputElement>;

const commonClassNames =
  "w-11 h-6 rounded-full dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#fff] after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600";

function CustomToggleField({ label, className, toggle, setToggle, defaultData, ...props }: ToggleFieldProps) {

  const shouldRenderToggle = defaultData && defaultData.hidden !== undefined;

  const handleChange = () => {
    setToggle(!toggle)
  }

  return (
    <label className="flex items-center justify-between">
      <span className="text-[16px] font-medium leading-[19px] text-[#444444] ">
        {label}
      </span>

      <div className="relative inline-flex items-center cursor-pointer">
        <input
          // ref={ref}
          type="checkbox"
          className="sr-only peer"
          {...props}
          onChange={handleChange}
        />
        <div
          className={
            shouldRenderToggle
              ? classNames(
                commonClassNames,
                toggle
                  ? 'after:translate-x-full bg-primary'
                  : 'bg-[#CDCDCD]'
              )
              : `${commonClassNames} peer-checked:bg-primary peer peer-checked:after:translate-x-full peer-focus:outline-none bg-[#CDCDCD]`
          }
        />
      </div>
    </label>
  );
}

export default CustomToggleField;
