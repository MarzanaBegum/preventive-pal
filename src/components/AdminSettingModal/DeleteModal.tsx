import CModal from '@/components/CustomModal/CModal';
import classNames from 'classnames';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleYesClick: () => void;
};

const btnStyle = 'rounded-[6px] font-semibold font-primary';

const DeleteModal = ({ open, setOpen, handleYesClick }: Props) => {
  return (
    <CModal
      open={open}
      setOpen={setOpen}
      title="Remove Admin?"
      modalCss="md:w-[599px]"
    >
      <>
        <p className="font-medium leading-[19px] mt-[20px] mb-[33px] font-primary text-[#000000]">
          Are you sure you want to remove this person? This cannot be undone.
        </p>

        <div className="mb-[30px] flex justify-end gap-[20px]">
          <button
            type="button"
            className={classNames(
              'text-primary border hover:bg-[rgb(90,47,132,.2)] transition-all duration-200  border-primary p-[7px_40.23px]',
              btnStyle
            )}
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleYesClick}
            className={classNames(
              'bg-[#EC4242] hover:bg-[#9c2b2b] p-[8px_36.4px] transition-all duration-200 text-white',
              btnStyle
            )}
          >
            Remove
          </button>
        </div>
      </>
    </CModal>
  );
};

export default DeleteModal;
