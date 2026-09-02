import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEMO_CREDENTIALS, loadState, resetState, saveState } from './mockData'

const AdminContext = createContext(null)
const AUTH_KEY = 'zabacco.admin.auth.v1'

export function AdminProvider({ children }) {
  const [state, setState] = useState(() => loadState())
  const [user, setUser] = useState(() => {
    try {
      const raw = window.localStorage.getItem(AUTH_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  const notify = useCallback((message, tone = 'success') => {
    setToast({ message, tone, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const login = useCallback(
    (email, password) => {
      const ok =
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      if (!ok) return { ok: false, error: 'Those credentials do not match our records.' }
      const session = { email: DEMO_CREDENTIALS.email, name: state.account.name }
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(session))
      setUser(session)
      return { ok: true }
    },
    [state.account.name]
  )

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY)
    setUser(null)
  }, [])

  // ---- collection helpers -------------------------------------------------

  const nextId = (rows) => (rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1)

  const create = useCallback(
    (key, record) => {
      setState((prev) => {
        const rows = prev[key]
        const row = { ...record, id: nextId(rows), order: rows.length + 1 }
        return { ...prev, [key]: [...rows, row] }
      })
      notify('Record created.')
    },
    [notify]
  )

  const update = useCallback(
    (key, id, patch) => {
      setState((prev) => ({
        ...prev,
        [key]: prev[key].map((r) => (r.id === id ? { ...r, ...patch } : r)),
      }))
      notify('Changes saved.')
    },
    [notify]
  )

  const remove = useCallback(
    (key, id) => {
      setState((prev) => ({ ...prev, [key]: prev[key].filter((r) => r.id !== id) }))
      notify('Record deleted.', 'warn')
    },
    [notify]
  )

  const move = useCallback((key, id, direction) => {
    setState((prev) => {
      const rows = [...prev[key]].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      const i = rows.findIndex((r) => r.id === id)
      const j = i + direction
      if (i < 0 || j < 0 || j >= rows.length) return prev
      ;[rows[i], rows[j]] = [rows[j], rows[i]]
      return { ...prev, [key]: rows.map((r, idx) => ({ ...r, order: idx + 1 })) }
    })
  }, [])

  const updateSettings = useCallback(
    (patch) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }))
      notify('Settings saved.')
    },
    [notify]
  )

  const setEnquiryStatus = useCallback((id, status) => {
    setState((prev) => ({
      ...prev,
      enquiries: prev.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
    }))
  }, [])

  const reset = useCallback(() => {
    setState(resetState())
    notify('Demo data restored.')
  }, [notify])

  const value = useMemo(
    () => ({
      state,
      user,
      toast,
      login,
      logout,
      create,
      update,
      remove,
      move,
      updateSettings,
      setEnquiryStatus,
      reset,
      notify,
    }),
    [
      state,
      user,
      toast,
      login,
      logout,
      create,
      update,
      remove,
      move,
      updateSettings,
      setEnquiryStatus,
      reset,
      notify,
    ]
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}

export const sorted = (rows) => [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
