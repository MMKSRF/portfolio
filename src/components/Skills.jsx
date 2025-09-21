import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const Skills = () => {
  const skillsRef = useRef()
  const titleRef = useRef()
  const containerRef = useRef()
  const neuralNetRef = useRef()
  const [activeSkill, setActiveSkill] = useState(null)
  
  const skills = [
    { name: 'React', level: 95, category: 'Frontend', since: 2020 },
    { name: 'GSAP', level: 90, category: 'Animation', since: 2021 },
    { name: 'Node.js', level: 88, category: 'Backend', since: 2019 },
    { name: 'CSS', level: 93, category: 'Frontend', since: 2018 },
    { name: 'JavaScript', level: 96, category: 'Language', since: 2017 },
    { name: 'PostgreSQL', level: 85, category: 'Database', since: 2020 },
    { name: 'Python', level: 82, category: 'Language', since: 2019 },
    { name: 'AI Integration', level: 78, category: 'Emerging Tech', since: 2022 },
    { name: 'Tailwind', level: 91, category: 'Frontend', since: 2021 },
    { name: 'Express', level: 87, category: 'Backend', since: 2020 },
    { name: 'Java', level: 80, category: 'Language', since: 2018 },
    { name: 'C++', level: 75, category: 'Language', since: 2017 },
    { name: 'Git', level: 94, category: 'Tools', since: 2018 },
    { name: 'Cybersecurity', level: 72, category: 'Specialty', since: 2021 }
  ]

  // AI phrases for typing animation
  // const aiPhrases = [
  //   "Analyzing skill patterns...",
  //   "Optimizing animations...",
  //   "Connecting neural nodes...",
  //   "Initializing AI protocol...",
  //   "Mapping expertise matrix..."
  // ]

  useEffect(() => {
    const skillsElements = Array.from(skillsRef.current.children)
    const ctx = gsap.context(() => {
      // Enable ScrollTrigger markers in development
      ScrollTrigger.config({
        // eslint-disable-next-line no-undef
        markers: process.env.NODE_ENV === 'development'
      })

      // Title animation with typewriter effect
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      )

      // Pin the entire skills section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.5
      })

      // Animate skills along curved paths
      skillsElements.forEach((element, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radiusX = window.innerWidth * 0.35
        const radiusY = window.innerHeight * 0.2
        
        gsap.fromTo(element,
          {
            opacity: 0,
            scale: 0.3,
            x: Math.sin(angle) * radiusX * 0.3,
            y: Math.cos(angle) * radiusY * 0.3,
            z: gsap.utils.random(-500, 500),
            rotation: gsap.utils.random(-20, 20)
          },
          {
            opacity: 1,
            scale: 1,
            x: Math.sin(angle) * radiusX,
            y: Math.cos(angle) * radiusY,
            z: 0,
            rotation: (i / skills.length) * 40 - 20,
            duration: 1.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 60%",
              end: "+=1500",
              scrub: 1.2,
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Continuous floating animation with variation
      skillsElements.forEach((skill) => {
        const timeline = gsap.timeline({ repeat: -1, yoyo: true })
        
        timeline.to(skill, {
          y: `+=${gsap.utils.random(8, 15)}`,
          rotation: `+=${gsap.utils.random(2, 6)}`,
          duration: gsap.utils.random(2.5, 4),
          ease: "sine.inOut"
        })
        
        // Add subtle color pulse
        timeline.to(skill, {
          backgroundColor: "rgba(50, 50, 150, 0.4)",
          boxShadow: "0 0 15px rgba(100, 100, 255, 0.5)",
          duration: gsap.utils.random(3, 5),
          ease: "sine.inOut"
        }, 0)
      })

      // Animate neural network connections
      const connections = neuralNetRef.current.querySelectorAll('line')
      gsap.fromTo(connections,
        {
          strokeWidth: 0,
          strokeOpacity: 0
        },
        {
          strokeWidth: 1,
          strokeOpacity: 0.15,
          stagger: 0.05,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: neuralNetRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate background elements
      gsap.to(".decorative-circle", {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
      })

      // 3D parallax effect for background grid
      gsap.to(".grid-pattern", {
        yPercent: 10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [skills.length])

  // Handle skill hover with enhanced effects
  const handleSkillHover = (skill, index, isHovering) => {
    const skillElement = skillsRef.current.children[index]
    
    if (isHovering) {
      setActiveSkill(skill)
      
      // Highlight this skill
      gsap.to(skillElement, {
        scale: 1.8,
        z: 100,
        rotation: gsap.utils.random(-5, 5),
        color: "#fff",
        backgroundColor: "rgba(30, 30, 120, 0.8)",
        boxShadow: "0 0 25px rgba(100, 150, 255, 0.8)",
        duration: 0.4,
        ease: "power2.out"
      })

      // Create connection highlight effect
      gsap.to(".neural-connection", {
        strokeOpacity: 0.05,
        duration: 0.5
      })
      
      // Highlight connections to this skill
      const connectionsToSkill = neuralNetRef.current.querySelectorAll(`.connection-${index}`)
      gsap.to(connectionsToSkill, {
        strokeOpacity: 0.6,
        strokeWidth: 2,
        stroke: "#5e9fff",
        duration: 0.7,
        ease: "power1.out"
      })

      // Create advanced particle explosion
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full opacity-80'
        skillElement.appendChild(particle)

        gsap.to(particle, {
          x: gsap.utils.random(-60, 60),
          y: gsap.utils.random(-60, 60),
          z: gsap.utils.random(-100, 100),
          opacity: 0,
          scale: 0,
          duration: gsap.utils.random(0.8, 1.4),
          ease: "power2.out",
          onComplete: () => {
            if (skillElement.contains(particle)) {
              skillElement.removeChild(particle)
            }
          }
        })
      }
    } else {
      // Return to normal state
      gsap.to(skillElement, {
        scale: 1,
        z: 0,
        rotation: (index / skills.length) * 40 - 20,
        color: "#ddd",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        boxShadow: "0 0 8px rgba(100, 100, 255, 0.3)",
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      })

      // Reset all connections
      gsap.to(".neural-connection", {
        strokeOpacity: 0.15,
        strokeWidth: 1,
        stroke: "#fff",
        duration: 0.7
      })
      
      setActiveSkill(null)
    }
  }

  // Generate neural network connections
  const generateNeuralConnections = () => {
    const connections = []
    
    skills.forEach((_, i) => {
      // Connect each skill to several others
      const numConnections = Math.floor(window.innerWidth / 200) // Responsive number of connections
      
      for (let j = 1; j <= numConnections; j++) {
        const targetIndex = (i + j) % skills.length
        if (i !== targetIndex) {
          connections.push({ from: i, to: targetIndex })
        }
      }
    })
    
    return connections
  }

  const neuralConnections = generateNeuralConnections()

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-black overflow-hidden py-0  md:py-20 opacity-95 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-16 text-white opacity-0 md:p-0 ">
          Skills & Expertise
        </h2>

        {/* AI Assistant Terminal */}
        <div className="absolute top-5 right-5 w-80 bg-black/80 border border-blue-500/50 rounded-lg p-4 font-mono text-sm text-green-400 opacity-90 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-blue-400">AI-Assistant</span>
          </div>
          <div className="typing-animation h-6">
            {activeSkill 
              ? `Analyzing ${activeSkill.name}: ${activeSkill.level}% proficiency` 
              : "Ready to analyze skills..."}
          </div>
        </div>

        {/* Skills Visualization */}
        <div ref={skillsRef} className="relative h-96 md:h-[500px] flex justify-center items-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="absolute text-lg md:text-xl font-medium text-gray-300 cursor-pointer px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-gray-700 transition-all z-10"
              style={{ left: '50%', top: '50%' }}
              onMouseEnter={() => handleSkillHover(skill, index, true)}
              onMouseLeave={() => handleSkillHover(skill, index, false)}
              onClick={() => handleSkillHover(skill, index, true)}
            >
              {skill.name}
              {/* Proficiency indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Neural Network Visualization */}
        <svg 
          ref={neuralNetRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {neuralConnections.map((conn, i) => {
            const fromEl = skillsRef.current?.children[conn.from]
            const toEl = skillsRef.current?.children[conn.to]
            
            if (!fromEl || !toEl) return null
            
            const fromRect = fromEl.getBoundingClientRect()
            const toRect = toEl.getBoundingClientRect()
            
            const fromX = fromRect.left + fromRect.width / 2
            const fromY = fromRect.top + fromRect.height / 2
            const toX = toRect.left + toRect.width / 2
            const toY = toRect.top + toRect.height / 2
            
            return (
              <line
                key={i}
                className={`neural-connection connection-${conn.from} connection-${conn.to}`}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
            )
          })}
        </svg>

        {/* Skill Detail Panel */}
        {activeSkill && (
          <div className="absolute bottom-6 left-0 right-0 mx-auto w-11/12 md:w-2/3 bg-black/70 border border-blue-500/30 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{activeSkill.name}</h3>
              <span className="text-blue-400 bg-blue-900/30 px-2 py-1 rounded text-sm">
                {activeSkill.category}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Proficiency</span>
                <span>{activeSkill.level}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${activeSkill.level}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Using since {activeSkill.since} • {activeSkill.level >= 90 ? 'Expert' : 
               activeSkill.level >= 75 ? 'Advanced' : 
               activeSkill.level >= 60 ? 'Proficient' : 'Intermediate'} level
            </div>
          </div>
        )}

        {/* Decorative elements with animation */}
        <div className="decorative-circle absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-blue-700/30 opacity-20"></div>
        <div className="decorative-circle absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-purple-700/30 opacity-20"></div>
        
        {/* Animated grid pattern */}
        <div className="grid-pattern absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(100, 100, 255, 0.3) 1px, transparent 1px),
                                 linear-gradient(to bottom, rgba(100, 100, 255, 0.3) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>

        {/* Floating particles background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticle ${gsap.utils.random(15, 25)}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(${gsap.utils.random(-20, 20)}px, ${gsap.utils.random(-20, 20)}px) rotate(90deg);
          }
          50% {
            transform: translate(${gsap.utils.random(-40, 40)}px, ${gsap.utils.random(-40, 40)}px) rotate(180deg);
          }
          75% {
            transform: translate(${gsap.utils.random(-20, 20)}px, ${gsap.utils.random(-20, 20)}px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}

export default Skills