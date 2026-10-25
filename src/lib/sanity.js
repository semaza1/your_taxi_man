import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

/**
 * Public Sanity Client for reading published Journal posts.
 * 
 * Security & Publishing Workflow:
 * - Draft and unpublished content are not exposed by the public CDN client.
 * - No write tokens or credentials are included; read-only public access only.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'xvnuzc0o'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensures immediate updates and avoids CDN caching delay
})

const builder = createImageUrlBuilder(sanityClient)

/**
 * Helper to build optimized image URLs from Sanity image assets.
 * Usage: urlFor(post.coverImage)?.width(800)?.auto('format')?.url()
 * 
 * @param {object} source - Sanity image object or asset reference
 * @returns {object|null} Image URL builder instance or null
 */
export function urlFor(source) {
  if (!source) return null
  // Handles dereferenced asset object ({ asset: { _id, url } }) or reference ({ asset: { _ref } })
  if (!source.asset) return null
  return builder.image(source)
}

/**
 * Fetch published posts using sanityClient, with a local dev proxy fallback
 * if browser CORS restrictions apply before CORS origins are added in Sanity Manage.
 * 
 * @param {string} query - GROQ query string
 * @returns {Promise<Array>} Array of post documents
 */
export async function fetchPublishedPosts(query) {
  try {
    return await sanityClient.fetch(query)
  } catch (err) {
    if (import.meta.env.DEV) {
      try {
        const encodedQuery = encodeURIComponent(query)
        const res = await fetch(`/api-sanity/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`)
        if (res.ok) {
          const json = await res.json()
          return json.result || []
        }
      } catch (proxyErr) {
        console.error('Dev proxy fallback failed:', proxyErr)
      }
    }
    throw err
  }
}

/**
 * Fetch a single published post by slug.
 * 
 * @param {string} slug - The post slug string
 * @returns {Promise<object|null>} The post document or null
 */
export async function fetchPostBySlug(slug) {
  const cleanSlug = encodeURIComponent(slug)
  const query = `*[_type == "post" && slug.current == "${cleanSlug}"][0] {
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
  try {
    return await sanityClient.fetch(query)
  } catch (err) {
    if (import.meta.env.DEV) {
      try {
        const encodedQuery = encodeURIComponent(query)
        const res = await fetch(`/api-sanity/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`)
        if (res.ok) {
          const json = await res.json()
          return json.result || null
        }
      } catch (proxyErr) {
        console.error('Dev proxy fallback failed:', proxyErr)
      }
    }
    throw err
  }
}

/**
 * Fetch other recent published posts excluding current slug.
 * 
 * @param {string} currentSlug - Current post slug to exclude
 * @returns {Promise<Array>} Up to 3 related or recent posts
 */
export async function fetchOtherPosts(currentSlug) {
  const cleanSlug = encodeURIComponent(currentSlug)
  const query = `*[_type == "post" && slug.current != "${cleanSlug}" && defined(slug.current)] | order(publishedAt desc)[0...3] {
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
    publishedAt
  }`
  try {
    return await sanityClient.fetch(query)
  } catch {
    if (import.meta.env.DEV) {
      try {
        const encodedQuery = encodeURIComponent(query)
        const res = await fetch(`/api-sanity/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`)
        if (res.ok) {
          const json = await res.json()
          return json.result || []
        }
      } catch (proxyErr) {
        console.error('Dev proxy fallback failed:', proxyErr)
      }
    }
    return []
  }
}



