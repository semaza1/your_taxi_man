import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, Sparkles, AlertCircle, RefreshCw, Bookmark } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import InstagramIcon from './InstagramIcon'
import { fetchPublishedPosts, urlFor } from '../lib/sanity'
import { POSTS_QUERY } from '../lib/queries'

const CATEGORY_LABELS = {
  'rwanda-travel': 'Rwanda Travel & Tourism',
  'airport-mobility': 'Airport & City Mobility',
  'chauffeur-stories': 'Chauffeur Stories',
  'travel-tips': 'Travel Guides & Road Tips',
  'corporate-mobility': 'Corporate Transport',
}

function getCategoryLabel(category) {
  if (!category) return 'Field Story'
  return CATEGORY_LABELS[category] || category
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function resolveImageUrl(coverImage) {
  if (!coverImage) return null
  // If asset URL was dereferenced by GROQ query
  if (coverImage.asset?.url) {
    return coverImage.asset.url
  }
  // Otherwise use Sanity image URL builder
  try {
    const built = urlFor(coverImage)?.width(1200)?.auto('format')?.url()
    if (built) return built
  } catch {
    // Graceful fallback
  }
  return null
}

export default function JournalPage({ onNavigate }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const loadPosts = () => {
    setLoading(true)
    setError(null)
    fetchPublishedPosts(POSTS_QUERY)
      .then((data) => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching journal posts from Sanity:', err)
        setError('Unable to load journal stories at this time. Please check your connection or try again.')
        setLoading(false)
      })
  }

  useEffect(() => {
    let isMounted = true

    fetchPublishedPosts(POSTS_QUERY)
      .then((data) => {
        if (isMounted) {
          setPosts(Array.isArray(data) ? data : [])
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error fetching journal posts from Sanity:', err)
          setError('Unable to load journal stories at this time. Please check your connection or try again.')
          setLoading(false)
        }
      })


    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => {
      isMounted = false
    }
  }, [])

  // Extract unique categories for filter pills
  const availableCategories = ['all', ...new Set(posts.map((p) => p.category).filter(Boolean))]

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === selectedCategory)

  // Featured post: find first featured post, or fallback to first post if filtered
  const featuredPost = filteredPosts.find((p) => p.featured)
  const remainingPosts = featuredPost
    ? filteredPosts.filter((p) => p._id !== featuredPost._id)
    : filteredPosts

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-taxi-yellow selection:text-black antialiased overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <Navbar currentPath="/journal" onNavigate={onNavigate} />

      <main className="flex-1">
        
        {/* Compact Page Header: "Stories from the Road" */}
        <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-stone-800/80 overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-taxi-yellow/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
            <div className="max-w-3xl space-y-4">
              
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5">
                <span className="w-8 sm:w-10 h-[2.5px] bg-taxi-yellow inline-block rounded-full shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-taxi-yellow">
                  Journal &amp; Dispatches
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Stories from the Road
              </h1>

              {/* Short Introduction */}
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                Curated travel notes, route guides, and chauffeur dispatches exploring Rwanda’s scenic northern corridors, Kigali airport arrivals, and bespoke tourism journeys.
              </p>
            </div>

            {/* Category Filter Pills (displayed when multiple categories exist) */}
            {!loading && !error && availableCategories.length > 2 && (
              <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableCategories.map((catKey) => {
                  const isSelected = selectedCategory === catKey
                  const label = catKey === 'all' ? 'All Stories' : getCategoryLabel(catKey)
                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => setSelectedCategory(catKey)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
                        isSelected
                          ? 'bg-taxi-yellow text-stone-950 shadow-md'
                          : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* LOADING STATE */}
          {loading && (
            <div className="space-y-8">
              {/* Featured Skeleton */}
              <div className="rounded-2xl bg-stone-900/50 border border-stone-800/80 p-6 sm:p-8 animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 aspect-[16/10] bg-stone-800/60 rounded-xl" />
                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <div className="h-4 w-28 bg-stone-800 rounded-md" />
                  <div className="h-8 w-4/5 bg-stone-800 rounded-md" />
                  <div className="h-4 w-full bg-stone-800 rounded-md" />
                  <div className="h-4 w-2/3 bg-stone-800 rounded-md" />
                  <div className="h-4 w-32 bg-stone-800 rounded-md pt-4" />
                </div>
              </div>

              {/* Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-2xl bg-stone-900/50 border border-stone-800/80 p-5 space-y-4 animate-pulse">
                    <div className="aspect-[16/10] bg-stone-800/60 rounded-xl" />
                    <div className="h-3 w-24 bg-stone-800 rounded" />
                    <div className="h-5 w-3/4 bg-stone-800 rounded" />
                    <div className="h-3 w-full bg-stone-800 rounded" />
                    <div className="h-3 w-2/3 bg-stone-800 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="max-w-lg mx-auto py-16 px-6 bg-stone-900/60 border border-stone-800 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-taxi-yellow border border-taxi-yellow/20 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Connection Notice</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                {error}
              </p>
              <button
                type="button"
                onClick={loadPosts}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors min-h-[42px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Loading</span>
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="max-w-md mx-auto py-20 px-6 bg-stone-900/40 border border-stone-800/80 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-800/80 text-taxi-yellow border border-stone-700 mx-auto flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">No Stories Published Yet</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Our chauffeur team is preparing new travel itineraries and scenic route dispatches. Check back soon or reserve your private ride now.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/book')}
                  className="px-5 py-2.5 rounded-full bg-taxi-yellow hover:bg-taxi-yellowHover text-stone-950 text-xs font-bold shadow-md transition-all min-h-[42px]"
                >
                  Book a Ride
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/')}
                  className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-all min-h-[42px]"
                >
                  Return Home
                </button>
              </div>
            </div>
          )}

          {/* LOADED CONTENT: POSTS */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="space-y-12">
              
              {/* FEATURED STORY HERO (Subtle, high-contrast travel treatment) */}
              {featuredPost && (
                <article
                  className="group relative rounded-2xl bg-stone-900/80 border border-taxi-yellow/30 hover:border-taxi-yellow/60 transition-all duration-300 overflow-hidden shadow-xl"
                >
                  <a
                    href={`/journal/${featuredPost.slug || ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      if (onNavigate && featuredPost.slug) {
                        onNavigate(`/journal/${featuredPost.slug}`)
                      }
                    }}
                    className="block p-5 sm:p-7 lg:p-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                      
                      {/* Featured Media */}
                      <div className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 shrink-0">
                        {resolveImageUrl(featuredPost.coverImage) ? (
                          <img
                            src={resolveImageUrl(featuredPost.coverImage)}
                            alt={featuredPost.coverImage?.alt || featuredPost.title || 'Journal featured story'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="eager"
                          />
                        ) : (
                          <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500 text-xs">
                            No Cover Image
                          </div>
                        )}

                        {/* Category overlay badge */}
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-stone-950/90 text-taxi-yellow border border-taxi-yellow/30 backdrop-blur-md">
                            {getCategoryLabel(featuredPost.category)}
                          </span>
                        </div>

                        {/* Subtle featured pill */}
                        <div className="absolute top-3.5 right-3.5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-taxi-yellow text-stone-950 shadow-md">
                            <Sparkles className="w-3 h-3" />
                            <span>Featured Story</span>
                          </span>
                        </div>
                      </div>

                      {/* Featured Story Details */}
                      <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-4">
                        
                        {/* Date & Metadata */}
                        <div className="flex items-center gap-3 text-xs text-stone-400">
                          {featuredPost.publishedAt && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-taxi-yellow" />
                              <time dateTime={featuredPost.publishedAt}>
                                {formatDate(featuredPost.publishedAt)}
                              </time>
                            </div>
                          )}
                          {featuredPost.instagramUrl && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-white">
                              <InstagramIcon className="w-3 h-3 text-stone-400" />
                              <span>@your_taxi_man</span>
                            </span>
                          )}
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-taxi-yellow transition-colors tracking-tight leading-snug">
                          {featuredPost.title}
                        </h2>

                        {/* Excerpt */}
                        {featuredPost.excerpt && (
                          <p className="text-sm text-stone-300 leading-relaxed line-clamp-3 sm:line-clamp-4">
                            {featuredPost.excerpt}
                          </p>
                        )}

                        {/* Action link */}
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-taxi-yellow group-hover:text-taxi-yellowHover transition-colors">
                            <span>Read Full Story</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>

                    </div>
                  </a>
                </article>
              )}

              {/* POSTS GRID */}
              {remainingPosts.length > 0 && (
                <div className="space-y-6">
                  {featuredPost && (
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        More Dispatches
                      </h3>
                      <span className="text-xs text-stone-400">
                        {remainingPosts.length} {remainingPosts.length === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {remainingPosts.map((post) => {
                      const imageUrl = resolveImageUrl(post.coverImage)
                      return (
                        <article
                          key={post._id}
                          className="group rounded-2xl bg-stone-900/70 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all duration-300 overflow-hidden flex flex-col text-left shadow-md hover:shadow-xl"
                        >
                          <a
                            href={`/journal/${post.slug || ''}`}
                            onClick={(e) => {
                              e.preventDefault()
                              if (onNavigate && post.slug) {
                                onNavigate(`/journal/${post.slug}`)
                              }
                            }}
                            className="flex flex-col h-full"
                          >
                            {/* Card Media */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 shrink-0">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={post.coverImage?.alt || post.title || 'Journal post'}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500 text-xs">
                                  No Cover Image
                                </div>
                              )}

                              {/* Category badge */}
                              <div className="absolute top-3 left-3">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-stone-950/85 text-taxi-yellow border border-stone-800 backdrop-blur-xs">
                                  {getCategoryLabel(post.category)}
                                </span>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-2.5">
                                {/* Date */}
                                {post.publishedAt && (
                                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                                    <Calendar className="w-3 h-3 text-taxi-yellow" />
                                    <time dateTime={post.publishedAt}>
                                      {formatDate(post.publishedAt)}
                                    </time>
                                  </div>
                                )}

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white group-hover:text-taxi-yellow transition-colors line-clamp-2 leading-snug">
                                  {post.title}
                                </h3>

                                {/* Excerpt */}
                                {post.excerpt && (
                                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                  </p>
                                )}
                              </div>

                              {/* Bottom link */}
                              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-taxi-yellow">
                                <span>Read Story</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </a>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

        </section>

        {/* Chauffeur Travel Booking CTA Banner */}
        <section className="bg-stone-900 border-t border-b border-stone-800 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-taxi-yellow bg-taxi-yellow/10 border border-taxi-yellow/20">
              Private Transportation • Rwanda
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Explore Rwanda in Comfort?
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
              Whether you need a prompt airport pickup at Kigali International Airport (KGL), executive city mobility, or a custom scenic journey to Volcanoes National Park and Lake Kivu, Your Taxi Man is ready.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/book')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-stone-950 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md transition-all active:scale-95 min-h-[44px]"
              >
                <span>Book a Ride Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 transition-colors min-h-[44px]"
              >
                <span>View All Services</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Sleek Dark Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
