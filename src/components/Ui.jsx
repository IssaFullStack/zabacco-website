import { Link } from 'react-router-dom'
import { org } from '../data/site'
import { useReveal } from './motion'

/** Section heading with the brand's three-colour rule beneath it. */
export function SectionHead({ title, intro, align = 'left', tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2
        className={`text-3xl leading-[1.12] sm:text-4xl lg:text-[2.85rem] ${
          dark ? 'text-ivory' : 'text-abyss'
        }`}
      >
        {title}
      </h2>
      <div
        className={`brandline mt-6 h-[3px] w-28 ${align === 'center' ? 'mx-auto' : ''}`}
        aria-hidden
      />
      {intro && (
        <p
          className={`mt-6 lede ${align === 'center' ? 'mx-auto' : ''} ${
            dark ? 'text-frond' : 'text-ink/70'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

/** Wraps children in a scroll reveal. */
export function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Dark masthead used at the top of every interior page. */
export function PageHeader({ kicker, title, intro }) {
  return (
    <section className="relative overflow-hidden bg-abyss pb-20 pt-36 text-ivory sm:pb-24 sm:pt-44">
      <div className="pointer-events-none absolute inset-0">
        <div className="lattice absolute -right-16 -top-16 h-[30rem] w-[30rem] opacity-[0.09]" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-palm/25 blur-[110px]" />
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-leaf/10 blur-[120px]" />
      </div>
      <div className="shell relative">
        {kicker && (
          <p className="mb-5 flex items-center gap-3 text-sm font-medium text-leaf">
            <span className="h-px w-8 bg-leaf" aria-hidden />
            {kicker}
          </p>
        )}
        <h1 className="max-w-3xl text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[4rem]">
          {title}
        </h1>
        {intro && <p className="mt-8 lede max-w-2xl text-frond">{intro}</p>}
      </div>
      <div className="brandline absolute inset-x-0 bottom-0 h-1" aria-hidden />
    </section>
  )
}

/** Closing invitation at the foot of each page. */
export function ContactCta({
  title = 'Tell us what you are planning.',
  body = 'Send an outline of the project, the timeline you are working to, and the approvals you need. We will tell you honestly what the assignment requires.',
}) {
  return (
    <section className="relative overflow-hidden bg-forest py-20 text-ivory sm:py-24">
      <div
        className="lattice pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 opacity-[0.08]"
        aria-hidden
      />
      <div className="shell relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="max-w-xl text-3xl leading-[1.15] sm:text-4xl">{title}</h2>
          <p className="mt-6 lede text-frond">{body}</p>
        </div>
        <div className="flex flex-wrap gap-4 lg:justify-end">
          <Link
            to="/contact"
            className="rounded-full bg-leaf px-7 py-3.5 text-sm font-semibold text-abyss shadow-lift transition-colors duration-300 hover:bg-ivory"
          >
            Contact the office
          </Link>
          <a
            href={`mailto:${org.email}`}
            className="rounded-full border border-ivory/35 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors duration-300 hover:border-leaf hover:text-leaf"
          >
            Email us directly
          </a>
        </div>
      </div>
    </section>
  )
}
