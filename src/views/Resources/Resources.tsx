import { DataProps, IResourceData } from '@/utils/types';
import MoreResources from './components/MoreResources';

const Resources = ({ d }: DataProps<IResourceData>) => {

  return (
    <section section-name="More Resources" id={d.id} className="scroll-section">
      <MoreResources d={d} />
    </section>
  );
};

export default Resources;
