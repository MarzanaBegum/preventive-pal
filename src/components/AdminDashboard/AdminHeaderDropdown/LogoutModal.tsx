import CModal from '@/components/CustomModal/CModal';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
};

const btnStyle = 'rounded-[6px] font-semibold font-primary';

const LogoutModal = ({ open, setOpen, setIsDropdownOpen }: Props) => {
  return (
    <CModal
      open={open}
      setOpen={setOpen}
      title="Logout"
      modalCss="md:w-[599px]"
    >
      <>
        <p className="font-medium leading-[19px] mt-[20px] mb-[33px] font-primary text-[#000000]">
          Are you sure you want to Logout?
        </p>

        <div className="mb-[30px] flex justify-end gap-[20px]">
          <button
            type="button"
            className={classNames(
              'text-primary border border-primary transition-all duration-200 hover:bg-[rgb(90,47,132,.1)] p-[7px_40.23px]',
              btnStyle
            )}
            onClick={() => setIsDropdownOpen(false)}
          >
            Cancel
          </button>

          <Link href={'/admin/logout'}>
            <button
              type="button"
              className={classNames(
                'bg-primary p-[8px_36.4px] transition-all duration-200 hover:bg-[#422361] text-white',
                btnStyle
              )}
            >
              Logout
            </button>
          </Link>
        </div>
      </>
    </CModal>
  );
};

export default LogoutModal;
