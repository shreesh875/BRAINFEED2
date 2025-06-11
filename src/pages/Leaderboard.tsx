import React, { useState } from 'react'
import { Trophy, Medal, Award, Clock } from 'lucide-react'

const mockLeaderboard = [
  {
    id: '1',
    name: 'James Wilson',
    username: '@quantum_master',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 875,
    streak: 12,
    rank: 1
  },
  {
    id: '2',
    name: 'Emma Davis',
    username: '@neuroscientist',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 743,
    streak: 8,
    rank: 2
  },
  {
    id: '3',
    name: 'David Zhang',
    username: '@ai_researcher',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 691,
    streak: 15,
    rank: 3
  },
  {
    id: '4',
    name: 'Sarah Kim',
    username: '@data_scientist',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 634,
    streak: 6,
    rank: 4
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    username: '@physics_pro',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    points: 587,
    streak: 9,
    rank: 5
  }
]

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'regional' | 'friends'>('global')

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</div>
    }
  }

  const tabs = [
    { id: 'global', label: 'Global', icon: '🌍' },
    { id: 'regional', label: 'Regional', icon: '📍' },
    { id: 'friends', label: 'Friends', icon: '👥' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">See how you rank against other learners</p>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          Resets in 12:34:56
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Learners</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
      </div>

      {/* Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockLeaderboard.map((user, index) => (
            <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(user.rank)}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{user.points} pts</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{user.streak} streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position */}
      <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              #42
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Your Position</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Keep learning to climb higher!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">245 pts</p>
            <p className="text-sm text-purple-500 dark:text-purple-400">3 day streak</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard