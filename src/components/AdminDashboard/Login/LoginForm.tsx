/* eslint-disable @next/next/no-img-element */
import api from '@/api';
import Loading from '@/components/Loading';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UseControllerProps, useController, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

type InputDataType = {
  email: string;
  password: string;
  keep: boolean;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required(),
  keep: yup.boolean(),
});

const LoginForm = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // hooks
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputDataType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (d: InputDataType) => {
    try {
      setLoading(true);
      const { data } = await api.post('/v2/login', d);

      const expires = d.keep ? new Date(Date.now() + 87400e6) : undefined;

      setCookie('_evidence', data.token, { expires });

      await router.push('/admin/dashboard');
      setLoading(false);
      customSuccessToast('Login successful');
      reset();
    } catch (err: any) {
      setLoading(false);
      customErrorToast(
        err?.response ? err.response.data?.message : err.message
      );
    }
  };

  return (
    <div className="w-[100%] md:w-[552px] p-[20px] md:p-[40px] bg-[#FFFFFF] shadow-[2px_6px_20px_rgba(0_0,0_0.1)] rounded-[12px]">
      <h1 className="text-[32px] leading-[38px] mb-[40px] font-medium text-[#272D2C] text-center">
        Admin Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[30px]">
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
          <div>
            <label
              className="text-[16px] leading-[19px] font-normal text-[#1F1F1F]"
              htmlFor=""
            >
              Password
            </label>
            <div className="pt-[10px]"></div>
            <div className="relative">
              <input
                {...register('password')}
                placeholder="*********"
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
        </div>

        <div className="flex justify-between mt-[20px] mb-[40px]">
          <KeepLoginCheckbox name="keep" control={control} />
          <Link href="/admin/forgot-password">
            <h2 className="text-[16px] leading-[19px] font-normal text-primary">
              Forgot password
            </h2>
          </Link>
        </div>

        <button
          type="submit"
          className="w-[100%] h-[61px] text-[18px] font-semibold cursor-pointer rounded-[8px] bg-primary hover:bg-[#41225f] transition-all duration-200 text-[#FFFFFF] text-center"
        >
          {isLoading ? (
            <div className="flex justify-center">
              <Loading color="white" />
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

type RCTYPE = {} & UseControllerProps<any>;
const KeepLoginCheckbox = (props: RCTYPE) => {
  const { field } = useController({ ...props, defaultValue: true });

  return (
    <div
      onClick={() => field.onChange(!field.value)}
      className="flex items-center gap-[10px] cursor-pointer"
    >
      <div
        className={`w-[20px] h-[20px] border-[1.5px] rounded-[6px] border-primary flex justify-center items-center ${
          field.value && ' bg-primary'
        }`}
      >
        {field.value && (
          <div className="">
            <Image
              src="/images/check-mark-icon.svg"
              width={9.5}
              height={6.66}
              alt="check-mark"
            />
          </div>
        )}
      </div>
      <div className="text-[#333] text-sm">Keep me logged in</div>
    </div>
  );
};
export default LoginForm;
