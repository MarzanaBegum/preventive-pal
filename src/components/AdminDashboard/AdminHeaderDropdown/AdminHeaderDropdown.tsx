import LogoutIcon from '@/components/Icons/LogoutIcon';
import SettingIcon from '@/components/Icons/SettingIcon';
import { profileDropDataType } from '@/utils/types';
import classNames from 'classnames';
import { useState } from 'react';

const profileDropDatas: profileDropDataType[] = [
  { _id: 'pDropData1', icon: <SettingIcon />, text: 'Admin Setting', link: '' },
  { _id: 'pDropData2', icon: <LogoutIcon />, text: 'Logout', link: '' },
];

interface Props {
  setIsDropdownOpen: any;
  handleClick: (i: number) => void;
}

const AdminHeaderDropdown = ({ setIsDropdownOpen, handleClick }: Props) => {
  // states
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="absolute right-0 mt-3 w-[125px] bg-white shadow-[0px_4px_15px_rgba(150,150,150,0.25)] rounded-[8px]">
        <ul>
          {profileDropDatas.map((item: profileDropDataType, index: number) => (
            <li
              key={item._id}
              className={classNames(index === 0 && 'border-b border-[#F9F9FA]')}
            >
              <button
                className={classNames(
                  'flex items-center text-[#464C53] hover:text-white hover:bg-primary trans text-[13px] font-medium gap-[6px] p-[8px] group w-full',
                  index === 0 ? 'rounded-t-[8px]' : 'rounded-b-[8px]'
                )}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {item.icon}
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminHeaderDropdown;
