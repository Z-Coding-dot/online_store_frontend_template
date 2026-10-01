import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'

export function ContentPage({ kind }: { kind: 'faq' | 'privacy' | 'terms' }) {
  const { t } = useTranslation(); const [open, setOpen] = useState(0)
  if (kind === 'faq') { const items = Array.from({ length: 5 }, (_, index) => ({ question: t(`faq.items.${index}.question`), answer: t(`faq.items.${index}.answer`) })); return <><PageHeader title={t('faq.title')} subtitle={t('faq.subtitle')} /><section className="section faq-section"><Container><div className="faq-intro"><div className="faq-icon"><HelpCircle size={26} /></div><div><span className="eyebrow">{t('faq.title')}</span><h2 className="heading-2">{t('faq.intro')}</h2></div></div><div className="faq-list">{items.map((item, index) => <div className={open === index ? 'faq-item open' : 'faq-item'} key={item.question}><button className="faq-question" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span><span className="faq-number">0{index + 1}</span>{item.question}</span><ChevronDown size={19} /></button>{open === index && <div className="faq-answer"><p>{item.answer}</p></div>}</div>)}</div></Container></section></> }
  const title = kind === 'privacy' ? t('legal.privacy') : t('legal.terms'); return <><PageHeader title={title} /><section className="section"><Container><div className="content-narrow"><h2 className="heading-2">{t('legal.simpleAgreement')}</h2><p>{t('legal.detailsText')}</p><h3>{t('legal.questions')}</h3><p>{t('legal.contactText')}</p></div></Container></section></>
}
