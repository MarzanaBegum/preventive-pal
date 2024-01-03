import CModal from '@/components/CustomModal/CModal';
import cx from 'classnames';

type SDMprops = {
  open: boolean;
  setOpen: () => any;
  handleOnClick: () => any;
  header: string;
  description: string;
};

const btnStyle = 'rounded-[6px] font-semibold font-primary';

function SliderDeleteModal({
  open,
  setOpen,
  handleOnClick,
  header,
  description,
}: SDMprops) {
  return (
    <CModal
      open={open}
      setOpen={setOpen}
      title={header}
      modalCss="md:w-[599px]"
    >
      <>
        <p className="font-medium leading-[19px] mt-[20px] mb-[33px] font-primary text-[#000000]">
          {description}
        </p>

        <div className="mb-[30px] flex justify-end gap-[20px]">
          <button
            type="button"
            className={cx(
              'text-primary border hover:bg-primary hover:text-white transition-all duration-200 border-primary p-[7px_40.23px]',
              btnStyle
            )}
            onClick={setOpen}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleOnClick}
            className={cx(
              'bg-[#EC4242] hover:bg-[#a32e2e] transition-all duration-200 p-[8px_36.4px] text-white',
              btnStyle
            )}
          >
            Remove
          </button>
        </div>
      </>
    </CModal>
  );
}

export default SliderDeleteModal;
