# ZABACCO — Website (Frontend)

Frontend ya tovuti ya **Zanzibar Academic and Business Consultancy (ZABACCO)**.
Imejengwa kwa **React 18 + Vite + Tailwind CSS**, kurasa 7 zenye routing kamili.

---

## 1. Kuendesha (run)

Unahitaji Node.js 18 au juu zaidi.

```bash
npm install
npm run dev      # http://localhost:5173
```

Kutengeneza toleo la production:

```bash
npm run build    # inatoka kwenye dist/
npm run preview  # kukagua build kabla ya ku-deploy
```

Folda ya `dist/` ndio unayoi-upload kwenye hosting (Netlify, Vercel, cPanel, au server yoyote).
Routing inatumia `HashRouter`, kwa hiyo inafanya kazi hata kwenye shared hosting bila configuration ya server.

---

## 2. Muundo wa project

```
zabacco/
├── index.html                 # meta tags, SEO, fonts
├── tailwind.config.js         # rangi na fonti za brand
├── public/assets/img/         # picha zote
│   ├── logo.png
│   ├── prof-mohammed-sheikh.jpg
│   ├── dr-hamad-sharif.jpg
│   └── field-01.jpg … field-06.jpg
└── src/
    ├── data/site.js           # ⭐ CONTENT YOTE IKO HAPA
    ├── components/
    │   ├── Navbar.jsx  Footer.jsx  Logo.jsx
    │   ├── Ui.jsx             # PageHeader, SectionHead, ContactCta
    │   └── ScrollToTop.jsx
    └── pages/
        ├── Home.jsx  About.jsx  Services.jsx
        ├── Team.jsx  Projects.jsx  Gallery.jsx  Contact.jsx
```

### Kubadilisha maandishi
Karibu maandishi yote (huduma, wasifu wa team, projects, anwani, ujumbe wa CEO)
yako kwenye faili moja: **`src/data/site.js`**. Ukibadilisha hapo, kurasa zote zinabadilika.

### Kuongeza project mpya
Fungua `src/data/site.js`, nenda kwenye `projects`, ongeza kipengele:

```js
{
  year: '2026',
  title: 'Jina la assignment',
  client: 'Mteja',
  sector: 'Tourism and hospitality',
  service: 'Environmental and Social Impact Assessment',
},
```
Filter ya sekta kwenye ukurasa wa Projects inajijenga yenyewe.

### Kuongeza picha kwenye gallery
Weka picha kwenye `public/assets/img/`, kisha ongeza kwenye `gallery` ndani ya `site.js`.

---

## 3. Design system

| Token | Hex | Matumizi |
|---|---|---|
| `abyss` | `#04211D` | background kuu ya sehemu nyeusi |
| `deep` | `#08352C` | sehemu za pili nyeusi |
| `reef` | `#0E5A49` | kijani cha logo, links na buttons |
| `brass` | `#C3A05A` | accent ya kifahari (mistari, kickers) |
| `limestone` | `#F3F1EA` | background nyepesi (jiwe la Mji Mkongwe) |
| `sand` | `#E5E0D3` | sehemu nyepesi zinazopishana |
| `coral` | `#D9542B` | rangi ya logo, kwa matumizi machache |

**Fonti:** Fraunces (vichwa vya habari) + Archivo (maandishi) — zinapakiwa kutoka Google Fonts.

**Motif:** mchoro wa SVG uliochorwa kutokana na mifumo ya milango ya Zanzibar (fretwork),
unatumika kama tint hafifu kwenye sehemu nyeusi.

---

## 4. Yaliyomo kwenye kurasa

- **Home** — hero, takwimu, positioning, huduma 6, ujumbe wa CEO, projects za karibuni, sababu za kuchagua ZABACCO, gallery strip
- **About** — historia, vision, mission, values 6, organogram (directorates 3 na units 6), track record
- **Services** — huduma 6 zenye orodha kamili, na sticky sub-navigation
- **Team** — Prof. Mohammed Ali Sheikh (CEO) na Dr. Hamad Maalim Sharif (Principal Administrative Officer) wenye wasifu kamili, kisha directors na specialists
- **Projects** — assignments 11 zenye filter ya sekta
- **Gallery** — picha zenye lightbox (bonyeza picha; tumia arrow keys au Esc)
- **Contact** — anwani ya ofisi, fomu ya maombi, ramani

---

## 5. Fomu ya mawasiliano

Kwa sasa fomu inafungua email client ya mtumiaji (`mailto:`) kwa sababu hakuna backend.
Ili kuiunganisha na server au huduma kama Formspree/Netlify Forms,
badilisha function ya `submit` ndani ya `src/pages/Contact.jsx`.

---

## 6. Ramani

Kwenye `Contact.jsx` kuna `iframe` ya OpenStreetMap inayoonyesha eneo la Zanzibar Town kwa ujumla.
Badilisha `src` yake na embed link ya Google Maps ya mlango halisi wa ofisi ya Malindi, Stone Town.

---

## 7. Ubora uliozingatiwa

- Responsive kuanzia simu (390px) hadi desktop kubwa
- Keyboard navigation na visible focus rings (brass)
- Skip-to-content link
- `prefers-reduced-motion` inaheshimiwa
- Meta tags za SEO na Open Graph
- Alt text kwenye picha zote
- Ukurasa wa 404

---

## 8. Hatua zinazofuata (mapendekezo)

1. Weka Google Analytics au Plausible kwenye `index.html`
2. Unganisha fomu na huduma halisi ya email
3. Ongeza picha za field work (site visits, sampling, community consultations) — kwa sasa gallery ina picha za ofisi tu
4. Ongeza PDF ya company profile inayoweza ku-download
5. Kama mnahitaji habari/blog, ongeza CMS nyepesi (Sanity au Contentful) au faili la markdown
