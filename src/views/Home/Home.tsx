import TextImageSection from '@/components/Demo/TextImageSection';
import TextSection from '@/components/Demo/TextSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header';
import useSectionAnimation from '@/hooks/useSectionAnimation';
import { RootDataType } from '@/utils/types';
import ColoradoHero from '@/views/Colorado/components/Hero';
import ReactFullpage, { fullpageApi } from '@fullpage/react-fullpage';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
import ColoradoSlider from '../Colorado/components/ColoradoSlider/ColoradoSlider';
import Resources from '../Resources/Resources';
import Hero from './components/Hero/Hero';
import useVHScrollSmoother from './hooks/useVHScrollSmoother';

const pluginWrapper = () => {
  require('./fullpage.scrollHorizontally.min');
};

const Home = ({ rootData }: { rootData: RootDataType }) => {
  const vhSmoother = useVHScrollSmoother();

  const resourcesData = rootData.find((v) => v.type === 'resources');
  const footerData = rootData.find((v) => v.type === 'footer');

  const [fullpageJs, setFullPageJs] = useState<fullpageApi>();

  const { coloradoHeroT2, textSection } = useSectionAnimation();

  useEffect(() => {
    const elements = document.getElementsByClassName('_ignore_scrollbar');

    Array.from(elements).forEach((v) => {
      const scrollableElement: any = v;
      const startingPoint = 0; // Set the starting point of the scroll

      let touchStartY = 0; // Store the initial touch Y position

      const handleTouchStart = (e: any) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchMove = (e: any) => {
        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchCurrentY - touchStartY;

        const contentHeight = scrollableElement.scrollHeight;
        const visibleHeight = scrollableElement.offsetHeight;
        const endPoint = contentHeight - visibleHeight;

        if (deltaY > 0 && scrollableElement.scrollTop >= endPoint) {
          if (deltaY >= 10) {
            console.log('Reached end point. Fire function!');
            // Call your desired function when scrolling reaches the end point
          }
        } else if (deltaY < 0 || scrollableElement.scrollTop <= startingPoint) {
          if (deltaY <= -10) {
            console.log('Reached starting point. Fire function!');
            // Call your desired function when scrolling reaches the starting point
          }
        }
      };

      scrollableElement.addEventListener('touchstart', handleTouchStart);
      scrollableElement.addEventListener('touchmove', handleTouchMove);
    });
  }, []);

  return (
    // <Lenis root options={{}}>
    <div id="scroll-wrapper" className="_parentSection scrollbar-hide">
      <Header fullpageApi={fullpageJs} />
      <ReactFullpage
        // licenseKey="12345678-90123456-78901234-56789012OPEN-SOURCE-MIT-LICENSE"
        pluginWrapper={pluginWrapper}
        credits={{ enabled: false }}
        scrollOverflow
        fitToSection
        scrollingSpeed={3000}
        scrollHorizontally={true}
        slidesNavigation={false}
        controlArrows={false}
        onSlideLeave={(s, o, d) => {
          const slides = document.querySelectorAll(
            '._colorado_slider.fp-section.active .fp-slide'
          ).length;
          if (slides) {
            const percent = calculatePercentage(d.index, slides - 1);
            const element: any = document.querySelector(
              '._coloradoIndicatorLine'
            );
            if (element) {
              gsap.to(element, { width: percent + '%', duration: 3 });
            }
          }
        }}
        scrollHorizontallyKey="WXhZV3gyWVhKdmRISnBaMjh1WTI5dGJkX3B0aGMyTnliMnhzU0c5eWFYcHZiblJoYkd4NTkwdA=="
        normalScrollElements="._ignore_scrollbar"
        beforeLeave={(o, d, di, tr) => {
          const ttype = d.item.getAttribute('data-type');
          const iid = d.item.getAttribute('data-id');
          switch (ttype) {
            case 'primary-prevention':
              textSection(iid || '');
              break;
            case 'custom-text':
              textSection(iid || '');
              break;
            case 'colorado-hero':
              coloradoHeroT2();
              break;
            default:
              break;
          }
        }}
        // dragAndMove={"fingersonly"}
        render={({ fullpageApi, state }) => {
          setFullPageJs(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              {rootData.map((v: any) => {
                switch (v.type) {
                  case 'hero':
                    return (
                      <div
                        data-id={v.id}
                        data-type={v.type}
                        className={`${v.id} section`}
                      >
                        <Hero
                          d={v}
                          key={v.id + 'abc'}
                          fullpageApi={fullpageApi}
                        />
                      </div>
                    );
                  case 'primary-prevention':
                    return (
                      <div
                        data-id={v.id}
                        data-type={v.type}
                        className={`${v.id} section`}
                      >
                        <TextSection
                          d={v}
                          key={v.id + 'abc'}
                          fullpageApi={fullpageApi}
                        />
                      </div>
                    );
                  case 'colorado-hero':
                    return (
                      <div
                        data-id={v.id}
                        data-type={v.type}
                        className={`${v.id} section _colorado_hero`}
                      >
                        <ColoradoHero
                          d={v}
                          key={v.id + 'abc'}
                          fullpageApi={fullpageApi}
                        />
                      </div>
                    );
                  case 'colorado-slider':
                    return (
                      <div
                        data-id={v.id}
                        data-type={v.type}
                        className={`${v.id} section _colorado_slider`}
                      >
                        <ColoradoSlider
                          d={v}
                          key={v.id + 'abc'}
                          fullpageApi={fullpageApi}
                        />
                      </div>
                    );
                  // case 'resources':
                  //   return (
                  //     <div className="section">
                  //       <Resources d={v} key={v.id + 'abc'} />
                  //     </div>
                  //   );
                  // case 'footer':
                  //   return (
                  //     <div className="section">
                  //       <Footer d={v} key={v.id + 'abc'} />
                  //     </div>
                  //   );
                  case 'custom-text':
                    return (
                      <div
                        data-id={v.id}
                        data-type={v.type}
                        className="section"
                      >
                        <TextSection
                          d={v}
                          key={v.id + 'abc'}
                          fullpageApi={fullpageApi}
                        />
                      </div>
                    );
                  case 'custom-text-img':
                    return (
                      <div
                        data-id={v.id}
                        data-type={v.type}
                        className={`${v.id} section`}
                      >
                        <TextImageSection
                          d={v}
                          key={v.id + 'abc'}
                          fullpageApi={fullpageApi}
                        />
                      </div>
                    );
                  default:
                    break;
                }
              })}
              <div
                data-id={resourcesData?.id}
                data-type={resourcesData?.type}
                className={`${resourcesData?.id} section _bottom_section`}
              >
                {resourcesData && <Resources d={resourcesData as any} />}
                {footerData && (
                  <Footer fullpageApi={fullpageApi} d={footerData as any} />
                )}
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
    // </Lenis>
  );
};

export default Home;

function calculatePercentage(value: number, total: number) {
  return (value / total) * 100;
}
