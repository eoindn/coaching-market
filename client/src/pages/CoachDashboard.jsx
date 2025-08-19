import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { 
  User, 
  LogOut, 
  Bell, 
  Search, 
  Plus, 
  Calendar, 
  MessageCircle, 
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  Eye,
  Filter,
  MoreVertical
} from "lucide-react"

function CoachDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // Mock user data - replace with real auth context
  const user = {
    name: "Marcus Thompson",
    email: "marcus@coachingexcellence.com",
    title: "Executive Business Coach",
    avatar: null,
    rating: 4.9,
    reviews: 47
  }

  // Mock data for coach dashboard
  const stats = [
    { label: "Active Clients", value: "12", icon: Users, color: "blue" },
    { label: "This Month Revenue", value: "$8,400", icon: DollarSign, color: "green" },
    { label: "Sessions This Week", value: "18", icon: Calendar, color: "purple" },
    { label: "Average Rating", value: "4.9", icon: Star, color: "yellow" }
  ]

  const upcomingSessions = [
    {
      id: 1,
      client: "Sarah Johnson",
      company: "TechCorp Inc.",
      topic: "Leadership Development",
      time: "Today, 2:00 PM",
      duration: "60 min",
      type: "video",
      status: "confirmed"
    },
    {
      id: 2,
      client: "David Rodriguez",
      company: "FinanceForward",
      topic: "Strategic Planning",
      time: "Today, 4:00 PM",
      duration: "45 min",
      type: "phone",
      status: "confirmed"
    },
    {
      id: 3,
      client: "Jennifer Walsh",
      company: "Healthcare Innovations",
      topic: "Team Management",
      time: "Tomorrow, 10:00 AM",
      duration: "60 min",
      type: "video",
      status: "pending"
    }
  ]

  const clientRequests = [
    {
      id: 1,
      client: "Anonymous",
      title: "Need help with team management",
      description: "Looking for guidance on managing a diverse team of 15 people in a fast-paced startup environment...",
      budget: "$200-300/hour",
      timeline: "ASAP",
      posted: "2 hours ago",
      proposals: 5,
      match: 95
    },
    {
      id: 2,
      client: "Anonymous",
      title: "Executive presence coaching",
      description: "Senior director looking to improve presence in C-suite meetings and board presentations...",
      budget: "$300+/hour",
      timeline: "Within 2 weeks",
      posted: "5 hours ago",
      proposals: 3,
      match: 88
    },
    {
      id: 3,
      client: "Anonymous",
      title: "Career transition guidance",
      description: "VP looking to transition from finance to tech industry. Need strategic career planning...",
      budget: "$250-350/hour",
      timeline: "Within 1 month",
      posted: "1 day ago",
      proposals: 7,
      match: 82
    }
  ]

  const recentMessages = [
    {
      id: 1,
      client: "Sarah Johnson",
      message: "Thank you for yesterday's session. The framework you shared was incredibly helpful...",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      client: "David Rodriguez",
      message: "Can we reschedule tomorrow's meeting to 3 PM instead?",
      time: "4 hours ago",
      unread: true
    },
    {
      id: 3,
      client: "Jennifer Walsh",
      message: "I've completed the action items from our last session. Ready to discuss next steps.",
      time: "1 day ago",
      unread: false
    }
  ]

  const handleLogout = () => {
    // Add logout logic here
    navigate("/")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMatchColor = (match) => {
    if (match >= 90) return "text-green-600 bg-green-100"
    if (match >= 80) return "text-blue-600 bg-blue-100"
    return "text-orange-600 bg-orange-100"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CoachConnect
            </Link>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search clients, requests, or resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.title}</div>
                  </div>
                </button>

                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="flex items-center mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-500">{user.rating} ({user.reviews} reviews)</span>
                      </div>
                    </div>
                    <Link to="/profile/coach" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-3" />
                      View Public Profile
                    </Link>
                    <Link to="/pages/ProfileSettings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Calendar className="w-4 h-4 mr-3" />
                      Account Settings
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, {user.name.split(' ')[0]}! 🌟
          </h1>
          <p className="text-gray-600">Ready to make an impact on your clients' growth today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "sessions", label: "Sessions" },
              { id: "requests", label: "New Requests" },
              { id: "clients", label: "My Clients" },
              { id: "analytics", label: "Analytics" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Plus className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Add Availability</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Message Clients</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">View Analytics</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Sessions</h3>
                  <div className="space-y-4">
                    {upcomingSessions.filter(session => session.time.includes("Today")).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {session.client.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{session.client}</div>
                            <div className="text-sm text-gray-500">{session.topic} • {session.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{session.time.split(', ')[1]}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">New Client Requests</h3>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm">Filter</span>
                    </button>
                  </div>
                </div>

                {clientRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{request.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(request.match)}`}>
                            {request.match}% match
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{request.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Budget: {request.budget}</span>
                          <span>Timeline: {request.timeline}</span>
                          <span>Posted: {request.posted}</span>
                          <span>{request.proposals} proposals</span>
                        </div>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Submit Proposal
                      </button>
                      <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Save for Later
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                <Link to="/messages" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
              </div>
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg border ${message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900 text-sm">{message.client}</div>
                      <div className="text-xs text-gray-500">{message.time}</div>
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">{message.message}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sessions Completed</span>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Revenue Generated</span>
                  <span className="font-semibold text-green-600">$8,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Client Satisfaction</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-semibold text-gray-900">98%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Profile Views</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">This Week</span>
                  <span className="font-bold text-2xl">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Profile Strength</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="w-full bg-blue-800 rounded-full h-2 mt-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              <Link 
                to="/profile/coach"
                className="inline-block w-full text-center bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors mt-4"
              >
                Optimize Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoachDashboard