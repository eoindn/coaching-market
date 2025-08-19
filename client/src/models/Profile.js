// src/models/Profile.js - Updated with questionnaire fields
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // User identification
  userId: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['coach', 'client'], required: true }, // NEW: Role from questionnaire
  
  // Basic personal info
  fullName: { type: String, required: true }, // From questionnaire step 3
  email: { type: String, required: true }, // From questionnaire step 1
  location: String, // From questionnaire step 3
  
  // Client-specific fields
  company: String, // For clients - step 3
  role: String, // For clients - step 3
  teamSize: String,
  goals: [String], // From questionnaire step 4 - ["leadership", "team", "communication"]
  budget: String, // From questionnaire step 5 - "200-300"
  timeline: String, // From questionnaire step 5 - "immediately"
  clientExperience: String, // How much coaching experience they've had
  industry: String, // From questionnaire step 5
  
  // Coach-specific fields
  title: String, // For coaches - step 3 - "Executive Coach"
  specialties: [String], // From questionnaire step 4 - ["executive", "startup"]
  industries: [String], // From questionnaire step 5 - ["Technology", "Finance"]
  coachExperience: String, // From questionnaire step 5 - "5-10 years"
  hourlyRate: String, // From questionnaire step 5 - "200-300"
  certifications: [String],
  coachingStyle: String,
  idealClient: String,
  
  // Legacy fields (keep for existing data)
  tagline: String,
  successRate: String,
  clients: String,
  bio: String,
  contactEmail: String,
  phone: String,
  website: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
  },
  education: String,
  languages: [String],
  
  // Profile completion status
  profileComplete: { type: Boolean, default: false },
  onboardingComplete: { type: Boolean, default: false }, // NEW: Track if questionnaire completed
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);