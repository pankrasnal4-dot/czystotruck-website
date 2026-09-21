import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { getTelegramConfig, saveTelegramConfig, sendTelegramNotification } from '../services/telegramService';
import content from '../data/content.json';

export default function TelegramModal({ isOpen, onClose }) {
  const [token, setToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getTelegramConfig();
      setToken(config.token);
      setChatId(config.chatId);
      setStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveTelegramConfig(token, chatId);
    setStatus({
      type: 'success',
      message: 'Ustawienia Telegram zostały zapisane w przeglądarce.',
    });
  };

  const handleTestSend = async () => {
    if (!token || !chatId) {
      setStatus({
        type: 'error',
        message: 'Wpisz najpierw Token Bota oraz swój Chat ID, aby przetestować połączenie.',
      });
      return;
    }

    saveTelegramConfig(token, chatId);
    setIsTesting(true);
    setStatus(null);

    const testMessage = `🚀 <b>TEST POWIADOMIENIA: CZYSTOTRUCK</b>\n━━━━━━━━━━━━━━━━━━\n✅ Gratulacje! Twój bot Telegram jest poprawnie połączony ze stroną CzystoTruck.\n\nOd teraz, gdy jakikolwiek klient z Łodzi:\n• Kliknie 'Zadzwoń teraz'\n• Wypełni szybką wycenę w nagłówku\n• Użyje kalkulatora mebli\n\n...natychmiast otrzymasz powiadomienie z numerem telefonu klienta prosto na ten czat!\n━━━━━━━━━━━━━━━━━━\n⏰ Czas testu: ${new Date().toLocaleTimeString('pl-PL')}`;

    const res = await sendTelegramNotification(testMessage);
    setIsTesting(false);

    if (res.success) {
      setStatus({
        type: 'success',
        message: '✅ Świetnie! Testowa wiadomość została wysłana. Sprawdź aplikację Telegram na telefonie – powiadomienie powinno już tam być!',
      });
    } else {
      setStatus({
        type: 'error',
        message: `Błąd wysyłania: ${res.error || res.message || 'Sprawdź czy Token i Chat ID są poprawne oraz czy kliknąłeś START u swojego bota w Telegramie.'}`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        data-lenis-prevent
        className="relative w-full max-w-xl max-h-[90vh] bg-[#0d0d12] border border-amber-500/30 rounded-3xl flex flex-col shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#08080a] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Powiadomienia na Telefon (Telegram)
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Otrzymuj klientów ze strony prosto na telefon
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* How it works explanation */}
          <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Jak to działa w praktyce?</span>
            </div>
            Gdy klient na stronie wpisze numer telefonu lub kliknie przycisk wyceny, Twoja strona wysyła sygnał przez API Telegrama. Twój telefon od razu dzwoni/wibruje z pełnymi danymi zlecenia (meble, piętro, numer telefonu).
          </div>

          {/* Step by step guide */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
              Instrukcja konfiguracji w 2 minuty:
            </span>
            <div className="space-y-2 text-xs text-zinc-400">
              {content.telegram.guideSteps.map((step, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-1.5">
                Token Twojego Bota Telegram:
              </label>
              <input
                type="text"
                placeholder="np. 7123456789:AAFnk9..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-1.5">
                Twój Chat ID (z @userinfobot):
              </label>
              <input
                type="text"
                placeholder="np. 123456789"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Feedback status alert */}
          {status && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed ${
                status.type === 'success'
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/15 border border-red-500/30 text-red-300'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleTestSend}
              disabled={isTesting}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>{isTesting ? 'Wysyłanie testu...' : 'Wyślij test na mój telefon'}</span>
            </button>

            <button
              onClick={handleSave}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Zapisz dane
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
