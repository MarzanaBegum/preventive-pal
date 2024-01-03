import Tree from '@/assets/images/colorado/tree.png';
import Button from '@/components/Button/Button';
import ColoradoHeader from '@/components/Header/ColoradoHeader';
import Image from 'next/image';
import Container from './Container';

// 2xl:w-full 2xl:h-full
// xl:w-[90%] xl:h-[90%] lg:w-[80%] lg:h-[80%] md:w-[60%] md:h-[60%] w-[50%] h-[50%]

const Middle = () => {
  return (
    <Container
      id="colorado_two"
      section-name="Prevention In Colorado Two"
      className="bg-teal relative text-white mt-[-1px] scroll-section"
    >
      {/* <ColoradoHeader /> */}
      <div id="middleColorado" className="container">
        <h3 className="uppercase font-[500]  md:text-[24px] md:leading-[28.8px] text-[16px] leading-[19px] tracking-[0.2em]  pb-[14px] ">
          Primary prevention in action
        </h3>
        <h1 className="main-heading ">PREVENTION IN COLORADO</h1>

        <div className="2xl:mt-[47px] mt-[35px]">
          <p className="text-white content">
            Various government organizations and nonprofits offer preventative
            measures. Colorado makes an effort to provide prevention at all
            three levels. However, primary prevention is considered the most
            effective. The state, along with many partners, places emphasis on
            preventing mental, physical, and substance-related health concerns
            before they begin.
          </p>
        </div>
      </div>
      <div className="absolute z-[9999] lg:bottom-[5%] bottom-0 left-1/2 -translate-x-1/2">
        <Button text="Keep Scrolling" color="white" id="colorado_three" />
      </div>

      <div className="absolute bottom-0  lg:right-[30px] right-[20px] z-[99] max-w-[290px] ">
        <Image
          src={Tree}
          alt="Tree"
          className="2xl:w-full 2xl:h-full xl:w-[219px] lg:w-[176px] md:w-[139px] w-[125px]"
        />
      </div>
    </Container>
  );
};

export default Middle;
