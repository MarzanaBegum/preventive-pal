import Bg from './Bg';
import Img from './Img';

const SliderImg2 = () => {
  return (
    <div className="2xl:w-[468px] 2xl:h-[534px] xl:w-[429px] xl:h-[524px] lg:w-[326px] lg:h-[399px] md:w-[278px] md:h-[336px] w-[200px] h-[245px] sl2 relative">
      <div className="_bgitem2">
        <Bg />
      </div>
      <div className="absolute inset-0 ">
        <Img />
      </div>
    </div>
  );
};

export default SliderImg2;
