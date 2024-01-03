import api from '@/api';
import { RootDataProvider } from '@/context/RootData';
import { MenuDataType, RootDataType } from '@/utils/types';
import Home from '@/views/Home/Home';
import { GetServerSideProps } from 'next';
import defaultData from '../utils/data.json';
import defaultMenuData from '../utils/menu.json';

type HomeProps = { data: RootDataType; menuData: MenuDataType };

export default function HomePage({ data, menuData }: HomeProps) {
  return (
    <main>
      <RootDataProvider rootData={data} menuData={menuData}>
        <Home rootData={data} />
      </RootDataProvider>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  try {
    const { data } = await api.get(`/v2/data?lang=${locale || 'en'}`);

    const { data: menuData } = await api.get('/menu');

    return {
      props: {
        data: data || {},
        menuData: menuData || {},
      },
    };
  } catch (error) {
    return {
      props: {
        data: defaultData || {},
        menuData: defaultMenuData || {},

      },
    };
  }
};
