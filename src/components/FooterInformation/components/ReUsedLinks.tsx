import CustomInputField from "../../FormField/CustomInputField";
import HiddenToggleBtn from "./HiddenToggleBtn";

interface ReUsedLinkFieldType {
    onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueText: string;
    onChangeLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueLink: string;
    isDisabled?: boolean;
    isHidden: boolean | undefined;
    handleHidden: React.MouseEventHandler<HTMLButtonElement>;
}

function ReUsedLinkField({
    onChangeText,
    valueText,
    onChangeLink,
    valueLink,
    isDisabled,
    isHidden,
    handleHidden
}: ReUsedLinkFieldType) {
    return (
        <div className="flex flex-row items-center gap-x-[15px]">
            <div className="flex-1">
                <CustomInputField
                    placeholder="Enter link text"
                    type="text"
                    name="linkText"
                    onChange={onChangeText}
                    value={valueText}
                    disabled={isDisabled || isHidden}
                />
            </div>
            <div className="flex-1">
                <CustomInputField
                    placeholder="Enter link"
                    type="text"
                    name="link"
                    onChange={onChangeLink}
                    value={valueLink}
                    disabled={isDisabled || isHidden}
                />
            </div>

            <HiddenToggleBtn isHidden={isHidden} handleHidden={handleHidden} />
        </div>
    );
}

export default ReUsedLinkField