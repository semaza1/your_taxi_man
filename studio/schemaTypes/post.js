import { defineType, defineField } from 'sanity'

/**
 * Post Document Schema
 * 
 * Supports Journal/Blog posts with full draft & published workflow.
 * Draft and published states are natively handled by Sanity's document pipeline;
 * no redundant custom status field is needed.
 */
export const postType = defineType({
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The headline for this journal entry, travel guide, or story.',
      validation: (rule) => rule.required().error('A post title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly slug automatically generated from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('A slug is required for URL navigation.'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main photography displayed in the article header, journal feed card, and social shares.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Required for accessibility and SEO. Describe the scene or subjects in the photo.',
          validation: (rule) =>
            rule.custom((alt, context) => {
              // Ensure alt text is provided whenever an image is uploaded
              if (context.parent?.asset && (!alt || alt.trim() === '')) {
                return 'Alternative text is required when a cover image is uploaded.'
              }
              return true
            }),
        }),
        defineField({
          name: 'caption',
          title: 'Caption / Location Credit',
          type: 'string',
          description: 'Optional brief context or photographer credit (e.g., "Volcanoes National Park, Northern Province").',
        }),
      ],
      validation: (rule) => rule.required().error('A cover image is required for journal posts.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt / Caption',
      type: 'text',
      rows: 3,
      description: 'A brief 1-2 sentence preview summary shown in cards, previews, and SEO meta descriptions.',
      validation: (rule) =>
        rule
          .required()
          .max(260)
          .warning('Keep excerpts under 260 characters for optimal display on mobile cards.'),
    }),
    defineField({
      name: 'body',
      title: 'Rich-Text Body',
      type: 'array',
      description: 'The main article body supporting paragraphs, headings, lists, quotes, links, and inline photography.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'External URL (https://) or internal route (/book, /)',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Required for accessibility and SEO.',
              validation: (rule) =>
                rule.custom((alt, context) => {
                  if (context.parent?.asset && (!alt || alt.trim() === '')) {
                    return 'Alternative text is required for embedded images.'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional explanatory caption displayed beneath the inline photo.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Select the primary content topic matching Your Taxi Man services and stories.',
      options: {
        list: [
          { title: 'Rwanda Travel & Tourism', value: 'rwanda-travel' },
          { title: 'Airport Transfers & Kigali Mobility', value: 'airport-mobility' },
          { title: 'Chauffeur Stories & Field Updates', value: 'chauffeur-stories' },
          { title: 'Travel Guides & Road Tips', value: 'travel-tips' },
          { title: 'Corporate & Conference Transport', value: 'corporate-mobility' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Please select a category.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'The date and time this journal entry is marked as published.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('A publication date is required.'),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Original Instagram Post URL',
      type: 'url',
      description: 'Optional link to the original post on Instagram (@your_taxi_man).',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Highlight this entry at the top of the Journal showcase or in featured highlights.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
      date: 'publishedAt',
      featured: 'featured',
    },
    prepare({ title, category, media, date, featured }) {
      const categoryLabels = {
        'rwanda-travel': 'Rwanda Travel & Tourism',
        'airport-mobility': 'Airport & Kigali Mobility',
        'chauffeur-stories': 'Chauffeur Stories',
        'travel-tips': 'Travel Guides & Tips',
        'corporate-mobility': 'Corporate Transport',
      }
      const categoryName = (category && categoryLabels[category]) || category || 'Uncategorized'
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Draft'
      const star = featured ? '★ ' : ''
      return {
        title: `${star}${title || 'Untitled Post'}`,
        subtitle: `${categoryName} • ${formattedDate}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Publication Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
