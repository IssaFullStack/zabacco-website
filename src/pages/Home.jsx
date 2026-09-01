import { Link } from 'react-router-dom'
import { SectionHead, ContactCta } from '../components/Ui'
import {
  differentiators,
  gallery,
  intro,
  leadership,
  projects,
  sectors,
  services,
  stats,
} from '../data/site'

const ceo = leadership[0]

export default function Home() {
  return (
    <>
      {/* Hero — the only orchestrated motion on the site */}
      <section className="relative min-h-[92vh] overflow-hidden bg-abyss text-limestone">
        <div className="absolute inset-0">
          <img
            src="./assets/img/field-01.jpg"
            alt=""
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/90 to-abyss/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/70" />
        </div>
        <div
          className="fretwork pointer-events-none absolute -left-20 bottom-10 h-72 w-72 opacity-[0.08]"
          aria-hidden
        />

        <div className="shell relative flex min-h-[92vh] flex-col justify-end pb-16 pt-40 sm:pb-20">
          <p className="animate-rise text-sm font-medium text-brass [animation-delay:100ms]">
            Zanzibar, Tanzania
          </p>
          <h1 className="mt-6 max-w-4xl animate-rise text-[2.6rem] leading-[1.05] [animation-delay:200ms] sm:text-6xl lg:text-[4.5rem]">
            {intro.heroTitle}
          </h1>
          <div
            className="mt-8 h-px w-full max-w-md origin-left animate-drawline bg-brass/70"
            aria-hidden
          />
          <p className="mt-8 max-w-xl animate-rise lede text-seaglass [animation-delay:400ms]">
            {intro.heroBody}
          </p>
          <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:520ms]">
            <Link
              to="/services"
              className="rounded-full bg-limestone px-7 py-3.5 text-sm font-semibold text-abyss transition-colors duration-300 hover:bg-brass"
            >
              See what we do
            </Link>
            <Link
              to="/projects"
              className="rounded-full border border-limestone/35 px-7 py-3.5 text-sm font-semibold text-limestone transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              Review our assignments
            </Link>
          </div>
        </div>
      </section>

      {/* Standing figures */}
      <section className="border-b border-deep/10 bg-deep text-limestone">
        <div className="shell grid divide-y divide-limestone/12 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 sm:py-10 ${i > 0 ? 'lg:border-l lg:border-limestone/12 lg:pl-8' : ''} ${
                i === 1 || i === 3 ? 'sm:border-l sm:border-limestone/12 sm:pl-8' : ''
              } ${i > 1 ? 'sm:border-t sm:border-limestone/12 lg:border-t-0' : ''}`}
            >
              <p className="font-display text-4xl text-brass sm:text-5xl">{s.value}</p>
              <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-seaglass">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-limestone py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead title="An independent firm with roots in the archipelago." />
            <p className="mt-8 text-2xl leading-[1.4] text-reef sm:text-[1.7rem]">
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
            <div className="grid gap-x-8 gap-y-3 pt-4 sm:grid-cols-2">
              {sectors.map((s) => (
                <p key={s} className="border-t border-deep/12 pt-3 text-sm text-deep">
                  {s}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="shell">
          <SectionHead
            title="Six service lines, one standard of evidence."
            intro="Each assignment is led by a named consultant and delivered by a team drawn from across the firm."
          />
          <ul className="mt-14 border-t border-deep/15">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-deep/15">
                <Link
                  to="/services"
                  className="group grid items-baseline gap-x-8 gap-y-3 py-7 sm:grid-cols-[1fr_auto] sm:py-8"
                >
                  <span>
                    <span className="block font-display text-2xl leading-tight text-deep transition-colors duration-300 group-hover:text-reef sm:text-[1.75rem]">
                      {service.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink/65">
                      {service.summary}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-reef opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                    Read more
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CEO */}
      <section className="relative overflow-hidden bg-abyss py-20 text-limestone sm:py-28">
        <div
          className="fretwork pointer-events-none absolute -right-32 top-0 h-[30rem] w-[30rem] opacity-[0.07]"
          aria-hidden
        />
        <div className="shell relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <figure className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative max-w-sm">
              <div className="absolute -left-4 -top-4 h-full w-full border border-brass/40" aria-hidden />
              <div className="relative bg-limestone p-3">
                <img
                  src={ceo.photo}
                  alt={`Portrait of ${ceo.name}`}
                  className="w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-6">
              <p className="font-display text-xl text-limestone">{ceo.name}</p>
              <p className="mt-1 text-sm text-brass">{ceo.role}</p>
            </figcaption>
          </figure>

          <div>
            <p className="text-sm font-medium text-brass">From the Chief Executive</p>
            <blockquote className="mt-7 space-y-7">
              {ceo.message.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'font-display text-[1.75rem] leading-[1.35] text-limestone sm:text-[2.1rem]'
                      : 'lede text-seaglass'
                  }
                >
                  {para}
                </p>
              ))}
            </blockquote>
            <div className="mt-10 border-t border-limestone/15 pt-7">
              <p className="text-sm leading-relaxed text-seaglass">{ceo.short}</p>
              <Link
                to="/team"
                className="mt-6 inline-block border-b border-brass/60 pb-1 text-sm font-medium text-brass transition-colors hover:border-brass hover:text-limestone"
              >
                Meet the full team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="bg-limestone py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              title="Recent assignments."
              intro="A selection from the firm's portfolio across infrastructure, tourism, energy, health and education."
            />
            <Link
              to="/projects"
              className="border-b border-reef/50 pb-1 text-sm font-medium text-reef transition-colors hover:border-reef"
            >
              All projects
            </Link>
          </div>

          <div className="mt-14 space-y-0 border-t border-deep/15">
            {projects.slice(0, 5).map((p) => (
              <article
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-b border-deep/15 py-7 sm:grid-cols-[5rem_1.6fr_1fr]"
              >
                <p className="font-display text-lg text-brass">{p.year}</p>
                <div>
                  <h3 className="font-display text-xl leading-snug text-deep sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/60">{p.client}</p>
                </div>
                <p className="text-sm leading-relaxed text-reef">{p.service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why clients work with us */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="shell">
          <SectionHead title="Why clients work with us." />
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <div key={d.title} className="border-t border-deep/20 pt-5">
                <h3 className="font-display text-xl text-deep">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-limestone pb-20 sm:pb-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-deep/15 pt-14">
            <h2 className="text-3xl text-deep sm:text-4xl">Inside the work.</h2>
            <Link
              to="/gallery"
              className="border-b border-reef/50 pb-1 text-sm font-medium text-reef transition-colors hover:border-reef"
            >
              Open the gallery
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {gallery.slice(0, 3).map((g) => (
              <figure key={g.src} className="relative overflow-hidden bg-deep">
                <img
                  src={g.src}
                  alt={g.caption}
                  className="h-64 w-full object-cover transition-transform duration-700 ease-tide hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
