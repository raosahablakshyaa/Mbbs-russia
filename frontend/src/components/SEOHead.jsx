import { useEffect } from 'react'
import { SITE } from '../utils/seo'

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  schema,
  noindex = false,
}) {
  const fullTitle = title || `MBBS in Russia 2025 — Fees, Admission & Top Universities | ${SITE.name}`
  const fullDesc = description || SITE.description
  const fullCanonical = canonical ? `${SITE.url}${canonical}` : SITE.url
  const fullImage = ogImage || `${SITE.url}/og-image.jpg`

  useEffect(() => {
    // Title
    document.title = fullTitle

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
      el.setAttribute('href', href)
    }

    // Basic meta
    setMeta('description', fullDesc)
    if (keywords) setMeta('keywords', keywords)
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1')
    setMeta('author', SITE.name)
    setMeta('viewport', 'width=device-width, initial-scale=1.0')

    // Canonical
    setLink('canonical', fullCanonical)

    // Open Graph
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', fullDesc, true)
    setMeta('og:type', ogType, true)
    setMeta('og:url', fullCanonical, true)
    setMeta('og:image', fullImage, true)
    setMeta('og:image:width', '1200', true)
    setMeta('og:image:height', '630', true)
    setMeta('og:site_name', SITE.name, true)
    setMeta('og:locale', 'en_IN', true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', fullDesc)
    setMeta('twitter:image', fullImage)
    setMeta('twitter:site', '@MBBSRussiaGuide')

    // Schema JSON-LD
    const schemaId = 'schema-jsonld'
    let schemaEl = document.getElementById(schemaId)
    if (!schemaEl) { schemaEl = document.createElement('script'); schemaEl.id = schemaId; schemaEl.type = 'application/ld+json'; document.head.appendChild(schemaEl) }
    schemaEl.textContent = JSON.stringify(schema || defaultSchema())

    return () => {}
  }, [fullTitle, fullDesc, keywords, fullCanonical, fullImage, ogType, schema, noindex])

  return null
}

function defaultSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/mbbsrussiaguide',
      'https://www.instagram.com/mbbsrussiaguide',
      'https://www.youtube.com/mbbsrussiaguide',
    ],
  }
}
