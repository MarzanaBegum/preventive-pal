import React, { InputHTMLAttributes } from 'react';

type ToggleFieldProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const LanguageToggle = React.forwardRef(
    (
        { label, className, ...props }: ToggleFieldProps,
        ref: React.LegacyRef<HTMLInputElement>
    ) => {
        return (
            <label className="flex items-center justify-between">
                <span className="text-[14px] leading-[16.8px] font-medium text-[#444444]">
                    English
                </span>

                <div className="relative inline-flex items-center cursor-pointer">
                    <input
                        ref={ref}
                        type="checkbox"
                        className="sr-only peer"
                        {...props}
                    />
                    <div className="w-11 h-6  peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#fff]  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary bg-[#CDCDCD]" />
                </div>
                <span className="text-[14px] leading-[16.8px] font-medium text-[#444444]">
                    Español
                </span>
            </label>
        );
    }
);

LanguageToggle.displayName = 'LanguageToggle';

export default LanguageToggle;
