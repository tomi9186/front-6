
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    GeoAlt,
    Telephone,
    Envelope,
    Globe,
    Instagram,
    Facebook,
    Clock,
    ArrowRight,
    ArrowUpRight,
    CupHot,
    StarFill,
    QrCode,
    CheckCircleFill,
    ChevronRight
} from "react-bootstrap-icons";


const API_URL =
    "https://front6.edukacija.online/backend/wp-json/wp/v2";


// OGLEDNI JELOVNIK - kasnije zamijeniti podacima iz WordPressa
const demoMenu = [
    {
        id: 1,
        name: "Kava",
        items: [
            {
                id: 101,
                name: "Espresso",
                description: "Aromatična kava intenzivnog okusa.",
                price: "1,80",
                image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e76?w=500&q=85",
                badge: "Popularno"
            },
            {
                id: 102,
                name: "Cappuccino",
                description: "Espresso s toplim mlijekom i mliječnom pjenom.",
                price: "2,20",
                image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=85"
            },
            {
                id: 103,
                name: "Latte Macchiato",
                description: "Espresso s kremastim mlijekom.",
                price: "2,60",
                image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=85"
            }
        ]
    },
    {
        id: 2,
        name: "Pića",
        items: [
            {
                id: 201,
                name: "Svježa limunada",
                description: "Domaća limunada s limunom i mentom.",
                price: "3,50",
                image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=500&q=85"
            },
            {
                id: 202,
                name: "Coca-Cola",
                description: "Osvježavajuće gazirano piće.",
                price: "3,00",
                image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&q=85"
            },
            {
                id: 203,
                name: "Naranča",
                description: "Prirodni sok od naranče.",
                price: "4,00",
                image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=85"
            }
        ]
    },
    {
        id: 3,
        name: "Deserti",
        items: [
            {
                id: 301,
                name: "Cheesecake",
                description: "Kremasti cheesecake s preljevom od šumskog voća.",
                price: "4,50",
                image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=85",
                badge: "Preporuka"
            },
            {
                id: 302,
                name: "Čokoladna torta",
                description: "Bogata čokoladna torta s kremom.",
                price: "4,80",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=85"
            }
        ]
    }
];


// OGLEDNO RADNO VRIJEME
const openingHours = [
    { day: "Ponedjeljak", hours: "07:00 – 23:00" },
    { day: "Utorak", hours: "07:00 – 23:00" },
    { day: "Srijeda", hours: "07:00 – 23:00" },
    { day: "Četvrtak", hours: "07:00 – 23:00" },
    { day: "Petak", hours: "07:00 – 00:00" },
    { day: "Subota", hours: "08:00 – 00:00" },
    { day: "Nedjelja", hours: "08:00 – 22:00" }
];


// OGLEDNA GALERIJA
const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=700&q=85",
        alt: "Interijer ugostiteljskog objekta"
    },
    {
        src: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=700&q=85",
        alt: "Uređeni prostor kafića"
    },
    {
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=85",
        alt: "Ambijent kafića"
    },
    {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=85",
        alt: "Prostor za goste"
    }
];


function stripHtml(html = "") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}


function getInitials(name = "") {
    return stripHtml(name)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");
}


