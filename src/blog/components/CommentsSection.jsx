"use client"

import { useState } from "react"

export default function CommentsSection() {
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

  const handleSubmit = (e) => {
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

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>
      <form onSubmit={handleSubmit}>
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
  )
}
