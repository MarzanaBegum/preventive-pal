import React, { useEffect } from 'react';
import { ColorPicker } from 'react-color-palette';

interface PickColorProps {
    color: any;
    setColor: any;
    SetColorState: React.Dispatch<React.SetStateAction<string>>;
    colorValue: string;
    className?: string;
}
const PickColor = ({ color, setColor, SetColorState, colorValue, className }: PickColorProps) => {
    useEffect(() => {
        SetColorState(colorValue);
    }, [color])

    return (
        <div className={`absolute top-[28px] left-[115px] w-[300px] h-[200px] z-[50] ${className}`}>
            <ColorPicker width={340} height={200} color={color} onChange={setColor} hideRGB hideHSV dark />
        </div>
    )
};

export default PickColor;