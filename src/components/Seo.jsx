import { useEffect } from 'react'

export default function Seo({ title, description, canonical, hreflangFr, hreflangEn, jsonLd, ogImage }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canonical, true)
    if (ogImage) setMeta('og:image', ogImage, true)
    setLink('canonical', canonical)
    if (hreflangFr) setHreflang('fr', hreflangFr)
    if (hreflangEn) setHreflang('en', hreflangEn)
    if (jsonLd) setJsonLd(jsonLd)
    return () => { document.querySelectorAll('[data-seo-cleanup]').forEach(el => el.remove()) }
  }, [title, description, canonical, hreflangFr, hreflangEn, jsonLd, ogImage])
  return null
}

function setMeta(name, content, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.content = content
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.rel = rel; el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.href = href
}

function setHreflang(lang, href) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
  if (!el) { el = document.createElement('link'); el.rel = 'alternate'; el.setAttribute('hreflang', lang); el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.href = href
}

function setJsonLd(data) {
  let el = document.querySelector('script[type="application/ld+json"]')
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}
