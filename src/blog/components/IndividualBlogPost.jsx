import Image from "next/image"
import { renderIcon } from "@/utils/renderIcon"

export default function IndividualBlogPost({ post }) {
  if (!post) {
    return <div className="individual-blog-post">Post not found.</div>
  }

  const { title, author, publishDate, readTime, content, categories } = post

  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="individual-blog-post">
      <h1>{title}</h1>
      <div className="individual-blog-post-meta">
        <span>
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            width={24}
            height={24}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          By {author.name}
        </span>
        <span>
          {renderIcon("Calendar", { width: 18, height: 18 })}
          {formattedDate}
        </span>
        <span>
          {renderIcon("Clock", { width: 18, height: 18 })}
          {readTime}
        </span>
        {categories.map((category) => (
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
      <div className="individual-blog-post-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
