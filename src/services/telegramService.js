// Moduł powiadomień Telegram Bot API dla dyspozytora CzystoTruck
// TODO: rozważyć dodanie kolejki ponownych prób (retry) przy słabym zasięgu GSM

const STORAGE_KEY_TOKEN = 'czystotruck_telegram_token';
const STORAGE_KEY_CHAT_ID = 'czystotruck_telegram_chat_id';

// Default / fallback credentials (can be overridden in settings dialog or localStorage)
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
    // Return mock success with warning so user knows to configure it
    return {
      success: false,
      needsConfig: true,
      message: 'Skonfiguruj Token Bota i Chat ID w ustawieniach Telegrama, aby otrzymywać powiadomienia na telefon.',
    };
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true, data };
    } else {
      console.error('Telegram API error:', data);
      return { success: false, error: data.description };
    }
  } catch (err) {
    console.error('Telegram Network error:', err);
    return { success: false, error: err.message };
  }
}

// Formats a new lead into an aesthetic Telegram notification
export function formatLeadMessage({ name, phone, service, floor, items, description, source = 'Strona WWW' }) {
  const now = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

  return `🔥 <b>NOWE ZGŁOSZENIE: CZYSTOTRUCK</b>
━━━━━━━━━━━━━━━━━━
📞 <b>Telefon klienta:</b> <code>${phone || 'Brak'}</code>
👤 <b>Imię / Kontakt:</b> ${name || 'Klient ze strony'}
📦 <b>Usługa:</b> ${service || 'Wywóz mebli'}
🏢 <b>Piętro / Winda:</b> ${floor || 'Nie podano'}
🛋️ <b>Rzeczy do wywiezienia:</b> ${items || 'Zgodnie z opisem'}
📝 <b>Opis / Uwagi:</b> ${description || 'Brak dodatkowego opisu'}
━━━━━━━━━━━━━━━━━━
⏰ <b>Data:</b> ${now}
📍 <b>Miasto:</b> Łódź i okolice
🌐 <b>Źródło:</b> ${source}

👉 <i>Oddzwoń do klienta natychmiast: <a href="tel:${phone}">${phone}</a></i>`;
}

// Formats a quick call alert
export function formatCallClickMessage({ phone, source = 'Przycisk szybkiego telefonu' }) {
  const now = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

  return `📞 <b>KLIKNIĘCIE W NUMER TELEFONU!</b>
━━━━━━━━━━━━━━━━━━
Klient na stronie właśnie kliknął: <b>${source}</b>.
Bądź przygotowany na telefon pod numerem firmowym!
⏰ <b>Czas:</b> ${now}
📍 <b>Rejon:</b> Łódź`;
}
