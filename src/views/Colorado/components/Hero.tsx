import Button from '@/components/Button/Button';
import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import useWindowDimensions from '@/hooks/useWindowSize';
import { DataProps, PrimaryColoradoType } from '@/utils/types';
import { PageApi } from '@/views/Home/components/Hero/Hero';
import classNames from 'classnames';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Clouds from '../partials/Clouds';
import CloudsMobile from '../partials/CloudsMobile';
import Mountain1 from '../partials/Mountain1';
import Mountain1Mobile from '../partials/Mountain1Mobile';
import MountainWater from '../partials/MountainWater';
import TressBack from '../partials/TressBack';
import TressFront from '../partials/TressFront';
import Container from './Container';
import Content from './Content';
import { gsap } from 'gsap';

const Hero = ({ d, fullpageApi }: DataProps<PrimaryColoradoType> & PageApi) => {
  const container: any = useRef(null);
  const tl: { current: any } = useRef() as any;
  const { keepScroll } = useGetContent();
  const { rootData, lang } = useRootData();

  const nextSectionId = useMemo(() => {
    const currentId = rootData.findIndex((item) => item.id === d.id);
    if (currentId < 0 || currentId === rootData.length - 1) {
      return rootData[currentId].id;
    } else {
      return rootData[currentId + 1].id;
    }
  }, [rootData, d]);
  const { width, height }: any = useWindowDimensions();

  const [isLowHeightXL, setIsLowHeightXL] = useState(false);
  const [isLowHeight3XL, setIsLowHeight3XL] = useState(false);
  const [isHBigThanW, setIsHBigThanW] = useState(false);

  useEffect(() => {
    width > 1200 && width < 1920 && height < 800 && setIsLowHeightXL(true);
    width > 1919 && height < 1000 && setIsLowHeight3XL(true);
    width > 767 && height > width && setIsHBigThanW(true);
  }, [width, height]);

  // useEffect(() => {
  //   const scrollerSection = document.querySelector(
  //     '._colorado_hero .fp-overflow'
  //   );

  //   let ctx = gsap.context(() => {
  //     tl.current = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: container.current,
  //         pin: true,
  //         scrub: 1,
  //         start: 'center center',
  //         anticipatePin: 1,
  //         markers: false,
  //         scroller: scrollerSection,
  //       },
  //       defaults: { ease: 'none', duration: 3.5 },
  //     });

  //     tl.current = gsap
  //       .timeline({
  //         scrollTrigger: {
  //           trigger: container.current,
  //           scrub: 1,
  //           start: 'top center',
  //           anticipatePin: 1,
  //           // markers: true,

  //           scroller: scrollerSection,
  //         },
  //         defaults: { ease: 'none', duration: 3.5 },
  //       })
  //       .from('._tress-front', {
  //         yPercent: 100,
  //         duration: 1,
  //       })
  //       .from('._tress-back', {
  //         yPercent: 100,
  //         duration: 1.5,
  //         ease: 'power2.out',
  //       })
  //       .from('._mountain-water', {
  //         yPercent: 100,
  //         duration: 1,
  //       })
  //       .from(
  //         '._scrolling-btn',
  //         {
  //           bottom: '-100%',
  //           duration: 4,
  //           ease: 'power4.out',
  //         },
  //         '<1'
  //       )
  //       .from('._mountain-1', {
  //         yPercent: 100,
  //         duration: 5,
  //         ease: 'power2.out',
  //       })
  //       // .from('._mountain-2', {
  //       //   yPercent: 100,
  //       //   duration: 1,
  //       // })
  //       .from('._text-content', {
  //         yPercent: 100,
  //         bottom: '-100%',
  //         duration: 5,
  //         ease: 'none',
  //       })
  //       .from('._clouds', {
  //         top: '-100%',
  //         duration: 4,
  //         ease: 'expo.out',
  //       });

  //     return () => {
  //       tl.current?.kill();
  //       tl.current = null;
  //     };
  //   }, container);

  //   let previousY: any = null;

  //   scrollerSection?.addEventListener('touchmove', function (e: any) {
  //     e.preventDefault();
  //     const currentY = e.touches[0].clientY;
  //     if (previousY === null) {
  //       previousY = currentY;
  //       return;
  //     }
  //     const currentPosition = tl.current?.scrollTrigger?.scroll();
  //     if (currentY > previousY) {
  //       tl.current?.scrollTrigger?.scroll((currentPosition || 0) - 40);
  //     } else if (currentY < previousY) {
  //       tl.current?.scrollTrigger?.scroll((currentPosition || 0) + 40);
  //     }
  //     previousY = currentY;
  //   });

  //   scrollerSection?.addEventListener('wheel', function (e: any) {
  //     e.preventDefault();
  //     const currentPosition = tl.current?.scrollTrigger?.scroll();
  //     if (e.deltaY < 0) {
  //       tl.current?.scrollTrigger?.scroll((currentPosition || 0) - 40);
  //     } else {
  //       tl.current?.scrollTrigger?.scroll((currentPosition || 0) + 40);
  //     }
  //   });

  //   return () => ctx.revert();
  // }, []);

  const handleScrollBtn = () => {
    fullpageApi.moveSectionDown();
  };

  return (
    <section
      // data-scrolltarget="colorado_one"
      id={d.id}
      section-name="Prevention In Colorado One"
      className="scroll-section"
    >
      <div ref={container}>
        <Container style={{ backgroundColor: d?.customize?.bgColor }}>
          <div>
            <TressFront />
            <TressBack />
            <MountainWater isHBigThanW={isHBigThanW} />
            <Mountain1
              isLowHeightXL={isLowHeightXL}
              isLowHeight3XL={isLowHeight3XL}
              isHBigThanW={isHBigThanW}
            />

            <Mountain1Mobile />
            {/* <Mountain2 /> */}
            {/* <Mountain2Mobile /> */}
            <Clouds isHBigThanW={isHBigThanW} />
            <CloudsMobile />

            {/* Overlap */}
            <div
              className="w-full md:h-[50px] h-[30px] absolute left-0 bottom-0 z-[9999]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,124,62,0) 24%, rgba(8,124,61,1) 94%)',
              }}
            ></div>
            {/* <div
          className="w-full md:h-[50px] h-[30px] absolute left-0 -top-[30px] md:-top-[50px] z-[9999]"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,124,62,0) 24%, rgba(8,124,61,1) 94%)',
          }}
        ></div> */}
            <div
              className={classNames(
                '_text-content absolute z-[99] xl:top-1/2  md:top-[60%] top-[73%]  left-1/2 -translate-x-1/2 -translate-y-1/2 w-full',
                isHBigThanW && '!top-[65%]'
              )}
            >
              <Content data={d} />
            </div>

            {/* Keep Scrolling Button */}
            <div className="absolute z-[9999] 2xl:bottom-[15%] lg:bottom-[12%] md:bottom-[8%] bottom-[3%] left-1/2 -translate-x-1/2 _scrolling-btn">
              <Button
                text={d?.scrollButton?.[lang]}
                color={d?.customize?.scrollBtnColor || '#333333'}
                id={nextSectionId}
                onClick={handleScrollBtn}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
