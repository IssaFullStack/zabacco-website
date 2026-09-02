import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sorted, useAdmin } from '../store'
import { emptyRecord, resources } from '../schemas'
import { Field } from '../components/Field'

const btn = {
  primary:
    'rounded-lg bg-palm px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-abyss',
  ghost:
    'rounded-lg border border-ink/15 px-4 py-2.5 text-sm text-ink/65 transition-colors hover:border-palm hover:text-palm',
  danger:
    'rounded-lg border border-flame/40 px-4 py-2.5 text-sm text-flame transition-colors hover:bg-flame hover:text-white',
}

function preview(row, key) {
  const v = row[key]
  if (Array.isArray(v)) return v[0] || ''
  return v || ''
}

export function ResourceList() {
  const { key } = useParams()
  const resource = resources[key]
  const { state, remove, move, update } = useAdmin()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [confirming, setConfirming] = useState(null)

  const rows = useMemo(() => {
    const all = sorted(state[key] || [])
    if (!query.trim()) return all
    const q = query.toLowerCase()
    return all.filter((r) =>
      JSON.stringify(r).toLowerCase().includes(q)
    )
  }, [state, key, query])

  if (!resource) return <p>Unknown section.</p>

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-abyss">{resource.label}</h1>
          <p className="mt-2 max-w-xl text-sm text-ink/60">{resource.description}</p>
        </div>
        <button
          type="button"
          className={btn.primary}
          onClick={() => navigate(`/admin/${key}/new`)}
        >
          Add {resource.singular}
        </button>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${resource.label.toLowerCase()}…`}
          className="w-full max-w-xs rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:border-palm focus:outline-none sm:w-auto"
        />
        <span className="text-sm text-ink/50">
          {rows.length} of {(state[key] || []).length}
        </span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {rows.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-ink/50">
            Nothing here yet. Add your first {resource.singular}.
          </p>
        )}

        <ul className="divide-y divide-ink/8">
          {rows.map((row, i) => (
            <li key={row.id} className="flex flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
              {resource.image && (
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#F4F5F2]">
                  {row[resource.image] ? (
                    <img src={row[resource.image]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[0.6rem] text-ink/35">None</span>
                  )}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-abyss">
                  {preview(row, resource.primary) || 'Untitled'}
                </p>
                {resource.secondary && (
                  <p className="truncate text-sm text-ink/55">{preview(row, resource.secondary)}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => update(key, row.id, { published: !row.published })}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  row.published
                    ? 'bg-palm/12 text-palm hover:bg-palm/20'
                    : 'bg-ink/8 text-ink/50 hover:bg-ink/15'
                }`}
              >
                {row.published ? 'Published' : 'Hidden'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(key, row.id, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="grid h-8 w-8 place-items-center rounded-md border border-ink/12 text-ink/50 transition-colors hover:border-palm hover:text-palm disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(key, row.id, 1)}
                  disabled={i === rows.length - 1}
                  aria-label="Move down"
                  className="grid h-8 w-8 place-items-center rounded-md border border-ink/12 text-ink/50 transition-colors hover:border-palm hover:text-palm disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/admin/${key}/${row.id}`)}
                  className="rounded-lg border border-ink/15 px-3.5 py-2 text-sm text-ink/65 transition-colors hover:border-palm hover:text-palm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(row)}
                  className="rounded-lg px-3 py-2 text-sm text-ink/40 transition-colors hover:text-flame"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-abyss/60 px-5">
          <div className="w-full max-w-md rounded-xl bg-white p-7 shadow-lift">
            <h2 className="font-display text-2xl text-abyss">Delete this {resource.singular}?</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              “{preview(confirming, resource.primary)}” will be removed. This cannot be undone.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <button type="button" className={btn.ghost} onClick={() => setConfirming(null)}>
                Cancel
              </button>
              <button
                type="button"
                className={btn.danger}
                onClick={() => {
                  remove(key, confirming.id)
                  setConfirming(null)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ResourceForm() {
  const { key, id } = useParams()
  const resource = resources[key]
  const { state, create, update } = useAdmin()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const existing = isNew ? null : (state[key] || []).find((r) => String(r.id) === String(id))
  const [draft, setDraft] = useState(() => existing || emptyRecord(resource))
  const [errors, setErrors] = useState({})

  if (!resource) return <p>Unknown section.</p>
  if (!isNew && !existing) return <p>That record no longer exists.</p>

  const set = (name, value) => setDraft((d) => ({ ...d, [name]: value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    resource.fields.forEach((f) => {
      if (f.required && !String(draft[f.name] || '').trim()) next[f.name] = 'Required'
    })
    setErrors(next)
    if (Object.keys(next).length) return

    if (isNew) create(key, draft)
    else update(key, existing.id, draft)
    navigate(`/admin/${key}`)
  }

  return (
    <div className="max-w-3xl">
      <button
        type="button"
        onClick={() => navigate(`/admin/${key}`)}
        className="text-sm text-ink/55 transition-colors hover:text-palm"
      >
        ← Back to {resource.label.toLowerCase()}
      </button>

      <h1 className="mt-4 font-display text-3xl text-abyss">
        {isNew ? `New ${resource.singular}` : `Edit ${resource.singular}`}
      </h1>

      <form onSubmit={submit} className="mt-8 space-y-7 rounded-xl border border-ink/10 bg-white p-6 sm:p-8">
        {resource.fields.map((f) => (
          <div key={f.name}>
            <Field field={f} value={draft[f.name]} onChange={(v) => set(f.name, v)} />
            {errors[f.name] && <p className="mt-1.5 text-sm text-flame">{errors[f.name]}</p>}
          </div>
        ))}

        <label className="flex cursor-pointer items-center gap-3 border-t border-ink/10 pt-6">
          <input
            type="checkbox"
            checked={draft.published !== false}
            onChange={(e) => set('published', e.target.checked)}
            className="h-4 w-4 accent-[#00703A]"
          />
          <span className="text-sm text-abyss">Show this on the website</span>
        </label>

        <div className="flex flex-wrap gap-3 border-t border-ink/10 pt-6">
          <button type="submit" className={btn.primary}>
            {isNew ? `Create ${resource.singular}` : 'Save changes'}
          </button>
          <button type="button" className={btn.ghost} onClick={() => navigate(`/admin/${key}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
