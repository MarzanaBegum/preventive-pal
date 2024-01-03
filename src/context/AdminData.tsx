import api from '@/api';
import { useAdminAuth } from '@/hooks/AdminAuthenticate';
import { ILoggedUser, MenuType, RootDataType } from '@/utils/types';
import { createContext, useContext, useReducer } from 'react';

type AdminDataType = {
  rootData: RootDataType;
  profileData: ILoggedUser;
  menuData: MenuType;
  refetchRootData: () => void;
  refetchProfileData: () => void;
  refetchMenuData: () => void;
};

export type AdminDataProps = {
  rootData: RootDataType;
  profileData: ILoggedUser;
  menuData: MenuType;
};

type ActionType = {
  type: keyof AdminDataProps;
  value: AdminDataProps[keyof AdminDataProps];
};

const reducer = (state: AdminDataProps, action: ActionType) => {
  return {
    ...state,
    [action.type]: action.value,
  };
};

const AdminDataContext = createContext<AdminDataType>({} as any);

export const AdminDataProvider = ({
  children,
  AdminData,
}: {
  children: React.ReactNode;
  AdminData: AdminDataProps;
}) => {
  const [state, dispatch] = useReducer(reducer, AdminData);

  // refetching root data functions
  const refetchRootData = async () => {
    const { data } = await api.get(`/v2/data/admin`);
    dispatch({ type: 'rootData', value: data });
  };

  // refetching profile data functions
  const id = useAdminAuth();
  const refetchProfileData = async () => {
    const { data } = await api.get(`/v2/user/${id}`);
    dispatch({ type: 'profileData', value: data });
  };

  // refetching menu data functions
  const refetchMenuData = async () => {
    const { data } = await api.get(`/menu`);
    dispatch({ type: 'menuData', value: data });
  };

  return (
    <AdminDataContext.Provider
      value={{
        ...state,
        refetchRootData,
        refetchProfileData,
        refetchMenuData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => useContext(AdminDataContext);
