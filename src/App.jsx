import { Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-abyss px-6 text-center text-limestone">
      <div>
        <h1 className="text-4xl sm:text-5xl">This page has moved on.</h1>
        <p className="mt-5 text-seaglass">
          The address you followed does not exist on this site.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-brass px-7 py-3 text-sm font-semibold text-abyss"
        >
          Return to the home page
        </Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brass focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-abyss"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
