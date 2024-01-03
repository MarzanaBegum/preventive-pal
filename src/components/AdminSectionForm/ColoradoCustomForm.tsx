import { PrimaryColoradoType } from '@/utils/types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ColorField from '../DashboardSection/ColorField';
import InputField from '../DashboardSection/InputField';

import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import DashboardLayout, {
  DashboardButton,
  DashboardWrapper,
} from '../DashboardSection/DashboardLayout';
import NewScrollBtnField from '../DashboardSection/NewScrollBtnField';
import NewToggleField from '../DashboardSection/NewToggleField';
import ToggleWrapper from '../ToggleWrapper';
import { LangString } from './CustomTextForm';
import { DescriptionSchema } from './HeroCustomForm';

const TextField = dynamic(() => import('../DashboardSection/TextField'), {
  ssr: false,
});

type ColoradoFormProps = { defaultData: PrimaryColoradoType };

const coloradoFormSchema = yup.object({
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

function ColoradoCustomForm({ defaultData }: ColoradoFormProps) {
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultData,
    resolver: yupResolver(coloradoFormSchema),
  });

  useEffect(() => {
    reset(defaultData);
  }, [defaultData, lang]);

  const { refetchRootData } = useAdminData();

  const onSubmit = async (d: any) => {
    if (loading) return;
    setLoading(true);
    try {
      await api.put('/v2/data', d);
      await refetchRootData();
      setLoading(false);
      customSuccessToast('Section updated successfully');
    } catch (err: any) {
      setLoading(false);
      customErrorToast(
        err?.response ? err.response.data?.message : err.message
      );
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
          isLoading={loading}
          resetOnClick={() => {
            reset();
          }}
          className="py-[30px]"
        />
      </DashboardLayout>
    </form>
  );
}

export default ColoradoCustomForm;

interface ErrorProps {
  errors: any;
  lang: string;
  name: string;
}
export const InputRequiredFieldErro = ({ errors, lang, name }: ErrorProps) => {
  errors[lang]?.subheader && (
    <p className="text-[red] text-[14px]">
      {errors[lang]?.name?.message?.toString()}
    </p>
  );
};
