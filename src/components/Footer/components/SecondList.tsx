import { ILang, InformationLinks } from '@/utils/types';
import FList from '../partials/FList';

type FLProps = {
  data: InformationLinks;
  lang: ILang;
};

const SecondList = ({ data, lang }: FLProps) => {
  return (
    <div className="w-[335px] md:w-[149px] lg:w-[194px] xl:w-[194px]">
      <FList data={data} lang={lang} />
    </div>
  );
};

export default SecondList;
