/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import i18n from '@/i18n'
import type { Locale } from '@/types'

interface LanguageContextValue { locale: Locale; setLocale: (locale: Locale) => void; isRTL: boolean }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const storedLocale = localStorage.getItem('i18nextLng')
  const initialLocale: Locale = storedLocale === 'fa' ? 'fa-AF' : storedLocale === 'ps' || storedLocale === 'fa-AF' ? storedLocale : 'en'
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const isRTL = locale !== 'en'
  useEffect(() => { document.documentElement.lang = locale; document.documentElement.dir = isRTL ? 'rtl' : 'ltr'; void i18n.changeLanguage(locale) }, [isRTL, locale])
  const value = useMemo(() => ({ locale, isRTL, setLocale: (next: Locale) => { setLocaleState(next); void i18n.changeLanguage(next) } }), [isRTL, locale])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export const useLanguage = () => { const context = useContext(LanguageContext); if (!context) throw new Error('useLanguage must be used inside LanguageProvider'); return context }
