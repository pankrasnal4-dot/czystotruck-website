import React, { useState } from 'react';
import { Phone, MessageSquare, ArrowDown, Send, CheckCircle2, ShieldCheck, Clock, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content.json';
import { sendTelegramNotification, formatLeadMessage, formatCallClickMessage } from '../services/telegramService';

export default function HeroSection({ isLoaded }) {
  const [selectedItems, setSelectedItems] = useState(['Kanapa / Rogówka']);
  const [selectedFloor, setSelectedFloor] = useState('Parter / Winda');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const quickItems = [
    { label: '🛋️ Kanapa / Rogówka', val: 'Kanapa / Rogówka' },
    { label: '🚪 Szafa / Regał', val: 'Szafa / Meblościanka' },
    { label: '🛏️ Łóżko / Materac', val: 'Łóżko / Materac' },
    { label: '🏠 Całe Mieszkanie', val: 'Likwidacja całego mieszkania' },
    { label: '📦 Piwnica / Graty', val: 'Opróżnienie piwnicy/garażu' },
  ];

  const toggleItem = (val) => {
    if (selectedItems.includes(val)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== val));
      }
    } else {
      setSelectedItems([...selectedItems, val]);
    }
  };

  const quickFloors = [
    'Parter / Winda',
    'Piętro 1-2 (bez windy)',
    'Piętro 3-4 (kamienica)',
    'Inne',
  ];

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 7) {
      alert('Podaj poprawny numer telefonu, abyśmy mogli oddzwonić z wyceną.');
      return;
    }

    setIsSending(true);

    const message = formatLeadMessage({
      phone,
      service: 'Szybka wycena z nagłówka (Hero)',
      floor: selectedFloor,
      items: selectedItems.join(', '),
      description: description.trim() || `Wybrane pozycje: ${selectedItems.join(', ')}`,
      source: 'Widget Hero (Strona WWW)',
    });

    const res = await sendTelegramNotification(message);

    setIsSending(false);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch (err) {}
  };

  const handlePhoneClick = () => {
    // Notify owner on Telegram that someone clicked the phone call button
    sendTelegramNotification(
      formatCallClickMessage({
        phone: content.company.phone,
        source: 'Przycisk połączenia w sekcji Hero',
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
      {/* Background ambient lighting and subtle grain */}
      <div className="absolute inset-0 bg-subtle-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Main Grid: Left Typography + Right Interactive Quote Hub */}
      <div className="max-w-7xl mx-auto w-full my-auto z-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Editorial Typography & Brand Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Top Pill with live local status */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {content.hero.badge}
          </div>

          {/* Hero Headline (High contrast Cinzel Serif) */}
          <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.98] mb-6">
            <span className="block text-zinc-100">{content.hero.titleLine1}</span>
            <span className="block text-gold-gradient">{content.hero.titleLine2}</span>
            <span className="block text-zinc-400 font-light italic">{content.hero.titleLine3}</span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-8">
            {content.hero.subtitle}
          </p>

          {/* Direct Instant Triggers */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
            <a
              href={`tel:${content.company.phoneRaw}`}
              onClick={handlePhoneClick}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4 fill-zinc-950" />
              <span>Zadzwoń: {content.company.phone}</span>
            </a>

            <a
              href={content.company.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-zinc-200 hover:text-emerald-300 font-medium text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Wycena ze zdjęć (WhatsApp)</span>
            </a>
          </div>

          {/* Live Dispatch Indicator */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ekipa dostępna dzisiaj w Łodzi: Bałuty, Widzew, Śródmieście</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Live Quote & Dispatch Card (Fixes empty space!) */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0d0d12]/90 border border-amber-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            
            {/* Ambient accent inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
                  Oddzwaniamy w 5 minut
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Szybka Wycena Odbioru
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white mb-2">
                  Zgłoszenie Przekazane!
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 max-w-xs">
                  Powiadomienie trafiło natychmiast na telefon naszego dyspozytora. Oddzwaniamy pod numer <strong>{phone}</strong> w kilka minut z dokładną stawką.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-amber-400 underline"
                >
                  Wyślij inne zgłoszenie
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-4">
                
                {/* 1. What to remove? (Multi-select) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      1. Zaznacz przedmioty (możesz wybrać kilka):
                    </label>
                    <span className="text-[10px] font-mono text-amber-400">
                      Wybrano: {selectedItems.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickItems.map((item) => {
                      const isSelected = selectedItems.includes(item.val);
                      return (
                        <button
                          type="button"
                          key={item.val}
                          onClick={() => toggleItem(item.val)}
                          className={`px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 active:scale-95 ${
                            isSelected
                              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/25 scale-[1.02]'
                              : 'bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                          }`}
                        >
                          <span>{item.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Floor / Carrying */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    2. Piętro / Znoszenie:
                  </label>
                  <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  >
                    {quickFloors.map((fl) => (
                      <option key={fl} value={fl}>
                        {fl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Client description / request */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    3. Opis zlecenia (czego potrzebujesz?):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="np. Stara kanapa i szafa trzydrzwiowa, 3. piętro bez windy..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-sans placeholder:text-zinc-600 transition-colors resize-none"
                  />
                </div>

                {/* 4. Phone number */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    4. Twój numer telefonu:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="np. 514 690 066"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-mono placeholder:text-zinc-600 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {isSending ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
                  </span>
                </button>

                {/* Trust guarantee labels without client-facing telegram link */}
                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    Stała cena z góry bez dopłat
                  </span>
                  <span className="text-zinc-500">
                    Własny załadunek i znoszenie
                  </span>
                </div>

              </form>
            )}

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
          className="self-center md:self-end flex items-center gap-3 text-zinc-400 hover:text-amber-400 text-xs font-mono tracking-widest uppercase transition-colors group pb-1"
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
