import Logo from '@/assets/icons/admin-logo.svg';
import { useAdminData } from '@/context/AdminData';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import AdminLayoutLeft from './AdminLayoutLeft';
import AdminLayoutRight from './AdminLayoutRight';
import AdminTopDropdown from './AdminLayoutRight/AdminTopDropdown';

export type SelectStateType = [string, Dispatch<SetStateAction<string>>];

function AdminLayout() {
  const { rootData } = useAdminData();
  const selectState = useState(rootData?.[0]?.id);

  return (
    <>
      <div className="min-h-screen w-full bg-[#F9F6FC]">
        <div className="sticky top-0 z-10 bg-white py-[25px]">
          <div className="flex items-center w-full max-w-full justify-between admin-container">
            <div className="w-[calc(100%-80px)] ">
              <Image
                src={Logo}
                alt="logo"
                className="max-w-[200px] md:max-w-[260px] w-full text-start"
              />
            </div>
            {/* <AdminLanguage langState={langState} /> */}
            <AdminTopDropdown />
          </div>
        </div>

        <div className="admin-container">
          <div className="flex flex-col items-start gap-[40px] py-10  lg:flex-row md:py-20 ">
            <div className="w-[100%] lg:w-[290px]">
              <AdminLayoutLeft selectState={selectState} />
            </div>
            <div className=" w-[100%] lg:w-[calc(100%-330px)] ">
              <AdminLayoutRight selectState={selectState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
