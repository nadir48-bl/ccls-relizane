import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Droplets,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Sprout,
  Users,
  Wheat,
} from "lucide-react";
import TutelleBar from "@/components/sections/TutelleBar";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "دليل الإرشاد الفلاحي — تعاونية الحبوب والبقول الجافة غليزان",
  description:
    "الإرشادات التقنية والتوجيهات الميدانية لفلاحي ولاية غليزان: التسميد العقلاني، مكافحة الأعشاب الضارة، اختيار أصناف البذور الملائمة، والري التكميلي لتعظيم المحصول.",
};

const guideSections = [
  {
    id: "varietes",
    title: "اختيار أصناف البذور الملائمة لولاية غليزان",
    category: "البذور والإنبات",
    icon: Wheat,
    color: "text-orange bg-tint-orange",
    summary:
      "تتطلب خصائص التربة ومناخ سهول غليزان (سهل الشلف السفلي وسهل مينة) اختيار أصناف معتمدة ومقاومة للإجهاد المائي.",
    tips: [
      "القمح الصلب: يُنصح بزراعة صنف «سيميتو (Simeto)» و«فيترون (Vitron)» لغزارة إنتاجهما ومقاومتهما للحرارة، وصنف «بوثلام (Bousselam)» للمناطق المرتفعة كعمي موسى وسيدي امحمد بن علي.",
      "القمح اللين: اعتماد أصناف ذات قدرة إنبات عالية وجودة جيدة لصناعة الفرينة.",
      "الشعير: صنف «تيكلت (Ticlat)» و«صايدة» نظراً لتحملهما العالي للجفاف وملوحة بعض أراضي السهل.",
      "استعمال حصري للبذور المصادق عليها (R1 أو R2) المعالجة بمبيدات الفطريات لضمان نسبة إنبات تتجاوز 90%.",
    ],
  },
  {
    id: "fertilisation",
    title: "التسميد العقلاني ومراحل التدخل الغذائي",
    category: "تغذية النبات",
    icon: Sprout,
    color: "text-green bg-tint-green",
    summary:
      "تطبيق التسميد على دفعات وفق الاحتياجات الفعلية للنبات لتفادي الضياع وضمان بناء سنابل مكتنزة.",
    tips: [
      "التسميد القاعدي (سماد العمق): وضع سماد DAP (18-46) بمعدل 100 إلى 150 كغ/هكتار أثناء تحضير مهد البذور لتعزيز تجذير النبات.",
      "سماد التغطية (الآزوت N): تقسيم الجرعة إلى دفعتين (مرحلة التفريع والتطاول) باستعمال اليوريا 46% أو نترات الأمونيوم بمعدل 100 إلى 120 كغ/هكتار.",
      "تجنب رمي الآزوت في فترات الجفاف الحاد وتفضيل توقيته مع نزول الأمطار أو عقب عمليات السقي التكميلي.",
      "إجراء تحاليل دورية للتربة عبر المحطة التقنية للتعاونية لتحديد نسب الملوحة والمواد العضوية بدقة.",
    ],
  },
  {
    id: "desherbage",
    title: "المكافحة المتكاملة للأعشاب الضارة",
    category: "حماية النبات",
    icon: ShieldAlert,
    color: "text-red bg-red/10",
    summary:
      "تشكل الأعشاب الضارة المنافس الأول للحبوب على الماء والسماد، مما قد يسبب خسارة تتجاوز 40% من المحصول إن لم تُعالج مبكراً.",
    tips: [
      "التدخل المبكر بين مرحلتي 3 ورقات ونهاية التفريع، عندما تكون الأعشاب في طور النمو الأولي الحساس.",
      "الأعشاب عريضة الأوراق (Moutarde, Chardon): استعمال مبيدات هرمونية مرخصة من طرف وزارة الفلاحة.",
      "الأعشاب رفيعة الأوراق (Folle avoine, Phalaris): استعمال مبيدات متخصصة مع مراعاة حجم الرشاش وضغط المضخة (2 إلى 3 بار).",
      "احترام حجم المياه الموصى به (150 إلى 200 لتر/هكتار) وتفادي الرش أثناء هبوب الرياح القوية أو ارتفاع درجات الحرارة.",
    ],
  },
  {
    id: "irrigation",
    title: "الري التكميلي لإنقاذ وتعظيم المردود",
    category: "إدارة المياه",
    icon: Droplets,
    color: "text-blue-600 bg-blue-50",
    summary:
      "يمثل الري التكميلي في فترات انحباس الأمطار الضمان الأساسي للوصول إلى مردود يتجاوز 45 قنطار/هكتار في غليزان.",
    tips: [
      "الري أثناء مرحلة التطاول وخروج السنبلة (Montaison / Épiaison) هو الأكثر تأثيراً على عدد الحبات في السنبلة.",
      "الري في مرحلة امتلاء الحبوب (Remplissage des grains) لمنع ظاهرة ضمور الحبوب (Échaudage) الناتجة عن رياح السيروكو.",
      "اعتماد أساليب السقي المقتصدة في المياه كالرش المحوري (Pivot) أو الرش بالانتقال الآلي لتقليل الهدر المائي.",
    ],
  },
];

