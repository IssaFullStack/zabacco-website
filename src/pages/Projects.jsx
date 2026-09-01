import { useMemo, useState } from 'react'
import { PageHeader, ContactCta } from '../components/Ui'
import { projects, trackRecord } from '../data/site'

export default function Projects() {
  const sectorList = useMemo(
    () => ['All sectors', ...Array.from(new Set(projects.map((p) => p.sector)))],
    []
  )
  const [active, setActive] = useState('All sectors')

  const shown =
    active === 'All sectors' ? projects : projects.filter((p) => p.sector === active)

  return (
    <>
      <PageHeader
        kicker="Portfolio"
        title="Assignments delivered across Zanzibar and mainland Tanzania."
        intro="We work with government institutions, development partners, private sector organisations and communities. Below is a selection of completed consultancy assignments."
      />

      <section className="bg-ivory py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-wrap gap-2">
            {sectorList.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActive(s)}
                aria-pressed={active === s}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  active === s
                    ? 'border-palm bg-palm text-ivory'
                    : 'border-forest/20 text-ink/65 hover:border-palm hover:text-palm'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink/55">
            {shown.length} {shown.length === 1 ? 'assignment' : 'assignments'} shown
          </p>

          <div className="mt-6 border-t border-forest/15">
            {shown.map((p) => (
              <article
                key={p.title}
                className="grid gap-x-8 gap-y-3 border-b border-forest/15 py-8 lg:grid-cols-[5rem_1.5fr_1fr_1fr]"
              >
                <p className="font-display text-xl text-leaf">{p.year}</p>
                <h2 className="font-display text-xl leading-snug text-forest sm:text-2xl">
                  {p.title}
                </h2>
                <div>
                  <p className="text-sm text-ink/70">{p.client}</p>
                  <p className="mt-1 text-sm text-ink/45">{p.sector}</p>
                </div>
                <p className="text-sm leading-relaxed text-palm">{p.service}</p>
              </article>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="py-12 text-ink/60">
              No assignments listed in this sector yet. Choose another sector, or ask us directly
              about experience in this area.
            </p>
          )}
        </div>
      </section>

      <section className="bg-abyss py-20 text-ivory sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="text-3xl leading-tight sm:text-4xl">What the portfolio adds up to.</h2>
          <ul>
            {trackRecord.map((t) => (
              <li
                key={t}
                className="border-b border-ivory/15 py-6 text-[1.0625rem] leading-relaxed text-frond first:border-t first:border-ivory/15"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta
        title="Looking for references from a similar project?"
        body="We can share the scope, approach and outcome of comparable assignments, subject to client confidentiality."
      />
    </>
  )
}
