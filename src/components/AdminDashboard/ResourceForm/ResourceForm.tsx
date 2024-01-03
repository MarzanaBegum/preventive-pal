/* eslint-disable @next/next/no-img-element */
import api from '@/api';
import Trash from '@/assets/icons/Trash';
import AdminLanguageDropdown from '@/components/DashboardSection/AdminLanguageDropdown';
import ColorField from '@/components/DashboardSection/ColorField';
import DashboardLayout, {
  DashboardWrapper,
} from '@/components/DashboardSection/DashboardLayout';
import InputField from '@/components/DashboardSection/InputField';
import { ShowHiddenField } from '@/components/DashboardSection/LayoutSystem/MenuWrapper';
import NewToggleField from '@/components/DashboardSection/NewToggleField';
import ResourceInputField from '@/components/DashboardSection/ResourceInputField';
import TextField from '@/components/DashboardSection/TextField';
import AddCircleIcon from '@/components/Icons/AddCircleIcon';
import ToggleWrapper from '@/components/ToggleWrapper';
import { useAdminData } from '@/context/AdminData';
import CircleLoading from '@/utils/CircleLoading';
import LoadingIcon from '@/utils/LoadingIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import SliderDeleteModal from '../ColoradoSliderForm/SliderDeleteModal';
import ResourceImageUpload from './ResourceImgaeUpload';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';

type UploadArrType = {
  name: string;
  fileUrl: string;
};

const resourceSection = Yup.object({
  type: Yup.string().required(),
  menu: Yup.boolean(),
  hidden: Yup.boolean(),
  logo: Yup.mixed(),
  customize: Yup.object({
    bgColor: Yup.string().required(),
    headerColor: Yup.string().required(),
    descColor: Yup.string().required(),
    disclaimerColor: Yup.string().required(),
  }),
  title: Yup.object({
    en: Yup.string().required(
      'Title is required with both language, change language from right'
    ),
    spa: Yup.string().required(
      'Title is required with both language, change language from right'
    ),
  }),
  header: Yup.object({
    en: Yup.string().required(
      'Header is required with both language, change language from right'
    ),
    spa: Yup.string().required(
      'Header is required with both language, change language from right'
    ),
  }),
  description: Yup.object({
    en: Yup.string().required(
      'Description is required with both language, change language from right'
    ),
    spa: Yup.string().required(
      'Description is required with both language, change language from right'
    ),
  }),
  disclaimer: Yup.object({
    en: Yup.string().required(
      'Disclaimer is required with both language, change language from right'
    ),
    spa: Yup.string().required(
      'Disclaimer is required with both language, change language from right'
    ),
  }),
  resourcesData: Yup.array().of(
    Yup.object().shape({
      title: Yup.object({
        en: Yup.string().required(
          'Label is required with both language, change language from right'
        ),
        spa: Yup.string().required(
          'Label is required with both language, change language from right'
        ),
      }),
      hidden: Yup.boolean(),
      img: Yup.mixed()
        .required('Image is required')
        .test('', 'Image is required', (v) => {
          return v !== '';
        }),
      link: Yup.string().required('Link is required'),
      bgColor: Yup.string().required('Background color is required'),
    })
  ),
});

