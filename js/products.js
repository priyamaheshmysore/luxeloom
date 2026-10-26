/**
 * LuxeLoom - Luxury Fashion Catalog Data
 * Curated high-fashion items with authentic editorial imagery
 */

const PRODUCTS = [
  // --- MEN'S APPAREL ---
  {
    id: "ll-m01",
    name: "Savile Italian Virgin Wool Overcoat",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 490,
    originalPrice: 580,
    rating: 5.0,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Tailored from double-faced Italian virgin wool. Features clean structured shoulders, notched lapels, and hand-finished horn buttons for enduring warmth and presence.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Camel Tan", hex: "#b58d57" },
      { name: "Charcoal Heather", hex: "#2b2b2b" },
      { name: "Deep Navy", hex: "#141c2b" }
    ],
    isTrending: true,
    isNew: false,
    isOffer: true,
    discountPercent: 15,
    details: ["100% Virgin Italian Wool", "Horn buttons", "Cupro interior lining", "Made in Florence"]
  },
  {
    id: "ll-m02",
    name: "Milano Pure French Linen Shirt",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 135,
    originalPrice: 165,
    rating: 4.8,
    reviewCount: 84,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Cut from certified French flax linen, pre-washed for a naturally relaxed drape and breathable warm-weather luxury.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Sandstone Cream", hex: "#E8DFC5" },
      { name: "Sage Mist", hex: "#7E8E7D" }
    ],
    isTrending: true,
    isNew: false,
    isOffer: true,
    discountPercent: 18,
    details: ["100% French Flax Linen", "Mother-of-pearl buttons", "Pre-shrunk finish"]
  },
  {
    id: "ll-m03",
    name: "Supima Cotton Luxury Crewneck T-Shirt",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 75,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 162,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Extra-long staple American Supima cotton crafted with a fine gauge knit. Retains its deep color, silken hand-feel, and crisp neckline wear after wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "Jet Noir", hex: "#171717" },
      { name: "Slate Heather", hex: "#4A4D52" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: false,
    discountPercent: null,
    details: ["100% Long-Staple Supima Cotton", "Double-needle stitching", "Pre-shrunk"]
  },
  {
    id: "ll-m04",
    name: "Sartorial Pleated Tailored Trousers",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 185,
    originalPrice: 220,
    rating: 4.7,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Bespoke-inspired double forward pleats with side adjusters and a gentle mid-rise taper crafted from lightweight tropical wool-blend.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Charcoal Slate", hex: "#383b40" },
      { name: "Espresso Brown", hex: "#423229" },
      { name: "Navy Twill", hex: "#1a2536" }
    ],
    isTrending: false,
    isNew: false,
    isOffer: true,
    discountPercent: 16,
    details: ["Tropical wool blend", "Side tab adjusters", "Unfinished hem for bespoke tailoring"]
  },
  {
    id: "ll-m05",
    name: "Merino Wool Cableknit Crew Sweater",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 195,
    originalPrice: 240,
    rating: 4.8,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Spun from 100% fine Australian Merino wool with sculpted honeycomb and cable stitches. Exceptional thermal warmth with zero itch.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream Ecru", hex: "#F5F0E6" },
      { name: "Forest Heather", hex: "#23382B" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 19,
    details: ["100% Extra-Fine Merino Wool", "Seamless 3D knit body", "Ribbed collar and cuffs"]
  },
  {
    id: "ll-m06",
    name: "Montparnasse Lambskin Leather Jacket",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 460,
    originalPrice: 550,
    rating: 4.9,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Buttery-soft full-grain lambskin with antiqued gold hardware, satin lining, and an architectural silhouette built for timeless rebel refinement.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Noir Black", hex: "#171717" },
      { name: "Vintage Cognac", hex: "#693b1d" }
    ],
    isTrending: true,
    isNew: false,
    isOffer: true,
    discountPercent: 16,
    details: ["100% Full-Grain Lambskin", "Brushed metal zippers", "Interior breast pocket"]
  },
  {
    id: "ll-m07",
    name: "Oxford Structured Button-Down Shirt",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 140,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 104,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Heavyweight 80-ply 2-fold Egyptian cotton oxford cloth. Featuring an arched roll collar, mother-of-pearl buttons, and split back yoke.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sky Chambray", hex: "#b4cbe3" },
      { name: "White Classic", hex: "#FFFFFF" }
    ],
    isTrending: false,
    isNew: true,
    isOffer: false,
    discountPercent: null,
    details: ["100% Egyptian Giza Cotton", "Single-needle tailoring", "Durable basketweave"]
  },
  {
    id: "ll-m08",
    name: "Belgravia Double-Breasted Trench Coat",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 420,
    originalPrice: 495,
    rating: 4.9,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Military-inspired trench coat tailored from weather-resistant bonded gabardine cotton. Features epaulets, storm flap, and horn belt buckle.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "British Khaki", hex: "#c3b091" },
      { name: "Midnight Noir", hex: "#171717" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 15,
    details: ["Bonded gabardine cotton", "Water-repellent finish", "Belted waist and horn buckles"]
  },
  {
    id: "ll-m09",
    name: "Mayfair Peak-Lapel Wool Blazer",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 380,
    originalPrice: 450,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Deconstructed peak-lapel blazer spun from breathable English wool hopsack. Half-canvassed construction with natural drape and patch pockets.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Slate Charcoal", hex: "#3a3d40" },
      { name: "Navy Herringbone", hex: "#1c2838" }
    ],
    isTrending: false,
    isNew: true,
    isOffer: true,
    discountPercent: 16,
    details: ["100% English Wool Hopsack", "Half-canvassed interior", "Surgeon's cuffs"]
  },
  {
    id: "ll-m10",
    name: "Essential Organic Cotton Crewneck T-Shirt",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 68,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 140,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Certified organic combed cotton t-shirt with tailored shoulder drop, ribbed crewneck collar, and velvety enzyme-washed texture.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Onyx Black", hex: "#171717" },
      { name: "Heather Grey", hex: "#7a7d82" }
    ],
    isTrending: true,
    isNew: false,
    isOffer: false,
    discountPercent: null,
    details: ["100% GOTS Certified Organic Cotton", "Enzyme washed for soft drape", "Reinforced neckline"]
  },

  // --- WOMEN'S APPAREL ---
  {
    id: "ll-w01",
    name: "Aurelia Pure Silk Evening Gown",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 345,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Tailored from 100% pure Mulberry silk, the Aurelia evening gown drapes fluidly with subtle architectural ruching, an alluring low back, and a discreet side slit.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne Gold", hex: "#C6A15B" },
      { name: "Onyx Black", hex: "#171717" },
      { name: "Emerald Mist", hex: "#1f4037" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 18,
    details: ["100% Mulberry Silk", "Concealed back zip", "Dry clean only", "Crafted in Milan"]
  },
  {
    id: "ll-w02",
    name: "Cashmere Ribbed Turtleneck Sweater",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 215,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 110,
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sourced from high-plateau Mongolian cashmere goats. Ultra-soft featherweight knit with ribbed cuffs and neck for effortless Parisian chic.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Alabaster Cream", hex: "#F3EDE2" },
      { name: "Mocha", hex: "#634c3e" },
      { name: "Caviar Black", hex: "#1A1A1A" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: false,
    discountPercent: null,
    details: ["100% Grade-A Mongolian Cashmere", "Seamless knitting", "Pill-resistant finish"]
  },
  {
    id: "ll-w03",
    name: "Verona Peaked Double-Breasted Blazer",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 295,
    originalPrice: 360,
    rating: 4.9,
    reviewCount: 114,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sharp tailoring meets feminine grace. Peaked lapels, embossed gold crested buttons, and an hourglass silhouette designed to empower.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory Cream", hex: "#F7F3E9" },
      { name: "Midnight Black", hex: "#171717" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 18,
    details: ["Mid-weight wool blend", "Embossed gold metal buttons", "Internal chest pocket"]
  },
  {
    id: "ll-w04",
    name: "Elysian Pleated Midi Shirtdress",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 260,
    originalPrice: 310,
    rating: 4.8,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Airy cotton-poplin with accordion sunburst pleats, concealed button placket, and a detachable sash belt to define the waist.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Tuscan Ochre", hex: "#D49B45" },
      { name: "Classic Navy", hex: "#1C2738" }
    ],
    isTrending: false,
    isNew: true,
    isOffer: true,
    discountPercent: 16,
    details: ["100% Crisp Cotton Poplin", "Accordion sunburst pleats", "Mother-of-pearl buttons"]
  },
  {
    id: "ll-w05",
    name: "Haute Runway Tailored Blazer Dress",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 310,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1592878858320-cec76c56da82?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592878858320-cec76c56da82?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An assertive couture statement piece. Sculpted shoulder pads, satin contrast peaked lapels, and an ultra-flattering tailored mini length.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Chartreuse Glow", hex: "#C7D444" },
      { name: "Noir Black", hex: "#171717" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: false,
    discountPercent: null,
    details: ["Crepe wool stretch blend", "Satin lapel facings", "Double-breasted closure"]
  },
  {
    id: "ll-w06",
    name: "Palazzo High-Waist Wide-Leg Trousers",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 190,
    originalPrice: 235,
    rating: 4.7,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Fluid gabardine tailoring with high rise, sharp pressed center creases, and an elongated wide-leg silhouette that elongates the frame.",
    sizes: ["0", "2", "4", "6", "8", "10"],
    colors: [
      { name: "Ecru Ivory", hex: "#F5F2EB" },
      { name: "Onyx Black", hex: "#171717" }
    ],
    isTrending: false,
    isNew: false,
    isOffer: true,
    discountPercent: 19,
    details: ["Italian fluid gabardine", "Hidden hook-and-bar closure", "Slash side pockets"]
  },
  {
    id: "ll-w07",
    name: "Sculptural Minimalist Silk Slip Dress",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 280,
    originalPrice: 330,
    rating: 4.9,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Heavy 22-momme Mulberry silk cut on the bias for a liquid silhouette that moves effortlessly with every step. Delicate spaghetti straps and soft scoop neckline.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Midnight Charcoal", hex: "#22252A" },
      { name: "Golden Pearl", hex: "#E8D8B0" }
    ],
    isTrending: true,
    isNew: false,
    isOffer: true,
    discountPercent: 15,
    details: ["22-Momme Mulberry Silk", "Bias cut construction", "French seams throughout"]
  },
  {
    id: "ll-w08",
    name: "St. Moritz Chunky Knit Wool Sweater",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 230,
    originalPrice: 280,
    rating: 4.9,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hand-finished heavy gauge alpaca and merino wool sweater with ribbed mock neck and relaxed drop shoulders.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Vanilla Cream", hex: "#F3ECE1" },
      { name: "Oatmeal Melange", hex: "#D4CBBF" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 18,
    details: ["70% Baby Alpaca, 30% Merino Wool", "Hand-finished mock neckline", "Relaxed oversized drape"]
  },
  {
    id: "ll-w09",
    name: "Parisian Minimalist Pima Cotton Tee",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 70,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 125,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Refined wardrobe essential crafted from 100% Peruvian Pima cotton. Elegant scoop neckline and seamless side tailoring.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Midnight Black", hex: "#171717" }
    ],
    isTrending: false,
    isNew: true,
    isOffer: false,
    discountPercent: null,
    details: ["100% Peruvian Pima Cotton", "Pre-washed for softness", "Double stitched hem"]
  },
  {
    id: "ll-w10",
    name: "Riviera Tiered Linen Summer Dress",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 275,
    originalPrice: 330,
    rating: 4.9,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Tiered maxi silhouette in breathable natural flax linen with delicate shoulder ties and a sweeping A-line skirt.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Terracotta Sand", hex: "#C68263" },
      { name: "Linen Cream", hex: "#ECE6D8" }
    ],
    isTrending: true,
    isNew: false,
    isOffer: true,
    discountPercent: 17,
    details: ["100% European Flax Linen", "Adjustable shoulder ties", "Side pockets and lined bodice"]
  },

  // ==========================================
  // NEW BRANDED APPAREL (Men's & Women's)
  // ==========================================
  {
    id: "ll-brand-m01",
    name: "Zara Slim-Fit Textured Blazer",
    brand: "Zara",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 189,
    originalPrice: 230,
    rating: 4.8,
    reviewCount: 86,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Modern tailored slim silhouette crafted from a textured micro-weave blend. Features notched lapels, two-button closure, and double back vents for refined sartorial ease.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Charcoal Slate", hex: "#2C2F33" },
      { name: "Midnight Navy", hex: "#1B263B" },
      { name: "Sandstone", hex: "#C2B69D" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 18,
    details: ["Textured stretch-wool blend", "Notched lapels & ticket pocket", "Satin interior lining • Dry Clean Only"]
  },
  {
    id: "ll-brand-m02",
    name: "Levi's Premium Denim Jacket",
    brand: "Levi's",
    category: "men",
    categoryLabel: "Men's Fashion",
    price: 148,
    originalPrice: 185,
    rating: 4.9,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Iconic trucker silhouette cut from non-stretch heavyweight Cone Mills selvedge denim. Built with copper shank hardware and buttoned chest flap pockets that age with character.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo Rinse", hex: "#1A2B4C" },
      { name: "Faded Stonewash", hex: "#5B7B9E" },
      { name: "Washed Noir", hex: "#2A2A2A" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 20,
    details: ["100% Heavyweight Cotton Denim", "Selvedge edge detailing", "Copper rivet reinforcements"]
  },
  {
    id: "ll-brand-w01",
    name: "ZARA HIGH-WAIST WIDE-LEG JEANS",
    brand: "Zara",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Trending high-waisted wide-leg denim silhouette tailored from heavyweight non-stretch cotton for an effortless street-couture drape.",
    sizes: ["26", "28", "30", "32"],
    colors: [
      { name: "Vintage Light Wash", hex: "#A4C3D2" },
      { name: "Mid Stonewash Blue", hex: "#4A6B8F" },
      { name: "Raw Deep Indigo", hex: "#1B2E4B" },
      { name: "Washed Charcoal Noir", hex: "#282828" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 19,
    details: ["100% Rigid Organic Cotton Denim", "High-rise fitted waist & wide leg", "Classic 5-pocket styling & copper fly"]
  },
  {
    id: "ll-brand-w02",
    name: "Gucci Silk Floral Blouse",
    brand: "Gucci",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 480,
    originalPrice: 590,
    rating: 5.0,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Lustrous Italian silk crepe de chine adorned with heritage botanical blossoms. Accented by a fluid pussy-bow neck tie, mother-of-pearl buttons, and gathered blouson cuffs.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Floral Ivory", hex: "#F5EFEB" },
      { name: "Dusty Rose", hex: "#C48B9F" },
      { name: "Midnight Bloom", hex: "#191C26" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 19,
    details: ["100% Pure Italian Silk", "Detachable neck bow ribbon", "Mother-of-pearl crested buttons"]
  },
  {
    id: "ll-brand-w03",
    name: "MANGO PREMIUM WOMEN'S JEANS",
    brand: "Mango",
    category: "women",
    categoryLabel: "Women's Fashion",
    price: 299,
    originalPrice: 375,
    rating: 4.9,
    reviewCount: 108,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-waisted premium denim jeans tailored from heavyweight dark navy organic cotton denim with subtle sculpting stretch, tobacco contrast stitching, and brushed copper rivets.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Dark Indigo Wash", hex: "#16233B" },
      { name: "Midnight Navy", hex: "#1E293B" },
      { name: "Raw Rinse", hex: "#0F172A" }
    ],
    isTrending: true,
    isNew: true,
    isOffer: true,
    discountPercent: 20,
    details: ["100% Selvedge Organic Cotton Denim", "High-rise sculpted contour fit with wide leg", "Reinforced copper rivets & zip fly closure"]
  }
];

// Testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Lady Camille Laurent",
    role: "Haute Couture Collector, Paris",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    review: "LuxeLoom rivals the prestigious ateliers of Rue Saint-Honoré. The Aurelia Silk Gown arrived immaculately packaged in signature embossed gold boxes. The drape and craftsmanship are simply sublime."
  },
  {
    id: 2,
    name: "Alexander Sterling",
    role: "Architect & Creative Director, London",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    review: "The Savile Wool Overcoat is perfection. The shoulder line and weight of the Italian wool give a silhouette that commands attention without saying a word. Truly exceptional value for bespoke-level luxury."
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Fashion Editor, Milan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    review: "From the fluid navigation of their storefront to the lightning-fast concierge delivery, LuxeLoom delivers an authentic 5-star luxury experience. My cashmere sweaters have become my everyday signature."
  },
  {
    id: 4,
    name: "Marcus Vance",
    role: "Venture Partner, New York",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    review: "Impeccable quality. The linen shirts feel like second skin in tropical climates yet hold their crisp shape effortlessly. LuxeLoom is now my first destination for smart casual wardrobe essentials."
  }
];

// LuxeLoom Fashion Gallery Data (Curated high-resolution editorial clothing exclusively for Men and Women)
const GALLERY_ITEMS = [
  {
    id: "gal-01",
    title: "Sartorial Oxford Linen Casual",
    category: "men",
    categoryLabel: "Men's Fashion",
    desc: "Bespoke French flax linen shirt on clean studio backdrop for coastal refinement.",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-02",
    title: "Savile Italian Wool Overcoat",
    category: "men",
    categoryLabel: "Men's Fashion",
    desc: "Double-faced virgin wool coat with structured shoulders and hand-stitched lapels.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-03",
    title: "Mayfair Peak-Lapel Wool Blazer",
    category: "men",
    categoryLabel: "Men's Fashion",
    desc: "Deconstructed peak-lapel blazer tailored from English wool hopsack for confident modern elegance.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-04",
    title: "Belgravia Gabardine Trench Coat",
    category: "men",
    categoryLabel: "Men's Fashion",
    desc: "Double-breasted weatherproof gabardine trench coat featuring storm flaps and belted cuffs.",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-05",
    title: "Merino Wool Cableknit Crew Sweater",
    category: "men",
    categoryLabel: "Men's Fashion",
    desc: "Pure Australian Merino wool with sculpted honeycomb and cable stitches for warm sophistication.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-06",
    title: "Montparnasse Lambskin Leather Jacket",
    category: "men",
    categoryLabel: "Men's Fashion",
    desc: "Buttery-soft full-grain lambskin with antiqued gold hardware and architectural tailoring.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-07",
    title: "Aurelia Gilded Silk Evening Gown",
    category: "women",
    categoryLabel: "Women's Fashion",
    desc: "Pure Mulberry silk evening gown with fluid bias draping, low cowl back, and luminous finish.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-08",
    title: "Verona Hourglass Peaked Blazer",
    category: "women",
    categoryLabel: "Women's Fashion",
    desc: "Crisp architectural tailoring on ghost mannequin display for boardroom poise.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-09",
    title: "St. Moritz Chunky Knit Wool Sweater",
    category: "women",
    categoryLabel: "Women's Fashion",
    desc: "Hand-finished heavy gauge alpaca and merino wool sweater with ribbed mock neckline flat lay.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-10",
    title: "Haute Runway Tailored Blazer Dress",
    category: "women",
    categoryLabel: "Women's Fashion",
    desc: "Assertive couture statement blazer dress on studio hanger display.",
    image: "https://images.unsplash.com/photo-1592878858320-cec76c56da82?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-11",
    title: "Sculptural Minimalist Silk Slip Dress",
    category: "women",
    categoryLabel: "Women's Fashion",
    desc: "Heavy Mulberry silk cut on the bias on a clean wooden hanger against neutral studio background.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-12",
    title: "Palazzo High-Waist Tailored Trousers",
    category: "women",
    categoryLabel: "Women's Fashion",
    desc: "Fluid Italian gabardine wide-leg trousers on studio hanger display.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80"
  }
];

