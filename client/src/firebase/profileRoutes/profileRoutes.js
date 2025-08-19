// src/firebase/profileRoutes/profileRoutes.js
const express = require('express');
const Profile = require('../../models/Profile'); // Path to your Profile model
const router = express.Router();

// PUT route to update/create profile
// URL: PUT /api/profile
router.put('/', async (req, res) => {
  try {
    console.log('📝 Received profile update request:', req.body);
    
    const { userId, ...updateData } = req.body;
    
    // Check if userId was provided
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        error: 'User ID is required' 
      });
    }
    
    // Find the profile by userId and update it
    // If it doesn't exist, create a new one (upsert: true)
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },           // Find profile with this userId
      updateData,          // Update with this new data
      { 
        new: true,         // Return the updated document
        upsert: true,      // Create new if doesn't exist
        runValidators: true // Check data matches schema
      }
    );
    
    console.log('✅ Profile updated successfully:', updatedProfile);
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
    
  } catch (error) {
    console.error('❌ Profile update error:', error);
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to update profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET route to fetch a profile
// URL: GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        error: 'User ID is required' 
      });
    }
    
    console.log('🔍 Looking for profile with userId:', userId);
    
    // Find profile in database
    const profile = await Profile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ 
        success: false,
        error: 'Profile not found' 
      });
    }
    
    console.log('✅ Profile found:', profile);
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('❌ Profile fetch error:', error);
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
})

router.post('/onboarding', async (req, res) => {
  try {
    console.log('📝 Received onboarding data:', req.body);
    
    const { 
      userId, 
      userType, 
      email,
      fullName,
      location,
      // Client fields
      company,
      role,
      goals,
      budget,
      timeline,
      industry,
      // Coach fields
      title,
      specialties,
      industries,
      coachExperience,
      hourlyRate,
      // Any other fields from the questionnaire
      ...otherData 
    } = req.body;
    
    // Validation
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        error: 'User ID is required' 
      });
    }
    
    if (!userType || !['coach', 'client'].includes(userType)) {
      return res.status(400).json({ 
        success: false,
        error: 'Valid user type (coach or client) is required' 
      });
    }
    
    if (!fullName || !email) {
      return res.status(400).json({ 
        success: false,
        error: 'Full name and email are required' 
      });
    }
    
    // Prepare profile data based on user type
    let profileData = {
      userId,
      userType,
      email,
      fullName,
      location,
      onboardingComplete: true,
      profileComplete: false, // They still need to complete their full profile later
      ...otherData
    };
    
    // Add role-specific data
    if (userType === 'client') {
      profileData = {
        ...profileData,
        company,
        role,
        goals: goals || [],
        budget,
        timeline,
        industry,
        clientExperience: otherData.experience
      };
      
      // Validate client-specific required fields
      if (!goals || goals.length === 0) {
        return res.status(400).json({ 
          success: false,
          error: 'At least one coaching goal is required' 
        });
      }
      
    } else if (userType === 'coach') {
      profileData = {
        ...profileData,
        title,
        specialties: specialties || [],
        industries: industries || [],
        coachExperience,
        hourlyRate
      };
      
      // Validate coach-specific required fields
      if (!specialties || specialties.length === 0) {
        return res.status(400).json({ 
          success: false,
          error: 'At least one specialty is required' 
        });
      }
    }
    
    // Create or update the profile
    const profile = await Profile.findOneAndUpdate(
      { userId },
      profileData,
      { 
        new: true,        // Return updated document
        upsert: true,     // Create if doesn't exist
        runValidators: true
      }
    );
    
    console.log('✅ Profile created/updated successfully:', profile);
    
    // Return success with user type for frontend routing
    res.status(201).json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        profile,
        userType,
        redirectTo: userType === 'coach' ? '/dashboard/coach' : '/dashboard/client'
      }
    });
    
  } catch (error) {
    console.error('❌ Onboarding error:', error);
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to complete onboarding',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET route to check if user has completed onboarding
router.get('/onboarding-status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const profile = await Profile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ 
        success: false,
        error: 'Profile not found',
        onboardingComplete: false
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        onboardingComplete: profile.onboardingComplete,
        userType: profile.userType,
        profileComplete: profile.profileComplete
      }
    });
    
  } catch (error) {
    console.error('❌ Onboarding status check error:', error);
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to check onboarding status'
    });
  }
});



module.exports = router;