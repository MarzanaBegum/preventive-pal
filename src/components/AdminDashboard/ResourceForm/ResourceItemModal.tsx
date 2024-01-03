import { customStyles } from '@/components/ColorPickModal/constant';
import ColorField from '@/components/DashboardSection/ColorField';
import InputField from '@/components/DashboardSection/InputField';
import React from 'react';
import ReactModal from 'react-modal';

const ResourceItemModal = ({ handleModal, isOpen, index, lang, control, register }: any) => {
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleModal}
        style={customStyles}
      >
        <div className="bg-[rgba(255,255,255,.8)] max-h-[95vh] overflow-y-auto w-[350px] md:w-[500px] lg:w-[800px] xl:w-[900px]  p-[15px] md:p-[30px]">
          <div className="flex flex-col gap-5">
            <InputField
              {...register(`${lang}.resourcesData.${index}.title`)}
              label="Title"
              placeholder="Enter title"
            />
            <div className="grid grid-cols-2 gap-5">
              <InputField
                {...register(`${lang}.resourcesData.${index}.img`)}
                label="Image"
                type="file"
              />
              <InputField
                {...register(`${lang}.resourcesData.${index}.link`)}
                label="Link"
                placeholder="Enter link"
                className="w-full"
              />
              <div className="flex items-center gap-3">
                <div>Background Color</div>
                <ColorField
                  name={`${lang}.resourcesData.${index}.bgColor` as any}
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default ResourceItemModal;