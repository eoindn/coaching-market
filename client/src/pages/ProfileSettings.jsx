"use client"

import { useState } from "react"

function CoachProfileUpdate({ profileData, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: profileData.fullName,
    title: profileData.title,
    bio: profileData.bio,
    contactEmail: profileData.contactEmail,
    phone: profileData.phone,
    specialties: profileData.specialties.join(", "),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert specialties back to array, trimming whitespace
    const updatedData = {
      ...formData,
      specialties: formData.specialties.split(",").map((s) => s.trim()).filter(Boolean),
    }
    onUpdate(updatedData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      <div>
        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-md bg-gray-700 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 text-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Specialties (comma separated)</label>
        <input
          type="text"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 text-white"
          placeholder="e.g. Executive Leadership, Team Building"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CoachProfileUpdate
