import Image from 'next/image';
import { ChangeEventHandler } from 'react';

type NIFProps = {
  hidden?: boolean;
  fileValue?: any;
  hideOnChange?: (v: boolean) => void;
  fileOnChange?: ChangeEventHandler<HTMLInputElement>;
};

const CustomImageField = ({
  hidden,
  hideOnChange,
  fileValue,
  fileOnChange,
}: NIFProps) => {
  const imgSrc = fileValue
    ? typeof fileValue === 'string'
      ? fileValue
      : URL.createObjectURL(fileValue)
    : '';

  return (
    <div className="w-full group pt-[12px] pb-[27px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative">
      <label className="flex justify-end">
        <Image
          src={!hidden ? '/images/visible.svg' : '/images/eye-slash.svg'}
          alt="eyeIcon"
          width={16}
          height={16}
          className="cursor-pointer"
        />
        <input
          className="hidden"
          type="checkbox"
          checked={hidden}
          onChange={(e) => {
            hideOnChange && hideOnChange(!hidden);
          }}
        />
      </label>
      <div
        className={`${hidden && 'opacity-40'
          } group-hover:opacity-40 transition-all duration-300 mx-auto w-[161px] h-[95px]`}
      >
        <Image
          src={imgSrc}
          alt="gif"
          width={161}
          height={95}
          className="w-full h-full"
        />
      </div>
      <div
        className={`${!hidden ? 'group-hover:opacity-100' : 'group-hover:hidden'
          } absolute opacity-0 top-[60px] left-0 transition-all duration-300 right-0 bottom-0`}
      >
        <div className="flex justify-center">
          <label
            htmlFor={`file-input-${'random'}`}
            className="w-[108px] h-[35px] hover:bg-[#40215f] transition-all duration-200 text-[16px] flex justify-center items-center font-semibold bg-primary border border-primary text-[#FFFFFF] rounded-[6px] cursor-pointer"
          >
            Replace GIF
            <input
              id={`file-input-${'random'}`}
              type="file"
              accept="image/gif, image/svg+xml, image/jpg"
              style={{ display: 'none' }}
              onChange={fileOnChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomImageField;
