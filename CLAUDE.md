# Scandy — pravidla projektu

Firemní web na Astro 7 + Tailwind CSS 4. Statický výstup, cílový hosting Wedos WebSite (FTP).
Komunikace i obsah webu jsou česky.

---

## Závazná pravidla

Tyhle body platí vždy, i když si o ně nikdo neřekne.

### 1. Meta title a description na každé stránce

Každá stránka předává `title` a `description` do `BaseLayout.astro`. Žádná stránka nesmí
zůstat na výchozím popisku ze `src/consts.ts`.

- **Title**: 50–60 znaků včetně názvu firmy. Layout přidává ` | Scandy` automaticky,
  takže do `title` piš jen samotný název stránky a počítej s tím.
- **Description**: 140–160 znaků. Celá věta, konkrétní, s výzvou k akci.
  Ne výčet klíčových slov.
- Titulky se napříč webem nesmí opakovat. Stejně tak description.

### 2. Obrázky jen ve WebP nebo AVIF

Do repozitáře nepatří JPG ani PNG fotky. Před vložením vždy převeď:

```bash
# jednotlivý soubor
npx @squoosh/cli --webp auto obrazek.jpg

# nebo přes sharp, pokud squoosh zlobí
npx sharp-cli -i obrazek.jpg -o obrazek.webp -f webp -q 80
```

Fotografie ukládej do `src/assets/` a vkládej přes komponentu `<Image />`
z `astro:assets` — Astro pak sám doplní rozměry, `loading="lazy"` a responzivní
varianty. Do `public/` patří jen soubory, které musí zůstat beze změny
(favicon, OG náhled).

Výjimky: SVG pro ikony a loga (zůstává SVG), favicon.

### 3. Žádné em pomlčky v textech na webu

V českých textech na webu se nepoužívá em pomlčka `—`. Správná je pomlčka `–`
(en dash) obklopená mezerami, nebo přeformulovaná věta.

- Špatně: `Web je rychlý—a to se počítá.`
- Správně: `Web je rychlý – a to se počítá.`
- Často nejlepší: rozdělit na dvě věty.

Spojovník `-` zůstává tam, kam patří (`e-mail`, `česko-slovenský`).

### 4. Mobil má přednost

Většina návštěvnosti přijde z telefonu. U každé změny:

- Piš Tailwind třídy mobile-first: základní stav je mobil, `sm:` a výš jsou nástavby
- Testuj v DevTools na šířce **375 px** dřív než na desktopu
- Klikací prvky minimálně 44×44 px
- Nikdy vodorovné posouvání stránky
- Hlavní navigace musí na mobilu fungovat (od určitého počtu položek hamburger menu)
- Písmo v tělu textu minimálně 16 px, jinak Safari na iOS zoomuje formuláře

### 5. Chovej se jako odborník, ne jako vykonavatel

Když při práci narazíš na problém, řekni to a probereme ho — i když se ptal
na něco jiného. Týká se to hlavně:

- SEO: nadpisová struktura, chybějící alt texty, duplicitní obsah, canonical
- Přístupnosti: kontrast, ovládání klávesnicí, popisky formulářů, ARIA
- Rychlosti: velikost obrázků, zbytečný JavaScript, Core Web Vitals
- Bezpečnosti a soukromí: formuláře, cookies, GDPR, kontaktní údaje
- Obsahu: texty, které nic neříkají, chybějící výzva k akci, nejasná struktura

Návrh vždy odůvodni a nech rozhodnutí na majiteli. Neměň bez ptaní věci,
na které se neptal.

---

## Kontext projektu

### Kdo je kdo

Web patří majiteli MacBooku. Prvotní nastavení dělal jeho bratranec.
Předpokládej, že uživatel je v gitu a terminálu začátečník: vysvětluj příkazy,
dávej je po jednom a nepoužívej v nich zástupné texty, které by mohl zkopírovat doslova.

### Příkazy

| Příkaz                  | Co dělá                              |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Dev server na <http://localhost:4321> |
| `npm run build`         | Produkční build do `dist/`           |
| `npm run preview`       | Náhled hotového buildu               |
| `npm run check`         | Kontrola typů a Astro chyb           |
| `./save.sh "popis"`     | Commit a push na GitHub              |

### Struktura

```
src/
  components/   Header, Footer, Section
  layouts/      BaseLayout.astro — meta tagy, canonical, OG
  pages/        soubor = URL (index.astro → /)
  styles/       global.css — Tailwind + design tokeny (@theme)
  consts.ts     název firmy, kontakty, navigace — centrálně
public/         kopíruje se 1:1 do dist/
```

Kontaktní údaje, název firmy a položky menu se mění **jen v `src/consts.ts`**,
nikdy natvrdo v šablonách.

### Tailwind 4

