import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const projectsRef = useRef()
  const image1Ref = useRef()
  const image2Ref = useRef()
  // const glowRefs = useRef([])

  useEffect(() => {
    // Floating idle animations
    gsap.to([image1Ref.current, image2Ref.current], {
      y: 15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })

    // === Project 1 Orbit Icons ===
    image1Ref.current.addEventListener('mouseenter', () => {
      gsap.to(image1Ref.current, {
        rotation: -15,
        scale: 1.08,
        duration: 0.6,
        ease: "back.out(1.7)"
      })

      // Orbiting icons
      const icons = ['🚀', '⭐', '💫', '🔥']
      icons.forEach((icon, i) => {
        const orbit = document.createElement('div')
        orbit.className = 'absolute text-2xl text-white drop-shadow-lg'
        orbit.textContent = icon
        image1Ref.current.parentElement.appendChild(orbit)

        const angle = (i / icons.length) * Math.PI * 2
        const radius = 120

        gsap.to(orbit, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotation: 360,
          duration: 3 + i,
          repeat: -1,
          ease: "none"
        })
      })
    })

    image1Ref.current.addEventListener('mouseleave', () => {
      gsap.to(image1Ref.current, {
        rotation: -5,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
    })

    // === Project 2 Fragmented Madness ===
    const image2Parts = []
    for (let i = 0; i < 6; i++) {
      const part = document.createElement('div')
      part.className = 'absolute inset-0 bg-cover bg-center'
      part.style.backgroundImage = `url(/images/project.png)`
      part.style.clipPath = `polygon(${gsap.utils.random(0, 50)}% ${gsap.utils.random(0, 50)}%, 
        ${gsap.utils.random(50, 100)}% ${gsap.utils.random(0, 50)}%, 
        ${gsap.utils.random(50, 100)}% ${gsap.utils.random(50, 100)}%, 
        ${gsap.utils.random(0, 50)}% ${gsap.utils.random(50, 100)}%)`

      image2Ref.current.appendChild(part)
      image2Parts.push(part)
    }

    gsap.set(image2Parts, {
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-30, 30),
      opacity: 0
    })

    gsap.to(image2Parts, {
      x: 0, y: 0, rotation: 0, opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: image2Ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })

    image2Ref.current.addEventListener('mouseenter', () => {
      gsap.to(image2Parts, {
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-15, 15),
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      })
    })

    image2Ref.current.addEventListener('mouseleave', () => {
      gsap.to(image2Parts, {
        x: 0, y: 0, rotation: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={projectsRef} className="min-h-screen py-20 bg-black overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
          Featured Projects
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 mb-32">
          {/* Project 1 - Gravity Play */}
          <div className="relative group">
            <div className="relative w-80 h-80 overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              <img
                ref={image1Ref}
                src="/images/vite.svg"
                alt="Project 1"
                className="w-full h-full object-cover group-hover:brightness-125 transition duration-500"
              />
              {/* Scan line hologram effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-scan" />
            </div>
            <div className="absolute -bottom-8 left-0 right-0 text-center">
              <h3 className="text-2xl font-bold text-cyan-400">Full School Administration</h3>
              <p className="text-gray-400 mt-2">Interactive experience</p>
            </div>
          </div>
          
          {/* Project 2 - Fragmented Madness */}
          <div className="relative group">
  <div
    ref={image2Ref}
    className="relative w-80 h-80 overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(255,0,255,0.3)]"
  >
    {/* Project image */}
    <img
      src="/images/taboo.svg"
      alt="Second Project Preview"
      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
    />

    {/* Scan animation overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-scan" />
  </div>

  {/* Text below card */}
  <div className="absolute -bottom-8 left-0 right-0 text-center">
    <h3 className="text-2xl font-bold text-pink-400">Taboo Bot</h3>
    <p className="text-gray-400 mt-2">Experimental design</p>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}

export default Projects