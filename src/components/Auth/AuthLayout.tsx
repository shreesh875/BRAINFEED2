import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  features: Array<{
    title: string
    description: string
  }>
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, features }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center max-w-md">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">💡</span>
            </div>
            <span className="ml-3 text-2xl font-bold">BrainFeed</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-lg text-purple-100 mb-12">{subtitle}</p>
          
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-purple-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout