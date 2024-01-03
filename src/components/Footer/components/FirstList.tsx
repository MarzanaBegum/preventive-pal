import { idToIndex } from '@/components/Header/Header';
import useGetContent from '@/hooks/useGetContent';
import { FooterSocialType } from '@/utils/types';
import { PageApi } from '@/views/Home/components/Hero/Hero';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../assets/icons/footer-logo.png';
import FSocialLinks from '../partials/FSocialLink';

interface Props {
  links: FooterSocialType[];
  address: string;
  logo: string;
  isHidden?: boolean;
}

const FirstList = ({
  links,
  address,
  logo,
  isHidden,
  fullpageApi,
}: Props & PageApi) => {
  // states
  const { footer } = useGetContent();

  const handleRedirect = (id: string) => {
    const getIndex = idToIndex(id);
    if (getIndex) {
      const internals = fullpageApi?.getFullpageData().internals;
      const section = document.querySelectorAll(
        '.fp-section._colorado_slider .fp-slide'
      );
      if (section.length && internals) {
        internals.silentLandscapeScroll(section[0], 'internal');
        const element: any = document.querySelector('._coloradoIndicatorLine');
        if (element) {
          element.style.width = '0%';
        }
      }
      fullpageApi?.moveTo(getIndex);
    }
  };

  return (
    <div className="xl:w-[243px] md:w-[221px] w-[335px]">
      {!isHidden && (
        <Link href="/" onClick={() => handleRedirect('home')}>
          <Image
            src={logo || Logo}
            width={221}
            height={17}
            alt="logo"
            className="w-[221px] h-[17px] cursor-pointer"
          />
        </Link>
      )}

      <div className="my-[26px]">
        <h3 className="text-[16px] leading-[24px] mb-[5px] font-semibold 2xl:leading-[175%] text-[#4B395B]">
          {footer.visit}
        </h3>
        <h3 className="text-[14px] leading-[175%] xl:text-[16px] md:leading-[150%] font-normal text-[#555555]">
          {address}
        </h3>
      </div>
      <h3 className="text-[16px] leading-[175%] font-semibold text-[#715D86]">
        {footer.contact}
      </h3>

      {/* bottom social icons */}
      <FSocialLinks links={links} />
    </div>
  );
};

export default FirstList;
