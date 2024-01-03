import LoadingIcon from '@/utils/LoadingIcon';
import Image from 'next/image';
import PlusCircle from '../Icon/PlusCircle';

const NoAdmin = () => {
  return (
    <div className=" bg-[#F2EBF9] md:rounded-[12px] h-[468px]">
      <div className="px-[20px] md:px-[30px] py-[30px]">
        <div className="flex items-center justify-center h-[408px]">
          <div className="flex flex-col gap-[30px] items-center">
            <Image
              src="/images/no-admin.png"
              alt="no admin"
              width={50}
              height={50}
            />
            <h3 className="font-semibold text-[18px] leading-[25px] text-[#444444]">
              No admin here{' '}
            </h3>
            <button className="flex items-center gap-[6px] w-[160px] md:w-[206px] bg-white justify-center py-[8px] rounded-[10px]">
              <span>
                <PlusCircle stroke="#5A2F84" />
              </span>{' '}
              Add Admins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminLoading = () => {
  return (
    <div className="  md:rounded-[12px] h-[468px]">
      <div className="px-[20px] md:px-[30px] py-[30px]">
        <div className="flex items-center justify-center h-[408px]">
          <div className="flex flex-col gap-[30px] items-center">
            <LoadingIcon />
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAdmin;
