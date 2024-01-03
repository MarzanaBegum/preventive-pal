import AddCircleIcon from '@/components/Icons/AddCircleIcon';
import RemoveCircleIcon from '@/components/Icons/RemoveCircleIcon';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  // label: string;
  addMoreField: boolean;
};

const AddMoreBtn = ({ onClick, addMoreField }: Props) => {
  return (
    <button
      type="button"
      className="font-primary font-semibold text-[19px] flex items-center gap-[6px] text-primary"
      onClick={onClick}
    >
      {!addMoreField ? (
        <>
          <AddCircleIcon /> Add More
        </>
      ) : (
        <>
          <RemoveCircleIcon /> Remove
        </>
      )}
    </button>
  );
};

export default AddMoreBtn;
