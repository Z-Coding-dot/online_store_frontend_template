/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { siteConfig } from '@/data/siteConfig'

const ThemeContext = createContext(true)
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => { for (const [key, value] of Object.entries(siteConfig.palette)) document.documentElement.style.setProperty(`--${key}`, value) }, [])
  return <ThemeContext.Provider value>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
