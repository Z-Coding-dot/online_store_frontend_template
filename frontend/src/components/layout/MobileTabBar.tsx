import { Heart, Home, ShoppingBag, Store, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/hooks/useCart'

export function MobileTabBar() {
  const { t } = useTranslation()
  const { count } = useCart()
  const tabs = [
    { to: '/', label: t('common.home'), icon: Home, end: true },
    { to: '/shop', label: t('nav.shop'), icon: Store },
    { to: '/wishlist', label: t('nav.wishlist'), icon: Heart },
    { to: '/cart', label: t('nav.cart'), icon: ShoppingBag, count },
    { to: '/auth/login', label: t('nav.account'), icon: UserRound },
  ]
  return <nav className="mobile-tabbar" aria-label={t('nav.mobileNavigation')}>
    {tabs.map(({ to, label, icon: Icon, end, count: itemCount }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'mobile-tab active' : 'mobile-tab'}><span className="mobile-tab-icon"><Icon size={19} />{itemCount ? <span className="count">{itemCount}</span> : null}</span><span>{label}</span></NavLink>)}
  </nav>
}
