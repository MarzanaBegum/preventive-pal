import LockIcon from "@/components/AdminSettingModal/Icon/LockIcon";
import ModeratorIcon from "@/components/AdminSettingModal/Icon/ModeratorIcon";
import UserIcon from "@/components/AdminSettingModal/Icon/UserIcon";

export const adminTab = [
    {
        Icon: UserIcon,
        title: "Presonal Information",
        value: "personal-information"
    },
    {
        Icon: ModeratorIcon,
        title: "Admins & Moderators",
        value: "admin-moderators"
    },
    {
        Icon: LockIcon,
        title: "Password Setting",
        value: "password-setting"
    }
]