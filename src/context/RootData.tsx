import { MenuDataType, RootDataType } from '@/utils/types';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

const RootDataContext = createContext<{
  rootData: RootDataType;
  menuData: MenuDataType;
  lang: 'en' | 'spa';
}>({} as any);

type RDPProps = {
  children: React.ReactNode;
  rootData: RootDataType;
  menuData: MenuDataType;
};

export const RootDataProvider = ({
  children,
  rootData,
  menuData,
}: RDPProps) => {
  const router = useRouter();
  return (
    <RootDataContext.Provider
      value={{ rootData, menuData, lang: router.locale as any }}
    >
      {children}
    </RootDataContext.Provider>
  );
};

export const useRootData = () => useContext(RootDataContext);
