import React from 'react';
import { Phone, MessageSquare, ArrowUpRight, ShieldCheck, Clock, MapPin, Sparkles, ArrowUp } from 'lucide-react';
import content from '../data/content.json';
import { sendTelegramNotification, formatCallClickMessage } from '../services/telegramService';

export default function ContactSection({ onOpenTerms, onOpenTelegramSettings }) {
  const handlePhoneCallClick = () => {
    sendTelegramNotification(
      formatCallClickMessage({
        phone: content.company.phone,
        source: 'Karta bezpośredniego połączenia (Dół strony)',
      })
    );
  };

  const scrollToHeroConfig = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="kontakt"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#060608] border-t border-white/5 relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Big Headline & Direct Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-3">
              Łódź i Okolice &bull; Kontakt Bezpośredni
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5">
              POZBĄDŹ SIĘ <br />
              <span className="text-gold-gradient">STARYCH MEBLI.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-8 max-w-lg">
              Nie trać czasu na dźwiganie ani niepewne ogłoszenia. Zadzwoń bezpośrednio lub prześlij zdjęcia mebli na WhatsApp – podamy stałą cenę i przyjedziemy na umówioną godzinę.
            </p>

            {/* Direct Cards */}
            <div className="w-full space-y-4 max-w-xl">
              <a
                href={`tel:${content.company.phoneRaw}`}
                onClick={handlePhoneCallClick}
                className="flex items-center justify-between p-5 rounded-2xl glass-panel-amber hover:border-amber-400/60 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-zinc-950 shadow-md">
                    <Phone className="w-6 h-6 fill-zinc-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block">
                      Zadzwoń bezpośrednio ({content.company.hours.split('•')[0]})
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {content.company.phone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href={content.company.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl glass-panel hover:border-emerald-500/40 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                      Wycena ze zdjęć w 5 minut
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Napisz do nas na WhatsApp
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 mt-6 border-t border-white/10 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Gwarancja stałej ceny
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Ekspresowy czas działania
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Cała Łódź i okolice
              </span>
            </div>
          </div>

          {/* Right Column: Clean Standards & Fast Configurator Jump (No duplicate phone form!) */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
                    Kompleksowa Obsługa
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Dlaczego CzystoTruck?
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs text-zinc-300">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="font-bold text-white block mb-1 font-serif">1. Wycena z góry bez niespodzianek</span>
                  <p className="text-zinc-400 leading-relaxed">
                    Ustalamy kwotę przed przyjazdem na podstawie opisu lub zdjęć. Cena nie rośnie w trakcie załadunku.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="font-bold text-white block mb-1 font-serif">2. Własni tragarze i demontaż</span>
                  <p className="text-zinc-400 leading-relaxed">
                    Znosimy z każdego piętra (nawet 4. piętro w łódzkich kamienicach). Rozkręcamy szafy i narożniki na miejscu.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="font-bold text-white block mb-1 font-serif">3. Czystość po skończonej pracy</span>
                  <p className="text-zinc-400 leading-relaxed">
                    Zamiatamy klatkę i miejsce postoju auta. Zostawiamy lokal przygotowany do remontu lub sprzedaży.
                  </p>
                </div>
              </div>

              {/* Fast Jump button to the main quote widget at the top */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={scrollToHeroConfig}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                  <span>Skorzystaj z kalkulatora wyceny (Góra strony)</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold uppercase">{content.company.name}</span>
            <span>&bull; Wywóz mebli &bull; Łódź i okolice &bull; &copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenTerms}
              className="hover:text-amber-400 transition-colors underline underline-offset-4"
            >
              Regulamin Usług
            </button>
            <a
              href={`tel:${content.company.phoneRaw}`}
              className="text-zinc-300 hover:text-amber-400 font-mono"
            >
              {content.company.phone}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
