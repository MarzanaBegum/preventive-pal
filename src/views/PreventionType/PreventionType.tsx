import Button from '@/components/Button';
import SliderItem from '@/components/SliderItem/SliderItem';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import cx from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef, useState } from 'react';
import { typeOfPreventionSlider } from '../Home/constant';

const PreventionType = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const app: any = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const preventionItem = gsap.utils.toArray('._preventionItem');

    let to = gsap.to(preventionItem, {
      xPercent: -100 * (preventionItem.length - 1),
      ease: 'none',
      scrollTrigger: {
        id: 'prevention_trigger',
        trigger: '._typeOfPrevention',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        // anticipatePin: 1,
        snap: 1 / (preventionItem.length - 1),
        end: () => '+=' + window.innerWidth,
      },
    });

    gsap.to('._preventionIndicatorLine', {
      width: '100%',
      scrollTrigger: {
        trigger: '._preventionSliderTrigger',
        start: 'center 0%',
        end: () => '+=' + (window.innerWidth - 330),
        scrub: 1,
      },
    });

    gsap.to('._preventionIndicator', {
      visibility: 'visible',
      scrollTrigger: {
        trigger: '._preventionSliderTrigger',
        start: 'center 0%',
        end: () => '+=' + window.innerWidth,
        scrub: 1,
      },
    });

    let ctx = gsap.context(() => {
      gsap.from('._bgitem1', {
        scrollTrigger: {
          trigger: '.item_1',
          start: 'left center',
          end: 'right right',
          containerAnimation: to,
          scrub: 5,
        },
        rotateX: -45,
        rotateZ: 30,
        x: 100,
        duration: 2,
      });

      gsap.from('._bgitem2', {
        scrollTrigger: {
          trigger: '.item_2',
          start: 'left center',
          end: 'right right',
          containerAnimation: to,
          scrub: 5,
        },
        rotationZ: -45,
        duration: 2,
      });

      gsap.from('._bgitem3', {
        scrollTrigger: {
          trigger: '.item_3',
          start: 'left center',
          end: 'right right',
          containerAnimation: to,
          scrub: 5,
        },
        rotationY: -90,
        duration: 2,
      });
    }, app);

    return () => ctx.revert();
  }, []);

  const handleOnClick = () => {
    const preventionItem = gsap.utils.toArray<HTMLElement>('._preventionItem');
    gsap.to(window, {
      scrollTo: {
        y: '+=' + (window.innerWidth - 80) / (preventionItem.length - 1),
      },
    });
  };

  return (
    <section
      className="prevention-type-main scroll-section"
      section-name="Type Of Prevention"
      ref={app}
    >
      <div className="bg-bg-cyan h-[100svh] flex flex-col justify-center overflow-hidden relative _typeOfPrevention">
        <div className="flex w-full">
          <div className="flex items-center">
            <div className="flex items-center w-[100vw] _preventionItem ">
              <div className="container">
                <div className="max-w-[855px]">
                  <h5 className="font-medium md:text-[24px] text-[18px] md:leading-[29px] leading-[22px] tracking-[0.2em] mb-[15px] uppercase text-orange-300">
                    Type of Prevention
                  </h5>
                  <h2 className="heading md:mb-[24px] mb-[9px]">
                    How Preventive Measures Vary and Where they Can Help
                  </h2>
                  <p className="content">
                    Prevention takes a few different forms. These forms of
                    prevention vary depending on when they take place relative
                    to what you’re trying to prevent and how they work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex _preventionSliderTrigger">
            {typeOfPreventionSlider.map((item, i) => (
              <div
                key={i + 'prevention'}
                className={cx(
                  'flex items-center justify-center',
                  i === 2 && 'preventionTypeLast'
                )}
              >
                <div className="w-[100vw] _preventionItem">
                  <div className="container">
                    <SliderItem item={item} className={`item_${i + 1}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container _preventionIndicator invisible">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="max-w-[350px] mt-[30px] mx-auto">
                <div className="relative">
                  <div className="w-full h-[2px] bg-[#D9D9D9]"></div>
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary _preventionIndicatorLine"></div>
                </div>
                <div className="flex justify-between w-full mt-[10px]">
                  <span className="font-secondary text-[16px] leading-[160%] text-secondary-text">
                    1
                  </span>
                  <span className="font-secondary text-[16px] leading-[160%] text-secondary-text">
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute cursor-pointer lg:bottom-[40px] md:bottom-[20px] bottom-0 left-[50%] translate-x-[-50%] z-[99]">
          <Button
            onClick={handleOnClick}
            text="Keep Scrolling"
            color="purple"
            id="colorado"
          />
        </div>
      </div>
    </section>
  );
};

export default PreventionType;
