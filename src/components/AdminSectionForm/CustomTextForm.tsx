import { PrimaryPreventionType } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import ToggleWrapper from '../ToggleWrapper';

import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import ColorField from '../DashboardSection/ColorField';
import DashboardLayout, {
  DashboardButton,
  DashboardWrapper,
} from '../DashboardSection/DashboardLayout';
import InputField from '../DashboardSection/InputField';
import NewScrollBtnField from '../DashboardSection/NewScrollBtnField';
import NewToggleField from '../DashboardSection/NewToggleField';

const TextField = dynamic(() => import('../DashboardSection/TextField'), {
  ssr: false,
});

export const LangString: any = (label: string) =>
  yup.object({
    en: yup.string().required(`${label} is required`),
    spa: yup.string().required(`${label} is required`),
  });

const DescriptionSchema = yup
  .string()
  .required('Description is required')
  .test('isInvalidDescription', 'Description is required', (value) => {
    const strippedValue = value.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
    return strippedValue.trim() !== '';
  });

const customTextSection = yup.object({
  id: yup.string(),
  type: yup.string(),
  menu: yup.boolean(),
  hidden: yup.boolean(),
  customize: yup.object({
    headerColor: yup.string(),
    subheaderColor: yup.string(),
    descColor: yup.string(),
    bgColor: yup.string(),
    scrollBtnColor: yup.string(),
  }),
  title: LangString('Title'),
  subheader: LangString('Subheader'),
  header: LangString('Heading'),
  description: yup.object({
    en: DescriptionSchema,
    spa: DescriptionSchema,
  }),
  scrollButton: LangString('Scroll button'),
});

type CTFProps = { defaultData: PrimaryPreventionType };

function CustomTextForm({ defaultData }: CTFProps) {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    reset,

    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultData,
    resolver: yupResolver(customTextSection),
  });

  useEffect(() => {
    reset(defaultData);
  }, [defaultData, lang, reset]);

  const { refetchRootData } = useAdminData();
  const showError = errors as any;

  const onSubmit = async (d: any) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.put('/v2/data', d);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DashboardLayout
        rightSection={
          <div className="flex flex-col  md:flex-row xl:flex-col gap-[30px]">
            <ToggleWrapper label="Settings">
              <div className="flex flex-col gap-[24px]">
                <NewToggleField label="Hide Section" {...register('hidden')} />
                <NewToggleField label="Add to Menu" {...register('menu')} />
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[16px] leading-[22px] text-[#444444] ">
                    Background Color
                  </div>
                  <ColorField name="customize.bgColor" control={control} />
                </div>
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
          <div>
            <InputField
              {...register(`title.${lang}`)}
              errors={errors}
              label="Section Name"
              placeholder="Enter section name"
            />
          </div>
          <div>
            <InputField
              label="Sub Heading"
              placeholder="write sub heading"
              labelComponent={
                <ColorField name="customize.subheaderColor" control={control} />
              }
              {...register(`subheader.${lang}`)}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              label="Heading"
              placeholder="write heading"
              labelComponent={
                <ColorField name="customize.headerColor" control={control} />
              }
              {...register(`header.${lang}`)}
              errors={errors}
            />
          </div>

          <div>
            <TextField
              label="Description"
              name={`description.${lang}`}
              isScrollEnabled={true}
              control={control}
              labelComponent={
                <ColorField name="customize.descColor" control={control} />
              }
              errors={errors}
            />
          </div>
          <div>
            <NewScrollBtnField
              label="Scroll Button"
              name={`scrollButton.${lang}`}
              control={control}
              errors={errors}
              labelComponent={
                <ColorField
                  name={'customize.scrollBtnColor' as any}
                  control={control}
                />
              }
            />
          </div>
        </DashboardWrapper>
        <DashboardButton
          isLoading={isLoading}
          resetOnClick={() => {
            reset();
          }}
          className="py-[30px]"
        />
      </DashboardLayout>
    </form>
  );
}

export default CustomTextForm;
