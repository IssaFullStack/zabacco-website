import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { nav, org } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-tide ${
        scrolled || open
          ? 'bg-abyss/95 py-3 shadow-[0_1px_0_rgba(195,160,90,0.25)] backdrop-blur-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="shell flex items-center justify-between gap-6">
        <Logo tone="dark" />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-brass' : 'text-limestone/85 hover:text-limestone'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-brass transition-transform duration-500 ease-tide ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <a
            href={`mailto:${org.email}`}
            className="rounded-full border border-brass/60 px-5 py-2 text-sm font-medium text-brass transition-colors duration-300 hover:bg-brass hover:text-abyss"
          >
            Request a proposal
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-limestone/25 text-limestone lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-tide ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-tide ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden lg:hidden ${open ? 'max-h-[80vh]' : 'max-h-0'} transition-[max-height] duration-500 ease-tide`}
      >
        <nav className="shell flex flex-col gap-1 pb-8 pt-6" aria-label="Main, mobile">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `border-b border-limestone/10 py-3 font-display text-2xl tracking-tightest ${
                  isActive ? 'text-brass' : 'text-limestone'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={`mailto:${org.email}`}
            className="mt-5 rounded-full bg-brass px-5 py-3 text-center text-sm font-semibold text-abyss"
          >
            Request a proposal
          </a>
        </nav>
      </div>
    </header>
  )
}
