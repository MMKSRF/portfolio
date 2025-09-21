import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const Contact = () => {
  const contactRef = useRef()
  const formRef = useRef()
  const hologramRef = useRef()
  const particlesRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Web3Forms access key
  const ACCESS_KEY = '80a98f4d-bbfe-45fe-9fcf-327f43169d8a'

  useEffect(() => {
    // Initialize animations
    const scanLine = document.createElement('div')
    scanLine.className = 'absolute w-full h-0.5 bg-cyan-400 opacity-10'
    scanLine.style.top = '0'
    scanLine.style.left = '0'
    scanLine.style.zIndex = '10'
    scanLine.style.boxShadow = '0 0 10px 2px rgba(0, 255, 255, 0.2)'
    contactRef.current.appendChild(scanLine)

    // Animate scan line
    gsap.to(scanLine, {
      y: '100vh',
      duration: 3,
      repeat: -1,
      ease: "none",
      delay: 1
    })

    // Hologram animation
    gsap.to(hologramRef.current, {
      rotationY: 15,
      y: 10,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })

    // Floating particles animation
    const particles = Array.from(particlesRef.current.children)
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: -20,
        x: Math.random() * 30 - 15,
        rotation: Math.random() * 180,
        opacity: 0.7,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      })
    })

    // Form elements animation
    gsap.from('.form-element', {
      y: 20,
      opacity: 100,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      delay: 0.5
    })
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Prepare form data for Web3Forms
    const formDataObj = new FormData()
    formDataObj.append('access_key', ACCESS_KEY)
    formDataObj.append('name', formData.name)
    formDataObj.append('email', formData.email)
    formDataObj.append('message', formData.message)
    formDataObj.append('subject', 'New Contact Form Submission')
    formDataObj.append('botcheck', '') // Honeypot for spam protection

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsSubmitted(true)
        // Reset form
        setFormData({ name: '', email: '', message: '' })
        
        // Success animation
        gsap.fromTo('.success-message', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
        )
      } else {
        console.error('Error:', data)
        alert('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section ref={contactRef} className="min-h-screen py-20 bg-black overflow-hidden ">

    {/* flex items-center justify-center relative px-4 */}
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-cyan-500/30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-cyan-500/30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-500/30"></div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="text-cyan-400">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                Communication Channels
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '📧',
                    title: 'Email',
                    value: 'perezendale247@gmail.com',
                    link: 'mailto:perezendale247@gmail.com'
                  },
                  {
                    icon: '🔗',
                    title: 'LinkedIn',
                    value: 'linkedin.com/in/perezendale',
                    link: 'https://www.linkedin.com/in/perez-endale-1ab949201/'
                  },
                  {
                    icon: '📂',
                    title: 'GitHub',
                    value: 'github.com/MMKSRF',
                    link: 'https://github.com/MMKSRF'
                  },
                  {
                    icon: '📱',
                    title: 'Telegram',
                    value: '@perezendale',
                    link: 'https://t.me/PerezEndale'
                  }
                ].map((channel, index) => (
                  <a
                    key={index}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-700/30 rounded-lg hover:bg-cyan-900/20 transition-all duration-300 group"
                  >
                    <span className="text-2xl mr-4">{channel.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">{channel.title}</div>
                      <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        {channel.value}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time indicator */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 ">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Quick Response</h4>
                  <p className="text-gray-400">Typically replies within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Holographic effect */}
            <div ref={hologramRef} className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-cyan-500/5 border border-cyan-400/20 animate-pulse"></div>
            </div>
            
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700 relative">
              {isSubmitted ? (
                <div className="success-message text-center py-8">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Message Transmitted</h3>
                  <p className="text-gray-300">I'll get back to you soon!</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-element">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="form-element">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="form-element">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="What would you like to talk about?"
                      required
                    ></textarea>
                  </div>

                  {/* Honeypot field for spam protection */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div className="form-element">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Powered by <a href="https://web3forms.com/" className="text-cyan-500 hover:text-cyan-400">Web3Forms</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact