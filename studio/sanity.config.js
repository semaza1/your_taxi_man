import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Read project ID and dataset from environment variables.
// Fallback values prevent the Studio from crashing during initial local inspection.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'your-taxi-man-studio',
  title: 'Your Taxi Man — Content Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Journal Posts')
              .schemaType('post')
              .child(
                S.documentTypeList('post')
                  .title('Journal Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            // Pass through any future schema types
            ...S.documentTypeListItems().filter(
              (listItem) => !['post'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
