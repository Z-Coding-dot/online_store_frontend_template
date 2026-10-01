import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { children: ReactNode; variant?: 'primary' | 'accent' | 'outline' | 'ghost'; className?: string }
export function Button({ children, variant = 'primary', className, ...props }: Props) { return <button className={cn('btn', `btn-${variant}`, className)} {...props}>{children}</button> }
