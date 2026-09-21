import React from 'react';
import { X, Truck, Phone } from 'lucide-react';
import content from '../data/content.json';

export default function StoryDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/80 backdrop-blur-md transition-all duration-300">
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl h-full bg-[#0a0a0d] border-l border-white/10 flex flex-col justify-between overflow-y-auto p-6 sm:p-10 md:p-12 shadow-2xl"
      >
        {/* Header bar of drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 sticky top-0 bg-[#0a0a0d] z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-amber-500/40 flex items-center justify-center">
                <Truck className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif tracking-[0.2em] uppercase font-bold text-white text-sm">
                {content.company.name} &bull; O nas
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle & Title */}
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-2">
            Poznaj naszą historię
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-6">
            {content.story.subtitle}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-8">
            {content.story.paragraphs.map((p, idx) => (
              <p key={idx} className="border-l-2 border-amber-500/30 pl-4 py-0.5">
                {p}
              </p>
            ))}
          </div>

          {/* Fleet Specs Highlight Box */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 mb-8">
            <h3 className="font-serif text-base font-bold text-white mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Wyposażenie i Standard Pracy</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.story.fleetDetails.map((item, idx) => (
                <div key={idx} className="flex flex-col p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">
                    {item.label}
                  </span>
                  <span className="font-serif text-sm font-bold text-amber-300 mt-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-[#0a0a0d] z-10">
          <a
            href={`tel:${content.company.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
          >
            <Phone className="w-4 h-4 fill-zinc-950" />
            <span>Zadzwoń: {content.company.phone}</span>
          </a>

          <button
            onClick={onClose}
            className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs uppercase tracking-wider font-mono transition-colors"
          >
            Zamknij
          </button>
        </div>

      </div>
    </div>
  );
}
