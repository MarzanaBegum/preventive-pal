import { useRootData } from '@/context/RootData';
import { IResourseItem } from '@/utils/types';
import Image from 'next/image';

type ResourceCardProps = {
  item: IResourseItem;
};

const ResourceCard = ({ item }: ResourceCardProps) => {
  // hooks
  const { lang } = useRootData();
  return (
    <div className="w-[80px] md:w-[104px] xl:w-[146px] group cursor-pointer">
      <div
        style={{ backgroundColor: item.bgColor }}
        className={`w-[80px] h-[80px] xl:w-[146px] xl:h-[146px] mx-auto border border-[#010101] rounded-full flex items-center justify-center`}
      >
        <Image
          src={item.img}
          alt="logo"
          width={80}
          height={80}
          className={`${
            item.img.includes('resource-img2.svg') && 'ml-[15px]'
          } w-[39.46px] h-[39.45px] xl:w-[72px] xl:h-[72px] transition-all duration-700 ease-in-out group-hover:scale-110`}
        />
      </div>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[14px] md:text-[16px] leading-[160%] 2xl:text-[18px] 2xl:leading-[150%] block mt-[17px] 2xl:mt-[20px] font-normal group-hover:text-[#983fc2] group-hover:decoration-[#983fc2] group-hover:underline text-secondary-text text-center"
      >
        {item.title?.[lang]}
      </a>
    </div>
  );
};

export default ResourceCard;
