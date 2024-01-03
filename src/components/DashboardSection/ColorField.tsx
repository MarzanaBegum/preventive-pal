import { useOutsideClick } from 'outsideclick-react';
import { useState } from 'react';
import { ColorPicker, toColor } from 'react-color-palette';
import { UseControllerProps, useController } from 'react-hook-form';

function ColorField(props: UseControllerProps<any>) {
  const { field } = useController(props);

  const [open, setOpen] = useState(false);

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          setOpen(true);
        }}
        style={{ backgroundColor: (field.value as string) || '#333' }}
        className="w-[20px] border h-[20px] rounded-full cursor-pointer"
      ></div>
      {open && (
        <div className="absolute  w-[300px] h-[200px] z-[50] right-[-50px]">
          <ColorPicker
            width={250}
            height={150}
            color={toColor('hex', (field.value as string) || '#333')}
            onChange={(e) => {
              field.onChange(e.hex);
            }}
            hideRGB
            hideHSV
            dark
          />
        </div>
      )}
    </div>
  );
}

export default ColorField;