const ResourceForm = ({ data }: any) => {
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<'en' | 'spa'>('en');
  const [deleteResource, setDeleteResource] = useState(NaN);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resourceSection),
    defaultValues: data,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `resourcesData`,
  });

  useEffect(() => {
    reset(getValues());
  }, [lang]);

  async function createObjectUrlMap(obj: any, uploadedArr?: UploadArrType[]) {
    let object: any = obj || {};
    uploadedArr = uploadedArr || [];
    for (let [key, value] of Object.entries(object)) {
      if (typeof value === 'object') {
        object[key] = await createObjectUrlMap(value, uploadedArr);
      }

      if (value instanceof File) {
        console.log('_________checkarr', uploadedArr);

        const fileObj: File = value;
        const checkFile = uploadedArr.find((v) => v.name === fileObj.name);
        if (checkFile) {
          object[key] = checkFile.fileUrl;
        } else {
          const fileUrl = await uploadFile(fileObj);
          uploadedArr.push({ name: fileObj.name, fileUrl });
          object[key] = fileUrl;
        }
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

  const { refetchRootData } = useAdminData();

  const onSubmit = async (value: any) => {
    if (loading) return;
    try {
      setLoading(true);
      setFileLoading(true);
      await createObjectUrlMap(value);
      setFileLoading(false);
      await api.put('v2/data', value);
      await refetchRootData();
      setLoading(false);
      customSuccessToast('Section updated successfully ');
    } catch (err: any) {
      setLoading(false);
      const errMessage = err.response
        ? err.response.data?.message
        : err.response;
      customErrorToast(errMessage);
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
          <div className="flex flex-col gap-[20px]">
            <ResourceInputField
              {...register(`title.${lang}`)}
              label="Section Name"
              placeholder="Type here..."
              errors={errors}
            />
            <ResourceInputField
              errors={errors}
              {...register(`header.${lang}`)}
              label="Heading"
              placeholder="Type here..."
              labelComponent={
                <ColorField name="customize.headerColor" control={control} />
              }
            />
            <TextField
              errors={errors}
              label="Description"
              name={`description.${lang}`}
              control={control}
              labelComponent={
                <ColorField name="customize.descColor" control={control} />
              }
            />
            <ResourceInputField
              errors={errors}
              {...register(`disclaimer.${lang}`)}
              label="Disclaimer"
              placeholder="Type here..."
              labelComponent={
                <ColorField
                  name="customize.disclaimerColor"
                  control={control}
                />
              }
            />
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                  Icon and Title
                </p>
                <ColorField name="customize.labelColor" control={control} />
              </div>

              {fields.map((item: any, index) => (
                <div key={item.id}>
                  <div className="bg-white border border-[#E5DDED] p-[20px] rounded-[12px]">
                    <div className="flex items-center justify-end gap-[10px]">
                      <p className="text-[16px] leading-[160%] text-[#444444]">
                        Background Color
                      </p>
                      <ColorField
                        name={`resourcesData.${index}.bgColor` as any}
                        control={control}
                        // errors={errors}
                      />
                    </div>

                    <div
                      className={cx(
                        'flex flex-col md:flex-row gap-[20px] md:gap-[30px] items-center mt-5 md:mt-0',
                        watch(`resourcesData.${index}.hidden`) &&
                          'opacity-50 [&>*]:pointer-events-none'
                      )}
                    >
                      <ResourceImageUpload
                        control={control}
                        name={`resourcesData.${index}.img`}
                        watch={watch}
                        index={index}
                        errors={errors}
                      />
                      <div className="flex flex-col w-full md:w-[445px] gap-5">
                        <ResourceInputField
                          errors={errors}
                          {...register(`resourcesData.${index}.title.${lang}`)}
                          label="Label Name"
                          placeholder="Type here..."
                          className="!p-[10px] h-[39px]"
                        />
                        <InputField
                          errors={errors}
                          {...register(`resourcesData.${index}.link`)}
                          label="Link"
                          placeholder="Enter link"
                          className="w-full !p-[10px] h-[39px]"
                        />
                      </div>
                    </div>

                    <div className="mt-[16px] pt-[16px] border-t border-[#E5DDED] flex items-center justify-between">
                      <div className="flex gap-[10px] items-center cursor-pointer">
                        <ShowHiddenField
                          control={control}
                          name={`resourcesData.${index}.hidden`}
                        />
                      </div>

                      <div
                        onClick={() => {
                          setDeleteResource(deleteResource ? NaN : index);
                        }}
                        className="flex gap-[10px] items-center cursor-pointer"
                      >
                        <Trash />
                        <p className="text-[#EC4242] font-semibold text-[18px] leading-[22px]">
                          Delete
                        </p>
                        <SliderDeleteModal
                          header="Delete Resource ?"
                          description="Are you sure you want to Delete this Resource? This cannot be undone."
                          handleOnClick={() => {
                            remove(deleteResource);
                            setDeleteResource(NaN);
                          }}
                          open={isNaN(deleteResource) ? false : true}
                          setOpen={() => {
                            setDeleteResource(deleteResource ? NaN : index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => {
                append({
                  title: {
                    en: '',
                    spa: '',
                  },
                  img: '',
                  link: '',
                  bgColor: '',
                  hidden: false,
                });
              }}
              className="flex gap-[6px] items-center justify-center w-max mx-auto cursor-pointer mt-[10px] bg-white rounded-[10px] p-[16px_20px]"
            >
              <AddCircleIcon />{' '}
              <p className="font-semibold text-[20px] leading-[24px] text-primary">
                Add Resources
              </p>
            </div>
          </div>
        </DashboardWrapper>
        <div className="mt-[30px]">
          {fileLoading && (
            <div className="flex justify-end gap-2 mt-4">
              <div>
                <LoadingIcon />
              </div>
              <div>Uploading file, please wait...</div>
            </div>
          )}

          <div className="flex justify-end gap-[20px] pb-3">
            <button
              onClick={() => {
                reset();
              }}
              type="button"
              className="h-[44px] px-5 uppercase text-primary hover:bg-[rgb(90,47,132,.1)] transition-all duration-200 border-primary border w-[150px] font-medium rounded text-[18px] "
            >
              Reset
            </button>
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
      </DashboardLayout>
    </form>
  );
};

export default ResourceForm;
