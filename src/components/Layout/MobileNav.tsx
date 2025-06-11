import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BarChart3, User, MessageCircle } from 'lucide-react'

const MobileNav: React.FC = () => {
  const navItems = [
    { to: '/feed', icon: Home, label: 'Home' },
    { to: '/leaderboard', icon: BarChart3, label: 'Leaderboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/brainmate', icon: MessageCircle, label: 'BrainMate' },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default MobileNav