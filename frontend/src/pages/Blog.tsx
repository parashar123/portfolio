import { useEffect, useState } from 'react'

type Post = { slug: string; title: string; excerpt: string; published_at?: string }

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Placeholder: fetch from backend when endpoints are ready
    setTimeout(() => {
      setPosts([
        { slug: 'scaling-ml-observability', title: 'Scaling ML Observability', excerpt: 'How to monitor models at scale with practical patterns.', published_at: '2025-09-10' },
        { slug: 'cost-optimizations-that-stick', title: 'Cost optimizations that stick', excerpt: 'A simple framework to reduce cloud spend without slowing teams.' }
      ])
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold mb-6">Blog</h1>
      {loading ? (
        <p className="text-gray-400">Loading posts…</p>
      ) : (
        <div className="space-y-6">
          {posts.map(p => (
            <article key={p.slug} className="p-5 rounded-lg border border-gray-700 hover:border-cyan-400 transition">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{p.published_at ?? 'Draft'}</p>
              <p className="mt-3 text-gray-200">{p.excerpt}</p>
              <div className="mt-4 flex gap-3 text-sm">
                <a className="text-cyan-400 hover:underline" href={`/blog/${p.slug}`}>Read →</a>
                <button className="text-gray-400 hover:text-white" onClick={() => navigator.share?.({ title: p.title, url: `/blog/${p.slug}` })}>Share</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}


