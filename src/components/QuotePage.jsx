import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Phone, 
  MessageSquare, 
  Truck, 
  MapPin, 
  Layers, 
  Wrench, 
  Calendar,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content.json';
import { sendTelegramNotification, formatLeadMessage } from '../services/telegramService';

export default function QuotePage({ onBack, preselectedService, preselectedDistrict }) {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedCategories, setSelectedCategories] = useState(() => {
    if (preselectedService) {
      if (preselectedService.toLowerCase().includes('piwnic')) return ['Piwnica / Garaż / Strych'];
      if (preselectedService.toLowerCase().includes('mieszka')) return ['Opróżnienie całego mieszkania'];
      return [preselectedService];
    }
    return ['Stare Meble & Gabaryty'];
  });

  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState(preselectedDistrict || 'Bałuty');
  const [address, setAddress] = useState('');
  const [floor, setFloor] = useState('Parter / Winda');
  const [disassembly, setDisassembly] = useState('Potrzebny demontaż na miejscu');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [timeframe, setTimeframe] = useState('Jak najszybciej (dzisiaj / jutro)');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // NOTE(architektura): Porzuciliśmy sztywny estymator cenowy w JS na rzecz wyceny telefonicznej w 5 minut.
  // W łódzkich kamienicach stare meblościanki z PRL (lite drewno, lakier wysoki połysk)
  // potrafią ważyć 3x więcej niż meble z sieciówek i nie mieszczą się w wąskich prześwitach bramowych.
  // Algorytm zaniżał stawki o 40% przy ciężkim gabarycie, co rodziło nieporozumienia.
  /*
  const [estimateRange, setEstimateRange] = useState({ min: 0, max: 0 });
  const recalculateEstimate = () => {
    let baseMin = selectedCategories.length * 120;
    let baseMax = selectedCategories.length * 280;
    if (floor.includes('kamienica') || floor.includes('3.') || floor.includes('4.')) {
      baseMin += 80;
      baseMax += 150;
    }
    setEstimateRange({ min: baseMin, max: baseMax });
  };
  */

  // FIXME(walidacja): dodać automatyczne dzielenie spacji w numerze (np. 514 690 066)
  // oraz rozpoznać prefiks kierunkowy 42 dla łódzkich numerów stacjonarnych.

  const categories = [
    { id: 'meble', label: '🛋️ Stare Meble & Gabaryty', desc: 'Kanapy, narożniki, szafy, meblościanki, łóżka' },
    { id: 'mieszkanie', label: '🏠 Całe Mieszkanie / Lokal', desc: 'Kompleksowe opróżnianie do gołych ścian' },
    { id: 'piwnica', label: '📦 Piwnica / Garaż / Strych', desc: 'Zalegające graty, kartony, rupiecie, stare wyposażenie' },
    { id: 'agd', label: '🔌 Sprzęt AGD / RTV', desc: 'Pralki, lodówki, zmywarki, kuchenki' },
    { id: 'gabaryt', label: '🪑 Pojedyncze Przedmioty', desc: 'Fotel, materac, biurko, stół, komoda' },
  ];

  const floors = [
    'Parter / Winda towarowa lub osobowa',
    '1. piętro (schody)',
    '2. piętro (schody)',
    '3. piętro (schody, kamienica / blok)',
    '4. piętro (schody, kamienica / blok)',
    '5+ piętro bez windy / inne',
  ];

  const disassemblyOptions = [
    'Potrzebny demontaż na miejscu (rozkręcenie szaf, narożników)',
    'Wszystko jest już rozkręcone / przygotowane',
    'Częściowy demontaż',
  ];

  const timeframeOptions = [
    'Jak najszybciej (dzisiaj / jutro)',
    'W tym tygodniu',
    'W nadchodzący weekend',
    'W późniejszym terminie (do ustalenia)',
  ];

  const toggleCategory = (catLabel) => {
    if (selectedCategories.includes(catLabel)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== catLabel));
      }
    } else {
      setSelectedCategories([...selectedCategories, catLabel]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedCategories.length === 0) {
      alert('Wybierz przynajmniej jedną kategorię do wywiezienia.');
      return;
    }
    setStep(prev => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Normalizacja numeru (usuwamy spacje, myślniki, nawiasy)
    const normalizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!normalizedPhone || normalizedPhone.length < 9) {
      alert('Podaj prawidłowy numer telefonu (min. 9 cyfr), abyśmy mogli oddzwonić z wyceną.');
      return;
    }

    // TODO(kamil): w Q2 dodać drag&drop zdjęć mebli bezpośrednio do formularza
    // i wysyłkę przez multipart/form-data do bota (sendPhoto), zamiast obecnego odsyłania do WhatsApp.

    setIsSending(true);

    const fullLocation = address ? `${district}, ${address}` : `${district} (Łódź)`;

    const message = formatLeadMessage({
      name: name.trim() || 'Klient z podstrony /wycena',
      phone: normalizedPhone,
      service: selectedCategories.join(', '),
      location: fullLocation,
      floor,
      disassembly,
      items: selectedCategories.join(', '),
      description: description.trim() || 'Brak dodatkowego opisu',
      timeframe,
      source: 'Podstrona Wyceny CzystoTruck (/wycena)',
    });

    const res = await sendTelegramNotification(message);
    setIsSending(false);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch (err) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-subtle-noise opacity-20 pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        
        {/* Top bar: Back to home */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Wróć do strony głównej</span>
          </button>

          <a
            href={`tel:${content.company.phoneRaw}`}
            className="group inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-xs font-mono text-zinc-300 hover:text-amber-400 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-zinc-400">Pilna sprawa lub wolisz porozmawiać?</span>
            <span className="text-amber-400 font-bold">{content.company.phone}</span>
          </a>
        </div>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 text-center shadow-2xl animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-2">
              Zgłoszenie Przyjęte Pomyślnie
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Dziękujemy, <span className="text-gold-gradient">{name || 'Twoja wycena'}</span> jest już w drodze!
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed mb-8">
              Powiadomienie z wszystkimi parametrami zlecenia trafiło w tej chwili na telefony naszych dyspozytorów w Łodzi. 
              Oddzwaniamy pod numer <strong className="text-amber-400 font-mono">{phone}</strong> w ciągu 5-10 minut z ostateczną, stałą stawką z góry.
            </p>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto mb-8 text-left space-y-2 text-xs text-zinc-400 font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-500">Lokalizacja:</span>
                <span className="text-white font-bold">{district}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-500">Kondygnacja:</span>
                <span className="text-white">{floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Termin:</span>
                <span className="text-amber-400">{timeframe}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/25"
              >
                Powrót do strony głównej
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-colors"
              >
                Zgłoś kolejne zlecenie
              </button>
            </div>
          </div>
        ) : (
          /* MULTI-STEP WIZARD */
          <div>
            
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bezpieczna & Bezpłatna Wycena • Łódź</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
                WYCENA ODBIORU <span className="text-gold-gradient">MEBLI</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg mx-auto">
                Wypełnij 3 proste kroki. Podajemy stałą stawkę z góry bez żadnych ukrytych dopłat na miejscu.
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[
                { num: 1, label: '1. Co wywozimy' },
                { num: 2, label: '2. Warunki & Adres' },
                { num: 3, label: '3. Telefon & Termin' },
              ].map((s) => {
                const isActive = step === s.num;
                const isCompleted = step > s.num;
                return (
                  <div
                    key={s.num}
                    className={`py-3 px-3 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : isCompleted
                        ? 'bg-white/[0.04] border-emerald-500/40 text-emerald-400'
                        : 'bg-white/[0.02] border-white/5 text-zinc-500'
                    }`}
                  >
                    <span className="block text-[11px] font-mono uppercase tracking-wider font-bold">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
              
              {/* STEP 1: CATEGORIES & DESCRIPTION */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-up">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                      Krok 1 z 3
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      Co chcesz wywieźć lub opróżnić?
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Zaznacz wszystkie pozycje, które Cię dotyczą (możesz wybrać kilka):
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat) => {
                      const isSelected = selectedCategories.includes(cat.label);
                      return (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => toggleCategory(cat.label)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                              : 'bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div>
                            <span className="font-serif text-sm font-bold block mb-1">
                              {cat.label}
                            </span>
                            <span className="text-[11px] text-zinc-400 block leading-relaxed font-sans">
                              {cat.desc}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-amber-500 border-amber-400 text-zinc-950' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                      Opis mebli / szczegóły zlecenia (opcjonalnie):
                    </label>
                    <textarea
                      rows={3}
                      placeholder="np. Duża rogówka z funkcją spania, szafa trzydrzwiowa do rozkręcenia, stary tapczan..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-sans placeholder:text-zinc-600 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
                    >
                      <span>Dalej: Warunki i Adres</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION, FLOOR & DISASSEMBLY */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-up">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                      Krok 2 z 3
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      Gdzie i w jakich warunkach pracujemy?
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Nasi tragarze wchodzą do lokalu i znoszą z każdego piętra.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                        Dzielnica / Miasto:
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-3.5 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                      >
                        {content.districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                        Ulica / Osiedle (opcjonalnie):
                      </label>
                      <input
                        type="text"
                        placeholder="np. ul. Piotrkowska / os. Retkinia"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3.5 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-sans placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                      Piętro i dostęp do windy:
                    </label>
                    <select
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                    >
                      {floors.map((fl) => (
                        <option key={fl} value={fl}>
                          {fl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                      Demontaż dużych mebli:
                    </label>
                    <div className="space-y-2">
                      {disassemblyOptions.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            disassembly === opt
                              ? 'bg-amber-500/10 border-amber-500/50 text-white'
                              : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="disassembly"
                            checked={disassembly === opt}
                            onChange={() => setDisassembly(opt)}
                            className="text-amber-500 focus:ring-0 bg-zinc-900 border-white/20"
                          />
                          <span className="text-xs font-sans">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      Wstecz
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/25"
                    >
                      <span>Dalej: Kontakt i Termin</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & TIMEFRAME */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-up">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                      Krok 3 z 3
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      Gdzie mamy zadzwonić z wyceną?
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Podaj numer telefonu. Oddzwaniamy zazwyczaj w ciągu 5-10 minut z dokładną kwotą.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                        Twój numer telefonu (wymagany):
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="np. 514 690 066"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-4 rounded-xl bg-zinc-950 border border-amber-500/40 focus:border-amber-400 focus:outline-none text-white text-sm font-mono placeholder:text-zinc-600 shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                        Twoje Imię (opcjonalnie):
                      </label>
                      <input
                        type="text"
                        placeholder="np. Michał"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-sans placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-2">
                      Preferowany termin realizacji:
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                    >
                      {timeframeOptions.map((tf) => (
                        <option key={tf} value={tf}>
                          {tf}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-zinc-300 font-mono space-y-1.5">
                    <span className="text-amber-400 font-bold block uppercase tracking-wider mb-1">
                      Podsumowanie Twojego Zlecenia:
                    </span>
                    <div>&bull; <strong>Rzeczy:</strong> {selectedCategories.join(', ')}</div>
                    <div>&bull; <strong>Lokalizacja:</strong> {district} {address && `(${address})`}</div>
                    <div>&bull; <strong>Kondygnacja:</strong> {floor}</div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      Wstecz
                    </button>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="flex-1 sm:flex-none px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>{isSending ? 'Przesyłanie zgłoszenia...' : 'Wyślij zgłoszenie do dyspozytora'}</span>
                    </button>
                  </div>

                  {/* Trust footer */}
                  <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/5 text-[11px] font-mono text-zinc-400 gap-4">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      Stała cena z góry bez dopłat
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      Oddzwaniamy w 5-10 minut
                    </span>
                  </div>

                </div>
              )}

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
