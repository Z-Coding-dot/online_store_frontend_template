import { siteConfig } from '@/data/siteConfig'
import i18n from '@/i18n'

export const formatPrice = (minor: number, locale?: string) => {
  const documentLocale = i18n.language || (typeof document !== 'undefined' ? document.documentElement.lang : 'en')
  const activeLocale = locale ?? (documentLocale === 'ps' ? 'ps-AF' : documentLocale === 'fa-AF' ? 'fa-AF' : siteConfig.currencyLocale)
  return new Intl.NumberFormat(activeLocale, { style: 'currency', currency: siteConfig.currency, maximumFractionDigits: 0 }).format(minor / 100)
}

export const calculateSubtotal = (lines: { product: { price: number }; quantity: number }[]) =>
  lines.reduce((total, line) => total + line.product.price * line.quantity, 0)
