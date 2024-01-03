import React from 'react';

interface TooltipProps {
    text: string;
}
const CustomTooltip = ({ text }: TooltipProps) => {
    return (
        <div className="flex justify-end">
            <div className=" relative inline-block overflow-visible group z-[1] cursor-pointer">

                <div className="text-[#FFB255] text-[10px] flex justify-center items-center w-[15px] h-[15px] rounded-full border border-[#FFB255] ">
                    !
                </div>
                <div
                    className={`w-[308px] z-[1] after:content-[''] after:absolute after:top-[100%] after:left-[37%] tooltiptext after:ml-[76px] px-[16px] py-[12px] rounded-[10px] right-[-105px] invisible group-hover:visible text-white text-[14px] font-medium leading-[150%] text-center absolute bottom-[100%] bg-[#7A49AA]`}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};

export default CustomTooltip;
