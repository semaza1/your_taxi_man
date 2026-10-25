/**
 * GROQ queries for the upcoming Journal/Posts page.
 * 
 * Sanity Publishing Workflow:
 * Queries executed against the public CDN client automatically fetch only published
 * documents. Drafts are safely excluded without needing any custom status field.
 */

// Fetch all published journal posts ordered chronologically (newest first)
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  coverImage {
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  excerpt,
  category,
  publishedAt,
  featured,
  instagramUrl
}`

// Fetch only featured posts (for hero highlights or banner cards)
export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  coverImage {
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  excerpt,
  category,
  publishedAt,
  featured,
  instagramUrl
}`

// Fetch a single journal post by slug (includes full Portable Text rich-text body)
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  coverImage {
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  excerpt,
  body,
  category,
  publishedAt,
  featured,
  instagramUrl
}`
