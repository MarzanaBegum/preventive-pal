import { FooterSocialType } from '@/utils/types';
import React from 'react';

type Props = {
    socialLink: FooterSocialType[];
    setSocialLink: React.Dispatch<React.SetStateAction<FooterSocialType[]>>;
}

const SocialLinks = ({ socialLink, setSocialLink }: Props) => {

    // toggle hidden function
    const toggleSocialLinkHidden = (name: string) => {
        setSocialLink((prevLinks) =>
            prevLinks.map((link) =>
                link.name === name ? { ...link, isHidden: !link.isHidden } : link
            )
        );
    };

    return (<></>
        // <div className='space-y-[20px]'>
        //     {socialLink.map((item: FooterSocialType) => (<div key={item.name} className='flex gap-[24px] items-center h-full'>
        //         <div className='flex-1'>
        //             <CustomInputField
        //                 disabled={item.isHidden}
        //                 placeholder={`Enter ${item.name} link`}
        //                 type="text"
        //                 name={item.name}
        //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        //                     const updatedSocialLinks = [...socialLink];
        //                     const updatedSocialLink = updatedSocialLinks.find((link) => link.name === item.name);
        //                     if (updatedSocialLink) {
        //                         updatedSocialLink.link = e.target.value;
        //                         setSocialLink(updatedSocialLinks);
        //                     }
        //                 }}
        //                 value={item.link}
        //             />
        //         </div>

        //         <HiddenToggleBtn isHidden={item.isHidden} handleHidden={() => toggleSocialLinkHidden(item.name)} />
        //     </div>))}
        // </div>
    )
}

export default SocialLinks