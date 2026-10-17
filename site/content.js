/*
 * GoganBau & Gebäudereinigung — all website content in one place.
 * Edit text here; every page is generated from this file (see site/pages.js).
 *
 * SEO: titles (browser tab / Google result, best 50–60 characters) and descriptions
 * (grey text under the Google result, best 120–160 characters) carry the keywords from
 * the keyword list: Abbruch/Entkernung/Rückbau on the demolition pages,
 * Gebäudereinigung/Baustellenreinigung/Unterhaltsreinigung on the cleaning pages.
 */
export default {
    // Public address of the site, used for the sitemap, robots.txt and canonical links.
    siteUrl: 'https://goganbau.de',

    homeTitle: 'Abbruchfirma & Gebäudereinigung München | GoganBau',
    homeDescription:
        'Abbruchfirma für ganz Bayern, Reinigungsfirma in München: Abbruch, Entkernung, Rückbau, Baureinigung und Unterhaltsreinigung – 24/7 erreichbar.',

    name: 'GoganBau & Gebäudereinigung',
    shortName: 'GoganBau',
    founded: 2019,
    region: 'München & Bayern',
    claim: 'Wir sind da, wenn es zählt.',
    motto: 'Praktisch denken. Direkt handeln. Verlässlich liefern.',
    // Small orange line above the big claim; it is the page's main heading (h1) for Google.
    eyebrow: 'Abbruchfirma & Gebäudereinigung in München',
    tagline: 'Abbruch, Entkernung, Rückbau und Reinigung – Ihr Subunternehmer für Bauunternehmen.',

    // "Über uns" text on the home page.
    about: [
        'GoganBau ist Abbruchunternehmen und Reinigungsfirma in einem. Abbrucharbeiten, Entkernung und Rückbau übernehmen wir in ganz Bayern. In München und im Umkreis von bis zu 50 km sorgen wir mit Baureinigung, Bauendreinigung und Unterhaltsreinigung dafür, dass Flächen sauber übergeben werden.',
        'Als Subunternehmer arbeiten wir für Bauunternehmen und Generalunternehmer: für einzelne Bauabschnitte, als zusätzliche Kapazität oder in langfristiger Zusammenarbeit.',
    ],

    // Impressum details.
    legal: {
        owner: 'Cosmin Gogan',
        legalForm: 'Einzelunternehmen',
        // USt-IdNr. (format DE + 9 digits). Shown in the Impressum only when filled in.
        vatId: '',
        // Steuernummer from the Finanzamt. Shown in the Impressum only when filled in.
        taxNumber: '147/146/01297',
    },

    contact: {
        phone: '+49 1575 9283617',
        phoneHref: 'tel:+4915759283617',
        street: 'Rambaldistraße 37',
        postalCode: '81929',
        city: 'München',
        email: 'info@goganbau.de',
        // WhatsApp number in international format, digits only (used for wa.me links).
        whatsapp: '4915759283617',
    },

    // "Per E-Mail senden" goes through Web3Forms (https://web3forms.com), which e-mails each
    // inquiry to the address the key was created with (info@goganbau.de). The key is
    // public by design. While it is empty, the button opens the visitor's mail app instead.
    web3formsKey: '',
    // Fallback recipient for the mail-app fallback.
    inquiryEmail: 'info@goganbau.de',

    // Groups for the service list and menus, in this order.
    serviceGroups: {
        abbruch: 'Abbruch & Rückbau',
        reinigung: 'Reinigung',
        montage: 'Montage & Logistik',
    },

    // Places named under "Einsatzgebiet" on each service page (key = the service's area).
    // Cleaning only lists towns within ~50 km of München.
    areaPlaces: {
        'ganz Bayern': ['München', 'Augsburg', 'Ingolstadt', 'Regensburg', 'Landshut', 'Rosenheim', 'Freising', 'Erding', 'Dachau', 'Fürstenfeldbruck', 'Starnberg'],
        'München und Umkreis bis 50 km': ['München', 'Dachau', 'Freising', 'Erding', 'Fürstenfeldbruck', 'Starnberg'],
    },

    // The key of each service is its URL (/leistungen/<key>/) and the camera focus key in the 3D scene.
    // title: name in menus and lists · short: one line on the home page · text: intro on the service
    // page · body: the paragraphs below it · seoTitle / description: for Google · area: Einsatzgebiet
    // · scene: 3D zone for services without their own · h1: page heading (default "<title> in München").
    // We work manually and with hand-held tools — no heavy machinery, so no "Gebäudeabbruch" claims.
    services: {
        abbruch: {
            number: '01',
            group: 'abbruch',
            area: 'ganz Bayern',
            title: 'Abbrucharbeiten',
            short: 'Innenabbruch und Teilabbruch.',
            seoTitle: 'Abbrucharbeiten München – Abbruchfirma | GoganBau',
            description:
                'Abbrucharbeiten in München und ganz Bayern: Innenabbruch, Teilabbruch und manueller Abbruch von Innenwänden und Mauerwerk – für Bauunternehmen und Gewerbekunden.',
            text: 'Innenabbruch und Teilabbruch – präzise, manuell und mit handgeführten Geräten.',
            body: [
                'Als Abbruchfirma in München und ganz Bayern übernehmen wir Abbrucharbeiten im Gebäudeinneren: Innenabbruch, Teilabbruch und den Abbruch von Innenwänden und Mauerwerk in Büro-, Gewerbe- und Wohngebäuden.',
                'Wir arbeiten manuell und mit handgeführten Geräten – präzise und kontrolliert. Bauunternehmen und Gewerbekunden setzen uns als Subunternehmer für einzelne Bauabschnitte oder als zusätzliche Kapazität ein, mit einem festen Ansprechpartner, der rund um die Uhr erreichbar ist.',
            ],
            points: ['Innenabbruch und Teilabbruch', 'Innenwände und Mauerwerk', 'Manuell, präzise, kontrolliert'],
        },
        entkernung: {
            number: '02',
            group: 'abbruch',
            area: 'ganz Bayern',
            title: 'Entkernung',
            scene: 'abbruch',
            short: 'Entkernung bis auf den Rohbau.',
            seoTitle: 'Entkernung München – Entkernungsfirma | GoganBau',
            description:
                'Entkernung in München und ganz Bayern: Rückbau von Trennwänden, Decken, Bodenbelägen, Fliesen und Estrich – als Vorbereitung für Sanierung, Umbau oder Neubau.',
            text: 'Entkernung bis auf den Rohbau – als Vorbereitung für Sanierung, Umbau oder Neubau.',
            body: [
                'Bei der Entkernung bauen wir Bestandsgebäude bis auf den Rohbau zurück: Trockenbau- und Trennwände, abgehängte Decken, Bodenbeläge, Fliesen und Estrich sowie Bäder und Küchen. Die Materialien trennen wir sauber, die Flächen werden beräumt.',
                'Als Entkernungsfirma arbeiten wir für Bauunternehmen, Generalunternehmer und Sanierungsunternehmen in München und ganz Bayern – vor Sanierung, Umbau oder Neubau.',
            ],
            points: ['Trennwände, Decken, Bodenbeläge', 'Fliesen, Estrich, Bäder, Küchen', 'Sauber getrennt und beräumt'],
        },
        rueckbau: {
            number: '03',
            group: 'abbruch',
            area: 'ganz Bayern',
            title: 'Rückbau',
            short: 'Selektiver Rückbau für Umbau und Sanierung.',
            seoTitle: 'Rückbau München & Bayern – selektiver Rückbau | GoganBau',
            description:
                'Rückbau in München und ganz Bayern: selektiver, abschnittsweiser Rückbau von Büro- und Gewerbeimmobilien als Vorbereitung für Umbau und Sanierung.',
            text: 'Selektiver Rückbau in klarer Reihenfolge – damit Umbau und Sanierung ohne Verzögerung starten.',
            body: [
                'Als Rückbauunternehmen in München und ganz Bayern bauen wir Gebäudeteile selektiv und abschnittsweise zurück – die Materialien sortenrein getrennt. So bereiten wir Umbau und Sanierung von Büro- und Gewerbeimmobilien vor, ohne dass der Zeitplan ins Stocken gerät.',
                'Jeder Schritt wird mit der Bauleitung abgestimmt. Für Bauunternehmen und Generalunternehmer arbeiten wir als Subunternehmer – für einzelne Abschnitte oder das gesamte Rückbauprojekt.',
            ],
            points: ['Selektiv und abschnittsweise', 'Büro- und Gewerbeimmobilien', 'Abgestimmt mit der Bauleitung'],
        },
        baureinigung: {
            number: '04',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Baureinigung',
            short: 'Baustellenreinigung während der Bauphase.',
            seoTitle: 'Baureinigung & Baustellenreinigung München | GoganBau',
            description:
                'Baureinigung und Baustellenreinigung in München: Grob- und Bauzwischenreinigung während der Bauphase – für Bauunternehmen, Generalunternehmer und Bauträger.',
            text: 'Grob- und Zwischenreinigung während der Bauphase – für sichere Wege und saubere Übergaben.',
            body: [
                'Während der Bauphase übernehmen wir die Baustellenreinigung in München: Grobreinigung, Bauzwischenreinigung und die Beräumung von Bauabfällen – für freie, sichere Laufwege bei Neubau, Umbau und Sanierung.',
                'Bauunternehmen, Generalunternehmer und Bauträger setzen uns als Subunternehmer für die Baureinigung ein – regelmäßig nach Plan oder kurzfristig vor einer Übergabe zwischen den Gewerken.',
            ],
            points: ['Grob- und Zwischenreinigung', 'Sichere Laufwege', 'Saubere Übergaben zwischen Gewerken'],
        },
        bauendreinigung: {
            number: '05',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Bauendreinigung',
            short: 'Baufeinreinigung vor der Abnahme.',
            seoTitle: 'Bauendreinigung & Baufeinreinigung München | GoganBau',
            description:
                'Bauendreinigung in München: Baufeinreinigung und Bauschlussreinigung vor der Abnahme – Glasflächen, Rahmen, Böden und Sanitär, übergabefertig für Ihren Bauherrn.',
            text: 'Gründliche Endreinigung vor der Abnahme – übergabefertig für Ihren Bauherrn.',
            body: [
                'Vor der Abnahme sorgen wir mit der Bauendreinigung (Baufeinreinigung, Bauschlussreinigung) dafür, dass Neubau, Umbau oder Renovierung übergabefertig sind: Glasflächen und Rahmen, Böden, Sanitärbereiche und alle sichtbaren Oberflächen.',
                'Für Bauunternehmen und Bauträger übernehmen wir die Bauendreinigung als Subunternehmer – termingenau zur Übergabe an den Bauherrn oder Mieter, auch bei Wohnanlagen und Gewerbeimmobilien.',
            ],
            points: ['Glasflächen und Rahmen', 'Böden und Sanitär', 'Bereit für die Abnahme'],
        },
        gebaeudereinigung: {
            number: '06',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Gebäudereinigung',
            short: 'Gewerbliche Reinigung und Sonderreinigung.',
            seoTitle: 'Gebäudereinigung München – Reinigungsfirma | GoganBau',
            description:
                'Gebäudereinigung in München: gewerbliche Reinigung und Sonderreinigung für Unternehmen, Gewerbeimmobilien und Hausverwaltungen – mit direktem Ansprechpartner.',
            text: 'Gewerbliche Gebäudereinigung und Sonderreinigung – alles aus einer Hand.',
            body: [
                'Als Reinigungsfirma in München übernehmen wir die Gebäudereinigung gewerblicher Objekte – Geschäftsräume, Gewerbe- und Verwaltungsflächen. Von der regelmäßigen Unterhaltsreinigung über Büro- und Treppenhausreinigung bis zur Grundreinigung erhalten Sie alles aus einer Hand.',
                'Für Unternehmen und Hausverwaltungen bieten wir zusätzlich Sonderreinigungen nach Bedarf. Sie haben einen direkten Ansprechpartner, der Termine und Leistungsumfang mit Ihnen abstimmt.',
            ],
            points: ['Gewerbe- und Verwaltungsflächen', 'Sonderreinigung nach Bedarf', 'Alles aus einer Hand'],
        },
        unterhaltsreinigung: {
            number: '07',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Unterhaltsreinigung',
            scene: 'gebaeudereinigung',
            short: 'Regelmäßige Reinigung nach festem Plan.',
            seoTitle: 'Unterhaltsreinigung München – für Unternehmen | GoganBau',
            description:
                'Unterhaltsreinigung in München: regelmäßige Reinigung von Büros, Geschäftsräumen und Gewerbeflächen – täglich, wöchentlich oder monatlich, nach festem Plan.',
            text: 'Regelmäßige Reinigung nach festem Plan – täglich, wöchentlich oder monatlich.',
            body: [
                'Bei der Unterhaltsreinigung reinigen wir Ihre Räume regelmäßig nach einem festen Plan: Böden, Arbeitsflächen, Sanitäranlagen, Küchen und Aufenthaltsräume. So bleiben Büros, Geschäftsräume und Gewerbeflächen dauerhaft gepflegt.',
                'Den Rhythmus legen Sie fest – täglich, wöchentlich oder monatlich. Für Unternehmen, Gewerbemieter und Hausverwaltungen übernehmen wir die Unterhaltsreinigung mit einem direkten Ansprechpartner.',
            ],
            points: ['Fester Reinigungsplan', 'Täglich, wöchentlich oder monatlich', 'Büros, Geschäftsräume, Gewerbe'],
        },
        bueroreinigung: {
            number: '08',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Büroreinigung',
            scene: 'gebaeudereinigung',
            short: 'Regelmäßige Reinigung von Büros.',
            seoTitle: 'Büroreinigung München – Büroreinigungsfirma | GoganBau',
            description:
                'Büroreinigung in München: regelmäßige Reinigung von Büroräumen, Besprechungsräumen, Empfang, Teeküchen und Sanitär – nach Absprache auch nach Feierabend.',
            text: 'Regelmäßige Reinigung von Büros – nach Absprache auch nach Feierabend.',
            body: [
                'Als Büroreinigungsfirma in München reinigen wir Arbeitsplätze, Besprechungs- und Konferenzräume, Empfangsbereiche, Teeküchen und Sanitärbereiche – täglich, wöchentlich oder in dem Rhythmus, den Sie brauchen.',
                'Damit Ihr Team ungestört arbeiten kann, stimmen wir die Reinigungszeiten mit Ihnen ab – auf Wunsch auch nach Feierabend. Für kleine Büros ebenso wie für größere Bürogebäude.',
            ],
            points: ['Arbeitsplätze und Besprechungsräume', 'Empfang, Teeküche, Sanitär', 'Zeiten nach Absprache'],
        },
        grundreinigung: {
            number: '09',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Grundreinigung',
            scene: 'gebaeudereinigung',
            short: 'Intensivreinigung von Böden und Flächen.',
            seoTitle: 'Grundreinigung München – Intensivreinigung | GoganBau',
            description:
                'Grundreinigung in München: gründliche Intensivreinigung von Büros, Gewerbeflächen, Böden und Sanitäranlagen – wenn die regelmäßige Reinigung nicht mehr ausreicht.',
            text: 'Gründliche Intensivreinigung – wenn die regelmäßige Reinigung nicht mehr ausreicht.',
            body: [
                'Bei der Grundreinigung entfernen wir hartnäckige Verschmutzungen, die bei der laufenden Unterhaltsreinigung nicht erfasst werden – auf Böden, Oberflächen und in Sanitäranlagen. So bringen wir Büros, Geschäftsräume und Gewerbeflächen wieder in einen gepflegten Grundzustand.',
                'Typische Anlässe sind ein Mieterwechsel, ein Umzug oder der Start einer neuen Unterhaltsreinigung. Termin und Umfang stimmen wir direkt mit Ihnen ab.',
            ],
            points: ['Bodenreinigung und Oberflächen', 'Sanitäranlagen', 'Vor Mieterwechsel oder Neustart'],
        },
        treppenhausreinigung: {
            number: '10',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Treppenhausreinigung',
            scene: 'gebaeudereinigung',
            short: 'Saubere Treppenhäuser und Eingänge.',
            seoTitle: 'Treppenhausreinigung München – Hausverwaltungen | GoganBau',
            description:
                'Treppenhausreinigung in München: regelmäßige Reinigung von Treppenhäusern, Eingangsbereichen und Fluren – für Hausverwaltungen, Mehrfamilienhäuser und Wohnanlagen.',
            text: 'Regelmäßige Reinigung von Treppenhäusern, Eingängen und Fluren – im festen Rhythmus.',
            body: [
                'Wir reinigen Treppenhäuser, Eingangsbereiche, Flure und Geländer in festen Intervallen – damit Bewohner, Mitarbeiter und Besucher einen gepflegten ersten Eindruck bekommen.',
                'Für Hausverwaltungen und Eigentümer von Mehrfamilienhäusern, Wohnanlagen und Gewerbeimmobilien übernehmen wir die Treppenhausreinigung regelmäßig nach Plan, mit einem direkten Ansprechpartner für Fragen und Änderungen.',
            ],
            points: ['Treppen, Flure und Eingänge', 'Fester Reinigungsrhythmus', 'Mehrfamilienhäuser und Wohnanlagen'],
        },
        praxisreinigung: {
            number: '11',
            group: 'reinigung',
            area: 'München und Umkreis bis 50 km',
            title: 'Praxisreinigung',
            scene: 'gebaeudereinigung',
            short: 'Gründliche Reinigung von Arztpraxen.',
            seoTitle: 'Praxisreinigung München – Arztpraxen | GoganBau',
            description:
                'Praxisreinigung in München: gründliche, regelmäßige Reinigung von Arzt- und Therapiepraxen – Wartebereiche, Behandlungsräume und Sanitär.',
            text: 'Gründliche Reinigung von Arzt- und Therapiepraxen – nach Absprache außerhalb der Sprechzeiten.',
            body: [
                'In Arzt- und Therapiepraxen kommt es auf Sauberkeit besonders an. Wir reinigen Wartebereiche, Empfang, Behandlungsräume und Sanitärbereiche gründlich und in festen Intervallen.',
                'Damit der Praxisbetrieb nicht gestört wird, stimmen wir die Reinigungszeiten mit Ihnen ab – auf Wunsch auch außerhalb der Sprechzeiten.',
            ],
            points: ['Wartebereich und Empfang', 'Behandlungsräume und Sanitär', 'Zeiten nach Ihrer Praxis'],
        },
        tektalan: {
            number: '12',
            group: 'montage',
            title: 'Tektalan-Montage',
            short: 'Fachgerechte Montage von Dämmplatten.',
            seoTitle: 'Tektalan-Montage München – Dämmplatten | GoganBau',
            description:
                'Tektalan-Montage in München: fachgerechte Montage von Tektalan-Dämmplatten an Decken und Wänden in Tiefgaragen, Kellern und Gewerbeflächen.',
            text: 'Montage von Tektalan-Dämmplatten an Decken und Wänden – für Wärme-, Brand- und Schallschutz.',
            body: [
                'Wir montieren Tektalan-Dämmplatten an Decken und Wänden – für Wärme-, Brand- und Schallschutz. Typische Einsatzorte sind Tiefgaragen, Keller und Gewerbeflächen.',
                'Als Subunternehmer übernehmen wir die Montage termingerecht im Ablauf Ihrer Baustelle und stimmen uns direkt mit der Bauleitung ab.',
            ],
            points: ['Tiefgaragen, Keller, Gewerbeflächen', 'Decken- und Wandmontage', 'Fachgerechte Befestigung'],
        },
        logistik: {
            number: '13',
            group: 'montage',
            title: 'Baustellenlogistik',
            short: 'Material, Lieferungen und Abläufe koordiniert.',
            seoTitle: 'Baustellenlogistik München – Koordination | GoganBau',
            description:
                'Baustellenlogistik in München: Wir koordinieren Materialbedarf, Lieferungen, Lagerflächen und Einsatzzeiten, damit Ihre Gewerke ohne Leerlauf arbeiten.',
            text: 'Wir koordinieren Material, Lieferungen und Einsatzzeiten – damit Ihre Gewerke ohne Leerlauf arbeiten.',
            body: [
                'Wir planen Materialbedarf, Anlieferfenster und Lagerflächen und stimmen die Einsatzzeiten der Gewerke aufeinander ab. So entstehen weniger Wartezeiten und weniger Stillstand auf der Baustelle.',
                'Unser Schwerpunkt liegt auf Koordination und Organisation – für Bauunternehmen, die bei der Baustellenorganisation Entlastung brauchen.',
            ],
            points: ['Materialbedarf und Lieferungen', 'Anlieferfenster und Lagerflächen', 'Einsatzzeiten der Gewerke'],
            note: 'Wir koordinieren – Transporte mit eigenen Fahrzeugen bieten wir nicht an.',
        },
    },

    // "Für Bauunternehmen" page (/bauunternehmen/) — B2B page for contractors.
    b2b: {
        seoTitle: 'Subunternehmer Abbruch & Baureinigung Bayern | GoganBau',
        description:
            'Subunternehmer für Bauunternehmen und Generalunternehmer: Abbruch, Entkernung und Rückbau in ganz Bayern, Baureinigung in München – 24/7 erreichbar.',
        h1: 'Abbruch, Rückbau und Baureinigung für Bauunternehmen und Generalunternehmer',
        intro: [
            'Als Subunternehmer (Nachunternehmer) unterstützen wir Bauunternehmen, Generalunternehmer, Bauträger und Sanierungsunternehmen – dort, wo zusätzliche Kapazität gebraucht wird.',
            'Abbrucharbeiten, Entkernung und Rückbau übernehmen wir in ganz Bayern. Baureinigung, Bauendreinigung, Unterhaltsreinigung und Gebäudereinigung bieten wir in München und im Umkreis von bis zu 50 km an. Wir arbeiten manuell und mit handgeführten Geräten.',
        ],
        // How we can be booked (from the original partnership models).
        models: [
            ['Bauabschnitte', 'Unterstützung in klar definierten Projektphasen.'],
            ['Zusätzliche Kapazität', 'Entlastung, wenn Zeitplan oder Umfang mehr Personal erfordern.'],
            ['Wiederkehrende Aufträge', 'Verlässliche Unterstützung bei ähnlichen Leistungsbereichen.'],
            ['Langfristige Zusammenarbeit', 'Partnerschaft mit Blick auf weitere Projekte.'],
        ],
        // The 5-step workflow (from the original process).
        process: [
            ['Kontakt', 'Projekt, Standort, Bedarf und Zeitfenster aufnehmen.'],
            ['Abstimmung', 'Leistungsumfang, Termine und Zuständigkeiten verbindlich klären.'],
            ['Koordination', 'Material, Personal, Einsatzzeiten und Abläufe organisieren.'],
            ['Ausführung', 'Vereinbarte Leistungen strukturiert umsetzen.'],
            ['Übergabe', 'Ergebnis kontrollieren und den nächsten Schritt festlegen.'],
        ],
    },

    // Vorher / Nachher. Put the photos in public/images/projekte/ — a project only shows
    // on the site once both of its files exist. Set symbolbild: true for stock or AI
    // images, so they are labelled as such (not your own project photos).
    projects: [
        {
            service: 'entkernung',
            title: 'Entkernung Bürogeschoss',
            before: 'images/projekte/abbruch-vorher.jpg',
            after: 'images/projekte/abbruch-nachher.jpg',
            symbolbild: false,
        },
        {
            service: 'bauendreinigung',
            title: 'Bauendreinigung vor Übergabe',
            before: 'images/projekte/reinigung-vorher.jpg',
            after: 'images/projekte/reinigung-nachher.jpg',
            symbolbild: false,
        },
    ],

    // "Unsere Schwerpunkte" on the home page — the two SEO directions plus Montage & Logistik.
    focusAreas: [
        {
            title: 'Abbruch & Rückbau in ganz Bayern',
            text: 'Als Abbruchfirma übernehmen wir Innenabbruch und Teilabbruch, die Entkernung bis auf den Rohbau und den selektiven Rückbau als Vorbereitung für Umbau und Sanierung. Wir trennen Materialien sauber, beräumen die Flächen und stimmen jeden Schritt mit Ihrer Bauleitung ab.',
            services: ['abbruch', 'entkernung', 'rueckbau'],
        },
        {
            title: 'Gebäudereinigung & Baureinigung in München',
            text: 'Von der Baustellenreinigung während der Bauphase über die Bauendreinigung vor der Abnahme bis zur regelmäßigen Unterhaltsreinigung und Büroreinigung: Als Reinigungsfirma sorgen wir in München und im Umkreis von bis zu 50 km dafür, dass Flächen sicher, sauber und übergabefertig sind. Dazu kommen Grundreinigung, Treppenhausreinigung und Praxisreinigung.',
            services: ['baureinigung', 'bauendreinigung', 'gebaeudereinigung', 'unterhaltsreinigung', 'bueroreinigung', 'grundreinigung', 'treppenhausreinigung', 'praxisreinigung'],
        },
        {
            title: 'Montage & Baustellenlogistik',
            text: 'Ergänzend montieren wir Tektalan-Dämmplatten in Tiefgaragen, Kellern und Gewerbeflächen und koordinieren Material, Lieferungen und Einsatzzeiten auf der Baustelle.',
            services: ['tektalan', 'logistik'],
        },
    ],

    // "Häufige Fragen" on the home page. Answers are collapsed until tapped; only state facts.
    faq: [
        {
            q: 'Sind Sie wirklich rund um die Uhr erreichbar?',
            a: 'Ja. Für Anfragen und projektbezogene Abstimmungen sind wir 24/7 erreichbar – per Telefon, WhatsApp oder über das Anfrageformular. Einsatzzeiten und Umfang stimmen wir projektbezogen mit Ihnen ab.',
        },
        {
            q: 'In welchem Gebiet sind Sie tätig?',
            a: 'Abbruch, Entkernung und Rückbau übernehmen wir in ganz Bayern – zum Beispiel in München, Augsburg, Ingolstadt, Regensburg, Landshut und Rosenheim. Unsere Reinigungsleistungen bieten wir in München und im Umkreis von bis zu 50 km an, etwa in Dachau, Freising, Erding, Fürstenfeldbruck und Starnberg.',
        },
        {
            q: 'Arbeiten Sie als Subunternehmer für Bauunternehmen?',
            a: 'Ja. Wir unterstützen Bauunternehmen und Generalunternehmer als Subunternehmer – für einzelne Bauabschnitte, als zusätzliche Kapazität bei engem Zeitplan oder bei wiederkehrenden Aufträgen.',
        },
        {
            q: 'Kann ich mehrere Leistungen kombinieren?',
            a: 'Ja. Abbruch, Entkernung, Baureinigung und Bauendreinigung lassen sich in einem Projekt zusammenführen – mit einem Ansprechpartner statt mehrerer Firmen.',
        },
        {
            q: 'Was ist der Unterschied zwischen Baureinigung und Bauendreinigung?',
            a: 'Die Baureinigung (Baustellenreinigung) findet während der Bauphase statt: Grob- und Zwischenreinigung für sichere Laufwege und saubere Übergaben zwischen den Gewerken. Die Bauendreinigung ist die gründliche Schlussreinigung vor der Abnahme – Glasflächen, Rahmen, Böden und Sanitär.',
        },
        {
            q: 'Übernehmen Sie auch Transporte?',
            a: 'Unsere Baustellenlogistik umfasst die Koordination von Materialbedarf, Anlieferfenstern, Lagerflächen und Einsatzzeiten. Transporte mit eigenen Fahrzeugen bieten wir nicht an.',
        },
        {
            q: 'Wie läuft eine Anfrage ab?',
            a: 'Sie schreiben uns kurz, was, wo und wann. Wir klären Leistungsumfang, Termine und Zuständigkeiten, koordinieren Personal und Material, führen die Arbeiten aus und übergeben das Ergebnis mit klaren nächsten Schritten.',
        },
    ],

    // "Über uns" — one short line each.
    highlights: [
        '24/7 erreichbar – auch nach Feierabend.',
        'Ein direkter Ansprechpartner.',
        'Flexible Kapazität für jede Bauphase.',
        'Mehrere Leistungen aus einer Hand.',
    ],
};
