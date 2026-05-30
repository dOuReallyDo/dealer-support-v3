import type { Offer, DiscountRule, CategoryMeta, OfferCategory } from '@/types';

export const CATEGORIES: CategoryMeta[] = [
  { name: 'Mobile', icon: '📱', order: 0 },
  { name: 'Fissa', icon: '🏠', order: 1 },
  { name: 'Energia', icon: '⚡', order: 2 },
  { name: 'Assicurazioni', icon: '🛡️', order: 3 },
  { name: 'Smartphone', icon: '📞', order: 4 },
];

export const CATEGORY_MAP: Record<OfferCategory, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.name, c])
) as Record<OfferCategory, CategoryMeta>;

/* ──────────────────────────────────────────────────
   WINDTRE OFFERS (from offers-windtre.json + existing)
   ────────────────────────────────────────────────── */
const windtreOffers: Offer[] = [
  // Mobile
  { id: 'wt-mobile-50gb', operatorId: 'windtre', category: 'Mobile', name: 'WindTre Mobile 5G 50GB', subtitle: 'Offerta base 5G con 50 GB', basePrice: 9.99, price: 9.99, billing: 'Mensile', features: '50 GB 5G|Minuti illimitati|SMS illimitati|4,3 GB roaming UE', rules: '', active: true, sort: 0 },
  { id: 'wt-mobile-100gb', operatorId: 'windtre', category: 'Mobile', name: 'WindTre Mobile 5G 100GB', subtitle: 'Offerta intermedia 5G', basePrice: 12.99, price: 12.99, billing: 'Mensile', features: '100 GB 5G|Minuti illimitati|SMS illimitati|8,6 GB roaming UE', rules: '', active: true, sort: 1 },
  { id: 'wt-mobile-200gb', operatorId: 'windtre', category: 'Mobile', name: 'WindTre Mobile 5G 200GB', subtitle: 'Offerta avanzata 5G', basePrice: 17.99, price: 17.99, billing: 'Mensile', features: '200 GB 5G|Minuti illimitati|SMS illimitati|16,2 GB roaming UE', rules: '', active: true, sort: 2 },
  { id: 'wt-mobile-unlimited', operatorId: 'windtre', category: 'Mobile', name: 'WindTre Mobile 5G Unlimited', subtitle: 'Offerta top 5G con dati illimitati', basePrice: 24.99, price: 24.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|SMS illimitati|Roaming UE illimitato', rules: '', active: true, sort: 3 },
  // Fissa
  { id: 'wt-fixed-1giga', operatorId: 'windtre', category: 'Fissa', name: 'WindTre Fibra 1 Giga', subtitle: 'Fibra FTTH fino a 1 Gbps', basePrice: 23.99, price: 23.99, billing: 'Mensile', features: '1 Gbps download|300 Mbps upload|Chiamate illimitate|Modem incluso', rules: 'fixed_mobile_discount', active: true, sort: 5 },
  { id: 'wt-fixed-2giga5', operatorId: 'windtre', category: 'Fissa', name: 'WindTre Fibra 2,5 Giga', subtitle: 'Fibra FTTH ultra-veloce', basePrice: 27.99, price: 27.99, billing: 'Mensile', features: '2,5 Gbps download|1 Gbps upload|Chiamate illimitate|Modem WiFi 6E incluso', rules: '', active: true, sort: 6 },
  // Convergenza
  { id: 'wt-convergenza', operatorId: 'windtre', category: 'Fissa', name: 'WindTre Casa + Mobile', subtitle: 'Combo fibra + mobile con sconto', basePrice: 32.99, price: 32.99, billing: 'Mensile', features: 'Fibra 1Gbps|SIM Mobile 50GB|Sconto convergenza|Chiamate illimitate', rules: '', active: true, sort: 7 },
  // Energia
  { id: 'wt-energy-luce-fissa', operatorId: 'windtre', category: 'Energia', name: 'WindTre Luce Fissa', subtitle: 'Prezzo fisso bloccato 12 mesi', basePrice: 13.0, price: 13.0, billing: 'Annuale/12', features: 'Prezzo fisso 12 mesi|PUN + spread|Energia rinnovabile|Gestione da app', rules: 'energy_w3_discount', active: true, sort: 8 },
  { id: 'wt-energy-luce-var', operatorId: 'windtre', category: 'Energia', name: 'WindTre Luce Variabile', subtitle: 'Segue andamento di mercato', basePrice: 11.0, price: 11.0, billing: 'Annuale/12', features: 'PUN + spread|Prezzo variabile|Nessun vincolo|Gestione da app', rules: 'energy_w3_discount', active: true, sort: 9 },
  { id: 'wt-energy-gas', operatorId: 'windtre', category: 'Energia', name: 'WindTre Gas Fisso', subtitle: 'Gas con prezzo bloccato 12 mesi', basePrice: 13.0, price: 13.0, billing: 'Annuale/12', features: 'PSV + spread|Prezzo fisso 12 mesi|Compensazione CO₂|Gestione da app', rules: 'energy_w3_discount', active: true, sort: 10 },
  // Assicurazioni
  { id: 'wt-ins-elettro', operatorId: 'windtre', category: 'Assicurazioni', name: 'Elettrodomestici', subtitle: 'Protezione per grandi elettrodomestici e TV', basePrice: 4.99, price: 4.99, billing: 'Mensile', features: 'Riparazione guasti|Indennizzo irreparabilità|TV e audio/video|Polizza annuale', rules: '', active: true, sort: 11 },
  { id: 'wt-ins-travel', operatorId: 'windtre', category: 'Assicurazioni', name: 'Viaggi e Vacanze', subtitle: 'Protezione annuale Italia ed Europa', basePrice: 7.99, price: 7.99, billing: 'Mensile', features: 'Ritardo aereo|Bagaglio|Annullamento|Assistenza medica', rules: '', active: true, sort: 12 },
  { id: 'wt-ins-casa', operatorId: 'windtre', category: 'Assicurazioni', name: 'Casa e Famiglia Start', subtitle: 'Tutela per famiglia e assistenza casa', basePrice: 9.99, price: 9.99, billing: 'Mensile', features: 'RC terzi|Emergenze casa|Assistenza digitale|Pagamento canoni', rules: '', active: true, sort: 13 },
  { id: 'wt-ins-pet', operatorId: 'windtre', category: 'Assicurazioni', name: 'Micio e Fido', subtitle: 'Spese veterinarie e assistenza h24', basePrice: 19.99, price: 13.99, promoPrice: 13.99, promoLabel: 'Promo', billing: 'Mensile', features: 'Ricovero/intervento|Altre spese|Assistenza h24|Copertura fino a fine vita', rules: 'promo_price', active: true, sort: 14 },
  // Smartphone
  { id: 'wt-phone-xiaomi15t', operatorId: 'windtre', category: 'Smartphone', name: 'Xiaomi 15T', subtitle: 'Smartphone a rate con Unlimited Pro 5G', basePrice: 9.99, price: 9.99, billing: 'Mensile', features: 'Anticipo 99,99€|Sconto device 120€|Finanziamento online|Con piano mobile', rules: '', active: true, sort: 15 },
  { id: 'wt-phone-s25plus', operatorId: 'windtre', category: 'Smartphone', name: 'Samsung Galaxy S25+ 256GB', subtitle: 'Smartphone a rate con Unlimited Pro 5G', basePrice: 23.99, price: 23.99, billing: 'Mensile', features: 'Anticipo 169,99€|Sconto device 66€|Finanziamento online|Con piano mobile', rules: '', active: true, sort: 16 },
  { id: 'wt-phone-iphone17pro', operatorId: 'windtre', category: 'Smartphone', name: 'Apple iPhone 17 Pro', subtitle: 'Smartphone a rate con Unlimited Pro 5G', basePrice: 34.99, price: 34.99, billing: 'Mensile', features: 'Anticipo 99,99€|Carta di credito|Finanziamento online|Con piano mobile', rules: '', active: true, sort: 17 },
];

/* ──────────────────────────────────────────────────
   TIM OFFERS (from offers-tim.json + existing)
   ────────────────────────────────────────────────── */
const timOffers: Offer[] = [
  // Mobile
  { id: 'tim-mobile-base', operatorId: 'tim', category: 'Mobile', name: 'TIM Mobile Base', subtitle: 'Offerta base con 30 GB', basePrice: 8.99, price: 8.99, billing: 'Mensile', features: '30 GB 4G/5G|Minuti illimitati|SMS illimitati|2,9 GB roaming UE', rules: '', active: true, sort: 0 },
  { id: 'tim-mobile-piu', operatorId: 'tim', category: 'Mobile', name: 'TIM Mobile Più', subtitle: 'Offerta intermedia 5G con 80 GB', basePrice: 12.99, price: 12.99, billing: 'Mensile', features: '80 GB 5G|Minuti illimitati|SMS illimitati|7,7 GB roaming UE', rules: '', active: true, sort: 1 },
  { id: 'tim-mobile-top', operatorId: 'tim', category: 'Mobile', name: 'TIM Mobile Top', subtitle: 'Offerta avanzata 5G con 150 GB', basePrice: 19.99, price: 19.99, billing: 'Mensile', features: '150 GB 5G|Minuti illimitati|SMS illimitati|14,4 GB roaming UE', rules: '', active: true, sort: 2 },
  { id: 'tim-mobile-unlimited', operatorId: 'tim', category: 'Mobile', name: 'TIM Mobile Unlimited', subtitle: 'Offerta top 5G illimitata', basePrice: 29.99, price: 29.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|SMS illimitati|Roaming UE illimitato', rules: '', active: true, sort: 3 },
  // Fissa
  { id: 'tim-fixed-1giga', operatorId: 'tim', category: 'Fissa', name: 'TIM Fibra 1 Giga', subtitle: 'Fibra FTTH fino a 1 Gbps', basePrice: 24.90, price: 24.90, billing: 'Mensile', features: '1 Gbps download|300 Mbps upload|Chiamate illimitate|TIM Hub Plus incluso', rules: 'fixed_mobile_discount', active: true, sort: 4 },
  { id: 'tim-fixed-2giga5', operatorId: 'tim', category: 'Fissa', name: 'TIM Fibra 2,5 Giga', subtitle: 'Fibra FTTH ultra veloce', basePrice: 29.90, price: 29.90, billing: 'Mensile', features: '2,5 Gbps download|1 Gbps upload|Chiamate illimitate|TIM Hub 2,5G WiFi 6E incluso', rules: '', active: true, sort: 5 },
  { id: 'tim-fixed-fwa', operatorId: 'tim', category: 'Fissa', name: 'TIM FWA', subtitle: 'Internet casa senza fibra — connessione radio', basePrice: 24.90, price: 24.90, billing: 'Mensile', features: 'Fino a 100 Mbps|Fino a 50 Mbps upload|Chiamate illimitate|Modem incluso', rules: '', active: true, sort: 6 },
  // Convergenza
  { id: 'tim-convergenza', operatorId: 'tim', category: 'Fissa', name: 'TIM Unica', subtitle: 'Offerta convergente fibra + mobile', basePrice: 35.90, price: 35.90, billing: 'Mensile', features: 'Fibra 1Gbps|SIM Mobile 80GB|Sconto convergenza|Chiamate illimitate', rules: '', active: true, sort: 7 },
  // Energia
  { id: 'tim-energy-luce', operatorId: 'tim', category: 'Energia', name: 'TIM Energia Luce Fissa', subtitle: 'Prezzo fisso bloccato per 12 mesi', basePrice: 12.0, price: 12.0, billing: 'Annuale/12', features: '0,107 €/kWh indicativo|Prezzo fisso 12 mesi|Energia verde|Sconto cliente TIM', rules: 'energy_discount', active: true, sort: 8 },
  { id: 'tim-energy-gas', operatorId: 'tim', category: 'Energia', name: 'TIM Energia Gas Fisso', subtitle: 'Prezzo bloccato 12 mesi', basePrice: 12.0, price: 12.0, billing: 'Annuale/12', features: 'PSV + spread|Prezzo fisso 12 mesi|Nessun vincolo|Gestione da app', rules: 'energy_discount', active: true, sort: 9 },
  // Assicurazioni
  { id: 'tim-ins-protect', operatorId: 'tim', category: 'Assicurazioni', name: 'TIM Protect', subtitle: 'Copertura device e protezione digitale', basePrice: 5.99, price: 5.99, billing: 'Mensile', features: 'Protezione device|Sicurezza digitale|Assistenza remota|Polizza annuale', rules: '', active: true, sort: 10 },
  // Smartphone
  { id: 'tim-phone-s25', operatorId: 'tim', category: 'Smartphone', name: 'Samsung Galaxy S25', subtitle: 'A rate con piano TIM Unlimited 5G', basePrice: 19.99, price: 19.99, billing: 'Mensile', features: 'Anticipo 149€|Finanziamento 30 mesi|Sconto TIM 100€|Con piano mobile', rules: '', active: true, sort: 11 },
  { id: 'tim-phone-iphone17', operatorId: 'tim', category: 'Smartphone', name: 'Apple iPhone 17', subtitle: 'A rate con piano TIM Unlimited 5G', basePrice: 29.99, price: 29.99, billing: 'Mensile', features: 'Anticipo 99€|Finanziamento 24 mesi|Carta di credito|Con piano mobile', rules: '', active: true, sort: 12 },
];

/* ──────────────────────────────────────────────────
   VODAFONE OFFERS (from offers-vodafone.json + existing)
   ────────────────────────────────────────────────── */
const vodafoneOffers: Offer[] = [
  // Mobile
  { id: 'voda-mobile-unlimited', operatorId: 'vodafone', category: 'Mobile', name: 'Vodafone Giga Unlimited', subtitle: 'Offerta base mobile 5G illimitata', basePrice: 9.99, price: 9.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|SMS illimitati|4,3 GB roaming UE', rules: '', active: true, sort: 0 },
  { id: 'voda-mobile-plus', operatorId: 'vodafone', category: 'Mobile', name: 'Vodafone Giga Unlimited+', subtitle: 'Con più roaming UE', basePrice: 14.99, price: 14.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|SMS illimitati|8,6 GB roaming UE', rules: '', active: true, sort: 1 },
  { id: 'voda-mobile-top', operatorId: 'vodafone', category: 'Mobile', name: 'Vodafone Giga Unlimited Top', subtitle: 'Top roaming UE incluso', basePrice: 19.99, price: 19.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|SMS illimitati|16,2 GB roaming UE', rules: '', active: true, sort: 2 },
  { id: 'voda-mobile-dati', operatorId: 'vodafone', category: 'Mobile', name: 'Vodafone SIM Dati', subtitle: 'SIM solo dati per tablet/router', basePrice: 14.99, price: 14.99, billing: 'Mensile', features: '100 GB 5G|Solo dati|Roaming incluso|Per tablet/router', rules: '', active: true, sort: 3 },
  // Fissa
  { id: 'voda-fixed-fibra', operatorId: 'vodafone', category: 'Fissa', name: 'Vodafone Internet Casa Fibra', subtitle: 'Fibra 1 Gbps FTTH', basePrice: 29.95, price: 29.95, billing: 'Mensile', features: '1 Gbps download FTTH|300 Mbps upload|Chiamate illimitate|Vodafone Station incluso', rules: 'fixed_mobile_discount', active: true, sort: 4 },
  { id: 'voda-fixed-fwa', operatorId: 'vodafone', category: 'Fissa', name: 'Vodafone Casa Wireless Plus', subtitle: 'FWA — connessione radio', basePrice: 24.90, price: 24.90, billing: 'Mensile', features: 'Fino a 100 Mbps FWA|Fino a 50 Mbps upload|Chiamate illimitate|Modem incluso', rules: '', active: true, sort: 5 },
  // Convergenza
  { id: 'voda-convergenza', operatorId: 'vodafone', category: 'Fissa', name: 'Vodafone Superconvergenza', subtitle: 'Rete Fissa + SIM con fino a 312€ di sconto', basePrice: 33.90, price: 33.90, billing: 'Mensile', features: 'Fibra + SIM Mobile|Fino a 312€ sconto annuo|Attivazione gratis|Nessun vincolo', rules: '', active: true, sort: 6 },
  // Energia
  { id: 'voda-energy-luce-start', operatorId: 'vodafone', category: 'Energia', name: 'Fastweb Luce Flat Start', subtitle: 'Canone bloccato 36 mesi — fino a 800 kWh/anno', basePrice: 41.0, price: 41.0, billing: 'Mensile', features: 'Flat fisso bloccato|800 kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 7 },
  { id: 'voda-energy-luce-light', operatorId: 'vodafone', category: 'Energia', name: 'Fastweb Luce Flat Light', subtitle: 'Canone bloccato 36 mesi — fino a 1500 kWh/anno', basePrice: 56.0, price: 56.0, billing: 'Mensile', features: 'Flat fisso bloccato|1500 kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 8 },
  { id: 'voda-energy-luce-pro', operatorId: 'vodafone', category: 'Energia', name: 'Fastweb Luce Flat Pro', subtitle: 'Canone bloccato 36 mesi — fino a 2500 kWh/anno', basePrice: 76.0, price: 76.0, billing: 'Mensile', features: 'Flat fisso bloccato|2500 kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 9 },
  // Assicurazioni
  { id: 'voda-ins-rete-sicura', operatorId: 'vodafone', category: 'Assicurazioni', name: 'Vodafone Rete Sicura 2.0', subtitle: 'Protezione digitale e sicurezza navigazione', basePrice: 3.99, price: 3.99, billing: 'Mensile', features: 'Protezione digitale|Sicurezza navigazione|Antivirus|Parental control', rules: '', active: true, sort: 10 },
  // Smartphone
  { id: 'voda-phone-s25ultra', operatorId: 'vodafone', category: 'Smartphone', name: 'Samsung Galaxy S25 Ultra', subtitle: 'A rate con Vodafone Unlimited Plus', basePrice: 25.99, price: 25.99, billing: 'Mensile', features: 'Anticipo 199€|Finanziamento 30 mesi|Sconto Vodafone|Con piano mobile', rules: '', active: true, sort: 11 },
  { id: 'voda-phone-iphone17pro', operatorId: 'vodafone', category: 'Smartphone', name: 'Apple iPhone 17 Pro', subtitle: 'A rate con Vodafone Unlimited Plus', basePrice: 34.99, price: 34.99, billing: 'Mensile', features: 'Anticipo 149€|Finanziamento 24 mesi|Sconto Vodafone|Con piano mobile', rules: '', active: true, sort: 12 },
];

/* ──────────────────────────────────────────────────
   FASTWEB OFFERS (from offers-fastweb.json + existing)
   ────────────────────────────────────────────────── */
const fastwebOffers: Offer[] = [
  // Mobile
  { id: 'fw-mobile-150gb', operatorId: 'fastweb', category: 'Mobile', name: 'Fastweb Mobile 150GB 5G', subtitle: 'Offerta base mobile 5G', basePrice: 9.99, price: 9.99, billing: 'Mensile', features: '150 GB 5G|Minuti illimitati|300 SMS|32 GB roaming UE+UK+CH', rules: '', active: true, sort: 0 },
  { id: 'fw-mobile-250gb', operatorId: 'fastweb', category: 'Mobile', name: 'Fastweb Mobile 250GB 5G', subtitle: 'Offerta intermedia 5G', basePrice: 14.99, price: 14.99, billing: 'Mensile', features: '250 GB 5G|Minuti illimitati|500 SMS|43 GB roaming UE+UK+CH', rules: '', active: true, sort: 1 },
  { id: 'fw-mobile-400gb', operatorId: 'fastweb', category: 'Mobile', name: 'Fastweb Mobile 400GB 5G', subtitle: 'Offerta grande 5G', basePrice: 19.99, price: 19.99, billing: 'Mensile', features: '400 GB 5G|Minuti illimitati|SMS inclusi|Roaming incluso', rules: '', active: true, sort: 2 },
  { id: 'fw-mobile-unlimited', operatorId: 'fastweb', category: 'Mobile', name: 'Fastweb Mobile Unlimited 5G', subtitle: 'Offerta top 5G illimitata', basePrice: 24.99, price: 24.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|1000 SMS|Roaming UE illimitato', rules: '', active: true, sort: 3 },
  // Fissa
  { id: 'fw-fixed-base', operatorId: 'fastweb', category: 'Fissa', name: 'Fastweb Casa Fibra', subtitle: 'Fibra 1 Gbps FTTH — prezzo promozionale', basePrice: 31.95, price: 26.95, promoPrice: 26.95, promoLabel: 'Promo -5€/mese', billing: 'Mensile', features: '1 Gbps download FTTH|300 Mbps upload|Chiamate illimitate|Modem WiFi 7 incluso', rules: 'fixed_mobile_discount', active: true, sort: 4 },
  { id: 'fw-fixed-plus', operatorId: 'fastweb', category: 'Fissa', name: 'Fastweb Casa Fibra Plus', subtitle: 'Pacchetto completo con assistenza', basePrice: 39.95, price: 34.95, promoPrice: 34.95, promoLabel: 'Promo -5€/mese', billing: 'Mensile', features: '1 Gbps download FTTH|300 Mbps upload|Chiamate illimitate|Modem WiFi 7 + 2 Booster', rules: '', active: true, sort: 5 },
  { id: 'fw-fixed-nextx', operatorId: 'fastweb', category: 'Fissa', name: 'Fastweb NeXXt One', subtitle: 'Internet illimitato senza voce', basePrice: 24.95, price: 24.95, billing: 'Mensile', features: '1 Gbps download|300 Mbps upload|Solo internet|Modem WiFi 6 incluso', rules: '', active: true, sort: 6 },
  // Convergenza
  { id: 'fw-convergenza', operatorId: 'fastweb', category: 'Fissa', name: 'Fastweb Casa + Mobile + Energia', subtitle: 'Superconvergenza — fino a -312€/anno', basePrice: 49.90, price: 49.90, billing: 'Mensile', features: 'Fibra 1Gbps|Mobile illimitato|Luce Flat|Sconto -312€/anno', rules: '', active: true, sort: 7 },
  // Energia
  { id: 'fw-energy-luce-start', operatorId: 'fastweb', category: 'Energia', name: 'Fastweb Luce Flat Start', subtitle: 'Canone bloccato 36 mesi — fino a 800 kWh/anno', basePrice: 41.0, price: 41.0, billing: 'Mensile', features: 'Flat fisso bloccato|800 kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 8 },
  { id: 'fw-energy-luce-light', operatorId: 'fastweb', category: 'Energia', name: 'Fastweb Luce Flat Light', subtitle: 'Canone bloccato 36 mesi — fino a 1500 kWh/anno', basePrice: 56.0, price: 56.0, billing: 'Mensile', features: 'Flat fisso bloccato|1500 kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 9 },
  { id: 'fw-energy-luce-pro', operatorId: 'fastweb', category: 'Energia', name: 'Fastweb Luce Flat Pro', subtitle: 'Canone bloccato 36 mesi — fino a 2500 kWh/anno', basePrice: 76.0, price: 76.0, billing: 'Mensile', features: 'Flat fisso bloccato|2500 kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 10 },
  { id: 'fw-energy-luce-maxi', operatorId: 'fastweb', category: 'Energia', name: 'Fastweb Luce Flat Maxi', subtitle: 'Canone bloccato 36 mesi — oltre 4000 kWh/anno', basePrice: 91.0, price: 91.0, billing: 'Mensile', features: 'Flat fisso bloccato|4000+ kWh/anno|36 mesi|Sconto con mobile', rules: 'energy_discount', active: true, sort: 11 },
  // Assicurazioni
  { id: 'fw-ins-quixa', operatorId: 'fastweb', category: 'Assicurazioni', name: 'Quixa Assistenza Casa', subtitle: 'Inclusa nelle offerte Casa Plus', basePrice: 3.99, price: 3.99, billing: 'Mensile', features: 'Assistenza Casa|Assistenza Plus|Fastweb Club|Fastweb Protect', rules: '', active: true, sort: 12 },
  // Smartphone
  { id: 'fw-phone-s25fe', operatorId: 'fastweb', category: 'Smartphone', name: 'Samsung Galaxy S25 FE', subtitle: 'A rate con Fastweb Mobile', basePrice: 14.99, price: 14.99, billing: 'Mensile', features: 'Anticipo 99€|Finanziamento 24 mesi|Sconto device|Con piano mobile', rules: '', active: true, sort: 13 },
  { id: 'fw-phone-iphone17pro', operatorId: 'fastweb', category: 'Smartphone', name: 'Apple iPhone 17 Pro', subtitle: 'A rate con Fastweb Mobile Unlimited', basePrice: 29.99, price: 29.99, billing: 'Mensile', features: 'Anticipo 149€|Finanziamento 24 mesi|Sconto device|Con piano mobile', rules: '', active: true, sort: 14 },
];

/* ──────────────────────────────────────────────────
   ILIAD OFFERS (from offers-iliad.json + existing)
   ────────────────────────────────────────────────── */
const iliadOffers: Offer[] = [
  // Mobile
  { id: 'iliad-mobile-50gb', operatorId: 'iliad', category: 'Mobile', name: 'iliad 50 GB', subtitle: 'Offerta base — prezzo storico iliad', basePrice: 7.99, price: 7.99, billing: 'Mensile', features: '50 GB 4G/5G|Minuti illimitati|SMS illimitati|4 GB roaming UE', rules: '', active: true, sort: 0 },
  { id: 'iliad-mobile-120gb', operatorId: 'iliad', category: 'Mobile', name: 'iliad 120 GB', subtitle: 'Offerta intermedia 5G', basePrice: 9.99, price: 9.99, billing: 'Mensile', features: '120 GB 5G|Minuti illimitati|SMS illimitati|8 GB roaming UE', rules: '', active: true, sort: 1 },
  { id: 'iliad-mobile-200gb', operatorId: 'iliad', category: 'Mobile', name: 'iliad 200 GB', subtitle: 'Offerta avanzata 5G', basePrice: 14.99, price: 14.99, billing: 'Mensile', features: '200 GB 5G|Minuti illimitati|SMS illimitati|14 GB roaming UE', rules: '', active: true, sort: 2 },
  { id: 'iliad-mobile-unlimited', operatorId: 'iliad', category: 'Mobile', name: 'iliad Unlimited', subtitle: 'Offerta top illimitata 5G', basePrice: 24.99, price: 24.99, billing: 'Mensile', features: 'GIGA illimitati 5G|Minuti illimitati|SMS illimitati|Roaming UE illimitato', rules: '', active: true, sort: 3 },
  // Fissa
  { id: 'iliad-fixed-1giga', operatorId: 'iliad', category: 'Fissa', name: 'iliad Fibra 1 Giga', subtitle: 'Offerta fibra FTTH — prezzo low-cost', basePrice: 19.99, price: 19.99, billing: 'Mensile', features: '1 Gbps download FTTH|300 Mbps upload|Chiamate illimitate|Modem incluso', rules: '', active: true, sort: 4 },
  { id: 'iliad-fixed-2giga5', operatorId: 'iliad', category: 'Fissa', name: 'iliad Fibra 2,5 Giga', subtitle: 'Fibra ultra-veloce FTTH', basePrice: 24.99, price: 24.99, billing: 'Mensile', features: '2,5 Gbps download FTTH|1 Gbps upload|Chiamate illimitate|Modem incluso', rules: '', active: true, sort: 5 },
  { id: 'iliad-fixed-fwa', operatorId: 'iliad', category: 'Fissa', name: 'iliad FWA', subtitle: 'Connessione radio per zone senza fibra', basePrice: 19.99, price: 19.99, billing: 'Mensile', features: 'Fino a 100 Mbps|Fino a 40 Mbps upload|Chiamate illimitate|Modem incluso', rules: '', active: true, sort: 6 },
  // Convergenza
  { id: 'iliad-convergenza', operatorId: 'iliad', category: 'Fissa', name: 'iliad Casa + Mobile', subtitle: 'Fibra + SIM a prezzo cumulato', basePrice: 27.98, price: 27.98, billing: 'Mensile', features: 'Fibra 1Gbps|SIM Mobile 50GB|Chiamate illimitate|Prezzo cumulato', rules: '', active: true, sort: 7 },
  // Energia — iliad NON offers energia, skip
  // Assicurazioni — iliad NON offers assicurazioni, skip
  // Smartphone
  { id: 'iliad-phone-iphone17e', operatorId: 'iliad', category: 'Smartphone', name: 'Apple iPhone 17e', subtitle: 'A rate con iliad Mobile', basePrice: 14.99, price: 14.99, billing: 'Mensile', features: 'Anticipo 99€|Finanziamento 24 mesi|Sconto iliad|Con piano mobile', rules: '', active: true, sort: 8 },
  { id: 'iliad-phone-s26', operatorId: 'iliad', category: 'Smartphone', name: 'Samsung Galaxy S26', subtitle: 'A rate con iliad Unlimited', basePrice: 24.99, price: 24.99, billing: 'Mensile', features: 'Anticipo 149€|Finanziamento 24 mesi|Sconto device|Con piano mobile', rules: '', active: true, sort: 9 },
];

/* ──────────────────────────────────────────────────
   ALL OFFERS FLAT LIST
   ────────────────────────────────────────────────── */
export const ALL_OFFERS: Offer[] = [
  ...windtreOffers,
  ...timOffers,
  ...vodafoneOffers,
  ...fastwebOffers,
  ...iliadOffers,
];

/* ──────────────────────────────────────────────────
   DISCOUNT RULES PER OPERATOR
   ────────────────────────────────────────────────── */
export const DISCOUNT_RULES: Record<string, Record<string, DiscountRule>> = {
  windtre: {
    fixed_mobile_discount: { label: 'Vantaggio WINDTRE+', amount: 5 },
    energy_w3_discount: { label: 'Vantaggio Energia WINDTRE', amount: 5.5 },
    promo_price: { label: 'Prezzo promo già applicato', amount: 0 },
  },
  tim: {
    fixed_mobile_discount: { label: 'Sconto TIM Famiglia', amount: 5 },
    energy_discount: { label: 'Sconto TIM Energia', amount: 3 },
  },
  vodafone: {
    fixed_mobile_discount: { label: 'Sconto Vodafone Casa+', amount: 5 },
    energy_discount: { label: 'Sconto Vodafone Energia', amount: 3 },
  },
  fastweb: {
    fixed_mobile_discount: { label: 'Sconto Fastweb Combo', amount: 4 },
    energy_discount: { label: 'Sconto Fastweb Energia', amount: 3 },
  },
  iliad: {},
};

export function getOffersForOperator(operatorId: string): Offer[] {
  return ALL_OFFERS.filter((o) => o.operatorId === operatorId && o.active)
    .sort((a, b) => a.sort - b.sort);
}

export function getOffersForCategory(category: OfferCategory): Offer[] {
  return ALL_OFFERS.filter((o) => o.category === category && o.active)
    .sort((a, b) => a.sort - b.sort);
}

export function getAllOffers(): Offer[] {
  return ALL_OFFERS.filter((o) => o.active).sort((a, b) => a.sort - b.sort);
}