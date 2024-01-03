import LoginForm from '@/components/AdminDashboard/Login/LoginForm';
import authServerSide from '@/hooks/authServerSideProps';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Logo from '../../assets/icons/footer-logo.png';

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-[70px] bg-[#FFFFFF] flex justify-center items-center">
        <Image src={Logo} alt="logo" className="w-[221px] h-[17px]" />
      </div>
      <div className="w-full px-[20px] md:px-0 flex flex-grow overflow-hidden justify-center items-center bg-[#F9F6FC]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;


export const getServerSideProps: GetServerSideProps = authServerSide
