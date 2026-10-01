import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { categories } from '@/data/products'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
export function Collections() { const { t } = useTranslation(); return <><PageHeader title={t('shop.collectionsTitle')} subtitle={t('shop.collectionsSubtitle')} /><section className="section"><Container><div className="collection-grid">{categories.map((category) => <Link className="collection-card" to={`/shop?category=${category.id}`} key={category.id}><img src={category.image} alt={t(`categories.${category.id}.name`, { defaultValue: category.name })} loading="lazy" /><div><h2>{t(`categories.${category.id}.name`, { defaultValue: category.name })}</h2><p>{t(`categories.${category.id}.description`, { defaultValue: category.description })}</p><span>{t('shop.exploreCollection')}</span></div></Link>)}</div></Container></section></> }
