import { PageHeader, SectionHead, ContactCta } from '../components/Ui'
import { leadership, team } from '../data/site'

function LeaderBlock({ person, reverse }) {
  return (
    <article className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
      <figure className={reverse ? 'lg:order-2' : ''}>
        <div className="relative max-w-sm">
          <div
            className="absolute -bottom-4 -right-4 h-full w-full border border-leaf/50"
            aria-hidden
          />
          <img
            src={person.photo}
            alt={`Portrait of ${person.name}`}
            className="relative w-full object-cover"
            loading="lazy"
          />
        </div>
        <figcaption className="mt-7 max-w-sm">
          <h2 className="font-display text-2xl leading-tight text-forest">{person.name}</h2>
          <p className="mt-2 text-sm font-medium text-palm">{person.role}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">{person.remit}</p>
          <ul className="mt-6 space-y-2 border-t border-forest/15 pt-5">
            {person.credentials.map((c) => (
              <li key={c} className="text-sm leading-relaxed text-ink/70">
                {c}
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>

      <div className={reverse ? 'lg:order-1' : ''}>
        <div className="space-y-5">
          {person.bio.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'font-display text-2xl leading-[1.4] text-palm sm:text-[1.7rem]'
                  : 'lede text-ink/75'
              }
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Team() {
  return (
    <>
      <PageHeader
        kicker="Team and expertise"
        title="The people who sign the report."
        intro="ZABACCO is supported by qualified professionals with expertise spanning environmental and social impact assessment, research, policy analysis, stakeholder engagement and project management. When an assignment calls for it, we draw on a network of national and international experts."
      />

      <div className="bg-ivory">
        <LeaderBlock person={leadership[0]} />
        <div className="shell">
          <div className="h-px w-full bg-forest/15" aria-hidden />
        </div>
        <LeaderBlock person={leadership[1]} reverse />
      </div>

      <section className="bg-forest py-20 text-ivory sm:py-28">
        <div className="shell">
          <SectionHead
            tone="dark"
            title="Directors and specialists."
            intro="Each directorate is led by a consultant who takes technical responsibility for the assignments under it."
          />
          <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
            {team.map((person) => (
              <article key={person.name} className="border-t border-ivory/20 pt-7">
                <h3 className="font-display text-2xl leading-tight text-ivory">
                  {person.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-leaf">{person.role}</p>
                <p className="mt-1.5 text-sm text-frond/80">{person.remit}</p>
                {person.credentials.length > 0 && (
                  <ul className="mt-5 space-y-1.5">
                    {person.credentials.map((c) => (
                      <li key={c} className="text-sm leading-relaxed text-frond">
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 space-y-4">
                  {person.bio.map((p, i) => (
                    <p key={i} className="text-[0.95rem] leading-relaxed text-ivory/70">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        title="Want a specific expert on your assignment?"
        body="Tell us the technical question at the centre of the project and we will name the consultant who will lead it."
      />
    </>
  )
}
