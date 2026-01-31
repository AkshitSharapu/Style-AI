import { useState } from 'react'
import LandingPage from './components/LandingPage'
import StylePage from './components/StylePage'
import { ThemeProvider, useTheme } from './context/ThemeContext'


function AppContent() {
  const [selectedGender, setSelectedGender] = useState(null)
  const { toggleTheme } = useTheme()

  const handleBack = () => {
    setSelectedGender(null)
    toggleTheme('default')
  }

  return (
    <div className="min-h-screen">
      {!selectedGender ? (
        <LandingPage
          onSelectGender={(gender) => setSelectedGender(gender)}
          onHomeClick={handleBack}
        />
      ) : (
        <StylePage
          gender={selectedGender}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
