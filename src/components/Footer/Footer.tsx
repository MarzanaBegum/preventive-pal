import { DataProps, FooterSectionType } from '@/utils/types';
import FooterBottom from './components/FooterBottom';
import FooterTop from './components/FooterTop';
import { PageApi } from '@/views/Home/components/Hero/Hero';

const Footer = ({ d, fullpageApi }: DataProps<FooterSectionType> & PageApi) => {
  return (
    <footer
      // data-scrolltarget="footer"
      section-name="footer"
      className="scroll-section"
      id={d.id}
    >
      <FooterTop d={d} fullpageApi={fullpageApi} />
      <FooterBottom d={d} />
    </footer>
  );
};

export default Footer;
