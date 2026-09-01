import { useCallback, useEffect, useState } from 'react'
import { PageHeader, ContactCta } from '../components/Ui'
import { gallery } from '../data/site'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const open = index !== null

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (dir) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    []
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
        intro="Consultation sessions, technical reviews and partner briefings at the ZABACCO office in Kikwajuni, Zanzibar."
      />

      <section className="bg-limestone py-16 sm:py-20">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block overflow-hidden bg-deep text-left"
              aria-label={`Open image: ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.caption}
                className="h-72 w-full object-cover transition-transform duration-700 ease-tide group-hover:scale-[1.04]"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/90 to-transparent p-5 pt-14 text-sm leading-snug text-limestone">
                {g.caption}
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
              className="rounded-full border border-limestone/30 px-5 py-2 text-sm text-limestone transition-colors hover:border-brass hover:text-brass"
            >
              Close
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img
              src={gallery[index].src}
              alt={gallery[index].caption}
              className="max-h-[72vh] w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <p className="max-w-xl text-sm text-seaglass">{gallery[index].caption}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="rounded-full border border-limestone/30 px-5 py-2 text-sm text-limestone transition-colors hover:border-brass hover:text-brass"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="rounded-full border border-limestone/30 px-5 py-2 text-sm text-limestone transition-colors hover:border-brass hover:text-brass"
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
