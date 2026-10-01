import type { Locale } from '@/types'

export const siteConfig = {
  name: 'Arden House',
  shortName: 'Arden',
  logoText: 'ARDEN HOUSE',
  tagline: 'Objects with a sense of place.',
  defaultLocale: 'en' as Locale,
  supportedLocales: ['en', 'fa-AF', 'ps'] as Locale[],
  currency: 'USD',
  currencyLocale: 'en-US',
  lowStockThreshold: 5,
  features: {
    wishlist: true,
    reviews: true,
    blog: true,
    coupons: true,
    guestCheckout: true,
    newsletter: true,
  },
  contact: {
    email: 'hello@ardenhouse.example',
    phone: '+1 (212) 555-0198',
    address: '18 Mercer Street, New York, NY',
    hours: 'Mon–Fri, 9am–6pm EST',
  },
  socials: { instagram: '#', facebook: '#', pinterest: '#' },
  palette: { primary: '#0B1220', accent: '#B85C38', paper: '#FFFFFF', tint: '#F5F5F4' },
  shipping: [
    { id: 'standard', name: 'Standard delivery', detail: '3–5 business days', price: 0 },
    { id: 'express', name: 'Express delivery', detail: '1–2 business days', price: 1800 },
  ],
  paymentMethods: ['Cash on delivery', 'Bank transfer'],
}
