"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Building,
  Briefcase,
  Target,
  DollarSign,
  Calendar,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
} from "lucide-react"

export default function ClientProfile() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    goals: [],
    budget: "",
    timeline: "",
    experience: "",
  })

  const goalOptions = [
    { name: "Leadership Development", icon: "Users" },
    { name: "Team Management", icon: "Users" },
    { name: "Communication Skills", icon: "Target" },
    { name: "Career Advancement", icon: "TrendingUp" },
    { name: "Work-Life Balance", icon: "CheckCircle" },
    { name: "Strategic Thinking", icon: "Target" },
  ]

  const benefits = [
    "Matched with coaches based on your specific needs",
    "Proven track record with 95% client satisfaction",
    "Flexible scheduling that works with your timeline",
    "Confidential and professional coaching environment",
  ]

  const stats = [
    { number: "500+", label: "Successful Matches" },
    { number: "98%", label: "Client Retention" },
    { number: "15+", label: "Years Experience" },
  ]

  const handleGoalToggle = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real application, you would send this data to a server
    // and handle success/error states.
  }

  const getIcon = (iconName) => {
    const iconMap = {
      Users: Users,
      Target: Target,
      TrendingUp: TrendingUp,
      CheckCircle: CheckCircle,
    }
    const IconComponent = iconMap[iconName]
    return IconComponent ? <IconComponent className="w-5 h-5 mr-3" /> : <Target className="w-5 h-5 mr-3" />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background with subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 z-0"></div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-gray-950/90 backdrop-blur-md z-50 border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              <a href="/" className="no-underline">
                CoachConnect
              </a>
            </motion.div>
            {/* You can add desktop navigation links here if needed */}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Side - Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8 sm:p-10"
            >
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Coach</h1>
                <p className="text-xl text-gray-300">
                  Tell us about your coaching needs and we'll match you with the ideal professional coach.
                </p>
              </div>

              <div className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-gray-300 mb-2 flex items-center"
                      >
                        <User className="w-4 h-4 mr-2 text-blue-400" />
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-gray-300 mb-2 flex items-center"
                      >
                        <Building className="w-4 h-4 mr-2 text-blue-400" />
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                      Current Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Marketing Manager, CEO, Team Lead"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Coaching Goals Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Coaching Goals
                  </h3>
                  <p className="text-gray-400">Select all areas where you'd like coaching support:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goalOptions.map((goal) => (
                      <motion.button
                        key={goal.name}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleGoalToggle(goal.name)}
                        className={`p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center ${
                          formData.goals.includes(goal.name)
                            ? "bg-blue-900/30 border-blue-600 text-blue-300 shadow-md"
                            : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-blue-500"
                        }`}
                      >
                        {getIcon(goal.icon)}
                        <span className="font-medium">{goal.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Budget and Timeline Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-semibold text-gray-300 mb-2 flex items-center"
                      >
                        <DollarSign className="w-4 h-4 mr-2 text-blue-400" />
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="50-100">$50-100/hour</option>
                        <option value="100-200">$100-200/hour</option>
                        <option value="200-300">$200-300/hour</option>
                        <option value="300+">$300+/hour</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-sm font-semibold text-gray-300 mb-2 flex items-center"
                      >
                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                      >
                        <option value="">When would you like to start?</option>
                        <option value="immediately">Immediately</option>
                        <option value="1-2weeks">Within 1-2 weeks</option>
                        <option value="1month">Within 1 month</option>
                        <option value="flexible">I'm flexible</option>
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-800 transition duration-200 text-lg font-semibold shadow-lg"
                >
                  Find My Perfect Coach
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Info Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Stats */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose CoachConnect?</h3>
                <div className="grid grid-cols-1 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-gray-700"
                    >
                      <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Get</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-br from-blue-700 to-purple-800 rounded-2xl shadow-xl p-8 text-white"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">
                  "CoachConnect matched me with an incredible coach who helped transform my leadership style. The
                  results were immediate and lasting."
                </blockquote>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-blue-200">VP of Operations, TechCorp</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
