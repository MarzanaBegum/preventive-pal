import { useLangContext } from '@/context/LangContext';
import useClickOutside from '@/hooks/useClickOutside';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

interface Props {
  color: 'white' | 'black';
}

const LanguagueButton = ({ color }: Props) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const { language, setLanguage } = useLangContext();

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowDrop(false));

  const router = useRouter();
  // const {locale} = router
  const key = 'GET_LANGUAGE';

  useEffect(() => {
    const savedLang = JSON.parse(localStorage.getItem(key) || 'null');
    if (savedLang) {
      setLanguage(savedLang.language);
      if (savedLang.language === 'English') {
        const locale = 'en';
        router.push('/', '/', { locale });
      } else {
        const locale = 'spa';
        router.push('/', '/', { locale });
      }
    }
  }, []);

  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  const handleChangeLang = () => {
    if (language === 'English') {
      setLanguage('Español');
      const locale = 'spa';
      router.push('/', '/', { locale });
      localStorage.setItem(key, JSON.stringify({ language: 'Español' }));
    } else {
      setLanguage('English');
      const locale = 'en';
      router.push('/', '/', { locale });
      localStorage.setItem(key, JSON.stringify({ language: 'English' }));
    }
    setShowDrop(false);
  };
  return (
    <div className="relative" ref={ref}>
      <div
        className={classNames(
          'flex  items-center justify-center cursor-pointer gap-[8.5px] py-[10px] w-[97px] md:w-[105px] rounded-[6px] hover:bg-white group transition-all duration-300 group'
        )}
        onClick={handleClick}
      >
        <span
          className={classNames(
            ' text-[16px] font-semibold leading-[19px]',
            color === 'black' && 'text-secondary-text',
            color === 'white' &&
              'text-white group-hover:text-secondary-text transition-all duration-300 group'
          )}
        >
          {language}
        </span>
        <div>
          <svg
            // width="14"
            // height="14"
            className={classNames(
              'w-[20px] h-[20px] ',
              color === 'black' && 'stroke-secondary-text',
              color === 'white' &&
                'stroke-white group-hover:stroke-secondary-text'
            )}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              // stroke="#333333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {showDrop && (
        <div className="absolute left-0 top-[calc(100%+5px)] z-[99999] ">
          <div
            className={classNames(
              'text-secondary-text text-center text-[16px] font-semibold leading-[19px] py-[10px]  w-[105px]  rounded-[6px] hover:bg-white cursor-pointer transition-all duration-300 relative flex items-center justify-center gap-[8.5px]',
              color === 'black' &&
                'text-secondary-text transition-all duration-300',
              color === 'white' &&
                'text-white hover:text-secondary-text transition-all duration-300'
            )}
            onClick={handleChangeLang}
          >
            <span>{language === 'English' ? 'Español' : 'English'}</span>
            <div>
              <svg
                // width="14"
                // height="14"
                className={classNames(
                  'w-[20px] h-[20px] opacity-0',
                  color === 'black' && 'stroke-secondary-text',
                  color === 'white' &&
                    'stroke-white group-hover:stroke-secondary-text'
                )}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  // stroke="#333333"
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

export default LanguagueButton;
