import { SVGProps } from 'react';

interface IconProps {
    stroke?: string
}

function ModeratorIcon({ stroke = '#717171', ...props }: IconProps) {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M18.5 20H14.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 22V18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.1596 11.37C12.0596 11.36 11.9396 11.36 11.8296 11.37C9.44961 11.29 7.55961 9.34 7.55961 6.94C7.54961 4.49 9.53961 2.5 11.9896 2.5C14.4396 2.5 16.4296 4.49 16.4296 6.94C16.4296 9.34 14.5296 11.29 12.1596 11.37Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.99 22.3097C10.17 22.3097 8.36004 21.8497 6.98004 20.9297C4.56004 19.3097 4.56004 16.6697 6.98004 15.0597C9.73004 13.2197 14.24 13.2197 16.99 15.0597" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


    );
}

export default ModeratorIcon;