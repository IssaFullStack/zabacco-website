import { Link } from 'react-router-dom'
import Logo from './Logo'
import { nav, org } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-abyss text-limestone">
      <div className="fretwork pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-seaglass">
              {org.name}. A multidisciplinary consultancy in environmental and social assessment,
              research and business advisory, working across Zanzibar and mainland Tanzania since{' '}
              {org.founded}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-limestone">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-limestone/75 transition-colors hover:text-brass"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg text-limestone">Office</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-limestone/75">
              <p className="leading-relaxed">{org.address}</p>
              <p>
                <a className="transition-colors hover:text-brass" href={`tel:${org.phone.replace(/\s/g, '')}`}>
                  {org.phone}
                </a>
              </p>
              <p>
                <a className="transition-colors hover:text-brass" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </p>
              <p className="text-limestone/55">{org.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-limestone/12 pt-6 text-xs text-limestone/45">
          <p>
            © {new Date().getFullYear()} {org.short}. All rights reserved.
          </p>
          <p>Registered and operating in Zanzibar, United Republic of Tanzania.</p>
        </div>
      </div>
    </footer>
  )
}
