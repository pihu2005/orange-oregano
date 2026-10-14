import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'oo-w-01',
    name: 'Candolim Sunset Terracotta Co-ord Set',
    category: 'women',
    subtitle: 'Relaxed cropped tunic with wide-leg culottes in spiced terracotta',
    price: 4850,
    originalPrice: 5900,
    rating: 4.9,
    reviewCount: 38,
    tag: 'Bestseller',
    craftPillar: 'Hand-spun Khadi Linen',
    description: 'Crafted from breathable hand-spun khadi linen and dyed in our signature spiced terracotta hue. Designed for languid afternoons in Candolim and breezy coastal evenings.',
    details: [
      '100% hand-spun breathable khadi linen',
      'Naturally softened with coconut enzyme wash',
      'Concealed side seam pockets on culottes',
      'Zero-waste pattern engineering'
    ],
    fabric: 'Hand-spun Khadi Linen',
    origin: 'Hand-tailored at our Candolim, Goa Studio',
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta Orange', hex: '#ef8535' },
      { name: 'Warm Ecru', hex: '#f9f7dc' },
      { name: 'Earthy Espresso', hex: '#763c00' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'oo-w-02',
    name: 'Marquis Vaddi Handwoven Overlay',
    category: 'women',
    subtitle: 'Open-front sheer Chanderi cape with delicate zari detailing',
    price: 5400,
    originalPrice: 6200,
    rating: 5.0,
    reviewCount: 24,
    tag: 'Artisan Heritage',
    craftPillar: 'Chanderi Weave',
    description: 'Named after our studio home in Marquis Vaddo, Candolim. A feather-light overlay woven by 4th-generation master weavers using unbleached cotton and fine mulberry silk.',
    details: [
      'Gossamer cotton-silk Chanderi warp & weft',
      'Subtle metallic hand-woven selvedge',
      'Versatile layering over swimwear or evening wear',
      'Supports Chanderi weaver cooperatives in Madhya Pradesh'
    ],
    fabric: 'Cotton-Silk Chanderi',
    origin: 'Chanderi, Madhya Pradesh',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (XS-XL)'],
    colors: [
      { name: 'Ivory Gold', hex: '#f9f7dc' },
      { name: 'Spiced Ochre', hex: '#ef8535' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'oo-w-03',
    name: 'Saffron Meadow Tiered Maxi Dress',
    category: 'women',
    subtitle: 'Tiered silhouette with botanical wooden button closure',
    price: 3950,
    rating: 4.8,
    reviewCount: 42,
    craftPillar: 'Plant-Dyed Organic Cotton',
    description: 'Dyed using madder roots and pomegranate rinds to achieve warm golden-saffron nuances. Features a relaxed tiered drape that moves like coastal Goa sea breezes.',
    details: [
      '100% GOTS certified organic cotton',
      'Dyed with chemical-free botanical pigments',
      'Hand-carved neem wood buttons',
      'Deep functional side pockets'
    ],
    fabric: 'Organic Slub Cotton',
    origin: 'Bagru, Rajasthan & Goa Studio',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Saffron Sun', hex: '#ef8535' },
      { name: 'Raw Sand', hex: '#f4ede2' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'oo-m-01',
    name: 'Goa Sunset Relaxed Linen Shirt',
    category: 'men',
    subtitle: 'Camp collar resort shirt in pre-washed European flax linen',
    price: 3450,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 51,
    tag: 'Core Essential',
    craftPillar: 'Pure Flax Linen',
    description: 'Our quintessential Candolim staple. Cut in an effortless Cuban collar silhouette with mother-of-pearl buttons. Softens gracefully with every sea rinse and wash.',
    details: [
      '100% European flax linen (185 GSM)',
      'Relaxed camp collar with straight hem',
      'Sustainably harvested mother-of-pearl buttons',
      'Pre-washed for instant softness & zero shrinkage'
    ],
    fabric: '100% Pure Linen',
    origin: 'Candolim Studio, Goa',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Terracotta Sunset', hex: '#ef8535' },
      { name: 'Vanilla Cream', hex: '#f9f7dc' },
      { name: 'Indigo Slate', hex: '#304254' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'oo-m-02',
    name: 'Oregano Textured Khadi Kurta',
    category: 'men',
    subtitle: 'Minimalist mandarin collar short kurta in textured handloom cotton',
    price: 4200,
    rating: 4.7,
    reviewCount: 19,
    tag: 'Craft Pride',
    craftPillar: 'Bengal Khadi Weave',
    description: 'Woven on indigenous wooden pit-looms in Bengal. The natural slub texture provides superior air circulation, keeping you cool through warm tropical climates.',
    details: [
      'Pure hand-spun khadi cotton yarn',
      'Mandarin band collar with hidden placket',
      'Hand-finished rolled hems',
      'Breathable, thermo-regulating organic fiber'
    ],
    fabric: 'Handloom Slub Khadi',
    origin: 'Murshidabad Weavers, West Bengal',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Unbleached Cream', hex: '#f9f7dc' },
      { name: 'Warm Terracotta', hex: '#ef8535' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'oo-m-03',
    name: 'Coastal Tapered Cotton Twill Trousers',
    category: 'men',
    subtitle: 'Pleated relaxed trousers with elasticated back waist',
    price: 3800,
    rating: 4.8,
    reviewCount: 33,
    craftPillar: 'Kannur Handloom',
    description: 'Tailored for effortless ease with front single pleats, elasticated back comfort, and a clean tapered silhouette that pairs seamlessly with sandals or espadrilles.',
    details: [
      'Handloom cotton twill with subtle cross-hatch texture',
      'Deep slash front pockets & horn button rear jet pocket',
      'Adjustable internal drawstring waistband',
      'Double-stitched stress points'
    ],
    fabric: 'Handloom Cotton Twill',
    origin: 'Kannur, Kerala',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Natural Khaki', hex: '#f4ede2' },
      { name: 'Deep Espresso', hex: '#763c00' },
      { name: 'Slate Blue', hex: '#304254' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'oo-a-01',
    name: 'Ajrakh Hand-Block Silk Stole',
    category: 'accessories',
    subtitle: 'Modal silk scarf hand-stamped with 16-stage natural dye blocks',
    price: 2750,
    originalPrice: 3200,
    rating: 5.0,
    reviewCount: 67,
    tag: 'UNESCO Craft',
    craftPillar: 'Kutch Ajrakh Print',
    description: 'An ode to ancient Indus Valley textile heritage. Printed using carved teakwood blocks dipped in natural indigo, iron rust, and harda by Khatri artisans in Kutch.',
    details: [
      '100% fine modal silk with hand-rolled selvedge',
      '16 individual steps of washing, resist printing, and river dying',
      '200 cm x 70 cm generous size',
      'Signed by master artisan'
    ],
    fabric: 'Pure Modal Silk',
    origin: 'Dhamadka, Kutch, Gujarat',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size (200 x 70 cm)'],
    colors: [
      { name: 'Terracotta & Indigo', hex: '#ef8535' },
      { name: 'Madder Red', hex: '#763c00' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'oo-a-02',
    name: 'Candolim Braided Jute & Canvas Weekend Tote',
    category: 'accessories',
    subtitle: 'Heavyweight organic canvas bag with vegetable-tanned leather trim',
    price: 2400,
    rating: 4.9,
    reviewCount: 45,
    craftPillar: 'Goa Studio Workshop',
    description: 'Sturdy, roomy, and crafted to carry everything from beach essentials to weekend produce. Finished with solid brass rivets and internal zippered compartments.',
    details: [
      '18 oz organic unbleached cotton duck canvas',
      'Hand-braided jute reinforcement handles',
      'Water-resistant natural beeswax coating on base',
      'Fits 16-inch laptops plus daily essentials'
    ],
    fabric: 'Heavy Cotton Canvas & Jute',
    origin: 'Candolim Studio, Goa',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size (45 x 38 x 16 cm)'],
    colors: [
      { name: 'Raw Ecru & Orange', hex: '#f9f7dc' },
      { name: 'Solid Terracotta', hex: '#ef8535' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'oo-a-03',
    name: 'Botanical Oregano Cast Brass Earrings',
    category: 'accessories',
    subtitle: 'Sculptural leaf motifs hand-cast using ancient lost-wax technique',
    price: 1650,
    rating: 4.8,
    reviewCount: 29,
    tag: 'Artisan Crafted',
    craftPillar: 'Lost-Wax Brass Casting',
    description: 'Inspired by wild oregano sprigs discovered around our Candolim studio garden. Hand-poured in recycled brass with a warm brushed satin finish.',
    details: [
      '100% recycled metallurgical brass',
      'Hypoallergenic sterling silver ear posts',
      'Matte micro-crystalline protective seal to prevent tarnishing',
      'Ultra lightweight at 6 grams per pair'
    ],
    fabric: 'Recycled Brass',
    origin: 'Moradabad Metalsmiths & Candolim Studio',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Standard'],
    colors: [
      { name: 'Brushed Gold Brass', hex: '#ef8535' },
      { name: 'Antiqued Bronze', hex: '#763c00' }
    ],
    inStock: true,
    featured: true
  }
];
