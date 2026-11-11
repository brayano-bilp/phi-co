// ---------------------------------------------------------------------------
// Réalisations.
//  - `featured` : projets détaillés (une page chacun, photos drone).
//    Pour en ajouter un : dossier d'images dans assets/img/projects/<id>/,
//    une entrée ici, et ses textes dans src/i18n/fr.js + en.js (projects.featured.<id>).
//  - `gallery`  : photos isolées de la galerie générale (légendes dans i18n).
// cat : 'facades' | 'aluminium' | 'interior' | 'site'
// ---------------------------------------------------------------------------
module.exports = {
  featured: [
    {
      id: 'jack',
      slug: { fr: 'immeuble-jack', en: 'jack-building' },
      cover: 'projects/jack/0011.jpg',
      hero: 'projects/jack/0052.jpg',
      location: 'Douala',
      year: null,
      cats: ['facades', 'aluminium'],
      gallery: ['projects/jack/0011.jpg', 'projects/jack/0032.jpg', 'projects/jack/0044.jpg', 'projects/jack/5900.jpg', 'projects/jack/0022.jpg', 'projects/jack/0039.jpg', 'projects/jack/0026.jpg', 'projects/jack/0058.jpg'],
    },
    {
      id: 'krystal',
      slug: { fr: 'krystal-palace-douala', en: 'krystal-palace-douala' },
      cover: 'projects/krystal/0054.jpg',
      hero: 'projects/krystal/0011.jpg',
      location: 'Douala – Bonanjo',
      year: 2021,
      cats: ['facades', 'aluminium'],
      gallery: ['projects/krystal/0054.jpg', 'projects/krystal/0003.jpg', 'projects/krystal/0007.jpg', 'projects/krystal/0015.jpg', 'projects/krystal/0023.jpg', 'projects/krystal/0058.jpg', 'projects/krystal/0025.jpg', 'projects/krystal/hj.jpg', 'projects/krystal/0042.jpg'],
    },
    {
      id: 'tradex',
      slug: { fr: 'siege-tradex', en: 'tradex-head-office' },
      cover: 'projects/tradex/0003.jpg',
      hero: 'projects/tradex/0053.jpg',
      location: 'Douala',
      year: null,
      cats: ['facades'],
      gallery: ['projects/tradex/0003.jpg', 'projects/tradex/0011.jpg', 'projects/tradex/0034.jpg', 'projects/tradex/p1090769.jpg', 'projects/tradex/0035.jpg', 'projects/tradex/p1100034.jpg', 'projects/tradex/0030.jpg'],
    },
  ],

  gallery: [
    { id: 'p05', img: 'projects/proj-05.jpg', cat: 'facades' },
    { id: 'p04', img: 'projects/proj-04.jpg', cat: 'facades' },
    { id: 'p09', img: 'projects/proj-09.jpg', cat: 'facades' },
    { id: 'p10', img: 'projects/proj-10.jpg', cat: 'facades' },
    { id: 'p11', img: 'projects/proj-11.jpg', cat: 'facades' },
    { id: 'p14', img: 'projects/proj-14.jpg', cat: 'facades' },
  ],

  // Photos de l'usine (page « Qui sommes-nous » et accueil)
  factory: ['factory/capture.jpg', 'factory/1800.jpg', 'factory/1712.jpg', 'factory/1846.jpg', 'factory/1809.jpg', 'factory/1701.jpg', 'factory/1877.jpg', 'factory/1765.jpg'],
};
