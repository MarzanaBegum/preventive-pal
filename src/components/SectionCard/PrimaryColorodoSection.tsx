import OutsideClickDetector from "@/utils/OutsideClickDetector ";
import { useState } from "react";
import { useColor } from 'react-color-palette';
import PickColor from "../PickColor";

const PrimaryColorodoSection = () => {
    const [color, setColor] = useColor('hex', '#121212');

    const [headerColor, setHeaderColor] = useState("");
    const [subHeaderColor, setSubHeaderColor] = useState("");
    const [descriptionColor, setDiscriptionColor] = useState("");

    const [isHeaderPopup, setIsHeaderPopup] = useState(false);
    const [isSubHeaderPopup, setIsSubheaderPopup] = useState(false);
    const [isDescriptionPopup, setIsDescriptionPopup] = useState(false);

    const [header, setHeader] = useState("");
    const [subHeader, setSubHeader] = useState("");
    const [description, setDescription] = useState("");
    return (
        <>
            <div className="h-auto bg-white ">
                <div className="px-[16px] py-[16px]">
                    <h2 className="mb-4 font-bold">Primary Colorado section</h2>
                    <form action="">
                        <div className='relative '>
                            <OutsideClickDetector onOutsideClick={() => setIsHeaderPopup(false)}>
                                <div style={{ backgroundColor: `${headerColor}` }} onClick={() => setIsHeaderPopup(!isHeaderPopup)} className='w-[30px] h-[20px] bg-primary absolute top-[2px] left-[60px] cursor-pointer'>

                                </div>
                                {isHeaderPopup === true && <PickColor color={color} setColor={setColor} SetColorState={setHeaderColor} colorValue={color.hex} />}
                            </OutsideClickDetector>
                            <CustomInputField
                                label="Header"
                                placeholder="Enter a header"
                                type="text"
                                name="header"
                                labelFor="Header"
                                handleOnChange={(e) => setHeader(e)}
                            />


                        </div>
                        <div className='relative '>
                            <OutsideClickDetector onOutsideClick={() => setIsSubheaderPopup(false)}>
                                <div style={{ backgroundColor: `${subHeaderColor}` }} onClick={() => setIsSubheaderPopup(!isSubHeaderPopup)} className='w-[30px] h-[20px] bg-primary absolute top-[2px] left-[90px] cursor-pointer'>

                                </div>
                                {isSubHeaderPopup === true && <PickColor color={color} setColor={setColor} SetColorState={setSubHeaderColor} colorValue={color.hex} />}
                            </OutsideClickDetector>
                            <CustomInputField
                                label="Sub Header"
                                placeholder="Enter a sub header"
                                type="text"
                                name="header"
                                labelFor="Header"
                                handleOnChange={(e) => setSubHeader(e)}
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
                                handleOnChange={(e) => setDescription(e)}
                            />
                        </div>
                        <div className="flex justify-end mt-4 gap-[16px]">
                            <button className="py-[8px] px-[12px] bg-[#C70000] rounded-[8px] text-white">Cancle</button>
                            <button className="py-[8px] px-[12px] bg-primary rounded-[8px] text-white">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PrimaryColorodoSection;

interface CustomFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    labelFor: string;
    handleOnChange: (e: any) => void;
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
                onChange={(e: any) => handleOnChange(e.target.value)}
            />
        </div>
    );
}