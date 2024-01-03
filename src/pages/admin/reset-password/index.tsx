import ChangePasswordForm from '@/components/AdminDashboard/ChangePassword/ChangePasswordForm';
import Image from 'next/image';
import Logo from '../../../assets/icons/footer-logo.png';

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-[70px] bg-[#FFFFFF] flex justify-center items-center">
        <Image src={Logo} alt="logo" className="w-[221px] h-[17px]" />
      </div>
      <div className="w-[100%] px-[20px] md:px-0 flex flex-grow overflow-hidden justify-center items-center bg-[#F9F6FC]">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;

// export const getServerSideProps: GetServerSideProps = authServerSide
