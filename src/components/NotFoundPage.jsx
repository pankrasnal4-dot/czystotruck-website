import React from 'react';
import { Truck, Home, Phone, ArrowLeft } from 'lucide-react';
import content from '../data/content.json';

export default function NotFoundPage({ onBackToHome }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#060608] text-white relative overflow-hidden text-center select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-subtle-noise opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Monogram Icon */}
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-amber-500/40 flex items-center justify-center mb-8 shadow-2xl">
          <Truck className="w-8 h-8 text-amber-400 stroke-[1.75]" />
        </div>

        {/* 404 Number */}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-2">
          Błąd 404 &bull; Strona nie istnieje
        </span>

        <h1 className="font-serif text-6xl sm:text-8xl font-bold tracking-tight text-white mb-4">
          4<span className="text-gold-gradient">0</span>4
        </h1>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-200 mb-4">
          WYWIEZIONE BEZ ŚLADU.
        </h2>

        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8 max-w-md">
          Pod tym adresem nic już nie ma. Nasza ekipa z <strong>CzystoTruck</strong> zrealizowała zlecenie wzorowo – znieśliśmy i wywieźliśmy wszystko na pakę, łącznie z tą podstroną.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Wróć na stronę główną</span>
          </button>

          <a
            href={`tel:${content.company.phoneRaw}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-200 hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Zadzwoń: {content.company.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
