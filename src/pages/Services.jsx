import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHeader, ContactCta, SectionHead } from '../components/Ui'
import { Accordion } from '../components/Widgets'
import { services, faqs } from '../data/site'

export default function Services() {
  const { hash } = useLocation()
  const [active, setActive] = useState(services[0].slug)

  // Scroll a section into view without touching the URL hash, which the
  // hash router would otherwise read as a route change.
  const goToSection = useCallback((slug) => {
    const el = document.getElementById(slug)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(slug)
  }, [])

  // Honour /services#esia arriving from the footer or the home page.
  useEffect(() => {
    const slug = hash.replace('#', '')
    if (!slug) return
    const t = setTimeout(() => goToSection(slug), 120)
    return () => clearTimeout(t)
  }, [hash, goToSection])

  // Highlight whichever section is currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    services.forEach((s) => {
      const el = document.getElementById(s.slug)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <PageHeader
        kicker="Services"
        title="Consultancy from scoping through to the signed report."
        intro="Our services combine technical expertise, field experience and evidence-based methods. Every project we take on is expected to create value for the client, the community and the environment."
      />

      <nav
        className="sticky top-[4.5rem] z-30 border-b border-forest/12 bg-ivory/95 backdrop-blur"
        aria-label="Service lines"
      >
        <div className="shell flex gap-2 overflow-x-auto py-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => goToSection(s.slug)}
              aria-current={active === s.slug}
              className={`whitespace-nowrap rounded-full border px-4 py-2 transition-colors duration-300 ${
                active === s.slug
                  ? 'border-palm bg-palm text-ivory'
                  : 'border-ink/15 text-ink/60 hover:border-palm hover:text-palm'
              }`}
            >
              {s.short}
            </button>
          ))}
        </div>
      </nav>

      <div className="bg-ivory">
        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-32 py-16 sm:py-20 ${i % 2 === 1 ? 'bg-husk' : 'bg-ivory'}`}
          >
            <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div className="lg:sticky lg:top-40 lg:self-start">
                <h2 className="text-3xl leading-[1.15] text-forest sm:text-[2.5rem]">
                  {service.title}
                </h2>
                <div className="mt-5 h-px w-20 bg-leaf/70" aria-hidden />
                <p className="mt-6 lede text-ink/70">{service.summary}</p>
              </div>
              <ul className="grid gap-0 self-start">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-forest/15 py-4 text-[1.0625rem] leading-relaxed text-forest first:border-t first:border-forest/15"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHead
              title="Questions clients ask first."
              intro="If yours is not here, write to the office and we will answer it directly."
            />
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <ContactCta
        title="Not sure which of these your project needs?"
        body="Most assignments cross two or three of our service lines. Describe the project and we will set out the scope, the approvals it triggers and a realistic timeline."
      />
    </>
  )
}
