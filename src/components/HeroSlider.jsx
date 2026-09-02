import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides } from '../data/site'

const DURATION = 7000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const count = heroSlides.length

  const go = useCallback((next) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return
    timer.current = setTimeout(() => go(index + 1), DURATION)
    return () => clearTimeout(timer.current)
  }, [index, paused, go])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }

  return (
    <section
      className="relative min-h-[min(94vh,50rem)] overflow-hidden bg-abyss text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      aria-roledescription="carousel"
      aria-label="ZABACCO introduction"
      tabIndex={-1}
    >
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-tide ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover object-center opacity-[0.34] transition-transform duration-[9000ms] ease-linear ${
              i === index ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/92 to-abyss/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/80" />
        <div className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-palm/25 blur-[130px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-leaf/10 blur-[130px]" />
        <div className="lattice absolute -left-16 bottom-8 h-80 w-80 opacity-[0.09]" />
      </div>

      {/* Copy */}
      <div className="shell relative flex min-h-[min(94vh,50rem)] flex-col justify-end pb-28 pt-40 sm:pb-32">
        <div aria-live="polite" aria-atomic="true">
          {heroSlides.map((slide, i) =>
            i === index ? (
              <div key={slide.image}>
                <p className="flex animate-rise items-center gap-3 text-sm font-medium text-leaf">
                  <span className="h-px w-10 bg-leaf" aria-hidden />
                  {slide.kicker}
                </p>
                <h1 className="mt-7 max-w-4xl animate-rise text-[2.7rem] leading-[1.04] [animation-delay:120ms] sm:text-6xl lg:text-[4.4rem]">
                  {slide.title}
                </h1>
                <div className="brandline mt-9 h-[3px] w-full max-w-lg origin-left animate-drawline" aria-hidden />
                <p className="mt-8 max-w-xl animate-rise lede text-frond [animation-delay:300ms]">
                  {slide.body}
                </p>
                <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:420ms]">
                  <Link
                    to={slide.ctaTo}
                    className="rounded-full bg-leaf px-8 py-4 text-sm font-semibold text-abyss shadow-lift transition-colors duration-300 hover:bg-ivory"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full border border-ivory/35 px-8 py-4 text-sm font-semibold text-ivory transition-colors duration-300 hover:border-leaf hover:text-leaf"
                  >
                    Talk to the office
                  </Link>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-8 z-10">
        <div className="shell flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${slide.kicker}`}
                aria-current={i === index}
                className="group py-3"
              >
                <span
                  className={`block h-[3px] transition-all duration-500 ease-tide ${
                    i === index ? 'w-14 bg-leaf' : 'w-7 bg-ivory/30 group-hover:bg-ivory/60'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 font-display text-sm text-ivory/50">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-leaf hover:text-leaf"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-leaf hover:text-leaf"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
