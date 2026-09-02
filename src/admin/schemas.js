// Every managed collection is described here. The list and form screens are
// generated from these definitions, so adding a field is a one-line change.

export const resources = {
  heroSlides: {
    key: 'heroSlides',
    label: 'Hero slides',
    singular: 'slide',
    description: 'The rotating panels at the top of the home page.',
    primary: 'title',
    secondary: 'kicker',
    image: 'image',
    fields: [
      { name: 'kicker', label: 'Kicker', type: 'text', required: true },
      { name: 'title', label: 'Headline', type: 'textarea', rows: 2, required: true },
      { name: 'body', label: 'Body copy', type: 'textarea', rows: 4, required: true },
      { name: 'tags', label: 'Tags', type: 'list', hint: 'Short labels shown as pills.' },
      { name: 'cta', label: 'Button label', type: 'text' },
      {
        name: 'ctaTo',
        label: 'Button link',
        type: 'select',
        options: ['/services', '/projects', '/approach', '/team', '/about', '/contact'],
      },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'caption', label: 'Image caption', type: 'text' },
    ],
  },

  leadership: {
    key: 'leadership',
    label: 'Leadership',
    singular: 'leader',
    description: 'The two principals shown on the home page and the team page.',
    primary: 'name',
    secondary: 'role',
    image: 'photo',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'remit', label: 'Remit', type: 'textarea', rows: 2 },
      { name: 'photo', label: 'Portrait', type: 'image' },
      { name: 'short', label: 'Short summary', type: 'textarea', rows: 3 },
      { name: 'credentials', label: 'Credentials', type: 'list' },
      { name: 'bio', label: 'Biography', type: 'paragraphs' },
      {
        name: 'message',
        label: "Chief Executive's message",
        type: 'paragraphs',
        hint: 'Only used for the CEO. Leave empty for other leaders.',
      },
    ],
  },

  team: {
    key: 'team',
    label: 'Team',
    singular: 'team member',
    description: 'Directors and specialists listed beneath the leadership.',
    primary: 'name',
    secondary: 'role',
    image: 'photo',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'remit', label: 'Remit', type: 'textarea', rows: 2 },
      { name: 'photo', label: 'Portrait', type: 'image' },
      { name: 'credentials', label: 'Credentials', type: 'list' },
      { name: 'bio', label: 'Biography', type: 'paragraphs' },
    ],
  },

  projects: {
    key: 'projects',
    label: 'Projects',
    singular: 'project',
    description: 'Completed assignments shown in the portfolio.',
    primary: 'title',
    secondary: 'client',
    image: 'cover',
    fields: [
      { name: 'title', label: 'Project title', type: 'textarea', rows: 2, required: true },
      { name: 'client', label: 'Client', type: 'text', required: true },
      { name: 'year', label: 'Year', type: 'text', required: true },
      { name: 'sector', label: 'Sector', type: 'sector', required: true },
      { name: 'service', label: 'Service delivered', type: 'text' },
      { name: 'cover', label: 'Cover image', type: 'image', hint: 'Leave empty to use the sector artwork.' },
      { name: 'featured', label: 'Feature on the home page', type: 'boolean' },
    ],
  },

  services: {
    key: 'services',
    label: 'Services',
    singular: 'service line',
    description: 'The six service lines and everything listed under each.',
    primary: 'title',
    secondary: 'short',
    fields: [
      { name: 'title', label: 'Service line', type: 'text', required: true },
      { name: 'short', label: 'Short label', type: 'text', hint: 'Used on the filter tabs.' },
      { name: 'slug', label: 'Slug', type: 'text', hint: 'Used in the page link, e.g. esia.' },
      { name: 'summary', label: 'Summary', type: 'textarea', rows: 3 },
      { name: 'items', label: 'What this covers', type: 'list' },
    ],
  },

  gallery: {
    key: 'gallery',
    label: 'Gallery',
    singular: 'photograph',
    description: 'Photographs shown on the home page and the gallery page.',
    primary: 'caption',
    image: 'src',
    fields: [
      { name: 'src', label: 'Photograph', type: 'image', required: true },
      { name: 'caption', label: 'Caption', type: 'textarea', rows: 2, required: true },
    ],
  },

  approach: {
    key: 'approach',
    label: 'Approach',
    singular: 'stage',
    description: 'The stages that make up how an assignment runs.',
    primary: 'step',
    secondary: 'title',
    fields: [
      { name: 'step', label: 'Stage name', type: 'text', required: true },
      { name: 'title', label: 'Headline', type: 'textarea', rows: 2, required: true },
      { name: 'body', label: 'Description', type: 'textarea', rows: 5 },
    ],
  },

  faqs: {
    key: 'faqs',
    label: 'FAQs',
    singular: 'question',
    description: 'Questions shown on the home page and the services page.',
    primary: 'q',
    fields: [
      { name: 'q', label: 'Question', type: 'textarea', rows: 2, required: true },
      { name: 'a', label: 'Answer', type: 'textarea', rows: 6, required: true },
    ],
  },

  values: {
    key: 'values',
    label: 'Values',
    singular: 'value',
    description: 'The commitments listed on the about and approach pages.',
    primary: 'name',
    fields: [
      { name: 'name', label: 'Value', type: 'text', required: true },
      { name: 'body', label: 'Description', type: 'textarea', rows: 3 },
    ],
  },

  differentiators: {
    key: 'differentiators',
    label: 'Why clients choose us',
    singular: 'reason',
    description: 'Reasons shown on the home page.',
    primary: 'title',
    fields: [
      { name: 'title', label: 'Reason', type: 'text', required: true },
      { name: 'body', label: 'Description', type: 'textarea', rows: 3 },
    ],
  },

  partners: {
    key: 'partners',
    label: 'Partners',
    singular: 'partner',
    description: 'Institutions named in the partners ticker.',
    primary: 'name',
    fields: [{ name: 'name', label: 'Institution', type: 'text', required: true }],
  },

  stats: {
    key: 'stats',
    label: 'Key figures',
    singular: 'figure',
    description: 'The four figures under the hero.',
    primary: 'value',
    secondary: 'label',
    fields: [
      { name: 'value', label: 'Figure', type: 'text', required: true },
      { name: 'label', label: 'Description', type: 'textarea', rows: 2, required: true },
    ],
  },

  sectors: {
    key: 'sectors',
    label: 'Sectors',
    singular: 'sector',
    description: 'Sectors used across the site and to categorise projects.',
    primary: 'name',
    fields: [{ name: 'name', label: 'Sector', type: 'text', required: true }],
  },
}

export const resourceOrder = [
  'heroSlides',
  'leadership',
  'team',
  'projects',
  'services',
  'gallery',
  'approach',
  'faqs',
  'values',
  'differentiators',
  'partners',
  'stats',
  'sectors',
]

export const emptyRecord = (resource) => {
  const record = {}
  resource.fields.forEach((f) => {
    if (f.type === 'list' || f.type === 'paragraphs') record[f.name] = []
    else if (f.type === 'boolean') record[f.name] = false
    else record[f.name] = ''
  })
  record.published = true
  return record
}
