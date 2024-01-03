import { adminTab } from '@/utils/AdminTab';
import classNames from 'classnames';
import { useState } from 'react';
import { NewCustomModal } from '../CustomModal';
import CrossIcon from './Icon/CrossIcon';
import AdminAndModerator from './RightInputField/AdminAndModerator';
import PasswordSetting from './RightInputField/PasswordSetting';
import PersonalInformation from './RightInputField/PersonalInformation';

interface AdminSettinProps {
  open: any;
  setOpen: any;
  setIsDropdownOpen: any;
}

const AdminSettingModal = ({
  open,
  setOpen,
  setIsDropdownOpen,
}: AdminSettinProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [tabState, setTabState] = useState('personal-information');
  const [activeValue, setActiveValue] = useState('');

  return (
    <NewCustomModal isModalOpen={open} setIsModalOpen={setOpen}>
      <div className="lg:w-[992px] mx-auto w-screen md:w-[740px] h-screen md:h-[596px] lg:h-[620px] bg-white md:bg-[#F9F6FC] rounded-[12px]">
        <div
          onClick={() => setIsDropdownOpen(false)}
          className="absolute top-[35px] right-[45px] cursor-pointer"
        >
          <CrossIcon stroke="#464C53" />
        </div>
        <div className=" md:px-[30px] lg:px-[40px] pt-[40px] pb-[35px]">
          <h1 className="text-[#2D2D2D] font-bold text-[24px] leading-[28.8px] tracking-[10%] pl-[20px] md:pl-0">
            Admin Setting
          </h1>
          <div className="flex flex-col md:flex-row gap-[30px] mt-[30px]">
            {/* left section  */}
            <div className="w-[90%] mx-auto lg:w-[288px]">
              <div className="flex flex-col gap-[20px]">
                {adminTab.map(({ title, value, Icon, id }: any, index) => (
                  <div
                    onClick={() => {
                      setTabState(value);
                      setActiveValue(value);
                    }}
                    onMouseOver={() => {
                      setMouseOver(true);
                      setActiveTab(index);
                    }}
                    onMouseLeave={() => setMouseOver(false)}
                    key={index}
                    className={classNames(
                      'group border border-[#E5DDED] rounded-[10px] bg-white cursor-pointer hover:bg-primary hover:border-primary',
                      value === tabState && '!bg-primary !text-white'
                    )}
                  >
                    <div className="px-[20px] py-[16px] flex gap-[12px]">
                      <Icon
                        stroke={
                          (mouseOver && index === activeTab) ||
                          value === tabState
                            ? `white`
                            : '#717171'
                        }
                      />
                      <h3
                        className={classNames(
                          'font-semibold  text-[18px] leading-[25px] group-hover:text-white',
                          value === tabState ? 'text-white' : 'text-[#717171]'
                        )}
                      >
                        {title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right section  */}
            <div className="md:w-[375px] max-md:mx-auto w-[90%] lg:w-[604px]">
              {tabState === 'personal-information' && (
                <PersonalInformation
                  setOpen={setOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
              {tabState === 'admin-moderators' && (
                <AdminAndModerator
                  setOpen={setOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
              {tabState === 'password-setting' && (
                <PasswordSetting
                  setOpen={setOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </NewCustomModal>
  );
};

export default AdminSettingModal;
