import { Link } from 'react-router-dom'

export default function Logo({ tone = 'dark', className = '' }) {
  const onDark = tone === 'dark'
  return (
    <Link to="/" className={`group flex items-center gap-3.5 ${className}`} aria-label="ZABACCO home">
      <span className="plate h-12 w-12 shrink-0 ring-1 ring-leaf/30 sm:h-14 sm:w-14">
        <img
          src="./assets/img/logo-mark.png"
          alt=""
          className="h-9 w-9 object-contain sm:h-11 sm:w-11"
        />
      </span>
      <span className="leading-none">
        <span
          className={`block whitespace-nowrap font-display text-[1.4rem] tracking-tightest sm:text-[1.55rem] ${
            onDark ? 'text-ivory' : 'text-abyss'
          }`}
        >
          ZABACCO
        </span>
        <span
          className={`mt-1.5 block whitespace-nowrap text-[0.65rem] font-medium italic tracking-[0.1em] ${
            onDark ? 'text-leaf' : 'text-palm'
          }`}
        >
          Unlocks Local Potentials
        </span>
      </span>
    </Link>
  )
}
