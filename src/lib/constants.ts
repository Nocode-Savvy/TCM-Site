// Business constants — single source of truth for all pages

export const BUSINESS = {
  name: 'TCM Home Solutions LLC',
  tagline: 'A Cleaner Home. A Better Space.',
  tagline2: 'Solutions for Everyday Life.',
  city: 'San Augustine, TX 75972',
  facebook: 'https://www.facebook.com/share/1DS1AB3QmF/?mibextid=wwXIfr',
  rating: '100% Recommended',
  reviewCount: 21,
  contacts: {
    carolyn: { name: 'Carolyn', phone: '936-201-2261', phoneHref: 'tel:9362012261' },
    tommy: { name: 'Tommy', phone: '936-201-6335', phoneHref: 'tel:9362016335' },
  },
} as const;

export const SERVICE_AREAS = [
  'San Augustine',
  'Fairmont',
  'Lufkin',
  'Broaddus',
  'Hemphill',
  'Pineland',
  'Carthage',
  'Henderson County',
  'Jasper',
  'Nacogdoches',
  'Huxley',
] as const;

export const SERVICES = [
  {
    id: 'residential-cleaning',
    name: 'Residential Cleaning',
    subtitle: 'Signature / Maintenance Clean',
    description: 'A detailed refresh to keep your home consistently fresh and comfortable.',
    iconName: 'Sparkles',
    category: 'cleaning',
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    description: 'A full reset for every room — perfect for seasonal refreshes or before/after special occasions.',
    iconName: 'Sparkle',
    category: 'cleaning',
  },
  {
    id: 'move-in-out',
    name: 'Move-In / Move-Out Clean',
    description: 'A fresh start or a clean handoff — done right.',
    iconName: 'Truck',
    category: 'cleaning',
  },
  {
    id: 'office-commercial',
    name: 'Office & Commercial Cleaning',
    description: 'Keep your workspace as fresh as your home. Custom quotes based on space size and frequency.',
    iconName: 'Building2',
    category: 'cleaning',
  },
  {
    id: 'upholstery-steam',
    name: 'Furniture & Upholstery Steam Cleaning',
    description: 'Deep, sanitizing steam clean for sofas, mattresses, and upholstered furniture.',
    iconName: 'Armchair',
    category: 'cleaning',
  },
  {
    id: 'pressure-washing',
    name: 'Pressure Washing',
    description: 'Refresh driveways, siding, decks, and more — restore the outside of your home.',
    iconName: 'Droplets',
    category: 'handyman',
  },
  {
    id: 'painting',
    name: 'Painting',
    description: 'Interior and exterior painting to bring new life to your space.',
    iconName: 'Paintbrush',
    category: 'handyman',
  },
  {
    id: 'handyman',
    name: 'Handyman & Home Improvement',
    description: 'From quick fixes to bigger projects, big or small, we do it all.',
    iconName: 'Wrench',
    category: 'handyman',
  },
] as const;

export const BOOKING_SERVICES = [
  'Residential Cleaning (Signature/Maintenance)',
  'Deep Clean',
  'Move-In / Move-Out Clean',
  'Office & Commercial Cleaning',
  'Furniture & Upholstery Steam Cleaning',
  'Pressure Washing',
  'Painting',
  'Handyman & Home Improvement',
  'Other / Custom',
] as const;

export const ADDONS = [
  { id: 'oven', label: 'Inside Oven', price: '$40' },
  { id: 'fridge', label: 'Inside Fridge', price: '$40' },
  { id: 'windows', label: 'Interior Windows', price: '$5–10 each' },
  { id: 'carpet', label: 'Carpet Shampooing', price: 'Custom quote' },
  { id: 'pet-hair', label: 'Pet Hair Removal', price: 'Custom quote' },
  { id: 'mattress', label: 'Mattress Steam Cleaning', price: 'Custom quote' },
  { id: 'custom', label: 'Custom Request', price: 'Custom quote' },
] as const;

export const REVIEWS = [
  {
    id: 1,
    author: 'Haley B.',
    text: 'This was my very first time ever having my house professionally cleaned, and I honestly couldn\'t have asked for a better experience. They didn\'t just clean, they truly cared.',
    stars: 5,
    featured: true,
  },
  {
    id: 2,
    author: 'Briana Hollis',
    text: 'We needed a move out clean before we closed on the sale of our home and Carolyn did a wonderful job!! Easy to book with and dependable. Would recommend to friends for sure!',
    stars: 5,
    featured: false,
  },
  {
    id: 3,
    author: 'Ang Ann',
    text: 'Carolyn and her \'crew\' did an amazing job cleaning for our new move in of our home! They cleaned from top to bottom and everything in between! Would definitely recommend them to anyone needing their place cleaned!',
    stars: 5,
    featured: false,
  },
] as const;

export const POLICIES = [
  {
    title: 'Booking & Deposits',
    content: 'A deposit is required to secure your appointment and is non-refundable. Appointments are confirmed once scheduled. Pricing is based on home size, cleaning type, and frequency.',
  },
  {
    title: 'Cancellation Policy',
    content: '48 hours notice is required for cancellations or reschedules. Cancellations within 48 hours forfeit the deposit. Same-day cancellations may incur a fee up to 25% of the service total (minimum $50). Repeated last-minute cancellations may result in termination of service.',
  },
  {
    title: 'Access to Your Home',
    content: 'Entry instructions must be provided before your appointment. A $50 lockout fee applies if we are unable to access the property at the scheduled time. A 10-minute wait time is allowed before the lockout fee applies.',
  },
  {
    title: 'Preparation',
    content: 'No preparation is required, but clients are encouraged to put away clothes (to avoid mixing clean and dirty items) and secure valuables before service.',
  },
  {
    title: 'Pet Policy',
    content: 'Pets are welcome, but aggressive or anxious pets must be secured during service. We are not responsible for pets escaping through open doors during active cleaning.',
  },
  {
    title: 'Additional Fees',
    content: 'Additional charges may apply for excessive buildup, biohazard conditions, pet waste, excessive clutter, heavy trash removal, or requested add-ons.',
  },
  {
    title: 'Safety & Respect',
    content: 'Harassment, inappropriate behavior, or unsafe conditions will result in immediate termination of service. We reserve the right to refuse or discontinue service at any time.',
  },
  {
    title: 'Payment',
    content: 'Payment is due upon completion. We accept cash, card, and other methods. A $10 late fee applies to balances past due.',
  },
] as const;
