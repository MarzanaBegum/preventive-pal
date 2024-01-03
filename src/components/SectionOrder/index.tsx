/* eslint-disable @next/next/no-img-element */
const SectionOrder = () => {
  return (
    <div className="w-[90%] lg:w-[30%]">
      <div className="border border-gray bg-[#e7e3e3] rounded-[8px]">
        <div className="p-[24px]">
          {/* <h1 className="lg:text-[24px] md:text-[20px] text-[14px] lg:leading-[29px] md:leading-[24px] leading-[17px] font-medium tracking-[0.2em] uppercase text-[#331F1A] lg:mb-[1px] md:mb-[4px] ">
            Section Order:
          </h1> */}
          <div className="">
            {[1, 2, 3, 4, 5, 6].map((item: any, index: number) => (
              <div
                key={index}
                className="border border-gray bg-white rounded-[8px] w-full h-[120px] mb-2 last:mb-0"
              >
                <div className="px-[8px] py-[12px]">
                  <div className="flex gap-[16px] items-center ">
                    <img
                      src="/images/drag-icon.png"
                      alt=""
                      className="w-[40px] h-[40px]"
                    />
                    <div className="flex gap-[8px] items-center">
                      <img
                        src="/images/demo.jpg"
                        alt=""
                        className="w-[80px] h-[96px]"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-[14px] leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#101010]">
                          Section Name{' '}
                        </h3>
                        <p className="elipsis_text ">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsumasdfasd
                        </p>
                        <h4 className="font-semibold text-[14px] leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#101010]">
                          Order: 1
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOrder;
