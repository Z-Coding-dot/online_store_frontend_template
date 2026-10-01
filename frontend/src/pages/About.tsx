import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'

export function About() { const { t } = useTranslation(); return <><PageHeader title={t('about.title')} subtitle={t('about.text')} /><section className="section"><Container><div className="editorial"><motion.img initial={{ opacity: 0, scale: 1.03 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .55 }} src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt={t('about.imageAlt')} loading="lazy" /><div className="editorial-copy"><span className="eyebrow" style={{ color: '#F0B39A' }}>{t('about.eyebrow')}</span><h2 className="heading-2">{t('about.heading')}</h2><p>{t('about.text')} {t('about.body')}</p><Link className="btn btn-outline" style={{ color: 'white', borderColor: 'white', alignSelf: 'start', marginTop: '1rem' }} to="/shop">{t('about.button')}</Link></div></div></Container></section></> }
