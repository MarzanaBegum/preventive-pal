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

const LangDropdown = ({ lang = 'en', setLang }: LangDProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowDropdown(false));

  return (
    <div className="relative" ref={ref}>
      <div className={classNames('flex items-center justify-between')}>
        <p className="font-semibold text-[18px] leading-[140%] text-[#101010]">
          Change Language
        </p>
        <div
          className={classNames(
            'flex  items-center justify-center cursor-pointer gap-[8.5px] py-[10px] w-[105px] rounded-[6px] hover:bg-white group transition-all duration-300 group'
          )}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span
            className={classNames(
              ' text-[16px] font-semibold leading-[19px]',
              'text-secondary-text'
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
        <div className="absolute right-0 top-[calc(100%+0px)] z-[99] ">
          <div
            onClick={() => {
              setLang(lang == 'en' ? 'spa' : 'en');
              setShowDropdown(!showDropdown);
            }}
            className={classNames(
              'text-secondary-text text-center text-[16px] font-semibold leading-[19px] py-[10px]  w-[105px]  rounded-[6px] bg-white hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 relative flex items-center justify-center gap-[8.5px] '
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

export default LangDropdown;
