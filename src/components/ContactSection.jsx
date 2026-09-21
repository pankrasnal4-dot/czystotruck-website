import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, ArrowUpRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content.json';
import { sendTelegramNotification, formatLeadMessage, formatCallClickMessage } from '../services/telegramService';

export default function ContactSection({ onOpenTerms, onOpenTelegramSettings }) {
  const [phone, setPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQuickCallback = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Prosimy o zaakceptowanie regulaminu usług przed wysłaniem.');
      return;
    }

    if (!phone || phone.length < 7) {
      alert('Wpisz poprawny numer telefonu.');
      return;
    }

    setIsSubmitting(true);

    const message = formatLeadMessage({
      phone,
      service: 'Prośba o szybki telefon z dołu strony',
      floor: 'Do ustalenia podczas rozmowy',
      items: 'Wycena telefoniczna',
      description: 'Klient prosi o natychmiastowy kontakt telefoniczny',
      source: 'Sekcja kontaktowa (Dół strony)',
    });

    await sendTelegramNotification(message);

    setIsSubmitting(false);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch (err) {}
  };

  const handlePhoneCallClick = () => {
    sendTelegramNotification(
      formatCallClickMessage({
        phone: content.company.phone,
        source: 'Karta bezpośredniego połączenia (Dół strony)',
      })
    );
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
              Nie trać czasu na dźwiganie ani niepewne ekipy. Zadzwoń bezpośrednio lub wyślij zdjęcia mebli na WhatsApp – podamy dokładną, stałą kwotę i przyjedziemy na umówioną godzinę.
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

          {/* Right Column: Clean Instant Callback Hub (No duplicate giant form!) */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
                  Szybki Kontakt
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Oddzwonimy do Ciebie
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Zostaw numer telefonu – nasz kierowca w Łodzi oddzwoni z wyceną i wolnymi terminami.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white mb-1">
                    Dziękujemy za kontakt!
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-xs mb-4">
                    Kierowca otrzymał powiadomienie na telefon. Oddzwaniamy pod numer <strong>{phone}</strong> w kilka minut.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-amber-400 underline"
                  >
                    Podaj inny numer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickCallback} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Twój numer telefonu:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="np. 514 690 066"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-mono placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-400 pt-1">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded bg-zinc-900 border-white/20 text-amber-500 focus:ring-0"
                    />
                    <span>
                      Akceptuję{' '}
                      <button
                        type="button"
                        onClick={onOpenTerms}
                        className="text-amber-400 hover:underline inline font-medium"
                      >
                        Regulamin Usług
                      </button>{' '}
                      CzystoTruck.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>{isSubmitting ? 'Wysyłanie...' : 'Zadzwońcie do mnie'}</span>
                  </button>

                  <p className="text-center text-[10px] font-mono text-zinc-500">
                    Oddzwaniamy zazwyczaj w ciągu 5 minut
                  </p>
                </form>
              )}
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
              className="text-zinc-300 hover:text-amber-400"
            >
              {content.company.phone}
            </a>
            {/* Discreet hidden owner config button */}
            <button
              onClick={onOpenTelegramSettings}
              className="w-2 h-2 rounded-full bg-zinc-800 hover:bg-amber-400 transition-colors"
              title="Panel administracyjny"
              aria-label="Admin"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
