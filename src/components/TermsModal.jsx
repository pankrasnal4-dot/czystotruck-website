import React from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';
import content from '../data/content.json';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#0c0c10] border border-white/10 rounded-3xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#08080a] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-amber-500/40 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                Regulamin Usług CzystoTruck
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Łódź &bull; Aktualizacja: {content.terms.lastUpdated}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Zamknij regulamin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Terms Content with native scrollbar */}
        <div
          data-lenis-prevent
          className="p-6 sm:p-8 overflow-y-auto space-y-5 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed max-h-[calc(85vh-140px)]"
        >
          <div className="p-3.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
            Zlecenie wywozu mebli lub kontakt przez formularz oznacza akceptację poniższych przejrzystych zasad. W CzystoTruck stawiamy na jasne warunki bez ukrytych opłat.
          </div>

          {content.terms.sections.map((section, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <h4 className="font-serif font-bold text-amber-300 text-sm">
                {section.title}
              </h4>
              <p className="text-zinc-300 leading-relaxed text-xs">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#08080a] flex items-center justify-between gap-4 sticky bottom-0 z-10">
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            CzystoTruck &bull; Łódź
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Rozumiem i akceptuję regulamin</span>
          </button>
        </div>

      </div>
    </div>
  );
}
