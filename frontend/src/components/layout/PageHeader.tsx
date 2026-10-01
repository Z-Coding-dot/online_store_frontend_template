import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Container } from './Container'
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) { const { t } = useTranslation(); return <motion.header className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Container><div className="breadcrumbs"><Link to="/">{t('common.home')}</Link> <span aria-hidden="true">/</span> {title}</div><h1 className="heading-1">{title}</h1>{subtitle && <p>{subtitle}</p>}</Container></motion.header> }
