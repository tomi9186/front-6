
import SolutionLanding from "../../components/SolutionLanding";

import {
    Building,
    Translate,
    QrCode,
    Image,
    PencilSquare,
    Globe,
    Shop,
    CupHot
} from "react-bootstrap-icons";

function ZaHotele() {

    const data = {
        eyebrow: "DIGITALNI JELOVNIK ZA HOTELE",

        title: "Bolje iskustvo gostiju",
        titleHighlight: "počinje vašom ponudom.",

        description:
            "Digitalizirajte ponudu hotelskog restorana, bara, lounge prostora i dodatnih ugostiteljskih sadržaja. Predstavite gostima pregledne jelovnike i informacije na njihovim mobilnim uređajima.",

        heroImage:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",

        imageAlt: "Luksuzni hotelski prostor",

        introEyebrow: "DIGITALNO UGOSTITELJSTVO",

        introTitle: "Jedna platforma za različite hotelske ponude.",

        introDescription:
            "Hotel može imati restoran, lobby bar, pool bar i room service. MENUTO omogućuje digitalnu prezentaciju različitih jelovnika na jednom mjestu.",

        features: [
            {
                icon: <Building />,
                title: "Više ugostiteljskih sadržaja",
                description: "Organizirajte zasebne jelovnike za hotelski restoran, bar i druge prostore."
            },
            {
                icon: <Translate />,
                title: "Strani jezici",
                description: "Približite ponudu međunarodnim gostima kroz prijevode jelovnika."
            },
            {
                icon: <QrCode />,
                title: "QR kodovi za različite prostore",
                description: "Postavite odgovarajući QR kod u restoran, lobby, bar ili druge prostore."
            },
            {
                icon: <Image />,
                title: "Profesionalna prezentacija",
                description: "Prikažite fotografije jela, pića i hotelske gastronomske ponude."
            },
            {
                icon: <PencilSquare />,
                title: "Centralizirano uređivanje",
                description: "Upravljajte sadržajem i cijenama kroz digitalnu administraciju."
            },
            {
                icon: <Globe />,
                title: "Dostupnost gostima",
                description: "Gosti pregledavaju jelovnik na vlastitom telefonu, bez instalacije aplikacije."
            }
        ],

        benefitsTitle: "Jednostavnije upravljanje hotelskom gastronomskom ponudom.",

        benefitsDescription:
            "Različiti prostori i različite vrste gostiju zahtijevaju dobro organiziranu prezentaciju ponude. Kreirajte jelovnike prilagođene pojedinim hotelskim sadržajima.",

        secondaryImage:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=85",

        secondaryAlt: "Hotelski bazen i hotelski kompleks",

        benefits: [
            "Odvojite ponudu hotelskog restorana i bara.",
            "Pripremite sadržaj za domaće i međunarodne goste.",
            "Postavite različite QR kodove za različite lokacije.",
            "Uređujte jelovnike i cijene kroz administraciju.",
            "Predstavite gastronomsku ponudu fotografijama i opisima."
        ],

        useCasesTitle: "Digitalni jelovnik za svaki dio hotela.",

        useCasesDescription:
            "Prilagodite prezentaciju ponude različitim hotelskim prostorima i uslugama.",

        useCases: [
            {
                icon: <Shop />,
                title: "Hotelski restoran",
                description: "Doručak, ručak, večera i à la carte ponuda."
            },
            {
                icon: <CupHot />,
                title: "Lobby i pool bar",
                description: "Kokteli, pića, grickalice i osvježenja."
            },
            {
                icon: <CupHot />,
                title: "Room service",
                description: "Pregled hrane i pića namijenjenih gostima hotelskih soba."
            },
            {
                icon: <Building />,
                title: "Hotelski sadržaji",
                description: "Ponuda za posebne prostore i ugostiteljske sadržaje."
            }
        ],

        faq: [
            {
                question: "Može li hotel imati više različitih jelovnika?",
                answer: "Da, moguće je organizirati različite jelovnike za restoran, bar i druge prostore. Točan broj objekata i jelovnika ovisi o odabranom MENUTO paketu."
            },
            {
                question: "Mogu li jelovnici biti na više jezika?",
                answer: "Višejezični prikaz može se koristiti za međunarodne goste, ovisno o dostupnim jezičnim funkcionalnostima i konfiguraciji platforme."
            },
            {
                question: "Mogu li postaviti QR kod u hotelske sobe?",
                answer: "Da. QR kod može voditi na odgovarajući digitalni jelovnik koji gosti mogu otvoriti na svojem telefonu."
            },
            {
                question: "Trebaju li gosti instalirati aplikaciju?",
                answer: "Ne. Digitalni jelovnik otvara se u internetskom pregledniku nakon skeniranja QR koda."
            }
        ],

        finalTitle: "Digitalizirajte hotelsku gastronomsku ponudu.",

        finalDescription:
            "Pružite gostima jednostavniji pristup ponudi restorana i barova uz moderan digitalni jelovnik."
    };

    return <SolutionLanding data={data} />;
}

export default ZaHotele;
