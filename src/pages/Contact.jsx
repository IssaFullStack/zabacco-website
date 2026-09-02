import { useState } from 'react'
import { PageHeader } from '../components/Ui'
import { org, services } from '../data/site'

const field =
  'w-full border-b border-forest/25 bg-transparent py-3 text-[1.0625rem] text-forest placeholder:text-ink/35 focus:border-palm focus:outline-none'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    organisation: '',
    email: '',
    service: services[0].title,
    message: '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // No backend yet: hand the enquiry to the visitor's mail client.
    const body = [
      `Name: ${form.name}`,
      `Organisation: ${form.organisation}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${org.email}?subject=${encodeURIComponent(
      `Enquiry from ${form.name || 'website visitor'}`
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Start a conversation with the office."
        intro="Write to us with the project, the location and the decision you need evidence for. We answer enquiries within two working days."
      />

      <section className="bg-ivory py-16 sm:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="text-3xl text-forest sm:text-4xl">Office details</h2>
            <div className="mt-5 h-px w-20 bg-leaf/70" aria-hidden />

            <dl className="mt-10 space-y-8">
              <div className="border-t border-forest/15 pt-5">
                <dt className="text-sm text-ink/50">Address</dt>
                <dd className="mt-2 text-[1.0625rem] leading-relaxed text-forest">{org.address}</dd>
                <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/60">
                  {org.landmarks}
                </dd>
              </div>
              <div className="border-t border-forest/15 pt-5">
                <dt className="text-sm text-ink/50">Telephone</dt>
                <dd className="mt-2 space-y-1.5 text-[1.0625rem] text-forest">
                  {org.phones.map((phone) => (
                    <p key={phone}>
                      <a className="hover:text-palm" href={`tel:${phone.replace(/\s/g, '')}`}>
                        {phone}
                      </a>
                    </p>
                  ))}
                </dd>
              </div>
              <div className="border-t border-forest/15 pt-5">
                <dt className="text-sm text-ink/50">Email</dt>
                <dd className="mt-2 text-[1.0625rem] text-forest">
                  <a className="hover:text-palm" href={`mailto:${org.email}`}>
                    {org.email}
                  </a>
                </dd>
              </div>
              <div className="border-t border-forest/15 pt-5">
                <dt className="text-sm text-ink/50">Office hours</dt>
                <dd className="mt-2 text-[1.0625rem] text-forest">{org.hours}</dd>
              </div>
            </dl>

            <figure className="mt-12">
              <img
                src="./assets/img/field-06.jpg"
                alt="The ZABACCO meeting room during a partner briefing"
                className="w-full object-cover"
                loading="lazy"
              />
            </figure>
          </div>

          <div>
            <h2 className="text-3xl text-forest sm:text-4xl">Send an enquiry</h2>
            <div className="mt-5 h-px w-20 bg-leaf/70" aria-hidden />

            {sent ? (
              <div className="mt-10 border-l-2 border-palm bg-husk/60 p-8">
                <p className="font-display text-2xl text-forest">Your email client is open.</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70">
                  Send the drafted message and we will reply within two working days. If nothing
                  opened, write to {org.email} directly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 border-b border-palm/60 pb-1 text-sm font-medium text-palm"
                >
                  Write another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10 space-y-8">
                <div>
                  <label htmlFor="name" className="text-sm text-ink/50">
                    Your name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                    className={field}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="organisation" className="text-sm text-ink/50">
                    Organisation
                  </label>
                  <input
                    id="organisation"
                    value={form.organisation}
                    onChange={update('organisation')}
                    className={field}
                    placeholder="Company, ministry or institution"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-ink/50">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className={field}
                    placeholder="name@organisation.com"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="text-sm text-ink/50">
                    What do you need
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={update('service')}
                    className={field}
                  >
                    {services.map((s) => (
                      <option key={s.slug}>{s.title}</option>
                    ))}
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-ink/50">
                    About the project
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    className={`${field} resize-none`}
                    placeholder="Location, scale, timeline and the approvals you are working towards."
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-palm px-8 py-3.5 text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-forest"
                >
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-abyss py-16 text-ivory">
        <div className="shell">
          <h2 className="text-2xl sm:text-3xl">Find the office</h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-frond">
            We are in Malindi, Stone Town — next to Golden Tulip and beside the historic Masjid
            Bamnara, a short walk from the ferry terminal.
          </p>
          <div className="mt-8 aspect-[16/7] w-full overflow-hidden border border-ivory/20">
            <iframe
              title="Map of Zanzibar Town"
              src="https://www.openstreetmap.org/export/embed.html?bbox=39.17%2C-6.19%2C39.23%2C-6.14&layer=mapnik"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
