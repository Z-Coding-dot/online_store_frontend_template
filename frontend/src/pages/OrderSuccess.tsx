import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
export function OrderSuccess() { const { t } = useTranslation(); return <Container><div className="empty-state"><CheckCircle2 size={44} color="var(--accent)" style={{ margin: 'auto' }} /><h2 className="heading-2">{t('orderSuccess.title')}</h2><p>{t('orderSuccess.text')}</p><Link className="btn btn-primary" to="/shop">{t('orderSuccess.continue')}</Link></div></Container> }
