// frontend/src/data/products.js

/**
 * PRODUCT CATALOG
 * Whenever you have your real images:
 * 1. Place the images in: frontend/public/images/
 * 2. Reference them like: image_url: "/images/your-product.jpg"
 */
export const PRODUCTS_DATA = [
  // 1. Wine & Bottle Carriers
  {
    id: "prod-1",
    name: "Single-Bottle Jute Wine Carrier",
    slug: "single-bottle-wine-carrier",
    category: "Wine & Bottle Carriers",
    positioning: "Elegant single-bottle jute carrier ideal for winery gifting and retail packaging.",
    short_description: "Loop-handle jute carrier engineered for standard 750ml bottles.",
    long_description: "Our flagship single-bottle wine carrier is loom-woven from natural Bengal jute and finished with a reinforced base for standard 750ml bottles. Custom screen-printing, foil-stamping, and satin ribbon closures available. Popular with European wineries, corporate gifting, and hospitality brands.",
    image_url: "/images/products/single-bottle-carrier-1.jpeg",
    gallery: [
      "/images/products/single-bottle-carrier-1.jpeg",
      "/images/products/single-bottle-carrier-2.jpeg",
    ],
    specs: {
      "Material": "Natural laminated jute",
      "Fit": "Standard 750ml wine / spirit bottles",
      "Closure": "Twill rope drawstring or ribbon",
      "Printing": "Screen-print, foil, embroidery",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 10,
  },
  {
    id: "prod-2",
    name: "Two-Bottle Wine Gift Carrier",
    slug: "two-bottle-wine-gift-carrier",
    category: "Wine & Bottle Carriers",
    positioning: "Dual-compartment carrier with internal partition — retail-ready for gift pairs.",
    short_description: "Partitioned jute carrier for two-bottle presentations.",
    long_description: "Our two-bottle gift carrier features an internal jute partition and reinforced double handles, keeping bottles separated in transit. Ideal for hamper companies, wine merchants, and premium promotional gifting.",
    image_url: "/images/products/two-bottle-wine-gift-carrier.jpeg",
    gallery: [
      "/images/products/two-bottle-wine-gift-carrier.jpeg",
    ],
    specs: {
      "Material": "Laminated jute with cotton binding",
      "Capacity": "2 x 750ml bottles",
      "Partition": "Integrated jute divider",
      "Printing": "Full-colour digital, screen, embossed",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 11,
  },
  {
    id: "prod-3",
    name: "Six-Bottle Cellar Tote",
    slug: "six-bottle-cellar-tote",
    category: "Wine & Bottle Carriers",
    positioning: "Six-slot cellar tote for tastings, distributors, and wine club shipments.",
    short_description: "Reinforced six-bottle jute tote with internal dividers.",
    long_description: "Built for tasting rooms and wine clubs, our six-bottle cellar tote uses heavy-gauge laminated jute with a rigid base insert and internal cardboard dividers. Custom colours, printing, and branded labels available.",
    image_url: "/images/products/img5.jpg",
    gallery: [
      "/images/products/img5.jpg",
    ],
    specs: {
      "Material": "Heavy laminated jute + cardboard insert",
      "Capacity": "6 x 750ml bottles",
      "Handles": "Cotton webbing, reinforced",
      "Printing": "Screen-print or full-colour transfer",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 12,
  },

  // 2. Custom-Printed Promotional Bags
  {
    id: "prod-4",
    name: "Screen-Printed Event Bag",
    slug: "screen-printed-event-bag",
    category: "Custom-Printed Promotional Bags",
    positioning: "High-visibility event bags — turnaround-ready for conferences and trade shows.",
    short_description: "Custom screen-printed jute event bag with flat cotton handles.",
    long_description: "Fast-turnaround, screen-printed jute event bags for trade shows, launches, and corporate giveaways. Print your logo or artwork in up to 4 spot colours on natural or dyed jute. Available in flat, gusseted, and portrait cuts.",
    image_url: "/images/products/img2.jpeg",
    gallery: [
      "/images/products/img2.jpeg",
    ],
    specs: {
      "Print Method": "Water-based screen-print, up to 4 colours",
      "Handles": "Flat cotton webbing",
      "Sizes": "Customizable per artwork",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 20,
  },
  {
    id: "prod-5",
    name: "Full-Colour Digital Print Bag",
    slug: "digital-print-jute-bag",
    category: "Custom-Printed Promotional Bags",
    positioning: "Photo-realistic full-colour printing for premium brand campaigns.",
    short_description: "Digital-printed jute bag with photo-quality artwork reproduction.",
    long_description: "For brands needing photo-realistic or gradient artwork, our digital-printed jute bags reproduce complex designs faithfully. Ideal for retail launches, luxury gifting, and high-end promotional campaigns.",
    image_url: "/images/products/img4.jpeg",
    gallery: [
      "/images/products/img4.jpeg",
    ],
    specs: {
      "Print Method": "Full-colour digital transfer",
      "Finish": "Matte or laminated",
      "Handles": "Cotton or jute-rope",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 21,
  },

  // 3. JC-Blend Lifestyle Bags
  {
    id: "prod-6",
    name: "JC-Blend Shopper",
    slug: "jc-blend-shopper",
    category: "JC-Blend Lifestyle Bags",
    positioning: "Softer hand-feel jute-cotton blend for everyday retail and lifestyle brands.",
    short_description: "Jute-cotton blend shopper with softer drape and print-friendly surface.",
    long_description: "Our JC-Blend Shopper combines jute's rustic strength with cotton's softness, delivering a lightweight, print-friendly, and drape-friendly bag that lifestyle and grocery brands love. Available in a range of natural and dyed shades.",
    image_url: "/images/products/img1.jpeg",
    gallery: [
      "/images/products/img1.jpeg",
    ],
    specs: {
      "Material": "Jute-Cotton blend (JC)",
      "Weight": "Lightweight — approx 10 oz",
      "Handles": "Long shoulder or short-carry",
      "Print": "Screen, digital, embroidery",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 30,
  },
  {
    id: "prod-7",
    name: "JC-Blend Everyday Carry",
    slug: "jc-blend-everyday-carry",
    category: "JC-Blend Lifestyle Bags",
    positioning: "Structured everyday carry with a refined finish — for lifestyle retail lines.",
    short_description: "Refined JC-Blend carry bag with structured base and inner pocket.",
    long_description: "A refined everyday bag in our JC-Blend fabric, featuring a structured base, cotton lining, and inner slip pocket. Suited to lifestyle boutiques, wellness brands, and premium retail collaborations.",
    image_url: "/images/products/img3.jpeg",
    gallery: [
      "/images/products/img3.jpeg",
    ],
    specs: {
      "Material": "JC-Blend outer, cotton lining",
      "Pocket": "Inner slip pocket",
      "Handles": "Double shoulder straps",
      "Print": "Screen, embroidery, patch",
      "MOQ": "Flexible MOQs — contact us for your order size",
      "Origin": "Murshidabad, West Bengal",
    },
    featured: true,
    active: true,
    display_order: 31,
  },
];