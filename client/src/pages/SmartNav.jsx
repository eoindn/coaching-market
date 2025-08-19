import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, Bell, User, LogOut, Calendar, Settings } from "lucide-react"

export default function SmartNavigation({ userRole = null, userData = null }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // Default user data if not provided
  const defaultUserData = {
    client: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Marketing Director",
      company: "TechCorp Inc."
    },
    coach: {
      name: "Marcus Thompson", 
      email: "marcus@coachingexcellence.com",
      title: "Executive Business Coach",
      rating: 4.9,
      reviews: 47
    }
  }

  const user = userData || (userRole ? defaultUserData[userRole] : null)
  const isLoggedIn = !!userRole && !!user

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('token')
    sessionStorage.clear()
    navigate("/")
  }

  const scrollToSection = (sectionId) => {
    navigate("/")
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const getDashboardRoute = () => {
    if (userRole === 'client') return '/dashboard/client'
    if (userRole === 'coach') return '/dashboard/coach' 
    return '/profile/account'
  }

  const getProfileRoute = () => {
    if (userRole === 'client') return '/profile/account'
    if (userRole === 'coach') return '/profile/coach'
    return '/profile/account'
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            <Link to={isLoggedIn ? getDashboardRoute() : "/"} className="no-underline">
              CoachConnect
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isLoggedIn && (
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
          )}

          {/* Search Bar for logged in users */}
          {isLoggedIn && (
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder={userRole === 'coach' ? "Search clients, requests..." : "Search coaches, topics..."}
                  className="w-full pl-4 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Right side - Auth buttons or Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-gray-400">
                        {userRole === 'coach' ? user.title : user.role}
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                        {userRole === 'coach' && (
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className="text-xs text-gray-400 ml-1">{user.rating} ({user.reviews} reviews)</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Dashboard Link */}
                      <Link 
                        to={getDashboardRoute()} 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Calendar className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      
                      {/* Profile Link */}
                      <Link 
                        to={getProfileRoute()} 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <User className="w-4 h-4 mr-3" />
                        {userRole === 'coach' ? 'Public Profile' : 'My Profile'}
                      </Link>
                      
                      {/* Settings */}
                      <Link 
                        to="/profile/update" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
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
          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
              {isLoggedIn ? (
                <>
                  {/* Mobile logged in menu */}
                  <Link 
                    to={getDashboardRoute()}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to={getProfileRoute()}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {userRole === 'coach' ? 'Public Profile' : 'My Profile'}
                  </Link>
                  <Link 
                    to="/settings"
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile navigation for non-logged in users */}
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
                    <Link to="/login">
                      <button className="w-full px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors text-left">
                        Login
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-left">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}