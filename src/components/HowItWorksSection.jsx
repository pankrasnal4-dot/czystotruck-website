import React from 'react';
import { PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';
import content from '../data/content.json';

export default function HowItWorksSection() {
  return (
    <section id="jak-dzialamy" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090c] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-2">
              Prosty i Przejrzysty Proces
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              JAK TO DZIAŁA W <span className="text-gold-gradient">3 KROKACH</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Zamiast tracić czas na dźwiganie lub niepewne ogłoszenia, powierz to nam. Cały proces zamyka się w 3 prostych etapach:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.howItWorks.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-white/10 relative group hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-500/30 group-hover:text-amber-400 transition-colors block mb-6">
                  {item.step}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>

                {idx === 0 && (
                  <a
                    href={`tel:${content.company.phoneRaw}`}
                    className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>Zadzwoń: {content.company.phone}</span>
                  </a>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Krok {idx + 1} z 3</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
