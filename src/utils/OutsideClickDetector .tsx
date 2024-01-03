import React, { useRef, useEffect } from 'react';

const OutsideClickDetector = ({ children, onOutsideClick }: any) => {
    const ref: any = useRef();

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onOutsideClick();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div ref={ref}>{children}</div>
    );
};

export default OutsideClickDetector;