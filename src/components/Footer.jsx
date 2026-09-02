import { Link } from 'react-router-dom'
import Logo from './Logo'
import { nav, org, services } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-abyss text-ivory">
      <div className="brandline h-1 w-full" aria-hidden />
      <div className="lattice pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-palm/20 blur-[120px]" aria-hidden />

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-frond">
              {org.name}. A multidisciplinary consultancy in environmental and social assessment,
              research and business advisory, working across Zanzibar and mainland Tanzania since{' '}
              {org.founded}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-ivory">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-ivory/70 transition-colors hover:text-leaf">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg text-ivory">Services</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-ivory/70 transition-colors hover:text-leaf"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg text-ivory">Office</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-ivory/70">
              <p className="leading-relaxed">{org.address}</p>
              <p className="leading-relaxed text-ivory/50">{org.landmarks}</p>
              {org.phones.map((phone) => (
                <p key={phone}>
                  <a
                    className="transition-colors hover:text-leaf"
                    href={`tel:${phone.replace(/\s/g, '')}`}
                  >
                    {phone}
                  </a>
                </p>
              ))}
              <p>
                <a className="transition-colors hover:text-leaf" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </p>
              <p className="text-ivory/45">{org.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-ivory/12 pt-6 text-xs text-ivory/45">
          <p>© {new Date().getFullYear()} {org.short}. All rights reserved.</p>
          <p>Registered and operating in Zanzibar, United Republic of Tanzania.</p>
        </div>
      </div>
    </footer>
  )
}
