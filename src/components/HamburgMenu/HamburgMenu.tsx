import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import { fullpageApi } from '@fullpage/react-fullpage';
import classNames from 'classnames';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import cover from '../../assets/images/menu-cover.png';
import mobileCover from '../../assets/images/mobile-nav-bg.png';
import lgScreenBg from '../../components/HamburgMenu/components/images/lg-screen-bg.png';
import midScreenBg from '../../components/HamburgMenu/components/images/mid-screen-bg.png';
import CustomLogo from '../Footer/components/SvgIcons/CustomLogo';
import { idToIndex } from '../Header/Header';
import LanguagueButton from '../LanguagueButton';
import CloseIcon from './components/images/CloseIcon';

type MenuType = {
  toggle: boolean;
  setToggle: any;
  fullpageApi?: fullpageApi;
};

const HamburgMenu = ({ toggle, setToggle, fullpageApi }: MenuType) => {
  const menu: any = useRef();

  const tl: any = useRef();
  const [mouseOver, setMouseOver] = useState(false);
  const { menu: menuContent } = useGetContent();
  // const anotherTl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    // here is the animation
    tl.current.to(menu.current, {
      top: 0,
      duration: 0.3,
      display: 'block',
    });

    tl.current
      .to('._header', {
        marginTop: '40px',
        duration: 1,
        opacity: 1,
        delay: 0.5,
      })
      .to(
        '._link',
        {
          opacity: 1,
          duration: 0.5,
        },
        '<'
      )
      .to(
        '._mountain',
        { marginTop: '40px', duration: 0.5, ease: 'expo.easeOut', opacity: 1 },
        '<'
      );
  }, []);

  useEffect(() => {
    toggle ? tl.current.play() : tl.current.reverse();
  }, [toggle]);

  //   Page click handler
  const handleRedirect = (id: any) => {
    const getIndex = idToIndex(id);
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
    setToggle(false);
    let tween = gsap.to(menu.current, {
      height: 0,
      overflow: 'hidden',
      duration: 0.8,
      delay: 0.3,
      onComplete: () => {
        tween.revert();
        tl.current.revert();
      },
    });
  };

  const { rootData, lang, menuData } = useRootData();
  const menuItem = rootData.filter((v) => v.menu);

  // console.log(menuData?.links, 'links');
  return (
    <div className="overflow-hidden _fixed_menu">
      <section
        ref={menu}
        className={classNames(
          '_menu w-[100vw] h-[100vh] top-[100vh] bg-primary fixed right-0 z-[999999999] hidden'
        )}
      >
        <div className="w-[100%] relative">
          <div className="flex justify-between items-center px-[20px] md:px-[60px] lg:px-[100px] 3xl:px-[340px]  opacity-0 _header relative">
            <div
              className="cursor-pointer"
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
            >
              <Link href="/" onClick={() => handleRedirect('home')}>
                {menuData?.logo ? (
                  <Image
                    src={menuData.logo}
                    alt="Logo"
                    width={328}
                    height={41}
                    className="w-[160px] h-[25px] md:w-[328px] md:h-[41px] transition-all duration-500 ease-in-out"
                  />
                ) : (
                  <CustomLogo
                    className={`${
                      mouseOver ? 'fill-white' : 'fill-[#D1C0E1]'
                    } w-[160px] h-[25px] md:w-[328px] md:h-[41px] transition-all duration-500 ease-in-out`}
                  />
                )}
              </Link>
            </div>

            <div className="flex items-center gap-[10px] md:gap-10">
              <div className="max-md:z-[99999]">
                <LanguagueButton color="white" />
              </div>

              <div
                onClick={() => setToggle(false)}
                className="header group md:flex md:gap-[12px] items-center cursor-pointer"
              >
                <p className=" uppercase font-bold text-[18px] leadng-[21.6px] md:text-[20px] md:leading-[24px] text-[#D1C0E1] group-hover:text-white transition-all duration-500 ease-in-out hidden md:flex">
                  {menuContent.closeText}
                </p>
                <CloseIcon
                  stroke={menuData?.customize?.closeBtnColor || '#D1C0E1'}
                  className="group-hover:stroke-white"
                />
              </div>
            </div>
          </div>

          <div>
            <Image
              src={cover}
              alt="menu cover"
              className="relative w-[100vw] h-[90vh] mt-[100vh] _mountain hidden lg:block opacity-0"
            />
            <Image
              src={mobileCover}
              alt="menu cover"
              className="relative w-[100vw] h-[90vh] mt-[100vh] _mountain md:hidden opacity-0"
            />
            <Image
              src={midScreenBg}
              alt="menu cover"
              className="relative w-[100vw] h-[90vh] mt-[100vh] _mountain hidden md:block opacity-0"
            />
            <Image
              src={lgScreenBg}
              alt="menu cover"
              className="relative w-[100vw] h-[90vh] mt-[100vh] _mountain hidden md:block opacity-0"
            />
            <div
              data-scroll="overscroll"
              onWheel={(e) => e.stopPropagation()}
              className="w-[100vw] h-[calc(100vh_-_190px)] md:h-[calc(100vh_-_220px)] flex justify-center items-center absolute top-20 right-0 "
            >
              <div
                data-scroll="overscroll"
                className="flex flex-col lg:justify-start lg:mt-[70px] xl:mt-[40px] 2xl:mt-0 justify-center 2xl:justify-center gap-[42px] overflow-y-auto w-full h-[100%] hide-scrollbar overflow-x-hidden"
              >
                {menuItem.map((item, i) => (
                  <div
                    key={'dgfa' + i}
                    className="text-center text-[#FFFFFF] uppercase font-semibold text-[24px] leading-[28.8px] md:text-[40px] md:leading-[48px] _link opacity-0"
                  >
                    <p
                      className="inline-block cursor-pointer animated-link"
                      onClick={() => handleRedirect(item.id)}
                    >
                      {typeof item?.title === 'object'
                        ? (item?.title as any)[lang]
                        : item.title}
                    </p>
                  </div>
                ))}
                {menuData?.links?.map(
                  ({ name, customize, newTab, url, hidden }, i) => (
                    <div
                      key={i}
                      className={classNames(
                        hidden && 'hidden',
                        'text-center uppercase font-semibold text-[24px] leading-[28.8px] md:text-[40px] md:leading-[48px] _link opacity-0'
                      )}
                    >
                      {newTab ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block cursor-pointer animated-link"
                          style={{ color: customize?.linkNameColor }}
                        >
                          {name[lang]}
                        </a>
                      ) : (
                        <a
                          href={url}
                          className="inline-block cursor-pointer animated-link"
                          style={{ color: customize?.linkNameColor }}
                        >
                          {name[lang]}
                        </a>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HamburgMenu;
