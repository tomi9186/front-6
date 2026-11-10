
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

const API_URL =
    "https://front6.edukacija.online/backend/wp-json/wp/v2";

const FALLBACK_IMAGE =
    "https://placehold.co/1200x700/eef3ee/164e35?text=Blog";

// Pretvaranje HTML-a u običan tekst.
const stripHtml = (html = "") => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
};

// Formatiranje datuma.
const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("hr-HR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
};

// Procjena vremena čitanja.
const getReadingTime = (html = "") => {
    const words = stripHtml(html)
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 200));
};

// Dohvat istaknute slike.
const getImage = (post) => {
    const media = post?._embedded?.["wp:featuredmedia"]?.[0];

    return {
        url:
            media?.media_details?.sizes?.large?.source_url ||
            media?.media_details?.sizes?.full?.source_url ||
            media?.source_url ||
            FALLBACK_IMAGE,
        alt: media?.alt_text || stripHtml(post?.title?.rendered || ""),
    };
};

// Generiranje sadržaja članka iz H2 i H3 naslova.
const prepareArticleContent = (html = "") => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    const headings = Array.from(
        doc.body.querySelectorAll("h2, h3")
    );

    const usedIds = new Set();

    const toc = headings.map((heading, index) => {
        const text = heading.textContent.trim();

        const slug =
            text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "") || `odjeljak-${index + 1}`;

        let id = slug;
        let suffix = 2;

        while (usedIds.has(id)) {
            id = `${slug}-${suffix++}`;
        }

        usedIds.add(id);
        heading.id = id;

        return {
            id,
            text,
            level: heading.tagName.toLowerCase(),
        };
    });

    return {
        content: doc.body.innerHTML,
        toc,
    };
};

