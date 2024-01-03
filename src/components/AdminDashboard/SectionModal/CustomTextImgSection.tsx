import api from '@/api';
import ColorField from '@/components/DashboardSection/ColorField';
import FileField from '@/components/DashboardSection/FileField';
import InputField from '@/components/DashboardSection/InputField';
import NewToggleField from '@/components/DashboardSection/NewToggleField';
import SelectField from '@/components/DashboardSection/SelectField';
import TextField from '@/components/DashboardSection/TextField';
import RightSectionWrapper from '@/components/RightSectionWrapper';
import ToggleWrapper from '@/components/ToggleWrapper';
import { useAdminData } from '@/context/AdminData';
import CircleLoading from '@/utils/CircleLoading';
import LoadingIcon from '@/utils/LoadingIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

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

const customTextImgSection = Yup.object({
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
  img: Yup.mixed(),
  en: CommonValueSchema,
  spa: CommonValueSchema,
});

function CustomTextImgSection({ handleModal, selectState }: any) {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(customTextImgSection),
    defaultValues: {
      type: 'custom-text-img',
      customize: {
        headerColor: '#664897',
        subheaderColor: '#331f1a',
        descColor: '#505050',
        bgColor: '#E9FBD9',
        imgPosition: 'right',
      },
    },
  });
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { rootData, refetchRootData } = useAdminData();

  const onSubmit = async (d: any) => {
    if (loading) return;
    try {
      setLoading(true);
      let data = d;

      if (data.img) {
        data.img = await uploadFile(data.img);
      } else {
        data.type = 'custom-text';
      }

      await api.post('/v2/data/new', data);
      await refetchRootData();
      reset();
      selectState[1](rootData[0].id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
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

  console.log(errors);

  const options = [
    { label: 'Right', value: 'right' },
    { label: 'Left', value: 'left' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col-reverse lg:flex-row w-[100%] lg:w-[calc(100%-300px)]">
      <RightSectionWrapper data={selectState}>
        <div
          className="flex flex-col gap-[20px]"

        >

          <div className="flex w-full flex-col lg:flex-row gap-[20px]">
            <div className="w-full  lg:w-[calc(50%-10px)]">
              <FileField
                errors={errors}
                name="img"
                control={control}
                label="Image"
                accept="image/*"
                placeholder="write subheader in english"
              />
            </div>
            <div className="w-full lg:w-[calc(50%-10px)]">
              <SelectField
                name="customize.imgPosition"
                label="Image Position"
                placeholder="select img position"
                options={options}
                control={control}
              />
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold">Section Title</div>
            <div className="pt-2"></div>
            <div className="flex flex-col lg:flex-row w-full gap-[20px]">
              <InputField
                errors={errors}
                {...register(`en.title`)}
                label="Section Title in English"
                placeholder="Enter section title"
              />
              <InputField
                errors={errors}
                {...register(`spa.title`)}
                label="Section Title in Español"
                placeholder="Enter section title"
              />
            </div>
          </div>
          <div className="hidden">
            <InputField
              errors={errors}
              {...register('type')}
              label="Section Type"
              placeholder="Enter section Type"
              disabled
            />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold">Header</div>
              <ColorField name="customize.headerColor" control={control} />
            </div>
            <div className="pt-2"></div>
            <div className="flex flex-col lg:flex-row w-full gap-[20px]">
              <InputField
                errors={errors}
                {...register(`en.header`)}
                label="Header in English"
                placeholder="write header in english"
              />
              <InputField
                errors={errors}
                {...register(`spa.header`)}
                label="Header in Español"
                placeholder="write header in español"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold">SubHeader</div>
              <ColorField name="customize.subheaderColor" control={control} />
            </div>
            <div className="pt-2"></div>
            <div className="flex w-full flex-col lg:flex-row gap-[20px]">
              <InputField
                errors={errors}
                {...register(`en.subheader`)}
                label="SubHeader in English"
                placeholder="write subheader in english"
              />
              <InputField
                errors={errors}
                {...register(`spa.subheader`)}
                label="SubHeader in Español"
                placeholder="write subheader in español"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold">Description</div>
              <ColorField name="customize.descColor" control={control} />
            </div>
            <div className="pt-2"></div>
            <div className="flex w-full flex-col lg:flex-row gap-[20px]">
              <TextField
                errors={errors}
                label="Description in English"
                name={`en.description`}
                control={control}
              />
              <TextField
                errors={errors}
                label="Description in Español"
                name={`spa.description`}
                control={control}
              />
            </div>
          </div>
          {fileLoading && (
            <div className="flex justify-end gap-2">
              <div>
                <LoadingIcon />
              </div>
              <div>Uploading file, please wait...</div>
            </div>
          )}

          <div className="flex justify-end gap-[30px] pb-3">
            <button
              type="button"
              onClick={() => {
                selectState[1](rootData[0].id);
              }}
              className="h-[44px] px-5   text-primary hover:bg-[rgb(90,47,132,.1)] transition-all duration-200 border-primary border w-[150px] font-medium rounded text-[18px] "
            >
              Cancel
            </button>{' '}
            <button
              type="submit"
              className="h-[44px] justify-center  transition-all duration-200 hover:bg-[#41225f] bg-primary w-[150px] font-medium flex items-center gap-2 rounded text-[18px] text-white"
            >
              {loading ? (
                <>
                  <div>
                    <CircleLoading color="#fff" width={24} />
                  </div>
                  <div className="text-base capitalize">Loading...</div>
                </>
              ) : (
                'Add Section'
              )}
            </button>
          </div>
        </div>
      </RightSectionWrapper>

      <div className="flex flex-row lg:flex-col gap-[23px]">
        <ToggleWrapper label="Settings">
          <div className="flex flex-col gap-[24px]">
            <NewToggleField label="Hide Section" {...register('hidden')} />
            <NewToggleField label="Add to Menu" {...register('menu')} />
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[16px] leading-[22px] text-[#444444] mb-[14px]">
                Background Color
              </div>
              <ColorField name="customize.bgColor" control={control} />
            </div>
          </div>
        </ToggleWrapper>
        <ToggleWrapper label="Logo">
          {/* <FileUploadCard /> */}
        </ToggleWrapper>

      </div>
    </form>
  );
}

export default CustomTextImgSection;
