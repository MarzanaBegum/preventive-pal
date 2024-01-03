import bannerCloudImg from '../../../../../public/images/Home/banner-cloud.svg';
import heroGreenImg from '../../../../../public/images/Home/green-hero-banner.svg';
import heroBannerImg from '../../../../../public/images/Home/prevention-animation.svg';

export const heroSlides = [
  {
    _id: 1,
    cloudImg: bannerCloudImg,
    bannerImg: heroBannerImg,
    body: (
      <p className="lg:text-[18px] md:text-[16px] text-[14px] lg:leading-[31px] md:leading-[27px] leading-[24px] text-center text-primary-text font-normal banner-text  opacity-0 translate-y-40">
        Primary prevention offers outlets that benefit mental health, keep
        people from substance use, and incentivize healthier living.
      </p>
    ),
  },
  {
    _id: 2,
    cloudImg: bannerCloudImg,
    bannerImg: heroGreenImg,
    body: (
      <p className="lg:text-[18px] md:text-[16px] text-[14px] lg:leading-[31px] md:leading-[27px] leading-[24px] text-center text-primary-text font-normal banner-text  opacity-0 translate-y-20">
        Discover how we&apos;re revolutionizing the concept of
        &apos;prevention&apos; <br className="hidden md:block" /> and unlocking
        its potential to transform communities for the better.
      </p>
    ),
  },
];
