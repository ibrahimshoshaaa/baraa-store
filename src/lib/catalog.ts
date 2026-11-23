// Baraa — static catalog (no database).
// Single source of truth for products, categories and blog posts.
// Every user-facing string has an English and an Arabic version.

export type Lang = "en" | "ar";

export type Category = {
  name: string;
  nameAr: string;
  slug: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { name: "Men's Thobe", nameAr: "ثوب رجالي", slug: "mens-thobe", image: "/images/white-thobe.jpg" },
  { name: "Men's Kurta", nameAr: "كردة رجالي", slug: "mens-kurta", image: "/images/black-kurta.jpg" },
  { name: "Men's Panjabi", nameAr: "بنجابي رجالي", slug: "mens-panjabi", image: "/images/beige-panjabi.jpg" },
  { name: "Women's Abaya", nameAr: "عباية نسائية", slug: "womens-abaya", image: "/images/black-abaya.jpg" },
  { name: "Women's Hijab", nameAr: "حجاب نسائي", slug: "womens-hijab", image: "/images/maroon-hijab.jpg" },
];

export type Product = {
  slug: string;
  name: string;
  nameAr: string;
  categorySlug: string;
  price: number;  // whole EGP pounds
  compare?: number;  // whole EGP pounds
  rating: number;
  reviews: number;
  colours: { name: string; nameAr: string; hex: string }[];
  sizes: string[];
  image: string;
  description: string;
  descriptionAr: string;
};

export const SIZES = ["S", "M", "L", "XL", "XXL"];
export const HIJAB_SIZES = ["One Size"];

