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
├── build.js                 ← générateur : `node build.js`
├── src/
│   ├── data/
│   │   ├── site.js          ← coordonnées, adresses, téléphones, réseaux, clients, partenaires
│   │   ├── catalog.js       ← les 3 catégories (Produits / Services / Accessoires & travaux divers),
│   │   │                       leurs 18 fiches, leurs images et marques
│   │   ├── projects.js      ← projets phares (Jack, Krystal Palace, Tradex) + galerie + photos usine
│   │   ├── news.js          ← actualités (textes FR/EN inclus)
│   │   └── testimonials.js  ← témoignages clients (vide pour l'instant)
│   ├── i18n/
│   │   ├── fr.js / en.js            ← textes des pages (même structure dans les deux)
│   │   └── catalog.fr.js / .en.js   ← textes des 18 fiches produits/services (textes du client)
│   ├── layout.js            ← en-tête (méga-menu), pied de page, <head> SEO, blocs communs
│   └── pages/               ← gabarits : home, about, catalog, projects, news, testimonials, contact(+devis), misc
├── assets/
│   ├── css/style.css        ← feuille de style unique (sections numérotées)
│   ├── js/main.js           ← animations, menu, lightbox, filtres, formulaires
│   ├── img/                 ← images optimisées, classées : brand, icons, banners, catalog/<item>,
│   │                           projects/<projet>, factory, clients, partners, services
│   └── video/intro.mp4      ← film d'accueil (début d'origine + chantiers)
├── index.html, a-propos/, produits/, services/, accessoires-et-travaux-divers/,
│   realisations/, actualites/, temoignages/, contact/, devis/, mentions-legales/   ← FR (générés)
├── en/                      ← version anglaise (générée)
├── sitemap.xml, robots.txt, 404.html                                               ← générés
└── .nojekyll
```

Les fichiers HTML à la racine et dans `en/` sont **générés** : ne les modifiez pas à la
main, modifiez les sources dans `src/` puis relancez `node build.js` (72 pages).

## 2. Mettre à jour le site

Prérequis : [Node.js](https://nodejs.org) (version 18 ou plus). Rien d'autre à installer.

```bash
node build.js            # régénère toutes les pages
node build.js --serve    # idem + prévisualisation sur http://localhost:8080
```

| Je veux…                                        | Je modifie…                                                                 |
|-------------------------------------------------|-----------------------------------------------------------------------------|
| Changer un numéro, une adresse, un e-mail       | `src/data/site.js`                                                          |
| Changer un texte de page FR / EN                | `src/i18n/fr.js` / `src/i18n/en.js` (même clé dans les deux)                |
| Modifier le texte d'une fiche produit/service   | `src/i18n/catalog.fr.js` / `catalog.en.js` (clé `items.<id>`)               |
| Changer les photos d'une fiche                  | `src/data/catalog.js` (tableau `images`, 4 images : la 1re est la principale) |
| Ajouter une fiche produit                       | nouvel objet dans `src/data/catalog.js` + textes dans `catalog.fr.js`/`.en.js` |
| **Publier une actualité**                       | nouvel objet en tête de `src/data/news.js` (titre, extrait, corps FR/EN, image) |
| **Ajouter un témoignage client**                | nouvel objet dans `src/data/testimonials.js` (modèle en commentaire)        |
| Ajouter un projet phare                         | photos dans `assets/img/projects/<id>/` + `src/data/projects.js` + textes `projects.featured.<id>` dans `fr.js`/`en.js` |
| Ajouter / retirer un client ou partenaire       | logo dans `assets/img/clients|partners/` + `src/data/site.js`               |
| Changer les couleurs                            | variables `:root` en haut de `assets/css/style.css`                         |
| Activer l'envoi des formulaires                 | voir §4                                                                     |

Après modification : `node build.js`, puis envoyez le dossier complet sur l'hébergement
(ou `git push` si l'hébergeur déploie depuis GitHub).

## 3. Déploiement

* **Hébergement classique (cPanel, OVH, LWS…)** : envoyez tout le contenu du dépôt
  (sauf `.git`, `src/`, `build.js`, `README.md` si vous le souhaitez) dans `public_html/`.
  Les URL sont « propres » (`/produits/murs-rideaux/`, `/en/projects/…`) grâce aux
  dossiers `index.html`. Pour la page 404 sur Apache, ajoutez un `.htaccess` :
  `ErrorDocument 404 /404.html`.
* **Netlify / Vercel / Cloudflare Pages** : connectez le dépôt, aucune commande de build
  nécessaire (dossier de publication : racine). La page `404.html` est reconnue automatiquement.
* **GitHub Pages (sous-dossier)** : mettez `base: '/phi-co'` dans `src/data/site.js`,
  relancez `node build.js`, puis activez Pages sur la branche `main`.

Le domaine canonique (`https://phi-co.com`) est défini dans `src/data/site.js` et sert
aux balises SEO, au sitemap et aux liens hreflang.

