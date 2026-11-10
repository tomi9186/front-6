
import SolutionLanding from "../../components/SolutionLanding";

import {
    CupHot,
    Star,
    Clock,
    Image,
    PencilSquare
} from "react-bootstrap-icons";

function ZaBarove() {

    const data = {
        eyebrow: "DIGITALNI JELOVNIK ZA BAROVE",

        title: "Vaša pića. Vaš stil.",
        titleHighlight: "Vaš digitalni meni.",

        description:
            "Predstavite koktele, vina, piva i signature napitke kroz moderan digitalni meni. Olakšajte gostima pregled ponude i jednostavno upravljajte cijenama i novitetima.",

        heroImage:
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=85",

        imageAlt: "Moderan bar s ponudom koktela",

        introEyebrow: "DIGITALNI MENI ZA MODERNE BAROVE",

        introTitle: "Od prvog koktela do posljednjeg pića.",

        introDescription:
            "Bilo da vodite cocktail bar, lounge bar ili pub, predstavite svoju ponudu pregledno i u stilu svojeg objekta.",

        features: [
            {
                icon: <CupHot />,
                title: "Cocktail karta",
                description: "Predstavite klasične koktele, signature kreacije i njihove sastojke."
            },
            {
                icon: <CupHot />,
                title: "Pivo i ostala pića",
                description: "Organizirajte craft piva, točena piva, vina i žestoka pića."
            },
            {
                icon: <Star />,
                title: "Signature ponuda",
                description: "Izdvojite autorske koktele i specijalitete svojeg bara."
            },
            {
                icon: <Clock />,
                title: "Posebne ponude",
                description: "Predstavite vremenski ograničene ponude i posebne menije."
            },
            {
                icon: <Image />,
                title: "Vizualna prezentacija",
                description: "Dodajte atraktivne fotografije koktela i pića."
            },
            {
                icon: <PencilSquare />,
                title: "Brze izmjene",
                description: "Ažurirajte cijene i dostupnost pića u nekoliko klikova."
            }
        ],

        benefitsTitle: "Digitalna cocktail karta koja prati vaš stil.",

        benefitsDescription:
            "Gostima predstavite više od naziva i cijene pića. Dodajte fotografije, sastojke, kratke opise i informacije o karakteru svojih koktela.",

        secondaryImage:
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1000&q=85",

        secondaryAlt: "Različiti kokteli u baru",

        benefits: [
            "Organizirajte koktele prema vrstama i kategorijama.",
            "Predstavite sastojke i posebnosti svojih pića.",
            "Izdvojite signature koktele i preporuke barmena.",
            "Ažurirajte cijene bez ponovnog tiskanja menija.",
            "Dodajte sezonske napitke i nove kreacije."
        ],

        useCasesTitle: "Svaka kategorija pića ima svoje mjesto.",

        useCasesDescription:
            "Kreirajte preglednu ponudu za sve goste, bez obzira na stil i koncept vašeg bara.",

        useCases: [
            {
                icon: <CupHot />,
                title: "Kokteli",
                description: "Klasični kokteli, autorske kreacije i bezalkoholni kokteli."
            },
            {
                icon: <CupHot />,
                title: "Pivo",
                description: "Točeno, craft i flaširano pivo."
            },
            {
                icon: <Star />,
                title: "Vina i žestoka pića",
                description: "Vinska karta, viski, gin, rum i ostala pića."
            },
            {
                icon: <Clock />,
                title: "Posebne ponude",
                description: "Happy hour, sezonske ponude i posebni meniji."
            }
        ],

        faq: [
            {
                question: "Mogu li kreirati posebnu cocktail kartu?",
                answer: "Da. Kreirajte zasebnu kategoriju za koktele i dodajte nazive, opise, fotografije, sastojke i cijene."
            },
            {
                question: "Mogu li izdvojiti signature koktele?",
                answer: "Da. Možete ih organizirati u zasebnu kategoriju ili ih posebno istaknuti u ponudi."
            },
            {
                question: "Mogu li mijenjati cijene tijekom večeri?",
                answer: "Da. Cijene možete uređivati kroz administraciju, a promjene će biti prikazane na digitalnom meniju."
            },
            {
                question: "Je li digitalni meni prikladan za lounge barove i pubove?",
                answer: "Da. MENUTO možete koristiti za različite vrste barova, uz prilagodbu kategorija i sadržaja vlastitoj ponudi."
            }
        ],

        finalTitle: "Podignite prezentaciju svojeg bara na novu razinu.",

        finalDescription:
            "Kreirajte moderan digitalni meni koji odgovara atmosferi i identitetu vašeg bara."
    };

    return <SolutionLanding data={data} />;
}

export default ZaBarove;
