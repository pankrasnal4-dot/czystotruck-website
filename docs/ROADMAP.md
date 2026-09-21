# CzystoTruck — Notatki Architektoniczne & Roadmapa Techniczna

Dokument wewnętrzny zespołu developerskiego CzystoTruck (Łódź).

---

## 1. Kluczowe Decyzje Architektoniczne (ADR)

### ADR 01: Dlaczego Telegram Bot API zamiast SMTP / PHP Mailer?
- **Problem**: Wspólnicy są cały dzień w terenie (w aucie, na załadunkach w łódzkich kamienicach). Powiadomienia e-mailowe z formularza PHP często trafiały do spamu lub były odczytywane z kilkugodzinnym opóźnieniem.
- **Decyzja**: Wykorzystanie Telegram Bot API z bezpośrednim linkiem `tel:+48...`.
- **Zysk**: Czas reakcji na lead spadł z 2 godzin do poniżej 5 minut. Wspólnik klika powiadomienie na smartwatchu lub telefonie i od razu dzwoni do klienta.

### ADR 02: Dlaczego zrezygnowano ze sztywnego kalkulatora cenowego w JS?
- **Problem**: Algorytm liczący koszt per mebel lub per metr kwadratowy dramatycznie zaniżał ceny przy starych meblościankach z PRL (lite drewno, ogromna waga) i kamienicach bez windy (np. 4. piętro na Wólczańskiej).
- **Decyzja**: Przejście na model: *„Klient wybiera kategorie + opis/zdjęcia &rarr; natychmiastowy telefon z gwarancją stałej ceny z góry”*.
- **Rezultat**: Zero sporów z klientami o dopłaty na miejscu zlecenia.

### ADR 03: Standalone Single-File Bundle (`vite-plugin-singlefile`)
- **Cel**: Możliwość natychmiastowego otwarcia pliku `CzystoTruck-Strona.html` offline z pendrive'a lub dowolnego tabletu bez konieczności stawiania serwera Node.js.

---

## 2. Roadmapa Wdrożeń

### Q2 2026:
- [ ] **Załączanie zdjęć w formularzu**: Upload do 3 zdjęć mebli bezpośrednio w kroku 1 wyceny (konwersja na canvas webp do 800px i wysyłka przez `bot.sendPhoto`).
- [ ] **Szybkie płatności bezgotówkowe**: Integracja terminali SumUp / BLIK dla kierowców na załadunku.
- [ ] **Obsługa KPO (Karta Przekazania Odpadu)**: Generator oświadczenia o legalnej utylizacji w łódzkim PSZOK dla klientów firmowych i wspólnot mieszkaniowych.

### Q3 2026:
- [ ] **Optymalizacja tras załadunkowych**: Automatyczne grupowanie zleceń wg dzielnic (np. Bałuty rano, Widzew/Dąbrowa popołudniu).
- [ ] **Moduł ocen Google Moja Firma**: Wysyłka SMS z podziękowaniem i prośbą o opinię po oznaczonym wykonaniu zlecenia.

---

*Ostatnia aktualizacja: Wrzesień 2026 | Zespół CzystoTruck Łódź*
