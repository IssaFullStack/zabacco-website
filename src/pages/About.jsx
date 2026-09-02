import { PageHeader, SectionHead, ContactCta } from '../components/Ui'
import { about, org, trackRecord, units, values } from '../data/site'

export default function About() {
  return (
    <>
      <PageHeader
        kicker={`Established ${org.founded}`}
        title="A consultancy built where the evidence is."
        intro={about.purpose}
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell grid gap-12 nav:grid-cols-[0.8fr_1.2fr] nav:gap-20">
          <div className="nav:sticky nav:top-32 nav:self-start">
            <h2 className="text-3xl leading-tight text-forest sm:text-4xl">About ZABACCO</h2>
            <div className="mt-5 h-px w-24 bg-leaf/70" aria-hidden />
            <figure className="mt-10 hidden lg:block">
              <img
                src="./assets/img/field-03.jpg"
                alt="ZABACCO consultants in a working session at the Malindi office"
                className="w-full object-cover"
                loading="lazy"
              />
            </figure>
          </div>
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="lede text-ink/75">
                {p}
              </p>
            ))}
            <p className="border-l-2 border-leaf pl-6 font-display text-2xl leading-[1.4] text-palm">
              {about.closing}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-abyss py-20 text-ivory sm:py-28">
        <div className="shell grid gap-14 nav:grid-cols-2 nav:gap-20">
          <div>
            <p className="text-sm font-medium text-leaf">Vision</p>
            <p className="mt-6 font-display text-[1.9rem] leading-[1.3] sm:text-[2.4rem]">
              {about.vision}
            </p>
          </div>
          <div className="border-t border-ivory/15 pt-10 lg:border-l nav:border-t-0 lg:pl-16 lg:pt-0">
            <p className="text-sm font-medium text-leaf">Mission</p>
            <p className="mt-6 lede text-frond">{about.mission}</p>
          </div>
        </div>
      </section>

      <section className="bg-husk py-20 sm:py-28">
        <div className="shell">
          <SectionHead
            title="What we hold ourselves to."
            intro="Six commitments that decide how an assignment is run, not only how it is described."
          />
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 nav:grid-cols-3">
            {values.map((v) => (
              <div key={v.name} className="border-t border-forest/20 pt-5">
                <h3 className="font-display text-xl text-forest">{v.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell">
          <SectionHead
            title="How the firm is organised."
            intro="Three directorates report to the Principal Administrative Officer, who reports to the Chief Executive. Each directorate runs two specialist units."
          />
          <div className="mt-14 grid gap-10 nav:grid-cols-3">
            {units.map((group) => (
              <div key={group.group} className="border-t-2 border-palm pt-6">
                <h3 className="font-display text-2xl leading-snug text-forest">{group.group}</h3>
                <p className="mt-2 text-sm text-leaf">{group.lead}</p>
                <div className="mt-7 space-y-6">
                  {group.units.map((u) => (
                    <div key={u.name} className="border-l border-forest/20 pl-5">
                      <p className="font-medium text-forest">{u.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{u.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-ivory sm:py-28">
        <div className="shell grid gap-12 nav:grid-cols-[0.8fr_1.2fr] nav:gap-20">
          <SectionHead title="Our track record." tone="dark" />
          <ul className="space-y-0">
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

      <ContactCta />
    </>
  )
}
