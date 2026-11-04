import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CaffeSingle() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [activeCategory, setActiveCategory] = useState("sve");

    useEffect(() => {
        // Dodan je parametar _embed za dohvat istaknute slike
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/venue?slug=" + slug + "&_embed")
            .then(res => res.json())
            .then(data => setPost(data[0]))
            .catch(err => console.error(err));
    }, [slug]);

    if (!post) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Učitavanje...</span>
                </div>
            </div>
        );
    }

    // Istaknuta slika iz WordPressa ili zadana slika
    const heroImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
        || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000";

    // Primjer kategorija hrane za horizontalni izbornik
    const categories = [
        { id: "sve", name: "Sve", icon: "🍽️" },
        { id: "predjela", name: "Predjela", img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=100" },
        { id: "glavna-jela", name: "Glavna jela", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=100" },
        { id: "salate", name: "Salate", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100" },
        { id: "pizze", name: "Pizze", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100" },
        { id: "deserti", name: "Deserti", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=100" },
    ];

    return (
        <div className="single-menu-page">
            <div className="container py-md-4 px-2 px-md-3" style={{ maxWidth: "600px" }}>
                
                {/* 1. Hero zaglavlje objekta s informacijama */}
                <div className="single-hero-card position-relative rounded-4 overflow-hidden shadow-sm mb-4">
                    <img src={heroImage} alt={post.title.rendered} className="single-hero-img w-100" />
                    
                    {/* Zastavica / jezik u gornjem kutu */}
                    <div className="lang-pill position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill bg-white shadow-sm small fw-semibold">
                        🇭🇷 HR ▾
                    </div>

                    {/* Tekst preko slike */}
                    <div className="single-hero-overlay d-flex flex-column justify-content-end p-3 text-white text-center">
                        <span className="text-uppercase small tracking-wide text-white-50">Bistro & Restoran</span>
                        <h1 className="hero-title fw-bold my-1" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
                        <p className="small text-white-50 mb-3">Dobra hrana. Bolja društva.</p>

                        {/* ACF info bedževi (adresa, grad, radno vrijeme, kontakt) */}
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {(post.acf?.venue_address || post.acf?.venue_city) && (
                                <span className="badge info-pill">
                                    📍 {post.acf?.venue_address}{post.acf?.venue_city ? `, ${post.acf.venue_city}` : ""}
                                </span>
                            )}
                            <span className="badge info-pill">
                                🕒 {post.acf?.venue_hours || "08:00 - 23:00"}
                            </span>
                            {post.acf?.venue_phone && (
                                <a href={`tel:${post.acf.venue_phone}`} className="badge info-pill text-decoration-none text-white">
                                    📞 {post.acf.venue_phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. Horizontalni skrolajući izbornik kategorija */}
                <div className="category-scroll-container d-flex gap-3 mb-4 pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-item-btn d-flex flex-column align-items-center border-0 bg-transparent ${activeCategory === cat.id ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <div className="category-avatar rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                                {cat.img ? (
                                    <img src={cat.img} alt={cat.name} className="w-100 h-100 rounded-circle object-fit-cover" />
                                ) : (
                                    <span className="fs-5">{cat.icon}</span>
                                )}
                            </div>
                            <span className="category-label mt-1 small">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* 3. Popis jela / Stavke ponude */}
                <div className="menu-group mb-4">
                    <h4 className="fw-bold section-heading mb-3">Predjela</h4>

                    <div className="d-flex flex-column gap-3">
                        
                        {/* Stavka 1: Bruschetta */}
                        <div className="menu-card d-flex align-items-center p-2 rounded-4 bg-white shadow-sm position-relative">
                            <img 
                                src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300" 
                                alt="Bruschetta Classica" 
                                className="menu-card-img rounded-3" 
                            />
                            <div className="ms-3 flex-grow-1 pe-4">
                                <h6 className="fw-bold mb-1 menu-item-title">Bruschetta Classica</h6>
                                <p className="text-muted small mb-1 menu-item-desc">
                                    Zapečeni kruh, rajčica, bosiljak, maslinovo ulje, parmezan
                                </p>
                                <span className="fw-bold text-dark fs-6">6,50 €</span>
                            </div>
                            <span className="dietary-icon position-absolute top-0 end-0 m-3" title="Vegetarijansko">
                                🌿
                            </span>
                        </div>

                        {/* Stavka 2: Carpaccio */}
                        <div className="menu-card d-flex align-items-center p-2 rounded-4 bg-white shadow-sm position-relative">
                            <img 
                                src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=300" 
                                alt="Carpaccio od hobotnice" 
                                className="menu-card-img rounded-3" 
                            />
                            <div className="ms-3 flex-grow-1 pe-4">
                                <h6 className="fw-bold mb-1 menu-item-title">Carpaccio od hobotnice</h6>
                                <p className="text-muted small mb-1 menu-item-desc">
                                    Hobotnica, maslinovo ulje, limun, rukola, čeri rajčica
                                </p>
                                <span className="fw-bold text-dark fs-6">12,00 €</span>
                            </div>
                            <span className="dietary-icon position-absolute top-0 end-0 m-3" title="Morski specijalitet">
                                🐙
                            </span>
                        </div>

                    </div>
                </div>

                <div className="menu-group mb-4">
                    <h4 className="fw-bold section-heading mb-3">Glavna jela</h4>

                    <div className="d-flex flex-column gap-3">
                        
                        {/* Stavka 3: Rib eye steak */}
                        <div className="menu-card d-flex align-items-center p-2 rounded-4 bg-white shadow-sm position-relative">
                            <img 
                                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=300" 
                                alt="Rib eye steak" 
                                className="menu-card-img rounded-3" 
                            />
                            <div className="ms-3 flex-grow-1 pe-4">
                                <h6 className="fw-bold mb-1 menu-item-title">Rib eye steak</h6>
                                <p className="text-muted small mb-1 menu-item-desc">
                                    Rib eye, sezonsko povrće, pečeni krumpir, domaći umak
                                </p>
                                <span className="fw-bold text-dark fs-6">22,00 €</span>
                            </div>
                            <span className="dietary-icon position-absolute top-0 end-0 m-3" title="Preporuka chefa">
                                👨‍🍳
                            </span>
                        </div>

                    </div>
                </div>

                {/* 4. WordPress WP Content (ako kafić ima dodatni tekst u WP editoru) */}
                {post.content.rendered && (
                    <div className="wp-content-box p-3 mt-4 rounded-4 bg-white shadow-sm small text-muted">
                        <h6 className="fw-bold text-dark mb-2">O objektu:</h6>
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </div>
                )}

            </div>
        </div>
    );
}

export default CaffeSingle;