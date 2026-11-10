
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    ArrowRight,
    Envelope,
    CupHot,
    QrCode,
    BarChart
} from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="menuto-footer">

            {/* CTA SECTION */}
            <div className="container">

                {/* MAIN FOOTER */}
                <div className="footer-main">

                    {/* BRAND */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-icon">
                                <CupHot />
                            </span>
                            <span>MENUTO</span>
                        </Link>

                        <p>
                            Digitalni jelovnik za moderne kafiće i restorane.
                            Upravljajte svojom ponudom jednostavno,
                            brzo i s bilo kojeg uređaja.
                        </p>

                        <div className="footer-socials">
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

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                            >
                                <Twitter />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin />
                            </a>
                        </div>
                    </div>

                    {/* PRODUCT */}
                    <div className="footer-column">
                        <h3>Proizvod</h3>

                        <ul>
                            <li>
                                <Link to="/rjesenja/digitalni-jelovnik">
                                    Digitalni jelovnik
                                </Link>
                            </li>

                            <li>
                                <Link to="/rjesenja/upravljanje-ponudom">
                                    Upravljanje ponudom
                                </Link>
                            </li>

                            <li>
                                <Link to="/rjesenja/analitika">
                                    Analitika i uvidi
                                </Link>
                            </li>

                            <li>
                                <Link to="/primjeri">
                                    Primjeri jelovnika
                                </Link>
                            </li>

                            <li>
                                <Link to="/cjenik">
                                    Cjenik
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SOLUTIONS */}
                    <div className="footer-column">
                        <h3>Rješenja</h3>

                        <ul>
                            <li>
                                <Link to="/za-kafice">
                                    Za kafiće
                                </Link>
                            </li>

                            <li>
                                <Link to="/za-restorane">
                                    Za restorane
                                </Link>
                            </li>

                            <li>
                                <Link to="/za-barove">
                                    Za barove
                                </Link>
                            </li>

                            <li>
                                <Link to="/za-hotele">
                                    Za hotele
                                </Link>
                            </li>

                            <li>
                                <Link to="/za-slasticarnice">
                                    Za slastičarnice
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RESOURCES */}
                    <div className="footer-column">
                        <h3>Resursi</h3>

                        <ul>
                            <li>
                                <Link to="/blog">
                                    Blog
                                </Link>
                            </li>

                            <li>
                                <Link to="/o-nama">
                                    O nama
                                </Link>
                            </li>

                            <li>
                                <Link to="/kontakt">
                                    Kontakt
                                </Link>
                            </li>

                            <li>
                                <Link to="/cesta-pitanja">
                                    Česta pitanja
                                </Link>
                            </li>

                            <li>
                                <Link to="/prijava">
                                    Prijava
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="footer-column footer-contact">
                        <h3>Kontakt</h3>

                        <p>
                            Imate pitanja o MENUTO platformi?
                            Javite nam se.
                        </p>

                        <a
                            href="mailto:info@menuto.hr"
                            className="footer-email"
                        >
                            <Envelope />
                            info@menuto.hr
                        </a>

                        <Link to="/kontakt" className="footer-contact-link">
                            Kontaktirajte nas
                            <ArrowRight />
                        </Link>
                    </div>

                </div>

                {/* FOOTER BOTTOM */}
                <div className="footer-bottom">

                    <p>
                        © {currentYear} MENUTO. Sva prava pridržana.
                    </p>

                    <div className="footer-legal-links">
                        <Link to="/privatnost">
                            Pravila privatnosti
                        </Link>

                        <Link to="/kolacici">
                            Politika kolačića
                        </Link>

                        <Link to="/uvjeti-koristenja">
                            Uvjeti korištenja
                        </Link>
                    </div>

                    <span className="footer-made">
                        Napravljeno za ugostitelje.
                        <span> ♥ </span>
                    </span>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
