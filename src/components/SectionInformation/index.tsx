import OutsideClickDetector from '@/utils/OutsideClickDetector ';
import React, { useEffect, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

const SectionInformation = () => {
    const [color, setColor] = useColor('hex', '#121212');

    const [headerColor, setHeaderColor] = useState("");
    const [subHeaderColor, setSubHeaderColor] = useState("");
    const [descriptionColor, setDiscriptionColor] = useState("");

    const [isHeaderPopup, setIsHeaderPopup] = useState(false);
    const [isSubHeaderPopup, setIsSubheaderPopup] = useState(false);
    const [isDescriptionPopup, setIsDescriptionPopup] = useState(false);
    return (
        <>
            {/* ########## LEFT SECTION ############## */}
            <div className='w-[90%]  lg:w-[58%] '>
                <div className="border border-gray rounded-[8px] ">
                    <div className="px-[18px] py-[18px]">
                        <h1 className="lg:text-[24px] md:text-[20px] text-[14px] lg:leading-[29px] md:leading-[24px] leading-[17px] font-medium tracking-[0.2em] uppercase text-[#331F1A]   w-[559px] mx-auto md:w-[100%] md:mx-0 lg:mb-[1px] md:mb-[4px] ">
                            Section information:
                        </h1>

                        <div className="mt-4">
                            <form action="">
                                <CustomInputField
                                    label="Section name"
                                    placeholder="Enter section name"
                                    type="text"
                                    name="section name"
                                    labelFor="section name"
                                    handleOnChange={() => console.log()}
                                />

                                <div className='relative '>
                                    <OutsideClickDetector onOutsideClick={() => setIsHeaderPopup(false)}>
                                        <div style={{ backgroundColor: `${headerColor}` }} onClick={() => setIsHeaderPopup(!isHeaderPopup)} className='w-[30px] h-[20px] bg-primary absolute top-[2px] left-[115px] cursor-pointer'>

                                        </div>
                                        {isHeaderPopup === true && <PickColor color={color} setColor={setColor} SetColorState={setHeaderColor} colorValue={color.hex} />}
                                    </OutsideClickDetector>
                                    <CustomInputField
                                        label="Section Header"
                                        placeholder="Enter a header"
                                        type="text"
                                        name="header"
                                        labelFor="Header"
                                        handleOnChange={() => console.log()}
                                    />


                                </div>

                                <div className='relative'>
                                    <OutsideClickDetector onOutsideClick={() => setIsSubheaderPopup(false)}>
                                        <div style={{ backgroundColor: `${subHeaderColor}` }} onClick={() => setIsSubheaderPopup(!isSubHeaderPopup)} className='w-[30px] h-[20px] absolute top-[2px] left-[90px] cursor-pointer bg-primary'>

                                        </div>
                                        {isSubHeaderPopup === true && <PickColor color={color} setColor={setColor} SetColorState={setSubHeaderColor} colorValue={color.hex} className='!left-[90px]' />}
                                    </OutsideClickDetector>
                                    <CustomInputField
                                        label="Sub Header"
                                        placeholder="Enter a sub header"
                                        type="text"
                                        name="sub header"
                                        labelFor="Header"
                                        handleOnChange={() => console.log()}
                                    />
                                </div>

                                <div className='relative'>
                                    <OutsideClickDetector onOutsideClick={() => setIsDescriptionPopup(false)}>
                                        <div style={{ backgroundColor: `${descriptionColor}` }} onClick={() => setIsDescriptionPopup(!isDescriptionPopup)} className='w-[30px] h-[20px] absolute top-[2px] left-[90px] cursor-pointer bg-primary'>

                                        </div>
                                        {isDescriptionPopup === true && <PickColor color={color} setColor={setColor} SetColorState={setDiscriptionColor} colorValue={color.hex} className='!left-[90px]' />}
                                    </OutsideClickDetector>
                                    <CustomInputField
                                        label="Description"
                                        placeholder="Enter a description"
                                        type="text"
                                        name="description"
                                        labelFor="description"
                                        handleOnChange={() => console.log()}
                                    />
                                </div>


                                <CustomInputField
                                    label="Section Gif"
                                    type="file"
                                    name="section gif"
                                    labelFor="section gif"
                                    handleOnChange={() => console.log()}
                                />


                                <div className="flex justify-end mt-4">
                                    {' '}
                                    <button className="font-bold text-primary">
                                        + Add Resources
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <CustomInputField
                                        label="Resource Icon"
                                        type="file"
                                        name="resource icon"
                                        labelFor="resource icon"
                                        handleOnChange={() => console.log()}
                                    />
                                    <CustomInputField
                                        label="Resource title"
                                        type="text"
                                        name="resource title"
                                        labelFor="resource title"
                                        handleOnChange={() => console.log()}
                                    />
                                    <CustomInputField
                                        label="Resource link"
                                        type="text"
                                        name="resource link"
                                        labelFor="resource link"
                                        handleOnChange={() => console.log()}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button className="bg-primary tex-white rounded-[8px] text-white px-[12px] py-[8px]">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* ########## LEFT SECTION END ##############  */}
        </>
    );
};

export default SectionInformation;



interface CustomFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    labelFor: string;
    handleOnChange: () => void;
    name: string;
}
 
function CustomInputField({
    label,
    type,
    placeholder,
    labelFor,
    handleOnChange,
    name,
}: CustomFieldProps) {
    const labelStyle =
        'font-semibold text-[14px] leading-[19.07px] lg:text-[16px] lg:leading-[22px] text-[#101010] inline-block';
    const inputStyle =
        'outline-[#E0E0E0] w-[100%] focus:outline-none h-[55px] text-[#6D6D6D] bg-[#FFFFFF] text-[14px] font-normal border border-[#E0E0E0] rounded mt-[10px] px-[20px] py-[18px] mb-[10px]';

    return (
        <div className="flex flex-col ">

            <label className={`${labelStyle}`} htmlFor={labelFor}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className={`${inputStyle}`}
                name={name}
                onChange={handleOnChange}
            />
        </div>
    );
}

// pick color function

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
}
