import SliderItem from '@/components/SliderItem/SliderItem';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { typeOfPreventionSlider } from '@/views/Home/constant';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const PreventionTypeSlider = () => {

  // useIsomorphicLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const preventionItem = gsap.utils.toArray('._preventionSliderItem');

  //   let to = gsap.to(preventionItem, {
  //     xPercent: -150 * (preventionItem.length - 1),
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: '._preventionTypeSlider',
  //       pin: true,
  //       scrub: 1,
  //       invalidateOnRefresh: true,
  //       // anticipatePin: 1,
  //       // snap: 1 / (preventionItem.length - 1),
  //       end: () => '+=' + window.innerWidth,
  //     },
  //   });

  //   // return () => {
  //   //   to.kill();
  //   // };
  // }, []);

  return (
    <>
      {/* <div className="flex flex-col justify-center">
        <div className="h-full _preventionTypeSlider">
          <div className="">
            <div className="w-full flex">
              {typeOfPreventionSlider.map((item, i) => (
                <div
                  key={i + 'prevention'}
                  className="row min-w-[100vw] _preventionSliderItem"
                >
                  <div className="container">
                    <SliderItem item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="max-w-[350px] mt-[30px] mx-auto">
                <div className="relative">
                  <div className="w-full h-[2px] bg-[#D9D9D9]"></div>
                  <div className="absolute top-0 left-0 w-1/2 h-[2px] bg-primary"></div>
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
      </div> */}
    </>
  );
};

export default PreventionTypeSlider;
