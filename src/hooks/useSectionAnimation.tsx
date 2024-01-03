import { gsap } from 'gsap';

function useSectionAnimation() {
  const heroSection = () => {};

  const textSection = (id: string) => {
    gsap.fromTo(
      `.${id + '_prevSubHeading'}, .${id + '_prevButton'}`,
      { opacity: 0, y: '400px' },
      {
        opacity: 1,
        y: 0,
        duration: 2,
      }
    );
    gsap.fromTo(
      `.${id + '_prevHeading'}`,
      { opacity: 0, y: '400px' },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
      }
    );
    gsap.fromTo(
      `.${id + '_preventionPowerText'}`,
      { opacity: 0, y: '400px' },
      {
        opacity: 1,
        y: 0,
        duration: 3,
      }
    );
  };

  const coloradoHero = () => {};
  const coloradoHeroT2 = () => {
    const mountainTl = gsap.timeline({
      defaults: { duration: 1, ease: 'none', delay: 1 },
    });
    const frontTreeTl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'none', delay: 1 },
    });
    const backTreeTl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'none', delay: 1 },
    });
    const waterTl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'none', delay: 1 },
    });
    const btnTl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'none', delay: 1 },
    });
    const textTl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'none', delay: 1 },
    });
    const cloudsTl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'none', delay: 1 },
    });

    // mountainTl.from('._tress-front', { yPercent: 100 });

    frontTreeTl.from('._tress-front', {
      yPercent: 100,
    });

    backTreeTl.from('._tress-back', {
      yPercent: 100,
      ease: 'power2.out',
    });

    waterTl.from('._mountain-water', {
      yPercent: 100,
    });

    btnTl.from(
      '._scrolling-btn',
      {
        bottom: '-100%',
        ease: 'power4.out',
      },
      '<1'
    );

    mountainTl.from('._mountain-1', {
      yPercent: 100,
      ease: 'power2.out',
    });

    textTl.from('._text-content', {
      yPercent: 100,
      bottom: '-100%',
      ease: 'none',
    });

    cloudsTl.from('._clouds', {
      top: '-100%',
      ease: 'sine.out',
    });
  };

  const coloradoSlider = () => {};
  return {
    heroSection,
    textSection,
    coloradoHero,
    coloradoHeroT2,
    coloradoSlider,
  };
}

export default useSectionAnimation;
