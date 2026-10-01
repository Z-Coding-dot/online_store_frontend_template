import { Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
export function QuantityStepper({ value, onChange, max = 99 }: { value: number; onChange: (value: number) => void; max?: number }) { const { t } = useTranslation(); return <div className="quantity"><button aria-label={t('common.decrease')} onClick={() => onChange(Math.max(1, value - 1))}><Minus size={15} /></button><span>{value}</span><button aria-label={t('common.increase')} onClick={() => onChange(Math.min(max, value + 1))}><Plus size={15} /></button></div> }
