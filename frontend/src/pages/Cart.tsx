import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/format'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { OrderSummary } from '@/components/ui/OrderSummary'

export function Cart() {
  const { t } = useTranslation(); const cart = useCart()
  return <><PageHeader title={t('cart.title')} />{cart.lines.length === 0 ? <Container><div className="empty-state"><h2>{t('cart.empty')}</h2><p>{t('cart.emptyText')}</p><Link className="btn btn-primary" to="/shop">{t('cart.startShopping')}</Link></div></Container> : <section className="section"><Container><div className="cart-layout"><div>{cart.lines.map((line) => { const name = t(`products.${line.product.id}.name`, { defaultValue: line.product.name }); return <div className="cart-line" key={line.product.id}><img src={line.product.image} alt={name} /><div><h3>{name}</h3><p>{formatPrice(line.product.price)}</p><QuantityStepper value={line.quantity} max={line.product.stock} onChange={(value) => cart.update(line.product.id, value)} /></div><button className="icon-btn" aria-label={t('cart.removeItem', { name })} onClick={() => cart.remove(line.product.id)}><Trash2 size={18} /></button></div> })}</div><OrderSummary /></div></Container></section>}</>
}
