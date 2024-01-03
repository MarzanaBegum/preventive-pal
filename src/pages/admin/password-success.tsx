import PasswordSuccessCard from '@/components/AdminDashboard/ChangePassword/PasswordSuccessCard';
import authServerSide from '@/hooks/authServerSideProps';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Logo from '../../assets/icons/footer-logo.png';

const PasswordSuccessPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center w-full h-[70px] bg-[#FFFFFF]">
        <Image src={Logo} alt="logo" width={221} height={17} />
      </div>
      <div className="w-full px-[20px] md:px-0 flex flex-grow overflow-hidden justify-center items-center bg-[#F9F6FC]">
        <PasswordSuccessCard />
      </div>
    </div>
  );
};

export default PasswordSuccessPage;

export const getServerSideProps: GetServerSideProps = authServerSide