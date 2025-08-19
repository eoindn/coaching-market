"use client"

import { useState } from "react"
import { 
  User, 
  Building, 
  Target, 
  DollarSign, 
  Clock, 
  Briefcase,
  Users,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  MessageCircle
} from "lucide-react"
import { doCreateUserWithEmailAndPassword } from "../firebase/authFunctions"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext/index"
import { useEffect } from "react"


export default function EnhancedSignupQuestionnaire() {


  const navigate = useNavigate()
  const {userLoggedIn} = useAuth()


  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

    useEffect(() => {
  if (userLoggedIn) {
    navigate("/dashboard/client") // or wherever you want to redirect
  }
}, [userLoggedIn, navigate])
  
  const [formData, setFormData] = useState({
    // Basic info
    email: "",
    password: "",
    confirmPassword: "",
    
    // Personal info
    fullName: "",
    location: "",
    
    // Role-specific data
    // For clients:
    company: "",
    role: "",
    teamSize: "",
    industry: "",
    goals: [],
    budget: "",
    timeline: "",
    experience: "",
    
    // For coaches:
    title: "",
    specialties: [],
    industries: [],
    experience: "",
    hourlyRate: "",
    certifications: [],
    coachingStyle: "",
    idealClient: ""
  })

  const clientGoals = [
    { id: "leadership", label: "Leadership Development", icon: Users },
    { id: "team", label: "Team Management", icon: Users },
    { id: "communication", label: "Communication Skills", icon: MessageCircle },
    { id: "career", label: "Career Advancement", icon: TrendingUp },
    { id: "strategy", label: "Strategic Thinking", icon: Target },
    { id: "balance", label: "Work-Life Balance", icon: Clock }
  ]

  const coachSpecialties = [
    { id: "executive", label: "Executive Leadership", icon: Award },
    { id: "startup", label: "Startup Coaching", icon: TrendingUp },
    { id: "team-building", label: "Team Building", icon: Users },
    { id: "career-transition", label: "Career Transition", icon: Briefcase },
    { id: "communication", label: "Communication", icon: MessageCircle },
    { id: "performance", label: "Performance Coaching", icon: Target }
  ]

  const industries = [
    "Technology", "Finance", "Healthcare", "Manufacturing", 
    "Consulting", "Real Estate", "Education", "Non-profit", "Other"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleRoleSelection = (role) => {
    setUserType(role)
    handleInputChange('userType', role)
    nextStep()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      console.log("🚀 Creating Firebase user account...")
      
      // Step 1: Create Firebase user (you'll need to import this function)
      // const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password)
      // const user = userCredential.user

      const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password)
      const user = userCredential.user
      console.log("👤 Firebase user created:", user)
      
      
      // Step 2: Prepare profile data
      const profileData = {
        userId: user.uid, // Replace with actual user.uid
        userType: userType,
        email: formData.email,
        fullName: formData.fullName,
        location: formData.location,

        // Client-specific fields
        ...(userType === 'client' && {
          company: formData.company,
          role: formData.role,
          goals: formData.goals,
          budget: formData.budget,
          timeline: formData.timeline,
          industry: formData.industry,
          experience: formData.experience
        }),

        // Coach-specific fields
        ...(userType === 'coach' && {
          title: formData.title,
          specialties: formData.specialties,
          industries: formData.industries,
          coachExperience: formData.experience,
          hourlyRate: formData.hourlyRate
        })
      }

      console.log("💾 Saving profile data to backend...")
      console.log("Profile data:", profileData)

      // Step 3: Save to backend
      const response = await fetch('http://localhost:5000/api/profile/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      const result = await response.json()

      // ADDED this entirely new error handling:
// Handle specific Firebase auth errors


      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create profile')
      }

      console.log('✅ Profile created successfully:', result.data)

      // Step 4: Show success message or redirect
      alert(`✅ Account created successfully! Welcome to CoachConnect as a ${userType}!`)
      

      if (result.data && result.data.redirectTo) {
  // Use backend's suggested redirect
       navigate(result.data.redirectTo)
      } else {
  // Fallback navigation based on user type
       if (userType === 'coach') {
          navigate('/dashboard/coach')
       } else {
         navigate('/dashboard/client')
  }
}

    } catch (error) {
      console.error('❌ Error creating profile:', error)
      
      // ✅ FIXED: Error handling moved inside catch block
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError(error.message || 'Failed to create account. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to CoachConnect</h2>
              <p className="text-gray-300">Let's get started with your account</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button
              onClick={nextStep}
              disabled={!formData.email || !formData.password || formData.password !== formData.confirmPassword || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Continue
            </button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Choose Your Path</h2>
              <p className="text-gray-300">Are you looking for coaching or offering coaching services?</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelection('client')}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Target className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-lg font-bold">Find a Coach</div>
                    <div className="text-blue-100 text-sm">I want to grow my business and leadership skills</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleRoleSelection('coach')}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-green-700 hover:to-green-800 disabled:opacity-50"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Award className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-lg font-bold">Become a Coach</div>
                    <div className="text-green-100 text-sm">I want to help others achieve their goals</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-300">Basic information to get started</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              
              <input
                type="text"
                placeholder="Location (City, State)"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              
              {userType === 'client' && (
                <>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    placeholder="Your Role (e.g., CEO, Manager, Director)"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </>
              )}
              
              {userType === 'coach' && (
                <input
                  type="text"
                  placeholder="Professional Title (e.g., Executive Coach, Leadership Consultant)"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                disabled={isLoading}
                className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.fullName || isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 4:
        if (userType === 'client') {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">What Are Your Goals?</h2>
                <p className="text-gray-300">Select all areas where you'd like coaching support</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientGoals.map((goal) => {
                  const Icon = goal.icon
                  const isSelected = formData.goals.includes(goal.id)
                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleMultiSelect('goals', goal.id)}
                      disabled={isLoading}
                      className={`p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSelected
                          ? "bg-blue-900/30 border-blue-600 text-blue-300"
                          : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-blue-500"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{goal.label}</span>
                    </button>
                  )
                })}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={prevStep}
                  disabled={isLoading}
                  className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={formData.goals.length === 0 || isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Your Coaching Specialties</h2>
                <p className="text-gray-300">What areas do you specialize in?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coachSpecialties.map((specialty) => {
                  const Icon = specialty.icon
                  const isSelected = formData.specialties.includes(specialty.id)
                  return (
                    <button
                      key={specialty.id}
                      onClick={() => handleMultiSelect('specialties', specialty.id)}
                      disabled={isLoading}
                      className={`p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSelected
                          ? "bg-green-900/30 border-green-600 text-green-300"
                          : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-green-500"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{specialty.label}</span>
                    </button>
                  )
                })}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={prevStep}
                  disabled={isLoading}
                  className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={formData.specialties.length === 0 || isLoading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-green-800 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )
        }

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Final Details</h2>
              <p className="text-gray-300">Help us match you perfectly</p>
            </div>
            
            {userType === 'client' ? (
              <div className="space-y-4">
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">Select budget range</option>
                  <option value="50-100">$50-100/hour</option>
                  <option value="100-200">$100-200/hour</option>
                  <option value="200-300">$200-300/hour</option>
                  <option value="300+">$300+/hour</option>
                </select>
                
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">When would you like to start?</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-2weeks">Within 1-2 weeks</option>
                  <option value="1month">Within 1 month</option>
                  <option value="flexible">I'm flexible</option>
                </select>

                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <select
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <option value="">Your hourly rate</option>
                  <option value="50-100">$50-100/hour</option>
                  <option value="100-200">$100-200/hour</option>
                  <option value="200-300">$200-300/hour</option>
                  <option value="300-500">$300-500/hour</option>
                  <option value="500+">$500+/hour</option>
                </select>
                
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <option value="">Years of coaching experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>

                <select
                  multiple
                  value={formData.industries}
                  onChange={(e) => handleInputChange('industries', Array.from(e.target.selectedOptions, option => option.value))}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px] disabled:opacity-50"
                >
                  <option value="" disabled>Select industries you serve (hold Ctrl/Cmd for multiple)</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            )}
            
            {error && (
              <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                disabled={isLoading}
                className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex-1 ${userType === 'client' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'} text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Creating Account...' : 'Complete Signup'}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-20">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8 w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
} 