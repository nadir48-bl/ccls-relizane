/**
 * Single source of truth for every visible string on the page.
 *
 * PLACEHOLDERS are intentionally kept here, exactly as supplied by the client.
 * Replace the values below and nothing else in the codebase needs to change.
 */

export const placeholders = {
  ADDRESS: "[[ADDRESS]]",
  PHONE: "[[PHONE]]",
  EMAIL: "[[EMAIL]]",
  LINK_PRIX: "[[LINK-PRIX]]",
  LINK_CONSEILS: "[[LINK-CONSEILS]]",
  LINK_ESPACE: "[[LINK-ESPACE]]",
  LINK_ESPACE_PROD: "[[LINK-ESPACE-PROD]]",
  LINK_ESPACE_ACHETEUR: "[[LINK-ESPACE-ACHETEUR]]",
  STAT_YEARS: "[[STAT-YEARS]]",
  STAT_CLIENTS: "[[STAT-CLIENTS]]",
  STAT_SITES: "[[STAT-SITES]]",
  STAT_CAPACITY: "[[STAT-CAPACITY]]",
  N_SITES: "[[N_SITES]]",
} as const;

/** Future routes resolve to "#" until the destination pages exist. */
const futureLink = "#";

/** Current figures supplied in the brief; tokens above stay ready for the real data. */
export const figures = {
  years: "99+",
  clients: "6 000+",
  sites: "07",
  capacity: "1,2 مليون",
};

export const site = {
  brandLatin: "CCLS RELIZANE",
  brandSubtitle: "تعاونية الحبوب والبقول الجافة — غليزان",
  title: "تعاونية الحبوب والبقول الجافة غليزان",
  description:
    "تعاونية الحبوب والبقول الجافة غليزان: بذور مصادَق عليها، أسمدة، جمع المحاصيل، تكثيف البذور وكراء العتاد الفلاحي.",
  ogAlt: "حقل قمح ذهبي عند غروب الشمس في ولاية غليزان",
  logoAlt: "شعار تعاونية الحبوب والبقول الجافة غليزان",
  footerDescription:
    "تعاونية الحبوب والبقول الجافة لولاية غليزان، في خدمة الفلاحين من الحقل إلى المخزن.",
};

export const tutelle = {
  items: [
    "الجمهورية الجزائرية الديمقراطية الشعبية",
    "وزارة الفلاحة والتنمية الريفية والصيد البحري",
    "الديوان الجزائري المهني للحبوب (OAIC)",
  ],
  languages: {
    arabic: "ع",
    french: "FR",
    frenchLabel: "Français",
    arabicLabel: "العربية",
    groupLabel: "اللغات",
  },
};

export const nav = {
  items: [
    { label: "الرئيسية", href: "#top", spy: "top" },
    { label: "التعاونية", href: "#chiffres", spy: "chiffres" },
    { label: "شبكتنا", href: "#reseau", spy: "reseau" },
    { label: "الخدمات", href: "#services", spy: "services" },
    { label: "الأسعار والرزنامة", href: futureLink, spy: null },
    { label: "الإرشاد الفلاحي", href: futureLink, spy: null },
    { label: "فضاء الزبون", href: futureLink, spy: null },
    { label: "تواصل", href: "#contact", spy: "contact" },
  ],
  cta: "فضاء الزبون",
  menuLabel: "فتح القائمة",
  closeLabel: "إغلاق القائمة",
  navLabel: "التنقل الرئيسي",
};

export const hero = {
  eyebrow: "CCLS RELIZANE",
  title: "تعاونية الحبوب والبقول الجافة غليزان",
  titleLines: ["تعاونية الحبوب", "والبقول الجافة", "غليزان"],
  primaryCta: "كيف أفتح حسابي في التعاونية؟",
  secondaryCta: "اكتشف خدماتنا",
  image: {
    src: "/hero-wheat.webp",
    alt: "حقل قمح ذهبي تمتد سنابله تحت ضوء الشمس عند الغروب",
  },
  chips: [
    {
      value: "07",
      unit: "مواقع",
      label: "عبر الولاية",
      token: placeholders.STAT_SITES,
    },
    {
      value: "6 000+",
      unit: "زبون",
      label: "من فلاحين ومربّين",
      token: placeholders.STAT_CLIENTS,
    },
  ],
};

