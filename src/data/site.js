// ---------------------------------------------------------------------------
// Données générales de l'entreprise (identiques dans les deux langues).
// Modifiez ici un numéro, une adresse ou un lien : tout le site est régénéré.
// ---------------------------------------------------------------------------
module.exports = {
  name: 'PHI & CO S.A',
  shortName: 'Phi & Co',
  tagline: 'La Divine Proportion',
  domain: 'https://phi-co.com',
  // Préfixe des URL. Laissez '' si le site est à la racine du domaine.
  // Mettez '/phi-co' si vous le publiez dans un sous-dossier (ex. GitHub Pages).
  base: '',

  founded: 2005,
  capital: '100 000 000 FCFA',

  phones: [
    { label: '(+237) 243 019 001', tel: '+237243019001', type: 'fixe' },
    { label: '(+237) 691 601 432', tel: '+237691601432', type: 'mobile' },
    { label: '(+237) 690 910 548', tel: '+237690910548', type: 'mobile' },
    { label: '(+237) 691 607 204', tel: '+237691607204', type: 'mobile' },
  ],
  whatsapp: '237691601432',
  emails: ['info@phi-co.com', 'contact@phi-co.com', 'office@phi-co.com'],
  postal: 'BP 15 792 Douala – Littoral, Cameroun',

  // Formulaire de contact : créez un formulaire gratuit sur https://formspree.io
  // et collez ici l'URL "https://formspree.io/f/xxxxxxx".
  // Tant que ce champ est vide, le bouton ouvre le client mail (mailto:).
  formEndpoint: '',

  sites: [
    {
      key: 'showroom',
      fr: { title: 'Showroom & direction commerciale', area: 'Bali', detail: 'Boulevard de la République, Douala' },
      en: { title: 'Showroom & sales office', area: 'Bali', detail: 'Boulevard de la République, Douala' },
      map: 'Boulevard de la République, Bali, Douala, Cameroun',
    },
    {
      key: 'technique',
      fr: { title: 'Bureau technique, administration & centre de production 2', area: 'Yassa', detail: 'Entrée du nouveau stade de Japoma, Douala' },
      en: { title: 'Technical office, administration & production centre 2', area: 'Yassa', detail: 'Entrance of the new Japoma stadium, Douala' },
      map: 'Stade de Japoma, Yassa, Douala, Cameroun',
    },
    {
      key: 'usine1',
      fr: { title: 'Usine & centre de production 1', area: 'Akwa', detail: 'Carrefour ancien Dalip, Douala' },
      en: { title: 'Factory & production centre 1', area: 'Akwa', detail: 'Ancien Dalip junction, Douala' },
      map: 'Akwa, Douala, Cameroun',
    },
  ],
  // Site affiché sur la carte de la page Contact (clé ci-dessus).
  mapSite: 'technique',
  representations: [
    { city: 'Genève', country: { fr: 'Suisse', en: 'Switzerland' }, cityEn: 'Geneva' },
    { city: 'Cordignano', country: { fr: 'Italie', en: 'Italy' }, cityEn: 'Cordignano' },
  ],

  social: [
    { name: 'LinkedIn', handle: 'phandco', url: 'https://www.linkedin.com/company/phandco', icon: 'linkedin' },
    { name: 'Facebook', handle: 'phiandco', url: 'https://www.facebook.com/phiandco', icon: 'facebook' },
    { name: 'Instagram', handle: 'phi_co', url: 'https://www.instagram.com/phi_co', icon: 'instagram' },
    { name: 'X / Twitter', handle: '@phiandco', url: 'https://x.com/phiandco', icon: 'x' },
  ],

  clients: [
    { name: 'Afriland First Bank', img: 'clients/afriland.jpg' },
    { name: 'BGFIBank Cameroun', img: 'clients/bgfi.jpg' },
    { name: 'Banque Atlantique', img: 'clients/banque-atlantique.jpg' },
    { name: 'Tradex SA', img: 'clients/tradex.png' },
    { name: 'Port Autonome de Douala', img: 'clients/pad.jpg' },
    { name: 'Krystal Palace Douala', img: 'clients/krystal-palace.jpg' },
    { name: 'UCAC', img: 'clients/ucac.jpg' },
    { name: 'BVMAC', img: 'clients/bvmac.png' },
  ],

  partners: [
    { name: 'Schüco', img: 'partners/schuco.jpg', fr: 'Systèmes de façades et menuiseries aluminium', en: 'Aluminium façade and window systems' },
    { name: 'Saint-Gobain', img: 'partners/saint-gobain.jpg', fr: 'Verre architectural', en: 'Architectural glass' },
    { name: 'AGC Glass', img: 'partners/agc.jpg', fr: 'Verre plat et vitrages isolants', en: 'Flat glass and insulating glazing' },
    { name: 'Alucobond', img: 'partners/alucobond.png', fr: 'Panneaux composites aluminium', en: 'Aluminium composite panels' },
    { name: 'Alucoil', img: 'partners/alucoil.jpg', fr: 'Panneaux composites et bardages', en: 'Composite panels and cladding' },
    { name: 'AluK', img: 'partners/aluk.png', fr: 'Systèmes aluminium', en: 'Aluminium systems' },
    { name: 'Cortizo', img: 'partners/cortizo.png', fr: 'Profilés aluminium', en: 'Aluminium profiles' },
    { name: 'Aluminium du Maroc', img: 'partners/aluminium-du-maroc.jpg', fr: 'Profilés aluminium', en: 'Aluminium profiles' },
    { name: 'Profils Systèmes', img: 'partners/profils.jpg', fr: 'Menuiseries aluminium', en: 'Aluminium joinery systems' },
    { name: 'Dorma', img: 'partners/dorma.jpg', fr: 'Quincaillerie et automatismes de portes', en: 'Door hardware and automation' },
    { name: 'Cristalmax', img: 'partners/cristalmax.png', fr: 'Transformation du verre', en: 'Glass processing' },
    { name: 'DVO', img: 'partners/dvo.png', fr: 'Mobilier de bureau', en: 'Office furniture' },
    { name: 'Zanutta', img: 'partners/zanutta.jpg', fr: 'Matériaux et finitions', en: 'Building materials and finishes' },
  ],
};
