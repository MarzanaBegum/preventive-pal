import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import { DataProps, IResourceData, IResourseItem } from '@/utils/types';
import dynamic from 'next/dynamic';
import ResourceCard from './ResourceCard';
const InnerHTML = dynamic(
  () => import('@/components/AdminDashboard/InnerHTML'),
  { ssr: false }
);

const MoreResources = ({ d }: DataProps<IResourceData>) => {
  // hooks
  const { resources } = useGetContent();
  const { lang } = useRootData();
  return (
    <div
      style={{
        background: d?.customize?.bgColor
          ? `${d?.customize?.bgColor}`
          : '#F9F9F9',
      }}
      className="pb-[60px] 2xl:pb-[80px]"
    >
      {/* <ResourcesHeader /> */}
      <div className="pt-[90px]"></div>
      <div className="w-[335px] md:w-[688px] lg:w-[824px] xl:w-[1000px] 2xl:w-[1108px] 3xl:w-[1134px] mx-auto">
        <div className="text-center">
          <h2
            style={{
              color: d?.customize?.headerColor
                ? `${d?.customize?.headerColor}`
                : '#333333',
            }}
            className="text-[32px] leading-[38px] mb-[20px] md:text-[48px] md:leading-[58px] 2xl:mb-[40px] 2xl:text-[64px] 2xl:leading-[77px] font-bold"
          >
            {lang === 'spa' ? d.header.spa : d.header.en}
          </h2>
          <InnerHTML
            style={{
              color: d?.customize?.descColor
                ? `${d?.customize?.descColor}`
                : '#656565',
            }}
            html={d.description?.[lang]}
            className="text-[14px] leading-[175%] w-[100%] md:text-[16px] lg:text-[18px] 3xl:w-[846px] lg:max-w-[550px] max-w-[560px] mx-auto font-normal"
          />
        </div>
        <div className="flex flex-wrap md:flex-row justify-center items-center md:items-start my-[30px] gap-[38px] md:justify-between md:my-[40px] xl:my-[60px] xl:gap-[30px] 2xl:gap-[80px] 3xl:gap-[90px]">
          {d.resourcesData
            ?.filter((item) => item.hidden === false)
            ?.map((item: IResourseItem, i: number) => (
              <ResourceCard key={`dgad_${i}`} item={item} />
            ))}
        </div>
        <p
          style={{
            color: d?.customize?.disclaimerColor
              ? `${d?.customize?.disclaimerColor}`
              : '#7b52a3',
          }}
          className="text-center text-[14px] md:text-[16px] leading-[175%] text-[#7b52a3] font-medium"
        >
          <span className="font-bold text-primary">
            {resources.disclaimer} :
          </span>{' '}
          {d.disclaimer?.[lang]}
        </p>
      </div>
    </div>
  );
};

export default MoreResources;
