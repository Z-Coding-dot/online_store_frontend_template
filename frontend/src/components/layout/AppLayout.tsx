import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { MobileTabBar } from './MobileTabBar'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'
export function AppLayout() {
  const location = useLocation()
  return <><Navbar /><ScrollToTop /><main className="page-main"><AnimatePresence mode="wait"><motion.div key={location.pathname} className="route-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2, ease: 'easeOut' }}><Outlet /></motion.div></AnimatePresence></main><Footer /><MobileTabBar /></>
}
