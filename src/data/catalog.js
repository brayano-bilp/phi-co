// ---------------------------------------------------------------------------
// Catalogue « Catégories » : Produits / Services / Accessoires & travaux divers
// (structure demandée par le client dans son cahier des charges).
// Les textes sont dans src/i18n/catalog.fr.js et catalog.en.js (clé = id).
// Les images sont relatives à assets/img/.
// ---------------------------------------------------------------------------
module.exports = [
  {
    id: 'products',
    slug: { fr: 'produits', en: 'products' },
    icon: 'icons/icon-aluminium.png',
    banner: 'projects/jack/5900.jpg',
    items: [
      { id: 'doors', slug: { fr: 'portes-aluminium', en: 'aluminium-doors' }, brands: ['Schüco', 'Cortizo', 'AluK', 'Dorma'],
        images: ['projects/krystal/0054.jpg', 'projects/tradex/p1100034.jpg', 'factory/1846.jpg', 'factory/18.jpg'] },
      { id: 'windows', slug: { fr: 'fenetres-aluminium', en: 'aluminium-windows' }, brands: ['Schüco', 'Cortizo', 'Aluminium du Maroc', 'Profils Systèmes'],
        images: ['projects/krystal/0011.jpg', 'projects/jack/0011.jpg', 'factory/1809.jpg', 'factory/1823.jpg'] },
      { id: 'louvres', slug: { fr: 'fenetres-jalousie', en: 'louvre-windows' }, brands: ['Cortizo', 'AluK'],
        images: ['projects/krystal/0021.jpg', 'projects/krystal/0023.jpg', 'factory/1816.jpg', 'factory/1828.jpg'] },
      { id: 'partitions', slug: { fr: 'baies-et-cloisons-vitrees', en: 'glazed-openings-and-partitions' }, brands: ['Schüco', 'Cortizo', 'Saint-Gobain', 'AGC'],
        images: ['projects/proj-14.jpg', 'projects/krystal/0015.jpg', 'projects/tradex/0030.jpg', 'projects/tradex/0035.jpg'] },
      { id: 'balustrades', slug: { fr: 'garde-corps-vitres', en: 'glass-balustrades' }, brands: ['Saint-Gobain', 'AGC', 'Cristalmax'],
        images: ['projects/jack/0015.jpg', 'projects/jack/0022.jpg', 'projects/jack/0026.jpg', 'projects/jack/0058.jpg'] },
      { id: 'curtainWall', slug: { fr: 'murs-rideaux', en: 'curtain-walls' }, brands: ['Schüco', 'Saint-Gobain', 'AGC', 'Cortizo'],
        images: ['projects/jack/5900.jpg', 'projects/tradex/0034.jpg', 'projects/tradex/0035.jpg', 'projects/tradex/p1090769.jpg'] },
      { id: 'cladding', slug: { fr: 'revetements-interieurs-et-exterieurs', en: 'interior-and-exterior-cladding' }, brands: ['Alucobond', 'Alucoil', 'EQUITONE', 'Trespa', 'Fundermax'],
        images: ['projects/jack/0044.jpg', 'projects/krystal/0025.jpg', 'projects/krystal/0058.jpg', 'projects/krystal/0003.jpg'] },
      { id: 'pergolas', slug: { fr: 'pergolas-aluminium', en: 'aluminium-pergolas' }, brands: ['Cortizo', 'Profils Systèmes'],
        images: ['catalog/ph-pergolas.jpg'] },
    ],
  },
  {
    id: 'services',
    slug: { fr: 'services', en: 'services' },
    icon: 'icons/icon-supplies.png',
    banner: 'banners/banner-supplies.jpg',
    items: [
      { id: 'furniture', slug: { fr: 'mobilier-de-bureau', en: 'office-furniture' }, brands: ['DVO'],
        images: ['catalog/ph-furniture.jpg'] },
      { id: 'tiling', slug: { fr: 'carrelage', en: 'tiling' }, brands: ['Zanutta'],
        images: ['catalog/ph-tiling.jpg'] },
      { id: 'painting', slug: { fr: 'peinture', en: 'painting' }, brands: [],
        images: ['projects/proj-09.jpg', 'projects/krystal/0042.jpg'] },
      { id: 'ceilings', slug: { fr: 'faux-plafond', en: 'suspended-ceilings' }, brands: ['Saint-Gobain'],
        images: ['catalog/ph-ceilings.jpg'] },
      { id: 'drywall', slug: { fr: 'placoplatre', en: 'plasterboard' }, brands: ['Saint-Gobain'],
        images: ['catalog/ph-drywall.jpg'] },
    ],
  },
  {
    id: 'works',
    slug: { fr: 'accessoires-et-travaux-divers', en: 'accessories-and-other-works' },
    icon: 'icons/icon-projects.png',
    banner: 'factory/capture-2.jpg',
    items: [
      { id: 'handles', slug: { fr: 'poignees-de-porte', en: 'door-handles' }, brands: ['Dorma', 'Cortizo'],
        images: ['catalog/ph-handles.jpg'] },
      { id: 'security', slug: { fr: 'dispositifs-de-securite-porte', en: 'door-security-devices' }, brands: ['Dorma'],
        images: ['catalog/ph-security.jpg'] },
      { id: 'cnc', slug: { fr: 'decoupe-numerique', en: 'cnc-cutting' }, brands: [],
        images: ['factory/1877.jpg', 'factory/1887.jpg', 'factory/1812.jpg', 'factory/1829.jpg'] },
      { id: 'glazing', slug: { fr: 'double-vitrage', en: 'insulating-glass' }, brands: ['Swisspacer', 'Saint-Gobain', 'AGC'],
        images: ['factory/1712.jpg', 'factory/1702.jpg', 'factory/1730.jpg', 'factory/1733.jpg'] },
      { id: 'exterior', slug: { fr: 'revetements-exterieurs', en: 'exterior-cladding' }, brands: ['Alucobond', 'Alucoil', 'EQUITONE', 'Trespa', 'Fundermax'],
        images: ['projects/jack/0032.jpg', 'projects/krystal/0039.jpg', 'projects/tradex/0003.jpg', 'projects/krystal/0042.jpg'] },
    ],
  },
];
