
import SolutionLanding from "../../components/SolutionLanding";

import {
    CupHot,
    PencilSquare,
    Image,
    QrCode,
    Clock,
    Cake2,
    Star
} from "react-bootstrap-icons";

function ZaKafice() {

    const data = {
        eyebrow: "DIGITALNI JELOVNIK ZA KAFIĆE",

        title: "Modernizirajte ponudu svog",
        titleHighlight: "kafića.",

        description:
            "Predstavite kavu, pića i ostalu ponudu na moderan način. Omogućite gostima da putem QR koda pregledaju jelovnik, dok vi jednostavno upravljate ponudom i cijenama.",

        heroImage:
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=85",

        imageAlt: "Moderan kafić s ponudom kave i pića",

        introEyebrow: "VIŠE OD KLASIČNOG CJENIKA",

        introTitle: "Vaš kafić zaslužuje moderan digitalni jelovnik.",

        introDescription:
            "Zaboravite na ponovno tiskanje cjenika i zastarjele jelovnike. S MENUTO-om svoju ponudu uređujete na jednom mjestu.",

        features: [
            {
                icon: <CupHot />,
                title: "Kava i topli napitci",
                description: "Predstavite vrste kave, čajeve, tople čokolade i ostale napitke."
            },
            {
                icon: <CupHot />,
                title: "Pića i osvježenja",
                description: "Organizirajte sokove, vode, piva, vina i druga pića."
            },
            {
                icon: <PencilSquare />,
                title: "Jednostavna promjena cijena",
                description: "Ažurirajte cijene u nekoliko klikova bez ponovnog tiskanja cjenika."
            },
            {
                icon: <Image />,
                title: "Fotografije proizvoda",
                description: "Prikažite ponudu fotografijama koje gostima olakšavaju odabir."
            },
            {
                icon: <QrCode />,
                title: "QR kod na svakom stolu",
                description: "Gosti mogu pregledati ponudu vlastitim mobitelom."
            },
            {
                icon: <Clock />,
                title: "Dnevna i sezonska ponuda",
                description: "Jednostavno predstavite posebne ponude i sezonske napitke."
            }
        ],

        benefitsTitle: "Cjenik koji možete promijeniti u bilo kojem trenutku.",

        benefitsDescription:
            "Promijenila se cijena kave? Uveli ste novo piće ili sezonsku ponudu? Sve promjene napravite kroz MENUTO administraciju.",

        secondaryImage:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&q=85",

        secondaryAlt: "Uređen interijer kafića",

        benefits: [
            "Dodajte kategorije i proizvode prema mogućnostima paketa.",
            "Uređujte cijene i opise bez ponovnog tiskanja.",
            "Dodajte fotografije svojih proizvoda.",
            "Organizirajte kavu, čajeve, sokove i pića.",
            "Prikažite jelovnik na mobitelima, tabletima i računalima."
        ],

        useCasesTitle: "Sve što vaš kafić nudi, na jednom mjestu.",

        useCasesDescription:
            "Organizirajte jelovnik prema stvarnoj ponudi vašeg ugostiteljskog objekta.",

        useCases: [
            {
                icon: <CupHot />,
                title: "Kava i čaj",
                description: "Espresso, cappuccino, macchiato, čajevi i topli napitci."
            },
            {
                icon: <CupHot />,
                title: "Pića",
                description: "Sokovi, vode, gazirana pića, piva i vina."
            },
            {
                icon: <Cake2 />,
                title: "Deserti",
                description: "Kolači, slastice, kroasani i ostala ponuda."
            },
            {
                icon: <Star />,
                title: "Posebna ponuda",
                description: "Izdvojite preporuke, novitete i sezonske proizvode."
            }
        ],

        faq: [
            {
                question: "Mogu li samostalno mijenjati cijene pića?",
                answer: "Da. Nakon prijave u MENUTO dashboard možete uređivati proizvode, opise i cijene. Promjene se prikazuju na digitalnom jelovniku."
            },
            {
                question: "Trebam li posebne QR čitače?",
                answer: "Ne. Gosti koriste kameru svog pametnog telefona za skeniranje QR koda."
            },
            {
                question: "Mogu li imati odvojene kategorije za kavu i ostala pića?",
                answer: "Da. Ponudu možete organizirati u kategorije poput kave, čajeva, sokova, piva, vina i deserata."
            },
            {
                question: "Mogu li dodati fotografije proizvoda?",
                answer: "Da. Proizvodima možete dodati fotografije kako bi gosti lakše pregledali ponudu."
            }
        ],

        finalTitle: "Vrijeme je za moderniji cjenik vašeg kafića.",

        finalDescription:
            "Pridružite se novom načinu predstavljanja ponude i pojednostavite svakodnevno upravljanje cjenikom."
    };

    return <SolutionLanding data={data} />;
}

export default ZaKafice;
