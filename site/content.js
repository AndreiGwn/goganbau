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
        'Abbruchfirma und Reinigungsfirma in München: Abbrucharbeiten, Entkernung, Rückbau, Baureinigung und Gebäudereinigung – Subunternehmer, 24/7 erreichbar.',

    name: 'GoganBau & Gebäudereinigung',
    shortName: 'GoganBau',
    founded: 2019,
    region: 'München & Umgebung',
    claim: 'Wir sind da, wenn es zählt.',
    motto: 'Praktisch denken. Direkt handeln. Verlässlich liefern.',
    // Small orange line above the big claim; it is the page's main heading (h1) for Google.
    eyebrow: 'Abbruchfirma & Gebäudereinigung in München',
    tagline: 'Abbruch, Entkernung, Rückbau und Reinigung – Ihr Subunternehmer für Bauunternehmen.',

    // "Über uns" text on the home page.
    about: [
        'GoganBau ist Abbruchunternehmen und Reinigungsfirma in einem. Wir übernehmen Abbrucharbeiten, Entkernung und Rückbau in München und Umgebung – und sorgen mit Baureinigung, Bauendreinigung und Unterhaltsreinigung dafür, dass Flächen sauber übergeben werden.',
        'Als Subunternehmer arbeiten wir für Bauunternehmen und Generalunternehmer: für einzelne Bauabschnitte, als zusätzliche Kapazität oder in langfristiger Zusammenarbeit.',
    ],

    contact: {
        phone: '+49 1575 9283617',
        phoneHref: 'tel:+4915759283617',
        street: 'Rambaldistraße 37',
        // Postcode still missing — fill it in; until then the legal pages show [PLZ].
        postalCode: '',
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

    // The key of each service is its URL (/leistungen/<key>/) and the camera focus key in the 3D scene.
    // title: name in menus and lists · short: one line on the home page · text: intro on the service
    // page · body: the paragraphs below it · seoTitle / description: for Google.
    services: {
        abbruch: {
            number: '01',
            title: 'Abbruch & Entkernung',
            short: 'Abbrucharbeiten, Entkernung, Beräumung.',
            seoTitle: 'Abbruchfirma München – Abbruch & Entkernung | GoganBau',
            description:
                'Abbrucharbeiten und Entkernung in München: Wir entkernen Bestandsgebäude bis auf den Rohbau, demontieren Ausbauelemente und beräumen die Flächen.',
            text: 'Wir entkernen Bestandsgebäude bis auf den Rohbau – sauber getrennt und bereit für den nächsten Schritt.',
            body: [
                'Als Abbruchfirma in München übernehmen wir Abbrucharbeiten, Demontage und die komplette Entkernung von Bestandsgebäuden. Wir trennen die Materialien sauber und beräumen die Flächen, damit das nächste Gewerk ohne Verzögerung starten kann.',
                'Bauunternehmen und Generalunternehmer setzen uns als Subunternehmer für einzelne Bauabschnitte oder als zusätzliche Kapazität ein – mit einem festen Ansprechpartner, der rund um die Uhr erreichbar ist.',
            ],
            points: ['Entkernung bis auf den Rohbau', 'Demontage von Ausbauelementen', 'Beräumung der Flächen'],
        },
        rueckbau: {
            number: '02',
            title: 'Rückbau',
            short: 'Strukturiert – bereit für Umbau und Sanierung.',
            seoTitle: 'Rückbau München – Rückbauunternehmen | GoganBau',
            description:
                'Rückbau in München: geplanter, abschnittsweiser Rückbau als Vorbereitung für Umbau und Sanierung – abgestimmt mit Ihrer Bauleitung.',
            text: 'Geplanter Rückbau in klarer Reihenfolge – damit Umbau und Sanierung ohne Verzögerung starten.',
            body: [
                'Als Rückbauunternehmen in München bauen wir Gebäudeteile abschnittsweise und in klarer Reihenfolge zurück. So bereiten wir Umbau und Sanierung vor, ohne dass der Zeitplan ins Stocken gerät.',
                'Jeder Schritt wird mit der Bauleitung abgestimmt. Für Bauunternehmen arbeiten wir als Subunternehmer – für einzelne Abschnitte oder das gesamte Rückbauprojekt.',
            ],
            points: ['Abschnittsweise geplant', 'Vorbereitung für Umbau und Sanierung', 'Abgestimmt mit der Bauleitung'],
        },
        tektalan: {
            number: '03',
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
            number: '04',
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
        baureinigung: {
            number: '05',
            title: 'Baureinigung',
            short: 'Baustellenreinigung während der Bauphase.',
            seoTitle: 'Baureinigung & Baustellenreinigung München | GoganBau',
            description:
                'Baureinigung und Baustellenreinigung in München: Grob- und Bauzwischenreinigung während der Bauphase – für sichere Laufwege und saubere Übergaben.',
            text: 'Grob- und Zwischenreinigung während der Bauphase – für sichere Wege und saubere Übergaben.',
            body: [
                'Während der Bauphase übernehmen wir die Baustellenreinigung in München: Grobreinigung, Bauzwischenreinigung und die Beräumung von Bauabfällen – für freie, sichere Laufwege.',
                'Bauunternehmen und Generalunternehmer setzen uns als Subunternehmer für die Baureinigung ein – regelmäßig nach Plan oder kurzfristig vor einer Übergabe zwischen den Gewerken.',
            ],
            points: ['Grob- und Zwischenreinigung', 'Sichere Laufwege', 'Saubere Übergaben zwischen Gewerken'],
        },
        bauendreinigung: {
            number: '06',
            title: 'Bauendreinigung',
            short: 'Bauschlussreinigung vor der Abnahme.',
            seoTitle: 'Bauendreinigung München – Bauschlussreinigung | GoganBau',
            description:
                'Bauendreinigung in München: gründliche Bauschlussreinigung vor der Abnahme – Glasflächen, Rahmen, Böden und Sanitär, übergabefertig für Ihren Bauherrn.',
            text: 'Gründliche Endreinigung vor der Abnahme – übergabefertig für Ihren Bauherrn.',
            body: [
                'Vor der Abnahme sorgen wir mit der Bauendreinigung (Bauschlussreinigung) dafür, dass Neubau, Umbau oder Ausbau übergabefertig sind: Glasflächen und Rahmen, Böden, Sanitärbereiche und alle sichtbaren Oberflächen.',
                'Für Bauunternehmen übernehmen wir die Bauendreinigung als Subunternehmer – termingenau zur Übergabe an den Bauherrn oder Mieter.',
            ],
            points: ['Glasflächen und Rahmen', 'Böden und Sanitär', 'Bereit für die Abnahme'],
        },
        gebaeudereinigung: {
            number: '07',
            title: 'Gebäudereinigung',
            short: 'Unterhaltsreinigung für Büros und Gewerbe.',
            seoTitle: 'Gebäudereinigung & Unterhaltsreinigung München | GoganBau',
            description:
                'Gebäudereinigung in München: Unterhaltsreinigung und Sonderreinigung für Büros und Gewerbeflächen – in festen Intervallen, mit direktem Ansprechpartner.',
            text: 'Unterhalts- und Sonderreinigung gewerblicher Objekte – mit festen Intervallen.',
            body: [
                'Als Reinigungsfirma in München übernehmen wir die Unterhaltsreinigung gewerblicher Objekte – Büros und Gewerbeflächen – in festen Intervallen.',
                'Zusätzlich bieten wir Sonderreinigungen nach Bedarf. Sie haben einen direkten Ansprechpartner, der Termine und Leistungsumfang mit Ihnen abstimmt.',
            ],
            points: ['Unterhaltsreinigung im festen Rhythmus', 'Büros und Gewerbeflächen', 'Sonderreinigung nach Bedarf'],
        },
    },

    // Vorher / Nachher. Put the photos in public/images/projekte/ — a project only shows
    // on the site once both of its files exist. Set symbolbild: true for stock or AI
    // images, so they are labelled as such (not your own project photos).
    projects: [
        {
            service: 'abbruch',
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
            title: 'Abbruch & Rückbau in München',
            text: 'Als Abbruchfirma übernehmen wir Abbrucharbeiten, Demontage und die Entkernung bis auf den Rohbau – und den geplanten Rückbau als Vorbereitung für Umbau und Sanierung. Wir trennen Materialien sauber, beräumen die Flächen und stimmen jeden Schritt mit Ihrer Bauleitung ab.',
            services: ['abbruch', 'rueckbau'],
        },
        {
            title: 'Gebäudereinigung & Baureinigung in München',
            text: 'Von der Baustellenreinigung während der Bauphase über die Bauendreinigung vor der Abnahme bis zur regelmäßigen Unterhaltsreinigung von Büros und Gewerbeflächen: Als Reinigungsfirma sorgen wir dafür, dass Flächen sicher, sauber und übergabefertig sind.',
            services: ['baureinigung', 'bauendreinigung', 'gebaeudereinigung'],
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
            a: 'Unser Einsatzgebiet ist München und Umgebung. Liegt Ihr Projekt etwas außerhalb, sprechen Sie uns gern an.',
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
