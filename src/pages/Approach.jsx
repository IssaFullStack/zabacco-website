import { PageHeader, ContactCta, SectionHead } from '../components/Ui'
import { approach, about, values } from '../data/site'

export default function Approach() {
  return (
    <>
      <PageHeader
        kicker="Our method"
        title="How an assignment runs, from first question to final monitoring round."
        intro="Clients rarely want a methodology chapter. They want to know what will happen, in what order, and where the risk sits. This is that answer."
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell">
          <ol className="grid gap-0">
            {approach.map((stage, i) => (
              <li
                key={stage.step}
                className="grid gap-x-10 gap-y-4 border-t border-ink/15 py-10 last:border-b lg:grid-cols-[7rem_1fr_1.3fr]"
              >
                <div>
                  <p className="font-display text-4xl text-leaf">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-palm">{stage.step}</p>
                </div>
                <h2 className="font-display text-2xl leading-snug text-abyss">{stage.title}</h2>
                <p className="lede text-ink/70">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-abyss py-20 text-ivory sm:py-24">
        <div className="lattice pointer-events-none absolute -left-20 top-0 h-96 w-96 opacity-[0.07]" aria-hidden />
        <div className="shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead tone="dark" title="What holds the method together." />
          <div>
            <p className="lede text-frond">{about.purpose}</p>
            <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.name} className="border-t border-ivory/15 py-5">
                  <h3 className="font-display text-lg text-ivory">{v.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-frond">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta
        title="Have a project that needs this run properly?"
        body="We will tell you which stages your project actually triggers, and which it does not, before you commit to anything."
      />
    </>
  )
}
