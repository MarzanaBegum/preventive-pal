import api from '@/api';
import ColorField from '@/components/DashboardSection/ColorField';
import InputField from '@/components/DashboardSection/InputField';
import TextField from '@/components/DashboardSection/TextField';
import ToggleField from '@/components/DashboardSection/ToggleField';
import { useAdminData } from '@/context/AdminData';
import CircleLoading from '@/utils/CircleLoading';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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

const customTextSection = Yup.object({
  type: Yup.string().required(),
  menu: Yup.boolean(),
  hidden: Yup.boolean(),
  customize: Yup.object({
    headerColor: Yup.string(),
    subheaderColor: Yup.string(),
    descColor: Yup.string(),
    bgColor: Yup.string(),
  }),
  en: CommonValueSchema,
  spa: CommonValueSchema,
});

function CustomTextSection({ handleModal }: any) {
  const { refetchRootData } = useAdminData();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(customTextSection),
    defaultValues: {
      type: 'custom-text',
      customize: {
        headerColor: '#664897',
        subheaderColor: '#331f1a',
        descColor: '#505050',
        bgColor: '#E9FBD9',
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (d: any) => {
    if (loading) return;
    try {
      setLoading(true);
      await api.post('/v2/data/new', d);
      await refetchRootData();
      reset();
      handleModal();
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

  return (
    <form
      className="flex flex-col gap-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <div className="flex flex-row  items-center flex-wrap gap-4">
        <ToggleField label="Hide" {...register('hidden')} />
        <ToggleField label="Menu" {...register('menu')} />
        <div className="flex items-center gap-3">
          <div>Background Color</div>
          <ColorField name="customize.bgColor" control={control} />
        </div>{' '}
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

      <div className="flex justify-end gap-[30px] pb-3">
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
              <div className="text-base  uppercase">Loading...</div>
            </>
          ) : (
            'Update'
          )}
        </button>
      </div>
    </form>
  );
}

export default CustomTextSection;
