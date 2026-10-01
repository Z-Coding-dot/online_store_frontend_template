import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/data/siteConfig'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'

export function Contact() { const { t } = useTranslation(); const [sent, setSent] = useState(false); return <><PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} /><section className="section"><Container><div className="contact-grid"><div className="contact-info"><div><strong><Mail size={16} /> {t('contact.email')}</strong><span>{siteConfig.contact.email}</span></div><div><strong><Phone size={16} /> {t('contact.phone')}</strong><span>{siteConfig.contact.phone}</span></div><div><strong><MapPin size={16} /> {t('contact.visit')}</strong><span>{siteConfig.contact.address}<br />{siteConfig.contact.hours}</span></div></div>{sent ? <div className="card" style={{ padding: '2rem' }}><h2 className="heading-2">{t('contact.sent')}</h2></div> : <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><div className="form-field"><label>{t('contact.name')}</label><input className="input" required /></div><div className="form-field"><label>{t('checkout.email')}</label><input className="input" type="email" required /></div><div className="form-field"><label>{t('contact.message')}</label><textarea className="input" rows={6} required /></div><Button variant="accent">{t('contact.send')}</Button></form>}</div></Container></section></> }
