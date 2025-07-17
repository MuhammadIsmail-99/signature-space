import Image from "next/image"
import Link from "next/link"
import { renderIcon } from "@/utils/renderIcon"

export default function BlogPostCard({ post }) {
  const { slug, title, excerpt, featuredImage, author, publishDate, readTime, categories } = post

  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/blog/${slug}`} className="blog-post-card">
      <Image
        src={featuredImage || "/placeholder.svg"}
        alt={title}
        width={400}
        height={200}
        className="blog-post-card-image"
      />
      <div className="blog-post-card-content">
        <div className="blog-post-card-categories">
          {categories.map((category) => (
            <span key={category} className="blog-post-card-category">
              {category}
            </span>
          ))}
        </div>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <div className="blog-post-card-meta">
          <div className="blog-post-card-author">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={30}
              height={30}
              className="blog-post-card-author-img"
            />
            <span>{author.name}</span>
          </div>
          <div className="blog-post-card-read-time">
            {renderIcon("Clock", { width: 16, height: 16 })}
            <span>{readTime}</span>
          </div>
          <div className="blog-post-card-date">
            {renderIcon("Calendar", { width: 16, height: 16 })}
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
