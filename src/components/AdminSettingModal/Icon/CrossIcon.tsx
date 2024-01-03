import { SVGProps } from 'react';

interface IconProps {
    stroke?: string
}

function CrossIcon({ stroke = '#717171', ...props }: IconProps) {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.69629 16.3027L16.3029 5.69613" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.3029 16.3039L5.69629 5.69727" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>



    );
}

export default CrossIcon;