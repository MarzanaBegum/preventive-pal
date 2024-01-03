import AddNewSectionForm from '@/components/AdminSectionForm/AddNewSectionForm';
import ColoradoCustomForm from '@/components/AdminSectionForm/ColoradoCustomForm';
import CustomTextImgForm from '@/components/AdminSectionForm/CustomTextImgForm';
import EditMenuForm from '@/components/AdminSectionForm/EditMenuForm';
import FooterSectionForm from '@/components/AdminSectionForm/FooterSectionForm';
import HeroSecForm from '@/components/AdminSectionForm/HeroCustomForm';
import { useAdminData } from '@/context/AdminData';
import { useMemo } from 'react';
import ColoradoSliderForm from '../../AdminSectionForm/ColoradoSliderForm';
import CustomTextForm from '../../AdminSectionForm/CustomTextForm';
import { SelectStateType } from '../AdminLayout';
import ResourceForm from '../ResourceForm/ResourceForm';

type ALLProps = {
  selectState: SelectStateType;
};

const AdminLayoutRight = ({ selectState }: ALLProps) => {
  const { rootData } = useAdminData();

  const [selectId] = selectState;

  const selectData = useMemo(() => {
    return rootData.find((v) => v.id === selectId);
  }, [rootData, selectId]);

  return (
    <>
      {/* Hero section form @TODO:Done  */}
      {selectData?.type === 'hero' && (
        <HeroSecForm defaultData={selectData as any} />
      )}

      {/* New Section  */}
      {selectId === 'new' && <AddNewSectionForm selectState={selectState} />}

      {/* Primary Prevention section form @TODO:Done  */}
      {(selectData?.type === 'primary-prevention' ||
        selectData?.type === 'custom-text') && (
        <CustomTextForm defaultData={selectData as any} />
      )}

      {/* Colorado here section form @TODO:Done  */}
      {selectData?.type === 'colorado-hero' && (
        <ColoradoCustomForm defaultData={selectData as any} />
      )}

      {selectData?.type === 'custom-text-img' && (
        <CustomTextImgForm defaultData={selectData as any} />
      )}
      {selectData?.type === 'colorado-slider' && (
        <ColoradoSliderForm data={selectData} />
      )}
      {selectData?.type === 'resources' && <ResourceForm data={selectData} />}
      {/* {selectData?.type === 'footer' && <FooterInformation data={selectData} />} */}
      {selectData?.type === 'footer' && (
        <FooterSectionForm data={selectData as any} />
      )}

      {selectId === 'editMenu' && <EditMenuForm />}
    </>
  );
};

export default AdminLayoutRight;
