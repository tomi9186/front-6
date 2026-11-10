
import { Link } from "react-router-dom";

import {
    CheckCircleFill,
    ArrowRight,
    PlayCircle,
    QrCode,
    PencilSquare,
    BarChartLine,
    CupHot,
    Shop,
    Laptop,
    ForkKnife,
    Clock,
    Star,
    LightningCharge,
    Phone,
    ClipboardCheck
} from "react-bootstrap-icons";

import "./Home.css";

function Home() {

    const features = [
        {
            icon: <QrCode />,
            title: "QR jelovnik",
            description: "Gostima je jelovnik dostupan jednim skeniranjem."
        },
        {
            icon: <PencilSquare />,
            title: "Upravljanje ponudom",
            description: "Jednostavno dodajte i uređujte jela, pića i cijene."
        },
        {
            icon: <BarChartLine />,
            title: "Analitika i uvidi",
            description: "Pratite preglede jelovnika i popularnost jela."
        }
    ];

    const steps = [
        {
            number: "01",
            icon: <Laptop />,
            title: "Registrirajte se",
            description: "Otvorite besplatan račun i postavite svoj ugostiteljski objekt."
        },
        {
            number: "02",
            icon: <ForkKnife />,
            title: "Dodajte ponudu",
            description: "Unesite jela, pića, cijene, kategorije i fotografije."
        },
        {
            number: "03",
            icon: <QrCode />,
            title: "Podijelite QR kod",
            description: "Postavite QR kod u svoj objekt i omogućite gostima pristup jelovniku."
        }
    ];

    const benefits = [
        {
            icon: <Shop />,
            value: "500+",
            label: "ugostiteljskih objekata"
        },
        {
            icon: <Star />,
            value: "98%",
            label: "zadovoljnih korisnika"
        },
        {
            icon: <Phone />,
            value: "100%",
            label: "prilagođeno mobilnim uređajima"
        },
        {
            icon: <LightningCharge />,
            value: "5 min",
            label: "do aktivnog jelovnika"
        }
    ];

    return (
        <main className="menuto-home">

            {/* =================================
                HERO SECTION
            ================================= */}

            <section className="home-hero">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-5">
                            <div className="hero-content">

                                <span className="home-eyebrow">
                                    DIGITALNI JELOVNIK
                                </span>

                                <h1>
                                    Vaš jelovnik zaslužuje
                                    <span> nešto bolje.</span>
                                </h1>

                                <p className="hero-description">
                                    Moderni digitalni jelovnik za kafiće i restorane.
                                    Jednostavno uređujte ponudu, dijelite je putem
                                    QR koda i pružite gostima brže i bolje iskustvo.
                                </p>

                                <div className="hero-buttons">
                                    <Link
                                        to="/registracija"
                                        className="home-btn home-btn-primary"
                                    >
                                        Isprobaj besplatno
                                        <ArrowRight />
                                    </Link>

                                    <Link
                                        to="/kako-funkcionira"
                                        className="home-btn home-btn-outline"
                                    >
                                        <PlayCircle />
                                        Pogledaj kako radi
                                    </Link>
                                </div>

                                <div className="hero-trust">
                                    <span>
                                        <CheckCircleFill />
                                        Brzo postavljanje
                                    </span>

                                    <span>
                                        <CheckCircleFill />
                                        Radi na svim uređajima
                                    </span>

                                    <span>
                                        <CheckCircleFill />
                                        Bez obveze
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Product mockup */}
                        <div className="col-lg-7">
                            <div className="hero-visual">

                                <div className="hero-shape hero-shape-one"></div>
                                <div className="hero-shape hero-shape-two"></div>

                                {/* Laptop */}
                                <div className="device-laptop">
                                    <div className="laptop-screen">

                                        <div className="dashboard-mockup">

                                            <div className="dashboard-sidebar">
                                                <div className="dashboard-logo">
                                                    <span>✦</span> MENUTO
                                                </div>

                                                <div className="dashboard-menu-item">
                                                    <span>⌂</span> Početna
                                                </div>

                                                <div className="dashboard-menu-item active">
                                                    <span>☷</span> Jelovnik
                                                </div>

                                                <div className="dashboard-menu-item">
                                                    <span>▦</span> Kategorije
                                                </div>

                                                <div className="dashboard-menu-item">
                                                    <span>▤</span> Narudžbe
                                                </div>

                                                <div className="dashboard-menu-item">
                                                    <span>▥</span> Analitika
                                                </div>

                                                <div className="dashboard-menu-item">
                                                    <span>⚙</span> Postavke
                                                </div>
                                            </div>

                                            <div className="dashboard-content">

                                                <div className="dashboard-topbar">
                                                    <div>
                                                        <small>Dobrodošli natrag!</small>
                                                        <strong>Jelovnik</strong>
                                                    </div>

                                                    <button type="button">
                                                        + Dodaj jelo
                                                    </button>
                                                </div>

                                                <div className="dashboard-tabs">
                                                    <span className="selected">Jela</span>
                                                    <span>Pića</span>
                                                    <span>Deserti</span>
                                                </div>

                                                <div className="dashboard-product">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&q=80"
                                                        alt="Burger"
                                                    />
                                                    <div>
                                                        <strong>Burger klasik</strong>
                                                        <small>12,50 €</small>
                                                    </div>
                                                    <span className="product-toggle"></span>
                                                </div>

                                                <div className="dashboard-product">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=150&q=80"
                                                        alt="Pizza"
                                                    />
                                                    <div>
                                                        <strong>Pizza Margherita</strong>
                                                        <small>10,90 €</small>
                                                    </div>
                                                    <span className="product-toggle"></span>
                                                </div>

                                                <div className="dashboard-product">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&q=80"
                                                        alt="Salata"
                                                    />
                                                    <div>
                                                        <strong>Cezar salata</strong>
                                                        <small>9,50 €</small>
                                                    </div>
                                                    <span className="product-toggle"></span>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="laptop-base"></div>
                                </div>

                                {/* Phone */}
                                <div className="device-phone">
                                    <div className="phone-notch"></div>

                                    <div className="phone-content">
                                        <div className="phone-brand">
                                            <span>✦</span>
                                            MENUTO
                                        </div>

                                        <h3>Bistro Menu</h3>

                                        <div className="phone-tabs">
                                            <span>Jela</span>
                                            <span>Pića</span>
                                            <span>Deserti</span>
                                        </div>

                                        <div className="phone-food">
                                            <img
                                                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=85"
                                                alt="Burger klasik"
                                            />
                                            <strong>Burger klasik</strong>
                                            <span>12,50 €</span>
                                        </div>

                                        <div className="phone-food">
                                            <img
                                                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400&q=85"
                                                alt="Pizza Margherita"
                                            />
                                            <strong>Pizza Margherita</strong>
                                            <span>10,90 €</span>
                                        </div>

                                    </div>
                                </div>

                                <div className="hero-decoration">
                                    <span>✳</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* =================================
                FEATURES STRIP
            ================================= */}

            <section className="home-features">
                <div className="container">

                    <div className="features-strip">

                        {features.map((feature, index) => (
                            <div className="feature-item" key={index}>

                                <div className="feature-icon">
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* =================================
                QR MENU / SOLUTIONS
            ================================= */}

            <section className="home-solutions">
                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">
                            <div className="solutions-image">

                                <img
                                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=85"
                                    alt="Moderan restoran s uređenim stolovima"
                                />

                                <div className="qr-table-card">

                                    <div className="qr-brand">
                                        <span>✦</span> MENUTO
                                    </div>

                                    <strong>Pogledajte<br />naš jelovnik</strong>

                                    <div className="qr-code-visual">
                                        <QrCode />
                                    </div>

                                    <span className="qr-caption">
                                        Skeniraj QR kod
                                    </span>

                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="solutions-content">

                                <span className="home-eyebrow">
                                    ZA KAFIĆE I RESTORANE
                                </span>

                                <h2>
                                    Jedno rješenje za svaki ugostiteljski objekt.
                                </h2>

                                <p>
                                    Bilo da vodite kafić, restoran, bar ili
                                    slastičarnicu – MENUTO vam pomaže digitalizirati
                                    ponudu i unaprijediti iskustvo gostiju.
                                </p>

                                <Link
                                    to="/za-kafice"
                                    className="solution-link"
                                >
                                    <span className="solution-link-icon">
                                        <CupHot />
                                    </span>

                                    <span>
                                        <strong>Za kafiće</strong>
                                        <small>
                                            Brza i moderna prezentacija pića i ponude.
                                        </small>
                                    </span>

                                    <ArrowRight />
                                </Link>

                                <Link
                                    to="/za-restorane"
                                    className="solution-link"
                                >
                                    <span className="solution-link-icon">
                                        <Shop />
                                    </span>

                                    <span>
                                        <strong>Za restorane</strong>
                                        <small>
                                            Pregledan jelovnik, slike jela i bolje iskustvo naručivanja.
                                        </small>
                                    </span>

                                    <ArrowRight />
                                </Link>

                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* =================================
                HOW IT WORKS
            ================================= */}

            <section className="home-how">
                <div className="container">

                    <div className="section-heading text-center">

                        <span className="home-eyebrow">
                            KAKO FUNKCIONIRA
                        </span>

                        <h2>
                            Do digitalnog jelovnika u 3 jednostavna koraka
                        </h2>

                    </div>

                    <div className="row g-4 steps-row">

                        {steps.map((step, index) => (
                            <div className="col-md-4" key={index}>

                                <div className="step-card">

                                    <div className="step-top">
                                        <span className="step-number">
                                            {step.number}
                                        </span>

                                        <div className="step-icon">
                                            {step.icon}
                                        </div>
                                    </div>

                                    <h3>{step.title}</h3>

                                    <p>{step.description}</p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* =================================
                STATS
            ================================= */}

            <section className="home-stats">
                <div className="container">

                    <div className="stats-wrapper">

                        {benefits.map((benefit, index) => (
                            <div className="stat-item" key={index}>

                                <div className="stat-icon">
                                    {benefit.icon}
                                </div>

                                <div>
                                    <strong>{benefit.value}</strong>
                                    <span>{benefit.label}</span>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* =================================
                FINAL CTA
            ================================= */}

            <section className="home-final-cta">
                <div className="container">

                    <div className="final-cta-wrapper">

                        <div className="final-cta-content">
                            <span className="home-eyebrow">
                                MENUTO DIGITALNI JELOVNIK
                            </span>

                            <h2>
                                Spremni za moderniji jelovnik?
                            </h2>

                            <p>
                                Isprobajte MENUTO i otkrijte koliko je jednostavno
                                digitalizirati svoju ponudu.
                            </p>
                        </div>

                        <div className="final-cta-action">

                            <Link
                                to="/registracija"
                                className="final-cta-button"
                            >
                                Isprobaj besplatno
                                <ArrowRight />
                            </Link>

                            <div className="final-cta-benefits">
                                <span><CheckCircleFill /> Bez kreditne kartice</span>
                                <span><CheckCircleFill /> Bez obveze</span>
                                <span><CheckCircleFill /> Postavljanje u 5 minuta</span>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
}

export default Home;
