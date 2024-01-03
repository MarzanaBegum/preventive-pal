import EyeIcon from '@/components/Icons/EyeIcon';
import EyeSlashIcon from '@/components/Icons/EyeSlashIcon';
import { useController, UseControllerProps } from 'react-hook-form';

type Props = {} & UseControllerProps<any>;

const FooterHiddenToggle = (props: Props) => {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <button
      type="button"
      className="cursor-pointer h-fit mt-[9.5px] outline-none"
      onClick={() => {
        field.onChange(!field.value);
      }}
    >
      {field.value ? <EyeSlashIcon /> : <EyeIcon />}
    </button>
  );
};

export default FooterHiddenToggle;
