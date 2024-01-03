import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { useEffect, useState } from 'react';

import ToggleWrapper from '../ToggleWrapper';

import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import { createObjectUrlMap } from '@/utils/FileToString';
import LoadingIcon from '@/utils/LoadingIcon';
import { FooterSectionType } from '@/utils/types';
import Image from 'next/image';
import FooterHiddenToggle from '../AdminDashboard/FooterSectionComponent/FooterHiddenToggle';
import FooterInputField from '../AdminDashboard/FooterSectionComponent/FooterInputField';
import FooterSectionWrapper from '../AdminDashboard/FooterSectionComponent/FooterSectionWrapper';
import FooterSocialIcon from '../AdminDashboard/FooterSectionComponent/FooterSocialIcon';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import DashboardLayout, {
  DashboardButton,
  DashboardWrapper,
} from '../DashboardSection/DashboardLayout';
import InputField from '../DashboardSection/InputField';
import NewImageField from '../DashboardSection/NewImageField';
import NewToggleField from '../DashboardSection/NewToggleField';
import AddMoreBtn from '../FooterInformation/components/AddMoreBtn';

export const LangString: any = (label: string) =>
  yup.object({
    en: yup.string().required(`Please fill ${label} with en languages`),
    spa: yup.string().required(`Please fill ${label} with spa languages`),
  });

const LinkObjSchema = yup.object({
  text: LangString('Section Heading'),
  links: yup.array(
    yup.object({
      text: LangString('Link title'),
      link: yup.string(),
      isHidden: yup.boolean(),
    })
  ),
});

const footerSectionSchema = yup.object({
  id: yup.string(),
  type: yup.string(),
  menu: yup.boolean(),
  hidden: yup.boolean(),
  customize: yup.object({
    topBgColor: yup.string(),
    bottomBgColor: yup.string(),
  }),
  informationLinks: LinkObjSchema,
  resourcesLinks: LinkObjSchema,
  title: LangString('Title'),
  address: LangString('Address'),
  label: LangString('Label'),
});

type FSFprops = {
  data: FooterSectionType;
};

