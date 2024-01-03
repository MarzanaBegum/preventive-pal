/* eslint-disable @next/next/no-img-element */
import api from '@/api';
import Loading from '@/components/Loading';
import { useAdminData } from '@/context/AdminData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import CheckYourEmail from '../SubSection/CheckYourEmail';
import ForgotPassword from '../SubSection/ForgotPassword';

type InputDataType = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const schema = yup.object({
  old_password: yup.string().required('Old password field is required'),
  new_password: yup.string().min(8, 'Password must be at least 8 characters long').required('New password field is required'),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords does not match')
    .required('Confirm password field is required'),
});

interface Props {
  setOpen: (open: boolean) => void;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}

const PasswordSetting = ({ setOpen, setIsDropdownOpen }: Props) => {
  const labelClass = "text-[16px] leading-[19px] font-medium text-[#444444]";

  // hooks
  const { profileData } = useAdminData();

  // states
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showOldPass, setShowOldPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [sectionState, setSectionState] = useState<string>("password-setting");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<InputDataType>({
    resolver: yupResolver(schema),
  });

  // funtion
  const onSubmit = async (data: InputDataType) => {

    // set data by server object property
    const sendData = {
      id: profileData?.id,
      oldPassword: data.old_password,
      newPassword: data.new_password,
      confirmNewPassword: data.confirm_new_password
    }

    try {
      setLoading(true);
      const response = await api.post('/v2/change-password', sendData);
      setLoading(false);
      toast.success(response.data.message);
      reset();
      setShowOldPass(false);
      setShowNewPass(false);
      setShowPassword(false);
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response ? err.response.data?.message : err.message);
    }

  };

  return (
    <>
      {sectionState === "password-setting" && <div className="px-[20px] md:px-[30px] pt-[30px] pb-[30px] bg-[#F2EBF9] md:rounded-[12px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[20px]">
            <div>
              <label
                className={`${labelClass}`}
                htmlFor=""
              >
                Current Password
              </label>
              <div className="pt-[10px]"></div>
              <div className="relative">
                <input
                  {...register('old_password')}
                  placeholder="*********"
                  className={`${errors.old_password
                    ? '!border-[#FF000D] text-[#FF000D]'
                    : 'focus:border-[#bdc0c4]'
                    } bg-[#F8F8F8] text-[#727272] border border-[#E5DDED] p-[18px_16px] focus:outline-none rounded-[6px] w-full`}
                  type={showOldPass ? 'text' : 'password'}
                />
                <img
                  onClick={() => setShowOldPass(!showOldPass)}
                  className="w-5 cursor-pointer h-5 absolute top-[21px] right-4"
                  src={
                    showOldPass ? '/images/visible.svg' : '/images/invisible.svg'
                  }
                  alt="image"
                />
              </div>
              <div className="flex justify-end mt-[10px] "><button onClick={() => setSectionState("forgot-password")} type="button" className="text-primary font-normal text-[16px] leading-[19px]">Forgot password</button></div>
              {errors.old_password && (
                <p className="mt-2 text-sm first-letter:capitalize text-[#FF000D]">
                  {errors.old_password?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                className={labelClass}
                htmlFor=""
              >
                New Password
              </label>
              <div className="pt-[10px]"></div>
              <div className="relative">
                <input
                  {...register('new_password')}
                  placeholder="*********"
                  className={`${errors.new_password
                    ? '!border-[#FF000D] text-[#FF000D]'
                    : 'focus:border-[#bdc0c4]'
                    } bg-[#F8F8F8] text-[#727272] border border-[#E5DDED] p-[18px_16px] focus:outline-none rounded-[6px] w-full`}
                  type={showNewPass ? 'text' : 'password'}
                />
                <img
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="w-5 cursor-pointer h-5 absolute top-[21px] right-4"
                  src={
                    showNewPass ? '/images/visible.svg' : '/images/invisible.svg'
                  }
                  alt="image"
                />
              </div>
              {errors.new_password && (
                <p className="mt-2 text-sm first-letter:capitalize text-[#FF000D]">
                  {errors.new_password?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                className={labelClass}
                htmlFor=""
              >
                Confirm Password
              </label>
              <div className="pt-[10px]"></div>
              <div className="relative">
                <input
                  {...register('confirm_new_password')}
                  placeholder="*********"
                  className={`${errors.confirm_new_password
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
              {errors.confirm_new_password && (
                <p className="mt-2 text-sm first-letter:capitalize text-[#FF000D]">
                  {errors.confirm_new_password?.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-[20px] mt-[30px] justify-end">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setIsDropdownOpen(false);
              }}
              className="w-[150px] h-[47px] text-[16px] border border-primary bg-white hover:bg-[#522580] transition-all duration-200 text-primary hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-primary hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <Loading color="white" />
                </div>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>}
      {sectionState === "forgot-password" && <ForgotPassword setSectionState={setSectionState} setInputEmail={setInputEmail} setToken={setToken} />}
      {sectionState === "email-check" && <CheckYourEmail setSectionState={setSectionState} inputEmail={inputEmail} token={token} />}
    </>
  );
};

export default PasswordSetting;
