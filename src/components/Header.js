
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const closeMobile = () => {
        setMobileOpen(false);
        setSolutionsOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        navigate(`/blog/?s=${encodeURIComponent(searchTerm.trim())}`);
        setSearchOpen(false);
        setSearchTerm("");
    };

    return (
        <header className="site-header">

            {/* Main navigation */}
            <nav className="navbar navbar-expand-lg menuto-navbar">
                <div className="container">

                    {/* Logo */}
                    <Link
                        className="navbar-brand menuto-logo"
                        to="/"
                        onClick={closeMobile}
                    >
                        <span className="menuto-logo-icon">
                            <svg viewBox="0 0 48 48" fill="none">
                                <path
                                    d="M14 9V21M20 9V21M26 9V21M14 15H26M20 21V38"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M34 9V38M34 9C34 9 40 15 40 23V25H34"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span>MENUTO</span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="menuto-desktop-nav">

                        <ul className="navbar-nav menuto-nav-list">

                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    to="/"
                                >
                                    Početna
                                </Link>
                            </li>

                            {/* Solutions dropdown */}
                            <li
                                className={`nav-item menuto-dropdown ${
                                    solutionsOpen ? "is-open" : ""
                                }`}
                                onMouseEnter={() => setSolutionsOpen(true)}
                                onMouseLeave={() => setSolutionsOpen(false)}
                            >
                                <button
                                    type="button"
                                    className="nav-link menuto-dropdown-toggle"
                                    aria-expanded={solutionsOpen}
                                    onClick={() =>
                                        setSolutionsOpen(!solutionsOpen)
                                    }
                                >
                                    Rješenja
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path
                                            d="m3 6 5 5 5-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {/* Mega menu */}
                                <div className="menuto-mega-menu">
                                    <div className="menuto-mega-content">

                                        <div className="menuto-mega-links">

                                            <Link
                                                to="/rjesenja/digitalni-jelovnik"
                                                className="menuto-mega-item"
                                                onClick={() => setSolutionsOpen(false)}
                                            >
                                                <span className="mega-icon">
                                                    <svg viewBox="0 0 24 24">
                                                        <rect x="3" y="3" width="7" height="7" rx="1" />
                                                        <rect x="14" y="3" width="7" height="7" rx="1" />
                                                        <rect x="3" y="14" width="7" height="7" rx="1" />
                                                        <path d="M14 14h3v3h-3zM20 14v2M14 20h2M20 19v2" />
                                                    </svg>
                                                </span>

                                                <span>
                                                    <strong>Digitalni jelovnik (QR)</strong>
                                                    <small>
                                                        Jelovnik dostupan jednim skeniranjem
                                                    </small>
                                                </span>
                                            </Link>

                                            <Link
                                                to="/rjesenja/upravljanje-ponudom"
                                                className="menuto-mega-item"
                                                onClick={() => setSolutionsOpen(false)}
                                            >
                                                <span className="mega-icon">
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="m15 5 4 4M4 20l4-.8L19.5 7.7a2.8 2.8 0 0 0-4-4L4.8 15.4 4 20Z" />
                                                    </svg>
                                                </span>

                                                <span>
                                                    <strong>Upravljanje ponudom</strong>
                                                    <small>
                                                        Jednostavno uređujte jela, pića i cijene
                                                    </small>
                                                </span>
                                            </Link>

                                            <Link
                                                to="/rjesenja/analitika"
                                                className="menuto-mega-item"
                                                onClick={() => setSolutionsOpen(false)}
                                            >
                                                <span className="mega-icon">
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M3 20h18M5 20V10h4v10M11 20V4h4v16M17 20v-8h4v8" />
                                                    </svg>
                                                </span>

                                                <span>
                                                    <strong>Analitika i uvidi</strong>
                                                    <small>
                                                        Pratite preglede i popularnost ponude
                                                    </small>
                                                </span>
                                            </Link>

                                        </div>

                                        <div className="menuto-mega-promo">
                                            <div className="mega-promo-image">
                                                <span>MENUTO</span>
                                                <div className="mega-promo-devices">
                                                    <svg viewBox="0 0 100 130">
                                                        <rect x="13" y="2" width="74" height="126" rx="10" fill="#173e2a" />
                                                        <rect x="17" y="7" width="66" height="116" rx="7" fill="#fff" />
                                                        <rect x="23" y="20" width="54" height="36" rx="4" fill="#e4eee3" />
                                                        <circle cx="39" cy="37" r="9" fill="#9aaf84" />
                                                        <circle cx="61" cy="37" r="9" fill="#d7a66c" />
                                                        <rect x="23" y="63" width="54" height="4" rx="2" fill="#dce4dc" />
                                                        <rect x="23" y="73" width="38" height="4" rx="2" fill="#dce4dc" />
                                                        <rect x="23" y="85" width="54" height="23" rx="4" fill="#edf4ed" />
                                                        <path d="M40 116h20" stroke="#173e2a" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="mega-promo-text">
                                                <h3>
                                                    Pogledajte primjer
                                                    digitalnog jelovnika
                                                </h3>

                                                <Link
                                                    to="/primjeri"
                                                    className="mega-promo-link"
                                                    onClick={() => setSolutionsOpen(false)}
                                                >
                                                    Istraži primjere
                                                    <span>→</span>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/za-kafice">
                                    Za kafiće
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/za-restorane">
                                    Za restorane
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/primjeri">
                                    Primjeri
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/cjenik">
                                    Cjenik
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">
                                    Blog
                                </Link>
                            </li>

                        </ul>

                        {/* Right actions */}
                        <div className="menuto-header-actions">

                            <Link
                                to="/prijava"
                                className="menuto-login-btn"
                            >
                                Prijava
                            </Link>

                            <Link
                                to="/registracija"
                                className="menuto-cta-btn"
                            >
                                Isprobaj besplatno
                                <span>→</span>
                            </Link>

                        </div>

                    </div>

                    {/* Mobile toggler */}
                    <button
                        type="button"
                        className={`menuto-mobile-toggle ${
                            mobileOpen ? "is-open" : ""
                        }`}
                        aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>
            </nav>

            {/* Mobile overlay */}
            <div
                className={`menuto-mobile-overlay ${
                    mobileOpen ? "is-visible" : ""
                }`}
                onClick={closeMobile}
            />

            {/* Mobile drawer */}
            <div className={`menuto-mobile-drawer ${
                mobileOpen ? "is-open" : ""
            }`}>

                <div className="menuto-mobile-header">
                    <Link to="/" className="menuto-logo" onClick={closeMobile}>
                        <span className="menuto-logo-icon">
                            <svg viewBox="0 0 48 48" fill="none">
                                <path
                                    d="M14 9V21M20 9V21M26 9V21M14 15H26M20 21V38"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M34 9V38M34 9C34 9 40 15 40 23V25H34"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span>MENUTO</span>
                    </Link>

                    <button
                        type="button"
                        className="menuto-mobile-close"
                        onClick={closeMobile}
                        aria-label="Zatvori izbornik"
                    >
                        ×
                    </button>
                </div>

                <nav className="menuto-mobile-nav">

                    <Link to="/" onClick={closeMobile}>
                        Početna
                    </Link>

                    <button
                        type="button"
                        className="menuto-mobile-dropdown-toggle"
                        onClick={() => setSolutionsOpen(!solutionsOpen)}
                        aria-expanded={solutionsOpen}
                    >
                        Rješenja
                        <span className={solutionsOpen ? "rotated" : ""}>⌄</span>
                    </button>

                    {solutionsOpen && (
                        <div className="menuto-mobile-submenu">
                            <Link
                                to="/rjesenja/digitalni-jelovnik"
                                onClick={closeMobile}
                            >
                                Digitalni jelovnik
                            </Link>
                            <Link
                                to="/rjesenja/upravljanje-ponudom"
                                onClick={closeMobile}
                            >
                                Upravljanje ponudom
                            </Link>
                            <Link
                                to="/rjesenja/analitika"
                                onClick={closeMobile}
                            >
                                Analitika i uvidi
                            </Link>
                        </div>
                    )}

                    <Link to="/za-kafice" onClick={closeMobile}>
                        Za kafiće
                    </Link>

                    <Link to="/za-restorane" onClick={closeMobile}>
                        Za restorane
                    </Link>

                    <Link to="/primjeri" onClick={closeMobile}>
                        Primjeri
                    </Link>

                    <Link to="/cjenik" onClick={closeMobile}>
                        Cjenik
                    </Link>

                    <Link to="/blog" onClick={closeMobile}>
                        Blog
                    </Link>

                </nav>

                <div className="menuto-mobile-footer">
                    <Link
                        to="/prijava"
                        className="menuto-mobile-login"
                        onClick={closeMobile}
                    >
                        <span>♙</span>
                        Prijava
                    </Link>

                    <Link
                        to="/registracija"
                        className="menuto-cta-btn menuto-mobile-cta"
                        onClick={closeMobile}
                    >
                        Isprobaj besplatno
                        <span>→</span>
                    </Link>
                </div>

            </div>

        </header>
    );
}

export default Header;
