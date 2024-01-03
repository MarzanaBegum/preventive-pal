import CustomTooltip from '@/components/CustomTooltip';
import _ from 'lodash';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';

type InputFieldProps = {
    label: string;
    labelComponent?: ReactNode;
    errors?: FieldErrors;
    isTooltip?: boolean
} & InputHTMLAttributes<HTMLInputElement>;

const CustomInput = React.forwardRef(
    (
        { label, className, labelComponent, errors, isTooltip, ...props }: InputFieldProps,
        ref: React.LegacyRef<HTMLInputElement>
    ) => {
        const labelStyle =
            'text-[#444444] font-medium text-[18px] leading-[25px] flex justify-between';
        const inputStyle =
            'w-full h-[55px] rounded-[6px] bg-white border border-[#E5DDED] p-[18px_16px_18px_16px] outline-none mt-[16px]  font-medium text-[16px] leading-[19px] text-primary-text';

        const customTooltipText = "You’ll have to go through an email verification process when you update your email"

        const error = _.get(errors, props.name || '');

        return (
            <>
                <div className="flex flex-col w-full">
                    <label className={`${labelStyle}`} htmlFor={props.name}>
                        {label} {labelComponent}
                    </label>
                    <div className="relative">
                        <input
                            ref={ref}
                            id={props.name}
                            className={`${inputStyle} ${className}`}
                            {...props}

                        />
                        {isTooltip && <div className="absolute top-[37px] right-[16px]"><CustomTooltip text={customTooltipText} /></div>}
                    </div>
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

CustomInput.displayName = 'InputField';

export default CustomInput;
