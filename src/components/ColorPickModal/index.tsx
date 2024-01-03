import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Modal from 'react-modal';
import { customStyles } from './constant';
import { useEffect } from "react";



interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  setColorState: React.Dispatch<React.SetStateAction<string>>;
}
const ColorModal = ({ closeModal, isModalOpen, setColorState }: ModalProps) => {

  const [color, setColor] = useColor("hex", "#121212");
  useEffect(() => {
    setColorState(color.hex);
  }, [color])
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      // contentLabel="Example Modal"
      >

        <ColorPicker width={340} height={200} color={color} onChange={setColor} hideRGB hideHSV dark />

      </Modal>
    </div>
  );
};

export default ColorModal;