export const PRODUCTS: Product[] = [
  {
    slug: "classic-white-thobe",
    name: "Classic White Thobe",
    nameAr: "ثوب أبيض كلاسيكي",
    categorySlug: "mens-thobe",
    price: 1900,
    compare: 2400,
    rating: 4.9,
    reviews: 312,
    colours: [{ name: "White", nameAr: "أبيض", hex: "#f7f5ef" }],
    sizes: SIZES,
    image: "/images/white-thobe.jpg",
    description:
      "Our Classic White Thobe is cut from breathable premium cotton with a clean mandarin collar and a flowing, comfortable drape. A timeless essential — for prayer, for gatherings, for every day.",
    descriptionAr:
      "ثوبنا الأبيض الكلاسيكي مصنوع من قطن فاخر يتنفس، بياقة صينية أنيقة وقصّة انسيابية مريحة. قطعة خالدة أساسية — للصلاة، وللمناسبات، ولكل يوم.",
  },
  {
    slug: "premium-kurta-green",
    name: "Premium Kurta",
    nameAr: "كردة فاخرة",
    categorySlug: "mens-kurta",
    price: 1700,
    compare: 2400,
    rating: 4.8,
    reviews: 268,
    colours: [{ name: "Emerald Green", nameAr: "أخضر زمردي", hex: "#0b3d2e" }],
    sizes: SIZES,
    image: "/images/hero-kurta.jpg",
    description:
      "The Premium Kurta in deep emerald green — soft, breathable fabric with a tailored fit, mandarin collar and buttoned placket. Dressed up or dressed down, it always looks right.",
    descriptionAr:
      "الكردة الفاخرة باللون الأخضر الزمردي العميق — قماش ناعم يتنفس بقصّة مصممة بإتقان وياقة صينية وأزرار أمامية. أنيقة في كل المناسبات.",
  },
  {
    slug: "elegant-panjabi",
    name: "Elegant Panjabi",
    nameAr: "بنجابي أنيق",
    categorySlug: "mens-panjabi",
    price: 1800,
    compare: 2350,
    rating: 4.8,
    reviews: 187,
    colours: [{ name: "Beige", nameAr: "بيج", hex: "#e3d3b3" }],
    sizes: SIZES,
    image: "/images/beige-panjabi.jpg",
    description:
      "A light beige panjabi in soft woven cotton with a small chest pocket and a relaxed, breathable fit. Made for warm days and long evenings alike.",
    descriptionAr:
      "بنجابي بيج فاتح من قطن منسوج ناعم مع جيب صغير على الصدر وقصّة مريحة تتنفس. صُنع للأيام الدافئة والأمسيات الطويلة.",
  },
  {
    slug: "black-kurta",
    name: "Black Kurta",
    nameAr: "كردة سوداء",
    categorySlug: "mens-kurta",
    price: 1600,
    compare: 2150,
    rating: 4.7,
    reviews: 154,
    colours: [{ name: "Black", nameAr: "أسود", hex: "#1a1a1a" }],
    sizes: SIZES,
    image: "/images/black-kurta.jpg",
    description:
      "A classic black kurta in smooth, breathable fabric. Understated and elegant — the one you reach for when you want to look sharp without trying.",
    descriptionAr:
      "كردة سوداء كلاسيكية من قماش ناعم يتنفس. بسيطة وأنيقة — القطعة التي تختارها عندما تريد أن تبدو أنيقاً دون مجهود.",
  },
  {
    slug: "black-abaya",
    name: "Black Abaya",
    nameAr: "عباية سوداء",
    categorySlug: "womens-abaya",
    price: 2200,
    compare: 2900,
    rating: 4.9,
    reviews: 421,
    colours: [{ name: "Black", nameAr: "أسود", hex: "#1a1a1a" }],
    sizes: SIZES,
    image: "/images/black-abaya.jpg",
    description:
      "A flowing black abaya in premium crepe with long sleeves and a graceful, modest drape. Comfortable all day, elegant in every setting.",
    descriptionAr:
      "عباية سوداء انسيابية من الكريب الفاخر بأكمام طويلة وقصّة محتشمة راقية. مريحة طوال اليوم وأنيقة في كل المناسبات.",
  },
  {
    slug: "maroon-hijab",
    name: "Maroon Hijab",
    nameAr: "حجاب عنابي",
    categorySlug: "womens-hijab",
    price: 700,
    compare: 950,
    rating: 4.8,
    reviews: 203,
    colours: [{ name: "Maroon", nameAr: "عنابي", hex: "#7a2e3a" }],
    sizes: HIJAB_SIZES,
    image: "/images/maroon-hijab.jpg",
    description:
      "A soft maroon chiffon hijab with a beautiful, easy drape that stays in place. Lightweight, breathable and kind to the skin.",
    descriptionAr:
      "حجاب عنابي من الشيفون الناعم بانسيابية جميلة تثبت في مكانها. خفيف ويتنفس ولطيف على البشرة.",
  },
  {
    slug: "white-panjabi",
    name: "White Panjabi",
    nameAr: "بنجابي أبيض",
    categorySlug: "mens-panjabi",
    price: 1650,
    compare: 2200,
    rating: 4.7,
    reviews: 129,
    colours: [{ name: "White", nameAr: "أبيض", hex: "#f7f5ef" }],
    sizes: SIZES,
    image: "/images/white-panjabi.jpg",
    description:
      "A crisp white panjabi in cool, breathable cotton — fresh for summer days, smart for every occasion.",
    descriptionAr:
      "بنجابي أبيض ناصع من قطن بارد يتنفس — منعش لأيام الصيف وأنيق لكل المناسبات.",
  },
  {
    slug: "navy-thobe",
    name: "Navy Thobe",
    nameAr: "ثوب كحلي",
    categorySlug: "mens-thobe",
    price: 2050,
    compare: 2650,
    rating: 4.8,
    reviews: 96,
    colours: [{ name: "Navy", nameAr: "كحلي", hex: "#1e2f4a" }],
    sizes: SIZES,
    image: "/images/navy-thobe.jpg",
    description:
      "A deep navy thobe in premium cotton with a refined finish and a comfortable, flowing cut. Quietly elegant.",
    descriptionAr:
      "ثوب كحلي عميق من قطن فاخر بلمسة راقية وقصّة مريحة انسيابية. أناقة هادئة.",
  },
  {
    slug: "embroidered-kurta",
    name: "Embroidered Kurta",
    nameAr: "كردة مطرزة",
    categorySlug: "mens-kurta",
    price: 1850,
    compare: 2550,
    rating: 4.9,
    reviews: 88,
    colours: [{ name: "Cream", nameAr: "كريمي", hex: "#efe6d4" }],
    sizes: SIZES,
    image: "/images/embroidered-kurta.jpg",
    description:
      "A cream kurta with delicate gold embroidery around the collar and placket — made for Eid, weddings and special occasions.",
    descriptionAr:
      "كردة كريمية بتطريز ذهبي رقيق حول الياقة والأزرار — صُنعت للعيد والأعراس والمناسبات الخاصة.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// --- Localized accessors (English default, Arabic when lang === "ar") ---

export function productName(p: Product, lang: Lang): string {
  return lang === "ar" ? p.nameAr : p.name;
}
export function productDescription(p: Product, lang: Lang): string {
  return lang === "ar" ? p.descriptionAr : p.description;
}
export function colourName(c: { name: string; nameAr: string }, lang: Lang): string {
  return lang === "ar" ? c.nameAr : c.name;
}
export function categoryName(slug: string, lang: Lang = "en"): string {
  const c = getCategory(slug);
  if (!c) return slug;
  return lang === "ar" ? c.nameAr : c.name;
}

export function relatedProducts(product: Product, count = 3): Product[] {
  const same = PRODUCTS.filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug);
  const others = PRODUCTS.filter((p) => p.slug !== product.slug && p.categorySlug !== product.categorySlug);
  return [...same, ...others].slice(0, count);
}

export type BlogPost = {
  slug: string;
  title: string;
  titleAr: string;
  image: string;
  excerpt: string;
  excerptAr: string;
  date: string;
  dateAr: string;
  body: string[];
  bodyAr: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "importance-of-modest-fashion",
    title: "The Importance of Modest Fashion",
    titleAr: "أهمية الموضة المحتشمة",
    image: "/images/mosque.jpg",
    excerpt: "Modesty is not a limitation — it is a way of dressing with dignity, comfort and intention.",
    excerptAr: "الاحتشام ليس قيداً — بل هو طريقة للباس بالكرامة والراحة والقصد.",
    date: "November 12, 2024",
    dateAr: "١٢ نوفمبر ٢٠٢٤",
    body: [
      "Modest fashion is about more than covering up — it is about dressing with dignity, comfort and intention. When clothing is designed for modesty first, it frees the wearer to move, work and worship without distraction.",
      "A well-made thobe or abaya proves that modesty and elegance are not opposites. Clean lines, honest fabrics and a thoughtful fit can be more striking than any trend.",
      "At Baraa, every piece begins with that idea: modest, elegant, timeless.",
    ],
    bodyAr: [
      "الموضة المحتشمة أكثر من مجرد تغطية — إنها لباس بالكرامة والراحة والقصد. عندما تُصمم الملابس للاحتشام أولاً، تمنح من يرتديها حرية الحركة والعمل والعبادة دون تشتت.",
      "الثوب أو العباية المصنوعة بإتقان تثبت أن الاحتشام والأناقة ليسا نقيضين. الخطوط النظيفة والأقمشة الأصيلة والقصّة المدروسة قد تكون أجمل من أي صيحة.",
      "في براء، كل قطعة تبدأ من هذه الفكرة: محتشمة، أنيقة، خالدة.",
    ],
  },
  {
    slug: "islamic-lifestyle-in-modern-life",
    title: "Islamic Lifestyle in Modern Life",
    titleAr: "أسلوب الحياة الإسلامي في الحياة العصرية",
    image: "/images/books-tasbih.jpg",
    excerpt: "Faith and modern life fit together beautifully — including what we wear every day.",
    excerptAr: "الإيمان والحياة العصرية يتناسقان بجمال — بما في ذلك ما نرتديه كل يوم.",
    date: "November 5, 2024",
    dateAr: "٥ نوفمبر ٢٠٢٤",
    body: [
      "Living an Islamic lifestyle in the modern world is not about choosing between faith and the everyday — it is about bringing them together, in work, in family life and in what we wear.",
      "Clothing that is comfortable for prayer, appropriate for the office and elegant for the evening makes that balance easier. That is why we design pieces that move with you through the whole day.",
      "Small choices — breathable fabric, a modest cut, a timeless colour — add up to a wardrobe that serves your life, not the other way round.",
    ],
    bodyAr: [
      "عيش أسلوب الحياة الإسلامي في العالم الحديث ليس اختياراً بين الإيمان والحياة اليومية — بل هو الجمع بينهما، في العمل وفي الحياة العائلية وفيما نرتديه.",
      "ملابس مريحة للصلاة ومناسبة للمكتب وأنيقة للمساء تجعل هذا التوازن أسهل. لذلك نصمم قطعاً ترافقك طوال اليوم.",
      "خيارات صغيرة — قماش يتنفس، وقصّة محتشمة، ولون خالد — تصنع خزانة ملابس تخدم حياتك، لا العكس.",
    ],
  },
  {
    slug: "tips-for-choosing-the-right-attire",
    title: "Tips for Choosing the Right Attire",
    titleAr: "نصائح لاختيار اللباس المناسب",
    image: "/images/lantern.jpg",
    excerpt: "Fabric, fit and occasion — three simple checks before you buy your next thobe or abaya.",
    excerptAr: "القماش والقصّة والمناسبة — ثلاث خطوات بسيطة قبل شراء ثوبك أو عبايتك القادمة.",
    date: "October 28, 2024",
    dateAr: "٢٨ أكتوبر ٢٠٢٤",
    body: [
      "Start with fabric: natural fibres like cotton breathe in warm weather and feel comfortable for long wear. Check the weight — too heavy and it drags, too light and it loses its shape.",
      "Then fit: modest clothing should drape, not cling. Look for a cut that gives you room to move and sit comfortably.",
      "Finally, the occasion. A crisp white thobe works everywhere; an embroidered kurta is made for celebrations. Build your wardrobe around versatile pieces and add special ones for special days.",
    ],
    bodyAr: [
      "ابدأ بالقماش: الألياف الطبيعية مثل القطن تتنفس في الطقس الدافئ وتشعرك بالراحة عند الارتداء الطويل. انتبه للوزن — الثقيل جداً يثقل، والخفيف جداً يفقد شكله.",
      "ثم القصّة: الملابس المحتشمة يجب أن تنساب، لا أن تلتصق. ابحث عن قصّة تمنحك حرية الحركة والجلوس براحة.",
      "وأخيراً المناسبة. الثوب الأبيض الناصع يناسب كل مكان، والكردة المطرزة صُنعت للاحتفالات. ابنِ خزانتك على قطع متعددة الاستخدامات وأضف قطعاً خاصة للأيام الخاصة.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function blogTitle(p: BlogPost, lang: Lang): string {
  return lang === "ar" ? p.titleAr : p.title;
}
export function blogExcerpt(p: BlogPost, lang: Lang): string {
  return lang === "ar" ? p.excerptAr : p.excerpt;
}
export function blogBody(p: BlogPost, lang: Lang): string[] {
  return lang === "ar" ? p.bodyAr : p.body;
}
export function blogDate(p: BlogPost, lang: Lang): string {
  return lang === "ar" ? p.dateAr : p.date;
}

// Prices are in Egyptian pounds (EGP), whole pounds, no decimals.
// English: "EGP 1,900" — Arabic: "1,900 ج.م" (Western digits in both).
export const FREE_SHIPPING_THRESHOLD = 3500; // EGP — free shipping above this
export const SHIPPING_FEE = 480; // EGP flat shipping fee

export function formatPrice(amountEgp: number, lang: Lang = "en"): string {
  const grouped = Math.round(amountEgp).toLocaleString("en-US");
  return lang === "ar" ? `${grouped} ج.م` : `EGP ${grouped}`;
}
