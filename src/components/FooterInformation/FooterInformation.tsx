import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { createObjectUrlMap, uploadFile } from '@/utils/FileToString';
import { footerDefaultLink } from '@/utils/constants';
import {
  FDataType,
  FooterFileObjType,
  FooterSocialType
} from '@/utils/types';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FooterInformation = ({ data: rData }: any) => {
  // hook
  // const { lang } = useAdminData();
  const { refetchRootData } = useAdminData();

  const [lang, setLang] = useState<'en' | 'spa'>('en');

  // states
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [fileLoading, setFileLoading] = useState(false);

  const [data, setData] = useState<FDataType>(_.cloneDeep(rData.en));
  const [reversedData, setReversedData] = useState<FDataType>(
    _.cloneDeep(rData.spa)
  );
  const [socialLink, setSocialLink] = useState<FooterSocialType[]>(
    _.cloneDeep(rData.sociallinks)
  );
  const [imgInfo, setImgInfo] = useState<FooterFileObjType>(
    _.cloneDeep(rData.images)
  );
  const [logoImg, setLogoImg] = useState<any>(_.cloneDeep(rData.logo));

  const [addMoreInfoField, setAddMoreInfoField] = useState<boolean>(false);
  const [newInfoField, setNewInfoField] =
    useState<any>(footerDefaultLink);

  const [addMoreResField, setAddMoreResField] = useState<boolean>(false);
  const [newResField, setNewResField] = useState<any>(footerDefaultLink);

  const [hideToggle, setHideToggle] = useState<boolean | undefined>(false);
  const [addMenuToggle, setAddMenuToggle] = useState<boolean | undefined>(
    false
  );

  // set data by language
  useEffect(() => {
    if (lang === 'spa') {
      setData(_.cloneDeep(rData.spa));
      setReversedData(_.cloneDeep(rData.en));
    } else {
      setData(_.cloneDeep(rData.en));
      setReversedData(_.cloneDeep(rData.spa));
    }
    setHideToggle(_.cloneDeep(rData.hidden as boolean));
    setAddMenuToggle(_.cloneDeep(rData.menu as boolean));
    setLogoImg(_.cloneDeep(rData.logo));
    setImgInfo(_.cloneDeep(rData.images));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // useEffect(() => {
  //   setImgInfo((data as FDataType).images) // @TODO: Add this to type
  // }, [data])

  // toggle item
  const handleItemClick = (index: number) =>
    setActiveIndex(index === activeIndex ? null : index);

  // function
  const handleFooterInfo = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // set all data
    const sendData: any = {
      ...rData,
      menu: addMenuToggle,
      hidden: hideToggle,
      [lang]: {
        ...data,
        informationLinks: {
          ...data.informationLinks,
          links:
            newInfoField.link && newInfoField.text
              ? [...data.informationLinks.links, newInfoField]
              : data.informationLinks.links,
        },
        resourcesLinks: {
          ...data.resourcesLinks,
          links:
            newResField.link && newResField.text
              ? [...data.resourcesLinks.links, newResField]
              : data.resourcesLinks.links,
        },
      },
      sociallinks: socialLink,
      [lang === 'en' ? 'spa' : 'en']: {
        ...reversedData,
        informationLinks: {
          ...reversedData.informationLinks,
          links:
            newInfoField.link && newInfoField.text
              ? [
                ...reversedData.informationLinks.links,
                { ...newInfoField, text: '' },
              ]
              : reversedData.informationLinks.links,
        },
        resourcesLinks: {
          ...reversedData.resourcesLinks,
          links:
            newResField.link && newResField.text
              ? [
                ...reversedData.resourcesLinks.links,
                { ...newResField, text: '' },
              ]
              : reversedData.resourcesLinks.links,
        },
      },
    };

    // ********* NEW CODE
    setFileLoading(true);
    const images = await createObjectUrlMap(imgInfo);
    const logoImgUp =
      typeof logoImg === 'string' ? logoImg : await uploadFile(logoImg);
    setFileLoading(false);

    sendData.images = images;
    sendData.logo = logoImgUp;

    try {
      setLoading(true);
      await api.put('/v2/data', sendData);
      await refetchRootData();
      setLoading(false);
      toast.success('Footer section updated successfully');
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response ? err.response.data?.message : err.message);
    }
  };

  // reset function
  const handleResetFooterInfo = () => {
    if (lang === 'spa') {
      setData(_.cloneDeep(rData.spa));
      setReversedData(_.cloneDeep(rData.en));
    } else {
      setData(_.cloneDeep(rData.en));
      setReversedData(_.cloneDeep(rData.spa));
    }
    setHideToggle(_.cloneDeep(rData.hidden as boolean));
    setAddMenuToggle(_.cloneDeep(rData.menu as boolean));
    setSocialLink(_.cloneDeep(rData.sociallinks));
    setImgInfo(_.cloneDeep(rData.images));
    setLogoImg(_.cloneDeep(rData.logo));
  };

  return (<></>
    // <form onSubmit={handleFooterInfo}>
    //   <DashboardLayout
    //     rightSection={
    //       <div className="flex flex-col  md:flex-row xl:flex-col gap-[30px]">
    //         <ToggleWrapper label="Settings">
    //           <div className="flex flex-col gap-[24px]">
    //             <CustomToggleField
    //               label="Hide Section"
    //               defaultData={rData}
    //               toggle={hideToggle}
    //               setToggle={setHideToggle}
    //             />
    //             <CustomToggleField
    //               label="Add to Menu"
    //               toggle={addMenuToggle}
    //               setToggle={setAddMenuToggle}
    //             />

    //             <div>
    //               <h3 className="font-semibold text-[16px] leading-[22px] text-[#444444] mb-[14px]">
    //                 Select Language
    //               </h3>
    //               <AdminLanguageDropdown lang={lang} setLang={setLang} />
    //             </div>
    //           </div>
    //         </ToggleWrapper>
    //         <ToggleWrapper label="Logo">
    //           <FileUploadCard image={logoImg} setImage={setLogoImg} />
    //         </ToggleWrapper>
    //       </div>
    //     }
    //   >
    //     {/* information section */}
    //     <DashboardWrapper isHidden={hideToggle}>
    //       <CustomInputField
    //         label="Section Name"
    //         placeholder="Section name"
    //         type="text"
    //         name="title"
    //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //           setData({
    //             ...data,
    //             title: e.target.value,
    //           })
    //         }
    //         value={data.title}
    //       />

    //       {/* arcodians start */}
    //       {footerAccordionItems.map((item: string, index: number) => (
    //         <div key={index} className={classNames(index === 0 && 'mt-[10px]')}>
    //           <div
    //             className="flex items-center justify-between cursor-pointer group"
    //             role="button"
    //             onClick={() => handleItemClick(index)}
    //           >
    //             <h4 className="text-[24px] font-semibold font-primary leading-[33.6px]">
    //               {item}
    //             </h4>
    //             <div
    //               className={classNames(activeIndex === index && 'rotate-180')}
    //             >
    //               <BottomArrow />
    //             </div>
    //           </div>

    //           <div className="border-b border-[#E5DDED] mt-[16px]"></div>

    //           <div className={classNames(activeIndex === index && 'mt-[19px]')}>
    //             {activeIndex === index && index === 0 && (
    //               <InformationLinks
    //                 data={data}
    //                 setData={setData}
    //                 setReversedData={setReversedData}
    //                 newInfoField={newInfoField}
    //                 setNewInfoField={setNewInfoField}
    //                 addMoreField={addMoreInfoField}
    //                 setAddMoreField={setAddMoreInfoField}
    //               />
    //             )}

    //             {activeIndex === index && index === 1 && (
    //               <ResourcesLinks
    //                 data={data}
    //                 setData={setData}
    //                 setReversedData={setReversedData}
    //                 newResField={newResField}
    //                 setNewResField={setNewResField}
    //                 addMoreField={addMoreResField}
    //                 setAddMoreField={setAddMoreResField}
    //               />
    //             )}

    //             {activeIndex === index && index === 2 && (
    //               <SocialLinks
    //                 socialLink={socialLink}
    //                 setSocialLink={setSocialLink}
    //               />
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //       {/* arcodians end */}

    //       <div className="mt-[10px] space-y-[20px]">
    //         <CustomInputField
    //           label="Address"
    //           placeholder="Enter address"
    //           type="text"
    //           name="address"
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setData({
    //               ...data,
    //               address: e.target.value,
    //             })
    //           }
    //           value={data.address}
    //         />

    //         <CustomInputField
    //           label="Label"
    //           placeholder="Enter label"
    //           type="text"
    //           name="label"
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setData({
    //               ...data,
    //               label: e.target.value,
    //             })
    //           }
    //           value={data.label}
    //         />

    //         <div>
    //           <h2 className="text-[18px] leading-[140%] mb-[16px] font-semibold text-secondary-text">
    //             Your Images
    //           </h2>

    //           <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[20px] md:gap-[40px] 2xl:gap-x-[55.89px] 2xl:gap-y-[20px] justify-center">
    //             <div className="w-full group pt-[12px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative">
    //               <CustomImageField
    //                 fileValue={imgInfo.logo.src}
    //                 fileOnChange={(e) => {
    //                   const file = e.target.files?.[0];
    //                   if (file)
    //                     setImgInfo((v: any) => ({
    //                       ...v,
    //                       logo: { ...v.logo, src: file },
    //                     }));
    //                 }}
    //                 hidden={imgInfo.logo.hidden}
    //                 hideOnChange={(h) => {
    //                   setImgInfo((v: any) => ({
    //                     ...v,
    //                     logo: { ...v.logo, hidden: h },
    //                   }));
    //                 }}
    //               />
    //             </div>

    //             <div className="w-full group pt-[12px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative">
    //               <CustomImageField
    //                 fileValue={imgInfo.copyRightImg.src}
    //                 fileOnChange={(e) => {
    //                   const file = e.target.files?.[0];
    //                   if (file)
    //                     setImgInfo((v: any) => ({
    //                       ...v,
    //                       copyRightImg: { ...v.copyRightImg, src: file },
    //                     }));
    //                 }}
    //                 hidden={imgInfo.copyRightImg.hidden}
    //                 hideOnChange={(h) => {
    //                   setImgInfo((v: any) => ({
    //                     ...v,
    //                     copyRightImg: { ...v.copyRightImg, hidden: h },
    //                   }));
    //                 }}
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <CustomInputField
    //           label="Copyright Text"
    //           placeholder="Enter copyright text"
    //           type="text"
    //           name="copyright"
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setData({
    //               ...data,
    //               copyRight: e.target.value,
    //             })
    //           }
    //           value={data.copyRight}
    //         />
    //       </div>
    //     </DashboardWrapper>

    //     {fileLoading && (
    //       <div className="flex justify-end gap-2 mt-4">
    //         <div>
    //           <LoadingIcon />
    //         </div>
    //         <div>Uploading file, please wait...</div>
    //       </div>
    //     )}

    //     <DashboardButton
    //       resetOnClick={() => {
    //         handleResetFooterInfo();
    //       }}
    //       isLoading={loading}
    //       className="py-[30px]"
    //       disabled={
    //         (addMoreInfoField &&
    //           (newInfoField.text === '' || newInfoField.link === '')) ||
    //         (addMoreResField &&
    //           (newResField.text === '' || newResField.link === ''))
    //       }
    //     />
    //   </DashboardLayout>
    // </form>
  );
};

export default FooterInformation;
