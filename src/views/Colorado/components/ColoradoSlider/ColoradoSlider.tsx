import Button from '@/components/Button/Button';
import HamburgMenu from '@/components/HamburgMenu/HamburgMenu';
import { useRootData } from '@/context/RootData';
import useScrollbarToggle from '@/hooks/useScrollbarToggle';
import { ColoradoSliderType, DataProps } from '@/utils/types';
import { PageApi } from '@/views/Home/components/Hero/Hero';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { NewSliderItem } from '../SliderItem';

const ColoradoSlider = ({
  d,
  fullpageApi,
}: DataProps<ColoradoSliderType> & PageApi) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { lang } = useRootData();

  const [progressLine, setProgressLine] = useState(0);

  const scrollSec: any = useRef();

  useScrollbarToggle(openMenu);

  const tls: any = useRef();

  const handleOnClick = () => {
    const slides = document.querySelectorAll(
      '.fp-section.active .fp-slide'
    ).length;

    const activeSlide = fullpageApi.getActiveSlide().index + 1;

    if (slides === activeSlide) {
      fullpageApi.moveSectionDown();
    } else {
      fullpageApi.moveSlideRight();
    }
  };

  return (
    <>
      <section
        // data-scrolltarget="colorado_three"
        id={d.id}
        section-name="Prevention In Colorado Three"
        className="relative colorado-slider scroll-section"
      >
        <div
          style={{ backgroundColor: d?.customize?.bgColor || '#087C3D' }}
          className=" h-[100svh] flex flex-col justify-center overflow-hidden relative _coloradoSlider"
        >
          {/* <ColoradoHeader
            logo={d.logo}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          /> */}

          <div className="flex w-full">
            {d.sliderData
              .filter((item) => item.hidden === false)
              .map((item, index) => (
                <div
                  key={`kfskfl_${index}`}
                  className="flex items-center slide"
                >
                  <div className="flex items-center w-[100vw] _coloradoSliderItem">
                    <div
                      className={classNames(
                        'container md:px-0',
                        index === 0
                          ? '_coloradoPrioritizingTrigger'
                          : '_coloradoBuildingTrigger'
                      )}
                    >
                      {/* <SliderItem
                      title={item?.header?.[lang]}
                      subtitle={item.subheader?.[lang]}
                      content={item.description?.[lang]}
                      imgSrc={item.img}
                      imgPosition={item.customize.imgPosition || 'right'}
                      imgBackground={item.customize.imgBackground || '#56B343'}
                      sliderImg={
                        index === 0 ? 'prioritizingImg' : 'buildingImg'
                      }
                      sliderImgStyle={classNames(
                        index === 0
                          ? 'w-[245.17px] h-[120.64px] bottom-[40px] left-[8px] md:w-[226.66px] md:h-[111.55px] md:left-[10px] lg:w-[301.6px] lg:h-[148.43px] lg:bottom-[50px] xl:w-[369.14px] xl:h-[181.53px] xl:bottom-[60px] xl:left-[13px] 2xl:w-[445px] 2xl:h-[219px] 2xl:bottom-[80px] 2xl:left-[15px]'
                          : 'w-[225.17px] h-[146px] bottom-[40px] left-[12px] md:w-[215.66px] md:h-[142px] md:bottom-[40px] md:left-[9px] lg:w-[280.6px] lg:h-[183px] lg:bottom-[50px] lg:left-[17px] xl:w-[325.14px] xl:h-[242.53px] xl:left-[23px] xl:bottom-[54px] 2xl:w-[384px] 2xl:h-[279px] 2xl:bottom-[66px] 2xl:left-[36px]'
                      )}
                    /> */}
                      <NewSliderItem
                        item={item}
                        index={index}
                        sliderImg={
                          index === 0 ? 'prioritizingImg' : 'buildingImg'
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

            {/* <div className="flex items-center">
              <div className="flex items-center w-[100vw] _coloradoSliderItem">
                <div className="container md:px-0 _coloradoBuildingTrigger">
                  <SliderItem
                    title={d.sliderData[1].header}
                    subtitle={d.sliderData[1].subheader}
                    content={d.sliderData[1].description}
                    imgSrc={d.sliderData[0].img}
                    sliderImg="buildingImg"
                    sliderImgStyle="w-[225.17px] h-[146px] bottom-[40px] left-[12px] md:w-[215.66px] md:h-[142px] md:bottom-[40px] md:left-[9px] lg:w-[280.6px] lg:h-[183px] lg:bottom-[50px] lg:left-[17px] xl:w-[325.14px] xl:h-[242.53px] xl:left-[23px] xl:bottom-[54px] 2xl:w-[384px] 2xl:h-[279px] 2xl:bottom-[66px] 2xl:left-[36px]"
                  />
                </div>
              </div>
            </div> */}
          </div>

          <div className="container px-0 mt-3 xl:mt-12 md:mt-0 dd">
            <div className="flex justify-between flex-col md:flex-row">
              <div className="2xl:max-w-[725px] xl:max-w-[571px] lg:max-w-[462px] md:max-w-[350px] w-full"></div>

              <div className="mx-auto 2xl:max-w-[481px] xl:max-w-[399px] lg:max-w-[326px] md:max-w-[246px] max-w-[265px] w-full">
                <div className="relative flex justify-center ">
                  <div
                    style={{ backgroundColor: d?.customize?.visualSecondary }}
                    className="w-full h-[2px] bg-[#D9D9D9]"
                  ></div>
                  <div
                    style={{
                      backgroundColor: d?.customize?.visualPrimary,
                      width: `${progressLine}%`,
                    }}
                    className="absolute top-0 left-0 h-[2px] bg-orange-100 transition-all duration-200 _coloradoIndicatorLine"
                  ></div>
                </div>
                <div className="flex justify-between w-full mt-[10px]">
                  <span
                    style={{ color: d?.customize?.visualSecondary }}
                    className="font-secondary text-[16px] leading-[160%] text-white"
                  >
                    1
                  </span>
                  <span
                    style={{ color: d?.customize?.visualSecondary }}
                    className="font-secondary text-[16px] leading-[160%] text-white"
                  >
                    {d?.sliderData?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute lg:bottom-[40px] bottom-0 left-[50%] translate-x-[-50%] z-[99]">
            <Button
              onClick={handleOnClick}
              text={d?.scrollButton?.[lang]}
              color={d.customize?.scrollBtnColor || '#333'}
              id="resources"
            />
          </div>
        </div>
        <HamburgMenu
          toggle={openMenu}
          setToggle={setOpenMenu}
          // setIsWhite={setIsWhite}
        />
      </section>
    </>
  );
};

export default ColoradoSlider;
