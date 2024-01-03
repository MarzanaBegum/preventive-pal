import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function useNewVHScrollSmoother() {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=1',
        end: 'bottom top+=1',
        onEnter: () => {
          ResourcesHeader(section);
        },
        onEnterBack: () => {
          ResourcesHeader(section);
        },
      });
    });

    const headerSection = document.getElementById('header-section');
    const headerTween = gsap.to(headerSection, {
      top: -100,
      duration: 1.5,
      paused: true,
      ease: 'none',
    });

    function ResourcesHeader(section: Element) {
      if (section.id === 'resources') {
        console.log('Ready To Tween');
        headerTween.timeScale(1).play();
      }
      if (section.id === 'colorado_three') {
        console.log('Ready To Reverse');

        headerTween.timeScale(5).reverse();
      }
    }
  }, []);
}

export default useNewVHScrollSmoother;
