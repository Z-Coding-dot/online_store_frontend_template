import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/context/LanguageContext'
import type { Locale } from '@/types'

const languages: { code: Locale; native: string; english: string }[] = [
  { code: 'en', native: 'English', english: 'English' },
  { code: 'fa-AF', native: 'دری', english: 'Dari' },
  { code: 'ps', native: 'پښتو', english: 'Pashto' },
]

export function LanguageSwitcher() {
  const { t } = useTranslation()
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = languages.find((language) => language.code === locale) ?? languages[0]
  useEffect(() => { const close = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false) }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close) }, [])
  return <div className="language-menu" ref={ref}><button className="language-trigger" type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((value) => !value)}><Globe2 size={17} /><span>{active.native}</span><ChevronDown size={14} className={open ? 'rotate-180' : ''} /></button>{open && <div className="language-popover" role="listbox" aria-label={t('common.language')}><div className="language-popover-heading"><span>{t('common.chooseLanguage')}</span><span>{languages.length}</span></div>{languages.map((language) => <button type="button" role="option" aria-selected={language.code === locale} className={language.code === locale ? 'language-option active' : 'language-option'} key={language.code} onClick={() => { setLocale(language.code); setOpen(false) }}><span className="language-native">{language.native}</span><span className="language-english">{t(`languageNames.${language.code}`, { defaultValue: language.english })}</span>{language.code === locale && <Check size={16} />}</button>)}</div>}</div>
}
