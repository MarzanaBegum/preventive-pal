import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { default as classNames, default as cx } from 'classnames';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';

type ToggleFieldProps = {
  label: string;
  defaultData?: any;
} & InputHTMLAttributes<HTMLInputElement>;

const commonClassNames =
  "w-11 h-6 rounded-full dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#fff] after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600";

const NewToggleField = React.forwardRef(
  (
    { label, className, defaultData = {}, ...props }: ToggleFieldProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const [toggle, setToggle] = useState<boolean | undefined>(false);
    const { refetchRootData } = useAdminData();
    const shouldRenderToggle = defaultData && defaultData.hidden !== undefined;

    const handleChange = async () => {
      // if (defaultData && label === 'Hide Section') {
      //   const updatedToggle = !toggle;
      //   setToggle(updatedToggle);
      //   try {
      //     await updateToggleData(updatedToggle);
      //     await refetchRootData();
      //     toast.success('Section hide successfully');
      //   } catch (err: any) {
      //     toast.error(err?.response ? err.response.data?.message : err.message);
      //   }
      // }
    };

    const updateToggleData = async (updatedToggle: boolean) => {
      await api.put('/v2/data', { ...defaultData, hidden: updatedToggle });
    };

    useEffect(() => {
      setToggle(defaultData.hidden);
    }, [defaultData]);

    return (
      <label className="flex items-center justify-between">
        <span
          className={cx(
            'text-[16px] font-medium leading-[19px] text-[#444444] ',
            props.disabled && 'opacity-50'
          )}
        >
          {label}
        </span>

        <div className="relative inline-flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
            // onChange={handleChange}
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
                : `${commonClassNames} peer-checked:bg-primary peer peer-disabled:opacity-50 peer-checked:after:translate-x-full peer-focus:outline-none bg-[#CDCDCD]`
            }
          />
        </div>
      </label>
    );
  }
);

NewToggleField.displayName = 'NewToggleField';

export default NewToggleField;
