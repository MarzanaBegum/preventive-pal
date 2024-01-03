import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import CircleLoading from '@/utils/CircleLoading';
import LoadingIcon from '@/utils/LoadingIcon';

import { CustomTextImgType } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import RightSectionWrapper from '../RightSectionWrapper';
import ToggleWrapper from '../ToggleWrapper';
import AdminLanguageDropdown from './AdminLanguageDropdown';
import ColorField from './ColorField';
import FileField from './FileField';
import InputField from './InputField';
import NewToggleField from './NewToggleField';
import ScrollBtnField from './ScrollBtnField';
import SelectField from './SelectField';

const CommonValueSchema = Yup.object({
  title: Yup.string().required(),
  subheader: Yup.string().required(),
  header: Yup.string().required(),
  description: Yup.string()
    .required()
    .test('isInvalidDescription', 'Enter description here', (value) => {
      const strippedValue = value.replace(/(<([^>]+)>)/gi, '');
      return strippedValue.trim() !== '';
    }),
});

export const customTextImgSection = Yup.object({
  id: Yup.string(),
  type: Yup.string().required(),
  menu: Yup.boolean(),
  hidden: Yup.boolean(),
  customize: Yup.object({
    headerColor: Yup.string(),
    subheaderColor: Yup.string(),
    descColor: Yup.string(),
    bgColor: Yup.string(),
    imgPosition: Yup.string(),
  }),
  img: Yup.mixed().required(),
  en: CommonValueSchema,
  spa: CommonValueSchema,
});

const TextField = dynamic(() => import('./TextField'), { ssr: false });
const options = [
  { label: 'Right', value: 'right' },
  { label: 'Left', value: 'left' },
];

type CTFProps = { defaultData: CustomTextImgType; lang: string };

function CustomTextImgForm({ defaultData }: CTFProps) {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(customTextImgSection),
    defaultValues: defaultData,
  });

  useEffect(() => {
    reset(defaultData);
  }, [defaultData, lang]);

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
      toast.success('Section updated successfully');
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      const errMessage = err.response
        ? err.response.data?.message
        : err.message;
      toast.error(errMessage);
    }
  };

  const uploadFile = async (f: File) => {
    setFileLoading(true);
    const formData = new FormData();
    formData.append('file', f);
    const { data } = await api.post('/v2/data/upload', formData);
    setFileLoading(false);
    return data.fileUrl;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col-reverse lg:flex-row w-[100%] lg:w-[calc(100%-300px)]"
    >
      <div className="flex flex-col gap-[20px]">
        <RightSectionWrapper data={defaultData}>
          <InputField
            errors={errors}
            {...register(`${lang}.title`)}
            label="Section Title"
            placeholder="Enter section title"
          />
          <div className="hidden">
            <InputField
              {...register('type')}
              label="Section Type"
              placeholder="Enter section Type"
              disabled
            />
          </div>

          <InputField
            label="Header"
            placeholder="write header"
            labelComponent={
              <ColorField name="customize.headerColor" control={control} />
            }
            {...register(`${lang}.header`)}
          />
          <InputField
            label="SubHeader"
            placeholder="write subheader"
            labelComponent={
              <ColorField name="customize.subheaderColor" control={control} />
            }
            {...register(`${lang}.subheader`)}
          />
          <div className="flex w-full flex-col lg:flex-row gap-[20px]">
            <div className="w-[calc(50%-10px)]">
              <FileField
                errors={errors}
                name="img"
                control={control}
                label="Change Image"
                accept="image/*"
                placeholder="write subheader in english"
              />
            </div>
            <div className="w-[calc(50%-10px)]">
              <SelectField
                name="customize.imgPosition"
                label="Image Position"
                placeholder="select img position"
                options={options}
                control={control}
              />
            </div>
          </div>
          <TextField
            label="Description"
            name={`${lang}.description`}
            control={control}
            labelComponent={
              <ColorField name="customize.descColor" control={control} />
            }
          />

          <ScrollBtnField
            labelComponent={
              <ColorField name="customize.descColor" control={control} />
            }
          />

          {fileLoading && (
            <div className="flex justify-end gap-2">
              <div>
                <LoadingIcon />
              </div>
              <div>Uploading file, please wait...</div>
            </div>
          )}
        </RightSectionWrapper>
        <div className="flex justify-end gap-[30px] pb-3 mt-[10px]">
          <button
            onClick={() => {
              reset();
            }}
            type="button"
            className="h-[44px] px-5  uppercase text-primary hover:bg-[rgb(90,47,132,.1)] transition-all duration-200 border-primary border w-[150px] font-medium rounded text-[18px] "
          >
            Reset
          </button>{' '}
          <button
            type="submit"
            className="h-[44px] justify-center uppercase transition-all duration-200 hover:bg-[#41225f] bg-primary w-[150px] font-medium flex items-center gap-2 rounded text-[18px] text-white"
          >
            {loading ? (
              <>
                <div>
                  <CircleLoading color="#fff" width={24} />
                </div>
                <div className="text-base uppercase">Loading...</div>
              </>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col gap-[23px]">
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
              {/* <LanguageToggle label="Change Language" onChange={(e) => setLang(e.target.checked === true ? "spa" : "en")} /> */}
              <AdminLanguageDropdown lang={lang} setLang={setLang} />
            </div>
          </div>
        </ToggleWrapper>
        <ToggleWrapper label="Logo">{/* <FileUploadCard /> */}</ToggleWrapper>
      </div>
    </form>
  );
}

export default CustomTextImgForm;
