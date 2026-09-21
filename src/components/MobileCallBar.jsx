import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import content from '../data/content.json';

// NOTE(mobile): Na nowszych modelach iPhone z dynamicznym paskiem gestów (Home Indicator)
// dodajemy odstęp z uwzględnieniem env(safe-area-inset-bottom), aby przycisk nie kolidował z systemowym gestem.
export default function MobileCallBar() {
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-40 sm:hidden flex items-center gap-2">
      <a
        href={`tel:${content.company.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 active:scale-95 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(245,158,11,0.35)] transition-transform"
      >
        <Phone className="w-4 h-4 fill-zinc-950" />
        <span>Zadzwoń ({content.company.phone})</span>
      </a>

      <a
        href={content.company.socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-2xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 active:scale-95 flex items-center justify-center shadow-lg transition-transform"
        aria-label="WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
      </a>
    </div>
  );
}
