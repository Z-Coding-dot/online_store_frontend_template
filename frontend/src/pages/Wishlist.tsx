import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products } from '@/data/products'
import { useWishlist } from '@/hooks/useWishlist'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { ProductCard } from '@/components/ui/ProductCard'

export function Wishlist() { const { t } = useTranslation(); const wishlist = useWishlist(); const items = products.filter((product) => wishlist.ids.includes(product.id)); return <><PageHeader title={t('nav.wishlist')} />{items.length ? <section className="section"><Container><div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div></Container></section> : <Container><div className="empty-state"><h2>{t('wishlist.title')}</h2><p>{t('wishlist.text')}</p><Link className="btn btn-primary" to="/shop">{t('wishlist.button')}</Link></div></Container>}</> }
