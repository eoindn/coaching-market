"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ChevronDown, Play, Users, Target, TrendingUp, Award, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import SmartNavigation from "./SmartNav"
import { useAuth } from "../contexts/authContext"

export default function LandingPage() {
  const canvasRef = useRef(null)
  const animationRef = useRef()
  const [statsInView, setStatsInView] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const { userRole, userData } = useAuth()

  // Architectural grid animation for hero background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationTime = 0
    const gridSize = 60
    const panels = []

    const colors = [
      "rgba(59, 130, 246, 0.1)", // blue
      "rgba(139, 92, 246, 0.1)", // purple
      "rgba(6, 182, 212, 0.1)", // cyan
      "rgba(251, 191, 36, 0.1)", // amber/yellow
      "rgba(16, 185, 129, 0.1)", // emerald
    ]

    const resizeCanvas = () => {
      const hero = canvas.parentElement
      if (!hero) return
      canvas.width = hero.offsetWidth
      canvas.height = hero.offsetHeight

      // Recreate grid when canvas resizes
      panels.length = 0
      createGrid()
    }

    const createGrid = () => {
      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Create different types of elements
          const types = ["rectangle", "line", "dot"]
          const type = types[Math.floor(Math.random() * types.length)]

          panels.push({
            x: i * gridSize,
            y: j * gridSize,
            width: gridSize,
            height: gridSize,
            opacity: 0,
            targetOpacity: Math.random() * 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            animationOffset: Math.random() * Math.PI * 2,
            type: type,
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animationTime += 0.01

      panels.forEach((panel, index) => {
        // Create wave-like animation across the grid
        const wave = Math.sin(animationTime + panel.animationOffset + (panel.x + panel.y) * 0.01) * 0.5 + 0.5
        panel.targetOpacity = wave * 0.2

        // Smooth opacity transition
        panel.opacity += (panel.targetOpacity - panel.opacity) * 0.05

        if (panel.opacity > 0.01) {
          ctx.save()
          ctx.globalAlpha = panel.opacity

          switch (panel.type) {
            case "rectangle":
              // Animated rectangles
              const size = 20 + wave * 15
              ctx.fillStyle = panel.color
              ctx.fillRect(panel.x + (panel.width - size) / 2, panel.y + (panel.height - size) / 2, size, size)
              break

            case "line":
              // Animated lines
              ctx.strokeStyle = panel.color
              ctx.lineWidth = 1 + wave * 2
              ctx.beginPath()
              if (Math.random() > 0.5) {
                // Horizontal line
                ctx.moveTo(panel.x + 10, panel.y + panel.height / 2)
                ctx.lineTo(panel.x + panel.width - 10, panel.y + panel.height / 2)
              } else {
                // Vertical line
                ctx.moveTo(panel.x + panel.width / 2, panel.y + 10)
                ctx.lineTo(panel.x + panel.width / 2, panel.y + panel.height - 10)
              }
              ctx.stroke()
              break

            case "dot":
              // Animated dots
              const radius = 2 + wave * 4
              ctx.fillStyle = panel.color
              ctx.beginPath()
              ctx.arc(panel.x + panel.width / 2, panel.y + panel.height / 2, radius, 0, Math.PI * 2)
              ctx.fill()
              break
          }

          ctx.restore()
        }
      })

      // Add subtle connecting lines between active elements
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = 0.5

      panels.forEach((panel, i) => {
        if (panel.opacity > 0.1) {
          panels.slice(i + 1, i + 5).forEach((otherPanel) => {
            if (otherPanel.opacity > 0.1) {
              const distance = Math.sqrt(Math.pow(panel.x - otherPanel.x, 2) + Math.pow(panel.y - otherPanel.y, 2))
              if (distance < gridSize * 2) {
                ctx.beginPath()
                ctx.moveTo(panel.x + panel.width / 2, panel.y + panel.height / 2)
                ctx.lineTo(otherPanel.x + otherPanel.width / 2, otherPanel.y + otherPanel.height / 2)
                ctx.stroke()
              }
            }
          })
        }
      })
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
      if (!isInView) return

      let startTime
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, [isInView, end, duration])

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    )
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
       <SmartNavigation userRole={userRole} userData={userData} />
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              <Link to="/" className="no-underline">
                CoachConnect
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "How it Works", "Results", "Testimonials"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  whileHover={{ y: -2 }}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors"
              >
                Login
              </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-800"
            >
              <div className="flex flex-col space-y-4 mt-4">
                {["Home", "About", "How it Works", "Results", "Testimonials"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {item}
                  </button>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors">
                    Login
                  </button>
                  <Link to="/signup">
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30"></canvas>

        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
        ></motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm text-gray-300">AI-Powered Coaching Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Transform Your Business with
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block">
              Expert Coaching
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed"
          >
            Connect with world-class business coaches through our intelligent matching system. Accelerate growth,
            enhance leadership, and achieve unprecedented success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Find Your Coach
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-gray-600 text-white rounded-lg font-semibold text-lg hover:border-blue-400 hover:bg-blue-400/10 transition-all flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="animate-bounce"
          >
            <ChevronDown size={32} className="mx-auto text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CoachConnect
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing business coaching by connecting companies with the perfect coaches through advanced
              AI matching and comprehensive success tracking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Network",
                description: "500+ certified business coaches across all industries",
              },
              {
                icon: Target,
                title: "Precision Matching",
                description: "AI-powered algorithm ensures perfect coach-client fit",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "95% success rate with measurable business outcomes",
              },
              { icon: Award, title: "Industry Recognition", description: "Trusted by Fortune 500 companies worldwide" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Vertical Timeline */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/geometric-background.jpg"
            alt="Geometric Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">We Do</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive approach to business coaching delivers measurable results through proven methodologies
              and expert guidance.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>

            <div className="space-y-16">
              {[
                {
                  title: "Strategic Assessment",
                  description:
                    "We begin with a comprehensive analysis of your business challenges, opportunities, and goals to create a tailored coaching roadmap.",
                  image: "/images/professional-woman-1.jpg",
                  name: "Sarah Chen",
                  role: "Lead Strategy Coach",
                  side: "left",
                },
                {
                  title: "Personalized Matching",
                  description:
                    "Our AI-powered system connects you with coaches who have specific expertise in your industry and business challenges.",
                  image: "/images/professional-man-1.jpg",
                  name: "Michael Rodriguez",
                  role: "Business Development Coach",
                  side: "right",
                },
                {
                  title: "Continuous Growth",
                  description:
                    "Through regular sessions and progress tracking, we ensure sustainable growth and measurable improvements in your business performance.",
                  image: "/images/professional-woman-2.jpg",
                  name: "Emily Watson",
                  role: "Performance Coach",
                  side: "left",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${item.side === "right" ? "flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${item.side === "left" ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
                      <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                      <div className={`flex items-center ${item.side === "left" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex items-center ${item.side === "left" ? "flex-row-reverse" : ""}`}>
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className={`${item.side === "left" ? "mr-3 text-right" : "ml-3"}`}>
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900"></div>
                  </div>

                  {/* Spacer */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="results" className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setStatsInView(true)}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Delivering Real Impact</h2>
            <p className="text-xl text-gray-300">Numbers that speak to our commitment to excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: 500, suffix: "+", label: "Expert Coaches", color: "from-blue-400 to-blue-600" },
              { number: 1200, suffix: "+", label: "Companies Served", color: "from-purple-400 to-purple-600" },
              { number: 95, suffix: "%", label: "Success Rate", color: "from-cyan-400 to-cyan-600" },
              { number: 50, suffix: "+", label: "Industries Covered", color: "from-green-400 to-green-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div
                  className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-lg text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How It{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Works</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Assessment & Goals",
                description:
                  "Complete our comprehensive business assessment to identify your specific coaching needs and growth objectives.",
              },
              {
                step: "02",
                title: "AI-Powered Matching",
                description:
                  "Our advanced algorithm analyzes thousands of coach profiles to find the perfect matches for your unique requirements.",
              },
              {
                step: "03",
                title: "Coaching & Growth",
                description:
                  "Begin your personalized coaching journey with ongoing support, progress tracking, and measurable results.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl border border-gray-600 hover:border-blue-500/50 transition-all group">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-300">Real transformations from companies that chose CoachConnect</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "CoachConnect transformed our leadership approach. The AI matching was incredibly accurate, and our productivity increased by 40% within three months.",
                author: "Sarah Chen",
                role: "CEO, TechStart Inc.",
                company: "TechStart",
                image: "/images/professional-woman-1.jpg",
                gradient: "from-blue-500 to-purple-600",
              },
              {
                quote:
                  "The coaching quality exceeded our expectations. Our coach understood our industry challenges perfectly and provided actionable strategies that delivered results.",
                author: "Michael Rodriguez",
                role: "VP Operations, GrowthCorp",
                company: "GrowthCorp",
                image: "/images/professional-man-1.jpg",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                quote:
                  "Outstanding platform! Our sales team exceeded targets by 60% after implementing the strategies from our assigned coach. Highly recommended.",
                author: "Emily Watson",
                role: "Sales Director, ScaleUp Ltd",
                company: "ScaleUp",
                image: "/images/professional-woman-2.jpg",
                gradient: "from-cyan-500 to-blue-600",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/80 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="text-blue-400 text-4xl mb-4 font-serif">"</div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-600">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Growth?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join hundreds of successful companies that have transformed their business with expert coaching
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Start Your Journey
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-gray-600 text-white rounded-lg font-semibold text-lg hover:border-blue-400 hover:bg-blue-400/10 transition-colors"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                CoachConnect
              </h3>
              <p className="text-gray-400 mb-6">
                Revolutionizing business coaching through AI-powered matching and expert guidance.
              </p>
              <div className="flex space-x-4">
                {["LinkedIn", "Twitter", "Facebook"].map((social) => (
                  <motion.div
                    key={social}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    <span className="text-sm font-bold">{social.slice(0, 2)}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {[
              {
                title: "For Companies",
                links: ["Find a Coach", "Enterprise Solutions", "Success Stories", "Pricing"],
              },
              {
                title: "For Coaches",
                links: ["Join as Coach", "Coach Resources", "Training Programs", "Community"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CoachConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
