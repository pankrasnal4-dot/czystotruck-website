import React, { useState } from 'react';
import { Calculator, Send, Check, Sparkles, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content.json';
import { sendTelegramNotification, formatLeadMessage } from '../services/telegramService';

export default function FurnitureCalculator() {
  const [selectedItems, setSelectedItems] = useState(['kanapa']);
  const [selectedFloor, setSelectedFloor] = useState(content.calculator.floors[1]);
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== id));
      }
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectedNames = content.calculator.items
    .filter((item) => selectedItems.includes(item.id))
    .map((item) => item.name)
    .join(', ');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 7) {
      alert('Podaj numer telefonu, abyśmy mogli przekazać dokładną wycenę.');
      return;
    }

    setIsSending(true);

    const message = formatLeadMessage({
      phone,
      service: 'Kalkulator Mebli na stronie',
      floor: selectedFloor,
      items: selectedNames,
      description: `Wybrano ${selectedItems.length} pozycji do wywiezienia`,
      source: 'Interaktywny Kalkulator Meblowy',
    });

    await sendTelegramNotification(message);

    setIsSending(false);
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

  return (
    <section id="kalkulator" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090c] border-y border-white/5 relative overflow-hidden">
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Przedmiotów</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            CO CHCESZ <span className="text-gold-gradient">WYWIEŹĆ?</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Zaznacz elementy do zabrania. Wyślemy kompletne podsumowanie z wyceną prosto na telefon naszego kierowcy w Łodzi.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Kalkulacja Wysłana do Kierowcy!
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
                Wybrane pozycje: <strong>{selectedNames}</strong> ({selectedFloor}).
                Oddzwaniamy pod numer <strong>{phone}</strong> w ciągu kilku minut z ostateczną, stałą stawką.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-amber-400 underline underline-offset-4"
              >
                Przelicz inne meble
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Items Grid */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
                  1. Wybierz przedmioty (możesz zaznaczyć kilka):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {content.calculator.items.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-medium line-clamp-1">{item.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Floor selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2">
                    2. Piętro / Znoszenie:
                  </label>
                  <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  >
                    {content.calculator.floors.map((fl) => (
                      <option key={fl} value={fl}>
                        {fl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2">
                    3. Twój numer telefonu do wyceny:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="np. 514 690 066"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:border-amber-400 focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Summary Bar & Submit */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-400 font-mono">
                  <span className="block text-zinc-300 font-bold">Podsumowanie wyboru:</span>
                  <span>{selectedItems.length} pozycji &bull; Własny załadunek i znoszenie</span>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>{isSending ? 'Wysyłanie...' : 'Wyślij do dyspozytora na Telegram'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
