import EyeIcon from '@/components/Icons/EyeIcon';
import EyeSlashIcon from '@/components/Icons/EyeSlashIcon';
import React from 'react';

type Props = {
    isHidden: boolean | undefined;
    handleHidden: React.MouseEventHandler<HTMLButtonElement>;
}

const HiddenToggleBtn = ({ isHidden, handleHidden }: Props) => {
    return (
        <button type='button' className="cursor-pointer outline-none" onClick={handleHidden}>
            {isHidden ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
    )
}

export default HiddenToggleBtn