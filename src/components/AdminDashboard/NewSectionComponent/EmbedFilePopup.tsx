/* eslint-disable @next/next/no-img-element */

import CrossIcon from '@/components/AdminSettingModal/Icon/CrossIcon';
import { NewCustomModal } from '@/components/CustomModal';
import { DashboardButton } from '@/components/DashboardSection/DashboardLayout';
import { isEmbedded, isVideo } from '@/utils/FileType';
import { EmbedRenderType } from '@/views/Colorado/components/SliderItem';
import cx from 'classnames';
import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import AnotherFileField from './AnotherFileField';
import NewSectionInputField from './NewSectionInputField';

type EFPprops = {} & UseControllerProps<any>;

function EmbedFilePopup(props: EFPprops) {
  const {
    field,
    formState: { errors },
  } = useController(props);

  const [chooseModal, setChooseModal] = useState(false);

  const imgSrc = useMemo(() => {
    return typeof field.value === 'string'
      ? field.value
      : field.value instanceof File
      ? URL.createObjectURL(field.value)
      : '';
  }, [field.value]);

  const error = _.get(errors, props.name || '');

  const isVideoFile = isVideo(imgSrc) || field?.value?.type?.includes('video');

  const isEmbed = isEmbedded(imgSrc);

  return (
    <div>
      <div
        className={cx(
          'w-full h-full   min-h-[168px] flex items-center px-[12px] py-[18px] justify-center rounded-[8px] ',
          'border border-dashed border-[#CEBDDE]'
        )}
      >
        {imgSrc ? (
          <>
            {isVideoFile ? (
              <video
                src={imgSrc}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                controls
              ></video>
            ) : (
              <>
                {isEmbed ? (
                  <EmbedRenderType str={imgSrc} />
                ) : (
                  <img src={imgSrc} alt="Preview" className="w-full " />
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <Image
              className="mx-auto"
              src="/images/uploadFile.svg"
              alt="upload"
              width={24}
              height={24}
            />
            <button
              type="button"
              onClick={() => {
                setChooseModal(true);
              }}
              className="text-[#7A49AA] font-medium"
            >
              Choose Image or Video
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-1 text-sm text-red-500">
          {error?.message?.toString()}
        </div>
      )}

      {imgSrc && (
        <div>
          <div className="pt-4"></div>
          <div className="text-center ">
            <button
              type="button"
              onClick={() => setChooseModal(true)}
              className="text-primary hover:bg-primary hover:text-white transition-all duration-200 h-[33px] w-[90px] border border-primary rounded-[6px] font-semibold leading-[17px] text-sm "
            >
              Replace
            </button>
          </div>
        </div>
      )}

      <ImageVideoModal
        value={imgSrc}
        onSubmit={(d: any) => {
          field.onChange(d);
          setChooseModal(false);
        }}
        isOpen={chooseModal}
        setOpen={setChooseModal}
      >
        <AnotherFileField
          onFileDrop={(f) => {
            field.onChange(f);
            setChooseModal(false);
          }}
        />
      </ImageVideoModal>
    </div>
  );
}

const getSrcValue = (str: string) => {
  const srcRegex = /<iframe(.*?)src="(.*?)"/g;
  const match = srcRegex.exec(str);
  if (match) {
    return match[2];
  }
  return '';
};

type IVMprops = {
  isOpen: any;
  setOpen: any;
  children?: React.ReactNode;
  onSubmit: any;
  value?: any;
};

export function ImageVideoModal({
  isOpen,
  setOpen,
  children,
  value,
  onSubmit,
}: IVMprops) {
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});

  const [tab, setTab] = useState('browse');

  useEffect(() => {
    if (isEmbedded(value)) {
      setUrl(value);
      setTab('embed');
    } else {
      setUrl('');
    }
  }, [value]);

  const handleSubmit = async () => {
    setErrors({});
    if (!url) {
      return setErrors({ url: { message: 'Embedded url is required' } });
    }
    let newUrl = url;
    if (!isEmbedded(url)) {
      newUrl = getSrcValue(url);
      if (!newUrl) {
        return setErrors({ url: { message: 'Embedded url not valid' } });
      }
    }

    await onSubmit(newUrl);
    setOpen(false);
  };

  return (
    <NewCustomModal isModalOpen={isOpen} setIsModalOpen={setOpen}>
      <div className="w-[calc(100vw-20px)] max-w-[450px] rounded bg-[#F2EBF9] p-[30px] !pt-5">
        <div
          onClick={() => setOpen(false)}
          className="absolute top-[10px] right-[10px] cursor-pointer"
        >
          <CrossIcon stroke="#464C53" />
        </div>
        <div>
          <div className="flex pb-5">
            <div
              onClick={() => setTab('browse')}
              className={cx(
                'px-5 py-1 font-semibold text-lg text-primary border-b-[2px] border-transparent hover:bg-[rgba(90,47,132,0.05)] cursor-pointer',
                tab === 'browse' && '!border-primary'
              )}
            >
              Browse
            </div>
            <div
              onClick={() => setTab('embed')}
              className={cx(
                'px-3 py-1 font-semibold text-lg text-primary border-b-[2px] border-transparent hover:bg-[rgba(90,47,132,0.05)] cursor-pointer',
                tab === 'embed' && '!border-primary'
              )}
            >
              Embed
            </div>
          </div>
          <div>
            {tab === 'browse' && (
              <div>
                <div>{children}</div>
              </div>
            )}
            {tab === 'embed' && (
              <div>
                <div>
                  <NewSectionInputField
                    name="url"
                    label="Embedded youtube and vimeo"
                    placeholder="embedded url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    errors={errors}
                  />
                </div>
                <DashboardButton
                  className="pt-[20px]"
                  resetBtnText="Cancel"
                  updateBtnText="Embed"
                  resetBtnProps={{
                    className: '!h-[40px] !w-[120px]',
                    type: 'button',
                  }}
                  updateBtnProps={{
                    className: '!h-[40px] !w-[120px]',
                    type: 'button',
                  }}
                  resetOnClick={() => setOpen(false)}
                  updateOnClick={handleSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </NewCustomModal>
  );
}

export default EmbedFilePopup;
