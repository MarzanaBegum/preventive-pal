import { isEmbedded } from '@/components/AdminSectionForm/AddNewSectionForm';
import { isVideo } from '@/utils/FileType';
import { EmbedRenderType } from '@/views/Colorado/components/SliderItem';
import cx from 'classnames';
import _ from 'lodash';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  FieldErrors,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type FUFProps = {
  errors?: FieldErrors;
} & UseControllerProps<any>;
const SliderFileUpload = ({ errors, ...props }: FUFProps) => {
  const { field } = useController(props);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    console.log(file);
    field.onChange(file);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'image/png': [
          '.png',
          '.svg',
          '.mp4',
          '.webm',
          '.ogg',
          '.mov',
          '.avi',
          '.gif',
          '.flv',
        ],
      },
      maxFiles: 1,
    });

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
    <>
      <div
        className={cx(
          'w-full h-full   min-h-[168px] flex items-center justify-center rounded-[8px] ',
          !imgSrc && 'border border-dashed border-[#CEBDDE]'
        )}
      >
        <div
          {...getRootProps({
            className: `dropzone h-fit flex item-center justify-center ${
              isDragActive ? 'active' : ''
            }`,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col">
            <div
              className={cx(
                'px-[12px]   items-center justify-center py-[18px] flex flex-col gap-[9px]',
                imgSrc && 'border border-dashed rounded-[8px] border-[#CEBDDE]'
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
                <>
                  <Image
                    className="mx-auto"
                    src="/images/uploadFile.svg"
                    alt="upload"
                    width={24}
                    height={24}
                  ></Image>
                  <p className="font-normal text-center text-[13px] leading-[15px] text-secondary-text">
                    Drag & drop files or{' '}
                    <span className="text-primary font-bold cursor-pointer underline">
                      Browse
                    </span>
                  </p>
                  <p className="text-primary-text font-normal text-[10px] leading-[12px] text-center">
                    Supported formats: PNG
                  </p>
                </>
              )}
            </div>
            {imgSrc && (
              <div>
                <div className="pt-4"></div>
                <div className="text-center ">
                  <button
                    type="button"
                    className="text-primary hover:bg-primary hover:text-white transition-all duration-200 h-[33px] w-[90px] border border-primary rounded-[6px] font-semibold leading-[17px] text-sm"
                  >
                    Replace
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-1 text-sm text-red-500">
          {error?.message?.toString()}
        </div>
      )}
    </>
  );
};

export default SliderFileUpload;
