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

### Nedodělky

- [ ] `site` v `astro.config.mjs` je zatím placeholder `https://scandy.cz`
- [ ] `src/consts.ts` obsahuje smyšlené kontakty a IČO
- [ ] Doména v `public/robots.txt`
- [ ] Texty na všech stránkách jsou zástupné
- [ ] Kontaktní formulář nikam neodesílá — statický hosting to sám neumí,
      bude potřeba PHP skript na Wedosu nebo externí služba
- [ ] Deploy na Wedos: GitHub Actions, které po pushi do `main` spustí build
      a nahrají `dist/` přes FTP. FTP údaje patří do GitHub Secrets, nikdy do repa.
- [ ] Chybí OG náhledový obrázek (`public/og.jpg` → ideálně WebP, 1200×630)
