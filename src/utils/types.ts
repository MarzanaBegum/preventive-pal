type ComponentType =
  // default
  | 'hero'
  | 'primary-prevention'
  | 'colorado-hero'
  | 'colorado-slider'
  | 'resources'
  | 'footer'
  // custom
  | 'custom-text'
  | 'custom-text-img';

// Common Type
interface Title {
  en: string;
  spa: string;
}

// Hero Section Type
export interface HeroType {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  title: Title;
  description: Title;
  scrollButton: Title;
  logo: string;
  customize: {
    descColor: string;
    scrollBtnColor: string;
  };
  imgs: Imgs;
}

interface Imgs {
  img1: Img1;
  img2: Img1;
  img3: Img1;
  img4: Img1;
  img5: Img1;
  img6: Img1;
  img7: Img1;
}

interface Img1 {
  hidden: boolean;
  src: string;
}

// Primary Prevention Section Type
export interface PrimaryPreventionType {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  title: Title;
  description: Title;
  subheader: Title;
  header: Title;
  scrollButton: Title;
  customize: {
    headerColor: string;
    subheaderColor: string;
    descColor: string;
    bgColor: string;
    scrollBtnColor: string;
  };
}

// Primary Colorado Section Type
export interface PrimaryColoradoType {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  title: Title;
  header: Title;
  description: Title;
  scrollButton: Title;
  subheader: Title;
  customize: {
    headerColor: string;
    subheaderColor: string;
    descColor: string;
    scrollBtnColor: string;
    bgColor: string;
  };
}
// Colorado Slider Section Type
export interface ColoradoSliderType {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  title: Title;
  scrollButton: Title;
  customize: {
    bgColor: string;
    scrollBtnColor: string;
    visualPrimary: string;
    visualSecondary: string;
  };
  logo: string;
  sliderData: SliderDatum[];
}

export interface SliderDatum {
  sliderId: string;
  hidden: boolean;
  img: string;
  subheader: Title;
  header: Title;
  description: Title;
  customize: {
    subheaderColor: string;
    headerColor: string;
    descColor: string;
    imgPosition: string;
    imgBackground: string;
  };
}

export interface ResourcesDataType {
  title: string;
  img: string;
  bgColor: string;
  link: string;
}

export interface CustomTextImgType {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  title: Title;
  description: Title;
  subheader: Title;
  header: Title;
  scrollButton: Title;
  img: string;
  customize: {
    headerColor: string;
    subheaderColor: string;
    descColor: string;
    bgColor: string;
    scrollBtnColor: string;
    imgPosition: string;
  };
}

export interface Customize {
  headerColor: string;
  bgColor: string;
  subheaderColor: string;
  descColor: string;
}

export type RootDataType = (
  | HeroType
  | PrimaryPreventionType
  | PrimaryColoradoType
  | ColoradoSliderType
  | IResourceData
  | FooterSectionType
)[];

export type DataProps<T> = {
  d: T;
};

// footer information data types

export interface FooterSocialType {
  name: string;
  link: string;
  isHidden: boolean;
}

export interface FooterSectionType {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  logo: string;
  title: Title;
  address: Title;
  label: Title;
  copyRight: Title;
  informationLinks: InformationLinks;
  resourcesLinks: InformationLinks;
  socialLinks: SocialLink[];
  images: Images;
}

interface Images {
  logo: Logo;
  copyRightImg: Logo;
}

interface Logo {
  hidden: boolean;
  src: string;
}

interface SocialLink {
  name: string;
  link: string;
  isHidden: boolean;
}

export interface InformationLinks {
  text: Title;
  links: Link[];
}

interface Link {
  text: Title;
  link: string;
  isHidden: boolean;
}

export interface profileDropDataType {
  _id: string;
  text: string;
  link: string;
  icon: React.ReactNode;
}

export interface ILoggedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  username: string;
}

export interface MenuDataType {
  logo: string;
  customize: {
    closeBtnColor: string;
  };
  links: [
    {
      name: {
        en: string;
        spa: string;
      };
      url: string;
      newTab: boolean;
      hidden?: boolean;
      customize: {
        linkNameColor: string;
      };
    }
  ];
}

export interface MenuType {
  logo: string;
  customize: {
    closeBtnColor: string;
  };
  links: MenuLink[];
}

interface MenuLink {
  name: MenuName;
  url: string;
  newTab: boolean;
  hidden: boolean;
  customize: {
    linkNameColor: string;
  };
}

interface MenuName {
  en: string;
  spa: string;
}

export interface FileObjType {
  hidden: boolean;
  src: string;
}
export interface FooterFileObjType {
  logo: FileObjType;
  copyRightImg: FileObjType;
}

export interface IResourseItem {
  bgColor: string;
  hidden: boolean;
  img: string;
  link: string;
  title: { [platform: string]: string };
}

export interface IResourceData {
  id: string;
  type: string;
  menu: boolean;
  hidden: boolean;
  logo: string;
  customize: {
    bgColor: string;
    headerColor: string;
    descColor: string;
    disclaimerColor: string;
  };
  title: {
    en: string;
    spa: string;
  };
  header: {
    en: string;
    spa: string;
  };
  description: {
    en: string;
    spa: string;
  };
  disclaimer: {
    en: string;
    spa: string;
  };
  resourcesData: IResourseItem[];
}

export interface FooterType {
  copyRight: string;
  label: string;
  address: string;
  logo: string;
  informationLinks: FooterLinks;
  resourcesLinks: FooterLinks;
  sociallinks: FooterSocialType[];
  images: FooterFileObjType;
}

export interface FooterLinks {
  text: string;
  links: FooterLinkType[];
}

export interface FooterLinkType {
  text: string;
  link: string;
}
export interface CustomTextType {
  customize: Customize;
  subheader: string;
  header: string;
  description: string;
}

export interface SliderDataType {
  sliderId: string;
  img: string;
  subheader: string;
  header: string;
  description: string;
}

interface CommonType {
  id: string;
  title: string;
  type: ComponentType;
  // common boolean
  hidden?: boolean;
  menu?: boolean;
}

export interface ResourcesType extends CommonType {
  header: string;
  description: string;
  resourcesData: ResourcesDataType[];
}

export interface PreventionSliderType extends CommonType {
  header: string;
  subheader: string;
  img: string;
  description: string;
}

// footer information data types
export interface FLinkType {
  _id?: string;
  text: { [platform: string]: string };
  link: string;
  isHidden?: boolean;
}
export interface FooterListType {
  text: { [platform: string]: string };
  links: FLinkType[];
}

export interface FDataType {
  id: string;
  title: { [platform: string]: string };
  address: { [platform: string]: string };
  label: { [platform: string]: string };
  copyRight: { [platform: string]: string };
  logo: string;
  informationLinks: FooterListType;
  resourcesLinks: FooterListType;
  images: FooterFileObjType;
  socialLinks: FooterSocialType[];
}

export type ILang = 'en' | 'spa';
