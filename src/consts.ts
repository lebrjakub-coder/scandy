// Centrální konfigurace webu — mění se jen tady.

export const SITE = {
  name: 'Scandy',
  title: 'Scandy',
  description: 'Krátký popis firmy, který se zobrazí ve výsledcích vyhledávání.',
  lang: 'cs',
  locale: 'cs_CZ',
} as const;

export const CONTACT = {
  email: 'info@scandy.cz',
  phone: '+420 000 000 000',
  address: 'Ulice 1, 000 00 Město',
  ico: '00000000',
} as const;

export const NAV = [
  { href: '/', label: 'Úvod' },
  { href: '/sluzby/', label: 'Služby' },
  { href: '/o-nas/', label: 'O nás' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const;
