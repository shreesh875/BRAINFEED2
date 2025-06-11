import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const SEMANTIC_SCHOLAR_API_KEY = 'Eig1SjMOPd1wbMqXoizgd5zdK9r4waAra66nCVuz';
const PAPERS_PER_INTEREST = 2;

async function fetchPapersForInterest(interest: string) {
  try {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(interest)}&limit=${PAPERS_PER_INTEREST}&fields=title,abstract,url,year,authors,tldr,venue,citationCount`,
      {
        headers: {
          'x-api-key': SEMANTIC_SCHOLAR_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch papers: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching papers for ${interest}:`, error);
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Get user's interests
    const { data: userInterests, error: interestsError } = await supabase
      .from('user_interests')
      .select('interests(name)')
      .eq('user_id', user.id);

    if (interestsError) {
      throw new Error('Failed to fetch user interests');
    }

    const interests = userInterests.map((ui: any) => ui.interests.name);
    const papers = [];

    // Fetch papers for each interest with rate limiting
    for (const interest of interests) {
      const interestPapers = await fetchPapersForInterest(interest);
      papers.push(...interestPapers.map((paper: any) => ({
        id: paper.paperId || `${interest}-${Math.random()}`,
        type: 'research',
        title: paper.title,
        description: paper.abstract || paper.tldr?.text || 'No abstract available',
        author: {
          name: paper.authors?.[0]?.name || 'Unknown Author',
          avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
          handle: `@${paper.venue || 'research'}`
        },
        thumbnail: `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800`,
        url: paper.url,
        tags: [interest, 'Research Paper', paper.venue || 'Academic'].filter(Boolean),
        likes: Math.floor(Math.random() * 100) + 10,
        comments: Math.floor(Math.random() * 20) + 1,
        timeAgo: `${Math.floor(Math.random() * 24) + 1}h ago`,
        year: paper.year,
        citationCount: paper.citationCount || 0,
        interest
      })));
      
      // Rate limiting: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Shuffle papers to mix different interests
    const shuffledPapers = papers.sort(() => Math.random() - 0.5);

    return new Response(
      JSON.stringify({ papers: shuffledPapers }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in papers function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});