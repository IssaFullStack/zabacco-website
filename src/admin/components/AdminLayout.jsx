import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdmin } from '../store'
import { resourceOrder, resources } from '../schemas'

function Item({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
          isActive ? 'bg-leaf text-abyss font-semibold' : 'text-ivory/70 hover:bg-ivory/10 hover:text-ivory'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function AdminLayout() {
  const { state, user, logout, toast } = useAdmin()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const newEnquiries = state.enquiries.filter((e) => e.status === 'new').length

  const nav = (
    <nav className="space-y-6">
      <div>
        <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ivory/40">
          Overview
        </p>
        <div className="space-y-1">
          <Item to="/admin" end>
            Dashboard
          </Item>
          <Item to="/admin/enquiries">
            <span>Enquiries</span>
            {newEnquiries > 0 && (
              <span className="rounded-full bg-flame px-2 py-0.5 text-[0.7rem] font-semibold text-white">
                {newEnquiries}
              </span>
            )}
          </Item>
        </div>
      </div>

      <div>
        <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ivory/40">
          Content
        </p>
        <div className="space-y-1">
          {resourceOrder.map((key) => (
            <Item key={key} to={`/admin/${key}`}>
              <span>{resources[key].label}</span>
              <span className="text-xs text-ivory/35">{state[key].length}</span>
            </Item>
          ))}
        </div>
      </div>

      <div>
        <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ivory/40">
          Configuration
        </p>
        <div className="space-y-1">
          <Item to="/admin/settings">Site settings</Item>
          <Item to="/admin/account">Account</Item>
        </div>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#F4F5F2] text-ink">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto bg-abyss px-4 py-6 nav:flex">
        <div className="flex items-center gap-3 px-3 pb-8">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ivory">
            <img src="./assets/img/logo-mark.png" alt="" className="h-7 w-7 object-contain" />
          </span>
          <div>
            <p className="font-display text-lg leading-none text-ivory">ZABACCO</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.1em] text-leaf">CONTENT MANAGER</p>
          </div>
        </div>
        {nav}
        <div className="mt-auto space-y-2 pt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full rounded-lg border border-ivory/20 px-3 py-2 text-sm text-ivory/70 transition-colors hover:border-leaf hover:text-leaf"
          >
            View website
          </button>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-ivory/50 transition-colors hover:text-flame"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 nav:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-abyss/70"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-abyss px-4 py-6">
            <div className="flex items-center justify-between px-3 pb-8">
              <p className="font-display text-lg text-ivory">ZABACCO</p>
              <button type="button" onClick={() => setOpen(false)} className="text-ivory/60">
                Close
              </button>
            </div>
            <div onClick={() => setOpen(false)}>{nav}</div>
            <div className="mt-8 space-y-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full rounded-lg border border-ivory/20 px-3 py-2 text-sm text-ivory/70"
              >
                View website
              </button>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/admin/login')
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-ivory/50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="nav:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-ink/10 bg-[#F4F5F2]/95 px-5 py-4 backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/15 nav:hidden"
            aria-label="Open menu"
          >
            <span className="space-y-1">
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
            </span>
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-abyss">{user?.name}</p>
              <p className="text-xs text-ink/50">{user?.email}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-palm font-display text-ivory">
              {(user?.name || 'A').charAt(0)}
            </span>
          </div>
        </header>

        <main className="px-5 py-8 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-[60] rounded-lg px-5 py-3 text-sm font-medium shadow-lift ${
            toast.tone === 'warn' ? 'bg-flame text-white' : 'bg-palm text-ivory'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
