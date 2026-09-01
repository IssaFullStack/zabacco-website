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

      <section className="bg-limestone py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl leading-tight text-deep sm:text-4xl">About ZABACCO</h2>
            <div className="mt-5 h-px w-24 bg-brass/70" aria-hidden />
            <figure className="mt-10 hidden lg:block">
              <img
                src="./assets/img/field-03.jpg"
                alt="ZABACCO consultants in a working session at the Kikwajuni office"
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
            <p className="border-l-2 border-brass pl-6 font-display text-2xl leading-[1.4] text-reef">
              {about.closing}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-abyss py-20 text-limestone sm:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium text-brass">Vision</p>
            <p className="mt-6 font-display text-[1.9rem] leading-[1.3] sm:text-[2.4rem]">
              {about.vision}
            </p>
          </div>
          <div className="border-t border-limestone/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="text-sm font-medium text-brass">Mission</p>
            <p className="mt-6 lede text-seaglass">{about.mission}</p>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="shell">
          <SectionHead
            title="What we hold ourselves to."
            intro="Six commitments that decide how an assignment is run, not only how it is described."
          />
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.name} className="border-t border-deep/20 pt-5">
                <h3 className="font-display text-xl text-deep">{v.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-20 sm:py-28">
        <div className="shell">
          <SectionHead
            title="How the firm is organised."
            intro="Three directorates report to the Principal Administrative Officer, who reports to the Chief Executive. Each directorate runs two specialist units."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {units.map((group) => (
              <div key={group.group} className="border-t-2 border-reef pt-6">
                <h3 className="font-display text-2xl leading-snug text-deep">{group.group}</h3>
                <p className="mt-2 text-sm text-brass">{group.lead}</p>
                <div className="mt-7 space-y-6">
                  {group.units.map((u) => (
                    <div key={u.name} className="border-l border-deep/20 pl-5">
                      <p className="font-medium text-deep">{u.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{u.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep py-20 text-limestone sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead title="Our track record." tone="dark" />
          <ul className="space-y-0">
            {trackRecord.map((t) => (
              <li
                key={t}
                className="border-b border-limestone/15 py-6 text-[1.0625rem] leading-relaxed text-seaglass first:border-t first:border-limestone/15"
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
