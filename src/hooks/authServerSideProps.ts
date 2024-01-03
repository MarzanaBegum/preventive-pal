import adminAuth from '@/hooks/AdminAuthenticate';
import { GetServerSideProps } from 'next';

const authServerSide: GetServerSideProps = async ({ req, res }) => {
  try {
    const verify = adminAuth({ req, res });
    if (!verify) throw new Error();
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};

export default authServerSide;