const engineers = [
  {
    name: "مصلحة الإرشاد والتنمية الفلاحية",
    role: "متابعة الحقول والمكثفين",
    zone: "المقر الرئيسي — وادي الجمعة — الحمادنة",
    phone: "046 92 11 00",
    email: "agronomie@ccls-relizane.dz",
  },
  {
    name: "الخلية التقنية لدائرة وادي ارهيو",
    role: "مرافقة فلاحي سهل الشلف السفلي",
    zone: "وادي ارهيو — جديوية — حمري",
    phone: "046 92 11 05",
    email: "contact@ccls-relizane.dz",
  },
  {
    name: "الخلية التقنية لدائرة سيدي امحمد بن علي",
    role: "مرافقة زراعة الحبوب بالهضاب",
    zone: "سيدي امحمد بن علي — مازونة — مديونة",
    phone: "046 92 11 08",
    email: "contact@ccls-relizane.dz",
  },
];

const faqs = [
  {
    q: "متى يحق للفلاح الحصول على بذور مكثفة معتمدة؟",
    a: "يمكن لجميع الفلاحين المسجلين أو الحاملين لبطاقة الفلاح التقدم إلى أقرب نقطة بيع تابعة لتعاونية غليزان مصحوبين بالملف الإداري للحصول على حصصهم المدعومة فور انطلاق الحملة في الفاتح من أكتوبر.",
  },
  {
    q: "هل توفر التعاونية خدمة الفحص المخبري للتربة والإنبات؟",
    a: "نعم، تمتلك التعاونية مخبراً معتمداً يقوم بفحص عينات البذور والتأكد من نقاوتها ونسبة إنباتها، بالإضافة إلى تقديم توصيات تقنية مخصصة لكل قطعة أرضية.",
  },
  {
    q: "كيف أستفيد من كراء عتاد البذر والرش والحصاد؟",
    a: "يكفي التقدم بطلب عبر فضاء الزبون أو التوجه لمصلحة العتاد بمقر التعاونية لحجز المعدات وفق جدول زمني محدد مع توفير سائقين ذوي خبرة ميدانية عالية.",
  },
];

