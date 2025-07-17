"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/app/blog/data"
import { renderIcon } from "@/utils/renderIcon"
import "@/app/blog/styles/blog.css"

export default function BlogPostPage({ params }) {
  const { slug } = params
  const post = blogPosts.find((p) => p.slug === slug)

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      date: "July 16, 2024",
      content: "Great insights into the Dubai market! Very helpful for new investors.",
    },
    {
      id: 2,
      author: "Jane Smith",
      date: "July 17, 2024",
      content:
        "I appreciate the detailed breakdown of family-friendly communities. This will definitely help my relocation plans.",
    },
  ])
  const [newComment, setNewComment] = useState({ name: "", email: "", comment: "" })

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.name && newComment.comment) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: newComment.name,
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          content: newComment.comment,
        },
      ])
      setNewComment({ name: "", email: "", comment: "" })
    }
  }

  // For social sharing, get the current URL dynamically on the client side
  const [postUrl, setPostUrl] = useState("")
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPostUrl(window.location.href)
    }
  }, [])

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-container" style={{ textAlign: "center", padding: "50px" }}>
          <h2>Blog Post Not Found</h2>
          <p>The article you are looking for does not exist.</p>
          <Link href="/blog" style={{ color: "#cba135", textDecoration: "underline" }}>
            Go back to blog list
          </Link>
        </div>
        {/* Blog Footer */}
        <footer className="blog-footer">
          <p>&copy; {new Date().getFullYear()} Signature Space. All rights reserved.</p>
        </footer>
      </div>
    )
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const shareText = encodeURIComponent(`Check out this article: ${post.title}`)
  const encodedShareUrl = encodeURIComponent(postUrl)

  // Filter related posts
  const filteredRelatedPosts = blogPosts.filter((p) => p.slug !== slug)
  const shuffledRelated = filteredRelatedPosts.sort(() => 0.5 - Math.random())
  const relatedPosts = shuffledRelated.slice(0, 3) // Get up to 3 related posts

  return (
    <div className="blog-page">
      <div className="blog-container">
        {/* Individual Blog Post Content */}
        <div className="individual-blog-post">
          <h1>{post.title}</h1>
          <div className="individual-blog-post-meta">
            <span>
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={24}
                height={24}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              By {post.author.name}
            </span>
            <span>
              {renderIcon("Calendar", { width: 18, height: 18 })}
              {formattedDate}
            </span>
            <span>
              {renderIcon("Clock", { width: 18, height: 18 })}
              {post.readTime}
            </span>
            {post.categories.map((category) => (
              <span
                key={category}
                className="blog-post-card-category"
                style={{
                  backgroundColor: "#e0e0e0",
                  color: "#555",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                }}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="individual-blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Call to Action */}
          <div className="blog-cta">
            <h3>Ready to find your dream property?</h3>
            <p>Contact Signature Space today for expert guidance and personalized property solutions.</p>
            <button>Contact Us Now!</button>
          </div>

          {/* Social Share Buttons */}
          <div className="social-share-buttons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              {renderIcon("Facebook", { width: 20, height: 20 })}
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedShareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              {renderIcon("Twitter", { width: 20, height: 20 })}
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              {renderIcon("Linkedin", { width: 20, height: 20 })}
            </a>
            <a href={`mailto:?subject=${shareText}&body=${encodedShareUrl}`} aria-label="Share via Email">
              {renderIcon("MessageSquare", { width: 20, height: 20 })}
            </a>
            <a
              href={`whatsapp://send?text=${shareText} ${encodedShareUrl}`}
              data-action="share/whatsapp/share"
              aria-label="Share via WhatsApp"
            >
              {renderIcon("Whatsapp", { width: 20, height: 20 })}
            </a>
            <button onClick={() => navigator.clipboard.writeText(postUrl)} aria-label="Copy link">
              {renderIcon("Share2", { width: 20, height: 20 })}
            </button>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h3>Comments ({comments.length})</h3>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Write your comment..."
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                required
              ></textarea>
              <input
                type="text"
                placeholder="Your Name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email (optional)"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
              />
              <button type="submit">Post Comment</button>
            </form>
            <div className="comment-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-date">{comment.date}</p>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="related-posts-section">
              <h3>Related Articles</h3>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug} className="blog-post-card">
                    <Image
                      src={relatedPost.featuredImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      width={300}
                      height={150}
                      className="blog-post-card-image"
                    />
                    <div className="blog-post-card-content">
                      <h2>{relatedPost.title}</h2>
                      <p className="blog-post-card-excerpt">{relatedPost.excerpt.substring(0, 80)}...</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Footer */}
      <footer className="blog-footer">
        <p>&copy; {new Date().getFullYear()} Signature Space. All rights reserved.</p>
      </footer>
    </div>
  )
}
