/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button/Button';
import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { DataProps, HeroType } from '@/utils/types';
import { fullpageApi } from '@fullpage/react-fullpage';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import BannerMountain from '../../partials/BannerMountain';
import GroundBuildings from '../../partials/GroundBuildings';
import LeftBuildings from '../../partials/LeftBuildings';

const InnerHTML = dynamic(
  () => import('@/components/AdminDashboard/InnerHTML'),
  { ssr: false }
);

export type PageApi = {
  fullpageApi: fullpageApi;
};

const Hero = ({ d, fullpageApi }: DataProps<HeroType> & PageApi) => {
  const heroRef: any = useRef(null);
  const { rootData, lang } = useRootData();

  const nextSectionId = useMemo(() => {
    const currentId = rootData.findIndex((item) => item.id === d.id);
    if (currentId < 0 || currentId === rootData.length - 1) {
      return rootData[currentId].id;
    } else {
      return rootData[currentId + 1].id;
    }
  }, [rootData, d]);

  // Banner multi-lan content
  const { hero } = useGetContent();

  const router = useRouter();

  // Gsap Animations
  useIsomorphicLayoutEffect(() => {
    const tl1 = gsap.timeline({
      defaults: { duration: 1.5, ease: 'sine.out', delay: 0.1 },
    });

    const cloudTl = gsap.timeline({
      defaults: { duration: 1.3, ease: 'sine.out', delay: 0.1 },
    });

    const cyclistTl = gsap.timeline({
      repeat: -1,
    });

    const animFrame = window.requestAnimationFrame(() => {
      tl1
        .to(
          '._topScrollingBtn, ._thePower, ._topBannerContent, ._sun, ._mountain',
          { y: 0 },
          'start'
        )
        .to('._prevention', { y: 0, delay: 0.2 }, 'start');

      cyclistTl.to('._bicycle', {
        x: window.innerWidth + 100,
        duration: 15,
        ease: 'none',
      });
    });

    return () => {
      tl1.kill();
      cloudTl.kill();
      cyclistTl.restart();
      cancelAnimationFrame(animFrame);
    };
  }, [router.locale]);

  // useEffect(() => {
  //   const cyclistTl = gsap.timeline({
  //     repeat: -1,
  //   });

  //   cyclistTl.to('._bicycle', {
  //     x: window.innerWidth + 100,
  //     duration: 15,
  //     ease: 'none',
  //   });
  // }, []);

  const handleScrollBtn = () => {
    fullpageApi.moveSectionDown();
  };

  return (
    <section
      data-scrolltarget="home"
      id={d.id}
      section-name="Hero"
      ref={heroRef}
      className={`overflow-hidden scroll-section`}
    >
      <div className="relative flex flex-col h-[100svh]">
        <div className="relative w-full h-full bg-[#E1DBD6]">
          <BannerMountain lang={lang} />

          <div className="absolute lg:bottom-[-17px] xl:bottom-[-21px] 2xl:bottom-[-24px] 2xxl:bottom-[-27px] 3xl:bottom-[-35px] md:bottom-[-12px] bottom-[-10px] left-0 right-0 w-full z-[1]">
            <GroundBuildings />
          </div>

          {!d.imgs.img5.hidden ? (
            <img
              src={d.imgs.img5.src}
              className="absolute -bottom-[1px] -left-14 3xl:w-[90px] 3xl:h-[66px] 2xl:w-[66px] 2xl:h-[49px] lg:w-[48px] lg:h-[35px] md:w-[36px] md:h-[27px] w-[19px] h-[15px]  _bicycle"
              alt="bike-gif"
            />
          ) : null}
        </div>

        <div
          id="_hero_bottom"
          className="relative w-full xl:min-h-[344px] xl:max-h-[344px] lg:min-h-[295px] lg:max-h-[295px] md:min-h-[282px] md:max-h-[282px] min-h-[392px] max-h-[392px] bg-[#C9F2A9]"
        >
          <LeftBuildings />

          {!d.imgs.img6.hidden ? (
            <img
              className="absolute xl:top-[10px] lg:top-[7px] md:top-[3px] top-[4px] xl:left-[269px] lg:left-[188px] md:left-[107px] left-[10px] xl:w-[58px] lg:w-[42px] md:w-[31px] w-[17px]"
              src={d.imgs.img6.src}
              alt=""
            />
          ) : null}
          {/* <LeftGirl /> */}

          {!d.imgs.img3.hidden ? (
            <img
              className="absolute xl:right-[77px] lg:right-[55px] md:right-[48px] right-[10px] xl:bottom-[20] lg:bottom-[62px] md:bottom-[20px] bottom-[148px] xl:w-[327px] lg:w-[234px] md:w-[178px] w-[124px]"
              src={d.imgs.img3.src}
              alt=""
            />
          ) : null}

          {!d.imgs.img7.hidden ? (
            <img
              className="absolute xl:right-[45px] lg:right-[32px] md:right-[42px] right-[9px] xl:top-[17px] lg:top-[12px] md:top-[42px] top-[105px] xl:w-[80px] lg:w-[57px] md:w-[44px] w-[37px]"
              src={d.imgs.img7.src}
              alt=""
            />
          ) : null}

          {/* <RightGirls /> */}

          {!d.imgs.img4.hidden ? (
            <img
              className="absolute lg:right-[16.5%] md:right-[16%] right-[32px] xl:top-[-21px] lg:top-[-16px] top-[-10px] xl:w-[95px] lg:w-[68px] md:w-[52px] w-[44px] xl:h-[65px] lg:h-[47px] md:h-[35px] h-[30px] z-[2]"
              src={d.imgs.img4.src}
              alt=""
            />
          ) : null}

          {!d.imgs.img1.hidden ? (
            <img
              className="absolute xl:left-[35px] lg:left-[20px] md:left-[18px] left-[14px] xl:bottom-[70px] 2xl:bottom-[95px] lg:bottom-[117px] md:bottom-[81px] bottom-[193px] xl:w-[124px] lg:w-[89px] md:w-[68px] w-[36px] xl:h-[80px] lg:h-[58px] md:h-[44px] h-[23px]"
              src={d.imgs.img1.src}
              alt=""
            />
          ) : null}

          {!d.imgs.img2.hidden ? (
            <img
              className="absolute xl:left-[247px] lg:left-[171px] md:left-[138px] left-[65px] xl:bottom-[30px] lg:bottom-[55px] md:bottom-[33px] bottom-[163px] xl:w-[176px] lg:w-[178px] md:w-[115px] w-[66px] xl:h-[87px] lg:h-[88px] md:h-[56px] h-[32px]"
              src={d.imgs.img2.src}
              alt=""
            />
          ) : null}

          <div className="absolute left-1/2 translate-x-[-50%] xl:top-[50px] md:top-[30px] top-[36px] 2xl:w-[779px] lg:w-[540px] md:w-[465px] w-[335px] z-10">
            <div className="text-center font-secondary font-medium 2xl:text-[20px] md:text-[16px] text-[14px] leading-[175%] text-[#444444] translate-y-96 _topBannerContent">
              <InnerHTML
                html={d?.description?.[lang]}
                style={{ color: d?.customize?.descColor }}
              />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 lg:bottom-[40px] bottom-[30px] z-10 translate-y-64 _topScrollingBtn">
          <Button
            onClick={handleScrollBtn}
            text={d?.scrollButton?.[lang]}
            color={
              d?.customize?.scrollBtnColor
                ? d?.customize?.scrollBtnColor
                : '#333333'
            }
            id={nextSectionId}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