Konfigurace je v CSS, ne v `tailwind.config.js`. Barvy a fonty se přidávají
do bloku `@theme` v `src/styles/global.css`.
Pozor na přejmenované třídy oproti verzi 3: `bg-gradient-to-b` → `bg-linear-to-b`.

### Git

Jedna větev `main`, bez develop. Push přes `./save.sh "popis"`.
Autentizace běží přes Personal Access Token uložený v macOS Klíčence.

### Co Scandy prodává

Typový dřevěný dům **TINYHOUSE** na klíč, navržený jako drobná stavba podle
stavebního zákona 283/2021 Sb. (do 55 m², do 4 m, na rekreačním pozemku často bez
povolení záměru). Dvě délky (40 a 55 m²), dvě střechy (pultová, sedlová).
Architekt Ing. Filip Kment, statika Ing. Klára Indrová. Značka patří pod
Stavbag Constructions s.r.o., Dobřichovice. Zatím jen projekt, první domy se
připravují.

Podklady jsou v `IMPORT/` (ignorováno gitem): architektonická studie `SCANDY.pdf`,
projektová dokumentace obou střech, dvě AI vizualizace. Fotky v části Materiály
studie jsou cizí referenční snímky, na web nepatří. Kontakty na konci studie jsou
architektovy, ne firemní.

Údaje o domu (varianty, střechy, cena) jsou v `HOUSE` v `src/consts.ts`.

### Nedodělky

- [x] Doména je `scandy.cz` (potvrzeno 10. 9. 2026), `site` i `robots.txt` jsou správně
- [x] Hosting: Wedos Webhosting LowCost pro scandy.cz, aktivní od 11. 9. 2026,
      FTP server `403561.w61.wedos.net`, účet `w403561` (heslo jen v GitHub Secrets)
- [x] E-mail `info@scandy.cz` je od 14. 9. 2026 reálná schránka u Wedosu, přeposílá
      na Gmail majitele (telefon a adresa jsou reálné)
- [x] Provozovatel v patičce: Stavbag Constructions s.r.o., IČO 10754369, DIČ CZ10754369
      (z ARES 15. 9. 2026)
- [x] Stránka `/ochrana-osobnich-udaju/` (GDPR + cookies), odkaz z patičky a z formuláře
- [ ] Měření (15. 9. 2026): GTM účet „Scandy“, kontejner scandy.cz `GTM-TW59J8MN` (verze 2
      publikována, značka Google Analytics GA4). GA4: účet „Stavbag“, vlastnost
      „Scandy (scandy.cz)“, stream 15780971439, měřicí ID `G-DTWCLGJMVG`. Vše pod Google účtem
      info@stavbag.cz. Cookie lišta je vlastní (`components/CookieBanner.astro`), bez externí
      služby; GTM se načte až po souhlasu, volba se pamatuje rok v localStorage.
- [ ] V GA4 nastavit klíčovou událost: zobrazení `/dekujeme/` = odeslaná poptávka.
- [ ] Dodací lhůta (`HOUSE.deliveryWeeks`) je `null`, na webu se zatím neukazuje
- [x] Ceny se zobrazují s DPH 21 % (`VAT_RATE` v `src/consts.ts`, základ bez DPH zůstává
      u variant). Rozhodnuto 15. 9. 2026.
- [ ] Parametry varianty 40 m² (9,5 m, užitná 32 m²) jsou odvozené ze studie,
      majitel je musí potvrdit. Projektová dokumentace (DPS) existuje jen pro
      13m dům. Půdorys 40 na webu je výřez z DPS půdorysu bez levého pokoje
      (stěna je cca 3,5 m od okraje, takže délka 9,4 m sedí se studií).
- [ ] Vztah Scandy a Stavbag Constructions v textu O nás potvrdit s majitelem
- [ ] Vizualizace v `src/assets/` nahradit fotkami, až bude stát první dům
- [x] Kontaktní formulář odesílá `public/odeslat.php` (PHP na Wedosu, `mail()` z
      info@scandy.cz na info@scandy.cz, honeypot `web`). Úspěch → `/dekujeme/` (noindex),
      chyba → `/kontakt/?chyba=1`. Nasazeno 14. 9. 2026.
- [x] Deploy: `.github/workflows/deploy.yml` po pushi do `main` sestaví web a nahraje
      `dist/` přes FTPS do `www/`. Potřebuje GitHub Secrets `FTP_SERVER`, `FTP_USERNAME`,
      `FTP_PASSWORD` (zadává majitel v GitHubu, nikdy do repa). `public/.htaccess` řeší
      404, přesměrování na HTTPS a cache.
- [x] FTP údaje jsou v GitHub Secrets, Let's Encrypt zapnutý 14. 9. 2026
- [x] OG náhled `public/og.jpg` 1200×630 (JPG schválně, sociální sítě WebP ne vždy vezmou),
      meta v `BaseLayout.astro`. Přidáno 15. 9. 2026.
