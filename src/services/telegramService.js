// Moduł powiadomień Telegram Bot API dla wspólników CzystoTruck
// TODO: rozważyć dodanie kolejki ponownych prób (retry) przy słabym zasięgu GSM

const STORAGE_KEY_TOKEN = 'czystotruck_telegram_token';
const STORAGE_KEY_CHAT_ID = 'czystotruck_telegram_chat_id';

export const getTelegramConfig = () => {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN) || '';
  const chatId = localStorage.getItem(STORAGE_KEY_CHAT_ID) || '';
  return { token, chatId };
};

export const saveTelegramConfig = (token, chatId) => {
  if (token) localStorage.setItem(STORAGE_KEY_TOKEN, token.trim());
  if (chatId) localStorage.setItem(STORAGE_KEY_CHAT_ID, chatId.trim());
};

export async function sendTelegramNotification(messageText) {
  const { token, chatId } = getTelegramConfig();

  if (!token || !chatId) {
    console.warn('Telegram Bot: Token lub Chat ID nie zostały jeszcze skonfigurowane.');
    return {
      success: false,
      needsConfig: true,
      message: 'Skonfiguruj Token Bota i Chat ID w ustawieniach Telegrama, aby otrzymywać powiadomienia na telefon.',
    };
  }

  // Obsługa wielu odbiorców (np. grupa -100... lub dwa ID po przecinku: id1, id2)
  const recipientIds = chatId
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);

  if (recipientIds.length === 0) {
    return { success: false, error: 'Brak zdefiniowanych identyfikatorów Chat ID.' };
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  // FIXME: Jeśli jeden ze wspólników nie kliknął jeszcze /start w bocie, Telegram zwraca 403 (Forbidden).
  // Traktujemy wysyłkę jako udaną, jeśli przynajmniej jeden z odbiorców (np. grupa lub drugi wspólnik) dostał lead.
  try {
    const results = await Promise.all(
      recipientIds.map(async (targetChatId) => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: targetChatId,
              text: messageText,
              parse_mode: 'HTML',
              disable_web_page_preview: true,
            }),
          });
          const data = await response.json();
          if (!data.ok) {
            console.warn(`[TelegramService] Ostrzeżenie dla czatu ${targetChatId}:`, data.description);
          }
          return data;
        } catch (fetchErr) {
          console.warn(`[TelegramService] Błąd sieciowy dla ${targetChatId}:`, fetchErr.message);
          return { ok: false, description: fetchErr.message };
        }
      })
    );

    const anyOk = results.some(r => r.ok);
    if (anyOk) {
      return { success: true, results };
    } else {
      const errorDesc = results[0]?.description || 'Błąd wysyłania do Telegrama';
      console.error('[TelegramService] Żaden z odbiorców nie otrzymał wiadomości:', results);
      return { success: false, error: errorDesc };
    }
  } catch (err) {
    console.error('Telegram Network error:', err);
    return { success: false, error: err.message };
  }
}

// Formatuje kompletne zgłoszenie dla obu właścicieli
export function formatLeadMessage({
  name,
  phone,
  service,
  location,
  floor,
  disassembly,
  items,
  description,
  timeframe,
  source = 'Podstrona Wyceny /wycena',
}) {
  const now = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
  const cleanPhone = (phone || '').replace(/\s+/g, '');

  return `🚛 <b>NOWE ZLECENIE: CZYSTOTRUCK</b>
━━━━━━━━━━━━━━━━━━━━
📞 <b>TELEFON DO KLIENTA:</b> <a href="tel:${cleanPhone}"><b>${phone || 'Brak'}</b></a>
👤 <b>Imię:</b> ${name || 'Klient ze strony'}
📍 <b>Lokalizacja:</b> ${location || 'Łódź (do ustalenia)'}
🏢 <b>Piętro / Winda:</b> ${floor || 'Parter / Winda'}
🔧 <b>Demontaż mebli:</b> ${disassembly || 'Nie określono'}
📦 <b>Kategoria:</b> ${service || 'Wywóz mebli'}
🛋️ <b>Wybrane rzeczy:</b> ${items || 'Wg opisu klienta'}
📝 <b>Szczegółowy opis:</b> ${description || 'Brak dodatkowego opisu'}
⏱️ <b>Preferowany termin:</b> ${timeframe || 'Jak najszybciej'}
━━━━━━━━━━━━━━━━━━━━
⏰ <b>Zgłoszono:</b> ${now}
🌐 <b>Źródło:</b> ${source}

👉 <i>Kliknij powyższy numer, aby natychmiast oddzwonić do klienta!</i>`;
}

// Formatuje powiadomienie o bezpośrednim kliknięciu w telefon
export function formatCallClickMessage({ phone, source = 'Przycisk szybkiego telefonu' }) {
  const now = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

  return `📞 <b>KLIKNIĘCIE W TELEFON FIRMOWY!</b>
━━━━━━━━━━━━━━━━━━━━
Klient na stronie właśnie kliknął: <b>${source}</b>.
Oczekuj połączenia na telefonie firmowym!
⏰ <b>Czas:</b> ${now}
📍 <b>Rejon:</b> Łódź i okolice`;
}
