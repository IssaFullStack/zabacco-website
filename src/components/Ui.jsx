import { Link } from 'react-router-dom'
import { org } from '../data/site'

/** A hairline that carries a heading, drawn in brass. */
export function SectionHead({ title, intro, align = 'left', tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2
        className={`text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-limestone' : 'text-deep'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 h-px w-24 ${align === 'center' ? 'mx-auto' : ''} bg-brass/70`}
        aria-hidden
      />
      {intro && (
        <p
          className={`mt-6 lede ${align === 'center' ? 'mx-auto' : ''} ${
            dark ? 'text-seaglass' : 'text-ink/70'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

/** Standard dark page masthead used on every interior page. */
export function PageHeader({ kicker, title, intro }) {
  return (
    <section className="relative overflow-hidden bg-abyss pb-16 pt-36 text-limestone sm:pb-20 sm:pt-44">
      <div
        className="fretwork pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] opacity-[0.07]"
        aria-hidden
      />
      <div className="shell relative">
        {kicker && <p className="mb-5 text-sm font-medium text-brass">{kicker}</p>}
        <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-7 lede max-w-2xl text-seaglass">{intro}</p>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px rule-brass" aria-hidden />
    </section>
  )
}

/** Closing invitation, repeated at the foot of each page. */
export function ContactCta({
  title = 'Tell us what you are planning.',
  body = 'Send an outline of the project, the timeline you are working to, and the approvals you need. We will tell you honestly what the assignment requires.',
}) {
  return (
    <section className="bg-deep py-20 text-limestone sm:py-24">
      <div className="shell grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="max-w-xl text-3xl leading-[1.15] sm:text-4xl">{title}</h2>
          <p className="mt-6 lede text-seaglass">{body}</p>
        </div>
        <div className="flex flex-wrap gap-4 lg:justify-end">
          <Link
            to="/contact"
            className="rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-abyss transition-colors duration-300 hover:bg-limestone"
          >
            Contact the office
          </Link>
          <a
            href={`mailto:${org.email}`}
            className="rounded-full border border-limestone/35 px-7 py-3.5 text-sm font-semibold text-limestone transition-colors duration-300 hover:border-brass hover:text-brass"
          >
            Email us directly
          </a>
        </div>
      </div>
    </section>
  )
}
