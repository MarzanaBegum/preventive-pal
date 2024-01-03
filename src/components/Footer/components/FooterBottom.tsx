import { useRootData } from '@/context/RootData';
import { FooterSectionType } from '@/utils/types';
import Image from 'next/image';

interface Props {
  d: FooterSectionType;
}

const FooterBottom = ({ d }: Props) => {
  // hooks
  const { lang } = useRootData();

  return (
    <div className="bg-primary p-[30px_0]">
      <div className="container">
        <div className="md:mx-[-15px] w-full">
          <div className="flex flex-col max-md:gap-[30px] md:flex-row md:items-center justify-between">
            <p className="text-[16px] leading-[160%] text-center md:text-left font-normal text-[#FFFFFF]">
              {d.copyRight?.[lang]}
            </p>

            {!d?.images?.copyRightImg?.hidden && (
              <Image
                src={d.images.copyRightImg.src}
                width={209}
                height={36}
                alt="ColoRaDoLogo"
                className="w-[209px] h-[36px] mx-auto md:mx-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
