import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BackgroundShapes = () => {
  const containerRef = useRef()

  useEffect(() => {
    const shapes = containerRef.current.children
    
    // Set initial random positions
    gsap.set(shapes, {
      x: () => gsap.utils.random(-100, window.innerWidth + 100),
      y: () => gsap.utils.random(-100, window.innerHeight + 100),
      rotation: () => gsap.utils.random(0, 360),
      opacity: 0.3
    })
    
    // Animate shapes on scroll
    gsap.to(shapes, {
      y: (i) => (i % 2 ? -100 : 100),
      x: (i) => (i % 3 ? -50 : 50),
      rotation: (i) => (i % 2 ? 90 : -90),
      duration: 20 + gsap.utils.random(0, 20),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
    
    // Change colors on scroll
    ScrollTrigger.create({
      onUpdate: () => {
        gsap.to(shapes, {
          backgroundColor: () => gsap.utils.random([
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9c74f', '#ff5e5b'
          ]),
          duration: 2,
          stagger: 0.1
        })
      }
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Various shapes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-20 h-20 md:w-32 md:h-32 rounded-full opacity-20"
          style={{
            backgroundColor: i % 2 ? '#ff6b6b' : '#4ecdc4'
          }}
        ></div>
      ))}
      
      {[...Array(10)].map((_, i) => (
        <div
          key={i + 15}
          className="absolute w-16 h-16 md:w-24 md:h-24 opacity-20"
          style={{
            backgroundColor: i % 2 ? '#45b7d1' : '#f9c74f',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        ></div>
      ))}
    </div>
  )
}

export default BackgroundShapes