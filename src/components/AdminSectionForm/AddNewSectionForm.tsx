import api from '@/api';
import ColorField from '@/components/DashboardSection/ColorField';
import NewToggleField from '@/components/DashboardSection/NewToggleField';
import ToggleWrapper from '@/components/ToggleWrapper';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import LoadingIcon from '@/utils/LoadingIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageAlignField from '../AdminDashboard/ColoradoSliderForm/ImageAlignField';
import EmbedFilePopup from '../AdminDashboard/NewSectionComponent/EmbedFilePopup';
import NewSectionInputField from '../AdminDashboard/NewSectionComponent/NewSectionInputField';
import NewSectionTextField from '../AdminDashboard/NewSectionComponent/NewSectionTextField';
import {
  ButtonIcon,
  addNewSectionSchema,
  newSectionDefault,
} from '../AdminDashboard/NewSectionComponent/NewSectionUtils';
import CrossIcon from '../AdminSettingModal/Icon/CrossIcon';
import { NewCustomModal } from '../CustomModal';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import DashboardLayout, {
  DashboardButton,
  DashboardWrapper,
} from '../DashboardSection/DashboardLayout';
import NewScrollBtnField from '../DashboardSection/NewScrollBtnField';

function AddNewSectionForm({ selectState }: any) {
  const [lang, setLang] = useState<'en' | 'spa'>('en');

  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(addNewSectionSchema),
    defaultValues: newSectionDefault,
  });

  useEffect(() => {
    reset(getValues());
  }, [lang]);

  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addImage, setAddImage] = useState(false);

  const { rootData, refetchRootData } = useAdminData();

  const onSubmit = async (d: any) => {
    if (addImage && !d.img) {
      return setError('img', {
        message: 'Image is required',
        type: 'required',
      });
    }

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
      customSuccessToast('Section created successfully');
      reset();
      selectState[1](rootData[0].id);
      setLoading(false);
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      setLoading(false);
      customErrorToast(errMessage);
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
            <div className="border-b pb-3 border-[#E6D9F2]">
              <h2 className="text-[24px] leading-[140%] font-semibold text-[#444444]">
                Add new section
              </h2>
            </div>
            <div>
              <NewSectionInputField
                errors={errors}
                label="Section Name"
                placeholder="Enter section name"
                {...register(`title.${lang}`)}
              />
            </div>
            <div>
              <NewSectionInputField
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
              <NewSectionInputField
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
              <NewSectionTextField
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
                placeholder="type scroll btn text"
                labelComponent={
                  <ColorField
                    name={'customize.scrollBtnColor' as any}
                    control={control}
                  />
                }
              />
            </div>
          </DashboardWrapper>
          <div className="my-[30px] flex items-center justify-center">
            <button
              onClick={() => {
                setAddImage(!addImage);
              }}
              type="button"
              className="flex group hover:text-white hover:bg-[#5A2F84] transition-all duration-200 items-center h-[56px] px-5 gap-[6px] rounded-[10px] bg-white text-[#5A2F84] font-semibold text-[20px]"
            >
              <ButtonIcon
                className="group-hover:stroke-[#fff] transition-all duration-200"
                type={addImage ? 'cancel' : 'add'}
              />
              <div>{addImage ? 'Cancel' : 'Add Image or Video'}</div>
            </button>
          </div>
          {addImage && (
            <DashboardWrapper className="!gap-0">
              <div className="flex mt-2 flex-col md:flex-row gap-[20px] w-full">
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[18px] leading-[140%] text-[#444444]">
                      Image or Video
                    </p>
                  </div>
                  <div className="pt-4"></div>
                  <EmbedFilePopup name="img" control={control} />
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
          )}

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
              selectState[1](rootData[0].id);
            }}
            className="py-[30px]"
            resetBtnText="Cancel"
            updateBtnText="Create"
          />
        </DashboardLayout>
      </form>
    </>
  );
}

type EmbeddedProps = {
  isOpen?: any;
  setIsOpen?: any;
  children?: React.ReactNode;
  onSubmit: any;
  value?: any;
};

export const isEmbedded = (v: string) =>
  typeof v === 'string' &&
  (v.startsWith('https://www.youtube.com') ||
    v.startsWith('https://player.vimeo.com'));

const getSrcValue = (str: string) => {
  const srcRegex = /<iframe(.*?)src="(.*?)"/g;
  const match = srcRegex.exec(str);
  if (match) {
    return match[2];
  }
  return '';
};

export function EmbeddedModal({
  onSubmit,
  value,
  children,
  isOpen,
  setIsOpen,
}: EmbeddedProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});
  console.log(value);
  useEffect(() => {
    if (isEmbedded(value)) {
      setUrl(value);
    } else {
      setUrl('');
    }
  }, [value]);

  const handleSubmit = async () => {
    setErrors({});
    if (!url) {
      return setErrors({ url: { message: 'Embedded url is required' } });
    }
    let newUrl = url;
    if (!isEmbedded(url)) {
      newUrl = getSrcValue(url);
      if (!newUrl) {
        return setErrors({ url: { message: 'Embedded url not valid' } });
      }
    }

    await onSubmit(newUrl);
    (setIsOpen || setModalOpen)(false);
  };

  return (
    <>
      <NewCustomModal
        isModalOpen={isOpen || modalOpen}
        setIsModalOpen={setIsOpen || setModalOpen}
      >
        <div className="w-[calc(100vw-20px)] max-w-[450px] rounded bg-white p-[30px]">
          <div
            onClick={() => (setIsOpen || setModalOpen)(false)}
            className="absolute top-[10px] right-[10px] cursor-pointer"
          >
            <CrossIcon stroke="#464C53" />
          </div>
          <div>
            <div>
              <NewSectionInputField
                name="url"
                label="Embedded youtube and vimeo"
                placeholder="embedded url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                errors={errors}
              />
            </div>
            <DashboardButton
              className="pt-[20px]"
              resetBtnText="Cancel"
              updateBtnText="Embed"
              resetBtnProps={{
                className: '!h-[40px] !w-[120px]',
                type: 'button',
              }}
              updateBtnProps={{
                className: '!h-[40px] !w-[120px]',
                type: 'button',
              }}
              resetOnClick={() => (setIsOpen || setModalOpen)(false)}
              updateOnClick={handleSubmit}
            />
          </div>
        </div>
      </NewCustomModal>
      <div onClick={() => setModalOpen(!modalOpen)}>{children}</div>
    </>
  );
}

export default AddNewSectionForm;
