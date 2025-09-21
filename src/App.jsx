import { useRef } from 'react'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import BackgroundShapes from './components/BackgroundShapes'
import CustomCursor from './components/CustomCursor'
import './App.css'

function App() {
  const appRef = useRef()

  return (
    <div ref={appRef} className="relative overflow-x-hidden">
      <CustomCursor />
      <BackgroundShapes />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App