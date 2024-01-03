import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import LoadingIcon from '@/utils/LoadingIcon';
import PlusIcon from '@/utils/PlusIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SliderDeleteModal from '../AdminDashboard/ColoradoSliderForm/SliderDeleteModal';
import AdminLanguageDropdown from '../DashboardSection/AdminLanguageDropdown';
import AnotherLimitField from '../DashboardSection/AnotherLimitField';
import ColorField from '../DashboardSection/ColorField';
import DashboardLayout, {
  DashboardButton,
} from '../DashboardSection/DashboardLayout';
import FileUploadField from '../DashboardSection/FileUploadField';
import { ShowHiddenField } from '../DashboardSection/LayoutSystem/MenuWrapper';
import SliderWrapper from '../DashboardSection/LayoutSystem/SliderWrapper';
import LinkUrlField from '../DashboardSection/LinkUrlField';
import OpenNewTab from '../DashboardSection/NewTab';
import ToggleWrapper from '../ToggleWrapper';

const MenuSchema = yup.object({
  logo: yup.mixed(),
  customize: yup.object({
    closeBtnColor: yup.string(),
  }),
  links: yup.array(
    yup.object({
      name: yup.object({
        en: yup.string().required('Please fill Link Name with both language'),
        spa: yup.string().required('Please fill Link Name with both language'),
      }),
      url: yup.string().required('Link url is required'),
      newTab: yup.boolean(),
      hidden: yup.boolean(),
      customize: yup.object({
        linkNameColor: yup.string(),
      }),
    })
  ),
});

const EditMenuForm = () => {
  const [lang, setLang] = useState<'en' | 'spa'>('en');
  const { menuData, refetchMenuData } = useAdminData();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(MenuSchema),
    defaultValues: menuData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

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

  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const onSubmit = async (d: any) => {
    if (loading) return;
    try {
      setLoading(true);
      setFileLoading(true);
      const apiObj = await createObjectUrlMap(d);
      setFileLoading(false);
      console.log(apiObj);
      await api.put('/menu', apiObj);
      await refetchMenuData();
      customSuccessToast('Section updated');
      setLoading(false);
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      customErrorToast(errMessage);
      setLoading(false);
    }
  };

  const [wrapIndex, setWrapIndex] = useState(NaN);
  const handleAppend = () => {
    append({
      name: {
        en: '',
        spa: '',
      },
      url: '',
      newTab: true,
      hidden: false,
      customize: {
        linkNameColor: '#fff',
      },
    });
    setWrapIndex(fields.length);
  };

  const [deleteLink, setDeleteLink] = useState(NaN);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DashboardLayout
        rightSection={
          <div className="flex flex-col  md:flex-row xl:flex-col gap-[30px]">
            <ToggleWrapper label="Settings">
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[15px] items-center">
                  <h2 className="text-[18px] font-medium leading-[140%] text-[#444444]">
                    Close button color
                  </h2>
                  <ColorField
                    name="customize.closeBtnColor"
                    control={control}
                  />
                </div>
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
        {fields.map((field, index) => (
          <SliderWrapper
            wrap={index === wrapIndex}
            key={field.id}
            onWrapClick={() => {
              setWrapIndex(index == wrapIndex ? NaN : index);
            }}
            isHidden={watch(`links.${index}.hidden`)}
            head={watch(`links.${index}.name.en`) || 'Add new link'}
          >
            <div>
              <div
                className={cx(
                  'flex flex-col gap-[20px] border-y border-y-[#E6D9F2] py-[30px]',
                  watch(`links.${index}.hidden`) &&
                    'opacity-50 [&>*]:pointer-events-none'
                )}
              >
                <AnotherLimitField
                  label="Link Name"
                  name={`links.${index}.name.${lang}`}
                  control={control}
                  errors={errors}
                  placeholder="Type here..."
                  value={watch(`links.${index}.name.${lang}`) || ''}
                  labelComponent={
                    <ColorField
                      name={`links.${index}.customize.linkNameColor`}
                      control={control}
                    />
                  }
                />
                <LinkUrlField
                  label="Link Url"
                  errors={errors}
                  {...register(`links.${index}.url`)}
                  placeholder="Type here..."
                  labelComponent={
                    <OpenNewTab
                      label="Open link in a new tab"
                      {...register(`links.${index}.newTab`)}
                    />
                  }
                />
              </div>
              <div className="flex justify-between mt-[16px] items-center">
                <ShowHiddenField
                  name={`links.${index}.hidden`}
                  control={control}
                />
                <div
                  onClick={() => {
                    setDeleteLink(deleteLink ? NaN : index);
                  }}
                  className="flex gap-[10px] items-center cursor-pointer"
                >
                  <Image
                    src="/images/trash.svg"
                    width={24}
                    height={24}
                    alt="trash"
                  />
                  <h3 className="text-[18px] font-semibold text-[#EC4242]">
                    Delete
                  </h3>
                </div>
                <SliderDeleteModal
                  header="Delete Link ?"
                  description="Are you sure you want to delete this link? This action cannot be undone."
                  handleOnClick={() => {
                    remove(deleteLink);
                    setDeleteLink(NaN);
                  }}
                  open={isNaN(deleteLink) ? false : true}
                  setOpen={() => {
                    setDeleteLink(deleteLink ? NaN : index);
                  }}
                />
              </div>
            </div>
          </SliderWrapper>
        ))}

        <div
          onClick={handleAppend}
          className="w-full  rounded-[10px] gap-[6px] cursor-pointer transition-all duration-200 hover:bg-[rgb(90,47,132,.1)] group bg-white h-[56px] flex items-center justify-center"
        >
          <PlusIcon groupClassName=" transition-all duration-200" />
          <div className="text-[20px] leading-6 transition-all duration-200 text-primary font-semibold">
            Add custom link
          </div>
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
          resetOnClick={() => {
            reset();
          }}
          isLoading={loading}
          className="py-[30px]"
        />
      </DashboardLayout>
    </form>
  );
};

export default EditMenuForm;
