import { UseControllerProps, useController } from 'react-hook-form';

type TextToggleProps = {} & UseControllerProps<any>;

function TextToggle({ ...props }: TextToggleProps) {
  const { field } = useController(props);

  return (
    <div>
      <label
        htmlFor="themeSwitcherOne"
        className="themeSwitcherTwo shadow relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1"
      >
        <input
          type="checkbox"
          name="themeSwitcherOne"
          id="themeSwitcherOne"
          className="sr-only"
        />
        <span className="light text-primary bg-gray flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium">
          Left
        </span>
        <span className="dark text-body-color flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium">
          Right
        </span>
      </label>
    </div>
  );
}

export default TextToggle;
