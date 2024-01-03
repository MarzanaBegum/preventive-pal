import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import LoadingIcon from '@/utils/LoadingIcon';
import { CustomTextImgType } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ImageAlignField from '../AdminDashboard/ColoradoSliderForm/ImageAlignField';
import NewSectionFileField from '../AdminDashboard/NewSectionComponent/NewSectionFileField';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import ColorField from '../DashboardSection/ColorField';
import DashboardLayout, {
  DashboardButton,
  DashboardWrapper,
} from '../DashboardSection/DashboardLayout';
import InputField from '../DashboardSection/InputField';
import NewScrollBtnField from '../DashboardSection/NewScrollBtnField';
import NewToggleField from '../DashboardSection/NewToggleField';
import ToggleWrapper from '../ToggleWrapper';
import { EmbeddedModal } from './AddNewSectionForm';
import { DescriptionSchema } from './HeroCustomForm';

export const LangString: any = (label: string) =>
  yup.object({
    en: yup.string().required(`${label} is required`),
    spa: yup.string().required(`${label} is required`),
  });

export const customTextImgSection = yup.object({
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
    imgPosition: yup.string(),
  }),
  title: LangString('Title'),
  subheader: LangString('Subheader'),
  header: LangString('Heading'),
  description: yup.object({
    en: DescriptionSchema,
    spa: DescriptionSchema,
  }),
  scrollButton: LangString('Scroll button'),
  img: yup.mixed(),
});

const TextField = dynamic(() => import('../DashboardSection/TextField'), {
  ssr: false,
});

type CTFProps = { defaultData: CustomTextImgType };

function CustomTextImgForm({ defaultData }: CTFProps) {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(customTextImgSection),
    defaultValues: defaultData,
  });

  const { refetchRootData } = useAdminData();

  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (d: any) => {
    if (loading) return;
    try {
      setLoading(true);
      let data = d;
      data.img =
        typeof data.img === 'string' ? data.img : await uploadFile(data.img);
      await api.put('/v2/data', data);
      await refetchRootData();
      customSuccessToast('Section updated successfully');
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      const errMessage = err.response
        ? err.response.data?.message
        : err.message;
      customErrorToast(errMessage);
    }
  };

  useEffect(() => {
    reset(getValues());
  }, [lang]);

  const uploadFile = async (f: File) => {
    setFileLoading(true);
    const formData = new FormData();
    formData.append('file', f);
    const { data } = await api.post('/v2/data/upload', formData);
    setFileLoading(false);
    return data.fileUrl;
  };
  const [embeddedModal, setEmbeddedModal] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DashboardLayout
          rightSection={
            <div className="flex flex-col  md:flex-row xl:flex-col gap-[30px]">
              <ToggleWrapper label="Settings">
                <div className="flex flex-col gap-[24px]">
                  <NewToggleField
                    label="Hide Section"
                    {...register('hidden')}
                  />
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
                  <ColorField
                    name="customize.subheaderColor"
                    control={control}
                  />
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
            <div className="flex mt-2 flex-col md:flex-row gap-[20px] w-full">
              <div className="w-full md:w-1/2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                    Image or Video
                  </p>
                  <EmbeddedModal
                    onSubmit={(d: any) => {
                      setValue('img', d);
                    }}
                    value={watch('img')}
                  >
                    <div className=" gap-1 cursor-pointer  flex items-center ">
                      <Image
                        src={'/code.svg'}
                        width={16}
                        height={16}
                        alt="icon"
                      />
                      <div className="text-primary font-medium">Embed</div>
                    </div>
                  </EmbeddedModal>
                </div>
                <div className="pt-4"></div>
                <div>
                  <NewSectionFileField
                    errors={errors}
                    control={control}
                    name="img"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                  Alignment
                </p>
                <div className="pt-4"></div>
                <ImageAlignField
                  control={control}
                  name="customize.imgPosition"
                />
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
            isLoading={loading}
            resetOnClick={() => {
              reset();
            }}
            className="py-[30px]"
          />
        </DashboardLayout>
      </form>
    </>
  );
}

export default CustomTextImgForm;
