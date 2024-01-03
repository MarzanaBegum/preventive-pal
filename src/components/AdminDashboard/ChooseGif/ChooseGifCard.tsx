import Image from 'next/image';
import { useState } from 'react';

const ChooseGifCard = ({ gif }: any) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log('file', event.target.files[0]);
  };
  return (
    <div>
      <div className="flex justify-end" onClick={() => setIsHidden(!isHidden)}>
        <Image
          src={isHidden ? '/images/visible.svg' : '/images/eye-slash.svg'}
          alt="eyeIcon"
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`${
          !isHidden && 'opacity-40'
        } group-hover:opacity-40 transition-all duration-300 mx-auto w-[161px] h-[95px]`}
      >
        <Image
          src={gif}
          alt="gif"
          width={161}
          height={95}
          className="w-full h-full"
        />
      </div>
      <div
        className={`${
          isHidden ? 'group-hover:opacity-100' : 'group-hover:hidden'
        } absolute opacity-0 top-[60px] left-0 transition-all duration-300 right-0 bottom-0`}
      >
        <div className="flex justify-center">
          <label
            htmlFor={`file-input-${gif}`}
            className="w-[108px] h-[35px] hover:bg-[#40215f] transition-all duration-200 text-[16px] flex justify-center items-center font-semibold bg-primary border border-primary text-[#FFFFFF] rounded-[6px] cursor-pointer"
          >
            Replace GIF
            <input
              id={`file-input-${gif}`}
              type="file"
              accept="image/gif"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChooseGifCard;
