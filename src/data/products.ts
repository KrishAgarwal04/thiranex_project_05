import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // === CATEGORY: ELECTRONICS (9 items) ===
  {
    id: 'prod_elec_001',
    name: 'AeroSound Pro ANC Wireless Headphones',
    brand: 'AeroSound',
    category: 'electronics',
    subcategory: 'audio',
    price: 14999,
    originalPrice: 19999,
    discount: 25,
    rating: 4.8,
    reviewCount: 1247,
    images: [
      'https://picsum.photos/seed/aerosound1/400/400',
      'https://picsum.photos/seed/aerosound2/400/400',
      'https://picsum.photos/seed/aerosound3/400/400'
    ],
    colors: ['#1a1a1a', '#f5f5f5', '#6366f1'],
    tags: ['bestseller', 'trending', 'noise-cancelling'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 42,
    description: 'Experience deep immersive sound with state-of-the-art hybrid active noise cancellation technology. These premium headphones offer up to 45 hours of continuous battery life on a single charge and feature lightweight cloud-like memory foam ear cushions. Equipped with custom-engineered 40mm dynamic drivers, they deliver rich bass and crystal-clear high frequencies.',
    features: [
      'Hybrid Active Noise Cancellation up to 38dB',
      'Up to 45 Hours Battery Life with Fast Charge',
      'Hi-Res Wireless Audio certified with LDAC support',
      'Multipoint Bluetooth connection to swap devices instantly',
      'Ergonomic collapsible design with soft cushions'
    ],
    specifications: {
      'Driver Size': '40mm Dynamic',
      'Bluetooth Version': 'v5.3',
      'Frequency Response': '20Hz - 40kHz',
      'Charging Port': 'USB Type-C',
      'Weight': '250g'
    },
    reviews: [
      { user: 'Rahul S.', rating: 5, text: 'Absolutely love these! The ANC blocks out my noisy office entirely. Sound profile is warm and balanced.', date: '2026-04-12', helpful: 45 },
      { user: 'Priya M.', rating: 4, text: 'Great sound and super comfortable. Battery life is stellar; I only charge once a week!', date: '2026-05-01', helpful: 18 }
    ],
    relatedIds: ['prod_elec_002', 'prod_elec_004'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year international warranty'
  },
  {
    id: 'prod_elec_002',
    name: 'VividWatch Series X Smartwatch',
    brand: 'Vivid',
    category: 'electronics',
    subcategory: 'wearables',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    rating: 4.4,
    reviewCount: 342,
    images: [
      'https://picsum.photos/seed/vividwatch1/400/400',
      'https://picsum.photos/seed/vividwatch2/400/400',
      'https://picsum.photos/seed/vividwatch3/400/400'
    ],
    colors: ['#1a1a1a', '#f43f5e', '#10b981'],
    tags: ['new', 'health-tracker', 'waterproof'],
    badge: 'New',
    inStock: true,
    stockCount: 15,
    description: 'Track your health parameters and stay seamlessly connected with the all-new VividWatch Series X. Designed with a stunning 1.85-inch always-on AMOLED display encased in durable aerospace-grade aluminum. It monitors multi-channel oxygen levels, real-time stress levels, and offers over 110 dynamic workout modes.',
    features: [
      'Always-on AMOLED TrueColor Display',
      'Continuous Pulse and Oxygen Monitoring',
      '5ATM Depth Waterproof for swimming track',
      'Integrated Dual-Band GPS for routing',
      '7-Day Stamina Battery Life'
    ],
    specifications: {
      'Display': '1.85-inch AMOLED',
      'Water Resistance': '5ATM (50 meters)',
      'Connectivity': 'Bluetooth 5.2 / GPS',
      'Sensor Pack': '6-axis Gyroscope, PPG Heart Rate, SpO2 sensor',
      'Strap Size': '22mm standard removable'
    },
    reviews: [
      { user: 'Aniket K.', rating: 5, text: 'Screen is bright even under strong midday sun. Highly accurate running tracks with GPS.', date: '2026-05-18', helpful: 12 },
      { user: 'Sonal T.', rating: 4, text: 'Beautiful layout and lightweight. The companion app maps all workout stats perfectly.', date: '2026-05-20', helpful: 6 }
    ],
    relatedIds: ['prod_elec_001', 'prod_elec_003'],
    isFeatured: true,
    isNew: true,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year limited warranty'
  },
  {
    id: 'prod_elec_003',
    name: 'VoltStream 100W GaN Fast Charger',
    brand: 'VoltCharger',
    category: 'electronics',
    subcategory: 'accessories',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.7,
    reviewCount: 938,
    images: [
      'https://picsum.photos/seed/voltgan1/400/400',
      'https://picsum.photos/seed/voltgan2/400/400'
    ],
    colors: ['#1a1a1a', '#f5f5f5'],
    tags: ['gan', 'fast-charge', 'compact'],
    badge: null,
    inStock: true,
    stockCount: 88,
    description: 'Power three devices simultaneously at lightning speeds with the ultra-efficient Gallium Nitride (GaN) fast charger. Delivering safe and stable 100W of total output through 3 versatile ports (2x USB-C and 1x USB-A). Its foldable heat-resistant prongs make it the ultimate ultra-compact travel companion.',
    features: [
      'Triple Port Output (2 Type-C, 1 Type-A)',
      'Next-generation Gallium Nitride security core',
      'Advanced smart temperature safety checking',
      'Wide compatibility with laptops, tablets, and phones',
      'Compact foldable desktop footprint design'
    ],
    specifications: {
      'Max Power Output': '100W',
      'Port Array': '2x USB-C, 1x USB-A',
      'Technology': 'GaN III Tech / PPS Support',
      'Input Voltage': '100-240V ~ 50/60Hz',
      'Protection Standard': 'Over-current, over-voltage, temperature protection'
    },
    reviews: [
      { user: 'Kunal G.', rating: 5, text: 'Charges my Pro laptop faster than the official brick! Stays remarkably cool during use.', date: '2026-02-14', helpful: 31 }
    ],
    relatedIds: ['prod_elec_002', 'prod_elec_005'],
    isFeatured: false,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day replacement policy',
    warranty: '2 year replacement warranty'
  },
  {
    id: 'prod_elec_004',
    name: 'SpectraLite Mechanical Gaming Keyboard',
    brand: 'SpectraX',
    category: 'electronics',
    subcategory: 'gaming',
    price: 4999,
    originalPrice: 6999,
    discount: 28,
    rating: 4.6,
    reviewCount: 512,
    images: [
      'https://picsum.photos/seed/rgbkeyboard1/400/400',
      'https://picsum.photos/seed/rgbkeyboard2/400/400'
    ],
    colors: ['#1a1a1a', '#ffffff'],
    tags: ['gaming', 'mechanical', 'rgb'],
    badge: 'Trending',
    inStock: true,
    stockCount: 19,
    description: 'Elevate your gaming metrics with surgical keystrokes on premium hot-swappable linear yellow switches. Featuring custom per-key addressable RGB lighting customizable with over 16 million dynamic color animations. The aircraft-grade solid aluminum frame offers unparalleled stability and a premium physical weight.',
    features: [
      'Hot-swappable Hotkeys Linear Mechanical Switches',
      'Per-Key custom addressable full spectrum RGB lighting',
      'Doubleshot keycaps that resist fading and grease',
      'Coiled custom interface braided USB-C cable',
      'Included ergonomic soft synthetic leather wrist pad'
    ],
    specifications: {
      'Form Factor': '75% TKL Layout',
      'Switch Type': 'Linear Yellow Switches (50g)',
      'Frame Build': 'Beaded-aluminum top casing',
      'Interface': 'Removable Braided USB Type-C',
      'Anti-Ghosting': '100% N-Key Rollover'
    },
    reviews: [
      { user: 'Vikram A.', rating: 5, text: 'Smooth, buttery typing experience. Swapped switches with ease. The visual illumination mode is outstanding.', date: '2026-04-20', helpful: 14 }
    ],
    relatedIds: ['prod_elec_001', 'prod_elec_005'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '10-day replacement',
    warranty: '1 year domestic warranty'
  },
  {
    id: 'prod_elec_005',
    name: 'Nexus 4K Ultra-Wide Curved Monitor',
    brand: 'NexusGrid',
    category: 'electronics',
    subcategory: 'displays',
    price: 34999,
    originalPrice: 42999,
    discount: 18,
    rating: 4.9,
    reviewCount: 187,
    images: [
      'https://picsum.photos/seed/curvedmonitor1/400/400',
      'https://picsum.photos/seed/curvedmonitor2/400/400'
    ],
    colors: ['#1a1a1a'],
    tags: ['4k', 'monitor', 'curved', 'professional'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 6,
    description: 'Redefine productivity and multitasking with this immersive 34-inch 1500R curved ultra-wide monitor. Displaying vibrant cinematic color reproduction with 99% sRGB coverage and ultra-crisp UHD 4K resolution. Equipped with advanced HDR400 capabilities to elevate details hidden in complex highlights and dark shadows.',
    features: [
      '34-Inch Curved Panel with 21:9 Cinema Screen Ratio',
      'Smooth 144Hz high refresh rate to eliminate tearing',
      '90W USB-C hub connectivity charging laptops directly',
      'TÜV Eye-care certification reducing blue-light',
      'Fully customizable heavy-duty lifting stand'
    ],
    specifications: {
      'Resolution': '3440 x 1440 UWQHD',
      'Panel Type': 'IPS Wide-View Panel',
      'Curvature Rating': '1500R Curved screen',
      'Refresh Speed': '144Hz',
      'Video Inputs': '2x HDMI 2.1, 1x DP 1.4, 1x Type-C interface'
    },
    reviews: [
      { user: 'Sanjay D.', rating: 5, text: 'Single type-C cable keeps my desk completely clutter-free! Extremely rich color display for design workflow.', date: '2026-03-30', helpful: 22 }
    ],
    relatedIds: ['prod_elec_004', 'prod_elec_003'],
    isFeatured: true,
    isNew: false,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '30-day replacement policy',
    warranty: '3 years warranty on display panel'
  },
  {
    id: 'prod_elec_006',
    name: 'SoundSphere Portable Bluetooth Speaker',
    brand: 'AeroSound',
    category: 'electronics',
    subcategory: 'audio',
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.5,
    reviewCount: 618,
    images: [
      'https://picsum.photos/seed/spherespeaker1/400/400',
      'https://picsum.photos/seed/spherespeaker2/400/400'
    ],
    colors: ['#2563eb', '#dc2626', '#16a34a'],
    tags: ['waterproof', 'portable', 'bass'],
    badge: 'Sale',
    inStock: true,
    stockCount: 22,
    description: 'Unleash powerful room-filling sound with the ultra-rugged, completely waterproof SoundSphere. Utilizing dual active bass radiators to pump deep vibrations and 24W of detailed multi-directional acoustic power. With the durable IP67 shell, it floats in water and withstands direct impacts during outdoor treks.',
    features: [
      'IP67 Dust and Waterproof rating for beach side use',
      '360-Degree Omnidirectional High-Fidelity acoustics',
      '24 Hours battery stamina backup with battery pack mode',
      'Stereo Pairing link to connect multiple speaker spheres',
      'Built-in conference voice microphone with noise-cancellation'
    ],
    specifications: {
      'Audio Power': '24W Stereo drivers',
      'Frequency Band': '60Hz - 20kHz',
      'Battery Rating': '5200mAh Built-in Li-ion',
      'Charging Time': '2.5 Hours via USB-PD',
      'Dust/Water Code': 'IP67 Certified'
    },
    reviews: [
      { user: 'Nisha R.', rating: 4, text: 'Extremely durable. Dropped it by the pool side multiple times and it works flawlessly. Deep pleasant bass.', date: '2026-05-15', helpful: 8 }
    ],
    relatedIds: ['prod_elec_001', 'prod_elec_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '1 year warranty'
  },
  {
    id: 'prod_elec_007',
    name: 'Helix Ergo Slim Wireless Mouse',
    brand: 'Helix',
    category: 'electronics',
    subcategory: 'accessories',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.3,
    reviewCount: 147,
    images: [
      'https://picsum.photos/seed/ergomouse1/400/400'
    ],
    colors: ['#1a1a1a', '#f5f5f5', '#db2777'],
    tags: ['mouse', 'wireless', 'ergonomic'],
    badge: null,
    inStock: true,
    stockCount: 50,
    description: 'Reduce wrist strain with this mathematically calculated ergonomic modern vertical wireless mouse. Featuring near-silent switches that eliminate clicked noise while providing tactile feedback. Highly versatile tracking sensors operate seamlessly even on transparent glass surfaces without needing pads.',
    features: [
      '57-Degree Ergonomic shape prevents muscle fatigue',
      'Switchable dual Bluetooth and 2.4GHz secure channels',
      'Precise 4000 DPI adjustable optical glide sensor',
      'Extended battery life lasting up to 12 months with one AA',
      'Three custom speed programmable shortcut thumb buttons'
    ],
    specifications: {
      'DPI Range': '400DPI to 4000DPI fully adjustable',
      'Wireless Range': '10 meters (33 feet)',
      'Total Buttons': '6 programmable clicking zones',
      'Product Material': 'Organic recycled soft plastic blend',
      'Weight': '95g'
    },
    reviews: [
      { user: 'Harish R.', rating: 5, text: 'No more wrist pain! Swells comfortably into the palm. Silent clicks are peaceful for nocturnal work.', date: '2026-06-03', helpful: 11 }
    ],
    relatedIds: ['prod_elec_003', 'prod_elec_004'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: '1 year limited replacement warranty'
  },
  {
    id: 'prod_elec_008',
    name: 'ProStream FHD WebCam with Light Ring',
    brand: 'ProStream',
    category: 'electronics',
    subcategory: 'streaming',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.5,
    reviewCount: 221,
    images: [
      'https://picsum.photos/seed/webcam1/400/400',
      'https://picsum.photos/seed/webcam2/400/400'
    ],
    colors: ['#1a1a1a'],
    tags: ['webcam', 'fhd', 'ringlight', 'work-from-home'],
    badge: 'Sale',
    inStock: true,
    stockCount: 34,
    description: 'Look stellar on video conference streams with the fully-integrated video ring light and Full HD camera. Recording auto-focused fluid 1080p footage at 60 frames per second. Includes dynamic light intensity adjustment settings to match your workspace ambient environment perfectly.',
    features: [
      'Crisp 1080p resolution at 30/60fps video capture',
      'Integrated circular multi-level warm halo ringlight',
      'Intelligent high-speed phase tracking focus matrix',
      'Dual stereo microphones capturing crisp acoustic signals',
      'Privacy protective mechanical focal toggle cover shutter'
    ],
    specifications: {
      'Resolution Support': '1080p Full HD / 720p HD',
      'Diagonal FOV': '82 degrees viewing field',
      'Ringlight Kelvin': '3000K to 5500K warm/daylight selection',
      'Connection Interface': 'High Speed USB 2.0 with 1.8m cable',
      'Tripod Mount': 'Standard 1/4-inch screw adapter option'
    },
    reviews: [
      { user: 'Tanya P.', rating: 4, text: 'The autofocus works super quick. The ring light saves me in my dimly lit study room!', date: '2026-04-18', helpful: 9 }
    ],
    relatedIds: ['prod_elec_003', 'prod_elec_007'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '1 year brand warranty'
  },
  {
    id: 'prod_elec_009',
    name: 'Maximus VR Pro Premium Headset',
    brand: 'NexusGrid',
    category: 'electronics',
    subcategory: 'gaming',
    price: 45999,
    originalPrice: 49999,
    discount: 8,
    rating: 4.8,
    reviewCount: 97,
    images: [
      'https://picsum.photos/seed/vrpro1/400/400',
      'https://picsum.photos/seed/vrpro2/400/400'
    ],
    colors: ['#1a1a1a', '#ffffff'],
    tags: ['vr', 'metaverse', 'gaming', 'high-tech'],
    badge: 'New',
    inStock: false,
    stockCount: 0,
    description: 'Step into seamless parallel realms with premium true-to-life 4K focal lenses and integrated spatial positional acoustics. No bulky wires required; is driven by a state-of-the-art native spatial graphics processor onboard. Its ultra-breathable soft mesh prevents foggy condensation building up during long sessions.',
    features: [
      'Cinematic dual-panel mini-LED displays with high contrast',
      'Onboard heavy-duty artificial intelligence tracking core',
      'Custom precise haptic feedback tracking handheld wands',
      'Inter-pupillary slider adjust tracking precise focus alignments',
      'High capacity lithium cells designed for up to 4 hours active play'
    ],
    specifications: {
      'Resolution Per Eye': '2160 x 2160 pixels',
      'Refresh Framerate': '90Hz / 120Hz support',
      'Processor': 'Custom Octa-Core Spatial SoC',
      'RAM Capacity': '12GB High-Speed Unified LPDDR5',
      'Tracking Cameras': '6 high speed visual position trackers'
    },
    reviews: [
      { user: 'Devendra J.', rating: 5, text: 'Out of this world tracking. Totally standalone with no lag. Truly the gold standard VR headset right now!', date: '2026-05-10', helpful: 41 }
    ],
    relatedIds: ['prod_elec_005', 'prod_elec_004'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year limited accidental coverage warranty'
  },

  // === CATEGORY: CLOTHING (9 items) ===
  {
    id: 'prod_clot_001',
    name: 'AeroDry Cotton Slim Fit Tee',
    brand: 'AeroTex',
    category: 'clothing',
    subcategory: 'menswear',
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.5,
    reviewCount: 3842,
    images: [
      'https://picsum.photos/seed/slimtee1/400/400',
      'https://picsum.photos/seed/slimtee2/400/400'
    ],
    colors: ['#1e3a8a', '#dc2626', '#111827', '#4b5563'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['bestseller', 'cotton', 'dailywear'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 150,
    description: 'Stay exceptionally breezy and comfortably relaxed with our premium 100% combed cotton jersey crew t-shirts. Tailored with reactive double-needle hem stitches to ensure structure survives heavy laundry cycles. Advanced AeroDry capillary fibers quickly wick sweat from the skin to maintain dynamic posture dryness.',
    features: [
      '100% Combed ringspun long-staple dense organic cotton',
      'Advanced breathable capillary knit structures',
      'Form-flattering flat collar lines that won\'t roll or sag',
      'Eco-friendly color-fast dyes tested against color bleeding',
      'Completely tagless neck support to prevent itching comfort'
    ],
    specifications: {
      'Material Composition': '100% Combed Organic Cotton (180 GSM)',
      'Fitting Profile': 'Modern Fitted Cut / Athletic fit',
      'Laundry Check': 'Cold machine wash, tumble dry low heat',
      'Stitching Standard': 'Double-needle flatlock seams'
    },
    reviews: [
      { user: 'Sumit G.', rating: 5, text: 'Amazing fit! It makes your shoulders look broad and has a solid thickness to it.', date: '2026-05-30', helpful: 84 },
      { user: 'Rohit P.', rating: 4, text: 'Soft and premium. Did not shrink at all on first machine laundry wash.', date: '2026-06-01', helpful: 41 }
    ],
    relatedIds: ['prod_clot_003', 'prod_clot_004'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_clot_002',
    name: 'ThermaCore Premium Fleece Hoodie',
    brand: 'AlpineGear',
    category: 'clothing',
    subcategory: 'outerwear',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    rating: 4.7,
    reviewCount: 893,
    images: [
      'https://picsum.photos/seed/hoodie1/400/400',
      'https://picsum.photos/seed/hoodie2/400/400'
    ],
    colors: ['#374151', '#1f2937', '#1e3a8a'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: ['winter', 'hoodie', 'cozy'],
    badge: 'Trending',
    inStock: true,
    stockCount: 45,
    description: 'Beat the elements and wrap up comfortable in our heavyweight thermal-lock fleece hooded sweater. Engineered with dense double-brushed cotton fleece that stores dry body heat and isolates icy breezes. Features thick custom utility drawstrings and a fleece-padded deep passport front pocket.',
    features: [
      'Ultra thermal shielding double-brushed cotton lining',
      'Deep three-panel comfort tracking toggle hood',
      'Elastic reinforced high rib waistband and cuffs',
      'Hidden passport-safe zipper compartment inside pocket',
      'Anti-pilling premium surface finish treatment'
    ],
    specifications: {
      'Weight Standard': '360 GSM Heavyweight Fleece',
      'Composition': '80% Premium Cotton, 20% Polyester',
      'Hood Details': 'Double layer hood with metallic grommet ties',
      'Fit Standard': 'Relaxed oversized comfort fit'
    },
    reviews: [
      { user: 'Manoj S.', rating: 5, text: 'Incredibly warm and thick. Truly heavy duty, worth every rupee.', date: '2026-04-05', helpful: 19 }
    ],
    relatedIds: ['prod_clot_001', 'prod_clot_008'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '6 months zipper repair warranty'
  },
  {
    id: 'prod_clot_003',
    name: 'Women’s FlexFit High-Waist Leggings',
    brand: 'AeroTex',
    category: 'clothing',
    subcategory: 'activewear',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.6,
    reviewCount: 1422,
    images: [
      'https://picsum.photos/seed/leggings1/400/400',
      'https://picsum.photos/seed/leggings2/400/400'
    ],
    colors: ['#000000', '#db2777', '#4f46e5'],
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['leggings', 'women', 'activewear', 'yoga'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 72,
    description: 'Power your gym limits with opaque four-way stretch interlock knit high-waist workout leggings. Fabricated with our signature zero-sag supportive waist belt that shapes posture with gentle compression. Features a completely squat-proof dense build with hidden smartphone hip side-pockets.',
    features: [
      'Squat-proof thick completely opaque microfiber knit',
      'Four-way elastane stretch layout moves dynamically',
      'Thick compression belly high waistband to stay secured',
      'Interlocking flatlock skin-safe seams prevent friction chafing',
      'Convenient double sided leg panel phone drop pockets'
    ],
    specifications: {
      'Composition': '78% Nylon Microfiber, 22% Pure Lycra Elastane',
      'Waist Design': '4.5-inch Double folded high compression waistband',
      'Length Standard': '28-inch Ankle length seam insole',
      'Opacity Rating': 'Grade 5 absolute opaque certification'
    },
    reviews: [
      { user: 'Deepa V.', rating: 5, text: 'Literally the best leggings I own now. Squat test proof, phone fits perfectly in side panel, band never rolls down!', date: '2026-05-12', helpful: 62 }
    ],
    relatedIds: ['prod_clot_001', 'prod_clot_005'],
    isFeatured: true,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_clot_004',
    name: 'Men’s Voyager Multi-Pocket Cargo Pants',
    brand: 'AlpineGear',
    category: 'clothing',
    subcategory: 'menswear',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.4,
    reviewCount: 228,
    images: [
      'https://picsum.photos/seed/cargo1/400/400',
      'https://picsum.photos/seed/cargo2/400/400'
    ],
    colors: ['#1b4332', '#4a4e69', '#1a1a1a'],
    sizes: ['30', '32', '34', '36'],
    tags: ['cargos', 'utility', 'menswear', 'rugged'],
    badge: 'New',
    inStock: true,
    stockCount: 24,
    description: 'Embark on dynamic rugged trails with triple-stitched heavy ripstop cotton utility cargo pants. Designed with multiple smart compartmental slots including specialized lockable velcro flap saddle pockets. Features integrated waist adjust buckles and heavy-duty ankle drawstring closures.',
    features: [
      'Extremely durable ripstop cotton grid wear weave protection',
      'Eight utility storage slots with easy-access flaps',
      'Reinforced double layers on knee panels to block wear',
      'Quick waist size adjustable solid slider brass buckles',
      'Adjustable ankle cuffs to easily tie above combat boots'
    ],
    specifications: {
      'Weave Pattern': 'Premium Combat Ripstop Grid Weave Cotton',
      'Total Pockets': '8 independent modular pockets',
      'Fly Closure': 'Heavy Duty solid locking brass zipper loop',
      'Weight Class': '280 GSM Heavy utility canvas weight'
    },
    reviews: [
      { user: 'Zayan K.', rating: 4, text: 'Awesome styling. Stitching is solid, holds heavy items securely in pocket without sag.', date: '2026-04-29', helpful: 7 }
    ],
    relatedIds: ['prod_clot_001', 'prod_clot_002'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_clot_005',
    name: 'Women’s Breeze Flow Linen Dress',
    brand: 'AeroTex',
    category: 'clothing',
    subcategory: 'womenswear',
    price: 2299,
    originalPrice: 2999,
    discount: 23,
    rating: 4.5,
    reviewCount: 167,
    images: [
      'https://picsum.photos/seed/linendress1/400/400',
      'https://picsum.photos/seed/linendress2/400/400'
    ],
    colors: ['#fef3c7', '#ec4899', '#06b6d4'],
    sizes: ['S', 'M', 'L'],
    tags: ['linen', 'womenswear', 'summer', 'dress'],
    badge: null,
    inStock: true,
    stockCount: 38,
    description: 'Float gracefully through dry summer afternoons with the airy comfort of organic flax-spun linen dresses. Features delicate self-adjust wrap belts and comfortable side concealed slide pockets. The pre-washed gentle weave drapes naturally into a relaxing silhouette outline.',
    features: [
      '100% Pure pre-shrunk organic European flax linen',
      'Relaxing breathable structure ideal for humid days',
      'Hidden deep pockets integrated along side hip seams',
      'Removable comfortable fabric belt loop adjustments',
      'Sustainable natural wooden button closures'
    ],
    specifications: {
      'Fiber Grade': 'Premium organic linen flax fibers',
      'Fit Design': 'Flowing relaxed classic silhouette',
      'Care Guide': 'Gentle wash cycle, hang dry recommended',
      'Dye Safety': 'Oeko-Tex Standard 100 safe toxic-free dyes'
    },
    reviews: [
      { user: 'Meera C.', rating: 5, text: 'Linen is so soft and thick. Usually linen is scratchy, but this one is buttery smooth! Love the deep pockets.', date: '2026-05-10', helpful: 14 }
    ],
    relatedIds: ['prod_clot_003', 'prod_clot_007'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_clot_006',
    name: 'ActiveDry Performance Running Shorts',
    brand: 'AeroTex',
    category: 'clothing',
    subcategory: 'activewear',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.4,
    reviewCount: 651,
    images: [
      'https://picsum.photos/seed/shorts1/400/400'
    ],
    colors: ['#111827', '#1e40af'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['shorts', 'running', 'activewear'],
    badge: 'Sale',
    inStock: true,
    stockCount: 89,
    description: 'Sprint your paths dynamically with featherweight high-ventilation running shorts with support inner linings. Equipped with ultra-quiet dry fabric and laser-perforated cool exhaust side vents. Built with secure anti-bounce horizontal rear zip key pocket.',
    features: [
      'High-stretch quick dry hybrid woven polyester panels',
      'Built-in supportive breathable mesh protection slip liner',
      'Laser-cut ventilation microexhausts along hot spots',
      'Anti-bounce back zipper horizontal slot for keys/cards',
      'Reflective luminous highlights for safety during night jogging'
    ],
    specifications: {
      'Inseam Length': '5-inch Standard lightweight split leg cut',
      'Material': '88% Recycled Polyester, 12% Elastane dual-weave',
      'Waist Drawcord': 'Drawstring running internally behind flat elastic',
      'Weight Rating': 'Extremely light 95g total weight'
    },
    reviews: [
      { user: 'Vicky K.', rating: 4, text: 'Fantastic split leg shorts. No chafing on long marathons. Rear zip holds keys securely.', date: '2026-06-11', helpful: 9 }
    ],
    relatedIds: ['prod_clot_001', 'prod_clot_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_clot_007',
    name: 'Women’s Silk-Blend Classic Camisole',
    brand: 'Elysian',
    category: 'clothing',
    subcategory: 'womenswear',
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.6,
    reviewCount: 312,
    images: [
      'https://picsum.photos/seed/camisole1/400/400',
      'https://picsum.photos/seed/camisole2/400/400'
    ],
    colors: ['#f5f5f5', '#1a1a1a', '#e0f2fe'],
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['silk', 'camisole', 'womenswear', 'innerwear'],
    badge: null,
    inStock: true,
    stockCount: 16,
    description: 'Indulge in absolute luxury with our premium mulberry silk-blend adjustable strapping camisole. Tailored with a deep elegant bias cut that drapes over curves with minimal cling factor. Features custom metal sliding buckles along straps for personalized adjustments and depth.',
    features: [
      'High index mulberry silk blended with breathable cooling viscose',
      'Elegant bias cut delivers comfortable natural draping shapes',
      'Fully adjustable fine micro shoulder spaghetti styling straps',
      'Flat invisible side stitch profiles enhance clean look under coats',
      'Highly skin friendly protein fibers prevent skin rashes'
    ],
    specifications: {
      'Materials Mix': '60% Grade A Mulberry Silk, 40% Viscose rayon blend',
      'Cleaning standard': 'Hand-wash only with pH neutral silk liquid shampoo',
      'Ironing factor': 'Low heat iron inside out from matte backing layer'
    },
    reviews: [
      { user: 'Ananya S.', rating: 5, text: 'Exquisite luster! Feels incredibly luxurious against original skin. Straps adjust smoothly.', date: '2026-05-24', helpful: 14 }
    ],
    relatedIds: ['prod_clot_005', 'prod_clot_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_clot_008',
    name: 'Men’s AeroLoft Waterproof Windbreaker',
    brand: 'AlpineGear',
    category: 'clothing',
    subcategory: 'outerwear',
    price: 3299,
    originalPrice: 4499,
    discount: 26,
    rating: 4.8,
    reviewCount: 154,
    images: [
      'https://picsum.photos/seed/windbreaker1/400/400',
      'https://picsum.photos/seed/windbreaker2/400/400'
    ],
    colors: ['#0f172a', '#0d9488'],
    sizes: ['M', 'L', 'XL'],
    tags: ['waterproof', 'windbreaker', 'outerwear', 'adventure'],
    badge: 'Trending',
    inStock: true,
    stockCount: 8,
    description: 'Brave heavy mountain rain and severe freezing winds in our premium layered breathable windbreaker jacket. Using advanced hydro-mesh laminate cores with fully heat-sealed utility zip tracks. Lightweight enough to easily compress and fold into its own internal mesh storage pockets.',
    features: [
      'Advanced waterproof rated laminate shield barrier skin',
      'High-breathability composite system prevents heavy sweating',
      'Fully taped waterproof seam tapes lining internal junctions',
      'Compact packable pocket allows quick folding compression',
      'Drawcord adjustable snug structural hood with visor rim'
    ],
    specifications: {
      'Waterproof Depth': '10,000 mm high rating safety',
      'Breathability score': '10,000 g/m²/24hr ratings',
      'Zipper standard': 'YKK Aquaguard water repellent zippers',
      'Weight': '290g superlight packed'
    },
    reviews: [
      { user: 'Bikram L.', rating: 5, text: 'Completely waterproof! Stood in a torrential downpour for 1 hour and came out completely bone dry.', date: '2026-05-02', helpful: 22 }
    ],
    relatedIds: ['prod_clot_002', 'prod_clot_004'],
    isFeatured: false,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year seam warranty'
  },
  {
    id: 'prod_clot_009',
    name: 'ComfortFit Unisex Terry Sweatpants',
    brand: 'AeroTex',
    category: 'clothing',
    subcategory: 'loungewear',
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.3,
    reviewCount: 541,
    images: [
      'https://picsum.photos/seed/sweatpants1/400/400'
    ],
    colors: ['#4b5563', '#9ca3af', '#111827'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['sweatpants', 'loungewear', 'cotton'],
    badge: null,
    inStock: false,
    stockCount: 0,
    description: 'Indulge in ultimate relaxation with sweatpants crafted in extra dense French terry loops. Features a heavy elasticated comfort waistband with integrated luxury brass metal capped drawstring tubes. Built with secure hidden zip compartments within wide left cargo drop panels.',
    features: [
      'Premium dense 100% Cotton French loops backing comfort',
      'Extra thick flat rib comfort panel waistband core',
      'Deep heavy cotton-lined slash hand drop pockets',
      'Concealed security zipper pocket for travel peace of mind',
      'Tapered relaxed outline ankle cuffs preserve heat'
    ],
    specifications: {
      'Material Composition': '100% Organic French Terry Cotton',
      'Weight Standard': '320 GSM Winter Lounge density',
      'Zip core': 'Concealed lightweight metal security slider'
    },
    reviews: [
      { user: 'Siddharth V.', rating: 4, text: 'Excellent sweatpants. Thick, heavyweight material that doesn\'t lose stretch in washing cycles.', date: '2026-06-08', helpful: 12 }
    ],
    relatedIds: ['prod_clot_001', 'prod_clot_002'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },

  // === CATEGORY: HOME & LIVING (9 items) ===
  {
    id: 'prod_home_001',
    name: 'AuraCloud Orthopedic Memory Foam Pillow',
    brand: 'AuraDream',
    category: 'home',
    subcategory: 'bedding',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.7,
    reviewCount: 1642,
    images: [
      'https://picsum.photos/seed/sleepillow1/400/400',
      'https://picsum.photos/seed/sleepillow2/400/400'
    ],
    colors: ['#ffffff'],
    tags: ['bestseller', 'pillow', 'orthopedic'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 52,
    description: 'Rejuvenate your sleepless cycles with advanced orthopedic dual-contour sleeping memory foam. Shaped dynamically to distribute skull weight and align your neck curvature to relieve tight shoulder stresses. Features a removable cover knitted with real cooling bamboo pulp textures.',
    features: [
      'Cervical contour shape realigns natural neck bone pathing',
      'Premium high-density slow-rebound thermal foam matrix',
      'Removable knitted bamboo fiber shell naturally resists dust',
      'Bilateral height profiles suitable for side or back sleep',
      'Dynamic cooling gel channel layers actively regulate head heat'
    ],
    specifications: {
      'Memory Core': '100% Polyurethane slow expansion contour gel foam',
      'Outer Cover': '40% Cooling Bamboo textiles, 60% Polyester fabric',
      'Dimensions': '60cm x 35cm x 11/9cm duo-wave profile',
      'Foam Density': 'High Index 50D orthopedic standard'
    },
    reviews: [
      { user: 'Arvinder S.', rating: 5, text: 'This single pillow solved 2 years of chronic back-neck tightness. Rebounds super slowly.', date: '2026-04-10', helpful: 121 },
      { user: 'Mousumi D.', rating: 4, text: 'Fits my neck curve smoothly. Bamboo casing feels cool to the touch all night.', date: '2026-05-15', helpful: 38 }
    ],
    relatedIds: ['prod_home_004', 'prod_home_007'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '30-day trial return policy',
    warranty: '2 year sagging assurance warranty'
  },
  {
    id: 'prod_home_002',
    name: 'BrewCraft Electric Cold Brew Maker',
    brand: 'BrewCraft',
    category: 'home',
    subcategory: 'kitchen',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.5,
    reviewCount: 389,
    images: [
      'https://picsum.photos/seed/coldbrew1/400/400',
      'https://picsum.photos/seed/coldbrew2/400/400'
    ],
    colors: ['#000000', '#f5f5f5'],
    tags: ['coffee', 'kitchen', 'coldbrew'],
    badge: 'Trending',
    inStock: true,
    stockCount: 16,
    description: 'Transform dark coffee grounds into delicious hyper-smooth concentrated cold brew liquid in just 15 minutes. Utilizing quick vacuum pressure suction to squeeze oils and reduce brewing cycles from 24 hours down. Fabricated with ultra-heavy food grade borosilicate glass containers.',
    features: [
      'Dynamic hyper-extraction speed cycles finish in 15 minutes',
      'Extremely dense stainless micro-mesh filters grounds away',
      'Premium borosilicate thermal-resistant thick glass',
      'Interactive control dial with Mild, Medium, and Bold levels',
      'Easy modular design for effortless washing cycles'
    ],
    specifications: {
      'Liquid Capacity': '1.2 Liter fluid volume size',
      'Electric Standard': 'DC 5V 1A adapter rating / Rechargeable cell',
      'Mesh Index': '300-count micro-perforated stainless filters',
      'Battery Rating': '1200mAh Li-ion battery (makes 12 brewing cycles)'
    },
    reviews: [
      { user: 'Viren N.', rating: 5, text: 'Remarkable. Highly concentrated cold brew without having to wait 24 hours in the fridge!', date: '2026-05-12', helpful: 24 }
    ],
    relatedIds: ['prod_home_005', 'prod_home_009'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year domestic repair warranty'
  },
  {
    id: 'prod_home_003',
    name: 'SereneMist Ultrasonic Oil Diffuser',
    brand: 'AuraDream',
    category: 'home',
    subcategory: 'decor',
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    rating: 4.4,
    reviewCount: 812,
    images: [
      'https://picsum.photos/seed/diffuser1/400/400',
      'https://picsum.photos/seed/diffuser2/400/400'
    ],
    colors: ['#d97706', '#f5f5f5'],
    tags: ['mist', 'diffuser', 'decor', 'spa'],
    badge: 'Sale',
    inStock: true,
    stockCount: 110,
    description: 'Turn drying workspaces into peaceful, mist-saturated healing spas with advanced sonic oil diffusers. Encased inside beautiful real eco-responsive pine wood outer wraps with custom ceramic hulls. Emits 7 delicate soothing color hues to set your specific relaxation state.',
    features: [
      '2.4MHz High-intensity ultrasonic plate atomization misting',
      '7 ambient LED breathing color transitions',
      'Intelligent automatic shut off sensor activated on dry water',
      'Near silent operation sound specs under 20dB limits',
      'Dual continuous/intermittent humidifying mist output modes'
    ],
    specifications: {
      'Water Tank': '300ml internal fluid tank',
      'Misting Duration': 'Up to 10 hours intermittent spray cycles',
      'Pulp wraps': 'Natural solid sustainable fir wood base',
      'Power interface': 'DC 24V charger adapter unit included'
    },
    reviews: [
      { user: 'Preeti G.', rating: 4, text: 'Delightful diffuse stream. Natural wood looks exceptionally beautiful on my desk, fits my room theme.', date: '2026-05-01', helpful: 14 }
    ],
    relatedIds: ['prod_home_001', 'prod_home_007'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '6 months replacement warranty'
  },
  {
    id: 'prod_home_004',
    name: 'LunaLux Smart LED Bedside Light',
    brand: 'LunaLux',
    category: 'home',
    subcategory: 'lighting',
    price: 2499,
    originalPrice: 2999,
    discount: 16,
    rating: 4.6,
    reviewCount: 433,
    images: [
      'https://picsum.photos/seed/smartlamp1/400/400',
      'https://picsum.photos/seed/smartlamp2/400/400'
    ],
    colors: ['#ffffff'],
    tags: ['lamp', 'smart-home', 'led'],
    badge: 'New',
    inStock: true,
    stockCount: 18,
    description: 'Set your evening sleeping modes with fine tactile touch sliding or customizable voice controls. Featuring a beautiful 360-degree cylindrical light tube emitting millions of smooth RGB gradient profiles. Includes built-in sleep timers that gradually dim light over 45 minutes.',
    features: [
      'Smooth integration with popular WiFi smart assistants',
      'Bilateral touch gliding strip controls luminosity seamlessly',
      'Rich multi-colored gradient modes emulate sunrises',
      'Soft flicker-free panel safe for reading directly',
      'Custom sleep schedules to trigger soothing fades'
    ],
    specifications: {
      'Luminous Rating': '450 Lumens adjustable spotlight core',
      'Kelvin scale': '1700K sunset yellow to 6500K bright white',
      'Wireless Tech': 'Wi-Fi 802.11 b/g/n @ 2.4GHz / Bluetooth 4.2',
      'Lifespan Rating': '25,000 continuous hours LED burn rating'
    },
    reviews: [
      { user: 'Karthik K.', rating: 5, text: 'Sunrise wakeup alarm feature is spectacular. Gradually illuminates my entire dark room. Very sleek.', date: '2026-05-15', helpful: 16 }
    ],
    relatedIds: ['prod_home_001', 'prod_home_003'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '1 year limited repair warranty'
  },
  {
    id: 'prod_home_005',
    name: 'CastIron Pro Pre-Seasoned Dutch Oven',
    brand: 'CastIronPro',
    category: 'home',
    subcategory: 'kitchen',
    price: 4999,
    originalPrice: 5999,
    discount: 16,
    rating: 4.9,
    reviewCount: 942,
    images: [
      'https://picsum.photos/seed/dutchoven1/400/400',
      'https://picsum.photos/seed/dutchoven2/400/400'
    ],
    colors: ['#dc2626', '#111827', '#0284c7'],
    tags: ['dutchoven', 'castiron', 'bestseller', 'cooking'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 12,
    description: 'Bake perfect artisanal sourdough and slow-cook meat dishes in our ultra-heavy pre-seasoned cast iron dutch oven. Coated with rich porcelain double-fired colored enamel resisting chipping and burning. Engineered with condensation return points underneath the heavy lid to dynamically lock moisture.',
    features: [
      'Extremely thick solid cast iron core locks heat for hours',
      'Two layers of professional porcelain colored enamel finishes',
      'Condensation dimples underneath self-baste food actively',
      'Sturdy heavy dual handles molded directly on chassis',
      'Safe for induction gas stovetops and ovens up to 260°C'
    ],
    specifications: {
      'Pot Capacity': '5.3 Liters (5.6 Quarts) size family pot',
      'Material thickness': '6mm Cast iron wall thickness',
      'Finish standard': 'Double-fired glass fusion enamel glaze',
      'Diameter Size': '26 cm inner frying rim circle'
    },
    reviews: [
      { user: 'Sheetal G.', rating: 5, text: 'This oven baked the most spectacular sourdough bread in my life! Beautiful glossy red color.', date: '2026-05-20', helpful: 43 }
    ],
    relatedIds: ['prod_home_002', 'prod_home_009'],
    isFeatured: true,
    isNew: false,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: 'Lifetime structural cast iron warranty'
  },
  {
    id: 'prod_home_006',
    name: 'AeroVac Smart Robotic Vacuum Cleaner',
    brand: 'NexusGrid',
    category: 'home',
    subcategory: 'cleaning',
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    rating: 4.6,
    reviewCount: 224,
    images: [
      'https://picsum.photos/seed/robotvac1/400/400',
      'https://picsum.photos/seed/robotvac2/400/400'
    ],
    colors: ['#1a1a1a', '#ffffff'],
    tags: ['robovac', 'cleaner', 'smart-home', 'trending'],
    badge: 'Trending',
    inStock: true,
    stockCount: 9,
    description: 'Keep your floors pristine without raising a finger with smart LiDAR-powered mapping vacuum robot cleaners. Packing up to 4000Pa of intense high velocity brush sweep suction that removes pet hair deep inside rugs. Clever obstacles-sensing algorithms guarantee zero tumbling down stairways.',
    features: [
      'LiDAR laser sweep mappings formulate real-time house layouts',
      'Intense 4000Pa brushless motor suction targets core dirt',
      'Dual-tank sweeping mop with micro-humidifying flow systems',
      'Automatic dock search and charging on low battery states',
      'Interactive mapping boundaries setup inside customized smartphone app'
    ],
    specifications: {
      'Max Suction': '4000Pa customizable pressure',
      'Battery Rating': '5200mAh high-density lithium storage cell',
      'Working Duration': 'Up to 150 minutes floor runtime output',
      'Dust bin space': '550 ml high capacity slide box'
    },
    reviews: [
      { user: 'Pranav M.', rating: 5, text: 'Easily navigates around chairs and mapping is incredibly accurate. Removes all golden retriever hairs daily!', date: '2026-04-18', helpful: 14 }
    ],
    relatedIds: ['prod_home_004', 'prod_home_002'],
    isFeatured: false,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year system electronics warranty'
  },
  {
    id: 'prod_home_007',
    name: 'CozyCraft Knit Handcrafted Ottoman pouf',
    brand: 'CozyCraft',
    category: 'home',
    subcategory: 'decor',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.2,
    reviewCount: 167,
    images: [
      'https://picsum.photos/seed/ottoman1/400/400'
    ],
    colors: ['#78350f', '#4b5563', '#d97706'],
    tags: ['furniture', 'pouffe', 'knit', 'cozy'],
    badge: null,
    inStock: true,
    stockCount: 14,
    description: 'Infuse relaxing organic hand-woven textures into living room decors with custom cotton cord ottoman pouffe. Filled internally with supportive dense eco-styrene bead cores that support heavy posture loads with ease. Serves wonderfully as flexible coffee table rests or foot stools.',
    features: [
      '100% Organic dense structural hand-knitted cotton rope jacket',
      'Eco-friendly polystyrene bead kernels maintain core puff profiles',
      'Breathable texture blend repels direct sweat skin sticking',
      'Featherweight profile allows quick moving single-handed relocation',
      'Versatile seating profiles or footrest properties'
    ],
    specifications: {
      'Rope material': 'Premium combed cotton multi-braided cables',
      'Size dimensions': '50cm Diameter x 35cm Height standard',
      'Weight capacity': 'Up to 110 kg resting compression load limits'
    },
    reviews: [
      { user: 'Aarati K.', rating: 4, text: 'Extremely snug. Use it as a footrest next to my favorite reading lounge chair.', date: '2026-05-15', helpful: 5 }
    ],
    relatedIds: ['prod_home_003', 'prod_home_001'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_home_008',
    name: 'Elysian Bamboo Fiber Bath Towel Pack',
    brand: 'Elysian',
    category: 'home',
    subcategory: 'bedding',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.7,
    reviewCount: 1120,
    images: [
      'https://picsum.photos/seed/towels1/400/400',
      'https://picsum.photos/seed/towels2/400/400'
    ],
    colors: ['#0d9488', '#ec4899', '#f5f5f5'],
    tags: ['towel', 'bamboo', 'soft', 'absorbent'],
    badge: 'Sale',
    inStock: true,
    stockCount: 75,
    description: 'Dry off in ultimate spa-grade luxury with organic bamboo-blend highly absorbent soft loop towels. Packing twice the moisture absorption speeds of standard Egyptian cotton fibers. Natural bamboo protein barriers resist mold growth and smell fresh even after repeated wet hanging cycles.',
    features: [
      'High absorption bamboo pulp fibers blended with long organic cotton',
      'Thick plush loops of high 600 GSM weight classification',
      'Naturally antibacterial composition resists smelly bathroom molds',
      'Secure double stitched hem barriers prevent thread fraying',
      'Extra soft textures completely safe for baby skin textures'
    ],
    specifications: {
      'Material Mix': '70% European Bamboo fiber, 30% Pure carded Cotton',
      'Density index': '600 GSM High bath plush weight class',
      'Towel Pack': 'Set of 2 standard long towels (70x140cm each)',
      'Certifications': 'OEKO-TEX Certified chemical safety guarantees'
    },
    reviews: [
      { user: 'Geeta R.', rating: 5, text: 'These towels are ridiculously soft! Absorbs water in a single pat and dries very quick.', date: '2026-05-09', helpful: 14 }
    ],
    relatedIds: ['prod_home_001', 'prod_home_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_home_009',
    name: 'Culinaria Pro Damascus Steel Knife Set',
    brand: 'BrewCraft',
    category: 'home',
    subcategory: 'kitchen',
    price: 14999,
    originalPrice: 17999,
    discount: 16,
    rating: 4.9,
    reviewCount: 124,
    images: [
      'https://picsum.photos/seed/knives1/400/400',
      'https://picsum.photos/seed/knives2/400/400'
    ],
    colors: ['#1a1a1a'],
    tags: ['kitchen', 'knives', 'damascus', 'professional'],
    badge: 'New',
    inStock: false,
    stockCount: 0,
    description: 'Craft culinary masterpieces with scalpel-like precision using handcrafted 67-layered Damascus steel kitchen knives. Forged meticulously around ultra-hard VG-10 steel cores with razor sharp 15-degree double bevel profiles. The comfortable moisture-sealed pakkawood handles ensure maximum agility control.',
    features: [
      '67 layers of folded high-carbon Damascus custom forged steel',
      'Ultra hard VG-10 Core achieves Rockwell Hardness rating of 60±2',
      'Razor-sharp 15-degree hand-polished double-edge bevels',
      'Ergonomic waterproof pinned Pakkawood handle weights',
      'Packed inside traditional luxury wooden display storage boxes'
    ],
    specifications: {
      'Blade steel': 'VG-10 core layered inside Damascus stainless steel',
      'Handle build': 'Authentic pinned sealed pakkawood construct',
      'Cook Set': '8" Chef Knife, 7" Santoku, 5" Utility Knife split'
    },
    reviews: [
      { user: 'Vikash K.', rating: 5, text: 'Literally slices tomatoes paper thin without applying any downward force! Absolute work of art.', date: '2026-05-01', helpful: 19 }
    ],
    relatedIds: ['prod_home_005', 'prod_home_002'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: 'Lifetime structural warranty'
  },

  // === CATEGORY: BOOKS (8 items) ===
  {
    id: 'prod_book_001',
    name: 'Sapiens: A Brief History of Humankind',
    brand: 'Harvill Secker',
    category: 'books',
    subcategory: 'nonfiction',
    price: 499,
    originalPrice: 599,
    discount: 17,
    rating: 4.8,
    reviewCount: 15842,
    images: [
      'https://picsum.photos/seed/sapiens1/400/400'
    ],
    colors: ['#d97706'],
    tags: ['bestseller', 'history', 'intellectual'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 210,
    description: 'Embark on a profound journey through evolutionary biological milestones that structured our human modern paradigms. Written eloquently by Dr. Yuval Noah Harari, exploring cognitive, agricultural, and scientific milestones. A highly refreshing intellectual read that challenges fundamental preconceptions of our history.',
    features: [
      'Explores the rise of humankind from tiny apes to absolute planetary rulers',
      'Explores how imaginary money systems and religions bind civilizations',
      'Highly engaging, accessible writing style with historical visual graphics',
      'Paperback edition with textured matte premium card boards cover',
      'Translated into over 65 languages globally with critical acclaim'
    ],
    specifications: {
      'Author Name': 'Yuval Noah Harari',
      'Format Model': 'Paperback Edition',
      'Total Pages': '512 printed pages',
      'Publisher standard': 'Harvill Secker (UK edition)',
      'Language': 'English standard'
    },
    reviews: [
      { user: 'Rakesh T.', rating: 5, text: 'This book completely blew my mind. Shifts how you look at modern capitalism and religions.', date: '2026-04-03', helpful: 240 },
      { user: 'Payal J.', rating: 5, text: 'Must read for everyone! Harari writes history with the pacing of an epic saga.', date: '2026-05-20', helpful: 104 }
    ],
    relatedIds: ['prod_book_003', 'prod_book_005'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_002',
    name: 'Atomic Habits: Tiny Changes, Remarkable Results',
    brand: 'Penguin',
    category: 'books',
    subcategory: 'self-help',
    price: 549,
    originalPrice: 799,
    discount: 31,
    rating: 4.9,
    reviewCount: 22412,
    images: [
      'https://picsum.photos/seed/habits1/400/400'
    ],
    colors: ['#ea580c'],
    tags: ['bestseller', 'self-help', 'productivity'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 162,
    description: 'Transform your daily productivity outputs using scientifically validated cue-response action loops. Author James Clear delivers highly practical framework matrices to break toxic behaviors and form powerful tiny routines easily. Discover how compounding 1% physical changes can yield massive lifecycle shifts.',
    features: [
      'Highly actionable 4 Laws of Behavior Change systems framework',
      'Filled with real life psychological Case Studies and diagrams',
      'Includes links to online printable Habit Tracker journals sheets',
      'Beautiful protective foil stamping text on hard covers base',
      'Globally recognized as the top modern guide on personal productivity'
    ],
    specifications: {
      'Author Name': 'James Clear',
      'Format Model': 'Premium Paperback',
      'Total Pages': '320 pages',
      'Publisher': 'Penguin Random House Group',
      'Language': 'English'
    },
    reviews: [
      { user: 'Prateek S.', rating: 5, text: 'Surgical and practical. No useless fluff. The cues system works immediately.', date: '2026-05-18', helpful: 187 }
    ],
    relatedIds: ['prod_book_001', 'prod_book_004'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_003',
    name: 'The Creative Act: A Way of Being',
    brand: 'Penguin Press',
    category: 'books',
    subcategory: 'art',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.7,
    reviewCount: 512,
    images: [
      'https://picsum.photos/seed/creativeact1/400/400'
    ],
    colors: ['#ffffff', '#000000'],
    tags: ['art', 'inspiration', 'creativity', 'philosophy'],
    badge: 'New',
    inStock: true,
    stockCount: 14,
    description: 'Awaken your inner artistic voice with meditative philosophy from legendary musical producer Rick Rubin. Capturing life as an ongoing creative project that requires deep listening and pure presence. Beautifully bound inside comfortable canvas board cover linings with dense thick stock papers.',
    features: [
      'Deep comforting artistic wisdom with Rick Rubin\'s voice',
      'Beautiful minimalist typographic layout with wide white spacing',
      'Hardcover cloth bindings make it excellent desk display art',
      '72 digestible essays focusing on unlocking creative mindsets',
      'Teaches how to remove artistic blocks and tune into original patterns'
    ],
    specifications: {
      'Author Name': 'Rick Rubin',
      'Format Model': 'Luxury Hardcover Fabric edition',
      'Total Pages': '432 pages',
      'Publisher': 'Penguin Press US',
      'Language': 'English'
    },
    reviews: [
      { user: 'Siddhant R.', rating: 5, text: 'Opening any random page gives you instant therapeutic creative space. Rick is a wizard.', date: '2026-05-10', helpful: 32 }
    ],
    relatedIds: ['prod_book_002', 'prod_book_006'],
    isFeatured: false,
    isNew: true,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_004',
    name: 'Deep Work: Rules for Focused Success',
    brand: 'Grand Central',
    category: 'books',
    subcategory: 'self-help',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.6,
    reviewCount: 3122,
    images: [
      'https://picsum.photos/seed/deepwork1/400/400'
    ],
    colors: ['#dc2626'],
    tags: ['productivity', 'self-help', 'focus'],
    badge: 'Trending',
    inStock: true,
    stockCount: 45,
    description: 'Master the rare art of distraction-free professional performance in an increasingly chaotic connected landscape. Written with critical analytical depth by computer science professor Cal Newport. Offers hard cognitive training frameworks to achieve deep brain flow states daily.',
    features: [
      'Provides systematic rules to train intense brain concentration strength',
      'Differentiates deep cognitive effort from shallow admin emails',
      'A must-read actionable manual for coders and writers alike',
      'Soft paperbound edition with readable high-contrast layout',
      'Includes Cal\'s personal modular deep schedule calendar templates'
    ],
    specifications: {
      'Author Name': 'Cal Newport',
      'Format Model': 'Paperback Book',
      'Total Pages': '304 pages',
      'Publisher': 'Grand Central Publishing',
      'Language': 'English'
    },
    reviews: [
      { user: 'Vivek M.', rating: 5, text: 'This book convinced me to delete social media entirely and my output is up 300%. Brilliant.', date: '2026-04-12', helpful: 54 }
    ],
    relatedIds: ['prod_book_002', 'prod_book_008'],
    isFeatured: false,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_005',
    name: 'Designing Data-Intensive Applications',
    brand: 'O’Reilly Media',
    category: 'books',
    subcategory: 'education',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.9,
    reviewCount: 842,
    images: [
      'https://picsum.photos/seed/ddia1/400/400'
    ],
    colors: ['#dc2626'],
    tags: ['tech', 'engineering', 'database', 'bestseller'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 19,
    description: 'The definitive architectural textbook for designing reliable, scalable, and maintainable modern software architectures. Authored by database expert Martin Kleppmann, diving deep inside replication, sharding, and distributed networks. An absolute absolute bible for software engineers, systems designers, and technical leads.',
    features: [
      'Dives deep into SQL vs NoSQL, indexes, storage engines parameters',
      'Deconstructs consensus, linearizability, and fault tolerance patterns',
      'Clear, detailed architectural layout diagrams with animal covers',
      'Thick durable paperback with high-grade acid-free printing stock',
      'Extremely high ratings amongst architectural Silicon Valley engineers'
    ],
    specifications: {
      'Author Name': 'Martin Kleppmann',
      'Format Model': 'O\'Reilly Tech Paperback',
      'Total Pages': '616 detailed pages',
      'Publisher': 'O\'Reilly Media Inc.',
      'Language': 'English'
    },
    reviews: [
      { user: 'Aditya S.', rating: 5, text: 'Worth ten times the price. Everything you need to crack principal engineer interviews is here.', date: '2026-05-22', helpful: 84 }
    ],
    relatedIds: ['prod_elec_005', 'prod_book_004'],
    isFeatured: true,
    isNew: false,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_006',
    name: 'Klara and the Sun',
    brand: 'Faber & Faber',
    category: 'books',
    subcategory: 'fiction',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.5,
    reviewCount: 1421,
    images: [
      'https://picsum.photos/seed/klara1/400/400'
    ],
    colors: ['#eab308'],
    tags: ['fiction', 'novel', 'scifi', 'nobel'],
    badge: null,
    inStock: true,
    stockCount: 32,
    description: 'Explore the profound definitions of the human soul through the synthetic eyes of Klara, an Artificial Friend. Written with delicate prose by Nobel Laureate Kazuo Ishiguro, exploring love and machine devotion. A deeply moving, haunting sci-fi novel about modern connections.',
    features: [
      'Written by Nobel Prize-winner author Kazuo Ishiguro',
      'Explores machine consciousness, child relationships, and loneliness',
      'Beautifully paced emotional literary narrative pacing',
      'Paperback edition with soft velvet surface coatings',
      'A deeply touching, memorable gift read'
    ],
    specifications: {
      'Author Name': 'Kazuo Ishiguro',
      'Format Model': 'Softcover Paperback',
      'Total Pages': '320 pages',
      'Publisher': 'Faber & Faber Publisher',
      'Language': 'English'
    },
    reviews: [
      { user: 'Smita P.', rating: 4, text: 'Heartbreakingly beautiful. Klara\'s unique worldview is naive yet incredibly profound.', date: '2026-03-30', helpful: 19 }
    ],
    relatedIds: ['prod_book_001', 'prod_book_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_007',
    name: 'The Psychology of Money',
    brand: 'Jaico Publishing',
    category: 'books',
    subcategory: 'finance',
    price: 329,
    originalPrice: 399,
    discount: 17,
    rating: 4.7,
    reviewCount: 8342,
    images: [
      'https://picsum.photos/seed/psychmoney1/400/400'
    ],
    colors: ['#0f172a'],
    tags: ['finance', 'investing', 'bestseller'],
    badge: 'Sale',
    inStock: true,
    stockCount: 180,
    description: 'Learn how your personal mental biases structure your financial wealth and investment milestones. Award-winning author Morgan Housel shares 19 short, highly digestible essays explaining compound metrics and human greed. A timeless manual detailing that behavior matters more than complex corporate math.',
    features: [
      '19 short illustrative tales detailing investor psychology',
      'Teaches how to focus on staying wealthy rather than getting rich',
      'Clear conversational prose easy to read in single sittings',
      'High-grade paper stock binding layout',
      'Lailed in top global books lists'
    ],
    specifications: {
      'Author Name': 'Morgan Housel',
      'Format Model': 'Paperback Edition',
      'Total Pages': '252 pages',
      'Publisher': 'Jaico Publishing House',
      'Language': 'English'
    },
    reviews: [
      { user: 'Rohan N.', rating: 5, text: 'This book literally saved my stock portfolio from panic selling. Best personal finance book out there.', date: '2026-05-15', helpful: 62 }
    ],
    relatedIds: ['prod_book_002', 'prod_book_001'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_book_008',
    name: 'Zero to One: Notes on Startups',
    brand: 'Crown Business',
    category: 'books',
    subcategory: 'business',
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.6,
    reviewCount: 4322,
    images: [
      'https://picsum.photos/seed/zerotoone1/400/400'
    ],
    colors: ['#3b82f6'],
    tags: ['startup', 'business', 'tech'],
    badge: null,
    inStock: false,
    stockCount: 0,
    description: 'Deconstruct startup parameters to build monopolies that form totally new futuristic horizons. Authored by legendary investor and PayPal co-founder Peter Thiel, exploring computational leaps. Teaches why copying carbon blueprints results in stagnation from one to n.',
    features: [
      'Explores Thiel\'s controversial yet brilliant monopoly business models',
      'Deeply analytical essays on technology advances and human futures',
      'Highly engaging, concise paperback layout configuration',
      'Filled with historical venture building case reviews',
      'A core reading guide in Stanford business programs'
    ],
    specifications: {
      'Author Name': 'Peter Thiel with Blake Masters',
      'Format Model': 'Standard Paperback',
      'Total Pages': '224 pages',
      'Publisher': 'Crown Business Group NY',
      'Language': 'English'
    },
    reviews: [
      { user: 'Nitesh S.', rating: 5, text: 'Challenging and contrarian. Must read for anyone trying to build something original.', date: '2026-04-20', helpful: 29 }
    ],
    relatedIds: ['prod_book_002', 'prod_book_004'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },

  // === CATEGORY: SPORTS (8 items) ===
  {
    id: 'prod_spor_001',
    name: 'Apex Carbon-Fiber Badminton Racket',
    brand: 'ApexFit',
    category: 'sports',
    subcategory: 'racquets',
    price: 4999,
    originalPrice: 6999,
    discount: 28,
    rating: 4.7,
    reviewCount: 512,
    images: [
      'https://picsum.photos/seed/racket1/400/400',
      'https://picsum.photos/seed/racket2/400/400'
    ],
    colors: ['#dc2626', '#d97706', '#0284c7'],
    tags: ['badminton', 'racket', 'carbon-fiber', 'bestseller'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 22,
    description: 'Unleash devastating smash metrics with our ultra-lightweight high-modulus Japanese nanocarbon racket frame. Engineered with isometric head loops that elevate the sweet spot area by 32%. Ships fully pre-strung with high-tension professional gut fibers for optimum control.',
    features: [
      '100% High modulus Japanese carbon graphite weave frame',
      'Lightweight high-speed 4U configuration structure (82g)',
      'Isometric box loop frame expands dynamic sweet spot matrix',
      'High density shock absorbent grip tape wraps core handle',
      'Fully padded full-length zippered water-resistant carrying case'
    ],
    specifications: {
      'Frame Weight': '4U (80-84 grams) ultra-light',
      'String Tension': '26-28 lbs pre-strung professional rating',
      'Flex Index': 'Medium flexible recovery rating',
      'Length Standard': '675mm Olympic regulation size'
    },
    reviews: [
      { user: 'Ashok Y.', rating: 5, text: 'Insanely fast defense swings. The smash power is incredible with 28lbs tension!', date: '2026-05-18', helpful: 21 },
      { user: 'Riya D.', rating: 4, text: 'Very light weight, reduces wrist strain. Grid cover case looks very premium.', date: '2026-06-02', helpful: 8 }
    ],
    relatedIds: ['prod_spor_003', 'prod_spor_004'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '6 months frame cracking replacement warranty'
  },
  {
    id: 'prod_spor_002',
    name: 'ThermaCap Dynamic 1L Hydro Flask',
    brand: 'ApexFit',
    category: 'sports',
    subcategory: 'accessories',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.6,
    reviewCount: 3122,
    images: [
      'https://picsum.photos/seed/hydroflask1/400/400',
      'https://picsum.photos/seed/hydroflask2/400/400'
    ],
    colors: ['#0f172a', '#ea580c', '#06b6d4'],
    tags: ['flask', 'insulated', 'bestseller'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 120,
    description: 'Keep your hydration ice-cold for up to 24 hours or piping hot for 12 hours with vacuum-insulated flasks. Constructed with double-walled 18/8 food-grade professional stainless steel preventing metallic flavors. Finished with highly-durable powder protective coat resisting drops scratches.',
    features: [
      'Advanced double-wall copper plated vacuum cold isolation',
      'Premium 18/8 kitchen grade pro-stainless steel shell',
      'Sweat-proof premium rough color powder coating grip',
      'Completely leak-proof cap loop with flexible swing handle',
      'Wide mouth size accommodates thick cooling ice cubes'
    ],
    specifications: {
      'Total Capacity': '1000 ml (1 Liter size)',
      'Thermal Hold': '24 Hours cold lock / 12 Hours warming cap',
      'Product Material': 'Food-Grade 18/8 Stainless, BPA-free polymer',
      'Weight Standard': '380g empty'
    },
    reviews: [
      { user: 'Samir C.', rating: 5, text: 'Stood on hot car dashboard all afternoon and water came out literally ice cold! Solid build.', date: '2026-05-12', helpful: 43 }
    ],
    relatedIds: ['prod_spor_001', 'prod_spor_005'],
    isFeatured: true,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: 'Lifetime thermal performance insulation warranty'
  },
  {
    id: 'prod_spor_003',
    name: 'ProGrip Anti-Slip TPE Yoga Mat',
    brand: 'Ananda',
    category: 'sports',
    subcategory: 'fitness',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.5,
    reviewCount: 841,
    images: [
      'https://picsum.photos/seed/yogamat1/400/400'
    ],
    colors: ['#0d9488', '#db2777', '#4b5563'],
    tags: ['yoga', 'fitness', 'eco-friendly'],
    badge: 'Sale',
    inStock: true,
    stockCount: 48,
    description: 'Perfect your balance and yoga poses with high-density eco-safe non-slip TPE mats. Cushioned with 6mm comfort foam structures to protect knees and elbows against hard floors. Includes double textured designs featuring alignment laser lines for perfect spinal positioning.',
    features: [
      '100% Non-toxic biodegradable thermal plastic rubber (TPE)',
      '6mm Optimally calculated safety posture cushioning index',
      'Bilateral anti-slip textured grip profiles block slider slides',
      'Laser engraved posture visual alignment system tracks positioning',
      'Lightweight water-repellent structures wash clean with soap'
    ],
    specifications: {
      'Mat thickness': '6mm comfort protection padding',
      'Size surface': '183cm length x 61cm wide surface',
      'Material standard': 'Eco-TPE (heavy metals free, hypoallergenic)',
      'Carry straps': 'Included premium woven elastic travel straps'
    },
    reviews: [
      { user: 'Kiran D.', rating: 5, text: 'No sliding during hot intense yoga sessions. Alignment hashes are super helpful for hands.', date: '2026-05-30', helpful: 14 }
    ],
    relatedIds: ['prod_spor_001', 'prod_clot_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '1 year foam tear-out warranty'
  },
  {
    id: 'prod_spor_004',
    name: 'Apex Heavy-Duty Adjustable Dumbbell',
    brand: 'ApexFit',
    category: 'sports',
    subcategory: 'weights',
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    rating: 4.8,
    reviewCount: 192,
    images: [
      'https://picsum.photos/seed/dumbbells1/400/400',
      'https://picsum.photos/seed/dumbbells2/400/400'
    ],
    colors: ['#111827'],
    tags: ['weights', 'fitness', 'dumbbell', 'new'],
    badge: 'New',
    inStock: true,
    stockCount: 8,
    description: 'Declutter your home workout spaces using variable sliding dial lockable heavy adjustable dumbbells. Replaces 15 independent dumbbell scales within a single compact composite system (ranging from 2.5kg to 24kg). Engineered with ultra-secure safety locking levers ensuring plates stay secured.',
    features: [
      'Intuitive dialing turn settings change weight ranges instantly',
      'Consolidates 15 heavy free weight brackets inside single frames',
      'Durable thermoplastic-coated heavy solid iron plates prevents clattering',
      'Ergonomic ribbed chrome handle prevents slips under sweat',
      'Includes impact proof plastic safety storage dock tray'
    ],
    specifications: {
      'Weight Range': '2.5 kg to 24 kg fully adjustable settings',
      'Weight Steps': '15 distinct increments (2.5, 3.5, 4.5... etc.)',
      'Material index': 'Synthetic coated cast iron weight plates',
      'Unit count': 'Sold as a Single heavy dumbbell system base'
    },
    reviews: [
      { user: 'Tarun G.', rating: 5, text: 'Adjusts buttery smooth. Saves so much space in my tiny modern apartment flat!', date: '2026-05-02', helpful: 22 }
    ],
    relatedIds: ['prod_spor_001', 'prod_spor_002'],
    isFeatured: false,
    isNew: true,
    isTrending: true,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '2 year mechanical gear warranty'
  },
  {
    id: 'prod_spor_005',
    name: 'TrailBlazer Carbon Trekking Poles',
    brand: 'AlpineGear',
    category: 'sports',
    subcategory: 'trekking',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.6,
    reviewCount: 114,
    images: [
      'https://picsum.photos/seed/hikingpoles1/400/400'
    ],
    colors: ['#111827', '#0284c7'],
    tags: ['hiking', 'trekking', 'adventure', 'carbon'],
    badge: 'Trending',
    inStock: true,
    stockCount: 15,
    description: 'Stabilize your mountain trekking ascents with extremely lightweight telescopic carbon fiber trail poles. Packing powerful quick-flip locking levers details that alter length ranges in seconds. Gripped with ergonomic moisture-absorbing real cork handles that prevent blister formations.',
    features: [
      '100% Lightweight high tensile carbon fiber shaft sections',
      'Ultra-reliable solid metal dual flip-locks stay locked',
      'Comfortable ergonomic sweat-absorbing real cork handles',
      'Removable mud/snow plastic guide rings and tungsten tip spikes',
      'Packed as a Set of 2 poles with protective travel mesh bag'
    ],
    specifications: {
      'Adjustable Size': '62 cm fully retracted to 135 cm maximum extension',
      'Shaft Material': '100% Multi-layered carbon fiber tubing systems',
      'Each Pole Weight': '210 grams superlight',
      'Lock standard': 'Anodized aluminum flip Lever action locks'
    },
    reviews: [
      { user: 'Dheeraj R.', rating: 5, text: 'Hiked up Himalayas trail for 12 days and these saved my joints! Real cork handles absorb sweat flawlessly.', date: '2026-04-28', helpful: 14 }
    ],
    relatedIds: ['prod_clot_008', 'prod_spor_002'],
    isFeatured: false,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '1 year structural shaft warranty'
  },
  {
    id: 'prod_spor_006',
    name: 'SpeedJump Weighted Digital Speed Rope',
    brand: 'ApexFit',
    category: 'sports',
    subcategory: 'fitness',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.4,
    reviewCount: 421,
    images: [
      'https://picsum.photos/seed/jumprope1/400/400'
    ],
    colors: ['#111827', '#e11d48'],
    tags: ['fitness', 'jumprope', 'cardio'],
    badge: 'Sale',
    inStock: true,
    stockCount: 64,
    description: 'Max out your cardiovascular workouts with digital jump count tracking and calorie sensors. Built with precision high speed industrial ball bearings ensuring smooth silent 360-degree rotation. Custom weighted removable block tubes inside ergonomic anti-slip grip sleeves.',
    features: [
      'Luminous digital screen count tracks jumps metrics and burn calories',
      'Premium high-speed ball bearings avoid cord twisting knots',
      'Durable thick steel core cable encased safe behind protective vinyl jacket',
      'Removable handle weights to scale dynamic cardio fatigue profiles',
      'Fully adjustable cable lengths requiring zero clipping accessories'
    ],
    specifications: {
      'Cable Dimension': '3 Meters standard length, 4.5mm thick core',
      'Bearings index': 'Double high performance steel rotation balls',
      'Battery Power': 'Single CR2032 cells (gives 1 year average usage)'
    },
    reviews: [
      { user: 'Harshal T.', rating: 4, text: 'Awesome digital display. Counter matches actual skip rotations with 100% accuracy.', date: '2026-06-08', helpful: 4 }
    ],
    relatedIds: ['prod_spor_003', 'prod_spor_002'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '30-day return policy',
    warranty: '1 year brand warranty'
  },
  {
    id: 'prod_spor_007',
    name: 'Apex Dynamic Soccer Match Ball',
    brand: 'ApexFit',
    category: 'sports',
    subcategory: 'soccer',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.5,
    reviewCount: 221,
    images: [
      'https://picsum.photos/seed/soccerball1/400/400'
    ],
    colors: ['#ffffff', '#000000'],
    tags: ['soccer', 'football', 'sports'],
    badge: null,
    inStock: true,
    stockCount: 30,
    description: 'Kick straight aerodynamically stable curves with professional grade thermal bonded match footballs. Crafted with premium textured leather panels preventing moisture absorption in wet weather playing. Double security butyl air bladder ensures retention of pressure for weeks.',
    features: [
      'Thermal bonded seamless panels eradicate moisture absorption lines',
      'Vibrant high contrast color graphics track rotating velocities',
      'Textured synthetic leather outer layer optimizes shoot controls',
      'Butyl interior bladder preserves perfect spherical shapes longer',
      'FIFA Quality Pro tournament standard structural specifications'
    ],
    specifications: {
      'Ball Size': 'Size 5 Standard Match size',
      'Construction type': 'Thermal fusion bonding (zero stitching lanes)',
      'Panel Count': '32 specialized speed panel structures',
      'Core pressure': '8.5 - 11.5 psi standard playing compression'
    },
    reviews: [
      { user: 'Abhishek J.', rating: 5, text: 'Outstanding flight stability. Curve shoots are clean and ball doesn\'t get heavy in wet grass grids.', date: '2026-04-18', helpful: 11 }
    ],
    relatedIds: ['prod_spor_001', 'prod_spor_002'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day replacement policy',
    warranty: '1 year shape retention guarantee'
  },
  {
    id: 'prod_spor_008',
    name: 'TrailCore Outdoor Camping Dome Tent',
    brand: 'AlpineGear',
    category: 'sports',
    subcategory: 'camping',
    price: 6999,
    originalPrice: 8999,
    discount: 22,
    rating: 4.7,
    reviewCount: 88,
    images: [
      'https://picsum.photos/seed/dometent1/400/400',
      'https://picsum.photos/seed/dometent2/400/400'
    ],
    colors: ['#16a34a', '#d97706'],
    tags: ['camping', 'outdoor', 'tent', 'new'],
    badge: 'New',
    inStock: false,
    stockCount: 0,
    description: 'Pitch instant wilderness shelters with high durability 3-person double-layered dome tents. Engineered with rain-resistant polyurethane coatings and heavy-duty taped seams. Features easy-setup fiberglass support poles and breezy high-density mosquito mesh inner vents.',
    features: [
      'Double roof layers prevent condensation raindrops build up',
      'Waterproof rated polyester fly prevents severe weather leaks',
      'Durable fiberglass umbrella tension frame structures set up fast',
      'Bilateral entry arches provide clean flow and ventilation',
      'Concealed storage pouches inside keeping travel accessories organized'
    ],
    specifications: {
      'Total Capacity': '3 Person comfortable spacing',
      'Water resistant': '3000 mm PU coating protection indexes',
      'Size dimensions': '210cm x 180cm x 130cm height profiles',
      'Weight': '3.2 kg including anchors and rods set'
    },
    reviews: [
      { user: 'Kunal P.', rating: 5, text: 'Extremely easy to setup alone. Held up beautifully against aggressive mountain wind and overnight dew!', date: '2026-04-30', helpful: 12 }
    ],
    relatedIds: ['prod_spor_005', 'prod_clot_008'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'free',
    returnPolicy: '30-day return policy',
    warranty: '1 year structural warranty'
  },

  // === CATEGORY: BEAUTY (8 items) ===
  {
    id: 'prod_beau_001',
    name: 'GlowHydra Vitamin C Facial Serum',
    brand: 'Elysian',
    category: 'beauty',
    subcategory: 'skincare',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.6,
    reviewCount: 3841,
    images: [
      'https://picsum.photos/seed/facialserum1/400/400',
      'https://picsum.photos/seed/facialserum2/400/400'
    ],
    colors: ['#ea580c'],
    tags: ['serum', 'skincare', 'glow', 'bestseller'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 140,
    description: 'Brighten up aging dull skin profiles and accelerate collagen health with advanced stable Vitamin C face serums. Blended with skin-soothing Pure Hyaluronic acid molecules and Vitamin E oil extracts. Highly penetrating lightweight formulas that erase dark spots without leaving behind sticky remnants.',
    features: [
      '15% Optimal koncentration stable Vitamin C (Ascorbic acid Active)',
      'Hyaluronic acid base locks instant rich water molecules skin-deep',
      'Contains organic Kakadu Plum and Citrus natural extracts',
      'Completely free from parabens, mineral oils and synthetic dyes',
      'Cruelty-free dermatologically validated non-comedogenic formula'
    ],
    specifications: {
      'Fluid volume': '30 ml glass dropper bottle packaging',
      'Skin Compatibility': 'Suitable for All Skin Profiles / Sensitive safe',
      'Application Index': 'Morning application with dynamic SPF layering'
    },
    reviews: [
      { user: 'Sneh L.', rating: 5, text: 'Visibly reduced acne scarring and dark circles within 3 weeks of daily use! Not sticky.', date: '2026-05-18', helpful: 140 },
      { user: 'Divya T.', rating: 4, text: 'Leaves a healthy hydration glow. Smells clean of original orange extracts too.', date: '2026-06-02', helpful: 45 }
    ],
    relatedIds: ['prod_beau_003', 'prod_beau_005'],
    isFeatured: true,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day replacement policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_beau_002',
    name: 'KeratinRestore Argan Oil Hair Mask',
    brand: 'Elysian',
    category: 'beauty',
    subcategory: 'haircare',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.7,
    reviewCount: 1421,
    images: [
      'https://picsum.photos/seed/hairmask1/400/400',
      'https://picsum.photos/seed/hairmask2/400/400'
    ],
    colors: ['#ea580c'],
    tags: ['haircare', 'mask', 'argan', 'bestseller'],
    badge: 'Best Seller',
    inStock: true,
    stockCount: 41,
    description: 'Hydrate dry, frizzy hair shafts back into healthy silky lusters with deep conditioning Keratin restore systems. Blended with cold-pressed Moroccan Argan oils and organic sweet almond milk extracts. Rejuvenates split ends and seals cuticle envelopes against heating styling iron damage.',
    features: [
      'Infused with raw cold-pressed organic Moroccan Argan oil',
      'Concentrated micro-keratin proteins restore split ends',
      'Provides intense humidity shielding friction defense blocks',
      'Highly safe for color dyed chemically straightened hairs',
      'Rich, velvety creamy texture coats hair strands easily'
    ],
    specifications: {
      'Tub Capacity': '200 gram wide mouth jar size',
      'Free from': 'Strictly Free of sulfates, phthalates, parabens',
      'Processing time': '5 - 10 minutes leave-in conditioning recommendation'
    },
    reviews: [
      { user: 'Nisha S.', rating: 5, text: 'Saved my heavily bleached salon hair strands! Soft and smooth like silk now.', date: '2026-05-30', helpful: 41 }
    ],
    relatedIds: ['prod_beau_001', 'prod_beau_004'],
    isFeatured: true,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_beau_003',
    name: 'Acoustic-Vibe Jade Roller & Gua Sha Set',
    brand: 'Ananda',
    category: 'beauty',
    subcategory: 'tools',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.4,
    reviewCount: 382,
    images: [
      'https://picsum.photos/seed/stoneset1/400/400'
    ],
    colors: ['#10b981'],
    tags: ['skincare', 'face-roller', 'guasha', 'spa'],
    badge: 'Trending',
    inStock: true,
    stockCount: 88,
    description: 'Promote cellular lymphatic drainage and tone face muscles using 100% authentic real Himalayan jade massage stones. Features a strong integrated iron core structure eliminating irritating squeaking friction noises. Reduces puffiness and enhances jawline contour shapes effortlessly.',
    features: [
      '100% Genuine, natural cold-feeling Himalayan Jade stones construct',
      'Silent Glide silicone bracket structures eradicate squeaking clicking',
      'Ergonomic multi-angle Gua Sha card shapes face muscle paths',
      'Maintains cool temperature properties naturally to tighten pores',
      'Delivered inside velvet lining padded safe-box containers'
    ],
    specifications: {
      'Stone Type': 'Premium standard real natural stone Jadeites',
      'Craft technique': 'Individually hand carved and highly polished surfaces',
      'Grip handle': 'Reinforced zinc alloy solid anti-corrosive gold core'
    },
    reviews: [
      { user: 'Pooja R.', rating: 5, text: 'Very soothing, especially when stored in the fridge overnight! Reduced my morning face puffiness instantly.', date: '2026-05-12', helpful: 12 }
    ],
    relatedIds: ['prod_beau_001', 'prod_beau_008'],
    isFeatured: false,
    isNew: false,
    isTrending: true,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: '3 months metal joints breakage warranty'
  },
  {
    id: 'prod_beau_004',
    name: 'Bio-Satin Tea Tree Acne Face Wash',
    brand: 'Elysian',
    category: 'beauty',
    subcategory: 'skincare',
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.5,
    reviewCount: 924,
    images: [
      'https://picsum.photos/seed/facewash1/400/400'
    ],
    colors: ['#16a34a'],
    tags: ['skincare', 'cleanser', 'teatree', 'acne'],
    badge: 'Sale',
    inStock: true,
    stockCount: 112,
    description: 'Gently clarify stubborn sebum pores and calm red skin breakouts with natural organic Australian tea tree oils. Enhanced with skin exfoliant salicylic acids (BHA) to deeply clean debris and block future blackheads. Cleanses deeply without stripping outer hydration skins.',
    features: [
      'Pure organic steam-extracted tea tree oil base',
      '1% Salicylic Acid helps dissolve sub-pore blockages',
      'Contains organic Aloe-vera extracts to pacify dry itchiness',
      'Sulfate free non-foaming formula preserves epidermal moisture barriers',
      'Ideal cooling gel profile suited for oily/acne-prone skin profiles'
    ],
    specifications: {
      'Bottle Capacity': '150 ml bottle with security pump lock',
      'pH Stability': 'Skin optimal balanced pH of 5.5',
      'Dermatology check': 'Validated strictly by cosmetic skin panels'
    },
    reviews: [
      { user: 'Dinesh S.', rating: 4, text: 'Awesome cleanser. Dries up active whiteheads super quick and doesn\'t make face dry.', date: '2026-06-01', helpful: 19 }
    ],
    relatedIds: ['prod_beau_001', 'prod_beau_005'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_beau_005',
    name: 'Elysian Matte Lip Satin Liquid Duo',
    brand: 'Elysian',
    category: 'beauty',
    subcategory: 'makeup',
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.6,
    reviewCount: 412,
    images: [
      'https://picsum.photos/seed/lipduo1/400/400',
      'https://picsum.photos/seed/lipduo2/400/400'
    ],
    colors: ['#dc2626', '#b91c1c', '#be185d'],
    tags: ['makeup', 'lipstick', 'matte', 'new'],
    badge: 'New',
    inStock: true,
    stockCount: 16,
    description: 'Drape your smile in highly pigmented featherlight matte lip colors that persist for 16 hours. Formulated with lightweight plant-derived micro-waxes preventing lip crack lines and drying. Completely smudge-proof and transfer-proof under direct food oil contacts.',
    features: [
      'High-saturation micropigments cover lips in a single swipe',
      'Comfortable flexible transfer-resistant skin elastomer grids',
      'Infused with hydration rosehip oil seeds extracts',
      'Set of 2 complementing day/night shade pairings',
      'Precision contoured tear precision velvet wand apply'
    ],
    specifications: {
      'Pack Contains': 'Set of 1 Soft Nude and 1 Royal Red liquid lipstick',
      'Net Weight': '5 ml x 2 tubes',
      'Transfer Proof': 'Certified 16 hour fade-free transfers standards'
    },
    reviews: [
      { user: 'Nishi K.', rating: 5, text: 'Truly transferproof! Feels like you are wearing literally nothing. The nude color is gorgeous.', date: '2026-04-18', helpful: 14 }
    ],
    relatedIds: ['prod_clot_007', 'prod_beau_001'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_beau_006',
    name: 'HerbalPure Organic Cold-Pressed Coconut Oil',
    brand: 'Ananda',
    category: 'beauty',
    subcategory: 'haircare',
    price: 349,
    originalPrice: 429,
    discount: 18,
    rating: 4.7,
    reviewCount: 1241,
    images: [
      'https://picsum.photos/seed/coconutoil1/400/400'
    ],
    colors: ['#ffffff'],
    tags: ['haircare', 'skincare', 'coconut', 'organic'],
    badge: null,
    inStock: true,
    stockCount: 95,
    description: 'Experience deep biological nourishment with 100% pure raw cold-pressed virgin coconut extracts. Squeezed from organic fresh coconut milk inputs preserving rich Lauric fatty acids defense matrices. Serves wonderfully as body massage hydration oils or hair strengthen conditioners.',
    features: [
      '100% Virgin cold pressed zero heating mechanical separation',
      'Rich density of nourishing biological medium chain fatty acids',
      'Multipurpose deep skin moisturizing hair shaft coating standard',
      'Housed inside safe food-grade recyclable amber plastic bottles',
      'Completely unrefined zero petroleum mineral adulterations'
    ],
    specifications: {
      'Bottle Volume': '250 ml oil container',
      'Organic standard': 'Certified 100% organic crop processes',
      'Purity Index': 'Ultra low peroxide count, top edible safety marks'
    },
    reviews: [
      { user: 'Bhavani S.', rating: 5, text: 'Smells of real pure coconut sweets! Keeps my skin silky smooth after showers.', date: '2026-05-15', helpful: 9 }
    ],
    relatedIds: ['prod_beau_002', 'prod_beau_004'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_beau_007',
    name: 'Aroma-Breeze Lavender Soothing Body Wash',
    brand: 'Ananda',
    category: 'beauty',
    subcategory: 'bath',
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.5,
    reviewCount: 382,
    images: [
      'https://picsum.photos/seed/bodywash1/400/400'
    ],
    colors: ['#a855f7'],
    tags: ['shower', 'bath', 'lavender', 'relaxing'],
    badge: 'Sale',
    inStock: true,
    stockCount: 54,
    description: 'Melt dense evening stress patterns with the tranquil calming scent of French lavender field steam oils. Generates rich luxurious bubbles that lift dust while dousing skin in hydrating glycerol layers. Zero soap base prevents post-clean skin tightening or flaking dryness.',
    features: [
      'Steam-extracted original French Lavender essential oils',
      'High-slip gentle coconut derived surfactant bubble profiles',
      'Locks deep epiderm water with organic vitamin glycerols',
      '100% Biodegradable water ingredients safe for aquatic environments',
      'Elegant recyclable push-pump bottle fits bathroom decors'
    ],
    specifications: {
      'Bottle Volume': '400 ml container pump',
      'Safety testing': 'Hypoallergenic skin safety certifications',
      'Scent family': 'Lavender, Herbal relaxing scent profiles'
    },
    reviews: [
      { user: 'Sneha B.', rating: 4, text: 'Smells heavenly! It turns my daily shower into a calming sleep preparation spa.', date: '2026-06-03', helpful: 3 }
    ],
    relatedIds: ['prod_beau_004', 'prod_home_003'],
    isFeatured: false,
    isNew: false,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  },
  {
    id: 'prod_beau_008',
    name: 'VolcanicMud Anti-Stress Face Mask',
    brand: 'Elysian',
    category: 'beauty',
    subcategory: 'skincare',
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.6,
    reviewCount: 167,
    images: [
      'https://picsum.photos/seed/mudmask1/400/400'
    ],
    colors: ['#4b5563'],
    tags: ['skincare', 'claymask', 'detox', 'new'],
    badge: 'New',
    inStock: false,
    stockCount: 0,
    description: 'Erase dynamic environmental pollutant films with highly absorbent mineral-rich real physical volcanic clay. Enhanced with dynamic bentonite clay particles and organic tea tree extracts. Penetrates deep inside pores to pull out toxins and contract pore horizons.',
    features: [
      'Pure natural crushed volcanic basaltic mud particles',
      'Strong swelling bentonite clay draws out blackhead plugs',
      'Enriched with deep hydrating organic leaf extracts',
      'Slight granular texture provides physical skin polishes',
      'Erase dead cell sheets instantly on wash out cycles'
    ],
    specifications: {
      'Tub Capacity': '120 grams container',
      'Dry Timing': '10 to 15 minutes optimal skin setting time',
      'Suitability': 'Highly recommended for combination oily skins'
    },
    reviews: [
      { user: 'Siddhesh P.', rating: 5, text: 'My face feels incredibly clean and firm after this clay. Visibly shrinks large nose pores!', date: '2026-05-10', helpful: 12 }
    ],
    relatedIds: ['prod_beau_004', 'prod_beau_003'],
    isFeatured: false,
    isNew: true,
    isTrending: false,
    shipping: 'standard',
    returnPolicy: '15-day return policy',
    warranty: 'N/A'
  }
];

export const CATEGORIES_INFO = [
  { id: 'electronics', name: 'Electronics', count: 9, gradient: 'from-blue-600 to-indigo-700', icon: 'Cpu' },
  { id: 'clothing', name: 'Clothing', count: 9, gradient: 'from-pink-500 to-rose-600', icon: 'Shirt' },
  { id: 'home', name: 'Home & Living', count: 9, gradient: 'from-amber-500 to-orange-600', icon: 'Home' },
  { id: 'books', name: 'Books', count: 8, gradient: 'from-emerald-500 to-teal-600', icon: 'BookOpen' },
  { id: 'sports', name: 'Sports', count: 8, gradient: 'from-purple-500 to-violet-600', icon: 'Activity' },
  { id: 'beauty', name: 'Beauty', count: 8, gradient: 'from-fuchsia-500 to-pink-600', icon: 'Sparkles' }
];

export const BRANDS = [
  'AeroSound', 'Vivid', 'VoltCharger', 'SpectraX', 'NexusGrid', 'AeroTex',
  'AlpineGear', 'Elysian', 'AuraDream', 'BrewCraft', 'LunaLux', 'CozyCraft',
  'ApexFit', 'Ananda'
];