export const flash = {
  label: "جديد",
  ariaLabel: "آخر الإعلانات",
  items: [
    "انطلاق حملة الحرث والبذر 2026/2027 في 01 أكتوبر",
    "مختلف المدخلات الفلاحية متوفرة لدى تعاونيتكم",
    "العتاد الفلاحي متوفر تحت تصرفكم",
  ],
};

export const news = {
  kicker: "آخر الأخبار والإعلانات",
  titleBefore: "مستجدات ",
  titleEm: "التعاونية",
  pauseLabel: "إيقاف التشغيل",
  playLabel: "تشغيل العرض",
  progressLabel: "تقدم العرض",
  listLabel: "قائمة الأخبار",
  updatedLabel: "آخر تحديث",
  countLabel: "أخبار",
  previousLabel: "الخبر السابق",
  nextLabel: "الخبر التالي",
  slides: [
    {
      id: "campagne-labour",
      badge: "إعلان هام",
      date: "29 سبتمبر 2026",
      title: "انطلاق حملة الحرث والبذر 2026/2027",
      excerpt:
        "تُفتح جميع نقاط بيع البذور ابتداءً من 01 أكتوبر، والتعاونية في خدمة الفلاحين طوال الحملة.",
      image: {
        src: "/news-sowing.webp",
        alt: "آلة بذر تجرها جرار في حقل فلاحي",
      },
    },
    {
      id: "journee-conseil",
      badge: null,
      date: "1 أكتوبر 2026",
      title: "اليوم الوطني للإرشاد الفلاحي",
      excerpt:
        "احتضنت الولاية فعاليات اليوم الوطني للإرشاد الفلاحي المصادف للفاتح أكتوبر، بمشاركة الفلاحين والمؤسسات الفلاحية.",
      image: {
        src: "/news-field.webp",
        alt: "سنابل قمح ذهبية في حقل مفتوح",
      },
    },
    {
      id: "materiel-agricole",
      badge: "توعية ميدانية",
      date: "29 سبتمبر 2026",
      title: "تسخير العتاد الفلاحي",
      excerpt:
        "تضع التعاونية عتادها الفلاحي من جرارات وآلات البذر في خدمة الفلاحين لضمان السير الحسن للحملة.",
      image: {
        src: "/news-machine.webp",
        alt: "جرار فلاحي يعمل في حقل",
      },
    },
    {
      id: "semences-disponibles",
      badge: "توفر البذور",
      date: "29 سبتمبر 2026",
      title: "البذور متوفرة لدى التعاونية",
      excerpt: "كميات معتبرة من البذور متوفرة حاليا بمخازن التعاونية.",
      image: {
        src: "/news-seeds.webp",
        alt: "بذور حبوب في أكياس داخل مخزن",
      },
    },
  ],
};

export const shortcuts = {
  kicker: "وصول سريع",
  countLabel: "اختصارات",
  title: "ما تبحث عنه غالباً",
  items: [
    {
      icon: "tag",
      title: "أسعار الشراء",
      subtitle: "قمح صلب، ليّن، شعير وبقول جافة",
      href: futureLink,
    },
    {
      icon: "calendar",
      title: "رزنامة موسم 2026/2027",
      subtitle: "مواعيد الحرث والبذر والحصاد",
      href: futureLink,
    },
    {
      icon: "file-text",
      title: "الوثائق المطلوبة",
      subtitle: "ملف فتح حساب لدى التعاونية",
      href: "#adhesion",
    },
    {
      icon: "map-pin",
      title: "أقرب موقع إليك",
      subtitle: `${figures.sites} مواقع عبر الولاية`,
      href: "#reseau",
    },
    {
      icon: "tractor",
      title: "كراء العتاد الفلاحي",
      subtitle: "جرارات، حاصدات وباذرات",
      href: "#services",
    },
  ],
};

export type StatItem = {
  value: number;
  suffix?: string;
  decimals?: number;
  pad?: number;
  unit?: string;
  label: string;
  token: string;
};

