import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Truck } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef({ val: 0 });

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Animate counter from 0 to 100
    tl.to(counterRef.current, {
      val: 100,
      duration: 1.6,
      ease: 'power3.inOut',
      onUpdate: () => {
        setPercent(Math.round(counterRef.current.val));
      },
    });

    // Subtle scale and fade out loader content
    tl.to('.preloader-content', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    });

    // Lift the curtain
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060608] text-white select-none pointer-events-auto"
    >
      <div className="preloader-content flex flex-col items-center text-center px-6 max-w-sm">
        {/* Monogram / Icon */}
        <div className="relative mb-8 w-16 h-16 rounded-2xl bg-zinc-900/80 border border-amber-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.15)]">
          <Truck className="w-8 h-8 text-amber-400 stroke-[1.75]" />
          <div className="absolute -inset-1 rounded-2xl bg-amber-500/10 blur-sm -z-10" />
        </div>

        {/* Brand Name */}
        <span className="font-serif tracking-[0.3em] text-sm uppercase text-zinc-300 font-semibold mb-2">
          CzystoTruck
        </span>
        <span className="text-[11px] uppercase tracking-widest text-zinc-500 mb-10">
          Łódź &bull; Ciężki Transport &bull; Porządek
        </span>

        {/* Progress Bar & Percentage */}
        <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="font-mono text-xs text-amber-400/90 tracking-widest">
          {percent < 10 ? `00${percent}` : percent < 100 ? `0${percent}` : percent}%
        </div>
      </div>
    </div>
  );
}
