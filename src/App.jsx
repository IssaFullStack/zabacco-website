import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { BackToTop } from './components/Widgets'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Approach from './pages/Approach'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import { AdminProvider, useAdmin } from './admin/store'
import AdminLayout from './admin/components/AdminLayout'
import { ResourceForm, ResourceList } from './admin/pages/Resource'
import { Account, Dashboard, Enquiries, Login, Settings } from './admin/pages/Screens'

function RequireAuth({ children }) {
  const { user } = useAdmin()
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}

function AdminArea() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
        <Route path=":key" element={<ResourceList />} />
        <Route path=":key/:id" element={<ResourceForm />} />
      </Route>
    </Routes>
  )
}

function PublicSite() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-leaf focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-abyss"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}

function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-abyss px-6 text-center text-ivory">
      <div>
        <h1 className="text-4xl sm:text-5xl">This page has moved on.</h1>
        <p className="mt-5 text-frond">
          The address you followed does not exist on this site.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-leaf px-7 py-3 text-sm font-semibold text-abyss"
        >
          Return to the home page
        </Link>
      </div>
    </section>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <AdminProvider>
      {!isAdmin && <ScrollToTop />}
      {isAdmin ? (
        <Routes>
          <Route path="/admin/*" element={<AdminArea />} />
        </Routes>
      ) : (
        <PublicSite />
      )}
    </AdminProvider>
  )
}