## 4. Formulaires (contact et devis)

Le site étant statique, l'envoi d'e-mail passe par un service tiers gratuit :

1. Créez un formulaire sur <https://formspree.io> (ou Web3Forms, Getform…) avec l'adresse
   de réception `info@phi-co.com`.
2. Collez l'URL obtenue dans `formEndpoint` de `src/data/site.js`
   (ex. `'https://formspree.io/f/abcdwxyz'`). Les deux formulaires (contact et devis)
   l'utilisent ; le champ caché `_form` vaut `contact` ou `quote` pour les distinguer.
3. `node build.js`.

Tant que `formEndpoint` est vide, le bouton « Envoyer » ouvre le logiciel de messagerie
du visiteur avec un e-mail pré-rempli (mailto:). Un champ anti-spam (honeypot) est inclus.

## 5. Animations

Toutes les animations respectent `prefers-reduced-motion` (désactivées si l'utilisateur
le demande) et n'utilisent que `transform`/`opacity` pour rester fluides sur mobile :

* vidéo d'accueil toujours visible (bouton pause/lecture ; seuls les visiteurs qui demandent « moins d'animations » ne la voient pas démarrer seule) ;
* entrée du hero (texte en cascade, titre scintillant, φ flottant, indicateur de défilement) ;
* apparition au défilement par `data-reveal="up|left|right|zoom"` + `data-delay="ms"` ;
* compteurs animés (`.count[data-count]`), frise chronologique qui se dessine ;
* cartes catégories inclinées en 3D au survol (`data-tilt`), zoom des images, boutons « brillants » ;
* en-tête qui se masque en défilant vers le bas, barre de progression de lecture ;
* bandeaux de pages en effet Ken Burns + parallaxe légère ; bandeau usine défilant ;
* lightbox avec transition, navigation clavier/tactile, compteur et préchargement.

## 6. Conformité aux cahiers des charges du client

| Demande (cahiers des charges 2024-2025)                           | Statut |
|-------------------------------------------------------------------|--------|
| Navigation fixe, vidéo auto en boucle, icônes/rubriques cliquables | ✅ |
| Menu « Catégories » : Produits / Services / Accessoires & travaux divers, 3-4 images + texte par fiche | ✅ 18 fiches |
| Textes fournis par le client respectés (corrigés)                 | ✅ `catalog.fr.js`, `about` |
| Page Actualités et événements                                      | ✅ 3 articles de départ |
| Page Témoignages clients                                           | ✅ structure prête, citations à fournir |
| Projets avec informations détaillées                               | ✅ 3 fiches projets (photos drone) |
| Projets « avant/après »                                            | ⏳ aucune photo « avant » fournie : à ajouter dès réception |
| Carte sur le bureau technique                                      | ✅ (Yassa — le cahier dit « Bali », à confirmer : `mapSite` dans `site.js`) |
| Formulaire de contact + formulaire de demande de devis             | ✅ deux formulaires distincts |
| Réseaux sociaux reliés                                             | ⚠️ URL à confirmer (`site.js` → `social`) |
| SEO                                                                | ✅ title/description par page, hreflang, Open Graph, Schema.org (Product, NewsArticle), sitemap |