export default function ConseilAgricolePage() {
  return (
    <>
      <TutelleBar />
      <Header />

      <main className="bg-bg min-h-screen pb-24 text-ink">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-tint-green/30 via-bg to-bg pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div
            aria-hidden="true"
            className="soft-blob -start-28 top-0 size-[26rem] bg-tint-orange"
          />
          <div
            aria-hidden="true"
            className="ring-mark end-[-6rem] top-10 size-[22rem]"
          />

          <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            {/* Breadcrumb */}
            <nav
              aria-label="مسار التصفح"
              className="flex items-center gap-2 text-[12.5px] font-medium text-muted"
            >
              <Link href="/" className="transition-colors hover:text-orange">
                الرئيسية
              </Link>
              <ChevronLeft className="size-3.5 opacity-50" />
              <span className="text-orange-deep font-semibold">
                الإرشاد الفلاحي والتوجيه التقني
              </span>
            </nav>

            <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3.5 py-1 text-[12px] font-semibold text-green">
                  <BookOpen className="size-3.5 shrink-0" />
                  <span>المرافقة التقنية الميدانية لفلاحي الولاية</span>
                </div>
                <h1 className="display mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.25] text-ink">
                  دليل الإرشاد الفلاحي والممارسات الزراعية المثلى
                </h1>
                <p className="mt-4 text-[14.5px] leading-[1.9] text-muted sm:text-[15.5px]">
                  تضع تعاونية الحبوب والبقول الجافة لولاية غليزان خبرة مهندسيها
                  الزراعيين بين أيدي الفلاحين والمربين لضمان نجاح المسار التقني
                  لشعبة الحبوب من تحضير التربة حتى الحصاد.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#conseils-tech"
                  className="btn btn-outline text-[13px] px-5 py-2.5"
                >
                  <Wheat className="size-4 text-orange" />
                  <span>الإرشادات التقنية</span>
                </a>
                <a
                  href="#equipe-tech"
                  className="btn btn-orange text-[13px] px-5 py-2.5"
                >
                  <Phone className="size-4" />
                  <span>الاتصال بالمهندس الزراعي</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Guides Section */}
        <section id="conseils-tech" className="py-14 sm:py-20 border-b border-line bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <div className="max-w-2xl mb-12">
              <p className="kicker">محاور المسار التقني</p>
              <h2 className="display mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">
                أهم التوصيات لرفع المردودية وحماية المحصول
              </h2>
              <p className="mt-2 text-[13.5px] text-muted">
                ممارسات علمية وميدانية أثبتت نجاعتها في مناخ وتربة ولاية غليزان.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {guideSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <div
                    key={sec.id}
                    className="flex flex-col justify-between rounded-[24px] border border-line bg-bg p-7 sm:p-9 shadow-soft transition-all duration-300 hover:border-orange/50 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`grid size-12 shrink-0 place-items-center rounded-2xl ${sec.color}`}
                        >
                          <Icon className="size-6" />
                        </span>
                        <span className="rounded-full bg-white border border-line px-3.5 py-1 text-[11.5px] font-semibold text-muted">
                          {sec.category}
                        </span>
                      </div>

                      <h3 className="font-display mt-5 text-[18px] sm:text-[20px] font-bold text-ink leading-snug">
                        {sec.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                        {sec.summary}
                      </p>

                      <div className="mt-6 pt-6 border-t border-line/60">
                        <h4 className="text-[12.5px] font-bold text-ink/80 mb-3">
                          النقاط الأساسية للمتابعة:
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {sec.tips.map((tip, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted"
                            >
                              <CheckCircle2 className="size-4 shrink-0 text-green mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technical Engineers & Contact Section */}
        <section id="equipe-tech" className="py-14 sm:py-20 border-b border-line bg-bg-alt">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <p className="kicker">فريقنا الميداني</p>
                <h2 className="display mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">
                  الخلايا التقنية للإرشاد الزراعي عبر ولاية غليزان
                </h2>
                <p className="mt-2 text-[13.5px] text-muted">
                  مهندسون وتقنيون زراعيون رهن إشارتكم لزيارة الحقول وتقديم الدعم
                  الفني طيلة الموسم.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-orange/30 bg-tint-orange/40 px-3.5 py-2 text-[12px] font-medium text-orange-deep">
                <Users className="size-4 shrink-0 text-orange" />
                <span>زيارات ميدانية مجانية للمنخرطين</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {engineers.map((eng, idx) => (
                <div
                  key={idx}
                  className="rounded-[22px] border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-orange hover:shadow-md"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-tint-green text-green mb-4">
                    <MapPin className="size-5" />
                  </span>
                  <h3 className="font-display text-[16.5px] font-bold text-ink">
                    {eng.name}
                  </h3>
                  <p className="mt-1 text-[12px] font-medium text-orange-deep">
                    {eng.role}
                  </p>

                  <div className="mt-4 pt-4 border-t border-line/60 flex flex-col gap-2 text-[12px] text-muted">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-muted shrink-0" />
                      <span>{eng.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-3.5 text-orange shrink-0" />
                      <span dir="ltr" className="font-medium text-ink/80">
                        {eng.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="size-3.5 text-muted shrink-0" />
                      <span className="truncate">{eng.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <div className="max-w-2xl mb-10">
              <p className="kicker">أسئلة شائعة</p>
              <h2 className="display mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">
                أبرز استفسارات الفلاحين والمكثفين
              </h2>
            </div>

            <div className="grid gap-4 max-w-4xl">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-[18px] border border-line bg-bg p-5 sm:p-6 shadow-soft"
                >
                  <h3 className="font-display text-[15px] sm:text-[16px] font-bold text-ink flex items-start gap-2.5">
                    <HelpCircle className="size-4 shrink-0 text-orange mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted pe-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
