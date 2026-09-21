import React, { useState, useEffect } from 'react';
import { Truck, Phone, MessageSquare, Menu, X, ArrowUpRight, ArrowLeft } from 'lucide-react';
import content from '../data/content.json';
import { sendTelegramNotification, formatCallClickMessage } from '../services/telegramService';

export default function Header({ 
  onOpenStory, 
  onOpenTerms, 
  onOpenTelegramSettings, 
  isQuoteView = false, 
  onNavigateToQuote, 
  onBackToHome 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    if (isQuoteView && onBackToHome) {
      onBackToHome();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCallClick = () => {
    sendTelegramNotification(
      formatCallClickMessage({
        phone: content.company.phone,
        source: 'Pasek górny (Header)',
      })
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#08080a]/90 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <button
            onClick={() => {
              setLogoClicks(prev => {
                if (prev + 1 >= 3) {
                  onOpenTelegramSettings();
                  return 0;
                }
                return prev + 1;
              });
              if (isQuoteView && onBackToHome) {
                onBackToHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            title="CzystoTruck Łódź"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-amber-500/40 flex items-center justify-center group-hover:border-amber-400 transition-colors shrink-0">
              <Truck className="w-4 h-4 text-amber-400 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.18em] sm:tracking-[0.25em] text-sm sm:text-base uppercase font-bold text-white group-hover:text-amber-300 transition-colors">
                {content.company.name}
              </span>
              <span className="hidden sm:inline text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-mono -mt-0.5">
                WYWÓZ MEBLI &bull; ŁÓDŹ
              </span>
            </div>
          </button>

          {/* Center (Desktop only): Quick contact & WhatsApp */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${content.company.phoneRaw}`}
              onClick={handleCallClick}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-xs text-zinc-300 hover:text-amber-400 transition-all duration-300"
              title="Zadzwoń do nas"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono tracking-wider">{content.company.phone}</span>
            </a>

            <a
              href={content.company.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex p-1.5 rounded-full bg-white/[0.04] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-zinc-400 hover:text-emerald-400 transition-all duration-300"
              title="Napisz na WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isQuoteView ? (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-1.5 min-h-[38px] rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold bg-white/[0.08] hover:bg-white/[0.15] text-zinc-200 border border-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Strona Główna</span>
                <span className="sm:hidden">Wróć</span>
              </button>
            ) : (
              <button
                onClick={onNavigateToQuote}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-1.5 min-h-[38px] rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 cursor-pointer"
              >
                <span>Wycena</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="group flex items-center justify-center gap-1.5 px-3 sm:px-3 py-2 sm:py-1.5 min-h-[38px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-[11px] sm:text-xs uppercase tracking-widest text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Otwórz menu"
            >
              <span className="hidden xs:inline text-[10px] sm:text-[11px] font-mono">MENU</span>
              <Menu className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[70] bg-[#070709]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <span className="font-serif tracking-[0.2em] uppercase font-bold text-white text-base">
              {content.company.name}
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Zamknij menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 sm:gap-6 my-auto max-w-xl py-6">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-amber-400/80">
            Nawigacja
          </span>

          <nav className="flex flex-col gap-3 sm:gap-5 font-serif text-xl sm:text-3xl text-zinc-300">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onNavigateToQuote) onNavigateToQuote();
              }}
              className="text-left text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>★ Formularz Wyceny Online</span>
              <ArrowUpRight className="w-5 h-5 opacity-100 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('hero')}
              className="text-left hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>01. Start</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick('jak-dzialamy')}
              className="text-left hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>02. Jak Działamy (3 Kroki)</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick('uslugi')}
              className="text-left hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>03. Usługi Meblowe</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick('porownanie')}
              className="text-left hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>04. Dlaczego CzystoTruck</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick('rejony')}
              className="text-left hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>05. Dzielnice Łodzi</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenStory();
              }}
              className="text-left hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>06. O Nas & Flota</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick('kontakt')}
              className="text-left text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>07. Bezpośredni Kontakt</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </button>
          </nav>
        </div>

        {/* Footer info in Menu */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            <span className="block text-zinc-400">Dyspozycyjność w Łodzi:</span>
            <span>{content.company.hours}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTerms();
              }}
              className="hover:text-amber-400 transition-colors underline underline-offset-4 cursor-pointer"
            >
              Regulamin Usług
            </button>

            <a
              href={`tel:${content.company.phoneRaw}`}
              className="text-white hover:text-amber-400"
            >
              {content.company.phone}
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
