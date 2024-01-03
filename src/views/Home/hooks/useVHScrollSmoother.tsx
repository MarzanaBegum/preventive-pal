import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function useVHScrollSmoother() {
  // console.log(setIsTrue);
  // const { lockScroll, unlockScroll } = useScrollLock();
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sections = document.querySelectorAll('.scroll-section');
    const headerSection = HeaderSection();

    let disabledButton = false;

    // const scrolling = {
    //   enabled: true,
    //   events: 'scroll,wheel,touchmove,pointermove'.split(','),
    //   prevent: (e: any) => e.preventDefault(),
    //   disable() {
    //     if (scrolling.enabled) {
    //       lockScroll();
    //       scrolling.enabled = false;
    //       window.addEventListener('scroll', gsap.ticker.tick, {
    //         passive: true,
    //       });
    //       scrolling.events.forEach((e, i) =>
    //         (i ? document : window).addEventListener(e, scrolling.prevent, {
    //           passive: false,
    //         })
    //       );
    //     }
    //   },
    //   enable() {
    //     if (!scrolling.enabled) {
    //       unlockScroll();
    //       scrolling.enabled = true;
    //       window.removeEventListener('scroll', gsap.ticker.tick);
    //       scrolling.events.forEach((e, i) =>
    //         (i ? document : window).removeEventListener(e, scrolling.prevent)
    //       );
    //     }
    //   },
    // };

    // function goToSection(section: Element, i?: number) {
    //   if (scrolling.enabled) {
    //     scrolling.disable();
    //     gsap.to(window, {
    //       scrollTo: {
    //         y: i
    //           ? (sections.item(i + 1) as HTMLElement).offsetTop - innerHeight
    //           : section,
    //         autoKill: false,
    //       },
    //       onComplete: scrolling.enable,
    //       duration: 1.5,
    //     });
    //   }
    // }

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=1',
        end: 'bottom top+=1',
        onEnter: () => {
          console.log('Section Entered', section.getAttribute('section-name'));
          // if (!disabledButton) {
          //   goToSection(section);
          // }
          headerSection(section, 'enter');
        },
        // onEnterBack: () => {
        //   if (!disabledButton) {
        //     if (
        //       section.id === 'colorado_one' ||
        //       section.id === 'colorado_three'
        //     ) {
        //       goToSection(section, i);
        //     } else {
        //       goToSection(section);
        //     }
        //   }
        // },
        onLeaveBack: () => {
          // console.log(
          //   'Section Leave Back',
          //   section.getAttribute('section-name')
          // );
          headerSection(section, 'leave_back');
        },
        // onLeave: () => {
        //   console.log('Section Leave', section.getAttribute('section-name'));
        //   headerSection(section);
        // },
      });
    });

    (window as any).menuFunction = (id: string) => {
      disabledButton = true;
      gsap.to(window, {
        scrollTo: `#${id}`,
        duration: 0.5,
        onComplete: () => {
          disabledButton = false;
        },
        // duration: 1
      });
    };
  }, []);
}

//

// Header Section Functionality
function HeaderSection() {
  const headerSection = document.getElementById('header-section');
  const coloradoHeader = document.getElementById('colorado_header');
  const resourceHeader = document.getElementById('resource_header');
  const headerTween = gsap.to(headerSection, {
    top: -100,
    duration: 0.7,
    paused: true,
    ease: 'none',
  });
  const colHeaderTween = gsap.to(coloradoHeader, {
    top: -100,
    duration: 1,
    paused: true,
    ease: 'none',
  });

  return function (section: Element, type: string) {
    // if (section.id === 'colorado_slider' && type === 'enter') {
    //   headerTween.timeScale(1).play();
    //   colHeaderTween.timeScale(1).reverse();
    // } else if (section.id === 'colorado_slider' && type === 'leave_back') {
    //   headerTween.timeScale(1).reverse();
    // } else if (
    //   section.id === 'resources' ||
    //   (section.id === 'footer' && type === 'enter')
    // ) {
    //   headerTween.timeScale(1).play();
    // } else {
    //   // coloradoHeader!.style.display = 'block';
    //   // colHeaderTween.timeScale(1).reverse();
    // }
  };
}

export default useVHScrollSmoother;
