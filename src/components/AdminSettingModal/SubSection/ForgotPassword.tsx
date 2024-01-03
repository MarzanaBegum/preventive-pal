import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import CustomInput from '../CustomInput';

interface Props {
  setSectionState: (sectionState: string) => void;
  setInputEmail: (inputEmail: string) => void;
  setToken: (token: string) => void;
}

const DataSchema = yup.object().shape({
  email: yup.string().required('email is required field'),
});
const ForgotPassword = ({
  setSectionState,
  setInputEmail,
  setToken,
}: Props) => {
  const { profileData, refetchProfileData } = useAdminData();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(DataSchema),
    defaultValues: {
      email: profileData.email,
    },
  });

  /* Submit form */
  const onSubmit = async (data: any) => {
    setLoading(true);
    // form active
    try {
      const response = await api.post('/v2/forget-password', {
        email: data.email,
      });
      console.log(response, 'response..)((');
      setLoading(false);
      toast.success(response.data.message);
      setInputEmail(data.email);
      setToken(response?.data.token);
      refetchProfileData();
      setSectionState('email-check');
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response ? err.response.data?.message : err.message);
    }
  };
  return (
    <div className="bg-[#F2EBF9] rounded-[12px] h-auto">
      <div className="p-[40px]">
        <div className="max-w-[424px] mx-auto text-center">
          <h2 className="text-[#444444] font-medium text-[32px] leading-[38px]">
            Forget Password?
          </h2>
          <p className="mt-[16px] text-primary-text font-normal text-[16px] leading-[24px]">
            Enter your email address and we will send you link to reset your
            password.
          </p>
        </div>

        {/* input field  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-[472px] mx-auto mt-[40px]">
            <CustomInput
              {...register('email')}
              label="Email address"
              placeholder="Enter your email"
              className="border border-[#E5DDED] !rounded-[6px]"
              readOnly
            />
            {errors.email && (
              <p className="text-[14px] text-[red]">
                {errors?.email?.message?.toString()}
              </p>
            )}
          </div>
          <div className="mt-[40px] flex justify-center md:justify-end gap-[20px]">
            <button
              type="button"
              onClick={() => {
                setSectionState('password-setting');
              }}
              className="w-[150px] h-[47px] text-[16px] border border-primary bg-white hover:bg-[#522580] transition-all duration-200 text-primary hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-primary hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
