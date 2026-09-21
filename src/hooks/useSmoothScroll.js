import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(isModalOpen = false) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Only initialize smooth scroll on non-reduced motion and desktop/tablets
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      smoothTouch: false, // Keep native touch behavior on mobile to prevent sluggishness
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis with ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When a modal opens or closes, pause/resume lenis cleanly without breaking page state
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isModalOpen) {
      lenisRef.current.stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lenisRef.current.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return lenisRef;
}
