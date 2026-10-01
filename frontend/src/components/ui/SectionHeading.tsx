import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
interface Props { eyebrow?: string; title: string; description?: string; link?: string; linkLabel?: string }
export function SectionHeading({ eyebrow, title, description, link, linkLabel }: Props) { const { t } = useTranslation(); return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2 className="heading-2">{title}</h2>{description && <p>{description}</p>}</div>{link && <Link className="text-link" to={link}>{linkLabel ?? t('common.viewAll')} <ArrowUpRight size={16} /></Link>}</div> }
