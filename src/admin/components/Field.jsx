import { useAdmin } from '../store'

export const input =
  'w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-abyss placeholder:text-ink/35 focus:border-palm focus:outline-none focus:ring-2 focus:ring-palm/15'

export function Label({ children, hint }) {
  return (
    <div className="mb-2">
      <label className="text-sm font-medium text-abyss">{children}</label>
      {hint && <p className="mt-0.5 text-xs text-ink/50">{hint}</p>}
    </div>
  )
}

/** Repeating single-line values, e.g. credentials or tags. */
function ListField({ value = [], onChange, placeholder }) {
  const rows = Array.isArray(value) ? value : []
  const set = (i, v) => onChange(rows.map((r, idx) => (idx === i ? v : r)))
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={input}
            value={row}
            placeholder={placeholder}
            onChange={(e) => set(i, e.target.value)}
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            className="shrink-0 rounded-lg border border-ink/15 px-3 text-sm text-ink/50 transition-colors hover:border-flame hover:text-flame"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, ''])}
        className="rounded-lg border border-dashed border-ink/25 px-3.5 py-2 text-sm text-palm transition-colors hover:border-palm"
      >
        Add item
      </button>
    </div>
  )
}

/** Multi-paragraph body copy, each paragraph editable on its own. */
function ParagraphsField({ value = [], onChange }) {
  const rows = Array.isArray(value) ? value : []
  const set = (i, v) => onChange(rows.map((r, idx) => (idx === i ? v : r)))
  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i}>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-ink/45">Paragraph {i + 1}</span>
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
              className="text-xs text-ink/45 transition-colors hover:text-flame"
            >
              Remove
            </button>
          </div>
          <textarea rows={4} className={input} value={row} onChange={(e) => set(i, e.target.value)} />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, ''])}
        className="rounded-lg border border-dashed border-ink/25 px-3.5 py-2 text-sm text-palm transition-colors hover:border-palm"
      >
        Add paragraph
      </button>
    </div>
  )
}

/**
 * Image field. In the live panel this opens a Cloudinary upload widget and
 * stores the returned secure URL. Here it accepts a URL and previews it.
 */
function ImageField({ value, onChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink/15 bg-white">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="px-2 text-center text-xs text-ink/35">No image</span>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <input
          className={input}
          value={value || ''}
          placeholder="https://res.cloudinary.com/..."
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled
            title="Connects to Cloudinary once the backend is live"
            className="cursor-not-allowed rounded-lg border border-dashed border-ink/25 px-3.5 py-2 text-sm text-ink/40"
          >
            Upload to Cloudinary
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-lg border border-ink/15 px-3.5 py-2 text-sm text-ink/55 transition-colors hover:border-flame hover:text-flame"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-xs text-ink/45">
          Upload is disabled in the demo. Paste an image path or URL to preview it.
        </p>
      </div>
    </div>
  )
}

export function Field({ field, value, onChange }) {
  const { state } = useAdmin()

  if (field.type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-ink/15 bg-white px-4 py-3">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[#00703A]"
        />
        <span className="text-sm text-abyss">{field.label}</span>
      </label>
    )
  }

  return (
    <div>
      <Label hint={field.hint}>
        {field.label}
        {field.required && <span className="ml-1 text-flame">*</span>}
      </Label>

      {field.type === 'textarea' && (
        <textarea
          rows={field.rows || 3}
          className={input}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === 'text' && (
        <input className={input} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}

      {field.type === 'select' && (
        <select className={input} value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose…</option>
          {field.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}

      {field.type === 'sector' && (
        <select className={input} value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose a sector…</option>
          {state.sectors.map((s) => (
            <option key={s.id}>{s.name}</option>
          ))}
        </select>
      )}

      {field.type === 'list' && <ListField value={value} onChange={onChange} />}
      {field.type === 'paragraphs' && <ParagraphsField value={value} onChange={onChange} />}
      {field.type === 'image' && <ImageField value={value} onChange={onChange} />}
    </div>
  )
}
