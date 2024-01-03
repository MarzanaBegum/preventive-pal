import { deleteCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

function LogoutPage() {
  return <div>logout</div>;
}

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  deleteCookie('_evidence', { req, res });
  return {
    redirect: {
      destination: '/admin/login',
      permanent: false,
    },
  };
};
