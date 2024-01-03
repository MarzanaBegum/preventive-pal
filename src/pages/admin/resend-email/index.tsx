import ResendEmailCard from '@/components/AdminDashboard/ForgotPassword/ResendEmailCard';
import adminAuth from '@/hooks/AdminAuthenticate';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Logo from '../../../assets/icons/footer-logo.png';

const ResendEmailPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-[70px] bg-[#FFFFFF] flex justify-center items-center">
        <Image src={Logo} alt="logo" className="w-[221px] h-[17px]" />
      </div>
      <div className="w-full px-[20px] md:px-0 flex flex-grow overflow-hidden justify-center items-center bg-[#F9F6FC]">
        <ResendEmailCard />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { email, token } = query;

  try {

    const verify = adminAuth({ req, res });
    if (!verify) throw new Error();
    if (verify) {
      return {
        redirect: {
          destination: '/admin/dashboard',
          permanent: true,
        },
      };
    }
    if (!email || !token) throw new Error();

    return {
      props: {},
    };
  } catch (err) {
    // redirect
    return {
      redirect: {
        destination: '/admin/login',
        permanent: true,
      },
    };
  }
};

export default ResendEmailPage;
