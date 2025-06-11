import React from 'react'
import { Calendar, Award, BookOpen, Target, Edit } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Profile: React.FC = () => {
  const { profile } = useUser()

  const stats = [
    { label: 'Points', value: profile?.points || 0, icon: Award, color: 'text-purple-600' },
    { label: 'Streak', value: `${profile?.streak || 0} days`, icon: Target, color: 'text-green-600' },
    { label: 'Posts Read', value: '127', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Quizzes Taken', value: '43', icon: Target, color: 'text-orange-600' }
  ]

  const achievements = [
    { title: 'First Quiz', description: 'Completed your first quiz', icon: '🎯', earned: true },
    { title: 'Week Streak', description: 'Maintained a 7-day learning streak', icon: '🔥', earned: true },
    { title: 'Knowledge Seeker', description: 'Read 100 educational posts', icon: '📚', earned: true },
    { title: 'Quiz Master', description: 'Scored 90%+ on 10 quizzes', icon: '🏆', earned: false },
    { title: 'Social Learner', description: 'Joined your first team', icon: '👥', earned: false },
    { title: 'Month Streak', description: 'Maintained a 30-day learning streak', icon: '⭐', earned: false }
  ]

  const interests = [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Quantum Physics',
    'Neuroscience'
  ]

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex items-end space-x-4 -mt-16">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800">
              <span className="text-white font-bold text-2xl">
                {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.full_name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">@{profile.username}</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            Joined {new Date(profile.created_at).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interests */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed quiz on Neural Networks</p>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Read article about Quantum Computing</p>
              <span className="text-xs text-gray-500">5h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Earned 10 points from quiz</p>
              <span className="text-xs text-gray-500">1d ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.earned
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </span>
                <div>
                  <h3 className={`font-semibold ${
                    achievement.earned 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.earned 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile