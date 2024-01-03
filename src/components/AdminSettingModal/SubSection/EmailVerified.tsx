import Image from 'next/image';

interface Props {
  setSectionState: (sectionState: string) => void;
}

const EmailVerified = ({ setSectionState }: Props) => {
  const handleGoBack = () => {
    setSectionState('personal-information');
  };

  return (
    <div className="bg-[#F2EBF9] rounded-[12px] h-auto">
      <div className="p-[40px]">
        <div className="max-w-[424px] mx-auto text-center">
          <h2 className="text-[#444444] font-medium text-[32px] leading-[38px]">
            Email verified
          </h2>
          <Image
            src="/images/tick-circle.svg"
            alt="success"
            width={40}
            height={40}
            className="mx-auto mt-[40px]"
          />
          <p className="mt-[14px] text-primary-text font-normal text-[16px] leading-[24px]">
            Your new email has been verified successfully. Please use this email
            for the next time you login.
          </p>

          <button
            onClick={handleGoBack}
            className="w-[150px] h-[47px] rounded-[6px] border border-primary text-[16px] font-semibold leading-[19px] text-primary mt-[30px]"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
