import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAdmin } from '../store'
import { DEMO_CREDENTIALS } from '../mockData'
import { resourceOrder, resources } from '../schemas'
import { Field, Label, input } from '../components/Field'

const btnPrimary =
  'rounded-lg bg-palm px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-abyss'
const btnGhost =
  'rounded-lg border border-ink/15 px-4 py-2.5 text-sm text-ink/65 transition-colors hover:border-palm hover:text-palm'

/* ------------------------------------------------------------------ Login */

export function Login() {
  const { user, login } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    setTimeout(() => {
      const res = login(email, password)
      setBusy(false)
      if (res.ok) navigate('/admin')
      else setError(res.error)
    }, 500)
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-abyss px-5 py-16">
      <div className="lattice pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-palm/25 blur-[130px]" aria-hidden />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory">
            <img src="./assets/img/logo-mark.png" alt="" className="h-12 w-12 object-contain" />
          </span>
          <h1 className="mt-5 font-display text-3xl text-ivory">Content manager</h1>
          <p className="mt-2 text-sm text-frond">Sign in to manage the ZABACCO website.</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-ivory p-7 shadow-lift sm:p-8">
          <div className="space-y-5">
            <div>
              <Label>Email address</Label>
              <input
                type="email"
                required
                autoComplete="username"
                className={input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zabacco.co.tz"
              />
            </div>
            <div>
              <Label>Password</Label>
              <input
                type="password"
                required
                autoComplete="current-password"
                className={input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-flame/10 px-4 py-3 text-sm text-flame">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full rounded-lg bg-palm px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-abyss disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-6 rounded-lg border border-dashed border-ink/20 px-4 py-3 text-xs leading-relaxed text-ink/55">
            <p className="font-semibold text-abyss">Demonstration access</p>
            <p className="mt-1">
              {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
            </p>
            <p className="mt-2">
              No server is connected yet. Changes are stored in this browser only.
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-frond transition-colors hover:text-leaf">
            ← Return to the website
          </Link>
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- Dashboard */

export function Dashboard() {
  const { state } = useAdmin()
  const newEnquiries = state.enquiries.filter((e) => e.status === 'new')

  const cards = [
    { label: 'Projects', value: state.projects.length, to: '/admin/projects' },
    { label: 'Team members', value: state.leadership.length + state.team.length, to: '/admin/team' },
    { label: 'Service lines', value: state.services.length, to: '/admin/services' },
    { label: 'New enquiries', value: newEnquiries.length, to: '/admin/enquiries' },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl text-abyss">Dashboard</h1>
      <p className="mt-2 text-sm text-ink/60">
        An overview of what is currently published on the ZABACCO website.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 nav:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-palm/40"
          >
            <p className="font-display text-4xl text-palm">{c.value}</p>
            <p className="mt-2 text-sm text-ink/60">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 nav:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-xl text-abyss">Recent enquiries</h2>
          {state.enquiries.slice(0, 4).map((e) => (
            <div key={e.id} className="mt-4 border-t border-ink/10 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-abyss">{e.name}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    e.status === 'new'
                      ? 'bg-flame/12 text-flame'
                      : e.status === 'replied'
                        ? 'bg-palm/12 text-palm'
                        : 'bg-ink/8 text-ink/50'
                  }`}
                >
                  {e.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink/55">{e.organisation}</p>
              <p className="mt-2 line-clamp-2 text-sm text-ink/70">{e.message}</p>
            </div>
          ))}
          <Link
            to="/admin/enquiries"
            className="mt-5 inline-block text-sm font-medium text-palm hover:underline"
          >
            View all enquiries
          </Link>
        </section>

        <section className="rounded-xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-xl text-abyss">Content at a glance</h2>
          <ul className="mt-4 space-y-0">
            {resourceOrder.map((key) => (
              <li key={key} className="flex items-center justify-between border-t border-ink/10 py-2.5">
                <Link to={`/admin/${key}`} className="text-sm text-ink/70 hover:text-palm">
                  {resources[key].label}
                </Link>
                <span className="text-sm font-medium text-abyss">{state[key].length}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- Enquiries */

export function Enquiries() {
  const { state, setEnquiryStatus } = useAdmin()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)

  const rows =
    filter === 'all' ? state.enquiries : state.enquiries.filter((e) => e.status === filter)

  return (
    <div>
      <h1 className="font-display text-3xl text-abyss">Enquiries</h1>
      <p className="mt-2 max-w-xl text-sm text-ink/60">
        Messages sent through the contact form. Once the backend is live these will also arrive by
        email through Brevo.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {['all', 'new', 'read', 'replied'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm capitalize transition-colors ${
              filter === f
                ? 'border-palm bg-palm text-ivory'
                : 'border-ink/15 text-ink/60 hover:border-palm hover:text-palm'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {rows.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-ink/50">No enquiries in this view.</p>
        )}
        <ul className="divide-y divide-ink/8">
          {rows.map((e) => (
            <li key={e.id} className="px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-abyss">{e.name}</p>
                  <p className="text-sm text-ink/55">
                    {e.organisation} · {e.email}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink/45">
                    {new Date(e.receivedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      e.status === 'new'
                        ? 'bg-flame/12 text-flame'
                        : e.status === 'replied'
                          ? 'bg-palm/12 text-palm'
                          : 'bg-ink/8 text-ink/50'
                    }`}
                  >
                    {e.status}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs font-medium text-palm">{e.service}</p>
              <p className={`mt-2 text-sm leading-relaxed text-ink/70 ${open === e.id ? '' : 'line-clamp-2'}`}>
                {e.message}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(open === e.id ? null : e.id)
                    if (e.status === 'new') setEnquiryStatus(e.id, 'read')
                  }}
                  className={btnGhost}
                >
                  {open === e.id ? 'Collapse' : 'Read full message'}
                </button>
                <a href={`mailto:${e.email}`} className={btnPrimary}>
                  Reply by email
                </a>
                {e.status !== 'replied' && (
                  <button
                    type="button"
                    onClick={() => setEnquiryStatus(e.id, 'replied')}
                    className={btnGhost}
                  >
                    Mark as replied
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Settings */

const settingsGroups = [
  {
    title: 'Organisation',
    fields: [
      { name: 'name', label: 'Full name', type: 'text' },
      { name: 'short', label: 'Short name', type: 'text' },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'founded', label: 'Year established', type: 'text' },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
      { name: 'landmarks', label: 'Landmarks', type: 'text' },
      { name: 'phone1', label: 'Telephone 1', type: 'text' },
      { name: 'phone2', label: 'Telephone 2', type: 'text' },
      { name: 'whatsapp', label: 'WhatsApp number', type: 'text', hint: 'Digits only, e.g. 255777429243' },
      { name: 'email', label: 'Email address', type: 'text' },
      { name: 'web', label: 'Website', type: 'text' },
      { name: 'hours', label: 'Office hours', type: 'text' },
    ],
  },
  {
    title: 'About the firm',
    fields: [
      { name: 'vision', label: 'Vision', type: 'textarea', rows: 3 },
      { name: 'mission', label: 'Mission', type: 'textarea', rows: 3 },
      { name: 'purpose', label: 'Purpose', type: 'textarea', rows: 3 },
      { name: 'aboutBody', label: 'About text', type: 'textarea', rows: 10 },
    ],
  },
  {
    title: 'Search engines',
    fields: [
      { name: 'metaTitle', label: 'Meta title', type: 'text' },
      { name: 'metaDescription', label: 'Meta description', type: 'textarea', rows: 3 },
    ],
  },
]

export function Settings() {
  const { state, updateSettings } = useAdmin()
  const [draft, setDraft] = useState(state.settings)

  const set = (name, value) => setDraft((d) => ({ ...d, [name]: value }))

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-abyss">Site settings</h1>
      <p className="mt-2 text-sm text-ink/60">
        Details that appear across every page of the website.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateSettings(draft)
        }}
        className="mt-8 space-y-6"
      >
        {settingsGroups.map((group) => (
          <section key={group.title} className="rounded-xl border border-ink/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl text-abyss">{group.title}</h2>
            <div className="mt-6 space-y-6">
              {group.fields.map((f) => (
                <Field key={f.name} field={f} value={draft[f.name]} onChange={(v) => set(f.name, v)} />
              ))}
            </div>
          </section>
        ))}

        <button type="submit" className={btnPrimary}>
          Save settings
        </button>
      </form>
    </div>
  )
}

/* ---------------------------------------------------------------- Account */

export function Account() {
  const { state, reset } = useAdmin()
  const [confirm, setConfirm] = useState(false)

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-abyss">Account</h1>

      <section className="mt-8 rounded-xl border border-ink/10 bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl text-abyss">Signed in as</h2>
        <dl className="mt-5 space-y-4">
          <div className="border-t border-ink/10 pt-4">
            <dt className="text-sm text-ink/50">Name</dt>
            <dd className="mt-1 text-abyss">{state.account.name}</dd>
          </div>
          <div className="border-t border-ink/10 pt-4">
            <dt className="text-sm text-ink/50">Email</dt>
            <dd className="mt-1 text-abyss">{state.account.email}</dd>
          </div>
        </dl>
        <p className="mt-6 rounded-lg border border-dashed border-ink/20 px-4 py-3 text-sm text-ink/55">
          Changing your name, email or password will be available once the backend is connected.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-ink/10 bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl text-abyss">Demonstration data</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Every change you make is saved in this browser only. Restoring returns all content to the
          text currently published on the website, which is useful before showing the panel to
          someone else.
        </p>
        {confirm ? (
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                reset()
                setConfirm(false)
              }}
              className="rounded-lg border border-flame/40 px-4 py-2.5 text-sm text-flame transition-colors hover:bg-flame hover:text-white"
            >
              Yes, restore everything
            </button>
            <button type="button" className={btnGhost} onClick={() => setConfirm(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirm(true)} className={`mt-5 ${btnGhost}`}>
            Restore demonstration data
          </button>
        )}
      </section>
    </div>
  )
}
