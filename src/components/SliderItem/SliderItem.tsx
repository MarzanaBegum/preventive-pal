import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface SliderItemProps {
  className: string;
  item: {
    no: string;
    name: string;
    content: string;
    vectorImg: React.ReactNode;
  };
}

const SliderItem: React.FC<SliderItemProps> = ({ item, className }) => {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const preventionSingleItemTl = gsap.timeline({
        scrollTrigger: {
          trigger: '._primaryPreventionImage',
          start: '40% 0%',
          // markers: true,
        },
        defaults: { duration: 1 },
      });

      preventionSingleItemTl.to(
        '._primaryPreventionImage',
        {
          // x: 0,
          y: 0,
          rotate: 0,
          // transform: 'none',
          duration: 2,
        },
        'start'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id={item.no + 'prevention'}
      className={classNames(
        'flex-col-reverse md:flex-row flex items-center justify-center _item',
        className
      )}
    >
      <div className="col-md-6 2xl:max-w-[600px] max-w-[485px] p-0 my-auto">
        <h5 className="font-bold text-[42px] leading-[50px] text-gray">
          {item.no}
        </h5>
        <h3 className="sub-heading m-[16px_0_24px_0]">{item.name}</h3>
        <p className="content">{item.content}</p>
      </div>
      <div className="col-md-6">
        <div className="relative flex items-center justify-center">
          {item.vectorImg}
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
