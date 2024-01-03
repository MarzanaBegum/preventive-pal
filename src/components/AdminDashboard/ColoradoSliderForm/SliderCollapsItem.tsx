import DownArrow from '@/assets/icons/DownArrow';
import HideEye from '@/assets/icons/HideEye';
import LeftAlignIcon from '@/assets/icons/LeftAlignIcon';
import RightAlignIcon from '@/assets/icons/RightAlignIcon';
import Trash from '@/assets/icons/Trash';
import ColorField from '@/components/DashboardSection/ColorField';
import InputField from '@/components/DashboardSection/InputField';
import TextField from '@/components/DashboardSection/TextField';
import classNames from 'classnames';
import { useRef, useState } from 'react';

const SliderCollapsItem = ({
  data,
  collapseSlider,
  setCollapseSlider,
  errors,
  register,
  i,
  lang,
  control,
  loading,
  setValue,
}: any) => {
  const ref = useRef<any>();
  const [imageAlign, setImageAlign] = useState(data?.customize?.imgPosition || 'left');

  return (
    <div className="p-[22px_26px_22px_30px] bg-[#F2EBF9] rounded-[12px]">
      <div
        className={classNames('cursor-pointer')}
        onClick={() => {
          if (collapseSlider === data.sliderId) {
            setCollapseSlider('');
          } else {
            setCollapseSlider(data.sliderId);
          }
        }}
      >
        <div className={classNames('flex items-center justify-between')}>
          <p className="font-semibold text-[24px] leading-[140%] text-[#444444]">
            Slider {i + 1}
          </p>
          <div
            className={classNames(
              collapseSlider === data.sliderId ? 'rotate-180' : 'rotate-0',
              'transition-all duration-300'
            )}
          >
            <DownArrow />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        style={
          collapseSlider === data.sliderId
            ? { height: ref.current?.scrollHeight }
            : { height: 0 }
        }
        className={classNames('overflow-hidden transition-all duration-300')}
      >
        <div className="border-t border-[#E6D9F2] mt-[16px] pt-[30px] flex flex-col gap-[20px]">
          <InputField
            errors={errors}
            {...register(`sliderData.${i}.subheader.${lang}`)}
            label="Sub Heading"
            placeholder="Type here..."
            labelComponent={
              <ColorField
                name={`sliderData.${i}.customize.subheaderColor`}
                control={control}
              />
            }
          />
          <InputField
            errors={errors}
            {...register(`sliderData.${i}.header.${lang}`)}
            label="Heading"
            placeholder="Type here..."
            labelComponent={
              <ColorField
                name={`sliderData.${i}.customize.headerColor`}
                control={control}
              />
            }
          />
          <TextField
            errors={errors}
            label="Description"
            name={`sliderData.${i}.description.${lang}`}
            control={control}
            labelComponent={
              <ColorField
                name={`sliderData.${i}.customize.descColor`}
                control={control}
              />
            }
          />

          <div className="flex gap-[20px] w-full">
            <div className="h-[168px] w-full">
              {/* <FileUploadCard /> */}
            </div>

            <div>
              <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                Image Alignment
              </p>
              <div className="mt-[16px] flex gap-[16px]">
                <div
                  onClick={() => {
                    setImageAlign('left');
                    setValue(`sliderData.${i}.customize.imgPosition`, 'left');
                  }}
                  className={classNames(
                    'p-[14px_60px] border border-[#E5DDED] rounded-[6px] flex items-center gap-[6px] cursor-pointer',
                    imageAlign === 'left'
                      ? 'bg-[#7A49AA] text-white'
                      : 'bg-[#EBE1F5] text-[#444444]'
                  )}
                >
                  <LeftAlignIcon left={imageAlign === 'left'} />
                  <p className="font-medium text-[16px] leading-[19px]">Left</p>
                </div>
                <div
                  onClick={() => {
                    setImageAlign('right');
                    setValue(`sliderData.${i}.customize.imgPosition`, 'right');
                  }}
                  className={classNames(
                    'p-[14px_60px] border border-[#E5DDED] rounded-[6px] flex items-center gap-[6px] cursor-pointer',
                    imageAlign === 'right'
                      ? 'bg-[#7A49AA] text-white'
                      : 'bg-[#EBE1F5] text-[#444444]'
                  )}
                >
                  <RightAlignIcon right={imageAlign === 'right'} />
                  <p className="font-medium text-[16px] leading-[19px]">
                    Right
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-[10px] flex justify-between border-t border-[#E6D9F2]">
            <div className="flex gap-[10px] items-center cursor-pointer mt-[16px]">
              <HideEye />
              <p className="font-semibold text-[18px] leading-[22px] text-[#444444]">
                Hide slider
              </p>
            </div>
            <div className="flex gap-[10px] items-center cursor-pointer mt-[16px]">
              <Trash />
              <p className="text-[#EC4242] font-semibold text-[18px] leading-[22px]">
                Delete slider
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCollapsItem;
