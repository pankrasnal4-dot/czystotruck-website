import { test, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import content from '../src/data/content.json' with { type: 'json' };
import { formatLeadMessage, formatCallClickMessage } from '../src/services/telegramService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CzystoTruck Core Test Suite', () => {
  it('powinien zawierać prawidłowe dane kontaktowe w content.json', () => {
    assert.equal(content.company.name, 'CzystoTruck');
    assert.equal(content.company.phone, '+48 514 690 066');
    assert.equal(content.company.phoneRaw, '+48514690066');
    assert.ok(content.company.hours.includes('Pn - Sb'));
  });

  it('powinien zawierać 4 główne usługi', () => {
    assert.equal(content.services.length, 4);
    const serviceIds = content.services.map(s => s.id);
    assert.ok(serviceIds.includes('meble'));
    assert.ok(serviceIds.includes('mieszkania'));
    assert.ok(serviceIds.includes('piwnice'));
    assert.ok(serviceIds.includes('tragarze'));
  });

  it('powinien zawierać listę dzielnic Łodzi', () => {
    assert.ok(content.districts.length >= 10);
    assert.ok(content.districts.includes('Bałuty'));
    assert.ok(content.districts.includes('Śródmieście'));
    assert.ok(content.districts.includes('Widzew'));
  });

  it('powinien poprawnie formatować wiadomość leada dla Telegrama z pełnymi danymi zlecenia', () => {
    const lead = formatLeadMessage({
      name: 'Tomasz Nowak',
      phone: '514 690 066',
      service: 'Stare Meble & Gabaryty',
      location: 'Bałuty, ul. Limanowskiego 12',
      floor: '3. piętro (kamienica bez windy)',
      disassembly: 'Potrzebny demontaż na miejscu',
      items: 'Kanapa narożna, szafa trzydrzwiowa',
      description: 'Bardzo ciężka szafa i narożnik do rozebrania',
      timeframe: 'Jak najszybciej (dzisiaj / jutro)',
      source: 'Podstrona Wyceny CzystoTruck (/wycena)',
    });

    assert.ok(lead.includes('CZYSTOTRUCK'));
    assert.ok(lead.includes('Tomasz Nowak'));
    assert.ok(lead.includes('514 690 066'));
    assert.ok(lead.includes('href="tel:'));
    assert.ok(lead.includes('Bałuty, ul. Limanowskiego 12'));
    assert.ok(lead.includes('3. piętro'));
    assert.ok(lead.includes('Potrzebny demontaż'));
    assert.ok(lead.includes('Jak najszybciej'));
  });

  it('powinien poprawnie formatować alert kliknięcia w telefon', () => {
    const alert = formatCallClickMessage({
      phone: '+48 514 690 066',
      source: 'Główny przycisk połączenia w sekcji Hero',
    });

    assert.ok(alert.includes('KLIKNIĘCIE'));
    assert.ok(alert.includes('Hero'));
  });

  it('powinien posiadać autentyczne zdjęcia w src/assets i public/images', () => {
    const piwnicaPath = path.join(__dirname, '../src/assets/piwnica.jpg');
    assert.ok(fs.existsSync(piwnicaPath), 'Plik piwnica.jpg musi istnieć w src/assets');
    assert.ok(fs.statSync(piwnicaPath).size > 10000, 'Zdjęcie piwnicy nie może być puste');

    const heroImagePath = path.join(__dirname, '../src/assets/hero-cleared.jpg');
    assert.ok(fs.existsSync(heroImagePath), 'Plik hero-cleared.jpg musi istnieć w src/assets');
    assert.ok(fs.statSync(heroImagePath).size > 10000, 'Zdjęcie hero nie może być puste');
  });
});
