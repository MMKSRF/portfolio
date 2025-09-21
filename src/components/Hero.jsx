
import { useRef } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(TextPlugin)

const Hero = () => {
  const heroRef = useRef()
  const nameRef = useRef()
  const imageRef = useRef()
  const particlesRef = useRef()
  const taglineRef = useRef()
  const aboutRef = useRef()
  const leftColRef = useRef()
  const rightColRef = useRef()

  useGSAP(() => {
    // Animate columns sliding in
    gsap.fromTo(leftColRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
    
    gsap.fromTo(rightColRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.3 }
    )

    // Animate name letter by letter
    const name = "Perez_Endale"
    nameRef.current.textContent = ""
    const letters = name.split("").map((char) => {
      const span = document.createElement("span")
      span.textContent = char
      span.classList.add("letter")
      nameRef.current.appendChild(span)
      return span
    })

    gsap.to(letters, {
      duration: 2,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(letters, {
          y: -10,
          color: "#888",
          duration: 0.5,
          stagger: 0.05,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        })
      }
    })

    // Animate tagline
    gsap.to(taglineRef.current, {
      duration: 2,
      text: "I build wild, wonderful, and intelligent web experiences.",
      ease: "power2.inOut",
      delay: 1.5
    })

    // Animate about me text
    gsap.to(aboutRef.current, {
      duration: 2.5,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      delay: 0.2
    })

    // Floating image animation
    gsap.to(imageRef.current, {
      rotation: 5,
      y: 20,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })

    // Mouse move effect for image shadow
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25
      const y = (window.innerHeight / 2 - e.clientY) / 25

      gsap.to(imageRef.current, {
        x: x,
        y: y,
        boxShadow: `${x * 2}px ${y * 2}px 30px rgba(0, 0, 0, 0.5)`,
        duration: 1,
        ease: "power2.out"
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Create orbiting particles
    const particles = Array.from(particlesRef.current.children)
    gsap.set(particles, { opacity: 0 })

    gsap.to(particles, {
      opacity: 0.7,
      stagger: 0.2,
      duration: 1
    })

    particles.forEach((particle, i) => {
      const angle = (i / particles.length) * Math.PI * 2
      const radius = 100

      gsap.to(particle, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: 360,
        duration: 10 + i * 2,
        repeat: -1,
        ease: "none"
      })
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className=" min-h-screen py-20 bg-black overflow-hidden       flex flex-col md:flex-row items-center justify-center     ">
      {/* Left Column - Image and Name */}
      <div ref={leftColRef} className="w-full md:w-1/2 flex flex-col items-center justify-center py-12 md:py-0 opacity-0">
        <div className="relative z-10 text-center md:text-left mb-8 md:mb-12">
          <h1 ref={nameRef} className="text-5xl md:text-7xl font-bold text-white flex justify-center md:justify-start">
            {/* Letters will be populated by JS */}
          </h1>
          <p ref={taglineRef} className="text-lg md:text-xl text-gray-300 mt-4 min-h-[1.5rem]">
            {/* Text will be animated in */}
          </p>
        </div>

        <div className="relative z-10">
          <img
            ref={imageRef}
            src="/images/hero.jpg"
            alt="Perez Endale"
            className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-gray-400 shadow-2xl"
          />

          <div ref={particlesRef} className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-300 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - About Me */}
      <div ref={rightColRef} className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 opacity-0">
        <div ref={aboutRef} className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700 transform translate-y-10 opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">About Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            I'm a passionate full-stack developer and AI enthusiast with a love for creating 
            innovative web experiences that blend technical excellence with creative design.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            My expertise spans from front-end technologies like React and GSAP to back-end 
            systems with Node.js and PostgreSQL, with a special interest in AI integration.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to 
            open source projects, or sharing my knowledge with the developer community.
          </p>
          
          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['React', 'Node.js', 'AI', 'GSAP', 'PostgreSQL', 'Tailwind'].map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-gray-400 animate-pulse"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
// import { useRef } from 'react'
// import gsap from 'gsap'
// import { TextPlugin } from 'gsap/TextPlugin'
// import { useGSAP } from '@gsap/react'

// gsap.registerPlugin(TextPlugin)

// const Hero = () => {
//   const heroRef = useRef()
//   const nameRef = useRef()
//   const imageRef = useRef()
//   const particlesRef = useRef()
//   const taglineRef = useRef()

//   useGSAP(() => {
//     // Animate name letter by letter
//     const name = "Perez_Endale"
//     nameRef.current.textContent = ""
//     const letters = name.split(" ").map((char) => {
//       const span = document.createElement("span")
//       span.textContent = char
//       span.classList.add("letter")
//       nameRef.current.appendChild(span)
//       return span
//     })

//     gsap.to(letters, {
//       duration: 2,
//       opacity: 1,
//       y: 0,
//       stagger: 0.1,
//       ease: "power2.inOut",
//       onComplete: () => {
//         gsap.to(letters, {
//           y: -20,
//           rotation: -10,
//           color: "#888",
//           duration: 0.5,
//           stagger: 0.05,
//           yoyo: true,
//           repeat: 1,
//           ease: "power1.inOut"
//         })
//       }
//     })

//     // Animate tagline
//     gsap.to(taglineRef.current, {
//       duration: 2,
//       text: "I build wild, wonderful, and intelligent web experiences.",
//       ease: "power2.inOut",
//       delay: 1.5
//     })

//     // Floating image animation
//     gsap.to(imageRef.current, {
//       rotation: 5,
//       y: 20,
//       duration: 3,
//       yoyo: true,
//       repeat: -1,
//       ease: "sine.inOut"
//     })

//     // Mouse move effect for image shadow
//     const handleMouseMove = (e) => {
//       const x = (window.innerWidth / 2 - e.clientX) / 25
//       const y = (window.innerHeight / 2 - e.clientY) / 25

//       gsap.to(imageRef.current, {
//         x: x,
//         y: y,
//         boxShadow: `${x * 2}px ${y * 2}px 30px rgba(0, 0, 0, 0.5)`,
//         duration: 1,
//         ease: "power2.out"
//       })
//     }

//     window.addEventListener('mousemove', handleMouseMove)

//     // Create orbiting particles
//     const particles = Array.from(particlesRef.current.children)
//     gsap.set(particles, { opacity: 0 })

//     gsap.to(particles, {
//       opacity: 0.7,
//       stagger: 0.2,
//       duration: 1
//     })

//     particles.forEach((particle, i) => {
//       const angle = (i / particles.length) * Math.PI * 2
//       const radius = 100

//       gsap.to(particle, {
//         x: Math.cos(angle) * radius,
//         y: Math.sin(angle) * radius,
//         rotation: 360,
//         duration: 10 + i * 2,
//         repeat: -1,
//         ease: "none"
//       })
//     })

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove)
//     }
//   }, { scope: heroRef })

//   return (
//     <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden 
//              bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black/90">
//       <div className="relative z-10 text-center">
//         <h1 ref={nameRef} className="text-6xl md:text-8xl font-bold mb-8 text-white flex justify-center">
//           {/* Letters will be populated by JS */}
//         </h1>
//         <p ref={taglineRef} className="text-xl md:text-2xl text-gray-300 mb-12 min-h-[2rem]">
//           {/* Text will be animated in */}
//         </p>
//       </div>

//       <div className="relative z-10">
//         <img
//           ref={imageRef}
//           src="/images/hero.jpg"
//           alt="Perez Endale"
//           className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-400 shadow-2xl"
//         />

//         <div ref={particlesRef} className="absolute inset-0">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-300 rounded-full"
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Subtle animated background elements */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-gray-400 animate-pulse"></div>
//       </div>
      
//       {/* Scroll indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//         <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero

// import { useRef } from 'react'
// import gsap from 'gsap'
// import { TextPlugin } from 'gsap/TextPlugin'
// import { useGSAP } from '@gsap/react'

// gsap.registerPlugin(TextPlugin) // Only register actual GSAP plugins

// const Hero = () => {
//   const heroRef = useRef()
//   const nameRef = useRef()
//   const imageRef = useRef()
//   const particlesRef = useRef()

//   useGSAP(() => {
//     // Animate name letter by letter
//     const name = "Your Name"
//     nameRef.current.textContent = "" // Clear text
//     const letters = name.split("").map((char) => {
//       const span = document.createElement("span")
//       span.textContent = char
//       span.classList.add("letter")
//       nameRef.current.appendChild(span)
//       return span
//     })

//     gsap.to(letters, {
//       duration: 2,
//       opacity: 1,
//       y: 0,
//       stagger: 0.1,
//       ease: "power2.inOut",
//       onComplete: () => {
//         gsap.to(letters, {
//           y: -20,
//           rotation: -10,
//           color: "#ff6b6b",
//           duration: 0.5,
//           stagger: 0.05,
//           yoyo: true,
//           repeat: 1,
//           ease: "power1.inOut"
//         })
//       }
//     })

//     // Floating image animation
//     gsap.to(imageRef.current, {
//       rotation: 5,
//       y: 20,
//       duration: 3,
//       yoyo: true,
//       repeat: -1,
//       ease: "sine.inOut"
//     })

//     // Mouse move effect for image shadow
//     const handleMouseMove = (e) => {
//       const x = (window.innerWidth / 2 - e.clientX) / 25
//       const y = (window.innerHeight / 2 - e.clientY) / 25

//       gsap.to(imageRef.current, {
//         x: x,
//         y: y,
//         boxShadow: `${x * 2}px ${y * 2}px 30px rgba(0, 0, 0, 0.3)`,
//         duration: 1,
//         ease: "power2.out"
//       })
//     }

//     window.addEventListener('mousemove', handleMouseMove)

//     // Create orbiting particles
//     const particles = Array.from(particlesRef.current.children) // convert HTMLCollection to array
//     gsap.set(particles, { opacity: 0 })

//     gsap.to(particles, {
//       opacity: 1,
//       stagger: 0.2,
//       duration: 1
//     })

//     particles.forEach((particle, i) => {
//       const angle = (i / particles.length) * Math.PI * 2
//       const radius = 100

//       gsap.to(particle, {
//         x: Math.cos(angle) * radius,
//         y: Math.sin(angle) * radius,
//         rotation: 360,
//         duration: 10 + i * 2,
//         repeat: -1,
//         ease: "none"
//       })
//     })

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove)
//     }
//   }, { scope: heroRef })

//   return (
//     <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       <div className="relative z-10 text-center">
//         <h1 ref={nameRef} className="text-6xl md:text-8xl font-bold mb-8 text-white flex justify-center">
//           {/* Letters will be populated by JS */}
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-300 mb-12">
//           Creative Developer & Digital Artist
//         </p>
//       </div>

//       <div className="relative z-10">
//         <img
//           ref={imageRef}
//           src="/images/hero.jpg"
//           alt="Profile"
//           className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
//         />

//         <div ref={particlesRef} className="absolute inset-0">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full opacity-70"
//             ></div>
//           ))}
//         </div>
//       </div>

//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 to-transparent mix-blend-overlay"></div>
//       </div>
//     </section>
//   )
// }

// export default Hero