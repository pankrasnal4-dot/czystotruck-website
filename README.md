# CzystoTruck • Serwis Internetowy

Strona internetowa firmy CzystoTruck świadczącej usługi wywozu starych mebli, opróżniania mieszkań, piwnic i strychów na terenie Łodzi i województwa łódzkiego.

## Funkcjonalności

- Responsywny układ dostosowany do urządzeń mobilnych i desktopowych
- Interaktywny konfigurator szybkiej wyceny (wybór gabarytów, kondygnacji i opisu)
- Samobieżny pasek informacyjny (marquee)
- Bezpośrednia obsługa połączeń telefonicznych (`tel:`) oraz czatu WhatsApp
- System powiadomień o nowych leadach przez Telegram Bot API
- Tryb offline – możliwość uruchomienia strony bezpośrednio z pliku `CzystoTruck-Strona.html` bez środowiska Node.js

## Wymagania

- Node.js >= 18.x
- npm >= 9.x

## Uruchomienie lokalne

```bash
# Instalacja pakietów
npm install

# Uruchomienie serwera developerskiego
npm run dev

# Zbudowanie paczki produkcyjnej (oraz standalone HTML)
npm run build

# Uruchomienie testów jednostkowych
npm test
```

## Struktura projektu

```
src/
├── components/          # Komponenty interfejsu użytkownika
├── data/
│   └── content.json     # Dane tekstowe i konfiguracyjne
├── hooks/               # Niestandardowe hooki React (m.in. Lenis smooth scroll)
├── services/            # Serwisy zewnętrzne (Telegram Bot API)
├── index.css            # Style Tailwind i animacje
├── App.jsx              # Główny widok aplikacji
└── main.jsx             # Punkt startowy React
test/
└── suite.test.js        # Zestaw testów jednostkowych
```

## Testy

Projekt posiada automatyczny zestaw testów weryfikujący poprawność danych kontaktowych, strukturę oferty oraz formatowanie powiadomień:

```bash
npm test
```

## Licencja

Projekt prywatny firmy CzystoTruck Łódź. Wszelkie prawa zastrzeżone.
