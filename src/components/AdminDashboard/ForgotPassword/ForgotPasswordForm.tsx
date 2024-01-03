/* eslint-disable @next/next/no-img-element */
import api from '@/api';
import Loading from '@/components/Loading';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

type InputDataType = {
  email: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
});
const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputDataType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: InputDataType) => {
    if (isLoading) return;
    try {
      setLoading(true);

      const {
        data: { token },
      } = await api.post('/v2/forget-password', data);

      localStorage.setItem('timer', '60');

      customSuccessToast(
        'Reset password request successful, Please check your email'
      );

      await router.push(
        `/admin/resend-email?email=${data.email}&token=${token}`
      );
      setLoading(false);
    } catch (err: any) {
      const errMessage = err.response
        ? err.response.data?.message
        : err.message;
      customErrorToast(errMessage);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] md:w-[552px] p-[20px] md:p-[40px] bg-[#FFFFFF] shadow-[2px_6px_20px_rgba(0_0,0_0.1)] rounded-[12px]">
      <h1 className="text-[32px] leading-[38px] mb-[16px] font-medium text-[#272D2C] text-center">
        Forgot Password?
      </h1>
      <h3 className="text-[16px] leading-[19px] mb-[40px] font-normal text-[#272D2C] text-center">
        Enter your email address and we will send you link to reset your
        password.
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <label
            className="text-[16px] leading-[19px] font-normal text-[#1F1F1F]"
            htmlFor=""
          >
            Email address
          </label>
          <div className="pt-[10px]"></div>
          <input
            {...register('email')}
            placeholder="Enter your email"
            className={`${
              errors.email
                ? '!border-[#FF000D] text-[#FF000D]'
                : 'focus:border-[#bdc0c4]'
            } bg-[#F8F8F8] text-[#727272] border border-[#E5DDED] p-[18px_16px] focus:outline-none rounded-[6px] w-full`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-[#FF000D] first-letter:capitalize">
              {errors.email?.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[20px] mt-[40px]">
          <button
            type="submit"
            className="w-[100%] h-[61px] text-[18px] font-semibold cursor-pointer rounded-[8px] bg-primary hover:bg-[#41225f] transition-all duration-200 text-[#FFFFFF] text-center"
          >
            {isLoading ? (
              <div className="flex gap-2 items-center justify-center">
                <Loading color="white" />
                <div>Loading...</div>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
          <button
            onClick={() => router.push('/admin/login')}
            type="button"
            className="w-[100%] h-[61px] text-[18px] border border-[#522580] bg-white hover:bg-[rgb(90,47,132,.1)] transition-all duration-200 text-primary font-semibold cursor-pointer rounded-[8px] text-center"
          >
            Back To Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
