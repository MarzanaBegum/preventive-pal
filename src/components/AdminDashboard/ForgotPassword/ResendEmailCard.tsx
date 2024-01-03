import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import mailIcon from '../../../assets/icons/mail-icon.svg';

const ResendEmailButton = dynamic(() => import('./ResendEmailButton'), {
  ssr: false,
});

const ResendEmailCard = () => {
  const router = useRouter();

  return (
    <div className="w-[100%] md:w-[552px] p-[20px] md:p-[40px] bg-[#FFFFFF] shadow-[2px_6px_20px_rgba(0_0,0_0.1)] rounded-[12px]">
      <div className="mb-[16px] mx-auto w-[48px] h-[48px]">
        <Image src={mailIcon} alt="logo" width={48} height={48} />
      </div>
      <h1 className="text-[32px] leading-[38px] font-medium text-[#272D2C] text-center">
        Check Your Email
      </h1>
      <h3 className="text-[16px] leading-[19px] mt-[20px] mb-[40px] font-normal text-[#272D2C] text-center">
        Please check the email address{' '}
        <span className="font-semibold">{router.query?.email}</span> for
        instructions to reset your password.
      </h3>
      <ResendEmailButton />
    </div>
  );
};

export default ResendEmailCard;