function BlogSingle() {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPost() {
            setLoading(true);
            setError("");
            setPost(null);
            setRelatedPosts([]);
            setCategories([]);
            setTags([]);

            try {
                const response = await fetch(
                    `${API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Greška prilikom dohvaćanja članka.");
                }

                const data = await response.json();

                if (!data.length) {
                    setError("Članak nije pronađen.");
                    return;
                }

                const currentPost = data[0];

                setPost(currentPost);

                // Kategorije.
                const categoryIds = currentPost.categories || [];

                if (categoryIds.length) {
                    const categoryResponse = await fetch(
                        `${API_URL}/categories?include=${categoryIds.join(",")}&per_page=100`,
                        { signal: controller.signal }
                    );

                    if (categoryResponse.ok) {
                        setCategories(await categoryResponse.json());
                    }
                }

                // Oznake.
                const tagIds = currentPost.tags || [];

                if (tagIds.length) {
                    const tagResponse = await fetch(
                        `${API_URL}/tags?include=${tagIds.join(",")}&per_page=100`,
                        { signal: controller.signal }
                    );

                    if (tagResponse.ok) {
                        setTags(await tagResponse.json());
                    }
                }

                // Povezani članci iz prve kategorije.
                if (categoryIds.length) {
                    const relatedResponse = await fetch(
                        `${API_URL}/posts?categories=${categoryIds[0]}&exclude=${currentPost.id}&per_page=3&_embed=1`,
                        { signal: controller.signal }
                    );

                    if (relatedResponse.ok) {
                        setRelatedPosts(await relatedResponse.json());
                    }
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                    setError("Članak trenutačno nije moguće učitati.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        if (slug) {
            fetchPost();
        } else {
            setError("Nije naveden slug članka.");
            setLoading(false);
        }

        return () => controller.abort();
    }, [slug]);

    const article = useMemo(() => {
        if (!post) return null;

        const prepared = prepareArticleContent(
            post.content?.rendered || ""
        );

        return {
            ...prepared,
            image: getImage(post),
            readingTime: getReadingTime(post.content?.rendered || ""),
            title: stripHtml(post.title?.rendered || ""),
            excerpt: stripHtml(post.excerpt?.rendered || ""),
            date: formatDate(post.date),
            url: post.link || window.location.href,
        };
    }, [post]);

    const author = post?._embedded?.author?.[0];

    const authorName = author?.name || "Autor";

    const authorAvatar =
        author?.avatar_urls?.["96"] ||
        author?.avatar_urls?.["48"] ||
        "https://placehold.co/96x96/eef3ee/164e35?text=A";

    const authorDescription =
        author?.description ||
        "Autor članaka i korisnih savjeta.";

    const shareUrl = article?.url || window.location.href;
    const shareTitle = article?.title || "";

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);

            window.setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Kopiranje poveznice nije uspjelo.", err);
        }
    };

    if (loading) {
        return (
            <div className="article-page">
                <div className="container">
                    <p role="status">Učitavanje članka...</p>
                </div>
            </div>
        );
    }

    if (error || !post || !article) {
        return (
            <div className="article-page">
                <div className="container">
                    <h1>Članak nije dostupan</h1>
                    <p role="alert">
                        {error || "Traženi članak nije pronađen."}
                    </p>
                    <Link to="/blog/">Povratak na blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="article-page">
            <div className="container">

                {/* Breadcrumbs */}
                <nav className="article-breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Početna</Link>
                    <span>/</span>
                    <Link to="/blog/">Blog</Link>

                    {categories[0] && (
                        <>
                            <span>/</span>
                            <Link to={`/kategorija/${categories[0].slug}/`}>
                                {categories[0].name}
                            </Link>
                        </>
                    )}

                    <span>/</span>
                    <span aria-current="page">{article.title}</span>
                </nav>

                <div className="row g-4 g-xl-5">

                    {/* Glavni članak */}
                    <main className="col-lg-8">
                        <article className="article-content">

                            {/* Kategorije */}
                            {categories.length > 0 && (
                                <div className="article-categories">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/kategorija/${category.slug}/`}
                                            className="article-category"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <h1 className="article-title">
                                {article.title}
                            </h1>

                            {/* Izvadak */}
                            {article.excerpt && (
                                <blockquote className="article-quote">
                                    {article.excerpt}
                                </blockquote>
                            )}

                            {/* Metapodaci */}
                            <div className="article-meta">

                                <div className="article-author">
                                    <img
                                        src={authorAvatar}
                                        alt={authorName}
                                        loading="lazy"
                                    />
                                    <span>{authorName}</span>
                                </div>

                                <div className="article-meta-item">
                                    <span className="article-meta-icon" aria-hidden="true">
                                        ▦
                                    </span>
                                    <time dateTime={post.date}>
                                        {article.date}
                                    </time>
                                </div>

                                <div className="article-meta-item">
                                    <span className="article-meta-icon" aria-hidden="true">
                                        ◷
                                    </span>
                                    <span>{article.readingTime} min čitanja</span>
                                </div>

                                <div className="article-share">
                                    <button
                                        type="button"
                                        onClick={handleCopyLink}
                                        aria-label="Kopiraj poveznicu"
                                        title={copied ? "Poveznica kopirana" : "Kopiraj poveznicu"}
                                    >
                                        {copied ? "✓" : "↗"}
                                    </button>

                                    <a
                                        href={shareLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Podijeli na Facebooku"
                                    >
                                        f
                                    </a>

                                    <a
                                        href={shareLinks.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Podijeli na X"
                                    >
                                        𝕏
                                    </a>

                                    <a
                                        href={shareLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Podijeli na LinkedInu"
                                    >
                                        in
                                    </a>
                                </div>
                            </div>

                            {/* Istaknuta slika */}
                            <figure className="article-featured-image">
                                <img
                                    src={article.image.url}
                                    alt={article.image.alt}
                                    fetchPriority="high"
                                />
                            </figure>

                            {/* Sadržaj iz WordPressa */}
                            <div className="article-body">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: article.content,
                                    }}
                                />
                            </div>

                            {/* Oznake */}
                            {tags.length > 0 && (
                                <div className="article-bottom">
                                    <div className="article-tags">
                                        <span>Teme:</span>

                                        {tags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                to={`/oznaka/${tag.slug}/`}
                                            >
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="article-bottom-share">
                                        Podijelite članak:
                                        <a
                                            href={shareLinks.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                        <a
                                            href={shareLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            )}

                        </article>
                    </main>

                    {/* Sidebar */}
                    <aside className="col-lg-4">
                        <div className="article-sidebar">

                            {/* Autor */}
                            <section className="sidebar-card sidebar-author">
                                <img
                                    src={authorAvatar}
                                    alt={authorName}
                                    loading="lazy"
                                />

                                <div>
                                    <h2>O autoru</h2>
                                    <h3>{authorName}</h3>
                                    <p>{authorDescription}</p>
                                </div>
                            </section>

                            {/* Automatski sadržaj */}
                            {article.toc.length > 0 && (
                                <nav
                                    className="sidebar-card article-toc"
                                    aria-label="Sadržaj članka"
                                >
                                    <h2>Sadržaj članka</h2>

                                    {article.toc.map((item) => (
                                        <a
                                            key={item.id}
                                            className={
                                                item.level === "h3"
                                                    ? "article-toc-subitem"
                                                    : ""
                                            }
                                            href={`#${item.id}`}
                                        >
                                            <span aria-hidden="true" />
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            )}

                            {/* Povezani članci */}
                            {relatedPosts.length > 0 && (
                                <section className="sidebar-card related-articles">
                                    <h2>Povezani članci</h2>

                                    {relatedPosts.map((related) => {
                                        const image = getImage(related);

                                        return (
                                            <Link
                                                key={related.id}
                                                to={`/blog/${related.slug}/`}
                                                className="related-article"
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    loading="lazy"
                                                />

                                                <div>
                                                    <h3>
                                                        {stripHtml(
                                                            related.title?.rendered || ""
                                                        )}
                                                    </h3>

                                                    <time dateTime={related.date}>
                                                        {formatDate(related.date)}
                                                    </time>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </section>
                            )}

                            {/* Newsletter */}
                            <section className="sidebar-newsletter">
                                <div className="newsletter-icon" aria-hidden="true">
                                    ✉
                                </div>

                                <div className="newsletter-content">
                                    <h2>Primajte korisne savjete</h2>

                                    <p>
                                        Prijavite se na naš newsletter i prvi
                                        saznajte nove članke, recepte i ideje.
                                    </p>

                                    <form
                                        action="#"
                                        method="post"
                                        onSubmit={(event) => event.preventDefault()}
                                    >
                                        <label
                                            className="visually-hidden"
                                            htmlFor="newsletter-email"
                                        >
                                            Vaš e-mail
                                        </label>

                                        <input
                                            id="newsletter-email"
                                            type="email"
                                            name="email"
                                            placeholder="Vaš e-mail"
                                            required
                                        />

                                        <button
                                            type="submit"
                                            aria-label="Prijavi se"
                                        >
                                            →
                                        </button>
                                    </form>
                                </div>
                            </section>

                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}

export default BlogSingle;
