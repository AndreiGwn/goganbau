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
        'GoganBau ist Abbruchunternehmen und Reinigungsfirma in einem. Abbrucharbeiten, Entkernung, Rückbau und Kernbohrungen übernehmen wir in ganz Bayern. In München und im Umkreis von bis zu 50 km sorgen wir mit Baureinigung, Bauendreinigung und Unterhaltsreinigung dafür, dass Flächen sauber übergeben werden.',
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
        reinigung: 'Reinigung',
        abbruch: 'Abbruch & Rückbau',
        montage: 'Montage & Logistik',
    },

    // Places named under "Einsatzgebiet" on each service page (key = the service's area).
    // Cleaning only lists towns within ~50 km of München.
    areaPlaces: {
        'ganz Bayern': ['München', 'Augsburg', 'Ingolstadt', 'Regensburg', 'Landshut', 'Rosenheim', 'Nürnberg', 'Fürth', 'Erlangen', 'Würzburg', 'Kempten', 'Passau', 'Straubing', 'Freising', 'Erding', 'Dachau', 'Fürstenfeldbruck', 'Starnberg', 'Ebersberg'],
        'München und Umkreis bis 50 km': ['München', 'Dachau', 'Freising', 'Erding', 'Fürstenfeldbruck', 'Starnberg', 'Ebersberg', 'Garching', 'Unterschleißheim', 'Oberschleißheim', 'Ismaning', 'Unterföhring', 'Germering', 'Unterhaching', 'Ottobrunn', 'Haar', 'Vaterstetten', 'Poing', 'Gräfelfing', 'Planegg', 'Puchheim', 'Olching', 'Karlsfeld', 'Grünwald', 'Pullach'],
    },

    // The key of each service is its URL (/leistungen/<key>/) and the camera focus key in the 3D scene.
    // title: name in menus and lists · short: one line on the home page · text: intro on the service
    // page · body: the paragraphs below it · seoTitle / description: for Google · area: Einsatzgebiet
    // · scene: 3D zone for services without their own · h1: page heading (default "<title> in München")
    // · image: alt text of the service picture: public/images/leistungen/<key>.jpg (photo, shown as
    //   "Symbolbild") if present, else <key>.svg (drawn by site/illustrations.js)
    // · scope: "Leistungsumfang" list · faq: questions on the service page (only state facts).
    // We work manually and with hand-held tools — no heavy machinery, so no "Gebäudeabbruch" claims.
    services: {
        abbruch: {
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
            image: 'Abbrucharbeiten: Arbeiter bricht eine Betonwand mit handgeführtem Abbruchhammer ab',
            scope: [
                'Innenabbruch von nichttragenden Innenwänden und Mauerwerk',
                'Teilabbruch einzelner Räume und Bauabschnitte',
                'Abbruch von Bädern, Küchen und Sanitärbereichen',
                'Abbruch von Trockenbauwänden und Vorwänden',
                'Abbrucharbeiten in Wohnungen, Büros, Läden und Gewerbeflächen',
                'Manuell und mit handgeführten Abbruchhämmern',
                'Bauschutt sortiert, Flächen beräumt',
                'Als Subunternehmer für Bauunternehmen und Generalunternehmer',
            ],
            faq: [
                { q: 'Was kosten Abbrucharbeiten?', a: 'Die Kosten für Abbrucharbeiten hängen von Fläche, Material, Wandstärke und Zugang ab. Für ein Angebot brauchen wir Ort, Umfang und Zeitraum – gern mit Fotos oder Plänen per WhatsApp oder über das Anfrageformular.' },
                { q: 'Arbeiten Sie mit Bagger oder schweren Maschinen?', a: 'Nein. Wir arbeiten manuell und mit handgeführten Geräten wie Abbruchhämmern. Das passt besonders für Innenabbruch und Teilabbruch in bestehenden Gebäuden, wo präzise gearbeitet werden muss.' },
                { q: 'Übernehmen Sie Abbrucharbeiten als Subunternehmer?', a: 'Ja. Bauunternehmen und Generalunternehmer setzen uns als Subunternehmer (Nachunternehmer) für einzelne Bauabschnitte oder als zusätzliche Kapazität ein – in München und in ganz Bayern.' },
                { q: 'Wie kurzfristig können Sie anfangen?', a: 'Wir sind rund um die Uhr erreichbar. Den Starttermin stimmen wir je nach Umfang direkt mit Ihnen ab.' },
            ],
        },
        entkernung: {
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
            image: 'Entkernung: Arbeiter entfernen Putz und Innenausbau bis auf das Mauerwerk',
            scope: [
                'Rückbau von Trennwänden und Trockenbau',
                'Entfernen abgehängter Decken und Deckenverkleidungen',
                'Entfernen von Bodenbelägen: Teppich, Parkett, Laminat, PVC',
                'Fliesen abschlagen und Estrich entfernen',
                'Rückbau von Bädern, Küchen und Sanitärobjekten',
                'Ausbau von Türen, Zargen und Einbauten',
                'Entkernung bis auf den Rohbau vor Kernsanierung oder Umbau',
                'Für Wohnungen, Häuser, Büros und Gewerbeimmobilien',
            ],
            faq: [
                { q: 'Was kostet eine Entkernung?', a: 'Das hängt von Fläche und Aufbau ab – etwa ob Estrich, Fliesen oder abgehängte Decken entfernt werden. Für ein Angebot brauchen wir Ort, Umfang und Zeitraum – gern mit Fotos oder Plänen per WhatsApp oder über das Anfrageformular.' },
                { q: 'Was bedeutet „Entkernung bis auf den Rohbau“?', a: 'Alle nichttragenden Bauteile und der Innenausbau werden entfernt: Trennwände, Decken, Bodenbeläge, Fliesen, Estrich und Einbauten. Übrig bleibt der Rohbau, auf dem Kernsanierung oder Umbau aufbauen.' },
                { q: 'Entkernen Sie auch einzelne Wohnungen oder Etagen?', a: 'Ja. Wir entkernen einzelne Wohnungen, Etagen und Büroflächen ebenso wie ganze Gewerbeimmobilien – in München und in ganz Bayern.' },
            ],
        },
        rueckbau: {
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
            image: 'Rückbau: Arbeiter bauen Mauerwerk mit Brechstange und Abbruchhammer zurück, Material getrennt in Containern',
            scope: [
                'Selektiver Rückbau, nach Materialien getrennt',
                'Abschnittsweiser Rückbau im laufenden Bauablauf',
                'Rückbau von Mieterausbauten in Büro- und Gewerbeflächen',
                'Rückbau von Trockenbau, Glastrennwänden und Innenausbau',
                'Rückbau von Ladenflächen vor dem Mieterwechsel',
                'Trennung von Holz, Metall, Gips und Bauschutt',
                'Beräumte, übergabefertige Flächen',
                'Abgestimmt mit Bauleitung und Gewerken',
            ],
            faq: [
                { q: 'Was ist selektiver Rückbau?', a: 'Beim selektiven Rückbau werden Bauteile Schritt für Schritt ausgebaut und die Materialien – etwa Holz, Metall, Gips und Bauschutt – direkt getrennt. So werden Flächen gezielt für Umbau oder Sanierung vorbereitet.' },
                { q: 'Bauen Sie Mieterausbauten zurück?', a: 'Ja. Wir bauen Büro-, Laden- und Gewerbeflächen auf den vereinbarten Zustand zurück, zum Beispiel vor einem Mieterwechsel.' },
                { q: 'Was kostet ein Rückbau?', a: 'Das hängt von Fläche, Bauteilen und Materialien ab. Für ein Angebot brauchen wir Ort, Umfang und Zeitraum – gern mit Fotos oder Plänen per WhatsApp oder über das Anfrageformular.' },
            ],
        },
        kernbohrungen: {
            group: 'abbruch',
            area: 'ganz Bayern',
            title: 'Kernbohrungen',
            scene: 'abbruch',
            short: 'Kernbohrungen in Beton und Stahlbeton.',
            seoTitle: 'Kernbohrungen München & Bayern – Kernbohrfirma | GoganBau',
            description:
                'Kernbohrungen in München und ganz Bayern: Bohrungen in Beton und Stahlbeton für Lüftung, Klima, Sanitär, Elektro sowie Rohr- und Kabeldurchführungen.',
            text: 'Präzise Kernbohrungen in Beton und Stahlbeton – für Leitungen, Rohre und Lüftung.',
            body: [
                'Als Kernbohrfirma in München und ganz Bayern führen wir Kernbohrungen (Diamantbohrungen) in Betonwänden, Stahlbetondecken und Betonböden aus – für Lüftungs- und Klimaanlagen, Heizung, Sanitär- und Elektroinstallationen sowie Rohr- und Kabeldurchführungen.',
                'Bauunternehmen, Generalunternehmer und Haustechnik-Firmen setzen uns als Subunternehmer bei Neubau, Umbau und Sanierung ein – abgestimmt mit der Bauleitung und dem Ablauf der Gewerke.',
            ],
            points: ['Beton und Stahlbeton', 'Wände, Decken und Böden', 'Für Lüftung, Sanitär, Elektro'],
            image: 'Kernbohrung in einer Betonwand mit Kernbohrgerät und Wasserkühlung',
            scope: [
                'Kernbohrungen in Beton und Stahlbeton',
                'Bohrungen in Wänden, Decken und Bodenplatten',
                'Durchbrüche für Lüftung, Klima und Abluft',
                'Rohrdurchführungen für Sanitär, Heizung und Abwasser',
                'Kabeldurchführungen für Elektro',
                'Bohrungen für Hausanschlüsse',
                'Diamantbohrungen mit Wasserkühlung',
                'Für Haustechnik-Firmen, Bauunternehmen und Generalunternehmer',
            ],
            faq: [
                { q: 'Was kostet eine Kernbohrung?', a: 'Der Preis hängt vor allem von Durchmesser, Bohrtiefe, Material und Anzahl der Bohrungen ab. Schicken Sie uns diese Angaben, gern mit Fotos – dann erhalten Sie ein Angebot.' },
                { q: 'Wofür braucht man eine Kernbohrung?', a: 'Für saubere, runde Öffnungen in Beton und Stahlbeton – etwa für Lüftungs- und Klimaanlagen, Abwasser- und Heizungsrohre, Kabel oder Hausanschlüsse.' },
                { q: 'Bohren Sie auch in Decken und Bodenplatten?', a: 'Ja. Wir führen Kernbohrungen in Wänden, Decken und Böden aus – in München und in ganz Bayern.' },
            ],
        },
        unterhaltsreinigung: {
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
            image: 'Unterhaltsreinigung im Büro: Glastür wird gereinigt, Boden gesaugt, Reinigungswagen im Einsatz',
            scope: [
                'Regelmäßige Reinigung von Büros und Geschäftsräumen',
                'Fester Reinigungsplan: täglich, wöchentlich oder monatlich',
                'Böden saugen und wischen',
                'Oberflächen, Tische und Kontaktflächen',
                'Sanitäranlagen und Teeküchen',
                'Abfallbehälter leeren',
                'Treppenhäuser und Eingangsbereiche',
                'Fester Ansprechpartner',
            ],
            faq: [
                { q: 'Was gehört zur Unterhaltsreinigung?', a: 'Die laufende Reinigung nach festem Plan: Böden, Oberflächen, Sanitär, Teeküchen und Abfall. Umfang und Rhythmus legen wir gemeinsam mit Ihnen fest.' },
                { q: 'Was kostet eine Unterhaltsreinigung?', a: 'Das hängt von Fläche, Art der Räume und Reinigungsrhythmus ab. Nennen Sie uns Fläche, Häufigkeit und Wunschzeiten – dann erhalten Sie ein Angebot.' },
                { q: 'Wo bieten Sie Unterhaltsreinigung an?', a: 'In München und im Umkreis von bis zu 50 km – zum Beispiel in Garching, Unterschleißheim, Ismaning, Germering, Dachau, Freising und Erding.' },
            ],
        },
        bueroreinigung: {
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
            image: 'Büroreinigung: Schreibtische werden gereinigt und Böden gesaugt',
            scope: [
                'Arbeitsplätze, Schreibtische und Besprechungsräume',
                'Empfang und Eingangsbereich',
                'Teeküchen und Sozialräume',
                'Sanitäranlagen',
                'Böden saugen und wischen',
                'Abfallbehälter leeren',
                'Reinigung nach Feierabend oder zu festen Zeiten',
                'Für kleine Büros, Kanzleien, Agenturen und Großraumbüros',
            ],
            faq: [
                { q: 'Reinigen Sie Büros auch abends?', a: 'Ja. Die Zeiten richten sich nach Ihrem Betrieb – auf Wunsch nach Feierabend, damit Ihr Team ungestört arbeiten kann.' },
                { q: 'Wie oft sollte ein Büro gereinigt werden?', a: 'Das hängt von Größe und Nutzung ab. Viele Büros lassen täglich oder mehrmals pro Woche reinigen, kleinere Büros oft wöchentlich. Den Rhythmus stimmen wir mit Ihnen ab.' },
                { q: 'Was kostet Büroreinigung?', a: 'Das hängt von Bürofläche, Anzahl der Räume und Reinigungsrhythmus ab. Nennen Sie uns diese Angaben – dann erhalten Sie ein Angebot.' },
            ],
        },
        grundreinigung: {
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
            image: 'Grundreinigung eines Bodens mit Einscheibenmaschine',
            scope: [
                'Gründliche Reinigung aller Böden',
                'Entfernen von hartnäckigem Schmutz und Ablagerungen',
                'Intensive Reinigung der Sanitäranlagen',
                'Küchen und Teeküchen',
                'Oberflächen, Türen und Heizkörper',
                'Vor Mieterwechsel, Neueröffnung oder Start der Unterhaltsreinigung',
                'Für Büros, Praxen, Gewerbeflächen und Treppenhäuser',
                'Einmalig oder in festen Abständen',
            ],
            faq: [
                { q: 'Was ist der Unterschied zwischen Grundreinigung und Unterhaltsreinigung?', a: 'Die Unterhaltsreinigung hält Räume regelmäßig sauber. Die Grundreinigung ist eine einmalige, gründliche Intensivreinigung – etwa wenn sich Schmutz festgesetzt hat, vor einem Mieterwechsel oder bevor eine regelmäßige Reinigung startet.' },
                { q: 'Machen Sie Grundreinigung vor dem Mieterwechsel?', a: 'Ja. Wir reinigen Büros, Praxen und Gewerbeflächen gründlich, damit sie sauber übergeben werden können.' },
                { q: 'Was kostet eine Grundreinigung?', a: 'Das hängt von Fläche, Bodenbelag und Verschmutzung ab. Schicken Sie uns Fläche und gern ein paar Fotos – dann erhalten Sie ein Angebot.' },
            ],
        },
        treppenhausreinigung: {
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
            image: 'Treppenhausreinigung: Geländer wird gereinigt und Treppe gewischt',
            scope: [
                'Treppen, Podeste und Handläufe',
                'Flure und Eingangsbereiche',
                'Briefkastenanlagen, Türen und Klingeltableaus',
                'Gemeinschaftsflächen',
                'Fester Rhythmus: wöchentlich oder alle 14 Tage',
                'Für Hausverwaltungen, Eigentümergemeinschaften (WEG) und Vermieter',
                'Mehrfamilienhäuser und Wohnanlagen',
                'Fester Ansprechpartner',
            ],
            faq: [
                { q: 'Arbeiten Sie für Hausverwaltungen und WEGs?', a: 'Ja. Wir übernehmen die Treppenhausreinigung für Hausverwaltungen, Eigentümergemeinschaften und Vermieter – nach festem Plan, mit einem festen Ansprechpartner.' },
                { q: 'Wie oft wird das Treppenhaus gereinigt?', a: 'Üblich ist wöchentlich oder alle 14 Tage. Den Rhythmus legen wir gemeinsam mit Ihnen fest.' },
                { q: 'Was kostet eine Treppenhausreinigung?', a: 'Der Preis richtet sich nach Anzahl der Etagen, Größe des Treppenhauses und Reinigungsrhythmus. Nennen Sie uns diese Angaben – dann erhalten Sie ein Angebot.' },
            ],
        },
        baureinigung: {
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
            image: 'Baureinigung auf der Baustelle: Bauschutt wird zusammengekehrt und Baustaub gesaugt',
            scope: [
                'Baugrobreinigung während der Bauphase',
                'Bauzwischenreinigung zwischen den Gewerken',
                'Zusammentragen von Bauresten und Verpackungen',
                'Baustaub saugen, Böden kehren',
                'Sichere, freie Laufwege',
                'Für Neubau, Umbau und Sanierung',
                'Für Bauunternehmen, Generalunternehmer und Bauträger',
                'Als Subunternehmer, Termine nach Absprache',
            ],
            faq: [
                { q: 'Was ist der Unterschied zwischen Baureinigung und Bauendreinigung?', a: 'Die Baureinigung (Grob- und Zwischenreinigung) läuft während der Bauphase und hält die Baustelle sauber und sicher. Die Bauendreinigung ist die Feinreinigung am Ende, direkt vor Abnahme oder Übergabe.' },
                { q: 'Übernehmen Sie Baureinigung als Subunternehmer?', a: 'Ja. Bauunternehmen, Generalunternehmer und Bauträger setzen uns für Baustellenreinigung in München und im Umkreis bis 50 km ein – einmalig oder regelmäßig während der Bauphase.' },
                { q: 'Was kostet eine Baureinigung?', a: 'Das hängt von Fläche, Bauphase und Verschmutzung ab. Nennen Sie uns Baustelle, Fläche und Zeitraum – dann erhalten Sie ein Angebot.' },
            ],
        },
        bauendreinigung: {
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
            image: 'Bauendreinigung im Neubau: Fensterrahmen und Böden werden vor der Übergabe gereinigt',
            scope: [
                'Baufeinreinigung vor Abnahme und Übergabe',
                'Fenster, Glasflächen und Rahmen',
                'Entfernen von Schutzfolien und Aufklebern',
                'Böden, Fliesen und Sockelleisten',
                'Sanitär- und Küchenbereiche',
                'Türen, Schalter und Heizkörper',
                'Für Neubau, Wohnungen, Einfamilienhäuser und Bürogebäude',
                'Übergabefertig für Bauherr oder Mieter',
            ],
            faq: [
                { q: 'Was gehört zur Bauendreinigung?', a: 'Die gründliche Feinreinigung nach Abschluss aller Arbeiten: Fenster und Rahmen, Böden, Sanitär, Küchen, Türen und Schalter – inklusive Schutzfolien und Aufkleber. Danach ist alles bereit für Abnahme und Einzug.' },
                { q: 'Wann sollte die Bauendreinigung stattfinden?', a: 'Wenn alle Gewerke fertig sind, kurz vor der Abnahme oder dem Einzug. Den Termin stimmen wir mit Ihrer Bauleitung ab.' },
                { q: 'Was kostet eine Bauendreinigung?', a: 'Das hängt von Fläche, Anzahl der Fenster und Verschmutzung ab. Nennen Sie uns diese Angaben – dann erhalten Sie ein Angebot.' },
            ],
        },
        gebaeudereinigung: {
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
            image: 'Gebäudereinigung am Eingang eines Bürogebäudes: Glasflächen und Eingangsbereich werden gereinigt',
            scope: [
                'Reinigung von Büro- und Verwaltungsgebäuden',
                'Eingangsbereiche, Foyers und Aufzüge',
                'Treppenhäuser und Flure',
                'Sanitäranlagen und Sozialräume',
                'Sonderreinigung nach Bedarf',
                'Für Hausverwaltungen und Gewerbeimmobilien',
                'Unterhalts-, Grund- und Baureinigung aus einer Hand',
                'Fester Ansprechpartner, rund um die Uhr erreichbar',
            ],
            faq: [
                { q: 'Welche Gebäude reinigen Sie?', a: 'Bürogebäude, Gewerbeimmobilien, Praxen, Wohnanlagen und Treppenhäuser – in München und im Umkreis von bis zu 50 km.' },
                { q: 'Was ist eine Sonderreinigung?', a: 'Eine einmalige Reinigung außerhalb des normalen Plans – etwa nach einem Umbau, einer Veranstaltung oder vor einem Mieterwechsel.' },
                { q: 'Was kostet Gebäudereinigung?', a: 'Das hängt von Gebäude, Fläche und Reinigungsrhythmus ab. Nennen Sie uns diese Angaben – dann erhalten Sie ein Angebot.' },
            ],
        },
        praxisreinigung: {
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
            image: 'Praxisreinigung: Behandlungsliege wird desinfiziert, Boden gesaugt',
            scope: [
                'Wartebereich und Empfang',
                'Behandlungsräume',
                'Sanitäranlagen',
                'Kontaktflächen wie Türgriffe, Theken und Stühle',
                'Böden in allen Räumen',
                'Reinigung nach Praxisschluss',
                'Für Arztpraxen, Zahnarztpraxen, Physiotherapie- und Therapiepraxen',
                'Fester Rhythmus und fester Ansprechpartner',
            ],
            faq: [
                { q: 'Wann reinigen Sie die Praxis?', a: 'Außerhalb Ihrer Sprechzeiten, zum Beispiel abends nach Praxisschluss – so, wie es zu Ihrem Ablauf passt.' },
                { q: 'Welche Praxen reinigen Sie?', a: 'Arztpraxen, Zahnarztpraxen sowie Physiotherapie- und Therapiepraxen in München und im Umkreis von bis zu 50 km.' },
                { q: 'Was kostet eine Praxisreinigung?', a: 'Das hängt von Praxisgröße, Anzahl der Räume und Reinigungsrhythmus ab. Nennen Sie uns diese Angaben – dann erhalten Sie ein Angebot.' },
            ],
        },
        tektalan: {
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
            image: 'Tektalan-Montage: Dämmplatten werden an der Betondecke montiert',
        },
        logistik: {
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
            image: 'Baustellenlogistik: Materialanlieferung wird auf der Baustelle koordiniert',
            note: 'Wir koordinieren – Transporte mit eigenen Fahrzeugen bieten wir nicht an.',
        },
    },

    // "Für Bauunternehmen" page (/bauunternehmen/) — B2B page for contractors.
    b2b: {
        seoTitle: 'Subunternehmer Abbruch & Baureinigung Bayern | GoganBau',
        description:
            'Subunternehmer für Bauunternehmen: Abbruch, Entkernung, Rückbau und Kernbohrungen in ganz Bayern, Baureinigung in München – 24/7 erreichbar.',
        h1: 'Abbruch, Rückbau und Baureinigung für Bauunternehmen und Generalunternehmer',
        intro: [
            'Als Subunternehmer (Nachunternehmer) unterstützen wir Bauunternehmen, Generalunternehmer, Bauträger und Sanierungsunternehmen – dort, wo zusätzliche Kapazität gebraucht wird.',
            'Abbrucharbeiten, Entkernung, Rückbau und Kernbohrungen übernehmen wir in ganz Bayern. Baureinigung, Bauendreinigung, Unterhaltsreinigung und Gebäudereinigung bieten wir in München und im Umkreis von bis zu 50 km an. Wir arbeiten manuell und mit handgeführten Geräten.',
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
            title: 'Gebäudereinigung & Baureinigung in München',
            accent: 'emerald',
            text: 'Von der Baustellenreinigung während der Bauphase über die Bauendreinigung vor der Abnahme bis zur regelmäßigen Unterhaltsreinigung und Büroreinigung: Als Reinigungsfirma sorgen wir in München und im Umkreis von bis zu 50 km dafür, dass Flächen sicher, sauber und übergabefertig sind. Dazu kommen Grundreinigung, Treppenhausreinigung und Praxisreinigung.',
            services: ['unterhaltsreinigung', 'bueroreinigung', 'grundreinigung', 'treppenhausreinigung', 'baureinigung', 'bauendreinigung', 'gebaeudereinigung', 'praxisreinigung'],
        },
        {
            title: 'Abbruch & Rückbau in ganz Bayern',
            text: 'Als Abbruchfirma übernehmen wir Innenabbruch und Teilabbruch, die Entkernung bis auf den Rohbau und den selektiven Rückbau als Vorbereitung für Umbau und Sanierung. Wir trennen Materialien sauber, beräumen die Flächen und stimmen jeden Schritt mit Ihrer Bauleitung ab. Dazu kommen Kernbohrungen in Beton und Stahlbeton für Lüftung, Klima, Sanitär und Elektro.',
            services: ['abbruch', 'entkernung', 'rueckbau', 'kernbohrungen'],
        },
        {
            title: 'Montage & Baustellenlogistik',
            text: 'Ergänzend montieren wir Tektalan-Dämmplatten in Tiefgaragen, Kellern und Gewerbeflächen und koordinieren Material, Lieferungen und Einsatzzeiten auf der Baustelle.',
            services: ['tektalan', 'logistik'],
        },
    ],

    // "So funktioniert's" on the home page: [title, text] per step. Only promise what we always do.
    steps: [
        ['Kostenloses Angebot anfordern', 'Per Formular, WhatsApp oder Telefon – rund um die Uhr. Kurz beschreiben, was, wo und wann; Fotos helfen uns bei der Einschätzung.'],
        ['Angebot erhalten', 'Wir klären Umfang und Termin mit Ihnen und schicken Ihnen ein kostenloses Angebot.'],
        ['Ausführung & Übergabe', 'Wir führen die Arbeiten aus – mit festem Ansprechpartner und abgestimmt mit Ihrer Bauleitung. Am Ende übergeben wir die Fläche sauber.'],
    ],

    // "Häufige Fragen" on the home page. Answers are collapsed until tapped; only state facts.
    faq: [
        {
            q: 'Sind Sie wirklich rund um die Uhr erreichbar?',
            a: 'Ja. Für Anfragen und projektbezogene Abstimmungen sind wir 24/7 erreichbar – per Telefon, WhatsApp oder über das Anfrageformular. Einsatzzeiten und Umfang stimmen wir projektbezogen mit Ihnen ab.',
        },
        {
            q: 'In welchem Gebiet sind Sie tätig?',
            a: 'Abbruch, Entkernung, Rückbau und Kernbohrungen übernehmen wir in ganz Bayern – zum Beispiel in München, Augsburg, Ingolstadt, Regensburg, Landshut und Rosenheim. Unsere Reinigungsleistungen bieten wir in München und im Umkreis von bis zu 50 km an, etwa in Dachau, Freising, Erding, Fürstenfeldbruck und Starnberg.',
        },
        {
            q: 'Arbeiten Sie als Subunternehmer für Bauunternehmen?',
            a: 'Ja. Wir unterstützen Bauunternehmen und Generalunternehmer als Subunternehmer – für einzelne Bauabschnitte, als zusätzliche Kapazität bei engem Zeitplan oder bei wiederkehrenden Aufträgen.',
        },
        {
            q: 'Bieten Sie auch Kernbohrungen an?',
            a: 'Ja. Wir führen Kernbohrungen in Beton und Stahlbeton aus – etwa für Lüftung, Klima, Sanitär, Elektro und Rohrdurchführungen. In ganz Bayern, als Subunternehmer für Bauunternehmen.',
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
