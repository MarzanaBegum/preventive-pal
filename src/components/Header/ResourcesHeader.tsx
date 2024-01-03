import useScrollbarToggle from '@/hooks/useScrollbarToggle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useState } from 'react';
import Hamburg from '../Footer/components/SvgIcons/HamburgIcon';
import PowerOfPrevention from '../Footer/components/SvgIcons/PowerOfPrevention';
import HamburgMenu from '../HamburgMenu/HamburgMenu';
import LanguagueButton from '../LanguagueButton';

gsap.registerPlugin(ScrollTrigger);

const ResourcesHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  useScrollbarToggle(openMenu);

  const handleRedirect = () => {
    (window as any).menuFunction('home');
  };

  return (
    <header id="resource_header">
      <div className="container px-[20px] md:px-0 lg:pt-[40px] md:pt-[30px] pt-[20px] left-0 right-0 bg-transparent z-[99] _topNav">
        <div className="flex items-center justify-between">
          <PowerOfPrevention
            width={328}
            height={41}
            color={isWhite ? '#fff' : '#623B88'}
            className="w-[200px] h-[25px] md:w-[328px] md:h-[41px] cursor-pointer"
            onClick={handleRedirect}
          />
          <div className="flex items-center gap-[35px]">
            {/* Langauge Button */}
            <div className="hidden md:block">
              <LanguagueButton color="black" />
            </div>
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="cursor-pointer"
            >
              <div className="flex gap-[10px] md:gap-[8px] items-center">
                <h2
                  className={`text-[18px] _textColor leading-[22px] md:text-[20px] md:leading-[24px] font-bold uppercase ${'text-purple-300'}`}
                >
                  Menu
                </h2>
                <Hamburg width={18} height={13.68} color={'#623B88'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <HamburgMenu
        toggle={openMenu}
        setToggle={setOpenMenu}
        // setIsWhite={setIsWhite}
      />
    </header>
  );
};

export default ResourcesHeader;
