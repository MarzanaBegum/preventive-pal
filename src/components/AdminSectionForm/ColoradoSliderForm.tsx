import api from '@/api';
import AddIcon from '@/assets/icons/AddIcon';
import Trash from '@/assets/icons/Trash';
import AdminLanguageDropdown from '@/components/DashboardSection/AdminLanguageDropdown';
import ColorField from '@/components/DashboardSection/ColorField';
import DashboardLayout, {
  DashboardButton,
} from '@/components/DashboardSection/DashboardLayout';
import InputField from '@/components/DashboardSection/InputField';
import NewToggleField from '@/components/DashboardSection/NewToggleField';
import ToggleWrapper from '@/components/ToggleWrapper';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import LoadingIcon from '@/utils/LoadingIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import ImageAlignField from '../AdminDashboard/ColoradoSliderForm/ImageAlignField';
import SliderDeleteModal from '../AdminDashboard/ColoradoSliderForm/SliderDeleteModal';
import EmbedFilePopup from '../AdminDashboard/NewSectionComponent/EmbedFilePopup';
import SliderInputField from '../DashboardSection/LayoutSystem/SliderInputField';
import SliderTextField from '../DashboardSection/LayoutSystem/SliderTextField';
import SliderWrapper, {
  SliderHiddenField,
} from '../DashboardSection/LayoutSystem/SliderWrapper';

const coloradoSliderSection = Yup.object({
  type: Yup.string().required(),
  menu: Yup.boolean(),
  hidden: Yup.boolean(),
  logo: Yup.mixed(),
  customize: Yup.object({
    bgColor: Yup.string().required(),
    scrollBtnColor: Yup.string().required(),
    visualPrimary: Yup.string().required(),
    visualSecondary: Yup.string().required(),
  }),
  scrollButton: Yup.object({
    en: Yup.string().required(
      'Scroll btn text required with both language, change language from right'
    ),
    spa: Yup.string().required(
      'Scroll btn text required with both language, change language from right'
    ),
  }),
  title: Yup.object({
    en: Yup.string().required(
      'Sub header required with both language, change language from right'
    ),
    spa: Yup.string().required(
      'Sub header required with both language, change language from right'
    ),
  }),
  sliderData: Yup.array().of(
    Yup.object().shape({
      customize: Yup.object({
        descColor: Yup.string().required(),
        headerColor: Yup.string().required(),
        imgPosition: Yup.string().required(),
        subheaderColor: Yup.string().required(),
        imgBackground: Yup.string(),
      }),
      header: Yup.object({
        en: Yup.string().required(
          'Header required with both language, change language from right'
        ),
        spa: Yup.string().required(
          'Header required with both language, change language from right'
        ),
      }),
      description: Yup.object({
        en: Yup.string()
          .required()
          .test(
            'isInvalidDescription',
            'Description required with both language, change language from right',
            (value) => {
              const strippedValue = value.replace(/(<([^>]+)>)/gi, '');
              return strippedValue.trim() !== '';
            }
          ),
        spa: Yup.string()
          .required()
          .test(
            'isInvalidDescription',
            'Description required with both language, change language from right',
            (value) => {
              const strippedValue = value.replace(/(<([^>]+)>)/gi, '');
              return strippedValue.trim() !== '';
            }
          ),
      }),
      hidden: Yup.boolean(),
      img: Yup.mixed()
        .required('Image is required')
        .test('', 'Image is required', (v) => {
          return v !== '';
        }),
      subheader: Yup.object({
        en: Yup.string().required(
          'Sub header required with both language, change language from right'
        ),
        spa: Yup.string().required(
          'Sub header required with both language, change language from right'
        ),
      }),
    })
  ),
});

type UploadArrType = {
  name: string;
  fileUrl: string;
};

