import classNames from 'classnames';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import CModal from './CModal';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
};

const btnStyle = 'rounded-[6px] font-semibold font-primary';

const AdminDeleteModal = ({ open, setOpen, setIsDropdownOpen }: Props) => {
  // global
  const router = useRouter();

  // removing cookies
  const handleLogout = () => {
    Cookies.remove('auth');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setOpen(!open);
    router.push('/admin/login');
  };

  return (
    <CModal
      open={open}
      setOpen={setOpen}
      title="Delete Slider ?"
      modalCss="md:w-[599px]"
    >
      <>
        <p className="font-medium leading-[19px] mt-[20px] mb-[33px] font-primary text-[#000000]">
          Are you sure you want to delete this slider? This action cannot be
          undone.
        </p>

        <div className="mb-[30px] flex justify-end gap-[20px]">
          <button
            type="button"
            className={classNames(
              'text-primary border border-primary p-[7px_40.23px]',
              btnStyle
            )}
            onClick={() => setIsDropdownOpen(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={classNames(
              'bg-[#EC4242] p-[8px_36.4px] text-white',
              btnStyle
            )}
          >
            Delete
          </button>
        </div>
      </>
    </CModal>
  );
};

export default AdminDeleteModal;
