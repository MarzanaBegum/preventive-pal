import { ILang, InformationLinks } from '@/utils/types';
import Link from 'next/link';

type Props = {
    data: InformationLinks;
    lang: ILang;
}

const commonStyle =
    'text-[14px] leading-[170%] md:leading-[235%] lg:text-[16px] underline decoration-[#555555] cursor-pointer font-normal text-[#555555] hover:text-[#983fc2] hover:decoration-[#983fc2] transition ease-in-out duration-500';

const FList = ({ data, lang }: Props) => {
    return (
        <>
            <h2 className="text-[16px] leading-[175%] mb-[6px] font-bold text-[#715D86]">
                {data.text?.[lang]}
            </h2>
            <ul className="flex flex-col">
                {data.links.map((item, i) => <li key={data.text?.[lang] + i} className={commonStyle}>
                    <Link href={item.link}>{item.text?.[lang]}</Link>
                </li>)}
            </ul>
        </>
    )
}

export default FList