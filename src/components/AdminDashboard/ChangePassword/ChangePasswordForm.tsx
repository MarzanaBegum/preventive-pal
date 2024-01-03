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
  password: string;
  confirm_password: string;
};

const schema = yup.object({
  password: yup.string().required().min(8),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords does not match')
    .required(),
});

const ChangePasswordForm = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const { token } = router.query;

      await api.put('/v2/reset-password?token=' + token, data);

      customSuccessToast('Password changed successfully');
      await router.push('/admin/password-success');
      setLoading(false);
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      customErrorToast(errMessage);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] md:w-[552px] p-[20px] md:p-[40px] bg-[#FFFFFF] shadow-[2px_6px_20px_rgba(0_0,0_0.1)] rounded-[12px]">
      <h1 className="text-[32px] leading-[38px] mb-[40px] font-medium text-secondary-text text-center">
        Change Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[30px] mb-[40px]">
          <div>
            <label
              className="text-[16px] leading-[19px] font-normal text-secondary-text"
              htmlFor=""
            >
              New Password
            </label>
            <div className="pt-[10px]"></div>
            <div className="relative">
              <input
                {...register('password')}
                placeholder="admin@123"
                className={`${
                  errors.password
                    ? '!border-[#FF000D] text-[#FF000D]'
                    : 'focus:border-[#bdc0c4]'
                } bg-[#F8F8F8] text-[#727272] border border-[#E5DDED] p-[18px_16px] focus:outline-none rounded-[6px] w-full`}
                type={isOpen ? 'text' : 'password'}
              />
              <img
                onClick={() => setIsOpen(!isOpen)}
                className="w-5 cursor-pointer h-5 absolute top-[21px] right-4"
                src={isOpen ? '/images/visible.svg' : '/images/invisible.svg'}
                alt="image"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm first-letter:capitalize text-[#FF000D]">
                {errors.password?.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label
              className="text-[16px] leading-[19px] font-normal text-secondary-text"
              htmlFor=""
            >
              Confirm New Password
            </label>
            <div className="pt-[10px]"></div>
            <div className="relative">
              <input
                {...register('confirm_password')}
                placeholder="admin@123"
                className={`${
                  errors.confirm_password
                    ? '!border-[#FF000D] text-[#FF000D]'
                    : 'focus:border-[#bdc0c4]'
                } bg-[#F8F8F8] text-[#727272] border border-[#E5DDED] p-[18px_16px] focus:outline-none rounded-[6px] w-full`}
                type={showPassword ? 'text' : 'password'}
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                className="w-5 cursor-pointer h-5 absolute top-[21px] right-4"
                src={
                  showPassword ? '/images/visible.svg' : '/images/invisible.svg'
                }
                alt="image"
              />
            </div>
            {errors.confirm_password && (
              <p className="mt-2 text-sm first-letter:capitalize text-[#FF000D]">
                {errors.confirm_password?.message?.toString()}
              </p>
            )}
          </div>
        </div>
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
            'Change'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
