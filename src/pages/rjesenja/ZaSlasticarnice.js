
import SolutionLanding from "../../components/SolutionLanding";

import {
    Cake2,
    Image,
    Tags,
    CupHot,
    PencilSquare,
    CurrencyEuro,
    Star
} from "react-bootstrap-icons";

function ZaSlasticarnice() {

    const data = {
        eyebrow: "DIGITALNI JELOVNIK ZA SLASTIČARNICE",

        title: "Neka vaše slastice",
        titleHighlight: "privuku svaki pogled.",

        description:
            "Predstavite kolače, torte, sladolede i ostale slastice kroz atraktivan digitalni jelovnik. Dodajte fotografije, opise, okuse i cijene te gostima olakšajte pregled vaše ponude.",

        heroImage:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=85",

        imageAlt: "Atraktivno posluženi deserti i slastice",

        introEyebrow: "SLATKA PONUDA U DIGITALNOM OBLIKU",

        introTitle: "Vaše slastice zaslužuju vrhunsku prezentaciju.",

        introDescription:
            "Dobra fotografija i jasan opis mogu napraviti veliku razliku. Predstavite svaki kolač, tortu i sladoled na način koji odgovara vašem brendu.",

        features: [
            {
                icon: <Cake2 />,
                title: "Kolači i torte",
                description: "Predstavite svoju ponudu kolača, torti i posebnih slastica."
            },
            {
                icon: <Image />,
                title: "Fotografije slastica",
                description: "Dodajte kvalitetne fotografije svojih proizvoda."
            },
            {
                icon: <Tags />,
                title: "Okusi i varijante",
                description: "Organizirajte različite okuse, veličine i vrste proizvoda."
            },
            {
                icon: <CupHot />,
                title: "Kava i napitci",
                description: "Povežite ponudu slastica s kavom, čajem i ostalim napitcima."
            },
            {
                icon: <PencilSquare />,
                title: "Sezonska ponuda",
                description: "Jednostavno predstavite blagdanske i sezonske proizvode."
            },
            {
                icon: <CurrencyEuro />,
                title: "Ažurne cijene",
                description: "Promijenite cijene i ponudu bez ponovnog tiskanja jelovnika."
            }
        ],

        benefitsTitle: "Svaka slastica ima svoju priču. Ispričajte je fotografijom.",

        benefitsDescription:
            "Kolači, torte i sladoledi posebno su vizualni proizvodi. Kroz digitalni jelovnik možete gostima prikazati izgled, sastav, okuse i cijene svoje ponude.",

        secondaryImage:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1000&q=85",

        secondaryAlt: "Različite slastice i kolači",

        benefits: [
            "Dodajte fotografije i opise svojih slastica.",
            "Organizirajte kolače, torte i sladolede u kategorije.",
            "Prikažite okuse, veličine i dostupne varijante.",
            "Predstavite sezonske i blagdanske proizvode.",
            "Povežite slastice s kavom i drugim napitcima."
        ],

        useCasesTitle: "Cjelokupna slatka ponuda na jednom mjestu.",

        useCasesDescription:
            "Od svakodnevnih kolača do posebnih torti i sezonskih slastica.",

        useCases: [
            {
                icon: <Cake2 />,
                title: "Kolači i torte",
                description: "Kremasti kolači, torte, cheesecake i ostali deserti."
            },
            {
                icon: <CupHot />,
                title: "Sladoledi",
                description: "Okusi, kuglice, kombinacije i posebne sladoledne ponude."
            },
            {
                icon: <Image />,
                title: "Posebne slastice",
                description: "Macarons, praline, keksi i ručno rađeni proizvodi."
            },
            {
                icon: <Star />,
                title: "Kava i napitci",
                description: "Kava, čaj, topla čokolada i ostali napitci."
            }
        ],

        faq: [
            {
                question: "Mogu li dodati fotografiju svakog kolača?",
                answer: "Da. Svakom proizvodu možete dodati fotografiju i opis kako bi gosti lakše upoznali vašu ponudu."
            },
            {
                question: "Mogu li organizirati različite okuse sladoleda?",
                answer: "Ponudu možete organizirati u zasebne kategorije ili proizvode prema dostupnim mogućnostima uređivanja proizvoda."
            },
            {
                question: "Mogu li prikazati sezonske torte i kolače?",
                answer: "Da. Sezonske i blagdanske proizvode možete dodavati, uređivati i uklanjati prema svojoj aktualnoj ponudi."
            },
            {
                question: "Mogu li uz kolače prikazati i kavu?",
                answer: "Naravno. Kavu, čajeve i druge napitke možete organizirati u zasebne kategorije unutar istog jelovnika."
            }
        ],

        finalTitle: "Vaše slastice zaslužuju digitalni izlog.",

        finalDescription:
            "Predstavite svoju slatku ponudu kroz moderan jelovnik koji gosti mogu pregledati u nekoliko sekundi."
    };

    return <SolutionLanding data={data} />;
}

export default ZaSlasticarnice;