## 7. À compléter par le client (liste de collecte)

- [ ] Numéros **RCCM** et **NIU** pour les mentions légales (`src/i18n/*.js`, clé `legal`).
- [ ] Nom de l'hébergeur (mentions légales).
- [ ] Vérifier les **liens réseaux sociaux** (`src/data/site.js` → `social`).
- [ ] **Horaires** d'ouverture exacts (clé `contact.hours`).
- [ ] **Années de livraison** des projets Jack et Tradex (`src/data/projects.js` → `year`).
- [ ] Photos **« avant »** des chantiers pour les comparatifs avant/après.
- [ ] 2-3 **témoignages clients** (nom, fonction, entreprise, texte).
- [ ] Créer le compte Formspree et renseigner `formEndpoint`.
- [ ] Créer une fiche **Google Business Profile** (référencement local).
- [ ] **Photos réelles de chantiers** pour les fiches qui n'ont aujourd'hui qu'un visuel neutre
      (φ bleu) : pergolas, carrelage, faux plafond, placoplâtre, poignées de porte, dispositifs de
      sécurité. À déposer dans `assets/img/catalog/<fiche>/` puis à référencer dans
      `src/data/catalog.js` (jusqu'à 4 images par fiche).
- [ ] Photos supplémentaires pour garde-corps, jalousies, fenêtres et mobilier de bureau : ces
      fiches utilisent des photos de réalisations proches (Jack, Krystal Palace, Tradex, usine).

> **Règle sur les images** : le site n'affiche que des photos réelles de PHI & CO (chantiers
> Jack, Krystal Palace, Tradex, usine de fabrication, logos clients/partenaires). Les images de
> catalogue ou de banque d'images fournies sur la clé ont été retirées.

## 8. Vidéos

Une vidéo H.264 (MP4, 1280×720, 29,97 i/s, sans son) : `assets/video/intro.mp4` (~72 s, en boucle),
affichée **seule et en plein cadre en haut de l'accueil** (aucun calque ni texte par-dessus ; le titre
et les boutons sont juste en dessous). Déroulé :

1. 0–14 s : début **exact** de la vidéo d'origine du client (logo, nombre d'or, masques) ;
2. signes de la Divine Proportion : schéma a + b (redessiné net), spirale d'or, homme de Vitruve ;
3. masques africains, détourés (fond neutre bleu nuit) ;
4. réalisations : Immeuble Jack, Krystal Palace (dont vues de nuit, marquise et façade), siège Tradex,
   usine — avec légendes ;
5. retour au logo.

Les images sont animées au sous-pixel (mouvement fluide, sans tremblement) ; les petites images
fournies sont présentées « en tableau » sur un fond soigné pour rester nettes.

Pour les refaire avec de nouvelles photos : monter les nouvelles images en MP4 H.264 (1280×720,
`-crf 28`, `-movflags +faststart`, sans piste audio, idéalement < 7 Mo) puis remplacer ce fichier (le site ajoute automatiquement un numéro de version pour vider le cache des navigateurs).

## 9. La Divine Proportion (φ ≈ 1,618) dans le site

* **Page « Qui sommes-nous »** : encadré « Pourquoi PHI ? » (textes `about.phi` dans `fr.js`/`en.js`)
  avec un rectangle d'or dont la spirale se dessine à l'apparition (`goldenSvg()` dans `layout.js`).
* **Mise en page** : colonnes texte/image en 61,8 % / 38,2 % (`.split`, `.item-hero`, `.phi__grid`) ;
  photos des cartes, galeries et fiches au format rectangle d'or (`aspect-ratio: 1.618 / 1`).
* **Galeries en spirale** (fiches projets et usine) : `goldenGallery()` compose les 5 premières
  photos en rectangle de Fibonacci 13 × 8 (carrés 8, 5, 3, 2, puis 2 × 1) parcouru par la spirale ;
  les photos suivantes forment une grille classique. Sur mobile : grille simple.
  ➜ Choisissez bien la **1re photo** de chaque galerie : c'est la plus grande.
