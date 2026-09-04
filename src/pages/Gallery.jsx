import { useCallback, useEffect, useMemo, useState } from 'react'
import { PageHeader, ContactCta } from '../components/Ui'
import Carousel from '../components/Carousel'
import { gallery, galleryProjects } from '../data/site'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const [filter, setFilter] = useState('All work')
  const open = index !== null

  const shown = useMemo(
    () => (filter === 'All work' ? gallery : gallery.filter((g) => g.project === filter)),
    [filter]
  )

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (dir) => setIndex((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  return (
    <>
      <PageHeader
        kicker="Gallery"
        title="How the work actually looks."
        intro="Site assessments, community consultations and technical sessions from assignments across Zanzibar."
      />

      <section className="bg-ivory pt-16">
        <div className="shell">
          <Carousel label="Featured photographs" slideClass="w-[88%] sm:w-[60%] lg:w-[46%]">
            {gallery.filter((g) => g.project !== 'Office and partners').map((g) => (
              <figure key={g.src} className="relative overflow-hidden bg-forest">
                <img src={g.src} alt={g.caption} className="h-[22rem] w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/80 to-transparent p-6 pt-20">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-leaf">
                    {g.project}
                  </span>
                  <span className="mt-1.5 block text-sm text-ivory">{g.caption}</span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-wrap gap-2">
            {galleryProjects.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setFilter(name)
                  setIndex(null)
                }}
                aria-pressed={filter === name}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  filter === name
                    ? 'border-palm bg-palm text-ivory'
                    : 'border-ink/15 text-ink/60 hover:border-palm hover:text-palm'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/50">
            {shown.length} {shown.length === 1 ? 'photograph' : 'photographs'}
          </p>
        </div>

        <div className="shell mt-6 grid gap-4 sm:grid-cols-2 nav:grid-cols-3">
          {shown.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block overflow-hidden bg-forest text-left"
              aria-label={`Open image: ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.caption}
                className="h-72 w-full object-cover transition-transform duration-700 ease-tide group-hover:scale-[1.04]"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/80 to-transparent p-5 pt-20">
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-leaf">
                  {g.project}
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-ivory">{g.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-abyss/97 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-ivory/30 px-5 py-2 text-sm text-ivory transition-colors hover:border-leaf hover:text-leaf"
            >
              Close
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img
              src={shown[index].src}
              alt={shown[index].caption}
              className="max-h-[72vh] w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="max-w-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-leaf">
                {shown[index].project}
              </p>
              <p className="mt-1.5 text-sm text-frond">{shown[index].caption}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="rounded-full border border-ivory/30 px-5 py-2 text-sm text-ivory transition-colors hover:border-leaf hover:text-leaf"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="rounded-full border border-ivory/30 px-5 py-2 text-sm text-ivory transition-colors hover:border-leaf hover:text-leaf"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactCta />
    </>
  )
}
