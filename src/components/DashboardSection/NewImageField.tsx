import { isVideo } from '@/utils/FileType';
import Image from 'next/image';
import { useMemo } from 'react';
import { Control, useController } from 'react-hook-form';
import { isEmbedded } from '../AdminSectionForm/AddNewSectionForm';

type NIFProps = {
  control: Control<any, any>;
  fileName: string;
  hideName: string;
  embed?: boolean;
};

const NewImageField = ({ control, fileName, hideName, embed }: NIFProps) => {
  const { field: fileField } = useController({ name: fileName, control });
  const { field: hideField } = useController({ name: hideName, control });

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      fileField.onChange(file);
    }
  };

  const imgSrc = useMemo(() => {
    return typeof fileField.value === 'string'
      ? fileField.value
      : fileField.value instanceof File
      ? URL.createObjectURL(fileField.value)
      : '';
  }, [fileField.value]);

  const isVideoFile =
    isVideo(imgSrc) || fileField?.value?.type?.includes('video');

  const isEmbed = isEmbedded(imgSrc);

  return (
    <div>
      <div className="flex justify-end">
        <label>
          <Image
            src={
              !hideField.value ? '/images/visible.svg' : '/images/eye-slash.svg'
            }
            alt="eyeIcon"
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <input className="hidden" type="checkbox" {...hideField} />
        </label>
      </div>
      <div
        className={`${
          hideField.value && 'opacity-40'
        } group-hover:opacity-40 transition-all duration-300 mx-auto w-[161px] h-[95px]`}
      >
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
          <Image
            src={imgSrc}
            alt="gif"
            width={161}
            height={95}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div
        className={`${
          !hideField.value ? 'group-hover:opacity-100' : 'group-hover:hidden'
        } absolute opacity-0 top-[60px] left-0 transition-all duration-300 right-0 bottom-0`}
      >
        <div className="flex justify-center flex-col items-center">
          <label
            htmlFor={`file-input-${fileName}`}
            className="w-[108px] h-[35px] hover:bg-[#40215f] transition-all duration-200 text-[16px] flex justify-center items-center font-semibold bg-primary border border-primary text-[#FFFFFF] rounded-[6px] cursor-pointer"
          >
            Replace GIF
            <input
              id={`file-input-${fileName}`}
              type="file"
              accept=".png, .gif, .svg"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewImageField;
