import { useEffect, useRef, useState } from 'react'

/**
 * Horizontal scroll-snap carousel with arrows and progress dots.
 * Children are rendered as slides; `slideClass` controls slide width.
 */
export default function Carousel({ children, label, slideClass = 'w-[86%] sm:w-[48%] nav:w-[32%]' }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const items = Array.isArray(children) ? children : [children]

  const update = () => {
    const el = trackRef.current
    if (!el) return
    const slideWidth = el.scrollWidth / items.length
    setActive(Math.round(el.scrollLeft / slideWidth))
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const goTo = (i) => {
    const el = trackRef.current
    if (!el) return
    const slideWidth = el.scrollWidth / items.length
    el.scrollTo({ left: slideWidth * i, behavior: 'smooth' })
  }

  return (
    <div className="relative" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start ${slideClass}`}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === active}
              className={`h-[3px] transition-all duration-400 ease-tide ${
                i === active ? 'w-10 bg-leaf' : 'w-5 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-abyss transition-colors hover:border-palm hover:text-palm disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-abyss transition-colors hover:border-palm hover:text-palm disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
