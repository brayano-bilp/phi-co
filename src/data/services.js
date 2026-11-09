// ---------------------------------------------------------------------------
// Les 4 familles de services. Les textes sont dans src/i18n/{fr,en}.js
// (clé `services.<id>`). Ici : identifiants, URL, icônes et images.
// ---------------------------------------------------------------------------
module.exports = [
  {
    id: 'facades',
    slug: { fr: 'facades', en: 'facades' },
    icon: 'icons/icon-facades.png',
    banner: 'banners/banner-facades.jpg',
    cover: 'services/fac-murrideau-2.jpg',
    items: [
      { id: 'murRideau', images: ['services/fac-murrideau-1.jpg', 'services/fac-murrideau-2.jpg', 'services/fac-murrideau-3.jpg'] },
      { id: 'ravalement', images: ['services/fac-ravalement-1.jpg', 'services/fac-ravalement-2.jpg', 'services/fac-ravalement-3.jpg'] },
      { id: 'revetement', images: ['services/fac-revetement-1.jpg', 'services/fac-revetement-2.jpg', 'services/fac-revetement-3.jpg'] },
    ],
  },
  {
    id: 'aluminium',
    slug: { fr: 'menuiserie-aluminium', en: 'aluminium-joinery' },
    icon: 'icons/icon-aluminium.png',
    banner: 'banners/banner-aluminium.jpg',
    cover: 'services/alu-portes-2.jpg',
    items: [
      { id: 'portes', images: ['services/alu-portes-1.jpg', 'services/alu-portes-2.jpg', 'services/alu-portes-3.jpg'] },
      { id: 'cloisons', images: ['services/alu-cloison-1.jpg', 'services/alu-cloison-2.jpg'] },
      { id: 'gardeCorps', images: ['services/alu-gardecorps-1.jpg', 'services/alu-gardecorps-2.jpg', 'services/alu-gardecorps-3.jpg'] },
      { id: 'jalousies', images: ['services/alu-jalousie-1.jpg', 'services/alu-jalousie-2.jpg'] },
      { id: 'briseSoleil', images: ['services/alu-brisesoleil-1.jpg', 'services/alu-brisesoleil-2.jpg', 'services/alu-brisesoleil-3.jpg'] },
    ],
  },
  {
    id: 'supplies',
    slug: { fr: 'fournitures-et-installations', en: 'supplies-and-fit-out' },
    icon: 'icons/icon-supplies.png',
    banner: 'banners/banner-supplies.jpg',
    cover: 'services/sup-mobilier-1.jpg',
    items: [
      { id: 'mobilier', images: ['services/sup-mobilier-1.jpg', 'services/sup-mobilier-2.jpg', 'services/sup-mobilier-3.jpg'] },
      { id: 'carrelage', images: ['services/sup-carrelage-3.jpg', 'services/sup-carrelage-1.jpg', 'services/sup-carrelage-2.jpg'] },
      { id: 'peinture', images: ['services/sup-peinture-4.jpg', 'services/sup-peinture-1.jpg', 'services/sup-peinture-2.jpg'] },
      { id: 'plafond', images: ['services/sup-plafond-1.jpg', 'services/sup-plafond-4.jpg', 'services/sup-plafond-2.jpg'] },
      { id: 'placo', images: ['services/sup-placo-1.jpg', 'services/sup-placo-2.jpg'] },
    ],
  },
  {
    id: 'works',
    slug: { fr: 'travaux-divers', en: 'other-works' },
    icon: 'icons/icon-projects.png',
    banner: 'banners/banner-works.jpg',
    cover: 'services/wk-cnc-4.jpg',
    items: [
      { id: 'cnc', images: ['services/wk-cnc-4.jpg', 'services/wk-cnc-1.jpg', 'services/wk-cnc-3.jpg'] },
      { id: 'vitrage', images: ['services/wk-vitrage-1.jpg', 'services/wk-vitrage-2.jpg'] },
    ],
  },
];
