// Mock data layer for the admin panel.
//
// Everything here is seeded from the live website content in src/data/site.js so
// the demo shows real records, not placeholders. Changes are held in localStorage
// so a walkthrough survives a page refresh.
//
// When the Laravel API is connected, this file is the only thing that changes:
// swap the read/write functions for fetch calls against /api/*.

import {
  about,
  approach,
  differentiators,
  faqs,
  gallery,
  heroSlides,
  leadership,
  org,
  partners,
  projects,
  sectors,
  services,
  stats,
  team,
  values,
} from '../data/site'

const STORAGE_KEY = 'zabacco.admin.mock.v1'

const withIds = (rows) =>
  rows.map((row, i) => ({ id: i + 1, order: i + 1, published: true, ...row }))

// Enquiries the contact form would have produced. Illustrative only.
const seedEnquiries = [
  {
    id: 1,
    name: 'Amina Juma Khamis',
    organisation: 'Ministry of Water, Energy and Minerals',
    email: 'a.khamis@example.go.tz',
    service: 'Environmental and Social Impact Assessment',
    message:
      'We are preparing a coastal water supply extension at Nungwi and need to understand which approvals the project triggers before we go to tender.',
    receivedAt: '2026-08-28T09:14:00',
    status: 'new',
  },
  {
    id: 2,
    name: 'Daniel Mwakalinga',
    organisation: 'Sable Coast Investments Ltd',
    email: 'd.mwakalinga@example.com',
    service: 'Business and Development Consulting',
    message:
      'Feasibility study needed for a 60-room eco-lodge on the east coast. What would scope and timeline look like?',
    receivedAt: '2026-08-25T16:40:00',
    status: 'read',
  },
  {
    id: 3,
    name: 'Dr. Elena Rossi',
    organisation: 'Blue Horizon Research Foundation',
    email: 'e.rossi@example.org',
    service: 'Research and Academic Consulting',
    message:
      'Looking for a local research partner for a two-year reef monitoring programme. Could we arrange a call this month?',
    receivedAt: '2026-08-19T11:05:00',
    status: 'replied',
  },
]

function buildSeed() {
  return {
    heroSlides: withIds(heroSlides),
    leadership: withIds(leadership),
    team: withIds(team.map((t) => ({ ...t, photo: '' }))),
    projects: withIds(projects.map((p) => ({ ...p, featured: false }))),
    services: withIds(services),
    gallery: withIds(gallery),
    approach: withIds(approach),
    faqs: withIds(faqs),
    values: withIds(values),
    differentiators: withIds(differentiators),
    partners: withIds(partners.map((name) => ({ name }))),
    stats: withIds(stats),
    sectors: withIds(sectors.map((name) => ({ name }))),
    enquiries: seedEnquiries,
    settings: {
      name: org.name,
      short: org.short,
      tagline: org.tagline,
      founded: org.founded,
      address: org.address,
      landmarks: org.landmarks,
      phone1: org.phones[0],
      phone2: org.phones[1],
      whatsapp: org.whatsapp,
      email: org.email,
      web: org.web,
      hours: org.hours,
      vision: about.vision,
      mission: about.mission,
      purpose: about.purpose,
      aboutBody: about.paragraphs.join('\n\n'),
      metaTitle: 'ZABACCO — Zanzibar Academic and Business Consultancy',
      metaDescription:
        'Environmental and social impact assessment, research and advisory across Zanzibar and mainland Tanzania.',
    },
    account: {
      name: 'Administrator',
      email: 'admin@zabacco.co.tz',
    },
  }
}

export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // fall through to a fresh seed
  }
  const seed = buildSeed()
  saveState(seed)
  return seed
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable; the session simply will not persist
  }
}

export function resetState() {
  const seed = buildSeed()
  saveState(seed)
  return seed
}

// Demo credentials. The real panel will authenticate against Laravel Sanctum.
export const DEMO_CREDENTIALS = {
  email: 'admin@zabacco.co.tz',
  password: 'zabacco2026',
}
