import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BarChart3, User, Moon, Sun, LogOut, MessageCircle } from 'lucide-react'
import { useUser } from '../../contexts/UserContext'
import { useTheme } from '../../contexts/ThemeContext'

const Sidebar: React.FC = () => {
  const { profile, signOut } = useUser()
  const { isDark, toggleTheme } = useTheme()

  const navItems = [
    { to: '/feed', icon: Home, label: 'Home' },
    { to: '/leaderboard', icon: BarChart3, label: 'Leaderboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/brainmate', icon: MessageCircle, label: 'BrainMate' },
  ]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💡</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">BrainFeed</span>
          </div>
        </div>

        {/* User Profile */}
        {profile && (
          <div className="flex items-center px-4 py-4 mt-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{profile.full_name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">@{profile.username}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="flex-shrink-0 px-2 py-4 space-y-1">
          <button
            onClick={toggleTheme}
            className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={signOut}
            className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar