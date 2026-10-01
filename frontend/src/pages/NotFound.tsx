import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
export function NotFound() { const { t } = useTranslation(); return <Container><div className="empty-state"><span className="eyebrow">{t('notFound.eyebrow')}</span><h2 className="heading-2">{t('notFound.title')}</h2><p>{t('notFound.text')}</p><Link className="btn btn-primary" to="/">{t('notFound.back')}</Link></div></Container> }
