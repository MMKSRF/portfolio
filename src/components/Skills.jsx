import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const skillsRef = useRef()
  const titleRef = useRef()
  const skills = [
    'React', 'GSAP', 'Node.js', 'CSS', 'JavaScript', 
    'PostgreSQL', 'Python', 'AI Integration', 'Tailwind',
    'Express', 'Java', 'C++', 'Git', 'Cybersecurity'
  ]

  useEffect(() => {
    const skillsElements = Array.from(skillsRef.current.children)

    // Title animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Curved text placement
    gsap.set(skillsElements, {
      x: (i) => Math.sin((i / skills.length) * Math.PI * 2) * 200,
      y: (i) => Math.cos((i / skills.length) * Math.PI * 2) * 100,
      rotation: (i) => (i / skills.length) * 40 - 20,
      opacity: 0
    })

    // Animate skills in on scroll
    gsap.to(skillsElements, {
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    })

    // Continuous subtle animation for all skills
    skillsElements.forEach((skill) => {
      gsap.to(skill, {
        y: 10,
        rotation: "+=5",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    // Hover effects
    skillsElements.forEach((skill, index) => {
      skill.addEventListener('mouseenter', () => {
        gsap.to(skill, {
          scale: 1.4,
          rotation: gsap.utils.random(-5, 5),
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          duration: 0.4,
          ease: "power2.out"
        })

        // Mini explosion particles in monochrome
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement('div')
          particle.className = 'absolute w-2 h-2 bg-white rounded-full'
          skill.appendChild(particle)

          gsap.to(particle, {
            x: gsap.utils.random(-40, 40),
            y: gsap.utils.random(-40, 40),
            opacity: 0,
            duration: 0.6,
            onComplete: () => skill.removeChild(particle)
          })
        }
      })

      skill.addEventListener('mouseleave', () => {
        gsap.to(skill, {
          scale: 1,
          rotation: (index / skills.length) * 40 - 20,
          color: "#ddd",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          duration: 0.7,
          ease: "elastic.out(1, 0.5)"
        })
      })
    })
  }, [skills.length])

  return (
    <section className="min-h-screen py-20 bg-black overflow-hidden ">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-white opacity-0">
          Skills & Expertise
        </h2>

        <div ref={skillsRef} className="relative h-96 md:h-[500px] flex justify-center items-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="absolute text-lg md:text-xl font-medium text-gray-300 cursor-pointer px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-gray-700 transition-all"
              style={{ left: '50%', top: '50%' }}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gray-700 opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-gray-700 opacity-20"></div>
        
        {/* Subtle grid pattern in background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: `linear-gradient(to right, gray 1px, transparent 1px),
                                 linear-gradient(to bottom, gray 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>
    </section>
  )
}

export default Skills
// import { useRef, useEffect } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// const Skills = () => {
//   const skillsRef = useRef()
//   const skills = ['React', 'GSAP', 'Three.js', 'CSS', 'JavaScript', 'UI/UX', 'Animation', 'Figma']

//   useEffect(() => {
//     const skillsElements = Array.from(skillsRef.current.children)

//     // Curved text placement
//     gsap.set(skillsElements, {
//       x: (i) => Math.sin((i / skills.length) * Math.PI * 2) * 200,
//       y: (i) => Math.cos((i / skills.length) * Math.PI * 2) * 100,
//       rotation: (i) => (i / skills.length) * 40 - 20,
//       opacity: 0
//     })

//     // Animate skills in on scroll
//     gsap.to(skillsElements, {
//       opacity: 1,
//       stagger: 0.2,
//       duration: 1,
//       scrollTrigger: {
//         trigger: skillsRef.current,
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//       }
//     })

//     // Hover effects
//     skillsElements.forEach((skill, index) => {
//       skill.addEventListener('mouseenter', () => {
//         gsap.to(skill, {
//           scale: 1.5,
//           rotation: gsap.utils.random(-10, 10),
//           color: "#ff6b6b",
//           duration: 0.5,
//           ease: "back.out(1.7)"
//         })

//         // Mini explosion particles
//         for (let i = 0; i < 5; i++) {
//           const particle = document.createElement('div')
//           particle.className = 'absolute w-2 h-2 bg-yellow-400 rounded-full'
//           skill.appendChild(particle)

//           gsap.to(particle, {
//             x: gsap.utils.random(-50, 50),
//             y: gsap.utils.random(-50, 50),
//             opacity: 0,
//             duration: 0.8,
//             onComplete: () => skill.removeChild(particle)
//           })
//         }
//       })

//       skill.addEventListener('mouseleave', () => {
//         gsap.to(skill, {
//           scale: 1,
//           rotation: (index / skills.length) * 40 - 20,
//           color: "#ffffff",
//           duration: 0.7,
//           ease: "elastic.out(1, 0.5)"
//         })
//       })
//     })
//   }, [skills.length])

//   return (
//     <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-tr from-gray-900 to-black overflow-hidden py-20">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
//           Skills & Expertise
//         </h2>

//         <div ref={skillsRef} className="relative h-96 md:h-[500px] flex justify-center items-center">
//           {skills.map((skill, index) => (
//             <div
//               key={index}
//               className="absolute text-xl md:text-2xl font-semibold text-white cursor-pointer px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm"
//               style={{ left: '50%', top: '50%' }}
//             >
//               {skill}
//             </div>
//           ))}
//         </div>

//         {/* Optional: Neural network lines (still basic, can be improved later) */}
//         <svg className="absolute inset-0 w-full h-full pointer-events-none">
//           {skills.map((_, i) =>
//             skills.map((_, j) => {
//               if (i < j && Math.random() > 0.7) {
//                 return (
//                   <line
//                     key={`${i}-${j}`}
//                     x1="50%"
//                     y1="50%"
//                     x2="50%"
//                     y2="50%"
//                     stroke="rgba(255, 255, 255, 0.1)"
//                     strokeWidth="1"
//                   />
//                 )
//               }
//               return null
//             })
//           )}
//         </svg>
//       </div>
//     </section>
//   )
// }

// export default Skills