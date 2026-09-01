import { Link } from 'react-router-dom'

export default function Logo({ tone = 'dark', className = '' }) {
  const isDark = tone === 'dark' // dark = placed on a dark ground
  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="ZABACCO home"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-limestone ring-1 ring-brass/40 sm:h-12 sm:w-12">
        <img
          src="./assets/img/logo.png"
          alt=""
          className="h-9 w-9 object-contain sm:h-10 sm:w-10"
        />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[1.35rem] tracking-tightest ${
            isDark ? 'text-limestone' : 'text-deep'
          }`}
        >
          ZABACCO
        </span>
        <span
          className={`mt-1 block text-[0.66rem] font-medium tracking-[0.14em] ${
            isDark ? 'text-seaglass' : 'text-reef/70'
          }`}
        >
          Unlocks Local Potentials
        </span>
      </span>
    </Link>
  )
}