export const stats: {
  id: string;
  networkId: string;
  kicker: string;
  title: string;
  lede: string;
  items: StatItem[];
} = {
  id: "chiffres",
  networkId: "reseau",
  kicker: "أرقامنا",
  title: "ثقة تُزرع منذ 1927",
  lede: "من الحقل إلى المخزن، أرقام بسيطة تحكي قصة كبيرة: تعاونية قريبة من الفلاحين، حاضرة في كل ربوع الولاية.",
  items: [
    {
      value: 99,
      suffix: "+",
      label: "سنة في خدمة الفلاح",
      token: placeholders.STAT_YEARS,
    },
    {
      value: 6000,
      suffix: "+",
      label: "زبون من فلاحين ومربّين",
      token: placeholders.STAT_CLIENTS,
    },
    {
      value: 7,
      pad: 2,
      label: "مواقع عبر الولاية",
      token: placeholders.STAT_SITES,
    },
    {
      value: 1.2,
      decimals: 1,
      unit: "مليون",
      label: "قنطار من قدرة التخزين",
      token: placeholders.STAT_CAPACITY,
    },
  ],
};

export const services = {
  id: "services",
  kicker: "خدماتنا",
  title: "موسمك يبدأ من هنا: كل ما تحتاجه في تعاونيتك",
  lede: "خمس خدمات كبرى تغطي الموسم كاملاً، من تحضير الأرض إلى جمع محاصيلك.",
  items: [
    {
      number: "01",
      title: "البذور والأسمدة",
      description:
        "بذور مصادَق عليها من القمح الصلب واللين والشعير والتريتيكال والخرطال، وبذور البقول الجافة، وأسمدة القاعدة والتغطية.",
    },
    {
      number: "02",
      title: "جمع المحاصيل",
      description:
        "استلام القمح والشعير والبقول عبر مواقعنا، وزن وتحليل شفاف ودفع وفق أسعار الشراء.",
    },
    {
      number: "03",
      title: "برنامج تكثيف البذور",
      description:
        "عقود تكثيف مع متابعة القطع الأرضية، مراقبة الأجيال، والمصادقة على البذور المنتَجة.",
    },
    {
      number: "04",
      title: "كراء العتاد الفلاحي",
      description:
        "حظيرة جرارات وحاصدات وباذرات بالكراء، مع سائق أو بدونه.",
    },
    {
      number: "05",
      title: "بيع وتسويق المحاصيل",
      description:
        "تموين المطاحن المتعاقدة بالقمح، وبيع البقول الجافة للمحوّلين وتجار الجملة، مع التوضيب والبيع بالتجزئة.",
    },
  ],
};

export const accountCta = {
  id: "adhesion",
  title:
    "شريكك الموثوق في تنمية نشاطك الفلاحي والتجاري",
  description:
    "افتح حسابك واستفد من خدماتنا الفلاحية والتجارية.",  primaryCta: "دليل فتح الحساب والوثائق المطلوبة",
  secondaryCta: "اتصل بنا",
};

export const footer = {
  id: "contact",
  quickLinksTitle: "روابط سريعة",
  quickLinks: [
    { label: "التعاونية", href: "#chiffres" },
    { label: "شبكتنا", href: "#reseau" },
    { label: "الخدمات", href: "#services" },
    { label: "الأسعار والرزنامة", href: futureLink },
    { label: "الإرشاد الفلاحي", href: futureLink },
    { label: "تواصل", href: "#contact" },
  ],
  spacesTitle: "الفضاءات",
  spaces: [
    {
      label: "فضاء منتجي الحبوب والبقول الجافة",
      href: futureLink,
      token: placeholders.LINK_ESPACE_PROD,
    },
    {
      label: "فضاء مشتري البقول الجافة",
      href: futureLink,
      token: placeholders.LINK_ESPACE_ACHETEUR,
    },
  ],
  contactTitle: "تواصل",
  contact: {
    address: placeholders.ADDRESS,
    phone: placeholders.PHONE,
    email: placeholders.EMAIL,
    hours: "الأحد – الخميس : 08:00 – 16:30",
  },
  copyrightYear: "© 2026",
  copyrightText:
    "تعاونية الحبوب والبقول الجافة غليزان. جميع الحقوق محفوظة.",
};

export const a11y = {
  skipToContent: "تخطى إلى المحتوى",
  scrollProgress: "تقدم التصفح",
  backToTop: "العودة إلى الأعلى",
};
