# Site web PHI & CO S.A — phi-co.com

Site vitrine bilingue (français / anglais) de PHI & CO S.A, entreprise de façades,
menuiserie aluminium et vitrerie à Douala (Cameroun).

**Technologie : HTML / CSS / JavaScript statiques, générés par un script Node sans
aucune dépendance npm.** Pas de base de données, pas de CMS à mettre à jour, pas de
faille WordPress : le site se déploie en copiant le dossier sur n'importe quel
hébergement (cPanel/FTP, Netlify, Vercel, GitHub Pages, Cloudflare Pages…).

---

## 1. Structure du dépôt

```
phi-co/
├── build.js              ← générateur : `node build.js`
├── src/
│   ├── data/
│   │   ├── site.js       ← coordonnées, adresses, téléphones, réseaux, clients, partenaires
│   │   ├── services.js   ← les 4 services : URL, icônes, images de chaque sous-service
│   │   └── projects.js   ← liste des réalisations (image, catégorie, mise en avant)
│   ├── i18n/
│   │   ├── fr.js         ← TOUS les textes français
│   │   └── en.js         ← TOUS les textes anglais (même structure)
│   ├── layout.js         ← en-tête, pied de page, <head> SEO, blocs communs
│   └── pages/            ← gabarit de chaque page (accueil, à propos, services…)
├── assets/
│   ├── css/style.css     ← feuille de style unique
│   ├── js/main.js        ← menu mobile, lightbox, filtres, formulaire, animations
│   ├── img/              ← images (optimisées, classées par usage)
│   └── video/intro.webm  ← vidéo de la page d'accueil
├── index.html, a-propos/, services/, realisations/, contact/, mentions-legales/  ← FR (générés)
├── en/                   ← version anglaise (générée)
├── sitemap.xml, robots.txt, 404.html                                          ← générés
└── .nojekyll
```

Les fichiers HTML à la racine et dans `en/` sont **générés** : ne les modifiez pas à la
main, modifiez les sources dans `src/` puis relancez `node build.js`.

## 2. Mettre à jour le site

Prérequis : [Node.js](https://nodejs.org) (version 18 ou plus). Rien d'autre à installer.

```bash
node build.js            # régénère toutes les pages
node build.js --serve    # idem + prévisualisation sur http://localhost:8080
```

| Je veux…                                   | Je modifie…                                                        |
|--------------------------------------------|--------------------------------------------------------------------|
| Changer un numéro, une adresse, un e-mail  | `src/data/site.js`                                                 |
| Changer un texte FR / EN                   | `src/i18n/fr.js` / `src/i18n/en.js` (même clé dans les deux)       |
| Ajouter une réalisation                    | image dans `assets/img/projects/` + ligne dans `src/data/projects.js` + titre dans `fr.js`/`en.js` (`projects.items`) |
| Ajouter / retirer un client ou partenaire  | logo dans `assets/img/clients|partners/` + `src/data/site.js`      |
| Ajouter une photo à un service             | `src/data/services.js` (tableau `images`)                          |
| Changer les couleurs                       | variables `:root` en haut de `assets/css/style.css`                |
| Activer le formulaire de contact           | voir §4                                                            |

Après modification : `node build.js`, puis envoyez le dossier complet sur l'hébergement
(ou `git push` si l'hébergeur déploie depuis GitHub).

## 3. Déploiement

* **Hébergement classique (cPanel, OVH, LWS…)** : envoyez tout le contenu du dépôt
  (sauf `.git`, `src/`, `build.js`, `README.md` si vous le souhaitez) dans `public_html/`.
  Les URL sont « propres » (`/a-propos/`, `/en/services/…`) grâce aux dossiers `index.html`.
  Pour la page 404 sur Apache, ajoutez un `.htaccess` : `ErrorDocument 404 /404.html`.
* **Netlify / Vercel / Cloudflare Pages** : connectez le dépôt, aucune commande de build
  nécessaire (dossier de publication : racine). La page `404.html` est reconnue automatiquement.
* **GitHub Pages (sous-dossier)** : mettez `base: '/phi-co'` dans `src/data/site.js`,
  relancez `node build.js`, puis activez Pages sur la branche `main`.

Le domaine canonique (`https://phi-co.com`) est défini dans `src/data/site.js` et sert
aux balises SEO, au sitemap et aux liens hreflang.

## 4. Formulaire de contact

Le site étant statique, l'envoi d'e-mail passe par un service tiers gratuit :

1. Créez un formulaire sur <https://formspree.io> (ou Web3Forms, Getform…) avec l'adresse
   de réception `info@phi-co.com`.
2. Collez l'URL obtenue dans `formEndpoint` de `src/data/site.js`
   (ex. `'https://formspree.io/f/abcdwxyz'`).
3. `node build.js`.

Tant que `formEndpoint` est vide, le bouton « Envoyer » ouvre le logiciel de messagerie
du visiteur avec un e-mail pré-rempli (mailto:). Un champ anti-spam (honeypot) est inclus.

## 5. Ce qui a été repris / amélioré par rapport à l'ancien site

* Toutes les informations d'entreprise (capital, dates, sites, téléphones, e-mails,
  partenaires, clients) et toutes les images de l'ancien site ont été conservées,
  renommées proprement et compressées (18 Mo → 9,5 Mo).
* Nouvelles sections : chiffres clés, frise historique, méthode en 4 étapes, engagements,
  marques par service, filtres de réalisations, référence BGFIBank, sites détaillés,
  horaires, WhatsApp, carte, mentions légales, page 404, version anglaise complète.
* SEO : balises title/description par page, canonical + hreflang FR/EN, Open Graph,
  données structurées Schema.org, sitemap.xml, robots.txt, images `loading="lazy"`.
* Accessibilité : navigation clavier, lien d'évitement, contrastes, `aria-*`,
  respect de `prefers-reduced-motion`, vidéo désactivée sur connexion lente.
* Corrections de l'ancien site : « Acceuil », balises `<br>` visibles, numéros superposés,
  liens sociaux vides, compteurs à zéro, mélange FR/EN.

## 6. À compléter par le client (liste de collecte)

- [ ] Numéros **RCCM** et **NIU** pour les mentions légales (`src/i18n/*.js`, clé `legal`).
- [ ] Nom de l'hébergeur (mentions légales).
- [ ] Vérifier les **liens réseaux sociaux** (`src/data/site.js` → `social`) : les pseudos
      viennent de l'ancien site, les URL sont à confirmer.
- [ ] **Horaires** d'ouverture exacts (clé `contact.hours`).
- [ ] Noms réels des **projets** de la galerie (client, lieu, année) pour remplacer les
      légendes génériques (`projects.items`).
- [ ] Photos professionnelles récentes (siège BGFIBank, Krystal Palace…) pour enrichir la galerie.
- [ ] Photo et mot du dirigeant si souhaité (section à ajouter dans `src/pages/about.js`).
- [ ] Créer le compte Formspree et renseigner `formEndpoint`.
