// Centrální konfigurace webu — mění se jen tady.

export const SITE = {
  name: 'Scandy',
  title: 'Scandy – typový dřevěný dům na klíč, 40 nebo 55 m²',
  description:
    'Typový dřevěný dům TINYHOUSE od architekta, 40 nebo 55 m², pultová nebo sedlová střecha. Na rekreačním pozemku často bez povolení záměru. Poptejte nezávazně.',
  lang: 'cs',
  locale: 'cs_CZ',
} as const;

// E-mail je reálná schránka u Wedosu (přeposílá se do Gmailu majitele).
// IČO: dokud je prázdné, web ho nikde nezobrazí.
export const CONTACT = {
  email: 'info@scandy.cz',
  phone: '+420 774 339 936',
  street: 'Anežky České 1119',
  city: '252 29 Dobřichovice',
  ico: '',
} as const;

export const NAV = [
  { href: '/', label: 'Úvod' },
  { href: '/dum/', label: 'Dům' },
  { href: '/o-nas/', label: 'O nás' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const;

// Údaje o domu. Zdroj: architektonická studie (Ing. Filip Kment, 05/2025)
// a dokumentace pro provedení stavby (09–10/2025).
export const HOUSE = {
  name: 'TINYHOUSE',
  architect: 'Ing. Filip Kment',
  architectUrl: 'https://www.filipkment.cz',
  structuralEngineer: 'Ing. Klára Indrová',
  width: '4,25 m',
  height: '4 m',

  // Dodací lhůta zatím není stanovená (null). Ceny „od“ jsou u variant, bez DPH.
  deliveryWeeks: null as number | null,

  variants: [
    {
      id: '40',
      name: 'TINYHOUSE 40',
      length: '9,5 m',
      builtUp: '40 m²',
      usable: '32 m²',
      rooms: 'obývací pokoj s kuchyní, ložnice, koupelna s WC',
      priceFrom: 2_500_000 as number | null,
    },
    {
      id: '55',
      name: 'TINYHOUSE 55',
      length: '12,9 m',
      builtUp: '55 m²',
      usable: '43 m²',
      rooms: 'obývací pokoj s kuchyní, ložnice, pokoj, koupelna s WC',
      priceFrom: 3_500_000 as number | null,
    },
  ],

  roofs: [
    {
      id: 'pultova',
      name: 'Pultová střecha',
      slope: '10°',
      text: 'Jednoduchý tvar, nejvyšší bod nad vstupní terasou. Střešní okna prosvětlují úložné patro nad kuchyní a koupelnou.',
    },
    {
      id: 'sedlova',
      name: 'Sedlová střecha',
      slope: '21°',
      text: 'Klasická silueta chaty s hřebenem v podélné ose. Vyšší patro nabízí víc úložného prostoru a lépe zapadne do tradičnější zástavby.',
    },
  ],
} as const;

/** Cena ve formátu „od 1 234 000 Kč bez DPH“, nebo „na vyžádání“, když ještě není stanovená. */
export function formatPriceFrom(price: number | null): string {
  if (price === null) return 'na vyžádání';
  return `od ${price.toLocaleString('cs-CZ')} Kč bez DPH`;
}
