import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import '@/i18n'
import '@/index.css'
import { App } from '@/App'
import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { store } from '@/redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HelmetProvider><Provider store={store}><ThemeProvider><LanguageProvider><App /></LanguageProvider></ThemeProvider></Provider></HelmetProvider></React.StrictMode>)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => void navigator.serviceWorker.register('/sw.js'))
}
