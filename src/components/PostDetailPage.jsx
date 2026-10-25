import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Car,
  MessageSquare,
  Share2,
  Check
} from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Navbar from './Navbar'
import Footer from './Footer'
import InstagramIcon from './InstagramIcon'
import { fetchPostBySlug, fetchOtherPosts, urlFor } from '../lib/sanity'
import { BUSINESS_CONFIG } from '../config/business'

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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function resolveCoverUrl(coverImage) {
  if (!coverImage) return null
  if (coverImage.asset?.url) return coverImage.asset.url
  try {
    const built = urlFor(coverImage)?.width(1400)?.auto('format')?.url()
    if (built) return built
  } catch {
    // Graceful fallback
  }
  return null
}

export default function PostDetailPage({ slug, onNavigate }) {
  const [post, setPost] = useState(null)
  const [otherPosts, setOtherPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let isMounted = true

    Promise.all([
      fetchPostBySlug(slug),
      fetchOtherPosts(slug),
    ])
      .then(([postData, othersData]) => {
        if (!isMounted) return
        if (!postData) {
          setError('The requested story could not be found.')
        } else {
          setPost(postData)
          setOtherPosts(Array.isArray(othersData) ? othersData : [])
        }
        setLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Error fetching post details:', err)
        setError('Unable to load story details at this time. Please check your connection.')
        setLoading(false)
      })

    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => {
      isMounted = false
    }
  }, [slug])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'Your Taxi Man Journal',
        text: post?.excerpt || 'Story from Your Taxi Man Rwanda',
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // Portable Text custom rendering components
  const portableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight leading-snug">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl sm:text-2xl font-bold text-stone-100 mt-8 mb-3 tracking-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-bold text-stone-200 mt-6 mb-2">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-6 font-normal">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-taxi-yellow pl-5 py-3 my-8 italic text-stone-200 bg-stone-900/60 rounded-r-xl text-base sm:text-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-outside pl-6 space-y-2 mb-6 text-stone-300 text-base sm:text-lg">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-stone-300 text-base sm:text-lg">
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      em: ({ children }) => <em className="italic text-stone-200">{children}</em>,
      underline: ({ children }) => <u className="underline decoration-taxi-yellow">{children}</u>,
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a
            href={value?.href}
            target={target}
            rel={target ? 'noopener noreferrer' : undefined}
            className="text-taxi-yellow hover:text-taxi-yellowHover underline font-medium transition-colors"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({ value }) => {
        const imageUrl = resolveCoverUrl(value)
        if (!imageUrl) return null
        return (
          <figure className="my-10">
            <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-xl">
              <img
                src={imageUrl}
                alt={value.alt || 'Inline article photo'}
                className="w-full object-cover max-h-[550px]"
                loading="lazy"
              />
            </div>
            {value.caption && (
              <figcaption className="text-xs sm:text-sm text-stone-400 mt-2.5 text-center italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  const coverUrl = post ? resolveCoverUrl(post.coverImage) : null

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-taxi-yellow selection:text-black antialiased overflow-x-hidden">
      
      {/* Top Editorial Navbar */}
      <Navbar currentPath="/journal" onNavigate={onNavigate} />

      <main className="flex-1">
        
        {/* LOADING STATE */}
        {loading && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 animate-pulse space-y-8">
            <div className="h-4 w-32 bg-stone-800 rounded" />
            <div className="h-10 w-4/5 bg-stone-800 rounded" />
            <div className="h-4 w-48 bg-stone-800 rounded" />
            <div className="aspect-[16/9] w-full bg-stone-800/60 rounded-2xl" />
            <div className="space-y-4 pt-6">
              <div className="h-4 w-full bg-stone-800 rounded" />
              <div className="h-4 w-full bg-stone-800 rounded" />
              <div className="h-4 w-3/4 bg-stone-800 rounded" />
            </div>
          </div>
        )}

        {/* ERROR / 404 STATE */}
        {!loading && error && (
          <div className="max-w-xl mx-auto px-4 pt-36 pb-24 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-taxi-yellow border border-taxi-yellow/20 mx-auto flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Story Not Found</h1>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md mx-auto">
              {error}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/journal')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-taxi-yellow text-stone-950 text-xs sm:text-sm font-bold shadow-md hover:bg-taxi-yellowHover transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to All Stories</span>
              </button>
            </div>
          </div>
        )}

        {/* LOADED ARTICLE DETAIL */}
        {!loading && !error && post && (
          <article className="pt-24 sm:pt-32 pb-16">
            
            {/* Top Navigation & Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/journal')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-400 hover:text-taxi-yellow py-2 px-3 -ml-3 rounded-lg hover:bg-stone-900 transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Stories</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold transition-colors min-h-[38px]"
                title="Share this story"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Article Header Container */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 text-left space-y-6">
              
              {/* Category, Date & Features */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
                <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wide bg-stone-900 text-taxi-yellow border border-taxi-yellow/30 text-[11px]">
                  {getCategoryLabel(post.category)}
                </span>

                {post.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold uppercase tracking-wide bg-taxi-yellow text-stone-950 text-[11px] shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                )}

                {post.publishedAt && (
                  <div className="flex items-center gap-1.5 text-stone-400 ml-1">
                    <Calendar className="w-3.5 h-3.5 text-taxi-yellow" />
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                )}

                {post.instagramUrl && (
                  <a
                    href={post.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors ml-auto text-xs"
                    title="View original on Instagram"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Instagram</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>
                )}
              </div>

              {/* Story Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.18]">
                {post.title}
              </h1>

              {/* Lead Excerpt */}
              {post.excerpt && (
                <div className="border-l-4 border-taxi-yellow pl-5 py-2 my-6 bg-stone-900/50 rounded-r-xl">
                  <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              )}
            </header>

            {/* Main Cover Photography */}
            {coverUrl && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 my-10">
                <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
                  <img
                    src={coverUrl}
                    alt={post.coverImage?.alt || post.title || 'Journal story hero photography'}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                {post.coverImage?.caption && (
                  <p className="text-xs sm:text-sm text-stone-400 mt-3 text-center italic">
                    {post.coverImage.caption}
                  </p>
                )}
              </div>
            )}

            {/* Article Main Body */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-left my-10">
              {Array.isArray(post.body) && post.body.length > 0 ? (
                <div className="prose prose-invert max-w-none">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>
              ) : (
                <div className="py-8 px-6 rounded-2xl bg-stone-900/40 border border-stone-800 text-stone-300 space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed">
                    This story is part of our field dispatches exploring Rwanda. Full itinerary notes and route photography are being curated by our chauffeur team.
                  </p>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Planning a trip along this corridor? You can reserve private executive transportation or discuss personalized itinerary stops directly with our driving team.
                  </p>
                </div>
              )}
            </div>

            {/* Chauffeur Travel Booking CTA Card */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 my-14">
              <div className="rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 text-center space-y-5 shadow-xl">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-taxi-yellow bg-taxi-yellow/10 border border-taxi-yellow/20">
                  Ride Safe • Arrive Happy
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Experience Rwanda with Your Taxi Man
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
                  Punctual airport arrivals at Kigali International (KGL), executive city chauffeur hire, and scenic country exploration to Volcanoes National Park, Lake Kivu, and Akagera.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('/book')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-stone-950 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md transition-all active:scale-95 min-h-[44px]"
                  >
                    <Car className="w-4 h-4" />
                    <span>Book Your Journey</span>
                  </button>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Your Taxi Man! I read your story "${post.title}" and would like to inquire about booking a ride.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-taxi-yellow" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* More Stories Section (if other articles exist) */}
            {otherPosts.length > 0 && (
              <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 border-t border-stone-800">
                <div className="flex items-center justify-between mb-8 text-left">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-taxi-yellow">
                      Continue Reading
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                      More Stories from the Road
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('/journal')}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-taxi-yellow hover:text-taxi-yellowHover transition-colors min-h-[40px]"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((other) => {
                    const otherImg = resolveCoverUrl(other.coverImage)
                    return (
                      <article
                        key={other._id}
                        className="group rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all duration-300 overflow-hidden flex flex-col text-left shadow-md"
                      >
                        <a
                          href={`/journal/${other.slug || ''}`}
                          onClick={(e) => {
                            e.preventDefault()
                            if (onNavigate && other.slug) {
                              onNavigate(`/journal/${other.slug}`)
                            }
                          }}
                          className="flex flex-col h-full"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                            {otherImg ? (
                              <img
                                src={otherImg}
                                alt={other.coverImage?.alt || other.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500 text-xs">
                                No Cover Image
                              </div>
                            )}
                            <div className="absolute top-2.5 left-2.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-stone-950/85 text-taxi-yellow border border-stone-800">
                                {getCategoryLabel(other.category)}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                            <h4 className="text-base font-bold text-white group-hover:text-taxi-yellow transition-colors line-clamp-2 leading-snug">
                              {other.title}
                            </h4>
                            {other.excerpt && (
                              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                                {other.excerpt}
                              </p>
                            )}
                            <div className="pt-2 flex items-center justify-between text-xs font-bold text-taxi-yellow border-t border-stone-800/80">
                              <span>Read Story</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </a>
                      </article>
                    )
                  })}
                </div>
              </section>
            )}

          </article>
        )}

      </main>

      {/* Dark Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
