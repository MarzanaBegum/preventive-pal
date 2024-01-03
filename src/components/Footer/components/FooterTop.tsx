import { useRootData } from '@/context/RootData';
import { DataProps, FooterSectionType } from '@/utils/types';
import FirstList from './FirstList';
import SecondList from './SecondList';
import ThirdList from './ThirdList';
import { PageApi } from '@/views/Home/components/Hero/Hero';

const FooterTop = ({
  d,
  fullpageApi,
}: DataProps<FooterSectionType> & PageApi) => {
  // hooks
  const { lang } = useRootData();

  return (
    <div className="bg-[rgba(176,198,255,0.53)] p-[30px_0] md:pt-[40px] md:pb-[30px] xl:p-[70px_0]">
      <div className="w-full px-[20px] mx-auto sm:max-w-[540px] md:max-w-[688px] md:px-0 lg:max-w-[824px] xl:max-w-[1000px] 2xl:max-w-[1240px]">
        <div className="">
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:gap-x-[35px] lg:justify-between 2xl:gap-x-[86px] xl:gap-y-0 xl:gap-x-0 lg:gap-x-0 gap-y-[30px] md:gap-y-[70px]">
            <FirstList
              fullpageApi={fullpageApi}
              address={d.address?.[lang]}
              links={d.socialLinks}
              logo={d.images?.logo?.src}
              isHidden={d.images?.logo?.hidden}
            />
            <SecondList data={d.informationLinks} lang={lang} />
            <ThirdList data={d.resourcesLinks} lang={lang} />

            {/* <div className="w-[335px] md:w-full xl:w-[204px]">
              <div className="flex md:items-center md:justify-center xl:flex-col-reverse gap-[14px] w-full">
                {d.images.logo.hidden ? <Image
                  src={PHAB}
                  width={60}
                  height={60}
                  alt="logo"
                  className="w-[60px] h-[60px] xl:w-[151px] xl:h-[151px] xl:mx-auto"
                /> : <Image
                  src={d.images.logo.src}
                  width={60}
                  height={60}
                  alt="logo"
                  className="w-[60px] h-[60px] xl:w-[151px] xl:h-[151px] xl:mx-auto"
                />}

                <h2 className="text-[14px] leading-[160%] w-[204px] md:w-[297px] lg:text-[16px] lg:leading-[175%] lg:w-[305px] xl:w-[204px] text-left md:text-center font-normal text-secondary-text ">
                  {d.label?.[lang]}
                </h2>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
