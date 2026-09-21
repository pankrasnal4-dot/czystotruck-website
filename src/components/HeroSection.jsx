import React from 'react';
import { Phone, MessageSquare, ArrowRight, ArrowDown, ShieldCheck, CheckCircle2, Sparkles, Truck, Clock } from 'lucide-react';
import content from '../data/content.json';
import { sendTelegramNotification, formatCallClickMessage } from '../services/telegramService';
import heroImage from '../assets/hero-cleared.jpg';

export default function HeroSection({ isLoaded, onNavigateToQuote }) {
  const handlePhoneClick = () => {
    sendTelegramNotification(
      formatCallClickMessage({
        phone: content.company.phone,
        source: 'Główny przycisk połączenia w sekcji Hero',
      })
    );
  };

  const scrollToServices = () => {
    const el = document.getElementById('jak-dzialamy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#060608] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-subtle-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-amber-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full my-auto z-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Headlines, Trust & Clear Calls to Action */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span>{content.hero.badge}</span>
          </div>

          <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.98] mb-6">
            <span className="block text-zinc-100">{content.hero.titleLine1}</span>
            <span className="block text-gold-gradient">{content.hero.titleLine2}</span>
            <span className="block text-zinc-400 font-light italic">{content.hero.titleLine3}</span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-8">
            {content.hero.subtitle}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full mb-8">
            {/* 1. Navigate to dedicated /wycena subpage */}
            <button
              onClick={onNavigateToQuote}
              className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-zinc-950" />
              <span>Darmowa Wycena Online</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* 2. Direct Click-to-Call Phone Button */}
            <a
              href={`tel:${content.company.phoneRaw}`}
              onClick={handlePhoneClick}
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-zinc-200 hover:text-amber-400 font-semibold text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Zadzwoń: {content.company.phone}</span>
            </a>

            {/* 3. WhatsApp for Photo Quotes */}
            <a
              href={content.company.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-300 font-medium text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
              title="Wyślij zdjęcia mebli na WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="hidden xl:inline">Wycena ze zdjęć</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>
          </div>

          {/* Real-time team status */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ekipa dostępna dzisiaj w Łodzi: Bałuty, Widzew, Górna, Śródmieście</span>
          </div>

        </div>

        {/* Right Column: High-End Cleared Space Visual & Trust Badges */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 bg-[#0d0d12]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl group">
            
            {/* Visual Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={heroImage}
                alt="Puste, czyste mieszkanie w Łodzi po kompleksowym wywozie mebli przez CzystoTruck"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-black/30 pointer-events-none" />

              {/* Floating Top Tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Mieszkanie po naszej realizacji</span>
              </div>
            </div>

            {/* Bottom Content Card */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
                    Bezpieczeństwo & Wygoda
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Zajmiemy się wszystkim od A do Z
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Nie musisz rozkręcać szaf ani schodzić do piwnicy. Nasz zespół wchodzi do mieszkania, wynosi wszystkie wskazane gabaryty, zabezpiecza klatkę schodową i zostawia pomieszczenia puste i czyste.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10 text-[11px] font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Własny załadunek</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Każde piętro bez windy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Stała cena z góry</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Legalny recykling PSZOK</span>
                </div>
              </div>

              {/* Subpage CTA Trigger inside card */}
              <div className="pt-2">
                <button
                  onClick={onNavigateToQuote}
                  className="w-full py-3.5 rounded-xl bg-white/[0.06] hover:bg-amber-500 hover:text-zinc-950 border border-white/15 hover:border-amber-400 text-zinc-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Przejdź do formularza wyceny</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Bottom Row: 3 Highlight Stats & Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full md:w-auto">
          {content.hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToServices}
          className="self-center md:self-end flex items-center gap-3 text-zinc-400 hover:text-amber-400 text-xs font-mono tracking-widest uppercase transition-colors group pb-1 cursor-pointer"
        >
          <span>Jak działamy</span>
          <div className="w-7 h-7 rounded-full border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center transition-colors">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>

    </section>
  );
}
