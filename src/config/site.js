// Single source of truth for company facts. Edit here, not in components.
// Items marked VERIFY came from the old site and are inconsistent or undated.

export const SITE = {
  name: 'Maruway Networks',
  legalName: 'Maruway Networks Limited',
  tagline: 'Predictable delivery',
  url: 'https://www.maruwaynetworks.com',
  founded: 2014,
  description:
    'Managed IT, network and CCTV installation, access control, telecom and IoT, and data analytics for businesses in Nairobi and across East Africa. A technician on site within one hour.',
  email: 'info@maruwaynetworks.com',
  // VERIFY: the old site lists both +254 726 701 846 and +254 786 701 846.
  phone: { display: '+254 726 701 846', tel: '+254726701846' },
  // Optional: set to the number registered on WhatsApp (digits only, with country code), or leave ''.
  whatsapp: '254726701846',
  address: {
    street: 'Vision Plaza, Mombasa Road',
    postalBox: 'P.O. Box 37642-00100',
    city: 'Nairobi',
    region: 'Nairobi County',
    country: 'Kenya',
    countryCode: 'KE',
  },
  hours: 'Support available around the clock', // VERIFY the wording of the 24/7 commitment
  responseCommitmentMinutes: 60, // VERIFY terms: coverage area, hours, what counts as "response"
  mapQuery: 'Vision Plaza, Mombasa Road, Nairobi',
  social: {
    // Add real URLs. Empty values are not rendered.
    linkedin: '',
    facebook: '',
    x: '',
    instagram: '',
  },
};

// VERIFY: these figures are undated on the old site. Confirm the definition and date before publishing.
export const STATS = {
  asOf: '2026',
  items: [
    { value: 1291, label: 'Projects delivered' },
    { value: 1020, label: 'Clients served' },
    { value: 340, label: 'Partners' },
    { value: 116, label: 'Projects in progress' },
  ],
};

export const NAV = [
  { label: 'Services', to: '/services', mega: 'services' },
  { label: 'Industries', to: '/industries', mega: 'industries' },
  { label: 'Work', to: '/projects' },
  { label: 'Insights', to: '/insights' },
  { label: 'Support', to: '/support' },
  { label: 'Company', to: '/about', mega: 'company' },
];

// Form delivery. Set VITE_FORM_ENDPOINT in .env (Formspree, Web3Forms, or your own API).
// Without it the form falls back to opening the visitor's email app.
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
export const GA_ID = import.meta.env.VITE_GA_ID || '';
