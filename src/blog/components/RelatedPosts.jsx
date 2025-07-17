import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/app/blog/data"

export default function RelatedPosts({ currentPostSlug, count = 3 }) {
  const filteredPosts = blogPosts.filter((post) => post.slug !== currentPostSlug)
  const shuffled = filteredPosts.sort(() => 0.5 - Math.random())
  const related = shuffled.slice(0, count)

  if (related.length === 0) {
    return null
  }

  return (
    <div className="related-posts-section">
      <h3>Related Articles</h3>
      <div className="related-posts-grid">
        {related.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-post-card">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              width={300}
              height={150}
              className="blog-post-card-image"
            />
            <div className="blog-post-card-content">
              <h2>{post.title}</h2>
              <p className="blog-post-card-excerpt">{post.excerpt.substring(0, 80)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
