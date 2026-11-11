import { Link } from "react-router-dom";
import WpImage from "./WpImage";

function BlogCard({ post }) {

    return (
        <div className="blog-card">
            <Link to={'/blog/' + post.slug} class="blog-card__image-link" aria-label="Pročitaj članak">
                <WpImage post={post} />
            </Link>
            <div className="blog-card__content">
                <h2 className="blog-card__title">
                    <Link to={'/blog/' + post.slug} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </h2>
                <div className="blog-card__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
            </div>
            <div class="blog-card__footer">
                <time class="blog-card__date" datetime="2026-09-12">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                    </svg>
                    <time dateTime={post.date}>
                       {post.date}
                    </time>
                </time>

                <Link className="blog-card__read-more" to={'/blog/' + post.slug}>Pročitaj više <span aria-hidden="true">→</span></Link>
            </div>
        </div>
    )
}

export default BlogCard;