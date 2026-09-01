import { useEffect, useState } from 'react'

/** A continuous ticker. Pauses on hover and stops entirely under reduced motion. */
export function Marquee({ items, className = '' }) {
  const doubled = [...items, ...items]
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-forest to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-forest to-transparent" />
      <div className="marquee-track flex w-max gap-12 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 whitespace-nowrap text-sm text-frond"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Disclosure list. One panel open at a time. */
export function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="border-t border-ink/15">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className="border-b border-ink/15">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-xl leading-snug text-abyss sm:text-[1.4rem]">
                  {item.q}
                </span>
                <span
                  className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ease-tide ${
                    isOpen ? 'rotate-45 border-leaf bg-leaf text-abyss' : 'border-ink/25 text-abyss'
                  }`}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-500 ease-tide ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-7 text-[1.0625rem] leading-[1.75] text-ink/70">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Appears after the first screen. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-leaf text-abyss shadow-lift transition-all duration-500 ease-tide ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 13V3m0 0L3 8m5-5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
