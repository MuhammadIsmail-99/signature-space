"use client"
import { renderIcon } from "@/utils/renderIcon"

export default function SocialShareButtons({ postTitle, postUrl }) {
  const shareText = encodeURIComponent(`Check out this article: ${postTitle}`)
  const shareUrl = encodeURIComponent(postUrl)

  return (
    <div className="social-share-buttons">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        {renderIcon("Facebook", { width: 20, height: 20 })}
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        {renderIcon("Twitter", { width: 20, height: 20 })}
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        {renderIcon("Linkedin", { width: 20, height: 20 })}
      </a>
      <a href={`mailto:?subject=${shareText}&body=${shareUrl}`} aria-label="Share via Email">
        {renderIcon("MessageSquare", { width: 20, height: 20 })}
      </a>
      <a
        href={`whatsapp://send?text=${shareText} ${shareUrl}`}
        data-action="share/whatsapp/share"
        aria-label="Share via WhatsApp"
      >
        {renderIcon("Whatsapp", { width: 20, height: 20 })}
      </a>
      <button onClick={() => navigator.clipboard.writeText(postUrl)} aria-label="Copy link">
        {renderIcon("Share2", { width: 20, height: 20 })}
      </button>
    </div>
  )
}
