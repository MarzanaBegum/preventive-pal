import LeftAlignIcon from '@/assets/icons/LeftAlignIcon';
import RightAlignIcon from '@/assets/icons/RightAlignIcon';
import cx from 'classnames';
import { UseControllerProps, useController } from 'react-hook-form';

type IAFprops = {} & UseControllerProps<any>;

function ImageAlignField(props: IAFprops) {
  const { field } = useController({ ...props, defaultValue: 'left' });
  return (
    <div className=" flex gap-[16px]">
      <div
        onClick={() => {
          field.onChange('left');
        }}
        className={cx(
          'p-[14px_20px] w-1/2  justify-center border border-[#E5DDED] rounded-[6px] flex items-center gap-[6px] cursor-pointer',
          field.value === 'left'
            ? 'bg-[#7A49AA] text-white'
            : 'bg-[#EBE1F5] text-[#444444]'
        )}
      >
        <LeftAlignIcon left={field.value === 'left'} />
        <p className="font-medium text-[16px] leading-[19px]">Left</p>
      </div>
      <div
        onClick={() => {
          field.onChange('right');
        }}
        className={cx(
          'p-[14px_20px] w-1/2  justify-center border border-[#E5DDED] rounded-[6px] flex items-center gap-[6px] cursor-pointer',
          field.value === 'right'
            ? 'bg-[#7A49AA] text-white'
            : 'bg-[#EBE1F5] text-[#444444]'
        )}
      >
        <RightAlignIcon right={field.value === 'right'} />
        <p className="font-medium text-[16px] leading-[19px]">Right</p>
      </div>
    </div>
  );
}

export default ImageAlignField;
