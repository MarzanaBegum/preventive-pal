import BottomArrow from '@/components/Icons/BottomArrow';
import cx from 'classnames';
import gsap from 'gsap';
import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';

type FSWprops = {
  title: string;
  wrap?: boolean;
  onWrapClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
};

function FooterSectionWrapper({
  title,
  wrap,
  onWrapClick,
  children,
}: FSWprops) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    gsap.to(wrapper, { duration: 0.5, height: wrap ? 'auto' : 0 });
  }, [wrap]);

  return (
    <div className={cx('mt-[10px]')}>
      <div
        className="flex items-center justify-between cursor-pointer group"
        role="button"
        onClick={onWrapClick}
      >
        <h4 className="text-[24px] font-semibold font-primary leading-[33.6px]">
          {title}
        </h4>
        <div className={cx(wrap && 'rotate-180')}>
          <BottomArrow />
        </div>
      </div>

      <div className="border-b border-[#E5DDED] mt-[16px]"></div>

      <div ref={wrapperRef} className={cx('overflow-hidden h-0')}>
        {children}
      </div>
    </div>
  );
}

export default FooterSectionWrapper;
