"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { blogPosts, blogCategories } from "./data"
import { renderIcon } from "@/utils/renderIcon"
import "@/app/blog/styles/blog.css"

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
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

  const handleSearch = (e) => {
    e.preventDefault()
    // Filtering is handled by the `filteredPosts` variable
  }

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

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.categories.includes(activeCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="blog-page">
      {/* Blog Header/Hero Section */}
      <header className="blog-hero">
        <div className="blog-hero-content">
          <h1>Our Real Estate Insights</h1>
          <p>Stay informed with the latest trends, expert advice, and local market updates from Signature Space.</p>
          <form onSubmit={handleSearch} className="blog-search-bar">
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              {renderIcon("Search", { className: "icon" })}
              Search
            </button>
          </form>
        </div>
      </header>

      <div className="blog-container">
        {/* Category Filters */}
        <div className="blog-categories">
          {blogCategories.map((category) => (
            <button
              key={category}
              className={`blog-category-button ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Post Listing */}
        <div className="blog-post-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              return (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-post-card">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="blog-post-card-image"
                  />
                  <div className="blog-post-card-content">
                    <div className="blog-post-card-categories">
                      {post.categories.map((category) => (
                        <span key={category} className="blog-post-card-category">
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="blog-post-card-meta">
                      <div className="blog-post-card-author">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={30}
                          height={30}
                          className="blog-post-card-author-img"
                        />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="blog-post-card-read-time">
                        {renderIcon("Clock", { width: 16, height: 16 })}
                        <span>{post.readTime}</span>
                      </div>
                      <div className="blog-post-card-date">
                        {renderIcon("Calendar", { width: 16, height: 16 })}
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1", fontSize: "1.2em", color: "#666" }}>
              No posts found matching your criteria.
            </p>
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
