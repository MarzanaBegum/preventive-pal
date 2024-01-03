import { useEffect } from 'react';

function useClickOutside(ref: any, callback: Function) {
  // useEffect(() => {
  //   function handleClick(event: any) {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       callback();
  //     }
  //   }

  //   document.addEventListener('click', handleClick);
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, [ref, callback]);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
