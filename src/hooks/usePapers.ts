import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

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

export const usePapers = () => {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPapers = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/papers`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch papers')
      }

      const data = await response.json()
      setPapers(data.papers || [])
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