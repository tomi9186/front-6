
import SolutionLanding from "../../components/SolutionLanding";

import {
    Image,
    Tags,
    ClipboardCheck,
    CurrencyEuro,
    Translate,
    Star,
    Shop,
    Cake2
} from "react-bootstrap-icons";

function ZaRestorane() {

    const data = {
        eyebrow: "DIGITALNI JELOVNIK ZA RESTORANE",

        title: "Predstavite svoja jela na",
        titleHighlight: "najbolji način.",

        description:
            "Digitalni jelovnik koji gostima omogućuje pregled jela, fotografija, sastojaka, cijena i alergena. Upravljajte kompletnom gastronomskom ponudom jednostavno i na jednom mjestu.",

        heroImage:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",

        imageAlt: "Elegantno poslužena jela u restoranu",

        introEyebrow: "GASTRONOMIJA U DIGITALNOM IZDANJU",

        introTitle: "Neka vaša jela govore sama za sebe.",

        introDescription:
            "Fotografije, detaljni opisi i pregledne kategorije pomažu gostima da upoznaju vašu ponudu prije nego što odaberu svoje jelo.",

        features: [
            {
                icon: <Image />,
                title: "Fotografije jela",
                description: "Predstavite specijalitete kvalitetnim fotografijama."
            },
            {
                icon: <Tags />,
                title: "Pregledne kategorije",
                description: "Organizirajte predjela, glavna jela, priloge, deserte i pića."
            },
            {
                icon: <ClipboardCheck />,
                title: "Sastojci i alergeni",
                description: "Informirajte goste o sastavu jela i relevantnim alergenima."
            },
            {
                icon: <CurrencyEuro />,
                title: "Ažurne cijene",
                description: "Promijenite cijene i ponudu bez ponovnog tiskanja jelovnika."
            },
            {
                icon: <Translate />,
                title: "Višejezična ponuda",
                description: "Pripremite sadržaj jelovnika na jezicima svojih gostiju."
            },
            {
                icon: <Star />,
                title: "Preporuke kuhinje",
                description: "Izdvojite specijalitete kuće, preporuke kuhara i sezonska jela."
            }
        ],

        benefitsTitle: "Svako jelo zaslužuje kvalitetnu prezentaciju.",

        benefitsDescription:
            "Gostima omogućite da upoznaju vašu gastronomsku ponudu kroz fotografije, opise i pregledne informacije.",

        secondaryImage:
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&q=85",

        secondaryAlt: "Lijepo prezentirano restoransko jelo",

        benefits: [
            "Organizirajte predjela, juhe, glavna jela i deserte.",
            "Dodajte fotografije i detaljne opise jela.",
            "Prikažite sastojke i informacije o alergenima.",
            "Upravljajte cijenama i dostupnošću proizvoda.",
            "Pripremite prijevode za domaće i strane goste."
        ],

        useCasesTitle: "Kompletna gastronomska ponuda u jednom jelovniku.",

        useCasesDescription:
            "Od doručka do večere, sve kategorije vaše kuhinje organizirane su na jednom mjestu.",

        useCases: [
            {
                icon: <ClipboardCheck />,
                title: "Predjela i juhe",
                description: "Predstavite hladna i topla predjela te dnevne juhe."
            },
            {
                icon: <Shop />,
                title: "Glavna jela",
                description: "Meso, riba, tjestenine, pizze i vegetarijanska jela."
            },
            {
                icon: <Cake2 />,
                title: "Deserti",
                description: "Torte, kolači, sladoledi i ostali deserti."
            },
            {
                icon: <Cake2 />,
                title: "Vinska karta",
                description: "Organizirajte vina, piva, koktele i ostala pića."
            }
        ],

        faq: [
            {
                question: "Mogu li prikazati alergene za svako jelo?",
                answer: "Možete unositi informacije o sastojcima i alergenima ako su odgovarajuća polja implementirana u vašem MENUTO sustavu. Vlasnik restorana odgovoran je za točnost podataka."
            },
            {
                question: "Mogu li imati različite kategorije jela?",
                answer: "Da. Organizirajte jelovnik prema kategorijama kao što su predjela, juhe, glavna jela, prilozi, deserti i pića."
            },
            {
                question: "Mogu li imati jelovnik na više jezika?",
                answer: "Višejezičnost ovisi o implementiranim funkcionalnostima MENUTO platforme."
            },
            {
                question: "Mogu li promijeniti dnevnu ponudu?",
                answer: "Da. Ponudu možete ažurirati kroz administraciju bez potrebe za ponovnim tiskom jelovnika."
            }
        ],

        finalTitle: "Vaša kuhinja. Vaša priča. Vaš digitalni jelovnik.",

        finalDescription:
            "Predstavite gastronomsku ponudu profesionalno i pružite gostima jednostavniji način pregledavanja jelovnika."
    };

    return <SolutionLanding data={data} />;
}

export default ZaRestorane;
