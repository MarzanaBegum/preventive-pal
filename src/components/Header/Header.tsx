import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useScrollbarToggle from '@/hooks/useScrollbarToggle';
import { fullpageApi } from '@fullpage/react-fullpage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useState } from 'react';
import Hamburg from '../Footer/components/SvgIcons/HamburgIcon';
import HamburgMenu from '../HamburgMenu/HamburgMenu';
import LanguagueButton from '../LanguagueButton';

gsap.registerPlugin(ScrollTrigger);

const Header = ({ fullpageApi }: { fullpageApi?: fullpageApi }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  useScrollbarToggle(openMenu);

  useIsomorphicLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px) and (max-width: 1023px)',
        isDesktop: '(min-width: 1024px)',
      },
      (context) => {
        //@ts-ignore
        const { isMobile, isTablet, isDesktop } = context.conditions;

        gsap.to('._topNav', {
          duration: 1.5,
          //@ts-ignore
          top: () => {
            if (isMobile) {
              return '0px';
            } else if (isTablet) {
              return '0px';
            } else if (isDesktop) {
              return '0px';
            }
          },
          opacity: 1,
          ease: 'none',
        });
      }
    );

    // const handleResize = () => {
    //   if (mediaQuery.matches) {
    //     navTop = '40px';
    //   } else {
    //     navTop = '20px';
    //   }
    //   tl.to('._topNav', {
    //     duration: 1.5,
    //     top: navTop,
    //     opacity: 1,
    //     ease: 'none',
    //   });
    // };

    // window.addEventListener('resize', handleResize);

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    //   tl.kill();
    // };
  }, []);

  const { rootData } = useRootData();

  const { menu } = useGetContent();

  const heroData = rootData.find((v) => v.type === 'hero');

  const logo = (heroData as any)?.logo;

  //   Page click handler
  const handleRedirect = () => {
    // fullpageApi.moveTo(1)
    const getIndex = idToIndex(heroData?.id);
    if (getIndex) {
      const internals = fullpageApi?.getFullpageData().internals;
      const section = document.querySelectorAll(
        '.fp-section._colorado_slider .fp-slide'
      );
      if (section.length && internals) {
        internals.silentLandscapeScroll(section[0], 'internal');
        const element: any = document.querySelector('._coloradoIndicatorLine');
        if (element) {
          element.style.width = '0%';
        }
      }
      fullpageApi?.moveTo(getIndex);
    }
  };

  return (
    <header className="bg-white _fixed_header">
      <div
        style={{ backdropFilter: 'blur(10px)' }}
        id="header-section"
        className="md:top-[40px] top-[20px] left-0 right-0 z-[99999] opacity-0 _topNav fixed bg-[rgba(255,_255,_255,_0.3)]"
      >
        <div className="container md:py-[20px] py-[10px] px-[20px] md:px-0 flex items-center justify-between">
          {/* <PowerOfPrevention
            width={328}
            height={41}
            color={'#623B88'}
            className="w-[200px] h-[25px] md:w-[328px] md:h-[41px] cursor-pointer"
            onClick={handleRedirect}
          /> */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={handleRedirect}
            src={logo || '/images/home/logo.svg'}
            onError={(e: any) => {
              console.log('Fallback Image');
              e.target.src = '/images/home/logo.svg';
            }}
            alt="logo"
            className="h-[25px] md:h-[41px] cursor-pointer"
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
                  {menu.menuText}
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
        fullpageApi={fullpageApi}
        // setIsWhite={setIsWhite}
      />
    </header>
  );
};

export default Header;

export const idToIndex = (id?: string) => {
  const findIndex = Array.from(
    document.getElementsByClassName('section')
  ).findIndex((v) => v.classList.contains(`${id}`));
  if (findIndex < 0) return false;
  return findIndex + 1;
};
