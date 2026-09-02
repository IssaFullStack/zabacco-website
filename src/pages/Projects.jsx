import { useMemo, useState } from 'react'
import { PageHeader, ContactCta, SectionHead } from '../components/Ui'
import { coverFor, projects, trackRecord } from '../data/site'

export default function Projects() {
  const sectorList = useMemo(
    () => ['All sectors', ...Array.from(new Set(projects.map((p) => p.sector)))],
    []
  )
  const [active, setActive] = useState('All sectors')

  const shown = active === 'All sectors' ? projects : projects.filter((p) => p.sector === active)

  return (
    <>
      <PageHeader
        kicker="Portfolio"
        title="Assignments delivered across Zanzibar and mainland Tanzania."
        intro="We work with government institutions, development partners, private sector organisations and communities. Below is a selection of completed consultancy assignments."
      />

      {/* Filter */}
      <section className="sticky top-[4.5rem] z-30 border-b border-ink/12 bg-ivory/95 backdrop-blur">
        <div className="shell flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sectorList.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActive(s)}
              aria-pressed={active === s}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                active === s
                  ? 'border-palm bg-palm text-ivory'
                  : 'border-ink/15 text-ink/60 hover:border-palm hover:text-palm'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="shell">
          <p className="text-sm text-ink/50">
            Showing {shown.length} of {projects.length} assignments
          </p>

          <div className="mt-8 grid gap-7 sm:grid-cols-2 nav:grid-cols-3">
            {shown.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col overflow-hidden bg-husk/60 shadow-plate transition-all duration-500 ease-tide hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[8/5] overflow-hidden bg-abyss">
                  <img
                    src={coverFor(p.sector)}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-tide group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-leaf px-3 py-1 font-display text-sm text-abyss">
                    {p.year}
                  </span>
                  <span className="absolute bottom-4 left-5 right-5 text-xs font-medium text-frond">
                    {p.sector}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-xl leading-snug text-abyss transition-colors duration-300 group-hover:text-palm">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-ink/60">{p.client}</p>
                  <p className="mt-auto flex items-start gap-2.5 pt-6 text-sm leading-relaxed text-palm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" aria-hidden />
                    {p.service}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="py-16 text-ink/60">
              No assignments listed in this sector yet. Choose another sector, or ask us directly
              about experience in this area.
            </p>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-abyss py-20 text-ivory sm:py-24">
        <div className="lattice pointer-events-none absolute -right-20 top-0 h-96 w-96 opacity-[0.07]" aria-hidden />
        <div className="shell relative grid gap-12 nav:grid-cols-[0.8fr_1.2fr] nav:gap-20">
          <SectionHead tone="dark" title="What the portfolio adds up to." />
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
