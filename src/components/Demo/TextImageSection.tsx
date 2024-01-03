import { useRootData } from '@/context/RootData';
import { isEmbedded, isVideo } from '@/utils/FileType';
import { CustomTextImgType, DataProps } from '@/utils/types';
import { EmbedRenderType } from '@/views/Colorado/components/SliderItem';
import { PageApi } from '@/views/Home/components/Hero/Hero';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import Button from '../Button/Button';

const InnerHTML = dynamic(
  () => import('@/components/AdminDashboard/InnerHTML'),
  { ssr: false }
);

const TextImageSection = ({
  d,
  fullpageApi,
}: DataProps<CustomTextImgType> & PageApi) => {
  const { rootData, lang } = useRootData();

  const nextSectionId = useMemo(() => {
    const currentId = rootData.findIndex((item) => item.id === d.id);
    if (currentId < 0 || currentId === rootData.length - 1) {
      return rootData[currentId].id;
    } else {
      return rootData[currentId + 1].id;
    }
  }, [rootData, d]);

  const imgPosition = d?.customize?.imgPosition || 'left';

  const handleScrollBtn = () => {
    fullpageApi.moveSectionDown();
  };

  return (
    <section id={d.id} section-name="">
      <div
        style={{ backgroundColor: d?.customize?.bgColor }}
        className="bg-[#087C3D] h-[100svh] flex items-center justify-center overflow-hidden relative "
      >
        <div className="container md:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:justify-between md:gap-0">
            <div
              className={classNames(
                '2xl:max-w-[725px] xl:max-w-[571px] lg:max-w-[462px] md:max-w-[350px] w-full',
                imgPosition === 'right' && 'md:order-[0] order-[1]',
                imgPosition === 'left' && 'order-2'
              )}
            >
              <h4
                style={{ color: d?.customize?.subheaderColor }}
                className="text-[#FFF1E7] text-[20px] leading-6 tracking-[0.2em] uppercase pb-[15px]"
              >
                {d?.subheader?.[lang]}
              </h4>
              <h3
                style={{ color: d?.customize?.headerColor }}
                className="pb-6 text-white sub-heading"
              >
                {d?.header?.[lang]}
              </h3>
              <div>
                <InnerHTML
                  style={{ color: d?.customize?.descColor }}
                  className="text-white content"
                  html={d?.description?.[lang]}
                />
              </div>
            </div>
            <div className="2xl:w-[481px] xl:w-[399px] lg:w-[326px] md:w-[246px] w-[265px] md:order-1 order-[-1] relative">
              {isVideo(d.img) ? (
                <video controls>
                  <source src={d.img} type="video/mp4" />
                </video>
              ) : isEmbedded(d.img) ? (
                <EmbedRenderType str={d.img} />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.img} alt="slider image" className="w-full" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center absolute left-1/2 -translate-x-1/2 lg:bottom-[40px] bottom-[30px] z-10">
          <Button
            onClick={handleScrollBtn}
            text={d?.scrollButton?.[lang]}
            color={d?.customize?.scrollBtnColor || '#333333'}
            id={nextSectionId}
          />
        </div>
      </div>
    </section>
  );
};

export default TextImageSection;
