import Button from '@/components/Button/Button';
import useGetContent from '@/hooks/useGetContent';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef, useState } from 'react';

const PreventionWork = () => {
  const PreventionWorkRef = useRef<HTMLDivElement>(null!);
  const { keepScroll, HowDoesPP } = useGetContent();
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const PreventionWorkTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '._preventionWorkSec',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    PreventionWorkTimeline.to(
      '._preWorkSubHeading, ._preWorkHeading, ._preWorkText, ._preWorkBtn',
      {
        opacity: 1,
        y: 0,
        duration: 2,
      },
      'start'
    );

    const PreventionWorkTrigger = ScrollTrigger.create({
      trigger: '._preventionWorkSec',
      start: 'top 65%',
      onEnter: () => {
        gsap.fromTo(
          '._preWorkSubHeading, ._preWorkBtn',
          { opacity: 0, y: '100px' },
          {
            opacity: 1,
            y: 0,
            duration: 2,
          }
        );
        gsap.fromTo(
          '._preWorkHeading',
          { opacity: 0, y: '140px' },
          {
            opacity: 1,
            y: 0,
            duration: 2,
          }
        );
        gsap.fromTo(
          '._preWorkText',
          { opacity: 0, y: '400px' },
          {
            opacity: 1,
            y: 0,
            duration: 2,
          }
        );
      },
    });

    return () => {
      PreventionWorkTrigger.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  const handleSeeMore1 = () => {
    setShowMore1(true);
    setShowMore2(false);
  };
  const handleSeeMore2 = () => {
    setShowMore1(false);
    setShowMore2(true);
  };
  const handleSeeLess1 = () => {
    setShowMore1(false);
  };
  const handleSeeLess2 = () => {
    setShowMore2(false);
  };

  return (
    <section
      id="PreventionWork"
      section-name="Prevention Work"
      ref={PreventionWorkRef}
      className="bg-bg-gray scroll-section relative w-full h-[100svh] flex justify-center items-center _preventionWorkSec"
    >
      <div className="text-center">
        <h4 className="md:text-[24px] md:leading-[29px] text-[18px] leading-[22px] font-medium tracking-[0.2em] uppercase text-orange-300 _preWorkSubHeading opacity-0">
          {HowDoesPP.title}
        </h4>
        <h2 className="uppercase opacity-0 heading 2xl:text-[56px] 2xl:leading-[67px] text-secondary-text _preWorkHeading">
          {HowDoesPP.header}
        </h2>
        <div className="opacity-0 _preWorkText 2xl:max-w-[965px] xl:max-w-[884px] lg:max-w-[824px] md:max-w-[648px] max-w-[335px] mx-auto">
          <p className="content mt-[25px] mb-[20px] text-primary-text hidden md:block">
            {HowDoesPP.content1}
          </p>

          <p className="content mt-[25px] mb-[20px] text-primary-text block md:hidden">
            {!showMore1 ? (
              HowDoesPP.content1.length > 130 ? (
                <>
                  {HowDoesPP.content1.slice(0, 130)}...
                  <span
                    onClick={handleSeeMore1}
                    className="text-black font-semibold"
                  >
                    See more
                  </span>
                </>
              ) : (
                HowDoesPP.content1
              )
            ) : (
              <>
                {HowDoesPP.content1}{' '}
                <span
                  onClick={handleSeeLess1}
                  className="text-black font-semibold"
                >
                  Show Less
                </span>
              </>
            )}
          </p>

          <p className="content text-primary-text md:block hidden">
            {HowDoesPP.content2}
          </p>

          <p className="content text-primary-text md:hidden block">
            {!showMore2 ? (
              HowDoesPP.content2.length > 130 ? (
                <>
                  {HowDoesPP.content2.slice(0, 130)}...
                  <span
                    onClick={handleSeeMore2}
                    className="text-black font-semibold"
                  >
                    See more
                  </span>
                </>
              ) : (
                HowDoesPP.content2
              )
            ) : (
              <>
                {HowDoesPP.content2}{' '}
                <span
                  onClick={handleSeeLess2}
                  className="text-black font-semibold"
                >
                  Show Less
                </span>
              </>
            )}
          </p>
        </div>

        <div className="flex justify-center absolute left-1/2 -translate-x-1/2 lg:bottom-[40px] md:bottom-[20px] bottom-0 _preWorkBtn z-10 opacity-0 ">
          <Button text={keepScroll} color="purple" id="colorado" />
        </div>
      </div>
    </section>
  );
};

export default PreventionWork;
