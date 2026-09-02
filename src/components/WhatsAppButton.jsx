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
  const [nudged, setNudged] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setNudged(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ZABACCO on WhatsApp"
      className={`group fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 pl-4 pr-4 text-abyss shadow-lift transition-all duration-700 ease-tide hover:pr-6 sm:pl-4 ${
        nudged ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 ease-tide group-hover:max-w-[10rem] sm:inline-block">
        Chat on WhatsApp
      </span>
    </a>
  )
}
