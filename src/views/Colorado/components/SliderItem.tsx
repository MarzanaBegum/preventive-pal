import { useRootData } from '@/context/RootData';
import { isEmbedded } from '@/utils/FileType';
import { SliderDatum } from '@/utils/types';
import { default as classNames, default as cx } from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const InnerHTML = dynamic(
  () => import('@/components/AdminDashboard/InnerHTML'),
  { ssr: false }
);

interface SliderItemProps {
  subtitle: string;
  title: string;
  content: string;
  imgSrc: string;
  imgWrap?: any;
  slideWrap?: any;
  sliderImg: any;
  sliderImgStyle?: string;
  imgPosition?: string;
  imgBackground?: string;
}

const SliderItem = ({
  subtitle,
  title,
  content,
  imgSrc,
  sliderImg,
  sliderImgStyle,
  imgBackground,
  imgPosition,
}: SliderItemProps) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-between gap-5 text-left md:justify-between md:flexRow md:gap-0',
        imgPosition === 'left' && '!flex-colReverse md:!flexRowReverse'
      )}
    >
      <div className="2xl:max-w-[725px] xl:max-w-[571px] lg:max-w-[462px] md:max-w-[350px] w-full md:order-[0] order-[1]">
        <h4 className="text-[#FFF1E7] text-[14px] leading-[16px] md:text-[16px] md:leading-[19px] tracking-[0.2em] uppercase pb-[15px]">
          {subtitle}
        </h4>
        <h3 className="pb-6 font-black text-white font-arges text-[32px] leading-[44px] md:text-[40px] md:leading-[56px] lg:text-[48px] lg:leading-[68px]">
          {title}
        </h3>
        <div>
          <InnerHTML
            className="text-white content text-[13px] md:text-[14px]"
            html={content}
          />
        </div>
      </div>
      <div className="2xl:max-w-[481px] xl:max-w-[399px] lg:max-w-[326px] md:max-w-[246px] max-w-[265px] md:order-1 order-[-1] relative">
        <div>
          <svg
            className={classNames('w-full h-full', sliderImg)}
            width="481"
            height="407"
            viewBox="0 0 481 407"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M140.21 31.4837C221.5 -12.8052 320.506 -12.1058 389.822 47.4938C465.627 112.673 506.618 218.006 462.53 308.622C420.235 395.552 312.747 413.978 216.687 403.346C121.596 392.821 22.8586 350.807 3.73941 257.842C-15.6988 163.326 54.3776 78.2476 140.21 31.4837Z"
              fill={imgBackground}
            />
          </svg>
        </div>

        <Image
          width={445}
          height={219}
          src={imgSrc}
          alt="slider image"
          className={classNames('absolute', sliderImgStyle)}
        />
      </div>
    </div>
  );
};
interface NSProps {
  item: SliderDatum;
  index: number;
  sliderImg: string;
}

export const NewSliderItem = ({ item, index, sliderImg }: NSProps) => {
  const { lang } = useRootData();
  const [screenHeight, setScreenHeigt] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setScreenHeigt(window.innerHeight);
    setInnerWidth(window.innerWidth);
  }, []);
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-between gap-5 text-left md:justify-between md:flex-row md:gap-0',
        item?.customize?.imgPosition === 'left' &&
          '!flex-col-reverse md:!flex-row-reverse'
      )}
    >
      <div className="2xl:max-w-[725px] xl:max-w-[571px] lg:max-w-[462px] md:max-w-[350px] w-full md:order-[0] order-[1]">
        <h4
          style={{ color: item?.customize?.subheaderColor || '#FFF1E7' }}
          className=" text-[14px] leading-[16px] md:text-[16px] md:leading-[19px] tracking-[0.2em] uppercase pb-[15px] font-medium lg:text-[18px] lg:leading-[22px] 2xl:text-[20px] 2xl:leading-[24px]"
        >
          {item.subheader?.[lang]}
        </h4>
        <h3
          style={{ color: item?.customize?.headerColor || '#fff' }}
          className={classNames(
            'pb-6 font-black  font-arges text-[32px] leading-[44px] md:text-[40px] md:leading-[56px] lg:text-[48px] lg:leading-[68px] xl:text-[56px] xl:leading-[78px] 2xl:text-[63px] 2xl:leading-[88px] tracking-[2px]',
            'font-arges'
          )}
        >
          {item?.header?.[lang]}
        </h3>
        <div className="_ignore_scrollbar md:pointer-events-none">
          <InnerHTML
            style={{ color: item?.customize?.descColor || '#fff' }}
            className={classNames(
              ' content text-[13px] md:text-[14px] xl:text-[16px] xl:leading-[28px] 2xl:text-[18px] 2xl:leading-[32px]',
              screenHeight < 738 &&
                screenHeight >= 667 &&
                innerWidth < 768 &&
                'max-h-[180px] overflow-auto hide-scrollbar',
              screenHeight < 667 &&
                innerWidth < 768 &&
                'max-h-[150px] overflow-auto hide-scrollbar'
            )}
            html={item.description?.[lang]}
          />
        </div>
      </div>

      <div className="2xl:w-[481px] xl:w-[399px] lg:w-[326px] md:w-[246px] w-[265px] md:order-1 order-[-1] relative">
        {isEmbedded(item.img) ? (
          <EmbedRenderType str={item.img} />
        ) : (
          <>
            <div>
              <svg
                className={classNames('w-full h-full', sliderImg)}
                width="481"
                height="407"
                viewBox="0 0 481 407"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M140.21 31.4837C221.5 -12.8052 320.506 -12.1058 389.822 47.4938C465.627 112.673 506.618 218.006 462.53 308.622C420.235 395.552 312.747 413.978 216.687 403.346C121.596 392.821 22.8586 350.807 3.73941 257.842C-15.6988 163.326 54.3776 78.2476 140.21 31.4837Z"
                  fill={item.customize.imgBackground || '#56B343'}
                />
              </svg>
            </div>

            <Image
              width={445}
              height={219}
              src={item.img}
              alt="slider image"
              className={classNames(
                'absolute',
                index === 0
                  ? 'w-[245.17px] h-[120.64px] bottom-[40px] left-[8px] md:w-[226.66px] md:h-[111.55px] md:left-[10px] lg:w-[301.6px] lg:h-[148.43px] lg:bottom-[50px] xl:w-[369.14px] xl:h-[181.53px] xl:bottom-[60px] xl:left-[13px] 2xl:w-[445px] 2xl:h-[219px] 2xl:bottom-[80px] 2xl:left-[15px]'
                  : 'w-[225.17px] h-[146px] bottom-[40px] left-[12px] md:w-[215.66px] md:h-[142px] md:bottom-[40px] md:left-[9px] lg:w-[280.6px] lg:h-[183px] lg:bottom-[50px] lg:left-[17px] xl:w-[325.14px] xl:h-[242.53px] xl:left-[23px] xl:bottom-[54px] 2xl:w-[384px] 2xl:h-[279px] 2xl:bottom-[66px] 2xl:left-[36px]'
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const EmbedRenderType = ({ str }: { str: string }) => {
  if (str.startsWith('https://www.youtube.com')) {
    return (
      <iframe
        src={`${str}?modestbranding=0&autoplay=0&controls=0&loop=1&rel=0&mute=1`}
        className="w-full aspect-video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else if (str.startsWith('https://player.vimeo.com')) {
    return (
      <iframe
        src={`${str}`}
        className="w-full aspect-video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else {
    return (
      <iframe
        src={`${str}`}
        className="w-full aspect-video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }
};

export default SliderItem;
