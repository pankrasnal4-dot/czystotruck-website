import React from 'react';
import content from '../data/content.json';

export default function MarqueeSection() {
  // Multiply items for infinite smooth repetition
  const allItems = [
    ...content.marquee.items,
    ...content.marquee.items,
  ];

  return (
    <div className="relative py-8 sm:py-12 bg-[#09090c] border-y border-white/5 overflow-hidden select-none">
      <div className="absolute inset-0 bg-subtle-noise opacity-20 pointer-events-none" />
      
      {/* Ambient gold glow on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090c] to-transparent z-10 pointer-events-none" />

      {/* Track container with continuous self-moving animation */}
      <div className="animate-marquee-continuous items-center">
        {allItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-8"
          >
            <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-zinc-300 hover:text-amber-400 transition-colors">
              {item}
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
