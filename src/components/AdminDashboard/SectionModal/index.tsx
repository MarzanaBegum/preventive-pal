import { customStyles } from '@/components/ColorPickModal/constant';
import ReactModal from 'react-modal';
import CustomTextImgSection from '../../AdminSectionForm/AddNewSectionForm';
import CustomTextSection from './CustomTextSection';

type SMType = {
  isOpen: boolean;
  handleModal: () => void;
  type: string;
};

function SectionModal({ handleModal, isOpen, type }: SMType) {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleModal}
        style={customStyles}
      >
        <div className="bg-[rgba(255,255,255,.8)] max-h-[95vh] overflow-y-auto w-[350px] md:w-[500px] lg:w-[800px] xl:w-[900px]  p-[15px] md:p-[30px]">
          {type === 'custom-text' && (
            <CustomTextSection handleModal={handleModal} />
          )}{' '}
          {type === 'custom-text-img' && (
            <CustomTextImgSection handleModal={handleModal} />
          )}
        </div>
      </ReactModal>
    </div>
  );
}

export default SectionModal;
