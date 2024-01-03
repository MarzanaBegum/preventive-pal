import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import LoadingIcon from '@/utils/LoadingIcon';
import { HeroType } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import ColorField from '../DashboardSection/ColorField';
import DashboardLayout, {
  DashboardButton,
  DashboardWrapper,
} from '../DashboardSection/DashboardLayout';
import FileUploadField from '../DashboardSection/FileUploadField';
import InputField from '../DashboardSection/InputField';
import NewImageField from '../DashboardSection/NewImageField';
import NewScrollBtnField from '../DashboardSection/NewScrollBtnField';
import NewToggleField from '../DashboardSection/NewToggleField';
import ToggleWrapper from '../ToggleWrapper';

const TextField = dynamic(() => import('../DashboardSection/TextField'), {
  ssr: false,
});

export const DescriptionSchema = yup
  .string()
  .required('Description is required')
  .test('isInvalidDescription', 'Description is required', (value) => {
    const strippedValue = value.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
    return strippedValue.trim() !== '';
  });
// .test(
//   'isWithinLimit',
//   'Description exceeds the maximum character limit',
//   (value) => {
//     const strippedValue = value.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
//     return strippedValue.length <= 600;
//   }
// );

const HeroImgSchema = yup.object({
  hidden: yup.boolean(),
  src: yup.mixed(),
});

const HeroFormSchema = yup.object({
  id: yup.string(),
  type: yup.string(),
  menu: yup.boolean(),
  logo: yup.mixed(),
  hidden: yup.boolean(),
  title: yup.object({
    en: yup.string().required('Section Name is required'),
    spa: yup.string().required('Section Name is required'),
  }),

  scrollButton: yup.object({
    en: yup.string().required('Scroll Button text is required'),
    spa: yup.string().required('Scroll Button Text is required'),
  }),

  description: yup.object({
    en: DescriptionSchema,
    spa: DescriptionSchema,
  }),
  customize: yup.object({
    descColor: yup.string().required(),
    scrollBtnColor: yup.string().required(),
  }),
  imgs: yup.object({
    img1: HeroImgSchema,
    img2: HeroImgSchema,
    img3: HeroImgSchema,
    img4: HeroImgSchema,
    img5: HeroImgSchema,
    img6: HeroImgSchema,
  }),
});

type PropsType = { defaultData: HeroType };

function HeroSecForm({ defaultData }: PropsType) {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const [isLoading, setIsLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const { refetchRootData } = useAdminData();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<any>({
    defaultValues: defaultData,
    resolver: yupResolver(HeroFormSchema),
  });

  useEffect(() => {
    reset(defaultData);
  }, [defaultData, lang, reset]);

  async function createObjectUrlMap(obj: any) {
    let object: any = obj || {};
    for (let [key, value] of Object.entries(object)) {
      if (typeof value === 'object') {
        object[key] = await createObjectUrlMap(value);
      }

      if (value instanceof File) {
        const fileObj: File = value;
        object[key] = await uploadFile(fileObj);
      }
    }
    return object;
  }

  const uploadFile = async (f: File) => {
    const formData = new FormData();
    formData.append('file', f);
    const { data } = await api.post('/data/upload', formData);
    return data.fileUrl;
  };

  const onSubmit = async (d: any) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setFileLoading(true);
      const value = await createObjectUrlMap(d);
      setFileLoading(false);
      await api.put('/v2/data', value);
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

                <div>
                  <h3 className="font-semibold text-[16px] leading-[22px] text-[#444444] mb-[14px]">
                    Select Language
                  </h3>
                  <AdminLanguageDropdown lang={lang} setLang={setLang} />
                </div>
              </div>
            </ToggleWrapper>
            <ToggleWrapper label="Logo">
              <FileUploadField name="logo" control={control} />
            </ToggleWrapper>
          </div>
        }
      >
        <DashboardWrapper isHidden={watch('hidden')}>
          <div className="flex gap-4">
            <div className="w-full">
              <InputField
                errors={errors}
                {...register(`title.${lang}`)}
                label="Section Name"
                placeholder="Enter section title"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <TextField
                label="Description"
                name={`description.${lang}`}
                control={control}
                errors={errors}
                labelComponent={
                  <ColorField name="customize.descColor" control={control} />
                }
              />
            </div>
          </div>

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
          <div>
            <h2 className="text-[18px] leading-[140%] mb-[16px] font-semibold text-secondary-text">
              Your GIFs
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[20px] md:gap-[40px] 2xl:gap-x-[55.89px] 2xl:gap-y-[20px] justify-center">
              {[...Array(7)].map((g, i) => (
                <div
                  key={`img_${i}`}
                  className="w-full group pt-[12px] pb-[27px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative"
                >
                  <NewImageField
                    control={control}
                    fileName={`imgs.img${i + 1}.src`}
                    hideName={`imgs.img${i + 1}.hidden`}
                    embed
                  />
                </div>
              ))}
            </div>
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
            reset();
          }}
          className="py-[30px]"
        />
      </DashboardLayout>
    </form>
  );
}

export default HeroSecForm;
