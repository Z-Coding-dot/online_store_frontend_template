import { EllipsisVertical, Heart, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navigation } from '@/data/navigation'
import { products } from '@/data/products'
import { useCart } from '@/hooks/useCart'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Container } from './Container'
import { PwaInstallButton } from './PwaInstallButton'

export function Navbar() {
  const { t } = useTranslation(); const cart = useCart(); const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false); const [query, setQuery] = useState('')
  const [mobileOptionsOpen, setMobileOptionsOpen] = useState(false)
  const mobileOptionsRef = useRef<HTMLDivElement>(null)
  const suggestions = useMemo(() => products.filter((product) => t(`products.${product.id}.name`, { defaultValue: product.name }).toLowerCase().includes(query.toLowerCase())).slice(0, 4), [query, t])
  const submitSearch = (event: FormEvent) => { event.preventDefault(); if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false) }
  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (mobileOptionsRef.current && !mobileOptionsRef.current.contains(event.target as Node)) setMobileOptionsOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOptionsOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])
  return <><div className="announcement">{t('announcement')}</div><header className="site-header"><Container><div className="nav-main"><Link className="logo" to="/">ARDEN HOUSE</Link><nav className="nav-links" aria-label={t('nav.mainNavigation')}>{navigation.map((item) => <NavLink key={item.to} to={item.to}>{t(item.labelKey)}</NavLink>)}</nav><div className="nav-actions"><button className={searchOpen ? 'icon-btn active' : 'icon-btn'} aria-label={t('nav.search')} onClick={() => setSearchOpen((value) => !value)}><Search size={19} /></button><Link className="icon-btn account-action" aria-label={t('nav.account')} to="/auth/login"><UserRound size={19} /></Link><Link className="icon-btn wishlist-action" aria-label={t('nav.wishlist')} to="/wishlist"><Heart size={19} /></Link><Link className="icon-btn cart-action" aria-label={t('nav.cart')} to="/cart"><ShoppingBag size={19} />{cart.count > 0 && <span className="count">{cart.count}</span>}</Link><div className="desktop-language"><LanguageSwitcher /></div><div className="mobile-options" ref={mobileOptionsRef}><button className="icon-btn mobile-options-trigger" type="button" aria-label={t('nav.moreOptions')} aria-expanded={mobileOptionsOpen} onClick={() => setMobileOptionsOpen((open) => !open)}><EllipsisVertical size={21} /></button>{mobileOptionsOpen && <div className="mobile-options-popover" aria-label={t('nav.moreOptions')}><Link className="mobile-option-link" to="/auth/login" onClick={() => setMobileOptionsOpen(false)}><UserRound size={17} />{t('nav.account')}</Link><PwaInstallButton className="mobile-option-link mobile-install-button" /><LanguageSwitcher /></div>}</div></div></div>{searchOpen && <div className="search-panel"><form onSubmit={submitSearch}><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('nav.searchPlaceholder')} aria-label={t('nav.search')} /><button type="button" className="icon-btn" aria-label={t('common.close')} onClick={() => setSearchOpen(false)}><X size={17} /></button></form>{query && <div className="search-suggestions">{suggestions.length ? suggestions.map((product) => <Link key={product.id} to={`/product/${product.slug}`} onClick={() => setSearchOpen(false)}><img src={product.image} alt="" /><span>{t(`products.${product.id}.name`, { defaultValue: product.name })}</span></Link>) : <span className="search-empty">{t('nav.noResults')}</span>}<button className="search-view-all" onClick={submitSearch}>{t('common.viewAll')}</button></div>}</div>}</Container></header></>
}
