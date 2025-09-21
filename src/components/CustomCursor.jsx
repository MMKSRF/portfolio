import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef()
  const followerRef = useRef()

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    
    // Hide default cursor
    document.body.style.cursor = 'none'
    
    // Move cursor with mouse
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      })
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      })
    }
    
    // Cursor effects on interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 })
      gsap.to(follower, { scale: 3, opacity: 0.5, duration: 0.3 })
    }
    
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 })
    }
    
    // Add event listeners
    window.addEventListener('mousemove', moveCursor)
    
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={followerRef}
        className="fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
      ></div>
    </>
  )
}

export default CustomCursor