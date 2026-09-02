import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides, org } from '../data/site'

const DURATION = 7000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const count = heroSlides.length
  const slide = heroSlides[index]

  const go = useCallback((next) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || paused) return
    timer.current = setTimeout(() => go(index + 1), DURATION)
    return () => clearTimeout(timer.current)
  }, [index, paused, go])

  return (
    <section
      className="relative overflow-hidden bg-abyss text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        if (e.key === 'ArrowLeft') go(index - 1)
      }}
      aria-roledescription="carousel"
      aria-label="ZABACCO introduction"
    >
      {/* Ground: brand glows and the emblem lattice, no photograph behind the type */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-palm/25 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-leaf/[0.07] blur-[130px]" />
        <div className="lattice absolute inset-0 opacity-[0.055]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-abyss to-transparent" />
      </div>

      <div className="shell relative grid items-center gap-8 pb-12 pt-28 sm:gap-12 sm:pb-20 sm:pt-36 nav:min-h-[46rem] nav:grid-cols-[1.08fr_0.92fr] nav:gap-16 nav:pb-24 nav:pt-40">
        {/* Copy */}
        <div aria-live="polite" aria-atomic="true">
          <div key={index}>
            <p className="flex animate-rise items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-leaf sm:text-sm sm:tracking-[0.18em]">
              <span className="h-px w-8 bg-leaf sm:w-10" aria-hidden />
              {slide.kicker}
            </p>

            <h1 className="mt-4 animate-rise text-[2.05rem] sm:mt-7 leading-[1.08] [animation-delay:120ms] sm:text-[3.1rem] sm:leading-[1.05] nav:text-[3.4rem] xl:text-[3.9rem]">
              {slide.title}
            </h1>

            <div className="brandline mt-6 h-[3px] w-36 sm:mt-7 origin-left animate-drawline sm:w-56" aria-hidden />

            <p className="mt-5 max-w-xl animate-rise text-[0.95rem] leading-[1.65] text-frond [animation-delay:280ms] sm:mt-8 sm:text-lg sm:leading-[1.8]">
              {slide.body}
            </p>

            <ul className="mt-6 flex animate-rise flex-wrap gap-2 [animation-delay:360ms] sm:mt-7">
              {slide.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-ivory/20 px-3.5 py-1.5 text-xs text-ivory/75 sm:text-[0.8rem]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex animate-rise flex-wrap gap-3 [animation-delay:440ms] sm:mt-10 sm:gap-4">
              <Link
                to={slide.ctaTo}
                className="flex-1 whitespace-nowrap rounded-full bg-leaf px-4 py-3.5 text-center text-[0.82rem] font-semibold text-abyss sm:text-sm shadow-lift transition-colors duration-300 hover:bg-ivory sm:flex-none sm:px-8 sm:py-4"
              >
                {slide.cta}
              </Link>
              <Link
                to="/contact"
                className="flex-1 whitespace-nowrap rounded-full border border-ivory/35 px-4 py-3.5 text-center text-[0.82rem] font-semibold text-ivory sm:text-sm transition-colors duration-300 hover:border-leaf hover:text-leaf sm:flex-none sm:px-8 sm:py-4"
              >
                Talk to the office
              </Link>
            </div>
          </div>
        </div>

        {/* Framed image panel */}
        <figure className="relative">
          <div
            className="absolute -left-3 -top-3 h-20 w-20 border-l-[3px] border-t-[3px] border-leaf sm:-left-4 sm:-top-4 sm:h-28 sm:w-28"
            aria-hidden
          />
          <div
            className="absolute -bottom-3 -right-3 h-20 w-20 border-b-[3px] border-r-[3px] border-flame sm:-bottom-4 sm:-right-4 sm:h-28 sm:w-28"
            aria-hidden
          />

          <div className="relative overflow-hidden bg-forest shadow-lift">
            {heroSlides.map((s, i) => (
              <img
                key={s.image}
                src={s.image}
                alt={i === index ? s.caption : ''}
                aria-hidden={i !== index}
                className={`aspect-[16/10] w-full object-cover transition-all duration-[1400ms] ease-tide sm:aspect-[2/1] nav:aspect-[5/6] ${
                  i === index
                    ? 'relative z-10 scale-100 opacity-100'
                    : 'absolute inset-0 z-0 scale-105 opacity-0'
                }`}
              />
            ))}
            <div
              className="absolute inset-0 z-20 bg-gradient-to-t from-abyss/85 via-abyss/10 to-transparent"
              aria-hidden
            />
            <figcaption className="absolute inset-x-0 bottom-0 z-30 p-5 text-xs leading-snug text-ivory/80 sm:p-6 sm:text-sm">
              {slide.caption}
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Controls and standing line */}
      <div className="relative border-t border-ivory/12">
        <div className="shell flex flex-wrap items-center justify-between gap-5 py-5">
          <div className="flex items-center gap-3">
            {heroSlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${s.kicker}`}
                aria-current={i === index}
                className="group py-2"
              >
                <span
                  className={`block h-[3px] transition-all duration-500 ease-tide ${
                    i === index ? 'w-12 bg-leaf sm:w-16' : 'w-6 bg-ivory/25 group-hover:bg-ivory/60'
                  }`}
                />
              </button>
            ))}
            <span className="ml-1 font-display text-sm text-ivory/45">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </div>

          <p className="hidden text-sm text-ivory/45 nav:block">{org.tagline}</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-leaf hover:text-leaf sm:h-11 sm:w-11"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-leaf hover:text-leaf sm:h-11 sm:w-11"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
