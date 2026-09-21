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

  it('powinien poprawnie formatować wiadomość leada dla Telegrama', () => {
    const lead = formatLeadMessage({
      name: 'Jan Kowalski',
      phone: '514690066',
      service: 'Wywóz mebli',
      floor: '2. piętro',
      items: 'Kanapa, Szafa',
      description: 'Stara rogówka do zniesienia',
      source: 'Widget Hero',
    });

    assert.ok(lead.includes('CZYSTOTRUCK'));
    assert.ok(lead.includes('514690066'));
    assert.ok(lead.includes('Kanapa, Szafa'));
    assert.ok(lead.includes('Stara rogówka do zniesienia'));
  });

  it('powinien poprawnie formatować alert kliknięcia w telefon', () => {
    const alert = formatCallClickMessage({
      phone: '+48 514 690 066',
      source: 'Nagłówek',
    });

    assert.ok(alert.includes('KLIKNIĘCIE'));
    assert.ok(alert.includes('Nagłówek'));
  });

  it('powinien posiadać plik ze zdjęciem piwnicy w src/assets', () => {
    const imagePath = path.join(__dirname, '../src/assets/piwnica.jpg');
    assert.ok(fs.existsSync(imagePath), 'Plik piwnica.jpg musi istnieć w src/assets');
    const stats = fs.statSync(imagePath);
    assert.ok(stats.size > 10000, 'Zdjęcie piwnicy nie może być puste');
  });
});
