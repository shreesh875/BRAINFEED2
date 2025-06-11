import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="md:pl-64">
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default Layout