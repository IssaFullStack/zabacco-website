# ZABACCO — Admin Panel na Maandalizi ya Backend

## 1. Jinsi ya kuingia (demo)

Kwenye website, chini kabisa kwenye footer, bonyeza **Staff login**.
Au nenda moja kwa moja: `/#/admin/login`

```
Email:    admin@zabacco.co.tz
Password: zabacco2026
```

Hakuna server. Kila unachobadilisha kinahifadhiwa kwenye browser yako pekee
(localStorage). Ukitaka kurudisha kila kitu kama kilivyo kwenye website,
nenda **Account → Restore demonstration data**.

---

## 2. Kinachoweza kumanage-wa

| Sehemu | Idadi ya sasa | Unachoweza kufanya |
|---|---|---|
| Hero slides | 3 | Ongeza, hariri, futa, panga upya, ficha |
| Leadership | 2 | Prof. Sheikh na Dr. Sharif — pamoja na ujumbe wa CEO |
| Team | 4 | Directors na specialists |
| Projects | 11 | Pamoja na sekta, mteja, cover image |
| Services | 6 | Pamoja na orodha ndani ya kila huduma |
| Gallery | 6 | Picha na maelezo |
| Approach | 6 | Hatua za jinsi assignment inavyoendeshwa |
| FAQs | 6 | Maswali na majibu |
| Values | 6 | Maadili ya kampuni |
| Why clients choose us | 6 | Sababu za kuchagua ZABACCO |
| Partners | 8 | Taasisi zinazoonekana kwenye ticker |
| Key figures | 4 | 15+, 6, 4, IFC |
| Sectors | 6 | Zinatumika kupanga projects |
| Enquiries | 3 (mfano) | Soma, weka alama ya kujibiwa, jibu kwa email |
| Site settings | — | Anwani, simu, WhatsApp, About, Vision, Mission, SEO |

Kila kipengele kina: kutafuta, kupanga upya (↑ ↓), kuficha/kuonyesha, na
uthibitisho kabla ya kufuta.

---

## 3. Environment variables

Hizi **hazitumiki sasa** kwa sababu ni mock. Ziweke pale tutakapounganisha backend.

### Netlify (frontend)

| Variable | Mfano | Maelezo |
|---|---|---|
| `VITE_API_URL` | `https://api.zabacco.co.tz/api` | Anwani ya Laravel API |
| `VITE_CLOUDINARY_CLOUD_NAME` | `zabacco` | Jina la akaunti yako Cloudinary |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | `zabacco_unsigned` | Preset ya unsigned upload |

> **Muhimu:** kila kitu chenye `VITE_` kinaonekana hadharani kwenye browser.
> Usiweke API secret, password, wala Brevo key kwenye Netlify. Hizo ni za Laravel pekee.

### Laravel server (.env)

```env
APP_NAME=ZABACCO
APP_ENV=production
APP_KEY=                      # php artisan key:generate
APP_DEBUG=false
APP_URL=https://api.zabacco.co.tz

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=zabacco
DB_USERNAME=
DB_PASSWORD=

# Sanctum — ruhusu frontend kuingia
SANCTUM_STATEFUL_DOMAINS=zabacco.co.tz,www.zabacco.co.tz
SESSION_DOMAIN=.zabacco.co.tz
FRONTEND_URL=https://zabacco.co.tz

# Cloudinary
CLOUDINARY_CLOUD_NAME=zabacco
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_FOLDER=zabacco

# Brevo — kutuma enquiries kwa email
BREVO_API_KEY=
MAIL_MAILER=smtp
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=                # SMTP login ya Brevo
MAIL_PASSWORD=                # SMTP key ya Brevo
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=no-reply@zabacco.co.tz
MAIL_FROM_NAME="ZABACCO Website"

# Wapi enquiries zipelekwe
ENQUIRY_NOTIFY_TO=info@zabacco.co.tz
ENQUIRY_NOTIFY_CC=
```

---

## 4. Backend itakapojengwa

**Migrations / tables:**
`users`, `hero_slides`, `leaders`, `team_members`, `projects`, `services`,
`service_items`, `gallery_items`, `approach_stages`, `faqs`, `values`,
`differentiators`, `partners`, `stats`, `sectors`, `settings`, `enquiries`

Kila jedwali litakuwa na `order` (integer) na `published` (boolean).
Orodha kama credentials, bio, na service items zitahifadhiwa kama JSON columns
au jedwali dogo la watoto — nitaamua tutakapoanza.

**Auth:** Laravel Sanctum, user mmoja. Login, logout, change password.

**Picha:** Frontend inapakia moja kwa moja Cloudinary (unsigned preset),
inarudisha `secure_url`, na hiyo ndiyo inahifadhiwa MySQL. Laravel haishikilii faili.

**Enquiries:** `POST /api/enquiries` → inahifadhi MySQL → inatuma email kupitia
Brevo kwenda `ENQUIRY_NOTIFY_TO`.

**Kuunganisha:** faili moja tu la kubadilisha — `src/admin/mockData.js`.
Badala ya localStorage, itafanya `fetch` kwenda `VITE_API_URL`. Kila screen
nyingine ya admin haitagusa.

---

## 5. Usalama — mambo ya kukumbuka

- Badilisha password ya demo (`zabacco2026`) kabla ya kwenda live
- Weka HTTPS kwenye API domain
- Weka rate limiting kwenye `/api/login` na `/api/enquiries`
- Cloudinary upload preset iwe **unsigned** lakini yenye kikomo cha folder na saizi
- Backup ya MySQL angalau mara moja kwa wiki
