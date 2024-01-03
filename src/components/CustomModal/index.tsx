import React from 'react';

export type ModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  title?: string;
  modalCss?: string;
};

const CustomModal = ({
  children,
  isModalOpen,
  setIsModalOpen,
  modalCss,
  title,
}: ModalProps) => {
  if (!isModalOpen) return <></>;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 bg-[#00000069]`}
        onClick={() => setIsModalOpen(false)}
      ></div>

      <div className={`relative px-[30px]`}>{children}</div>
    </div>
  );
};

export function NewCustomModal({
  children,
  isModalOpen,
  setIsModalOpen,
  modalCss,
  title,
}: ModalProps) {
  if (!isModalOpen) return <></>;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 bg-[#00000069]`}
        onClick={() => setIsModalOpen(false)}
      ></div>

      <div className={`relative `}>{children}</div>
    </div>
  );
}

export default CustomModal;
