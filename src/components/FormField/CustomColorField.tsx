import { useOutsideClick } from 'outsideclick-react';
import { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

function CustomColorField() {
  const [color, setColor] = useColor('hex', '#333' as any);

  const [open, setOpen] = useState(false);

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <div ref={ref}>
      <div
        onClick={() => {
          setOpen(true);
        }}
        style={{ backgroundColor: color.hex }}
        className="w-[20px] h-[20px] rounded-full"
      ></div>
      {open && (
        <div className="absolute  w-[300px] h-[200px] z-[50] ">
          <ColorPicker
            width={250}
            height={150}
            color={color}
            onChange={setColor}
            hideRGB
            hideHSV
            dark
          />
        </div>
      )}
    </div>
  );
}

export default CustomColorField;
