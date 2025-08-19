"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
// Import your auth context
// import { useAuth } from '../contexts/authContext'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // If you want to check if user is already logged in
  // const { currentUser, logout } = useAuth()
  
  // For now, we'll simulate auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"

      // Recreate grid when canvas resizes
      panels.length = 0
      createGrid()
    }

    const createGrid = () => {
      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
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
        const wave = Math.sin(animationTime + panel.animationOffset + (panel.x + panel.y) * 0.01) * 0.5 + 0.5
        panel.targetOpacity = wave * 0.2

        panel.opacity += (panel.targetOpacity - panel.opacity) * 0.05

        if (panel.opacity > 0.01) {
          ctx.save()
          ctx.globalAlpha = panel.opacity

          switch (panel.type) {
            case "rectangle":
              const size = 20 + wave * 15
              ctx.fillStyle = panel.color
              ctx.fillRect(panel.x + (panel.width - size) / 2, panel.y + (panel.height - size) / 2, size, size)
              break

            case "line":
              ctx.strokeStyle = panel.color
              ctx.lineWidth = 1 + wave * 2
              ctx.beginPath()
              if (Math.random() > 0.5) {
                ctx.moveTo(panel.x + 10, panel.y + panel.height / 2)
                ctx.lineTo(panel.x + panel.width - 10, panel.y + panel.height / 2)
              } else {
                ctx.moveTo(panel.x + panel.width / 2, panel.y + 10)
                ctx.lineTo(panel.x + panel.width / 2, panel.y + panel.height - 10)
              }
              ctx.stroke()
              break

            case "dot":
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

  const handleLogin = (e) => {
  e.preventDefault()
  setIsSigningIn(true)
  
  setTimeout(() => {
    setIsSigningIn(false)
    setIsLoggedIn(true)
    navigate("/dashboard/client")  // ✅ Change to dashboard
  }, 1000)
}
  



  const handleLogout = async () => {
    try {
      // If using auth context:
      // await logout()
      
      // For simulation:
      setIsLoggedIn(false)
      setEmail("")
      setPassword("")
      
      // Clear any stored tokens/session data
      localStorage.removeItem('token') // if you're storing auth tokens
      sessionStorage.clear()
      
      // Navigate to home or login page
      navigate("/")
      
      console.log("Logged out successfully")
    } catch (error) {
      console.error("Logout failed:", error)
      setError("Failed to log out. Please try again.")
    }
  }

  const scrollToSection = (sectionId) => {
    // For navigation items that don't exist on this page, navigate to home first
    navigate("/")
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background with canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }} />

      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
        style={{ zIndex: 2 }}
      ></div>

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

            {/* Updated Auth Buttons Section */}
            <div className="hidden md:flex space-x-4">
              {isLoggedIn ? (
                // Show logout button when logged in
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-2 border border-red-600 text-red-400 rounded-lg hover:border-red-500 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              ) : (
                // Show login/signup buttons when not logged in
                <>
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
                </>
              )}
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
                  {isLoggedIn ? (
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-6 py-2 border border-red-600 text-red-400 rounded-lg hover:border-red-500 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors">
                          Login
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8 sm:p-12 w-full max-w-md relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {isLoggedIn ? "Already Signed In" : "Welcome Back"}
              </h2>
              <p className="text-gray-300 text-sm">
                {isLoggedIn ? "You are currently logged in to CoachConnect" : "Sign in to your CoachConnect account"}
              </p>
            </motion.div>
          </div>

          {/* Conditional Content */}
          {isLoggedIn ? (
            // Show when user is logged in
            <motion.div
              className="space-y-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">✓ Successfully logged in!</p>
              </div>
              
              <div className="space-y-3">
                <Link to="/profile/client">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
                
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Show login form when not logged in
            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onSubmit={handleLogin}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSigningIn}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSigningIn ? "Signing In..." : "Sign In"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </motion.button>

              {error && (
                <div className="text-red-400 text-sm text-center mt-4">
                  {error}
                </div>
              )}
            </motion.form>
          )}

          {/* Sign up link - only show when not logged in */}
          {!isLoggedIn && (
            <motion.p
              className="text-center text-sm text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-200"
              >
                Sign Up
              </Link>
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 border-t border-gray-800 py-16">
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

export default Login;