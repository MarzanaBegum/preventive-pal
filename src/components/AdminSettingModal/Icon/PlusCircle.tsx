
interface IconProps {
    stroke?: string
}

function PlusCircle({ stroke = '#717171', ...props }: IconProps) {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.49967 15.1673C12.1663 15.1673 15.1663 12.1673 15.1663 8.50065C15.1663 4.83398 12.1663 1.83398 8.49967 1.83398C4.83301 1.83398 1.83301 4.83398 1.83301 8.50065C1.83301 12.1673 4.83301 15.1673 8.49967 15.1673Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.83301 8.5H11.1663" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 11.1673V5.83398" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>



    );
}

export default PlusCircle;