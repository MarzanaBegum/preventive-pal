import Bg from './Bg';
import Img from './Img';

const SliderImg1 = () => {
  return (
    <div className="xl:w-[420px] xl:h-[517px] lg:w-[326px] lg:h-[404px] md:w-[246px] md:h-[248px] w-[275px] h-[360px] xl:mt-0 lg:mt-20  relative max-md:top-[70px]">
      <div className="_bgitem1">
        <Bg />
      </div>
      <div className="absolute inset-0 xl:left-[-50px] lg:left-[-10px] xl:top-0 lg:top-[-25px] left-[-25px] top-[-25px]">
        <Img />
      </div>
    </div>
  );
};

export default SliderImg1;
