import { useEffect } from 'react';

const useScrollbarToggle = (trigger: boolean) => {
  useEffect(() => {
    if (trigger) {
      document.querySelector('body')?.classList.add('overflow-hidden');
    } else {
      setTimeout(() => {
        document.querySelector('body')?.classList.remove('overflow-hidden');
      }, 2100);
    }
  }, [trigger]);
};

export default useScrollbarToggle;
