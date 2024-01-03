import useClickOutside from '@/hooks/useClickOutside';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

const langs = {
  en: 'English',
  spa: 'Español',
};

type LangDProps = {
  lang: 'en' | 'spa';
  setLang: Dispatch<SetStateAction<'en' | 'spa'>>;
};

const AdminLanguageDropdown = ({ lang = 'en', setLang }: LangDProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowDropdown(false));

  return (
    <div className="relative" ref={ref}>
      <div className={classNames('flex items-center justify-between')}>
        <div
          className={classNames(
            'flex  items-center justify-between cursor-pointer gap-[8.5px] py-[10px] w-full rounded-[6px] bg-white group transition-all duration-300 group px-[12px]'
          )}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span
            className={classNames(
              ' text-[13px] font-medium leading-[17.76px]',
              'text-[#464C53]'
            )}
          >
            {langs[lang]}
          </span>
          <div>
            <svg
              className="w-[20px] h-[20px] stroke-secondary-text"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {showDropdown && (
        <div className="absolute w-full right-0 top-[calc(100%+2px)] z-[99] ">
          <div
            style={{ boxShadow: ' 0px 4px 15px rgba(150, 150, 150, 0.25)' }}
            onClick={() => {
              setLang(lang == 'en' ? 'spa' : 'en');
              setShowDropdown(!showDropdown);
            }}
            className={classNames(
              'text-[#464C53] text-[13px] font-medium leading-[17.76px] py-[10px] rounded-[6px] bg-white hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 relative flex items-center justify-start gap-[8.5px] px-[12px]'
            )}
          >
            <span>{langs[lang === 'en' ? 'spa' : 'en']}</span>
            <div>
              <svg
                className={classNames(
                  'w-[20px] h-[20px] opacity-0stroke-secondary-text'
                )}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLanguageDropdown;
