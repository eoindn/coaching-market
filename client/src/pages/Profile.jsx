import React, { useState } from 'react';
import { motion } from 'framer-motion';

function BusinessCoachProfile() {
  const [profileData, setProfileData] = useState({
    // Personal Info
    fullName: 'Marcus Thompson',
    title: 'Executive Business Coach & Leadership Strategist',
    tagline: 'Transforming ambitious leaders into visionary executives',
    location: 'San Francisco, CA',
    profilePicture: null,
    coverImage: null,
    
    // Professional Details
    experience: '12+ years',
    clients: '200+',
    successRate: '94%',
    rating: 4.9,
    reviews: 47,
    hourlyRate: '$300-500',
    
    // Bio & Description
    bio: `Passionate executive coach with over a decade of experience helping Fortune 500 leaders and emerging entrepreneurs unlock their full potential. I specialize in transformational leadership, strategic thinking, and building high-performance teams that drive exponential growth.

My coaching philosophy centers on authentic leadership and sustainable success. I've had the privilege of working with CEOs, VPs, and senior executives across tech, finance, and healthcare industries, helping them navigate complex challenges while maintaining their core values.`,
    
    // Skills & Specialties
    specialties: [
      'Executive Leadership',
      'Strategic Planning',
      'Team Building',
      'Performance Optimization',
      'Change Management',
      'Conflict Resolution',
      'Communication Skills',
      'Emotional Intelligence'
    ],
    
    // Industries
    industries: [
      'Technology',
      'Finance',
      'Healthcare',
      'Manufacturing',
      'Consulting',
      'Real Estate'
    ],
    
    // Contact & Social
    contactEmail: 'marcus@coachingexcellence.com',
    phone: '+1 (555) 123-4567',
    website: 'www.marcusthompsoncoaching.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/marcusthompson',
      twitter: 'https://twitter.com/marcuscoaches',
      instagram: 'https://instagram.com/marcusleadership'
    },
    
    // Certifications & Education
    certifications: [
      'ICF Professional Certified Coach (PCC)',
      'Certified Executive Coach (CEC)',
      'Leadership Circle Profile Practitioner',
      'Everything DiSC Certified'
    ],
    education: 'MBA in Organizational Leadership - Stanford University\nBS in Psychology - UC Berkeley',
    languages: ['English (Native)', 'Spanish (Conversational)', 'Mandarin (Basic)'],
    
    // Testimonials
    testimonials: [
      {
        text: "Marcus transformed not just my leadership style, but my entire approach to business. Revenue increased 40% in our first year working together.",
        author: "Sarah Chen",
        title: "CEO, TechFlow Solutions",
        rating: 5
      },
      {
        text: "His strategic insights and ability to cut through complexity helped me navigate the most challenging period of our company's growth.",
        author: "David Rodriguez",
        title: "VP Operations, FinanceForward",
        rating: 5
      },
      {
        text: "Marcus has an incredible gift for seeing potential and helping you realize it. My team's performance has never been stronger.",
        author: "Jennifer Walsh",
        title: "Director, Healthcare Innovations Inc.",
        rating: 5
      }
    ],
    
    // Recent Activity
    recentPosts: [
      {
        title: "5 Leadership Habits That Transform Company Culture",
        excerpt: "Great leaders don't just manage people—they inspire transformation...",
        date: "2 days ago",
        likes: 127,
        comments: 23
      },
      {
        title: "Why Most Strategic Plans Fail (And How to Fix Yours)",
        excerpt: "After reviewing hundreds of strategic plans, I've identified the 3 critical mistakes...",
        date: "1 week ago",
        likes: 89,
        comments: 15
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }));
    }
  };

  const tabs = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
    { id: 'activity', label: 'Activity', icon: '📝' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  const AboutTab = () => (
    <div className="space-y-6">
      {/* Bio Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">About</h3>
          {isEditing && (
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Edit
            </button>
          )}
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {profileData.bio}
        </p>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Specialties</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {profileData.specialties.map((specialty, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium text-center">
              {specialty}
            </div>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Industries Served</h3>
        <div className="flex flex-wrap gap-3">
          {profileData.industries.map((industry, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
              {industry}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const ExperienceTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
          <div className="text-3xl font-bold">{profileData.experience}</div>
          <div className="text-blue-100">Experience</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
          <div className="text-3xl font-bold">{profileData.clients}</div>
          <div className="text-green-100">Clients Coached</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
          <div className="text-3xl font-bold">{profileData.successRate}</div>
          <div className="text-purple-100">Success Rate</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
          <div className="text-3xl font-bold">{profileData.rating}</div>
          <div className="text-orange-100">Average Rating</div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h3>
        <div className="space-y-3">
          {profileData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-800 font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {profileData.education}
        </p>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Languages</h3>
        <div className="flex flex-wrap gap-3">
          {profileData.languages.map((language, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const TestimonialsTab = () => (
    <div className="space-y-6">
      {profileData.testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-lg italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">{testimonial.title}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const ActivityTab = () => (
    <div className="space-y-6">
      {profileData.recentPosts.map((post, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {profileData.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold text-gray-900">{profileData.fullName}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h4>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>👍</span>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ContactTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📧</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{profileData.contactEmail}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">📞</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{profileData.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">🌐</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Website</div>
                <div className="font-medium text-blue-600">{profileData.website}</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">💼</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">LinkedIn</div>
                <div className="font-medium text-blue-600">View Profile</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <span className="text-sky-600">🐦</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Twitter</div>
                <div className="font-medium text-blue-600">@marcuscoaches</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-pink-600">📸</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Instagram</div>
                <div className="font-medium text-blue-600">@marcusleadership</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Leadership?</h3>
        <p className="mb-6 text-blue-100">
          Book a complimentary 30-minute discovery call to explore how we can unlock your potential.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Schedule Discovery Call
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab />;
      case 'experience':
        return <ExperienceTab />;
      case 'testimonials':
        return <TestimonialsTab />;
      case 'activity':
        return <ActivityTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return <AboutTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-4 border-white border-opacity-30">
                {profileData.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{profileData.fullName}</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-2">{profileData.title}</p>
              <p className="text-lg text-blue-200 mb-4">{profileData.tagline}</p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{profileData.rating} ({profileData.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💰</span>
                  <span>{profileData.hourlyRate}/hour</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Message
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}

export default BusinessCoachProfile;