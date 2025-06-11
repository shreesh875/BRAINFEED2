import React, { useState, useEffect } from 'react'
import FeedPost from '../components/Feed/FeedPost'
import QuizModal from '../components/Feed/QuizModal'

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    type: 'video' as const,
    title: 'Introduction to Neural Networks',
    description: 'A beginner-friendly overview of neural networks and their applications in modern AI systems.',
    author: {
      name: 'Dr. Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@alexchen'
    },
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Neural Networks', 'Deep Learning', 'AI Fundamentals'],
    likes: 342,
    comments: 47,
    timeAgo: '2h ago'
  },
  {
    id: '2',
    type: 'research' as const,
    title: 'Quantum Computing: A New Paradigm',
    description: 'Recent breakthroughs in quantum computing and their potential impact on cryptography and optimization problems.',
    author: {
      name: 'Prof. Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@sarahj'
    },
    thumbnail: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Quantum Physics', 'Computing', 'Research'],
    likes: 156,
    comments: 23,
    timeAgo: '14 ago'
  },
  {
    id: '3',
    type: 'article' as const,
    title: 'The Future of Renewable Energy',
    description: 'Exploring innovative solar and wind technologies that could revolutionize how we generate clean energy.',
    author: {
      name: 'Dr. Michael Torres',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@mtorres'
    },
    thumbnail: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Renewable Energy', 'Sustainability', 'Technology'],
    likes: 289,
    comments: 34,
    timeAgo: '1d ago'
  }
]

const mockQuizQuestion = {
  id: '1',
  question: 'What is the primary function of a neural network\'s activation function?',
  options: [
    'To store data in the network',
    'To introduce non-linearity and enable complex pattern recognition',
    'To reduce the size of the network',
    'To connect different layers'
  ],
  correctAnswer: 1,
  explanation: 'Activation functions introduce non-linearity into neural networks, allowing them to learn and represent complex patterns that linear functions cannot capture.'
}

const Feed: React.FC = () => {
  const [posts] = useState(mockPosts)
  const [viewedPosts, setViewedPosts] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    // Trigger quiz every 3 posts viewed
    if (viewedPosts > 0 && viewedPosts % 3 === 0) {
      setShowQuiz(true)
    }
  }, [viewedPosts])

  const handlePostView = () => {
    setViewedPosts(prev => prev + 1)
  }

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      setPoints(prev => prev + 10)
    }
  }

  const handleCloseQuiz = () => {
    setShowQuiz(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Feed</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover educational content tailored to your interests</p>
        {points > 0 && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full">
            <span className="font-semibold">Points: {points}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={post.id} onMouseEnter={() => index === viewedPosts && handlePostView()}>
            <FeedPost post={post} />
          </div>
        ))}
      </div>

      <QuizModal
        isOpen={showQuiz}
        onClose={handleCloseQuiz}
        question={mockQuizQuestion}
        onAnswer={handleQuizAnswer}
      />
    </div>
  )
}

export default Feed