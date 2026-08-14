# Scandy

Firemní web postavený na [Astro](https://astro.build) 7 + Tailwind CSS 4.
Statický výstup, cílový hosting Wedos WebSite (FTP).

## Požadavky

- Node.js **22 nebo novější** (Astro 7 nižší nepodporuje)

## První spuštění

```bash
npm install
npm run dev
```

Web běží na <http://localhost:4321>.

## Příkazy

| Příkaz            | Co dělá                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Dev server s hot reloadem na `:4321`     |
| `npm run build`   | Produkční build do `dist/`               |
| `npm run preview` | Lokální náhled produkčního buildu        |
| `npm run check`   | Kontrola typů a Astro chyb               |

## Struktura

```
src/
  components/   znovupoužitelné kusy (Header, Footer, Section)
  layouts/      BaseLayout.astro — HTML skeleton, meta tagy, SEO
  pages/        každý soubor = jedna URL (index.astro → /)
  styles/       global.css — import Tailwindu + design tokeny
  consts.ts     název firmy, kontakty, navigace — mění se jen tady
public/         soubory kopírované 1:1 do dist/ (favicon, robots.txt)
```

## Než pustíme web ven

- [ ] `site` v `astro.config.mjs` → finální doména
- [ ] `src/consts.ts` → skutečné kontaktní údaje a IČO
- [ ] `public/robots.txt` → správná doména v `Sitemap:`
- [ ] Texty na všech stránkách
- [ ] Kontaktní formulář — napojit na odesílání (Wedos PHP nebo externí služba)
