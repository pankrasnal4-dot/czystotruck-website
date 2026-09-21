import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import content from '../data/content.json';

export default function DistrictsSection({ onSelectDistrict }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090c] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-2">
              Lokalizacja i Zasięg
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              OBSŁUGUJEMY CAŁĄ <span className="text-gold-gradient">ŁÓDŹ I OKOLICE</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm">
            Podjeżdżamy pod każdą bramę, klatkę i posesję. Wybierz swoją dzielnicę, aby zamówić ekspresowy odbiór:
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {content.districts.map((d, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDistrict(d)}
              className="px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 text-xs sm:text-sm text-zinc-300 hover:text-white transition-all duration-200 flex items-center gap-2 group"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{d}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-serif text-base font-bold text-white block">
              Mieszkasz poza wymienionymi rejonami?
            </span>
            <span className="text-xs text-zinc-400">
              Dojżdżamy także do mniejszych miejscowości w promieniu do 50 km od Łodzi.
            </span>
          </div>

          <a
            href={`tel:${content.company.phoneRaw}`}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 fill-zinc-950" />
            <span>Zadzwoń: {content.company.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
