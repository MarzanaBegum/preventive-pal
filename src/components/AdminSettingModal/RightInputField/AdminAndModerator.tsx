import api, { fetcher } from '@/api';
import { useAdminData } from '@/context/AdminData';
import { customErrorToast } from '@/utils/CustomToast';
import { ILoggedUser } from '@/utils/types';
import classNames from 'classnames';
import { useState } from 'react';
import useSWR from 'swr';
import DeleteModal from '../DeleteModal';
import PlusCircle from '../Icon/PlusCircle';
import CreateNewAdmin from '../SubSection/CreateNewAdmin';
import NoAdmin, { AdminLoading } from '../SubSection/NoAdmin';
import VerifyCurrentEmail from '../SubSection/VerifyCurrentEmail';
import VerifyCurrentEmailByOtp from '../SubSection/VerifyCurrentEmailByOtp';

interface Props {
  setOpen: (open: boolean) => void;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}

interface NewProps {
  setOpen: (open: boolean) => void;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  setSectionState: (sectionState: string) => void;
}

const AdminAndModerator = ({ setOpen, setIsDropdownOpen }: Props) => {
  const [sectionState, setSectionState] = useState('personal-information');

  // states
  return (
    <>
      {sectionState === 'personal-information' && (
        <AdminList
          setIsDropdownOpen={setIsDropdownOpen}
          setOpen={setOpen}
          setSectionState={setSectionState}
        />
      )}
      {sectionState === 'current-email-verify' && (
        <VerifyCurrentEmail setSectionState={setSectionState} />
      )}
      {sectionState === 'current-email-otp-verify' && (
        <VerifyCurrentEmailByOtp setSectionState={setSectionState} />
      )}
      {sectionState === 'change-email' && (
        <CreateNewAdmin
          setIsDropdownOpen={setIsDropdownOpen}
          setOpen={setOpen}
          setSectionState={setSectionState}
        />
      )}
    </>
  );
};

function AdminList({ setOpen, setIsDropdownOpen, setSectionState }: NewProps) {
  const { profileData } = useAdminData();

  const {
    data: users,
    isLoading,
    mutate,
  } = useSWR<ILoggedUser[]>('/v2/users', fetcher);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');

  const handleRemove = async (email: any) => {
    setSelectedEmail(email);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleAdminDelete = async () => {
    try {
      const filterUsers = users?.filter((item) => item.email !== selectedEmail);
      mutate(filterUsers, { revalidate: false });
      setOpenDeleteModal(false);
      api.delete(`/v2/user/${selectedEmail}`);
    } catch (err: any) {
      const errMessage = err.response
        ? err.response?.data?.message
        : err.message;
      customErrorToast(errMessage);
    }
  };

  return (
    <>
      {users && users?.length !== 0 ? (
        <div className=" bg-[#F2EBF9] md:rounded-[12px]">
          <div className="px-[20px] md:px-[30px] py-[30px]">
            <h3 className="text-[#101010] font-semibold text-[18px] leading-[25px] ">
              Admin
            </h3>
            <hr className="text-[#E6D9F2] mt-[14px] mb-[20px]" />

            {/* map admin  */}
            <div
              className={classNames(
                users?.length > 4 && 'scrollbar overflow-y-scroll'
              )}
            >
              <div
                className={classNames(
                  'flex flex-col gap-[24px] lg:gap-[30px]  max-h-48 pr-2 mr-[15px]'
                )}
              >
                {users.map((user: ILoggedUser, index: number) => (
                  <div key={index} className="flex justify-between">
                    <h2 className="text-[#0B1116] font-semibold text-[16px] leading-[20px]">{`${user?.firstName} ${user?.lastName}`}</h2>

                    <button
                      onClick={() => handleRemove(user.email)}
                      disabled={profileData?.email === user.email}
                      className="text-[#EC4242] font-semibold disabled:opacity-70 text-[16px] leading-[20px] tracking-[10%]"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[30px]">
              <button
                onClick={() => setSectionState('current-email-verify')}
                className="flex items-center gap-[6px] w-[160px] hover:bg-[rgb(90,47,132,.1)] transition-all duration-200 md:w-[206px] bg-white justify-center py-[8px] rounded-[10px]"
              >
                <span>
                  <PlusCircle stroke="#5A2F84" />
                </span>{' '}
                Add Admins
              </button>
            </div>
            {/* // buttons  */}
            {/* <div className="flex justify-center md:justify-end gap-[20px] mt-[40px]">
                          <button
                              type="button"
                              onClick={() => {
                                  setOpen(false);
                                  setIsDropdownOpen(false);
                              }}
                              className="w-[150px] h-[47px] text-[16px] border border-[#5A2F84] bg-white hover:bg-[#522580] transition-all duration-200 text-[#5A2F84] hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
                          >
                              Cancel
                          </button>
                          <button
                              type="submit"
                              className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-[#5A2F84] hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
                          >
                              {isLoading ? (
                                  <div className="flex justify-center">
                                      <Loading color="white" />
                                  </div>
                              ) : (
                                  'Update'
                              )}
                          </button>
  
                      </div> */}
          </div>
        </div>
      ) : isLoading ? (
        <AdminLoading />
      ) : (
        <NoAdmin />
      )}
      <DeleteModal
        handleYesClick={handleAdminDelete}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </>
  );
}

export default AdminAndModerator;
