/*
 * GoganBau & Gebäudereinigung — all website content in one place.
 * Edit text here; every page is generated from this file (see site/pages.js).
 */
export default {
    name: 'GoganBau & Gebäudereinigung',
    shortName: 'GoganBau',
    founded: 2019,
    region: 'München & Umgebung',
    claim: 'Wir sind da, wenn es zählt.',
    motto: 'Praktisch denken. Direkt handeln. Verlässlich liefern.',
    tagline: 'Flexibler Subunternehmer für Bauunternehmen in München & Umgebung.',

    contact: {
        phone: '+49 1575 9283617',
        phoneHref: 'tel:+4915759283617',
        street: 'Rambaldistraße 37',
        city: '[PLZ] München',
        email: 'info@goganbau.de',
        // WhatsApp number in international format, digits only (used for wa.me links).
        whatsapp: '4915759283617',
    },

    // "Per E-Mail senden" goes through Web3Forms (https://web3forms.com), which e-mails each
    // inquiry to the address the key was created with (goganbau@gmail.com). The key is
    // public by design. While it is empty, the button opens the visitor's mail app instead.
    web3formsKey: '',
    // Fallback recipient for the mail-app fallback.
    inquiryEmail: 'goganbau@gmail.com',

    // The key of each service is its URL (/leistungen/<key>/) and the camera focus key in the 3D scene.
    services: {
        abbruch: {
            number: '01',
            title: 'Abbruch & Entkernung',
            short: 'Demontage, Entkernung, Beräumung.',
            text: 'Wir entkernen Bestandsgebäude bis auf den Rohbau – sauber getrennt und bereit für den nächsten Schritt.',
            points: ['Entkernung bis auf den Rohbau', 'Demontage von Ausbauelementen', 'Beräumung der Flächen'],
        },
        rueckbau: {
            number: '02',
            title: 'Rückbau',
            short: 'Strukturiert – bereit für Umbau und Sanierung.',
            text: 'Geplanter Rückbau in klarer Reihenfolge – damit Umbau und Sanierung ohne Verzögerung starten.',
            points: ['Abschnittsweise geplant', 'Vorbereitung für Umbau und Sanierung', 'Abgestimmt mit der Bauleitung'],
        },
        tektalan: {
            number: '03',
            title: 'Tektalan-Montage',
            short: 'Fachgerechte Montage von Dämmplatten.',
            text: 'Montage von Tektalan-Dämmplatten an Decken und Wänden – für Wärme-, Brand- und Schallschutz.',
            points: ['Tiefgaragen, Keller, Gewerbeflächen', 'Decken- und Wandmontage', 'Fachgerechte Befestigung'],
        },
        logistik: {
            number: '04',
            title: 'Baustellenlogistik',
            short: 'Material, Lieferungen und Abläufe koordiniert.',
            text: 'Wir koordinieren Material, Lieferungen und Einsatzzeiten – damit Ihre Gewerke ohne Leerlauf arbeiten.',
            points: ['Materialbedarf und Lieferungen', 'Anlieferfenster und Lagerflächen', 'Einsatzzeiten der Gewerke'],
            note: 'Wir koordinieren – Transporte mit eigenen Fahrzeugen bieten wir nicht an.',
        },
        baureinigung: {
            number: '05',
            title: 'Baureinigung',
            short: 'Sauber während laufender Bauarbeiten.',
            text: 'Grob- und Zwischenreinigung während der Bauphase – für sichere Wege und saubere Übergaben.',
            points: ['Grob- und Zwischenreinigung', 'Sichere Laufwege', 'Saubere Übergaben zwischen Gewerken'],
        },
        bauendreinigung: {
            number: '06',
            title: 'Bauendreinigung',
            short: 'Übergabefertig nach dem Ausbau.',
            text: 'Gründliche Endreinigung vor der Abnahme – übergabefertig für Ihren Bauherrn.',
            points: ['Glasflächen und Rahmen', 'Böden und Sanitär', 'Bereit für die Abnahme'],
        },
        gebaeudereinigung: {
            number: '07',
            title: 'Gebäudereinigung',
            short: 'Gewerbeflächen – regelmäßig oder nach Bedarf.',
            text: 'Unterhalts- und Sonderreinigung gewerblicher Objekte – mit festen Intervallen.',
            points: ['Unterhaltsreinigung im festen Rhythmus', 'Sonderreinigung nach Bedarf', 'Ein direkter Ansprechpartner'],
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

    // "Über uns" — one short line each.
    highlights: [
        '24/7 erreichbar – auch nach Feierabend.',
        'Ein direkter Ansprechpartner.',
        'Flexible Kapazität für jede Bauphase.',
        'Mehrere Leistungen aus einer Hand.',
    ],
};
