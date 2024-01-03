import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
  label: string;
}
const ToggleWrapper = ({ children, label }: WrapperProps) => {
  return (
    <div className="w-full auto bg-[#F2EBF9] rounded-[12px] ">
      <h3 className="font-semibold text-[18px] leading-[25px] text-secondary-text p-[10px] text-center">
        {label}
      </h3>
      <hr className="text-[#E6D9F2]" />

      {/* Toggle section  */}
      <div className="p-[20px] h-[calc(100%-45px)]">{children}</div>
    </div>
  );
};

export default ToggleWrapper;
