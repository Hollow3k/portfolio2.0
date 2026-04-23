import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Promode from "./Promode"
import Chillmode from "./Chillmode"
import Gallery from "./Gallery"
import ClickSpark from "./ClickSpark"
import { AnimatePresence, motion } from "framer-motion"

function App() {
  const location = useLocation()

  return (
    <ClickSpark sparkColor="#111" sparkSize={10} sparkRadius={16} sparkCount={8} duration={420} easing="ease-out">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Promode />
              </PageWrapper>
            }
          />
          <Route
            path="/chill"
            element={
              <PageWrapper>
                <Chillmode />
              </PageWrapper>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageWrapper>
                <Gallery />
              </PageWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </ClickSpark>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}


export default App
