import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';
import content from '../data/content.json';

export default function ComparisonSection() {
  return (
    <section id="porownanie" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bezpieczeństwo i Pewność</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            CZYSTOTRUCK VS <span className="text-zinc-500">PRZYPADKOWE OGŁOSZENIA</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Dlaczego mieszkańcy Łodzi powierzają opróżnianie mieszkań właśnie nam:
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="space-y-4">
          {content.comparison.rows.map((row, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:border-amber-500/30 transition-colors"
            >
              {/* Feature Title */}
              <div className="md:col-span-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                  Kwestia 0{idx + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">
                  {row.feature}
                </h3>
              </div>

              {/* Standard CzystoTruck */}
              <div className="md:col-span-4 p-4 rounded-xl bg-amber-500/[0.07] border border-amber-500/30 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-300 block font-bold">
                    Standard CzystoTruck:
                  </span>
                  <p className="text-xs text-zinc-200 mt-0.5 leading-relaxed font-medium">
                    {row.us}
                  </p>
                </div>
              </div>

              {/* Others */}
              <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                    Typowe ogłoszenia:
                  </span>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    {row.others}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
