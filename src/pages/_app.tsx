import { LangContext } from '@/context/LangContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-color-palette/lib/css/styles.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import HeadTitle from '@/components/HeadTitle/HeadTitle';
import { headElItems } from '@/utils/constants';
//@ts-ignore
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';
//@ts-ignore

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);

//   // merge rafs
//   gsap.ticker.lagSmoothing(0);
//   gsap.ticker.remove(gsap.updateRoot);
//   raf.add((time: number) => {
//     gsap.updateRoot(time / 1500);
//   }, 0);

//   // reset scroll position
//   window.scrollTo(0, 0);
//   window.history.scrollRestoration = 'manual';
// }

export default function App({ Component, pageProps }: AppProps) {
  // const lenis = useLenis(ScrollTrigger.update);

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(ScrollTrigger.refresh, [lenis]);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 3,
  //     smooth: true,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //   });

  //   // lenis.on('scroll', ScrollTrigger.update);

  //   // gsap.ticker.add((time) => {
  //   //   lenis.raf(time * 2000);
  //   // });

  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, [])

  const router = useRouter();

  return (
    <>
      {/* seo head element */}
      <HeadTitle
        subTitle={
          headElItems?.filter(
            (item: any) =>
              item.url === router.asPath || item.url === router.route
          )[0]?.title
        }
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        className="custom-toast-container"
      />

      <LangContext>
        <Component {...pageProps} />
      </LangContext>
    </>
  );
}
