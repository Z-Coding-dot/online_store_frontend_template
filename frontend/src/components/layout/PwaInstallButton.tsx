import { Download } from 'lucide-react'
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

interface PwaInstallState {
  installPrompt: BeforeInstallPromptEvent | null
  isInstalled: boolean
  setInstallPrompt: (prompt: BeforeInstallPromptEvent | null) => void
  setIsInstalled: (installed: boolean) => void
}

const PwaInstallContext = createContext<PwaInstallState | null>(null)

export function PwaInstallProvider({ children }: PropsWithChildren) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const captureInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }
    const markInstalled = () => {
      setInstallPrompt(null)
      setIsInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
    window.addEventListener('appinstalled', markInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt)
      window.removeEventListener('appinstalled', markInstalled)
    }
  }, [])

  return <PwaInstallContext.Provider value={{ installPrompt, isInstalled, setInstallPrompt, setIsInstalled }}>{children}</PwaInstallContext.Provider>
}

export function PwaInstallButton({ className }: { className: string }) {
  const { t } = useTranslation()
  const pwaInstall = useContext(PwaInstallContext)
  const [showInstructions, setShowInstructions] = useState(false)

  const installApp = async () => {
    if (!pwaInstall?.installPrompt) {
      setShowInstructions(true)
      return
    }
    try {
      await pwaInstall.installPrompt.prompt()
      await pwaInstall.installPrompt.userChoice
      pwaInstall.setInstallPrompt(null)
    } catch (error) {
      console.error('Unable to show the PWA installation prompt.', error)
      setShowInstructions(true)
    }
  }

  if (!pwaInstall) throw new Error('PwaInstallButton must be rendered inside PwaInstallProvider.')
  if (pwaInstall.isInstalled) return null

  return <>
    <button className={className} type="button" onClick={() => void installApp()}><Download size={17} />{t('nav.installApp')}</button>
    {showInstructions && <p className="install-help" role="status">{t('nav.installInstructions')}</p>}
  </>
}
