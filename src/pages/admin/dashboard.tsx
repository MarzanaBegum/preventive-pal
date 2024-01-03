import api from '@/api';
import AdminLayout from '@/components/AdminDashboard/AdminLayout';
import { AdminDataProps, AdminDataProvider } from '@/context/AdminData';
import adminAuth from '@/hooks/AdminAuthenticate';
import { deleteCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';

type ADProps = AdminDataProps;

function AdminDashboard(props: ADProps) {
  return (
    <AdminDataProvider AdminData={props}>
      <AdminLayout />
    </AdminDataProvider>
  );
}

export default AdminDashboard;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  resetServerContext();

  try {
    const id = adminAuth({ req, res });
    if (!id) throw new Error();

    const [{ data: profileData }, { data: rootData }, { data: menuData }] =
      await Promise.all([
        api.get(`/v2/user/${id}`),
        api.get(`/v2/data/admin`),
        api.get('/menu'),
      ]);

    if (!profileData || !rootData || !menuData) throw new Error();

    return {
      props: {
        rootData: rootData || {},
        menuData: menuData || {},
        profileData: profileData || {},
      },
    };
  } catch (err) {
    deleteCookie('_evidence', { req, res });
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
};
