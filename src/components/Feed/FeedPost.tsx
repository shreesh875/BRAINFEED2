import React, { useState } from 'react'
import { Heart, MessageCircle, Bookmark, Share, Play, ExternalLink } from 'lucide-react'

interface FeedPostProps {
  post: {
    id: string
    type: 'video' | 'article' | 'research'
    title: string
    description: string
    author: {
      name: string
      avatar: string
      handle: string
    }
    thumbnail?: string
    url?: string
    tags: string[]
    likes: number
    comments: number
    timeAgo: string
    isLiked?: boolean
    isSaved?: boolean
  }
  onQuizTrigger?: () => void
}

const FeedPost: React.FC<FeedPostProps> = ({ post, onQuizTrigger }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const getTypeIcon = () => {
    switch (post.type) {
      case 'video':
        return <Play className="h-4 w-4" />
      case 'research':
        return <ExternalLink className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (post.type) {
      case 'video':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      case 'research':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    }
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{post.author.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.timeAgo} • <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
                {getTypeIcon()}
                <span className="ml-1">{post.type}</span>
              </span>
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            {post.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              isLiked
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            className={`text-sm font-medium transition-colors ${
              isSaved
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <Share className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default FeedPost