function FooterSectionForm({ data }: FSFprops) {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const [isLoading, setIsLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: data,
    resolver: yupResolver(footerSectionSchema),
  });

  useEffect(() => {
    reset(getValues());
  }, [lang]);

  const { refetchRootData } = useAdminData();

  const onSubmit = async (d: any) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      setFileLoading(true);
      const newObj = await createObjectUrlMap(d);
      setFileLoading(false);

      await api.put('/v2/data', newObj);
      await refetchRootData();
      setIsLoading(false);
      customSuccessToast('Section updated successfully');
    } catch (err: any) {
      customErrorToast(
        err?.response ? err.response.data?.message : err.message
      );
      setIsLoading(false);
    }
  };

  const [openTab, setOpenTab] = useState(1);

  const { fields: socialLinks } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const {
    fields: resourcesLinks,
    append: appendResourceLink,
    remove: removeResourceLink,
  } = useFieldArray({
    control,
    name: 'resourcesLinks.links',
  });
  const {
    fields: informationLinks,
    append: appendInformationLink,
    remove: removeInfoLink,
  } = useFieldArray({
    control,
    name: 'informationLinks.links',
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-x-hidden">
      <DashboardLayout
        rightSection={
          <div className="flex flex-col  md:flex-row xl:flex-col gap-[30px]">
            <ToggleWrapper label="Settings">
              <div className="flex flex-col gap-[24px]">
                <NewToggleField label="Hide Section" {...register('hidden')} />
                <NewToggleField
                  label="Add to Menu"
                  {...register('menu')}
                  disabled
                />
                {/* <div className="flex items-center justify-between">
                  <div className="font-semibold text-[16px] leading-[22px] text-[#444444] ">
                    Top BG Color
                  </div>
                  <ColorField name="customize.topBgColor" control={control} />
                </div>{' '}
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[16px] leading-[22px] text-[#444444] ">
                    Bottom BG Color
                  </div>
                  <ColorField name="customize.bottomBgColor" control={control} />
                </div> */}
                <div>
                  <h3 className="font-semibold text-[16px] leading-[22px] text-[#444444] mb-[14px]">
                    Select Language
                  </h3>
                  <AdminLanguageDropdown lang={lang} setLang={setLang} />
                </div>
              </div>
            </ToggleWrapper>
          </div>
        }
      >
        <DashboardWrapper isHidden={watch('hidden')}>
          <div className="relative">
            <InputField
              errors={errors}
              {...register(`title.${lang}`)}
              label="Section Name"
              placeholder="Enter section Name"
              // value={watch(`title.${lang}`)}
              readOnly
              className="opacity-50"
            />
            <div className="group">
              <Image
                width={18}
                height={18}
                className="absolute right-4 bottom-[18.5px] cursor-pointer"
                src="/info-circle.svg"
                alt=""
              />

              <div
                className={`w-[280px] z-[1] after:content-[''] after:absolute after:top-[100%] after:left-[37%] tooltiptext after:ml-[155px] xl:after:ml-[76px] right-[10px] xl:right-[-70px] px-[16px] py-[12px] rounded-[10px] top-[6px] md:top-[7px] invisible group-hover:visible text-white text-[14px] absolute font-medium leading-[150%] text-center   bg-[#7A49AA]`}
              >
                {"You can't change name of this section"}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FooterSectionWrapper
              wrap={openTab === 1}
              onWrapClick={() => {
                setOpenTab(openTab != 1 ? 1 : NaN);
              }}
              title="Information Links"
            >
              <div className="pt-5"></div>
              <FooterInputField
                errors={errors}
                label="Section Heading"
                {...register(`informationLinks.text.${lang}`)}
                placeholder="Enter section Name"

                // value={watch(`title.${lang}`)}
              />
              {informationLinks.map((field, i) => (
                <div
                  key={field.id}
                  className="pl-[27px] pt-5 flex justify-between"
                >
                  <div className="w-[calc(100%-40px)] flex gap-[15px]">
                    <div className="w-1/2">
                      <FooterInputField
                        errors={errors}
                        {...register(
                          `informationLinks.links.${i}.text.${lang}`
                        )}
                        placeholder="Enter section Name"
                        className="!h-[44px] !mt-0"
                        // value={watch(`title.${lang}`)}
                      />
                    </div>
                    <div className="w-1/2">
                      <FooterInputField
                        errors={errors}
                        {...register(`informationLinks.links.${i}.link`)}
                        placeholder="Enter section Name"
                        className="!h-[44px] !mt-0"
                        // value={watch(`title.${lang}`)}
                      />
                    </div>
                  </div>
                  {watch(`informationLinks.links.${i}.text.en`) == '' &&
                  watch(`informationLinks.links.${i}.text.spa`) == '' ? (
                    <div className="mt-[10px]">
                      <svg
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        viewBox="0 0 18 17"
                        onClick={() => {
                          removeInfoLink(i);
                        }}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.75708 12.7422L13.2424 4.25691"
                          stroke="#444444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.2424 12.7431L4.75708 4.25781"
                          stroke="#444444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <FooterHiddenToggle
                      name={`informationLinks.links.${i}.isHidden`}
                      control={control}
                    />
                  )}
                </div>
              ))}
              <div className="pl-[27px] pt-5">
                <AddMoreBtn
                  addMoreField={false}
                  onClick={() => {
                    appendInformationLink({
                      link: '/',
                      isHidden: false,
                      text: { en: '', spa: '' },
                    });
                  }}
                />
              </div>
            </FooterSectionWrapper>
            <FooterSectionWrapper
              wrap={openTab === 2}
              onWrapClick={() => {
                setOpenTab(openTab != 2 ? 2 : NaN);
              }}
              title="Resources Links"
            >
              <div className="pt-5"></div>
              <FooterInputField
                errors={errors}
                label="Section Heading"
                {...register(`resourcesLinks.text.${lang}`)}
                placeholder="Enter section Name"

                // value={watch(`title.${lang}`)}
              />
              {resourcesLinks.map((field, i) => (
                <div
                  key={field.id}
                  className="pl-[27px] pt-5 flex  justify-between"
                >
                  <div className="w-[calc(100%-40px)] flex gap-[15px]">
                    <div className="w-1/2">
                      <FooterInputField
                        errors={errors}
                        {...register(`resourcesLinks.links.${i}.text.${lang}`)}
                        placeholder="Enter section Name"
                        className="!h-[44px] !mt-0"
                        // value={watch(`title.${lang}`)}
                      />
                    </div>
                    <div className="w-1/2">
                      <FooterInputField
                        errors={errors}
                        {...register(`resourcesLinks.links.${i}.link`)}
                        placeholder="Enter section Name"
                        className="!h-[44px] !mt-0"
                        // value={watch(`title.${lang}`)}
                      />
                    </div>
                  </div>
                  {watch(`resourcesLinks.links.${i}.text.en`) == '' &&
                  watch(`resourcesLinks.links.${i}.text.spa`) == '' ? (
                    <div className="mt-[10px]">
                      <svg
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        viewBox="0 0 18 17"
                        onClick={() => {
                          removeResourceLink(i);
                        }}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.75708 12.7422L13.2424 4.25691"
                          stroke="#444444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.2424 12.7431L4.75708 4.25781"
                          stroke="#444444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <FooterHiddenToggle
                      name={`resourcesLinks.links.${i}.isHidden`}
                      control={control}
                    />
                  )}
                </div>
              ))}
              <div className="pl-[27px] pt-5">
                <AddMoreBtn
                  addMoreField={false}
                  onClick={() => {
                    appendResourceLink({
                      link: '/',
                      isHidden: false,
                      text: { en: '', spa: '' },
                    });
                  }}
                />
              </div>
            </FooterSectionWrapper>
            {/* DONE */}
            <FooterSectionWrapper
              wrap={openTab === 3}
              onWrapClick={() => {
                setOpenTab(openTab != 3 ? 3 : NaN);
              }}
              title="Social Links"
            >
              {socialLinks.map((field, i) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between pt-5"
                >
                  <FooterSocialIcon
                    name={`socialLinks.${i}.name`}
                    control={control}
                  />
                  <div className="w-[calc(100%-89px)]">
                    <FooterInputField
                      errors={errors}
                      {...register(`socialLinks.${i}.link`)}
                      placeholder="Enter section Name"
                      className="!h-[44px] !mt-0"
                      // value={watch(`title.${lang}`)}
                    />
                  </div>

                  <FooterHiddenToggle
                    name={`socialLinks.${i}.isHidden`}
                    control={control}
                  />
                </div>
              ))}
            </FooterSectionWrapper>
          </div>
          <div>
            <InputField
              label="Address"
              placeholder="write address"
              {...register(`address.${lang}`)}
              errors={errors}
            />
          </div>
          {/* <div>
            <InputField
              label="Label"
              placeholder="write label"
              {...register(`label.${lang}`)}
              errors={errors}
            />
          </div> */}
          <div>
            <h2 className="text-[18px] leading-[140%] mb-[16px] font-semibold text-secondary-text">
              Your Images
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[20px] md:gap-[40px] 2xl:gap-x-[55.89px] 2xl:gap-y-[20px] justify-center">
              <div className="w-full group pt-[12px] pb-[27px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative">
                <NewImageField
                  control={control}
                  fileName={`images.logo.src`}
                  hideName={`images.logo.hidden`}
                />
              </div>
              <div className="w-full group pt-[12px] pb-[27px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative">
                <NewImageField
                  control={control}
                  fileName={`images.copyRightImg.src`}
                  hideName={`images.copyRightImg.hidden`}
                />
              </div>
            </div>
          </div>
          <div>
            <InputField
              label="Copyright Text"
              placeholder="write copyRight text"
              {...register(`copyRight.${lang}`)}
              errors={errors}
            />
          </div>
        </DashboardWrapper>
        {fileLoading && (
          <div className="flex justify-end gap-2 mt-4">
            <div>
              <LoadingIcon />
            </div>
            <div>Uploading file, please wait...</div>
          </div>
        )}
        <DashboardButton
          isLoading={isLoading}
          resetOnClick={() => {
            reset(data);
          }}
          className="py-[30px]"
        />
      </DashboardLayout>
    </form>
  );
}

export default FooterSectionForm;
