import AdminSettingModal from '@/components/AdminSettingModal';
import UserIcon from '@/components/Icons/UserIcon';
import { useOutsideClick } from 'outsideclick-react';
import { useState } from 'react';
import AdminHeaderDropdown from '../AdminHeaderDropdown/AdminHeaderDropdown';
import LogoutModal from '../AdminHeaderDropdown/LogoutModal';

function AdminTopDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  const dropdownRef = useOutsideClick(() => {
    setDropdownOpen(false);
  });
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-[8px] focus:outline-none group"
        onClick={() => setDropdownOpen((p) => !p)}
      >
        <p className="text-[#727272] hover:text-primary trans font-medium leading-[19.2px]">
          Admin
        </p>
        <UserIcon />
      </button>
      {dropdownOpen && (
        <AdminHeaderDropdown
          handleClick={(i) => {
            i === 1 && setLogoutModal(true);
            i === 0 && setSettingsModal(true);
            setDropdownOpen(false);
          }}
          setIsDropdownOpen={setDropdownOpen}
        />
      )}
      <LogoutModal
        open={logoutModal}
        setOpen={setLogoutModal}
        setIsDropdownOpen={setLogoutModal}
      />
      <AdminSettingModal
        open={settingsModal}
        setOpen={setSettingsModal}
        setIsDropdownOpen={setSettingsModal}
      />
    </div>
  );
}

export default AdminTopDropdown;
