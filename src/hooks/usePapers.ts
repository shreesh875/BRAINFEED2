import { useState, useEffect } from 'react'

interface Paper {
  id: string
  type: 'research'
  title: string
  description: string
  author: {
    name: string
    avatar: string
    handle: string
  }
  thumbnail: string
  url?: string
  tags: string[]
  likes: number
  comments: number
  timeAgo: string
  year?: number
  citationCount?: number
  interest: string
}

// Mock research papers data
const mockPapers: Paper[] = [
  {
    id: 'paper-1',
    type: 'research',
    title: 'Attention Is All You Need',
    description: 'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    author: {
      name: 'Ashish Vaswani',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@neurips'
    },
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://arxiv.org/abs/1706.03762',
    tags: ['Machine Learning', 'Deep Learning', 'NLP'],
    likes: 1247,
    comments: 89,
    timeAgo: '3h ago',
    year: 2017,
    citationCount: 45000,
    interest: 'Machine Learning'
  },
  {
    id: 'paper-2',
    type: 'research',
    title: 'Deep Residual Learning for Image Recognition',
    description: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.',
    author: {
      name: 'Kaiming He',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@cvpr'
    },
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://arxiv.org/abs/1512.03385',
    tags: ['Computer Vision', 'Deep Learning', 'CNN'],
    likes: 892,
    comments: 67,
    timeAgo: '5h ago',
    year: 2015,
    citationCount: 120000,
    interest: 'Computer Science'
  },
  {
    id: 'paper-3',
    type: 'research',
    title: 'Quantum Supremacy Using a Programmable Superconducting Processor',
    description: 'We report the use of a processor with programmable superconducting qubits to create quantum states on 53 qubits, corresponding to a computational state-space of dimension 2^53.',
    author: {
      name: 'Frank Arute',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@nature'
    },
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.nature.com/articles/s41586-019-1666-5',
    tags: ['Quantum Computing', 'Physics', 'Superconducting'],
    likes: 634,
    comments: 45,
    timeAgo: '8h ago',
    year: 2019,
    citationCount: 2500,
    interest: 'Physics'
  },
  {
    id: 'paper-4',
    type: 'research',
    title: 'CRISPR-Cas9 Structures and Mechanisms',
    description: 'The CRISPR-Cas9 system has emerged as a powerful tool for genome editing in research and therapeutic applications.',
    author: {
      name: 'Jennifer Doudna',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@science'
    },
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.science.org/doi/10.1126/science.1225829',
    tags: ['Biology', 'Genetics', 'CRISPR'],
    likes: 756,
    comments: 52,
    timeAgo: '12h ago',
    year: 2012,
    citationCount: 8500,
    interest: 'Biology'
  },
  {
    id: 'paper-5',
    type: 'research',
    title: 'The Economic Impact of Climate Change',
    description: 'This paper examines the economic consequences of climate change across different sectors and regions, providing insights for policy makers.',
    author: {
      name: 'William Nordhaus',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@economics'
    },
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Economics', 'Climate Science', 'Policy'],
    likes: 423,
    comments: 31,
    timeAgo: '1d ago',
    year: 2018,
    citationCount: 1200,
    interest: 'Economics'
  }
]

export const usePapers = () => {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPapers = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get user interests from localStorage
      const savedInterests = localStorage.getItem('brainfeed-interests')
      const userInterests = savedInterests ? JSON.parse(savedInterests) : []
      
      // Filter papers based on user interests
      let filteredPapers = mockPapers
      if (userInterests.length > 0) {
        filteredPapers = mockPapers.filter(paper => 
          userInterests.some((interest: string) => 
            paper.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())) ||
            paper.interest.toLowerCase().includes(interest.toLowerCase())
          )
        )
      }
      
      // Shuffle papers for variety
      const shuffledPapers = filteredPapers.sort(() => Math.random() - 0.5)
      
      setPapers(shuffledPapers)
    } catch (err: any) {
      console.error('Error fetching papers:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
  }, [])

  return {
    papers,
    loading,
    error,
    refetch: fetchPapers
  }
}