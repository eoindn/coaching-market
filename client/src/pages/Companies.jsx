import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building, Briefcase, Target, DollarSign, Calendar, CheckCircle, Star, Users, TrendingUp, MapPin, Globe, Hash } from 'lucide-react';

function CompanyProfile() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        industry: '',
        size: '',
        location: '',
        website: '',
        goals: [],
        budget: '',
        timeline: ''
    });

    const goalOptions = [
        { name: 'Increase Revenue', icon: 'DollarSign' },
        { name: 'Expand Market Share', icon: 'TrendingUp' },
        { name: 'Improve Customer Satisfaction', icon: 'CheckCircle' },
        { name: 'Enhance Brand Awareness', icon: 'Target' },
        { name: 'Develop New Products', icon: 'Target' },
        { name: 'Optimize Operations', icon: 'Target' },
        { name: 'Strengthen Team Collaboration', icon: 'Users' },
        { name: 'Boost Employee Engagement', icon: 'Users' },
        { name: 'Increase Online Presence', icon: 'TrendingUp' },
        { name: 'Improve Financial Performance', icon: 'DollarSign' }
    ];

    const industryOptions = [
        'Technology',
        'Finance',
        'Healthcare',
        'Education',
        'Retail',
        'Manufacturing',
        'Hospitality',
        'Real Estate',
        'Transportation',
        'Energy',
        'Telecommunications',
        'Non-Profit',
        'Government',
        'Entertainment',
        'Construction',
        'Agriculture',
        'Legal',
        'Consulting',
        'Marketing',
        'Media',
        'Pharmaceuticals',
        'Biotechnology',
        'Aerospace',
        'Automotive',
        'Food and Beverage',
        'Fashion',
        'Sports',
        'Travel and Tourism',
        'Logistics',
        'Information Technology'
    ];

    const benefits = [
        "Expert coaches matched to your industry and business needs",
        "Proven strategies that drive measurable business results",
        "Flexible coaching programs that scale with your company",
        "Confidential business coaching with industry expertise"
    ];

    const stats = [
        { number: "300+", label: "Companies Coached" },
        { number: "92%", label: "Revenue Growth" },
        { number: "20+", label: "Industries Served" }
    ];

    const handleGoalToggle = (goal) => {
        setFormData(prev => ({
            ...prev,
            goals: prev.goals.includes(goal)
                ? prev.goals.filter(g => g !== goal)
                : [...prev.goals, goal]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const getIcon = (iconName) => {
        const iconMap = {
            Users: Users,
            Target: Target,
            TrendingUp: TrendingUp,
            CheckCircle: CheckCircle,
            DollarSign: DollarSign
        };
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className="w-5 h-5 mr-3" /> : <Target className="w-5 h-5 mr-3" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 pt-20">
            {/* Navigation */}
            <div className='navbar font-semibold text-lg bg-white shadow-sm fixed top-0 left-0 right-0 z-10'>
                <div className='nav-logo pt-6 pb-6 pl-10'>
                    <div onClick={() => window.location.href = "/"}>
                        <h2 className="text-2xl font-bold text-blue-600 cursor-pointer">
                            CoachConnect
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
                    {/* Left Side - Form */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-xl p-10"
                        >
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Business Coach</h1>
                                <p className="text-xl text-gray-600">Tell us about your company and business goals, and we'll match you with the perfect business coach.</p>
                            </div>
                            
                            <div className="space-y-8">
                                {/* Company Information Section */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Company Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                                <Building className="w-4 h-4 mr-2 text-blue-500" />
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter your company name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                                <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                                                Industry
                                            </label>
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select your industry</option>
                                                {industryOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                                <Hash className="w-4 h-4 mr-2 text-blue-500" />
                                                Company Size
                                            </label>
                                            <select
                                                value={formData.size}
                                                onChange={(e) => setFormData({...formData, size: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select company size</option>
                                                <option value="1-10">1-10 employees</option>
                                                <option value="11-50">11-50 employees</option>
                                                <option value="51-200">51-200 employees</option>
                                                <option value="201-500">201-500 employees</option>
                                                <option value="500+">500+ employees</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="City, State/Country"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <Globe className="w-4 h-4 mr-2 text-blue-500" />
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="https://yourcompany.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <Building className="w-4 h-4 mr-2 text-blue-500" />
                                            Company Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            rows="4"
                                            placeholder="Brief description of your company and what you do"
                                        />
                                    </div>
                                </div>

                                {/* Business Goals Section */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                                        <Target className="w-5 h-5 mr-2 text-blue-500" />
                                        Business Goals
                                    </h3>
                                    <p className="text-gray-600">Select all areas where you'd like business coaching support:</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {goalOptions.map(goal => (
                                            <motion.button
                                                key={goal.name}
                                                type="button"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleGoalToggle(goal.name)}
                                                className={`p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center ${
                                                    formData.goals.includes(goal.name)
                                                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                                                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
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
                                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Coaching Preferences</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                                <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                                                Budget Range
                                            </label>
                                            <select
                                                value={formData.budget}
                                                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select budget range</option>
                                                <option value="1000-2500">$1,000-2,500/month</option>
                                                <option value="2500-5000">$2,500-5,000/month</option>
                                                <option value="5000-10000">$5,000-10,000/month</option>
                                                <option value="10000+">$10,000+/month</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                                Timeline
                                            </label>
                                            <select
                                                value={formData.timeline}
                                                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 text-lg font-semibold shadow-lg"
                                >
                                    Find My Business Coach
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
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose CoachConnect?</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                            className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                                        >
                                            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                            <div className="text-gray-700 font-medium">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Your Business Gets</h3>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <blockquote className="text-lg mb-4">
                                    "Our business coach from CoachConnect helped us increase revenue by 40% in just 6 months. The strategic guidance was invaluable."
                                </blockquote>
                                <div className="font-semibold">Michael Chen</div>
                                <div className="text-blue-200">CEO, InnovateTech Solutions</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyProfile;