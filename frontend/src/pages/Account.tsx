import { Package, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
export function Account() { const { t } = useTranslation(); return <><PageHeader title={t('account.title')} subtitle={t('account.subtitle')} /><section className="section"><Container><div className="account-grid"><aside className="card account-nav"><Link className="active" to="/account"><UserRound size={17} /> {t('account.overview')}</Link><Link to="/orders"><Package size={17} /> {t('account.orders')}</Link><Link to="/profile">{t('account.profile')}</Link></aside><div className="account-welcome card"><span className="eyebrow">{t('account.eyebrow')}</span><h2 className="heading-2">{t('account.welcome')}</h2><p>{t('account.text')}</p><Link className="btn btn-accent" to="/shop">{t('common.continue')}</Link></div></div></Container></section></> }
