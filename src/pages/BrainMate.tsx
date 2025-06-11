import React, { useState } from "react";

const BrainMate: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setLoading(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">BrainMate</h1>
        <p className="text-gray-600 dark:text-gray-400">Your AI learning companion</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Connecting to BrainMate...</p>
          </div>
        )}

        {isConnected && !loading ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🧠</span>
            </div>
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-300 font-medium">
                🎉 Connected to BrainMate! This is a demo version.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Demo Mode Active
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              In the full version, you would be able to have real-time video conversations with your AI learning companion.
            </p>
            <button
              onClick={handleDisconnect}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🧠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Your AI Learning Companion
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              BrainMate is here to help you understand complex topics, answer your questions, and guide your learning journey.
            </p>
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                <strong>Demo Mode:</strong> This is a demonstration version. The full version would include real-time video conversations with AI.
              </p>
            </div>
            <button
              onClick={handleConnect}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Start Demo Conversation
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Learning</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ask questions and get instant explanations on any topic
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized Help</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get explanations tailored to your learning level and interests
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get immediate help when you're stuck on a concept
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrainMate;