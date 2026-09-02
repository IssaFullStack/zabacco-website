import { useEffect, useState } from 'react'
import { org } from '../data/site'

export function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.01-1.04 2.470 0 1.45 1.06 2.86 1.21 3.06.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M20.52 3.45A11.86 11.86 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.86 11.86 0 0 0 5.74 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.42-8.41zM12.05 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.89 9.89z" />
    </svg>
  )
}

const message = encodeURIComponent(
  "Hello ZABACCO, I'd like to talk about a project. "
)

export const whatsappHref = `https://wa.me/${org.whatsapp}?text=${message}`

/** Floating WhatsApp contact button, fixed to the corner of every page. */
export default function WhatsAppButton() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-700 ease-tide ${
        ready ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ZABACCO on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.65)] ring-1 ring-white/25 transition-transform duration-500 ease-tide hover:scale-105"
      >
        {/* A slow halo, so the button reads as live without demanding attention */}
        <span
          className="wa-halo absolute inset-0 rounded-full bg-[#25D366] opacity-40"
          aria-hidden
        />
        <WhatsAppIcon className="relative h-7 w-7" />

        {/* Label slides out on pointer devices only */}
        <span className="pointer-events-none absolute left-[4.25rem] hidden whitespace-nowrap rounded-full bg-abyss/95 px-4 py-2.5 text-sm font-medium text-ivory opacity-0 shadow-lift ring-1 ring-leaf/25 transition-all duration-400 ease-tide group-hover:translate-x-0 group-hover:opacity-100 nav:block nav:-translate-x-2">
          Chat with us on WhatsApp
        </span>
      </a>
    </div>
  )
}
