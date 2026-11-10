
import { useState } from "react";
import { Link } from "react-router-dom";

import {
    CheckCircleFill,
    ArrowRight,
    QrCode,
    Shop,
    Building,
    Stars,
    ShieldCheck,
    Headset,
    Globe,
    Image,
    PencilSquare,
    GraphUp,
    XCircle
} from "react-bootstrap-icons";

function Cjenik() {

    const [billing, setBilling] = useState("monthly");

    const plans = [
        {
            name: "Starter",
            description: "Sve što vam treba za početak digitalizacije jelovnika.",
            monthly: 9,
            yearly: 90,
            icon: <QrCode />,
            popular: false,
            features: [
                "1 ugostiteljski objekt",
                "Digitalni jelovnik putem QR koda",
                "Upravljanje kategorijama i proizvodima",
                "Dodavanje fotografija",
                "Uređivanje cijena",
                "Prilagodba mobilnim uređajima",
                "Osnovna podrška"
            ]
        },
        {
            name: "Professional",
            description: "Za ugostitelje koji žele više mogućnosti i fleksibilnosti.",
            monthly: 19,
            yearly: 190,
            icon: <Stars />,
            popular: true,
            features: [
                "Sve iz Starter paketa",
                "Više digitalnih jelovnika",
                "Napredna organizacija ponude",
                "Višejezični jelovnik",
                "Napredne mogućnosti prezentacije",
                "Upravljanje dostupnošću proizvoda",
                "Prioritetna podrška"
            ]
        },
        {
            name: "Business",
            description: "Napredno rješenje za hotele i veće ugostiteljske sustave.",
            monthly: 39,
            yearly: 390,
            icon: <Building />,
            popular: false,
            features: [
                "Sve iz Professional paketa",
                "Više ugostiteljskih objekata",
                "Centralizirano upravljanje",
                "Napredna analitika",
                "Prilagođena konfiguracija",
                "Podrška za veće sustave",
                "Prioritetna korisnička podrška"
            ]
        }
    ];

    const comparison = [
        {
            category: "Osnovne funkcionalnosti",
            features: [
                { name: "Digitalni jelovnik", values: [true, true, true] },
                { name: "QR kod", values: [true, true, true] },
                { name: "Mobilno prilagođen prikaz", values: [true, true, true] },
                { name: "Upravljanje proizvodima", values: [true, true, true] },
                { name: "Fotografije proizvoda", values: [true, true, true] },
                { name: "Uređivanje cijena", values: [true, true, true] }
            ]
        },
        {
            category: "Napredne mogućnosti",
            features: [
                { name: "Više jelovnika", values: [false, true, true] },
                { name: "Višejezični prikaz", values: [false, true, true] },
                { name: "Napredna analitika", values: [false, false, true] },
                { name: "Više poslovnih objekata", values: [false, false, true] },
                { name: "Centralizirano upravljanje", values: [false, false, true] }
            ]
        },
        {
            category: "Podrška",
            features: [
                { name: "Standardna podrška", values: [true, true, true] },
                { name: "Prioritetna podrška", values: [false, true, true] },
                { name: "Prilagođena konfiguracija", values: [false, false, true] }
            ]
        }
    ];

    const faqs = [
        {
            question: "Mogu li isprobati MENUTO prije plaćanja?",
            answer: "Da. Možeš ponuditi besplatno probno razdoblje kako bi prije kupnje upoznao sve mogućnosti platforme."
        },
        {
            question: "Mogu li promijeniti paket?",
            answer: "Da. Paket možeš promijeniti prema potrebama svojeg poslovanja i odabranom modelu naplate."
        },
        {
            question: "Trebaju li moji gosti instalirati aplikaciju?",
            answer: "Ne. Gosti skeniraju QR kod kamerom svojeg mobitela i digitalni jelovnik otvara se u internetskom pregledniku."
        },
        {
            question: "Mogu li samostalno uređivati jelovnik?",
            answer: "Da. Ponudu, fotografije, opise i cijene uređuješ kroz MENUTO administraciju."
        },
        {
            question: "Mogu li koristiti MENUTO za više objekata?",
            answer: "Za upravljanje više ugostiteljskih objekata predviđen je Business paket. Dostupne mogućnosti ovise o konačnoj konfiguraciji paketa."
        },
        {
            question: "Što se događa ako želim otkazati pretplatu?",
            answer: "Uvjeti otkazivanja i trajanje pristupa trebaju biti jasno definirani u uvjetima korištenja odabranog paketa."
        }
    ];

    return (
        <main className="pricing-page">

            {/* HERO */}
            <section className="pricing-hero">
                <div className="container">

                    <span className="pricing-eyebrow">
                        JEDNOSTAVNO I TRANSPARENTNO
                    </span>

                    <h1>
                        Odaberite paket koji
                        <span> odgovara vašem poslovanju.</span>
                    </h1>

                    <p>
                        Sve što vam treba za moderan digitalni jelovnik.
                        Od malog kafića do velikog hotelskog sustava.
                    </p>

                    <div className="pricing-billing">

                        <button
                            className={billing === "monthly" ? "active" : ""}
                            onClick={() => setBilling("monthly")}
                        >
                            Mjesečno
                        </button>

                        <button
                            className={billing === "yearly" ? "active" : ""}
                            onClick={() => setBilling("yearly")}
                        >
                            Godišnje
                            <span>Uštedite 2 mjeseca</span>
                        </button>

                    </div>

                </div>
            </section>


            {/* PRICING CARDS */}
            <section className="pricing-plans">
                <div className="container">

                    <div className="row g-4">

                        {plans.map((plan, index) => {

                            const price = billing === "monthly"
                                ? plan.monthly
                                : plan.yearly;

                            const monthlyEquivalent = billing === "yearly"
                                ? (plan.yearly / 12).toFixed(2)
                                : null;

                            return (
                                <div className="col-lg-4" key={plan.name}>

                                    <div className={`pricing-card ${plan.popular ? "pricing-card-popular" : ""}`}>

                                        {plan.popular && (
                                            <div className="pricing-popular-label">
                                                NAJPOPULARNIJI
                                            </div>
                                        )}

                                        <div className="pricing-card-header">

                                            <div className="pricing-plan-icon">
                                                {plan.icon}
                                            </div>

                                            <h2>{plan.name}</h2>

                                            <p>{plan.description}</p>

                                        </div>

                                        <div className="pricing-price">

                                            <div>
                                                <span className="pricing-currency">€</span>
                                                <strong>{price}</strong>
                                                <span className="pricing-period">
                                                    / {billing === "monthly" ? "mj." : "god."}
                                                </span>
                                            </div>

                                            {billing === "yearly" && (
                                                <small>
                                                    {monthlyEquivalent} € mjesečno, uz godišnje plaćanje
                                                </small>
                                            )}

                                        </div>

                                        <Link
                                            to={`/registracija?paket=${plan.name.toLowerCase()}&naplata=${billing}`}
                                            className={`pricing-cta ${plan.popular ? "pricing-cta-primary" : ""}`}
                                        >
                                            Odaberi paket
                                            <ArrowRight />
                                        </Link>

                                        <div className="pricing-divider"></div>

                                        <h3>Što je uključeno:</h3>

                                        <ul className="pricing-features">

                                            {plan.features.map((feature, i) => (
                                                <li key={i}>
                                                    <CheckCircleFill />
                                                    {feature}
                                                </li>
                                            ))}

                                        </ul>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    <p className="pricing-note">
                        Sve cijene su informativni prijedlog. Konačni uvjeti,
                        ograničenja paketa i porezni tretman definiraju se prije objave.
                    </p>

                </div>
            </section>


            {/* BENEFITS */}
            <section className="pricing-benefits">
                <div className="container">

                    <div className="pricing-section-heading text-center">
                        <span className="pricing-eyebrow">
                            ZAŠTO MENUTO?
                        </span>

                        <h2>Više od digitalnog jelovnika.</h2>

                        <p>
                            Sve što vam je potrebno za jednostavnije
                            upravljanje ugostiteljskom ponudom.
                        </p>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-6 col-lg-3">
                            <div className="pricing-benefit-card">
                                <div><QrCode /></div>
                                <h3>QR jelovnik</h3>
                                <p>Gosti pregledavaju ponudu jednim skeniranjem QR koda.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="pricing-benefit-card">
                                <div><PencilSquare /></div>
                                <h3>Jednostavno uređivanje</h3>
                                <p>Upravljajte proizvodima, fotografijama i cijenama na jednom mjestu.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="pricing-benefit-card">
                                <div><Globe /></div>
                                <h3>Pristup svugdje</h3>
                                <p>Digitalni jelovnik dostupan je na mobitelima, tabletima i računalima.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="pricing-benefit-card">
                                <div><ShieldCheck /></div>
                                <h3>Bez instalacije</h3>
                                <p>Gosti ne moraju instalirati dodatnu aplikaciju.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* COMPARISON TABLE */}
            <section className="pricing-comparison">
                <div className="container">

                    <div className="pricing-section-heading text-center">
                        <span className="pricing-eyebrow">
                            USPOREDBA PAKETA
                        </span>

                        <h2>Pronađite paket za svoje potrebe.</h2>

                        <p>
                            Usporedite mogućnosti i odaberite rješenje
                            koje najbolje odgovara vašem objektu.
                        </p>
                    </div>

                    <div className="pricing-table-wrapper">

                        <table className="pricing-table">

                            <thead>
                                <tr>
                                    <th>Funkcionalnost</th>
                                    <th>Starter</th>
                                    <th>Professional</th>
                                    <th>Business</th>
                                </tr>
                            </thead>

                            <tbody>

                                {comparison.map((group, index) => (
                                    <>
                                        <tr className="pricing-table-category" key={`category-${index}`}>
                                            <td colSpan="4">{group.category}</td>
                                        </tr>

                                        {group.features.map((feature, i) => (
                                            <tr key={`${index}-${i}`}>
                                                <td>{feature.name}</td>

                                                {feature.values.map((value, j) => (
                                                    <td key={j}>
                                                        {value
                                                            ? <CheckCircleFill className="pricing-check" />
                                                            : <XCircle className="pricing-cross" />
                                                        }
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            </section>


            {/* FAQ */}
            <section className="pricing-faq">
                <div className="container">

                    <div className="pricing-section-heading text-center">
                        <span className="pricing-eyebrow">
                            ČESTA PITANJA
                        </span>

                        <h2>Imate pitanja o cijenama?</h2>

                        <p>
                            Odgovori na najčešća pitanja o MENUTO paketima.
                        </p>
                    </div>

                    <div className="pricing-faq-list">

                        {faqs.map((faq, index) => (
                            <details className="pricing-faq-item" key={index}>
                                <summary>{faq.question}</summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}

                    </div>

                </div>
            </section>


            {/* FINAL CTA */}
            <section className="pricing-final">
                <div className="container">

                    <div className="pricing-final-wrapper">

                        <div>
                            <span>MENUTO DIGITALNI JELOVNIK</span>

                            <h2>
                                Spremni za moderniji jelovnik?
                            </h2>

                            <p>
                                Započnite digitalizaciju svoje ponude
                                i pružite gostima bolje iskustvo.
                            </p>
                        </div>

                        <div className="pricing-final-action">

                            <Link
                                to="/registracija"
                                className="pricing-final-button"
                            >
                                Isprobaj besplatno
                                <ArrowRight />
                            </Link>

                            <small>
                                Bez kompliciranog postavljanja
                            </small>

                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
}

export default Cjenik;
