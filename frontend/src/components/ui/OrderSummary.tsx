import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/data/siteConfig'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/format'
export function OrderSummary({ checkout = false }: { checkout?: boolean }) { const { t } = useTranslation(); const { subtotal } = useCart(); const shipping = subtotal >= 10000 ? 0 : siteConfig.shipping[0].price; const total = subtotal + shipping; return <aside className="summary"><h2>{t('cart.summary')}</h2><div className="summary-row"><span>{t('cart.subtotal')}</span><strong className="price">{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>{t('cart.shipping')}</span><strong>{shipping ? formatPrice(shipping) : t('cart.free')}</strong></div><div className="summary-row summary-total"><span>{t('cart.total')}</span><strong className="price">{formatPrice(total)}</strong></div>{!checkout && <Link className="btn btn-primary" to="/checkout">{t('cart.checkout')}</Link>}</aside> }