function CaffeSingle() {

    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeCategory, setActiveCategory] = useState(1);
    const [showAllHours, setShowAllHours] = useState(false);

    useEffect(() => {

        const controller = new AbortController();

        async function fetchVenue() {

            setLoading(true);
            setError("");
            setPost(null);

            try {

                const response = await fetch(
                    `${API_URL}/venue?slug=${encodeURIComponent(slug)}&_fields=slug,content,title,acf,excerpt`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Greška prilikom dohvaćanja objekta.");
                }

                const data = await response.json();

                if (!data.length) {
                    setError("Traženi objekt nije pronađen.");
                    return;
                }

                setPost(data[0]);

            } catch (err) {

                if (err.name !== "AbortError") {
                    console.error(err);
                    setError("Trenutno nije moguće učitati profil objekta.");
                }

            } finally {

                if (!controller.signal.aborted) {
                    setLoading(false);
                }

            }

        }

        if (slug) {
            fetchVenue();
        } else {
            setError("Nije naveden objekt.");
            setLoading(false);
        }

        return () => controller.abort();

    }, [slug]);


    if (loading) {
        return (
            <div className="venue-single-loading">
                <div className="spinner-border text-success"></div>
                <p>Učitavanje profila objekta...</p>
            </div>
        );
    }


    if (error || !post) {
        return (
            <div className="venue-single-error">
                <div className="container text-center">
                    <h1>Objekt nije pronađen</h1>
                    <p>{error || "Traženi objekt ne postoji."}</p>
                    <Link to="/kafici" className="venue-back-link">
                        <ArrowRight /> Povratak na objekte
                    </Link>
                </div>
            </div>
        );
    }


    // WORDPRESS / ACF PODACI

    const acf = post.acf || {};

    const title = stripHtml(post.title?.rendered || "Ugostiteljski objekt");

    const address = acf.venue_address || "";
    const city = acf.venue_city || "";
    const phone = acf.venue_phone || "";
    const email = acf.venue_email || "";
    const website = acf.venue_website || "";

    const description =
        acf.venue_description ||
        stripHtml(post.excerpt?.rendered || "") ||
        "";

    const content = post.content?.rendered || "";

    const type = acf.venue_type_label || "Ugostiteljski objekt";

    const initials = getInitials(title);

    const mapQuery = encodeURIComponent(
        `${address}, ${city}`
    );

    const mapUrl =
        `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    const phoneUrl = phone
        ? `tel:${phone.replace(/[^\d+]/g, "")}`
        : null;

    const emailUrl = email
        ? `mailto:${email}`
        : null;

    const currentMenu = demoMenu.find(
        category => category.id === activeCategory
    );

    return (

        <main className="venue-single">

            {/* =================================
                COVER / PROFILE HERO
            ================================= */}

            <section className="venue-profile-hero">

                <div className="venue-cover">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=90"
                        alt={`Interijer objekta ${title}`}
                    />

                    <div className="venue-cover-overlay"></div>

                </div>


                <div className="container">

                    <div className="venue-profile-header">

                        {/* LOGO */}
                        <div className="venue-profile-logo">
                            {initials || "M"}
                        </div>

                        <div className="venue-profile-main-info">

                            <span className="venue-profile-type">
                                {type}
                            </span>

                            <h1>{title}</h1>

                            <div className="venue-profile-meta">

                                {city && (
                                    <span>
                                        <GeoAlt />
                                        {city}
                                    </span>
                                )}

                                <span>
                                    <QrCode />
                                    Digitalni jelovnik
                                </span>

                            </div>

                        </div>

                        <div className="venue-profile-actions">

                            {phoneUrl && (
                                <a
                                    href={phoneUrl}
                                    className="venue-action-primary"
                                >
                                    <Telephone />
                                    Nazovi objekt
                                </a>
                            )}

                            <a
                                href="#jelovnik"
                                className="venue-action-outline"
                            >
                                Pogledaj jelovnik
                                <ArrowRight />
                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================
                PROFILE CONTENT
            ================================= */}

            <section className="venue-profile-content">

                <div className="container">

                    <div className="row g-4 g-lg-5">

                        {/* MAIN COLUMN */}
                        <div className="col-lg-8">

                            {/* INTRO */}
                            <section className="venue-about">

                                <div className="venue-section-heading">
                                    <span>O NAMA</span>
                                    <h2>Dobro došli u {title}</h2>
                                </div>

                                {description ? (
                                    <p>{description}</p>
                                ) : (
                                    <p>
                                        Dobro došli u {title}.
                                        Upoznajte našu ponudu i otkrijte
                                        sve što smo pripremili za vas.
                                    </p>
                                )}

                                {content && (
                                    <div
                                        className="venue-wordpress-content"
                                        dangerouslySetInnerHTML={{
                                            __html: content
                                        }}
                                    />
                                )}

                            </section>


                            {/* MENU */}
                            <section
                                className="venue-menu-section"
                                id="jelovnik"
                            >

                                <div className="venue-menu-heading">

                                    <div>
                                        <span className="venue-section-label">
                                            NAŠA PONUDA
                                        </span>

                                        <h2>Digitalni jelovnik</h2>

                                        <p>
                                            Istražite našu ponudu jela i pića.
                                        </p>
                                    </div>

                                    <div className="venue-menu-icon">
                                        <QrCode />
                                    </div>

                                </div>


                                {/* CATEGORY FILTER */}
                                <div className="venue-menu-categories">

                                    {demoMenu.map(category => (
                                        <button
                                            type="button"
                                            key={category.id}
                                            className={
                                                activeCategory === category.id
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() => setActiveCategory(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}

                                </div>


                                {/* MENU PRODUCTS */}
                                <div className="venue-menu-products">

                                    {currentMenu?.items.map(item => (

                                        <article
                                            className="venue-menu-product"
                                            key={item.id}
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                            />

                                            <div className="venue-menu-product-info">

                                                <div className="venue-menu-product-title">
                                                    <h3>{item.name}</h3>

                                                    {item.badge && (
                                                        <span>{item.badge}</span>
                                                    )}
                                                </div>

                                                <p>{item.description}</p>

                                                <strong>
                                                    {item.price} €
                                                </strong>

                                            </div>

                                        </article>

                                    ))}

                                </div>

                                <div className="venue-menu-demo-note">
                                    <CheckCircleFill />
                                    Ovo je ogledni jelovnik. Ponuda će se
                                    povezati sa stvarnim podacima iz WordPressa.
                                </div>

                            </section>


                            {/* GALLERY */}
                            <section className="venue-gallery-section">

                                <div className="venue-section-heading">
                                    <span>GALERIJA</span>
                                    <h2>Upoznajte naš ambijent</h2>
                                </div>

                                <div className="venue-gallery">

                                    {galleryImages.map((image, index) => (
                                        <a
                                            href={image.src}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`venue-gallery-item gallery-item-${index + 1}`}
                                            key={index}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                loading="lazy"
                                            />
                                        </a>
                                    ))}

                                </div>

                            </section>

                        </div>


                        {/* SIDEBAR */}
                        <aside className="col-lg-4">

                            <div className="venue-sidebar">

                                {/* CONTACT */}
                                <section className="venue-sidebar-card">

                                    <h2>Informacije i kontakt</h2>

                                    {address && (
                                        <div className="venue-contact-item">
                                            <div className="venue-contact-icon">
                                                <GeoAlt />
                                            </div>

                                            <div>
                                                <span>Adresa</span>
                                                <strong>
                                                    {address}
                                                    {city && `, ${city}`}
                                                </strong>
                                            </div>
                                        </div>
                                    )}

                                    {phone && (
                                        <div className="venue-contact-item">
                                            <div className="venue-contact-icon">
                                                <Telephone />
                                            </div>

                                            <div>
                                                <span>Telefon</span>
                                                <a href={phoneUrl}>{phone}</a>
                                            </div>
                                        </div>
                                    )}

                                    {email && (
                                        <div className="venue-contact-item">
                                            <div className="venue-contact-icon">
                                                <Envelope />
                                            </div>

                                            <div>
                                                <span>E-mail</span>
                                                <a href={emailUrl}>{email}</a>
                                            </div>
                                        </div>
                                    )}

                                    {website && (
                                        <div className="venue-contact-item">
                                            <div className="venue-contact-icon">
                                                <Globe />
                                            </div>

                                            <div>
                                                <span>Web stranica</span>
                                                <a
                                                    href={website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Posjetite web
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <a
                                        href={mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="venue-map-button"
                                    >
                                        Pogledaj lokaciju na karti
                                        <ArrowUpRight />
                                    </a>

                                </section>


                                {/* OPENING HOURS */}
                                <section className="venue-sidebar-card">

                                    <h2>
                                        <Clock />
                                        Radno vrijeme
                                    </h2>

                                    <div className="venue-opening-hours">

                                        {(showAllHours
                                            ? openingHours
                                            : openingHours.slice(0, 5)
                                        ).map((item, index) => (

                                            <div
                                                className="venue-opening-row"
                                                key={index}
                                            >
                                                <span>{item.day}</span>
                                                <strong>{item.hours}</strong>
                                            </div>

                                        ))}

                                    </div>

                                    <button
                                        type="button"
                                        className="venue-hours-toggle"
                                        onClick={() => setShowAllHours(!showAllHours)}
                                    >
                                        {showAllHours
                                            ? "Prikaži manje"
                                            : "Prikaži cijeli tjedan"
                                        }

                                        <ChevronRight />
                                    </button>

                                    <small className="venue-demo-disclaimer">
                                        Primjer radnog vremena – podaci nisu potvrđeni.
                                    </small>

                                </section>


                                {/* SOCIAL */}
                                <section className="venue-sidebar-card">

                                    <h2>Pratite nas</h2>

                                    <p className="venue-social-description">
                                        Budite u tijeku s našim novostima i ponudom.
                                    </p>

                                    <div className="venue-social-links">

                                        <a
                                            href="https://facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Facebook"
                                        >
                                            <Facebook />
                                        </a>

                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                        >
                                            <Instagram />
                                        </a>

                                    </div>

                                    <small className="venue-demo-disclaimer">
                                        Primjer poveznica – zamijeniti profilima objekta.
                                    </small>

                                </section>


                                {/* QR CTA */}
                                <section className="venue-qr-card">

                                    <div className="venue-qr-icon">
                                        <QrCode />
                                    </div>

                                    <h2>
                                        Naša ponuda uvijek vam je dostupna.
                                    </h2>

                                    <p>
                                        Pregledajte digitalni jelovnik i
                                        upoznajte našu ponudu.
                                    </p>

                                    <a href="#jelovnik">
                                        Pregledaj jelovnik
                                        <ArrowRight />
                                    </a>

                                </section>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default CaffeSingle;
