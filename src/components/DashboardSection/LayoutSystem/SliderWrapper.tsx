import cx from 'classnames';
import gsap from 'gsap';
import Image from 'next/image';
import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
type SliderWrapProps = {
  isHidden?: boolean;
  children?: ReactNode;
  head?: string;
  wrap?: boolean;
  onWrapClick?: MouseEventHandler<HTMLDivElement>;
};
function SliderWrapper({
  isHidden,
  children,
  head,
  wrap: w,
  onWrapClick,
}: SliderWrapProps) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    gsap.to(wrapper, { duration: 0.5, height: w ? 'auto' : 0 });
  }, [w]);
  return (
    <div className={cx(isHidden && '')}>
      <div className={cx('bg-[#F2EBF9] rounded-[12px] mb-[30px]')}>
        <div
          onClick={onWrapClick}
          className={cx(
            'flex gap-[20px] cursor-pointer items-center flex-row justify-between px-[30px] py-[22px]',
            isHidden && 'opacity-50'
          )}
        >
          <h2 className="text-[24px] leading-[140%] font-semibold text-[#444444]">
            {head || 'Add new slider'}
          </h2>
          <Image
            src="/images/arrow-down.svg"
            width={24}
            height={24}
            alt="arrow-down"
            className={cx(
              'cursor-pointer transition-all duration-500',
              !w && 'rotate-180'
            )}
          />
        </div>
        <div ref={wrapperRef} className="overflow-hidden h-0">
          <div className="px-[30px] pb-[26px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

type SHFprops = {} & UseControllerProps<any>;
export function SliderHiddenField(props: SHFprops) {
  const { field } = useController({ ...props, defaultValue: false });
  return (
    <div
      onClick={() => field.onChange(!field.value)}
      className="flex gap-[10px] items-center cursor-pointer mt-[16px]"
    >
      <Image
        src={field.value ? '/images/eye-slash.svg' : '/images/eye.svg'}
        width={20}
        height={20}
        alt="eye"
        className="cursor-pointer"
      />
      <p className="font-semibold text-[18px] leading-[22px] text-[#444444]">
        {field.value ? 'Show Slider' : 'Hide Slider'}
      </p>
    </div>
  );
}
export default SliderWrapper;
