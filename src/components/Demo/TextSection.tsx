import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import { DataProps, PrimaryPreventionType } from '@/utils/types';
import { PageApi } from '@/views/Home/components/Hero/Hero';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef } from 'react';
import Button from '../Button/Button';

const InnerHTML = dynamic(
  () => import('@/components/AdminDashboard/InnerHTML'),
  { ssr: false }
);

const TextSection = ({
  d,
  fullpageApi,
}: DataProps<PrimaryPreventionType> & PageApi) => {
  const { rootData, lang } = useRootData();
  const { keepScroll } = useGetContent();

  const ref = useRef(null);

  const nextSectionId = useMemo(() => {
    const currentId = rootData.findIndex((item) => item.id === d.id);
    if (currentId < 0 || currentId === rootData.length - 1) {
      return rootData[currentId].id;
    } else {
      return rootData[currentId + 1].id;
    }
  }, [rootData, d]);

  const handleScrollBtn = () => {
    fullpageApi.moveSectionDown();
  };

  // useEffect(() => {}, [fullpageApi]);
  useEffect(() => {
    const scrollableElement: any = ref.current;
    const startingPoint = 0; // Set the starting point of the scroll

    const handleScroll = (e: any) => {
      if (e.deltaY <= 0 || (e.touches && e.touches[0].clientY < e.clientY)) {
        if (scrollableElement.scrollTop <= startingPoint) {
          console.log('Reached starting point. Fire function!');
          // Call your desired function when scrolling reaches the starting point
        } else {
          console.log('Scroll Up');
        }
      } else {
        const contentHeight = scrollableElement.scrollHeight;
        const visibleHeight = scrollableElement.offsetHeight;
        const endPoint = contentHeight - visibleHeight;

        if (scrollableElement.scrollTop >= endPoint) {
          console.log('Reached end point. Fire function!');
          // Call your desired function when scrolling reaches the end point
        } else {
          console.log('Scroll Down');
        }
      }
    };

    scrollableElement.addEventListener('wheel', handleScroll);
    scrollableElement.addEventListener('touchmove', handleScroll);

    return () => {
      scrollableElement.removeEventListener('wheel', handleScroll);
      scrollableElement.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <section
      id={d.id}
      section-name=""
      style={{
        backgroundColor: d?.customize?.bgColor,
      }}
      className={classNames(
        'relative w-full scroll-section h-[100svh] flex justify-center items-center overflow-hidden'
      )}
    >
      <div>
        <div className="text-center">
          <h3
            style={{ color: d?.customize?.subheaderColor }}
            className={`lg:text-[24px] md:text-[20px] text-[14px] lg:leading-[29px] md:leading-[24px] leading-[17px] font-medium tracking-[0.2em] uppercase text-[#331F1A] mx-auto ${
              d.id + '_prevSubHeading'
            } lg:mb-[1px] md:mb-[4px] mb-[6px]`}
          >
            {d.subheader?.[lang]}
          </h3>
          <h2
            style={{ color: d?.customize?.headerColor }}
            className={classNames(
              'uppercase lg:text-[102px] md:text-[70px] text-[40px] lg:leading-[143px] md:leading-[98px] leading-[56px] font-[900] tracking-[0.0465em] text-[#664897] ',
              'font-arges',
              d.id + '_prevHeading'
            )}
          >
            {d.header?.[lang]}
          </h2>
        </div>
        <div
          ref={ref}
          className={`lg:w-[889px] md:w-[688px] w-[335px] mx-auto ${
            d.id + '_preventionPowerText'
          } mt-[20px] overflow-x-hidden overflow-y-auto md:h-[240px] h-[375px] prevention-scroll _ignore_scrollbar`}
        >
          <div
            data-scroll="overscroll"
            className="lg:max-w-[843px] md:max-w-[660px] max-w-[317px] ml-0 text-center"
          >
            <InnerHTML
              html={d.description?.[lang]}
              className="content mb-[20px] text-primary-text primary-text"
              style={{ color: d?.customize?.descColor }}
            />
          </div>
        </div>
        <div
          className={`flex justify-center absolute left-1/2 -translate-x-1/2 ${
            d.id + '_prevButton'
          } lg:bottom-[40px] bottom-[30px] z-10`}
        >
          <Button
            onClick={handleScrollBtn}
            text={d?.scrollButton?.[lang]}
            color={d?.customize?.scrollBtnColor || '#333333'}
            id={nextSectionId}
          />
        </div>
      </div>
    </section>
  );
};

export default TextSection;
