import classNames from 'classnames';
import React from 'react';
import CloseIcon from '../Icons/CloseIcon';

export type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    title?: string;
    modalCss?: string;
};

const CModal = ({ children, open, setOpen, modalCss, title }: ModalProps) => {

    // return
    if (!open) return <></>;

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">

            <div
                className={`absolute top-0 bottom-0 left-0 right-0 bg-[#00000047]`}
                onClick={() => setOpen(false)}
            >
            </div>

            <div className={classNames(
                'rounded-[8px] max-h-[95vh] overflow-y-auto no-scrollbar z-10 relative bg-white',
                modalCss
            )}>


                <div className={classNames(
                    'flex py-[23px] px-[30px]',
                    title ? 'justify-between items-center border-b border-[#D9D9D9]' : 'justify-end'
                )}>
                    {title ? <p className="text-[20px] font-semibold leading-[24px] cursor-default">
                        {title}
                    </p> : null}

                    <button type='button' onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </button>
                </div>

                <div className={`relative px-[30px]`}>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default CModal;
