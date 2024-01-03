import { useRootData } from '@/context/RootData';
import useGetContent from '@/hooks/useGetContent';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
const InnerHTML = dynamic(
  () => import('@/components/AdminDashboard/InnerHTML'),
  { ssr: false }
);

const Content = ({ data }: { data: any }) => {
  const { coloradoHero } = useGetContent();
  const { lang } = useRootData();

  return (
    <div className="max-w-[1164px] mx-auto ">
      <h3
        style={{ color: data?.customize?.subheaderColor }}
        className="uppercase font-[500] lg:text-[24px] md:leading-[19px] md:text-[16px]  text-[14px] leading-[19px] tracking-[0.2em] text-[#33333]"
      >
        {data?.subheader?.[lang]}
      </h3>
      <h1
        style={{ color: data?.customize?.headerColor }}
        className={classNames(
          ' font-[900] xl:text-[102px] lg:text-[72px] xl:pt-[35px] md:pt-[15px] pt-[8px] xl:pb-4 md:text-[60px] md:leading-[84px] text-[38px] text-[#664897] tracking-[0.0465em] uppercase',
          'font-arges'
        )}
      >
        {data?.header?.[lang]}
      </h1>
      <div className="text-center font-secondary xl:text-[18px] lg:leading-[32px] lg:text-[16px] md:text-[14px] md:leading-[24px] text-[12px] leading-[21px] tracking-[175%] xl:max-w-[870px] lg:max-w-[660px] md:max-w-[577px] max-w-[335px] mx-auto  text-[#444]">
        <InnerHTML
          html={data?.description?.[lang]}
          style={{ color: data?.customize?.descColor }}
        />
      </div>
    </div>
  );
};

export default Content;
