import { Heart, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import type { Product } from '@/types'
import { formatPrice } from '@/utils/format'
import { Button } from './Button'

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation(); const cart = useCart(); const wishlist = useWishlist(); const wished = wishlist.has(product.id); const name = t(`products.${product.id}.name`, { defaultValue: product.name }); const category = t(`categories.${product.category}.name`, { defaultValue: product.categoryLabel })
  return <motion.article className="product-card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .35 }}><div className="product-image-wrap"><Link to={`/product/${product.slug}`} aria-label={name}><img src={product.image} alt={name} loading="lazy" width="900" height="1125" /><img className="hover-image" src={product.hoverImage} alt="" loading="lazy" width="900" height="1125" /></Link><button className="icon-btn wishlist-btn" aria-label={wished ? t('common.removeFromWishlist') : t('common.addToWishlist')} onClick={() => wishlist.toggle(product.id)}><Heart size={18} fill={wished ? 'currentColor' : 'none'} /></button><Button className="quick-add" variant="accent" onClick={() => cart.add(product)}><ShoppingBag size={16} /> {t('common.addToCart')}</Button></div><div className="product-meta"><span className="product-category">{category}</span><Link to={`/product/${product.slug}`}><h3 className="product-name">{name}</h3></Link><div className="product-price"><strong className="price">{formatPrice(product.price)}</strong>{product.compareAt && <><span className="compare price">{formatPrice(product.compareAt)}</span><span className="sale">{t('common.sale')}</span></>}</div></div></motion.article>
}
