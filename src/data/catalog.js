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
        images: ['catalog/doors/porte-alu-1.jpg', 'catalog/doors/porte-alu-4.jpg', 'catalog/doors/porte-alu-5.jpg', 'catalog/doors/porte-alu-detail.jpg'] },
      { id: 'windows', slug: { fr: 'fenetres-aluminium', en: 'aluminium-windows' }, brands: ['Schüco', 'Cortizo', 'Aluminium du Maroc', 'Profils Systèmes'],
        images: ['catalog/windows/fenetre-alu-2.jpg', 'catalog/windows/fenetre-alu-5.jpg', 'catalog/windows/fenetre-alu-6.jpg', 'catalog/windows/fenetre-alu-details.jpg'] },
      { id: 'louvres', slug: { fr: 'fenetres-jalousie', en: 'louvre-windows' }, brands: ['Cortizo', 'AluK'],
        images: ['catalog/louvres/jalousie.jpg', 'catalog/louvres/jalousie-aluminium-1.jpg', 'catalog/louvres/jalousie-aluminium-2.jpg', 'catalog/louvres/jalousie-alu-detail.jpg'] },
      { id: 'partitions', slug: { fr: 'baies-et-cloisons-vitrees', en: 'glazed-openings-and-partitions' }, brands: ['Schüco', 'Cortizo', 'Saint-Gobain', 'AGC'],
        images: ['catalog/glazed-partitions/baie-et-cloison-vitres.jpg', 'catalog/glazed-partitions/baie-et-cloison-vitres-3.jpg', 'catalog/glazed-partitions/baie-vitree-alu-5.jpg', 'catalog/glazed-partitions/baie-et-cloison-vitres-detail-2.jpg'] },
      { id: 'balustrades', slug: { fr: 'garde-corps-vitres', en: 'glass-balustrades' }, brands: ['Saint-Gobain', 'AGC', 'Cristalmax'],
        images: ['catalog/balustrades/garde-corps-vitres.jpg', 'catalog/balustrades/garde-corps-vitres-3.jpg', 'catalog/balustrades/garde-corps-vitres-4.jpg', 'catalog/balustrades/garde-corps-vitres-detail.jpg'] },
      { id: 'curtainWall', slug: { fr: 'murs-rideaux', en: 'curtain-walls' }, brands: ['Schüco', 'Saint-Gobain', 'AGC', 'Cortizo'],
        images: ['projects/jack/5900.jpg', 'catalog/curtain-wall/mur-rideau-1.jpg', 'projects/tradex/0034.jpg', 'catalog/curtain-wall/mur-rideau-detail-1.jpg'] },
      { id: 'cladding', slug: { fr: 'revetements-interieurs-et-exterieurs', en: 'interior-and-exterior-cladding' }, brands: ['Alucobond', 'Alucoil', 'EQUITONE', 'Trespa', 'Fundermax'],
        images: ['projects/jack/0044.jpg', 'catalog/facade/facade-1.jpg', 'catalog/interior/verriere-interieure-alu.jpg', 'catalog/facade/facade-detail.jpg'] },
      { id: 'pergolas', slug: { fr: 'pergolas-aluminium', en: 'aluminium-pergolas' }, brands: ['Cortizo', 'Profils Systèmes'],
        images: ['catalog/pergolas/pergola-alu-1.jpg', 'catalog/pergolas/pergola-alu-3.jpg', 'catalog/pergolas/pergola-alu-4.jpg', 'catalog/pergolas/pergola-alu-detail.jpg'] },
    ],
  },
  {
    id: 'services',
    slug: { fr: 'services', en: 'services' },
    icon: 'icons/icon-supplies.png',
    banner: 'banners/banner-supplies.jpg',
    items: [
      { id: 'furniture', slug: { fr: 'mobilier-de-bureau', en: 'office-furniture' }, brands: ['DVO'],
        images: ['catalog/furniture/mobilier-de-bureau-1.jpg', 'catalog/furniture/mobilier-de-bureau-2.jpg', 'catalog/furniture/mobilier-de-bureau-5.jpg', 'projects/proj-06.jpg'] },
      { id: 'tiling', slug: { fr: 'carrelage', en: 'tiling' }, brands: ['Zanutta'],
        images: ['catalog/tiling/carrelage-sol-1.jpg', 'catalog/tiling/carrelage-mur-1.jpg', 'catalog/tiling/carrelage-sol-4.jpg', 'catalog/tiling/carrelage-mur-3.jpg'] },
      { id: 'painting', slug: { fr: 'peinture', en: 'painting' }, brands: [],
        images: ['catalog/painting/peinture-1.jpg', 'catalog/painting/peinture-3.jpg', 'catalog/painting/peinture-4.jpg', 'services/sup-peinture-4.jpg'] },
      { id: 'ceilings', slug: { fr: 'faux-plafond', en: 'suspended-ceilings' }, brands: ['Saint-Gobain'],
        images: ['catalog/ceilings/faux-plafond-4.jpg', 'catalog/ceilings/faux-plafond-1.jpg', 'catalog/ceilings/faux-plafond-3.jpg', 'services/sup-plafond-1.jpg'] },
      { id: 'drywall', slug: { fr: 'placoplatre', en: 'plasterboard' }, brands: ['Saint-Gobain'],
        images: ['catalog/drywall/placoplatre-1.jpg', 'catalog/drywall/placoplatre-2.jpg', 'catalog/drywall/placoplatre-4.jpg', 'services/sup-placo-1.jpg'] },
    ],
  },
  {
    id: 'works',
    slug: { fr: 'accessoires-et-travaux-divers', en: 'accessories-and-other-works' },
    icon: 'icons/icon-projects.png',
    banner: 'factory/capture-2.jpg',
    items: [
      { id: 'handles', slug: { fr: 'poignees-de-porte', en: 'door-handles' }, brands: ['Dorma', 'Cortizo'],
        images: ['catalog/accessories/poignee-1.jpg', 'catalog/accessories/poignee-2.jpg', 'catalog/accessories/poignee-3.jpg', 'catalog/accessories/poignee-6.jpg'] },
      { id: 'security', slug: { fr: 'dispositifs-de-securite-porte', en: 'door-security-devices' }, brands: ['Dorma'],
        images: ['catalog/accessories/dispositif-securite-porte.jpg', 'catalog/accessories/dispositif-securite-porte-1.jpg', 'catalog/accessories/dispositif-securite-porte-2.jpg', 'catalog/accessories/dispositif-securite-porte-3.jpg'] },
      { id: 'cnc', slug: { fr: 'decoupe-numerique', en: 'cnc-cutting' }, brands: [],
        images: ['factory/1877.jpg', 'factory/1887.jpg', 'factory/1812.jpg', 'factory/1829.jpg'] },
      { id: 'glazing', slug: { fr: 'double-vitrage', en: 'insulating-glass' }, brands: ['Swisspacer', 'Saint-Gobain', 'AGC'],
        images: ['factory/1712.jpg', 'factory/1702.jpg', 'factory/1730.jpg', 'catalog/works/double-vitrage-3.jpg'] },
      { id: 'exterior', slug: { fr: 'revetements-exterieurs', en: 'exterior-cladding' }, brands: ['Alucobond', 'Alucoil', 'EQUITONE', 'Trespa', 'Fundermax'],
        images: ['projects/jack/0032.jpg', 'catalog/facade/facade-2.jpg', 'catalog/facade/facade-4.jpg', 'services/fac-revetement-1.jpg'] },
    ],
  },
];
