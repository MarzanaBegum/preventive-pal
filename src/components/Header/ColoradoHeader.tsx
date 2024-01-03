import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Dispatch, SetStateAction, useState } from 'react';
import Hamburg from '../Footer/components/SvgIcons/HamburgIcon';
import LanguagueButton from '../LanguagueButton';

interface ColoradoHeaderInterface {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  logo: string;
}

gsap.registerPlugin(ScrollTrigger);

const ColoradoHeader = ({
  openMenu,
  setOpenMenu,
  logo,
}: ColoradoHeaderInterface) => {
  const [isWhite, setIsWhite] = useState(true);

  const handleRedirect = () => {
    (window as any).menuFunction('home');
  };

  return (
    <>
      <div
        id="colorado_header"
        className="container absolute lg:top-[40px] md:top-[30px] top-[20px] left-0 right-0 px-[20px] md:px-0 bg-transparent z-[99999] _topNav"
      >
        <div className="flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={handleRedirect}
            src={logo}
            alt="logo"
            className="h-[25px] md:h-[41px] cursor-pointer"
          />
          {/* <PowerOfPrevention
            width={328}
            height={41}
            color={'#fff'}
            className="w-[200px] h-[25px] md:w-[328px] md:h-[41px] cursor-pointer"
            onClick={handleRedirect}
          /> */}
          <div className="flex items-center gap-[35px]">
            {/* Langauge Button */}
            <div className="hidden md:block">
              <LanguagueButton color="white" />
            </div>
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="cursor-pointer"
            >
              <div className="flex gap-[10px] md:gap-[8px] items-center">
                <h2
                  className={`text-[18px] _textColor leading-[22px] md:text-[20px] md:leading-[24px] font-bold uppercase ${'text-white'}`}
                >
                  Menu
                </h2>
                <Hamburg width={18} height={13.68} color={'#fff'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColoradoHeader;
