
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import {
    Search,
    ArrowRight,
    PinMap,
    CupHot,
    ForkKnife,
    X,
    Sliders
} from "react-bootstrap-icons";

import "./Caffe.css";

function Caffe() {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("svi");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/venue?_fields=slug,title,acf,excerpt,venue_type")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Greška prilikom dohvaćanja podataka.");
                }
                return res.json();
            })
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });

    }, []);

    // FILTER AND SEARCH
    const filteredPosts = useMemo(() => {

        return posts.filter(post => {

            const title = post.title?.rendered || "";
            const excerpt = post.excerpt?.rendered || "";

            const matchesSearch =
                title.toLowerCase().includes(search.toLowerCase()) ||
                excerpt.toLowerCase().includes(search.toLowerCase());

            // Prilagodi ID restorana stvarnom termu u WordPressu.
            const isCafe = post.venue_type?.includes(93);
            const isRestaurant = post.venue_type?.some(id => id !== 93);

            const matchesFilter =
                activeFilter === "svi" ||
                (activeFilter === "kafici" && isCafe) ||
                (activeFilter === "restorani" && isRestaurant);

            return matchesSearch && matchesFilter;

        });

    }, [posts, search, activeFilter]);

    return (

        <main className="venue-page">

            {/* HERO */}
            <section className="venue-hero">

                <div className="container">

                    <span className="venue-eyebrow">
                        MENUTO PARTNERI
                    </span>

                    <h1>
                        Otkrijte mjesta koja
                        <span>vrijedi posjetiti.</span>
                    </h1>

                    <p>
                        Istražite kafiće i restorane, upoznajte njihovu ponudu
                        i pronađite svoje sljedeće omiljeno mjesto.
                    </p>

                    {/* SEARCH */}
                    <div className="venue-search">

                        <Search />

                        <input
                            type="text"
                            placeholder="Pretražite kafiće i restorane..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                aria-label="Obriši pretragu"
                            >
                                <X />
                            </button>
                        )}

                    </div>

                </div>

            </section>


            {/* VENUE LIST */}
            <section className="venue-listing">

                <div className="container">

                    {/* FILTERS */}
                    <div className="venue-toolbar">

                        <div className="venue-filter-label">
                            <Sliders />
                            <span>Pregled ponude</span>
                        </div>

                        <div className="venue-filters">

                            <button
                                className={activeFilter === "svi" ? "active" : ""}
                                onClick={() => setActiveFilter("svi")}
                            >
                                Svi objekti
                            </button>

                            <button
                                className={activeFilter === "kafici" ? "active" : ""}
                                onClick={() => setActiveFilter("kafici")}
                            >
                                <CupHot /> Kafići
                            </button>

                            <button
                                className={activeFilter === "restorani" ? "active" : ""}
                                onClick={() => setActiveFilter("restorani")}
                            >
                                <ForkKnife /> Restorani
                            </button>

                        </div>

                    </div>


                    {/* RESULTS COUNT */}
                    {!loading && !error && (
                        <div className="venue-results">
                            Pronađeno <strong>{filteredPosts.length}</strong> objekata
                        </div>
                    )}


                    {/* LOADING */}
                    {loading && (
                        <div className="venue-loading">
                            <div className="spinner-border text-success"></div>
                            <p>Učitavanje objekata...</p>
                        </div>
                    )}


                    {/* ERROR */}
                    {error && (
                        <div className="venue-empty">
                            <h3>Došlo je do pogreške.</h3>
                            <p>Trenutno nije moguće dohvatiti objekte. Pokušajte ponovno.</p>

                            <button
                                className="venue-retry"
                                onClick={() => window.location.reload()}
                            >
                                Pokušaj ponovno
                            </button>
                        </div>
                    )}


                    {/* EMPTY */}
                    {!loading && !error && filteredPosts.length === 0 && (
                        <div className="venue-empty">
                            <Search />
                            <h3>Nema rezultata pretraživanja.</h3>
                            <p>Pokušajte promijeniti pojam pretraživanja ili kategoriju.</p>
                        </div>
                    )}


                    {/* CARDS */}
                    {!loading && !error && filteredPosts.length > 0 && (

                        <div className="row g-4">

                            {filteredPosts.map(post => {

                                const title = post.title?.rendered || "Ugostiteljski objekt";
                                const excerpt = post.excerpt?.rendered || "";
                                const image = post.acf?.slika || post.acf?.featured_image || "";

                                const isCafe = post.venue_type?.includes(93);

                                return (

                                    <div className="col-md-6 col-lg-4" key={post.slug}>

                                        <article className="venue-card">

                                            <Link
                                                to={`/restoran/${post.slug}`}
                                                className="venue-card-image"
                                            >

                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={title}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="venue-image-placeholder">
                                                        {isCafe ? <CupHot /> : <ForkKnife />}
                                                    </div>
                                                )}

                                                <span className="venue-category">
                                                    {isCafe ? "Kafić" : "Restoran"}
                                                </span>

                                            </Link>

                                            <div className="venue-card-content">

                                                <h2>
                                                    <Link to={`/restoran/${post.slug}`}>
                                                        <span dangerouslySetInnerHTML={{
                                                            __html: title
                                                        }} />
                                                    </Link>
                                                </h2>

                                                <div
                                                    className="venue-card-description"
                                                    dangerouslySetInnerHTML={{
                                                        __html: excerpt
                                                    }}
                                                />

                                                {post.acf?.adresa && (
                                                    <div className="venue-location">
                                                        <PinMap />
                                                        {post.acf.adresa}
                                                    </div>
                                                )}

                                                <div className="venue-card-footer">

                                                    <Link
                                                        to={`/restoran/${post.slug}`}
                                                        className="venue-card-link"
                                                    >
                                                        Pogledaj objekt
                                                        <ArrowRight />
                                                    </Link>

                                                </div>

                                            </div>

                                        </article>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </section>

        </main>

    );

}

export default Caffe;
