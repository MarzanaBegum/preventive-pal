import Image from 'next/image';
import { useRouter } from 'next/router';
import TickCircle from '../../../assets/icons/tick-circle.svg';

const PasswordSuccessCard = () => {
  const router = useRouter();
  return (
    <div className="w-[100%] md:w-[626px] p-[20px] md:p-[40px] lg:py-[40px] lg:px-[51px] bg-[#FFFFFF] shadow-[2px_6px_20px_rgba(0_0,0_0.1)] rounded-[12px] text-center">
      <div className="mb-[20px] mx-auto w-[40px] h-[40px]">
        <Image src={TickCircle} alt="logo" width={40} height={40} />
      </div>
      <h1 className="text-[32px] leading-[38px] font-medium text-secondary-text">
        Password Changed Successfully
      </h1>
      <p className="text-[16px] leading-[19px] my-[40px] font-normal text-primary-text">
        Your Password been changed successfully
      </p>
      <button
        onClick={() => router.push('/admin/login')}
        className="w-[100%] h-[61px] text-[18px] font-semibold cursor-pointer rounded-[8px] bg-primary hover:bg-[#41225f] transition-all duration-200 text-[#FFFFFF] text-center"
      >
        Login Now
      </button>
    </div>
  );
};

export default PasswordSuccessCard;
