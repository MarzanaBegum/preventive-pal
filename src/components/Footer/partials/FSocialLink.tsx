import { FooterSocialType } from '@/utils/types';
import { useState } from 'react';
import Facebook from '../components/SvgIcons/Facebook';
import Instragram from '../components/SvgIcons/Instragram';
import Twitter from '../components/SvgIcons/Twitter';
import Youtube from '../components/SvgIcons/Youtube';

// icons
const iconsMap: Record<string, React.ComponentType<any>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instragram,
  youtube: Youtube,
};

//  icons sizes
const iconSizes: { [platform: string]: { [platform: string]: number } } = {
  facebook: { width: 12.63, height: 25 },
  twitter: { width: 30, height: 25 },
  instagram: { width: 25, height: 24 },
  youtube: { width: 31.37, height: 22.3 },
};

interface Props {
  links: FooterSocialType[];
}

const FSocialLinks = ({ links }: Props) => {
  // states
  const [colorMap, setColorMap] = useState<{ [platform: string]: boolean }>({
    facebook: false,
    twitter: false,
    instagram: false,
    youtube: false,
  });

  //   functions
  const handleMouseOver = (name: string) =>
    setColorMap((prevState) => ({ ...prevState, [name]: true }));
  const handleMouseLeave = (name: string) =>
    setColorMap((prevState) => ({ ...prevState, [name]: false }));

  return (
    <div className="flex gap-[23px] mt-[12px]">
      {links?.map((link: any) => {
        const { name, link: socialLink, isHidden } = link;
        const Icon = iconsMap[name];
        if (isHidden) return null;

        return (
          <a
            key={name}
            target="_blank"
            href={socialLink ? socialLink : '#'}
            className="cursor-pointer"
            onMouseOver={() => handleMouseOver(name)}
            onMouseLeave={() => handleMouseLeave(name)}
          >
            <Icon
              width={iconSizes[name].width}
              height={iconSizes[name].height}
              className="transition duration-700 hover:scale-110"
              stroke={colorMap[name] ? '#623B88' : '#555555'}
            />
          </a>
        );
      })}
    </div>
  );
};

export default FSocialLinks;
