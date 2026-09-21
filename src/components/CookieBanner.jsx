import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';
import content from '../data/content.json';

export default function CookieBanner({ onOpenTerms }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('czystotruck_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('czystotruck_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-md z-50 animate-fade-in">
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-[#0b0b0e]/95 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cookie className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-serif text-sm font-bold text-white">
              {content.cookies.title}
            </span>
          </div>
          <button
            onClick={handleAccept}
            className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 font-light leading-relaxed">
          {content.cookies.description}
        </p>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{content.cookies.acceptButton}</span>
          </button>

          <button
            onClick={onOpenTerms}
            className="text-xs text-zinc-400 hover:text-amber-400 underline underline-offset-4 px-2 py-1 transition-colors"
          >
            Regulamin
          </button>
        </div>
      </div>
    </div>
  );
}
