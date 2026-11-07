import { Heart, Home, ShoppingBag, Store } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  ]
  return <nav className="mobile-tabbar" aria-label={t('nav.mobileNavigation')}>
    {tabs.map(({ to, label, icon: Icon, end, count: itemCount }) => <NavLink key={to} to={to} end={end} aria-label={label} className={({ isActive }) => isActive ? 'mobile-tab active' : 'mobile-tab'}>{({ isActive }) => <><span className="mobile-tab-icon">{isActive && <motion.span className="mobile-tab-highlight" layoutId="mobile-tab-highlight" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}<Icon size={19} />{itemCount ? <span className="count">{itemCount}</span> : null}</span></>}</NavLink>)}
  </nav>
}
