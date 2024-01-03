import { useState } from 'react';
import ChangeEmailOtp from '../SubSection/ChangeEmailOtp';
import EmailChange from '../SubSection/EmailChange';
import EmailVerified from '../SubSection/EmailVerified';
import PersonalInformationCard from '../SubSection/PersonalInformationCard';
import VerifyCurrentEmail from '../SubSection/VerifyCurrentEmail';
import VerifyCurrentEmailByOtp from '../SubSection/VerifyCurrentEmailByOtp';



interface Props {
    setOpen: (open: boolean) => void;
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}

const PersonalInformation = ({ setOpen, setIsDropdownOpen }: Props) => {

    // states
    const [sectionState, setSectionState] = useState("personal-information");
    const [changedEmail, setChangedEmail] = useState("");

    return (
        <>
            {sectionState === "personal-information" && <PersonalInformationCard setOpen={setOpen} setIsDropdownOpen={setIsDropdownOpen} setSectionState={setSectionState} />}
            {sectionState === "current-email-verify" && <VerifyCurrentEmail setSectionState={setSectionState} />}
            {sectionState === "current-email-otp-verify" && <VerifyCurrentEmailByOtp setSectionState={setSectionState} />}
            {sectionState === "change-email" && <EmailChange setSectionState={setSectionState} setChangedEmail={setChangedEmail} />}
            {sectionState === "change-email-otp" && <ChangeEmailOtp setSectionState={setSectionState} changedEmail={changedEmail} />}
            {sectionState === "verify-email" && <EmailVerified setSectionState={setSectionState} />}
        </>
    );
};

export default PersonalInformation;
