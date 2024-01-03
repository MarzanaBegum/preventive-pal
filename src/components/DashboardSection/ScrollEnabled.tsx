import React from 'react';

const ScrollEnabled = () => {
  return (
    <div className="flex justify-end">
      <div className="cursor-pointer relative inline-block overflow-visible group z-[1]">
        <div className="flex gap-[6px] items-center ">
          <div className="text-[#FFB255] text-[13px] flex justify-center items-center w-[20px] h-[20px] rounded-full border border-[#FFB255]">
            !
          </div>
          <h2 className="text-[16px] font-medium text-[#444444]">
            Scroll enabled
          </h2>
        </div>
        <div
          className={`w-[308px] z-[1] after:content-[''] after:absolute after:top-[100%] after:left-[37%] tooltiptext after:ml-[76px] px-[16px] py-[12px] rounded-[10px] right-[2%] invisible group-hover:visible text-white text-[14px] font-medium leading-[150%] text-center absolute bottom-[100%] bg-[#7A49AA]`}
        >
          The scroll functionality will be enabled once exceeding the 600
          character limit.
        </div>
      </div>
    </div>
  );
};

export default ScrollEnabled;
