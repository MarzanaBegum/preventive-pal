import Bg from './Bg';
import Img from './Img';

const SliderImg3 = () => {
  return (
    <div className="2xl:w-[661px] 2xl:h-[422px] xl:w-[485px] xl:h-[310px] lg:w-[261px] lg:h-[393px] md:w-[314px] md:h-[200px] w-[262px] h-[167.68px] relative  mb-[20.32px] md:mb-0">
      <div className="_bgitem3">
        <Bg />
      </div>
      <div className="absolute inset-0">
        <Img />
      </div>
    </div>
  );
};

export default SliderImg3;
