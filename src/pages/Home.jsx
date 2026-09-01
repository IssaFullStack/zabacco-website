import { Link } from 'react-router-dom'
import { SectionHead, ContactCta, Reveal } from '../components/Ui'
import {
  approach,
  differentiators,
  gallery,
  intro,
  leadership,
  partners,
  projects,
  sectors,
  services,
  stats,
} from '../data/site'

const [ceo, principal] = leadership

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[94vh] overflow-hidden bg-abyss text-ivory">
        <div className="absolute inset-0">
          <img
            src="./assets/img/field-01.jpg"
            alt=""
            className="h-full w-full animate-driftin object-cover object-center opacity-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/92 to-abyss/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/80" />
          <div className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-palm/25 blur-[130px]" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-leaf/10 blur-[130px]" />
        </div>
        <div className="lattice pointer-events-none absolute -left-16 bottom-8 h-80 w-80 opacity-[0.09]" aria-hidden />

        <div className="shell relative flex min-h-[94vh] flex-col justify-end pb-20 pt-40">
          <p className="flex animate-rise items-center gap-3 text-sm font-medium text-leaf [animation-delay:100ms]">
            <span className="h-px w-10 bg-leaf" aria-hidden />
            Zanzibar, Tanzania
          </p>
          <h1 className="mt-7 max-w-4xl animate-rise text-[2.7rem] leading-[1.04] [animation-delay:200ms] sm:text-6xl lg:text-[4.6rem]">
            {intro.heroTitle}
          </h1>
          <div className="brandline mt-9 h-[3px] w-full max-w-lg origin-left animate-drawline" aria-hidden />
          <p className="mt-8 max-w-xl animate-rise lede text-frond [animation-delay:400ms]">
            {intro.heroBody}
          </p>
          <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:520ms]">
            <Link
              to="/services"
              className="rounded-full bg-leaf px-8 py-4 text-sm font-semibold text-abyss shadow-lift transition-colors duration-300 hover:bg-ivory"
            >
              See what we do
            </Link>
            <Link
              to="/projects"
              className="rounded-full border border-ivory/35 px-8 py-4 text-sm font-semibold text-ivory transition-colors duration-300 hover:border-leaf hover:text-leaf"
            >
              Review our assignments
            </Link>
          </div>
        </div>
      </section>

      {/* Standing figures */}
      <section className="bg-forest text-ivory">
        <div className="shell grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-9 sm:py-11 ${i > 0 ? 'lg:border-l lg:border-ivory/12 lg:pl-8' : ''} ${
                i === 1 || i === 3 ? 'sm:border-l sm:border-ivory/12 sm:pl-8' : ''
              } ${i > 1 ? 'sm:border-t sm:border-ivory/12 lg:border-t-0' : ''}`}
            >
              <p className="font-display text-5xl text-leaf sm:text-[3.4rem]">{s.value}</p>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-frond">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead title="An independent firm with roots in the archipelago." />
            <p className="mt-8 font-display text-2xl leading-[1.4] text-palm sm:text-[1.8rem]">
              {intro.positioning}
            </p>
          </div>
          <div className="space-y-6 text-ink/75">
            <p className="lede">
              ZABACCO works with government institutions, development partners, private investors
              and the communities a project will actually affect. We hold national permitting
              requirements and international frameworks such as the IFC Performance Standards in the
              same hand, and we do the fieldwork ourselves.
            </p>
            <p className="lede">
              Alongside consultancy, we train students and early-career researchers in research
              methodology, data analysis and field practice — the reason the firm carries the word
              academic in its name.
            </p>
            <div className="grid gap-x-8 gap-y-0 pt-4 sm:grid-cols-2">
              {sectors.map((s) => (
                <p
                  key={s}
                  className="flex items-start gap-3 border-t border-ink/12 py-3 text-sm text-abyss"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden />
                  {s}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-husk py-20 sm:py-28">
        <div className="shell">
          <SectionHead
            title="Six service lines, one standard of evidence."
            intro="Each assignment is led by a named consultant and delivered by a team drawn from across the firm."
          />
          <div className="mt-14 grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services#${service.slug}`}
                className="group relative flex flex-col bg-husk p-8 transition-colors duration-500 hover:bg-ivory"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-leaf transition-transform duration-500 ease-tide group-hover:scale-x-100"
                  aria-hidden
                />
                <h3 className="font-display text-[1.6rem] leading-tight text-abyss">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/65">{service.summary}</p>
                <span className="mt-6 text-sm font-medium text-palm">
                  {service.items.length} services in this line
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — both principals */}
      <section className="relative overflow-hidden bg-abyss py-20 text-ivory sm:py-28">
        <div className="lattice pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] opacity-[0.07]" aria-hidden />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-palm/20 blur-[130px]" aria-hidden />

        <div className="shell relative">
          <SectionHead
            tone="dark"
            title="The leadership."
            intro="Two principals carry responsibility for everything the firm produces: one for its scientific direction, one for its delivery."
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
            {[ceo, principal].map((person) => (
              <Reveal key={person.slug}>
                <article className="flex h-full flex-col">
                  <div className="relative w-full max-w-[19rem]">
                    <div className="absolute -left-3 -top-3 h-full w-full border border-leaf/45" aria-hidden />
                    <div className="relative bg-ivory p-2.5 shadow-lift">
                      <img
                        src={person.photo}
                        alt={`Portrait of ${person.name}`}
                        className="aspect-[4/5] w-full object-cover object-top"
                      />
                    </div>
                  </div>

                  <h3 className="mt-8 font-display text-2xl leading-tight text-ivory sm:text-[1.7rem]">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-leaf">{person.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-frond">{person.remit}</p>
                  <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ivory/70">
                    {person.short}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-ivory/15 pt-5">
                    {person.credentials.slice(0, 2).map((c) => (
                      <li key={c} className="text-sm leading-relaxed text-frond">
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* CEO message */}
          <div className="mt-20 border-t border-ivory/15 pt-14">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1.6fr] lg:gap-16">
              <p className="text-sm font-medium text-leaf">From the Chief Executive</p>
              <blockquote className="space-y-7">
                {ceo.message.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'font-display text-[1.8rem] leading-[1.35] text-ivory sm:text-[2.2rem]'
                        : 'lede text-frond'
                    }
                  >
                    {para}
                  </p>
                ))}
                <footer className="pt-2 text-sm text-ivory/60">
                  {ceo.name}, {ceo.role}
                </footer>
              </blockquote>
            </div>
            <Link
              to="/team"
              className="link-underline mt-10 inline-block text-sm font-medium text-leaf"
            >
              Meet the full team
            </Link>
          </div>
        </div>
      </section>

      {/* Approach preview */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              title="How an assignment runs."
              intro="Six stages, in order, from the first regulatory question through to the monitoring that follows approval."
            />
            <Link to="/approach" className="link-underline text-sm font-medium text-palm">
              The full method
            </Link>
          </div>
          <ol className="mt-14 grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((a, i) => (
              <li key={a.step} className="bg-ivory p-8">
                <p className="font-display text-3xl text-leaf">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-display text-xl text-abyss">{a.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{a.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects preview */}
      <section className="bg-husk py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              title="Recent assignments."
              intro="A selection from the firm's portfolio across infrastructure, tourism, energy, health and education."
            />
            <Link to="/projects" className="link-underline text-sm font-medium text-palm">
              All projects
            </Link>
          </div>

          <div className="mt-14 border-t border-ink/15">
            {projects.slice(0, 5).map((p) => (
              <article
                key={p.title}
                className="group grid gap-x-8 gap-y-2 border-b border-ink/15 py-7 transition-colors duration-300 hover:bg-ivory sm:grid-cols-[5rem_1.6fr_1fr]"
              >
                <p className="font-display text-lg text-leaf">{p.year}</p>
                <div>
                  <h3 className="font-display text-xl leading-snug text-abyss sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/60">{p.client}</p>
                </div>
                <p className="text-sm leading-relaxed text-palm">{p.service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why clients work with us */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell">
          <SectionHead title="Why clients work with us." />
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <div key={d.title} className="border-t-2 border-leaf pt-5">
                <h3 className="font-display text-xl text-abyss">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-forest py-16 text-ivory sm:py-20">
        <div className="shell">
          <h2 className="text-2xl text-ivory sm:text-3xl">
            Our work has been funded by, or delivered with, institutions including:
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <p
                key={p}
                className="border-t border-ivory/15 py-4 text-sm leading-relaxed text-frond"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl text-abyss sm:text-4xl">Inside the work.</h2>
            <Link to="/gallery" className="link-underline text-sm font-medium text-palm">
              Open the gallery
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {gallery.slice(0, 3).map((g) => (
              <figure key={g.src} className="group relative overflow-hidden bg-forest">
                <img
                  src={g.src}
                  alt={g.caption}
                  className="h-72 w-full object-cover transition-transform duration-700 ease-tide group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/95 to-transparent p-5 pt-16 text-sm leading-snug text-ivory">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
