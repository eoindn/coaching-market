"use client"

import { useNavigate } from "react-router-dom" 
import { useState } from "react"
import { User, Mail, Phone, Award, FileText, Briefcase } from "lucide-react"

function CoachProfileUpdate({ profileData, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: profileData?.fullName || "",
    title: profileData?.title || "",
    bio: profileData?.bio || "",
    contactEmail: profileData?.contactEmail || "",
    phone: profileData?.phone || "",
    specialties: profileData?.specialties?.join(", ") || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Convert specialties back to array, trimming whitespace
    const updatedData = {
      ...formData,
      specialties: formData.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }

    try{
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
      if (!res.ok) throw new Error('Failed to update profile')
        const result = await res.json()
        console.log('Profile updated successfully:', result)

        navigate('/profile/coach') // Redirect to profile page after update

    }catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again later.')
    onUpdate(updatedData)
  }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-200">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Update Your Profile</h1>
            <p className="text-center text-slate-600 text-lg">
              Keep your coaching profile up to date with your latest information
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Professional Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g. Senior Executive Coach"
                    required
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your coaching experience, background, and approach..."
                  required
                />
                <p className="text-xs text-slate-500">
                  Share your coaching philosophy, experience, and what makes you unique
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="contactEmail"
                    className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Email
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-2">
                <label htmlFor="specialties" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Areas of Expertise
                </label>
                <input
                  id="specialties"
                  name="specialties"
                  type="text"
                  value={formData.specialties}
                  onChange={handleChange}
                  className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Executive Leadership, Team Building, Career Transition"
                />
                <p className="text-xs text-slate-500">Separate multiple specialties with commas</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 h-12 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-md transition-all duration-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoachProfileUpdate
