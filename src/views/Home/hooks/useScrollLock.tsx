import { useCallback } from 'react';

function useScrollLock() {
  const lockScroll = useCallback(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflowY = 'hidden';
    document.body.style.width = `calc(100vw-${scrollBarCompensation}px)`;
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflowY = '';
    document.body.style.width = '100vw';
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
}

export default useScrollLock;