const ColoradoSliderForm = ({ data }: any) => {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const { refetchRootData } = useAdminData();

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
    resolver: yupResolver(coloradoSliderSection),
    defaultValues: data,
  });

  const { fields, append, remove, update, prepend, replace } = useFieldArray({
    control,
    name: 'sliderData',
  });

  async function createObjectUrlMap(obj: any, uploadedArr?: UploadArrType[]) {
    let object: any = obj || {};

    uploadedArr = uploadedArr || [];

    for (let [key, value] of Object.entries(object)) {
      if (typeof value === 'object') {
        object[key] = await createObjectUrlMap(value, uploadedArr);
      }

      if (value instanceof File) {
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
      setLoading(false);
      setFileLoading(false);
    }
  };

  useEffect(() => {
    reset(getValues());
  }, [lang]);

  const [wrapSlider, setWrapSlider] = useState(0);

  const [deleteSlider, setDeleteSlider] = useState(NaN);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-x-hidden">
      <DashboardLayout
        rightSection={
          <div className="flex flex-col  md:flex-row xl:flex-col gap-[30px]">
            <ToggleWrapper label="Settings">
              <div className="flex flex-col gap-[22px]">
                <NewToggleField label="Hide Section" {...register('hidden')} />
                <NewToggleField
                  label="Add to Menu"
                  {...register('menu')}
                  disabled
                />
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[18px] leading-[140%] text-[#444444] ">
                    Background Color
                  </p>
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
            <ToggleWrapper label="Visual slider">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[18px] leading-[140%] text-[#444444] ">
                  Primary
                </p>
                <ColorField name="customize.visualPrimary" control={control} />
              </div>
              <div className="pt-3"></div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[18px] leading-[140%] text-[#444444] ">
                  Secondary
                </p>
                <ColorField
                  name="customize.visualSecondary"
                  control={control}
                />
              </div>
            </ToggleWrapper>
            {/* <ToggleWrapper label="Logo">
              <FileUploadField name="logo" control={control} />
            </ToggleWrapper> */}
          </div>
        }
      >
        <div className="relative xl:mt-[10px]">
          <InputField
            errors={errors}
            {...register(`title.${lang}`)}
            label="Section Name"
            placeholder="Enter section title"
            // value={watch(`title.${lang}`)}
            disabled
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
              className={`w-[280px] z-[1] after:content-[''] after:absolute after:top-[100%] after:left-[37%] tooltiptext after:ml-[155px] xl:after:ml-[76px] right-[10px] xl:right-[-70px] px-[16px] py-[12px] rounded-[10px] top-[-16px] xl:top-[-10px] invisible group-hover:visible text-white text-[14px] absolute font-medium leading-[150%] text-center   bg-[#7A49AA]`}
            >
              {
                'This is a child element. You cannot change the section name here.'
              }
            </div>
          </div>
        </div>
        <div className="pt-[30px]"></div>

        <div>
          <InputField
            errors={errors}
            {...register(`scrollButton.${lang}`)}
            label="Scroll Button"
            placeholder="Scrolling text..."
            // value={watch(`scrollButton.${lang}`)}
            labelComponent={
              <ColorField name="customize.scrollBtnColor" control={control} />
            }
          />
        </div>
        <div className="pt-[30px]"></div>

        {fields.map((field, index) => (
          <SliderWrapper
            key={field.id}
            head={'Slider ' + (index + 1)}
            wrap={wrapSlider === index}
            onWrapClick={() => {
              setWrapSlider(wrapSlider === index ? NaN : index);
            }}
          >
            <div>
              <div
                className={cx(
                  'flex flex-col gap-[20px] border-t border-t-[#E6D9F2] py-[30px]',
                  watch(`sliderData.${index}.hidden`) && 'opacity-50'
                )}
              >
                <div>
                  <SliderInputField
                    errors={errors}
                    {...register(`sliderData.${index}.subheader.${lang}`)}
                    label="Sub Heading"
                    placeholder="Type here..."
                    labelComponent={
                      <ColorField
                        name={`sliderData.${index}.customize.subheaderColor`}
                        control={control}
                      />
                    }
                    // value={watch(`sliderData.${index}.subheader.${lang}`) || ''}
                  />
                </div>
                <div>
                  <SliderInputField
                    errors={errors}
                    {...register(`sliderData.${index}.header.${lang}`)}
                    label="Heading"
                    placeholder="Type here..."
                    labelComponent={
                      <ColorField
                        name={`sliderData.${index}.customize.headerColor`}
                        control={control}
                      />
                    }
                    // value={watch(`sliderData.${index}.header.${lang}`) || ''}
                  />
                </div>
                <div>
                  <SliderTextField
                    errors={errors}
                    label="Description"
                    name={`sliderData.${index}.description.${lang}`}
                    control={control}
                    labelComponent={
                      <ColorField
                        name={`sliderData.${index}.customize.descColor`}
                        control={control}
                      />
                    }
                  />
                </div>
                <div className="flex mt-2 flex-col md:flex-row gap-[20px] w-full">
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                        Image or Gif
                      </p>
                    </div>
                    <div className="pt-4"></div>
                    <div>
                      <EmbedFilePopup
                        control={control}
                        name={`sliderData.${index}.img`}
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                        Image Alignment
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-[#444444] font-normal text-[16px] leading-[25px]">
                          Background
                        </p>{' '}
                        <ColorField
                          name={`sliderData.${index}.customize.imgBackground`}
                          control={control}
                        />
                      </div>
                    </div>
                    <div className="pt-4"></div>
                    <ImageAlignField
                      control={control}
                      name={`sliderData.${index}.customize.imgPosition`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-[10px] flex justify-between border-t border-[#E6D9F2]">
                <SliderHiddenField
                  name={`sliderData.${index}.hidden`}
                  control={control}
                />
                <div
                  onClick={() => {
                    setDeleteSlider(deleteSlider ? NaN : index);
                  }}
                  className="flex gap-[10px] items-center cursor-pointer mt-[16px]"
                >
                  <Trash />
                  <p className="text-[#EC4242] font-semibold text-[18px] leading-[22px]">
                    Delete slider
                  </p>
                  <SliderDeleteModal
                    header="Delete Slider ?"
                    description="Are you sure you want to delete this slider? This action cannot be undone."
                    handleOnClick={() => {
                      remove(deleteSlider);
                      setDeleteSlider(NaN);
                    }}
                    open={isNaN(deleteSlider) ? false : true}
                    setOpen={() => {
                      setDeleteSlider(deleteSlider ? NaN : index);
                    }}
                  />
                </div>
              </div>
            </div>
          </SliderWrapper>
        ))}

        <div
          onClick={() => {
            append({
              sliderId: generateRandomWord(),
              hidden: false,
              img: '',
              subheader: {
                en: '',
                spa: '',
              },

              header: {
                en: '',
                spa: '',
              },
              description: {
                en: '<p></p>',
                spa: '<p></p>',
              },
              customize: {
                subheaderColor: '#534143',
                headerColor: '#513455',
                descColor: '#351455',
                imgPosition: 'left',
              },
            });
            setWrapSlider(fields.length);
          }}
          className="bg-white p-[16px_20px] rounded-[10px] flex justify-center items-center gap-[6px] cursor-pointer"
        >
          <AddIcon />
          <p className="text-primary font-semibold text-[20px] leading-[24px]">
            Add Slide
          </p>
        </div>

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
            reset(data);
          }}
          className="py-[30px]"
        ></DashboardButton>
      </DashboardLayout>
    </form>
  );
};

const generateRandomWord = function () {
  const minLength = 5;
  const maxLength = 7;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const wordLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let randomWord = '';

  for (let i = 0; i < wordLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomWord += alphabet.charAt(randomIndex);
  }

  return randomWord;
};

export default ColoradoSliderForm;
