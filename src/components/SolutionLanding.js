
import { Link } from "react-router-dom";
import {
    ArrowRight,
    CheckCircleFill,
    QrCode,
    PencilSquare,
    ClipboardCheck
} from "react-bootstrap-icons";

import "./Solutions.css";

function SolutionLanding({ data }) {
    const steps = [
        {
            icon: <ClipboardCheck />,
            title: "Registrirajte se",
            description: "Otvorite svoj MENUTO račun i unesite podatke o svojem objektu."
        },
        {
            icon: <PencilSquare />,
            title: "Dodajte svoju ponudu",
            description: "Unesite proizvode, kategorije, fotografije i cijene."
        },
        {
            icon: <QrCode />,
            title: "Podijelite QR kod",
            description: "Preuzmite QR kod i omogućite gostima pristup jelovniku."
        }
    ];

    return (
        <main className="solution-page">

            {/* HERO */}
            <section className="solution-hero">
                <div className="container">
                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">
                            <div className="solution-hero-content">

                                <span className="solution-eyebrow">
                                    {data.eyebrow}
                                </span>

                                <h1>
                                    {data.title}
                                    <span>{data.titleHighlight}</span>
                                </h1>

                                <p className="solution-hero-description">
                                    {data.description}
                                </p>

                                <div className="solution-hero-buttons">
                                    <Link
                                        to="/registracija"
                                        className="solution-btn-primary"
                                    >
                                        Isprobaj besplatno <ArrowRight />
                                    </Link>

                                    <Link
                                        to="/primjeri"
                                        className="solution-btn-outline"
                                    >
                                        Pogledaj primjere
                                    </Link>
                                </div>

                                <div className="solution-trust">
                                    <span><CheckCircleFill /> Jednostavno korištenje</span>
                                    <span><CheckCircleFill /> Bez instalacije aplikacije</span>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="solution-hero-image">
                                <img src={data.heroImage} alt={data.imageAlt} />

                                <div className="solution-image-card">
                                    <div className="solution-image-card-icon">
                                        <QrCode />
                                    </div>

                                    <div>
                                        <strong>Vaš digitalni jelovnik</strong>
                                        <span>Dostupan jednim skeniranjem</span>
                                    </div>

                                    <CheckCircleFill />
                                </div>

                                <div className="solution-image-decoration"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="solution-intro">
                <div className="container">

                    <div className="solution-section-heading text-center">
                        <span className="solution-eyebrow">
                            {data.introEyebrow}
                        </span>

                        <h2>{data.introTitle}</h2>
                        <p>{data.introDescription}</p>
                    </div>

                    <div className="row g-4">
                        {data.features.map((feature, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="solution-feature-card">

                                    <div className="solution-feature-icon">
                                        {feature.icon}
                                    </div>

                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* BENEFITS */}
            <section className="solution-benefits">
                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">
                            <div className="solution-benefits-image">
                                <img
                                    src={data.secondaryImage}
                                    alt={data.secondaryAlt}
                                    loading="lazy"
                                />

                                <div className="solution-floating-badge">
                                    <CheckCircleFill />
                                    Ponuda uvijek ažurna
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="solution-benefits-content">

                                <span className="solution-eyebrow">
                                    JEDNOSTAVNO UPRAVLJANJE
                                </span>

                                <h2>{data.benefitsTitle}</h2>
                                <p>{data.benefitsDescription}</p>

                                <ul className="solution-check-list">
                                    {data.benefits.map((benefit, index) => (
                                        <li key={index}>
                                            <CheckCircleFill />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/registracija"
                                    className="solution-text-link"
                                >
                                    Kreirajte svoj digitalni jelovnik
                                    <ArrowRight />
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* USE CASES */}
            <section className="solution-usecases">
                <div className="container">

                    <div className="solution-section-heading text-center">
                        <span className="solution-eyebrow">
                            PRILAGOĐENO VAŠEM POSLOVANJU
                        </span>

                        <h2>{data.useCasesTitle}</h2>
                        <p>{data.useCasesDescription}</p>
                    </div>

                    <div className="row g-4">
                        {data.useCases.map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="solution-usecase-card">

                                    <div className="solution-usecase-icon">
                                        {item.icon}
                                    </div>

                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="solution-steps">
                <div className="container">

                    <div className="solution-section-heading text-center">
                        <span className="solution-eyebrow">
                            KAKO FUNKCIONIRA
                        </span>

                        <h2>Do digitalnog jelovnika u 3 koraka</h2>

                        <p>
                            Nije potrebno tehničko znanje. Sve možete
                            postaviti samostalno, jednostavno i brzo.
                        </p>
                    </div>

                    <div className="row g-4">
                        {steps.map((step, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="solution-step-card">

                                    <div className="solution-step-number">
                                        0{index + 1}
                                    </div>

                                    <div className="solution-step-icon">
                                        {step.icon}
                                    </div>

                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <section className="solution-faq">
                <div className="container">

                    <div className="solution-section-heading text-center">
                        <span className="solution-eyebrow">
                            ČESTA PITANJA
                        </span>

                        <h2>Sve što trebate znati o MENUTO-u</h2>
                    </div>

                    <div className="solution-faq-list">
                        {data.faq.map((item, index) => (
                            <details className="solution-faq-item" key={index}>
                                <summary>{item.question}</summary>
                                <p>{item.answer}</p>
                            </details>
                        ))}
                    </div>

                </div>
            </section>

            {/* FINAL CTA */}
            <section className="solution-final-cta">
                <div className="container">

                    <div className="solution-final-wrapper">

                        <div>
                            <span className="solution-final-eyebrow">
                                MENUTO DIGITALNI JELOVNIK
                            </span>

                            <h2>{data.finalTitle}</h2>
                            <p>{data.finalDescription}</p>
                        </div>

                        <div className="solution-final-action">
                            <Link
                                to="/registracija"
                                className="solution-final-button"
                            >
                                Isprobaj besplatno <ArrowRight />
                            </Link>

                            <span>
                                <CheckCircleFill />
                                Jednostavno postavljanje
                            </span>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}

export default SolutionLanding;
