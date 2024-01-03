import { ILang, InformationLinks } from '@/utils/types';
import FList from '../partials/FList';

type FLProps = {
  data: InformationLinks;
  lang: ILang;
};

const ThirdList = ({ data, lang }: FLProps) => {
  return (
    <div className="w-[335px] md:w-[245px] lg:w-[280px] xl:w-[380px]">
      <FList data={data} lang={lang} />
    </div>
  );
};

export default ThirdList;
