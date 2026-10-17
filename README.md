# GoganBau & Gebäudereinigung — Website

A static website built with Vite, Tailwind CSS v4, Three.js and GSAP. It's hosted on **GitHub Pages**, with no server, PHP or database.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # once
npm run dev      # http://localhost:8080 (on a phone in the same Wi-Fi: http://<laptop-ip>:8080)
```

To test the production build:

```bash
npm run build    # writes dist/
npm run preview  # serves dist/ at http://localhost:8080
```

## Where things are

| What | Where |
|---|---|
| **All text and content**: services, contact details, address, highlights, before/after projects, Web3Forms key | [`site/content.js`](site/content.js) |
| Page templates: layout, nav, footer, home, service pages, Impressum, Datenschutz, 404 | [`site/pages.js`](site/pages.js) |
| Styles | [`src/css/app.css`](src/css/app.css) |
| Scripts: menu, form, before/after slider, 3D building | [`src/js/`](src/js) |
| Static files: logos, favicons, project photos | [`public/`](public) |

The HTML pages (`index.html`, `leistungen/*/index.html`, `impressum/`, `datenschutz/`, `404.html`) are **generated** from `site/pages.js` every time `npm run dev` or `npm run build` starts. They aren't committed. Edit `site/`, never the generated files. While `npm run dev` is running, changes in `site/` show up in the browser immediately.

## Publishing to GitHub Pages

1. Create a repository on GitHub and push this project to the `main` branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` now builds and publishes the site through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The address is shown under Settings → Pages, for example `https://<user>.github.io/<repo>/`.

**Custom domain:** the site runs on `goganbau.de`, set under Settings → Pages → Custom domain. DNS is at IONOS: four A records (185.199.108–111.153), four AAAA records (2606:50c0:8000–8003::153) and `www` as CNAME to `andreigwn.github.io`. The workflow adjusts all links automatically, whether the site runs under `/<repo>/` or on its own domain.

## Contact form

- **Per WhatsApp senden** opens WhatsApp with the inquiry pre-written. It needs no setup.
- **Per E-Mail senden** goes through [Web3Forms](https://web3forms.com), a free service that e-mails each inquiry:
  1. On web3forms.com, enter `info@goganbau.de` and create an access key. It arrives by e-mail.
  2. Paste it into `web3formsKey` in [`site/content.js`](site/content.js), then commit and push.

  Until a key is set, the button opens the visitor's own mail app with the inquiry pre-written, addressed to `inquiryEmail`. The key is public by design; Web3Forms only ever sends to the address it was created for.

## Vorher/Nachher photos

Put the images in `public/images/projekte/` using the file names listed under `projects` in `site/content.js`, for example `abbruch-vorher.jpg` and `abbruch-nachher.jpg`. Landscape 4:3 works best, around 1600×1200 and under 400 KB. A project only appears once both of its photos exist, on the home page and on its service page. For stock or AI images, set `symbolbild: true` so they're labelled.

## Before going live

- Replace the placeholders on the legal pages in `site/pages.js` (Impressum, Datenschutz) and the postcode `[PLZ]` in `site/content.js`.
- Set the Web3Forms key (see above) and send one test inquiry.
