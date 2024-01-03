import cx from 'classnames';
import { useRouter } from 'next/router';
import { useOutsideClick } from 'outsideclick-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const langData = {
  en: 'English',
  spa: 'Español',
};

type ALProps = {
  langState: ['en' | 'spa', Dispatch<SetStateAction<'en' | 'spa'>>];
};

function AdminLanguage({ langState }: ALProps) {
  const [lang, setLang] = langState;

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const ref = useOutsideClick(() => {
    setShow(false);
  });

  const router = useRouter();

  useEffect(() => {
    setLang(router.locale as any);
  }, [router.locale]);

  return (
    <div ref={ref} className="relative">
      <div
        className={cx(
          'flex  items-center justify-center cursor-pointer gap-[8.5px] py-[10px] w-[105px] rounded-[6px] hover:bg-white group transition-all duration-300 group'
        )}
        onClick={handleShow}
      >
        <span
          className={cx(
            ' text-[16px] font-semibold leading-[19px]',
            'text-secondary-text'
          )}
        >
          {langData[lang]}
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

      {show && (
        <div className="absolute left-0 top-[calc(100%+5px)] z-[99999] ">
          <div
            onClick={() => {
              setLang(lang == 'en' ? 'spa' : 'en');
              handleShow();
              router.push('/admin/dashboard', '/admin/dashboard', {
                locale: lang == 'en' ? 'spa' : 'en',
              });
            }}
            className={cx(
              'text-secondary-text text-center text-[16px] font-semibold leading-[19px] py-[10px]  w-[105px]  rounded-[6px] hover:bg-white cursor-pointer transition-all duration-300 relative flex items-center justify-center gap-[8.5px] '
            )}
          >
            <span>{langData[lang == 'en' ? 'spa' : 'en']}</span>
            <div>
              <svg
                className={cx('w-[20px] h-[20px] opacity-0stroke-secondary-text')}
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
}

export default AdminLanguage;
