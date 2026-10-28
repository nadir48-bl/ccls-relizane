import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Coins,
  Info,
  Scale,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tag,
} from "lucide-react";
import TutelleBar from "@/components/sections/TutelleBar";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "الأسعار والرزنامة الرسمية لموسم 2026/2027 — تعاونية الحبوب والبقول الجافة غليزان",
  description:
    "جدول أسعار الشراء الرسمية المعتمدة للحبوب والبقول الجافة، شبكة أسعار البذور والأسمدة، والرزنامة الفلاحية المعتمدة لولاية غليزان.",
};

const buyingPrices = [
  {
    crop: "القمح الصلب (Blé Dur)",
    variety: "سيميتو، فيترون، بوثلام، وغيرها",
    basePrice: "4 500 دج",
    bonus: "1 500 دج (منحة تحفيز الدولة)",
    finalPrice: "6 000 دج",
    unit: "للقنطار (100 كغ)",
    highlight: true,
    specs: "نوعية ممتازة، نسبة رطوبة أقل من 14% ونقاوة مطابقة لمعايير OAIC",
  },
  {
    crop: "القمح اللين (Blé Tendre)",
    variety: "أصناف ملائمة لإنتاج الطحين والفرينة",
    basePrice: "4 000 دج",
    bonus: "1 000 دج (منحة الدعم)",
    finalPrice: "5 000 دج",
    unit: "للقنطار (100 كغ)",
    highlight: false,
    specs: "مطابق للشروط التقنية ومواصفات الديوان الجزائري للحبوب",
  },
  {
    crop: "الشعير (Orge)",
    variety: "تيكلت، ريحان، محلي",
    basePrice: "2 800 دج",
    bonus: "600 دج (منحة التحفيز)",
    finalPrice: "3 400 دج",
    unit: "للقنطار (100 كغ)",
    highlight: false,
    specs: "مخصص للأعلاف والبذور ومطاحن الشعير",
  },
  {
    crop: "التريتيكال والخرطال (Triticale & Avoine)",
    variety: "حبوب علفية مصادق عليها",
    basePrice: "2 800 دج",
    bonus: "600 دج",
    finalPrice: "3 400 دج",
    unit: "للقنطار (100 كغ)",
    highlight: false,
    specs: "استلام وتفريغ بمواقع التعاونية المحددة",
  },
  {
    crop: "الحمص المحلي (Pois Chiches)",
    variety: "بقول جافة ممتازة الحجم",
    basePrice: "13 000 دج",
    bonus: "3 000 دج (تشجيع الإنتاج الوطني)",
    finalPrice: "16 000 دج",
    unit: "للقنطار (100 كغ)",
    highlight: true,
    specs: "مفرز ونظيف مع شهادة مطابقة الجودة",
  },
  {
    crop: "العدس المحلي (Lentilles)",
    variety: "أصناف محلية ومكيفة مناخياً",
    basePrice: "10 500 دج",
    bonus: "2 500 دج (دعم البقول الجافة)",
    finalPrice: "13 000 دج",
    unit: "للقنطار (100 كغ)",
    highlight: false,
    specs: "خالٍ من الشوائب ومفرز عبر آلات التعاونية",
  },
  {
    crop: "الفاصوليا الجافة (Haricots Secs)",
    variety: "لوبيا بيضاء منتجة محلياً",
    basePrice: "12 000 دج",
    bonus: "3 000 دج",
    finalPrice: "15 000 دج",
    unit: "للقنطار (100 كغ)",
    highlight: false,
    specs: "تسليم فوري ومستحقات مؤمنة في الآجال القانونية",
  },
];

const inputPrices = [
  {
    category: "بذور القمح الصلب المعالجة والمكيسة (R1/R2)",
    rate: "مدعومة بنسبة 50% من الدولة",
    price: "4 200 دج / ق",
    details: "معالجة ضد الفطريات والحشرات ومضمونة نسبة الإنبات > 90%",
  },
  {
    category: "بذور القمح اللين المصادق عليها",
    rate: "دعم مخصص للمنتجين",
    price: "3 800 دج / ق",
    details: "مكيسة بأوزان 50 كغ ومرفقة ببطاقة التعريف الجينية",
  },
  {
    category: "بذور الشعير المنتقى والمغربل",
    rate: "أسعار تعاونية محددة",
    price: "3 000 دج / ق",
    details: "أصناف مقاومة للجفاف ومكيفة لسهول غليزان ووادي مينة",
  },
  {
    category: "سماد العمق الفوسفاتي (DAP 18-46)",
    rate: "متوفر بكميات كافية",
    price: "سعر مقنن مدعم",
    details: "توزيع مع كشف الحساب والبطاقة الفلاحية",
  },
  {
    category: "سماد التغطية الآزوتي (يوريا Urea 46%)",
    rate: "متوفر بالمخازن",
    price: "سعر تعاوني مدعم",
    details: "جرعات محسوبة حسب طبيعة التربة والتحاليل المخبرية",
  },
];

const calendarPhases = [
  {
    period: "أكتوبر — ديسمبر 2026",
    title: "حملة الحرث والتسميد والبذر",
    badge: "مرحلة جارية",
    badgeColor: "bg-orange/15 text-orange border-orange/30",
    actions: [
      "فتح جميع نقاط ومراكز بيع البذور المعتمدة والأسمدة عبر الولاية.",
      "توزيع سماد العمق (DAP) والبذور المصادق عليها للمنتجين المسجلين.",
      "توفير عتاد الحرث والباذرات الميكانيكية للمنخرطين بأسعار تفضيلية.",
      "انطلاق عقود مكثفي البذور بالتنسيق مع المعهد الوطني لمراقبة البذور (CNCC).",
    ],
  },
  {
    period: "جانفي — فيفري 2027",
    title: "مكافحة الأعشاب والتسميد الآزوتي",
    badge: "توعية تقنية",
    badgeColor: "bg-green/15 text-green border-green/30",
    actions: [
      "تقديم استشارات الإرشاد الفلاحي لاختيار مبيدات الأعشاب رفيعة وعريضة الأوراق.",
      "تطبيق الدفعة الأولى من سماد التغطية (يوريا 46% أو نترات الأمونيوم).",
      "معاينة الحقول لمتابعة الإنبات والكثافة النباتية لكل هكتار.",
    ],
  },
  {
    period: "مارس — ماي 2027",
    title: "حماية المحصول والري التكميلي",
    badge: "متابعة دورية",
    badgeColor: "bg-tint-orange text-orange-deep border-orange/20",
    actions: [
      "مكافحة الأمراض الفطرية (الصدأ الأصفر، السبتوريا، البياض الدقيقي).",
      "تشجيع الري التكميلي أثناء فترتي التزهير وامتلاء الحبوب لتعظيم المردود.",
      "تحضير مراكز التخزين والصوامع لاستقبال محصول الموسم الجديد.",
    ],
  },
  {
    period: "جوان — أوت 2027",
    title: "حملة الحصاد والدرس وتوريد المحاصيل",
    badge: "ذروة الموسم",
    badgeColor: "bg-red/15 text-red border-red/30",
    actions: [
      "تسخير حظيرة الحاصدات والشاحنات لنقل المحصول من الحقل إلى الصوامع.",
      "فتح مراكز الوزن، أخذ العينات والتحليل المخبري لنسب الرطوبة والشوائب.",
      "الدفع الفوري لمستحقات الفلاحين عبر الحسابات البنكية أو البريدية في أقصر الآجال.",
    ],
  },
];

export default function TarifsPage() {
  return (
    <>
      <TutelleBar />
      <Header />

      <main className="bg-bg min-h-screen pb-24 text-ink">
        {/* Page Hero Header */}
        <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-tint-orange/30 via-bg to-bg pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div
            aria-hidden="true"
            className="soft-blob -start-28 top-0 size-[26rem] bg-tint-green"
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
                الأسعار والرزنامة الرسمية
              </span>
            </nav>

            <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3.5 py-1 text-[12px] font-semibold text-orange-deep">
                  <Coins className="size-3.5 shrink-0 text-orange" />
                  <span>الموسم الفلاحي الرسمي 2026 / 2027</span>
                </div>
                <h1 className="display mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.25] text-ink">
                  الأسعار الرسمية والرزنامة الميدانية
                </h1>
                <p className="mt-4 text-[14.5px] leading-[1.9] text-muted sm:text-[15.5px]">
                  دليل معتمد وشامل لأسعار الشراء المضمونة للحبوب والبقول الجافة،
                  أسعار المدخلات الفلاحية المدعمة، ورزنامة مواعيد البذر والحصاد
                  المطبقة لدى تعاونية الحبوب والبقول الجافة لولاية غليزان
                  بالتنسيق مع الديوان الوطني للحبوب (OAIC).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#calendrier"
                  className="btn btn-outline text-[13px] px-5 py-2.5"
                >
                  <Calendar className="size-4 text-orange" />
                  <span>رزنامة الموسم</span>
                </a>
                <Link
                  href="/espace-client"
                  className="btn btn-orange text-[13px] px-5 py-2.5"
                >
                  <span>فتح حساب وتوريد المحصول</span>
                  <ArrowLeft className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Buying Prices Table Section */}
        <section className="py-14 sm:py-20 border-b border-line bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="kicker">أسعار الشراء الرسمية</p>
                <h2 className="display mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">
                  أسعار شراء المحاصيل من الفلاحين (2026/2027)
                </h2>
                <p className="mt-2 text-[13.5px] text-muted">
                  أسعار شراء مضمونة من طرف الدولة مع منحة تحفيزية إضافية تُدفع
                  لكل قنطار مباشرة في الحساب.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-tint-green bg-tint-green/30 px-3.5 py-2 text-[12px] font-medium text-green">
                <ShieldCheck className="size-4 shrink-0" />
                <span>دفع مضمون في الآجال عبر الصك أو التحويل</span>
              </div>
            </div>

            {/* Desktop Table / Mobile Cards */}
            <div className="overflow-x-auto rounded-[20px] border border-line bg-white shadow-soft">
              <table className="w-full min-w-[760px] border-collapse text-start text-[13.5px]">
                <thead>
                  <tr className="border-b border-line bg-bg-alt text-ink/75 font-semibold text-[13px]">
                    <th className="py-4 px-6 text-start">المحصول والصنف</th>
                    <th className="py-4 px-5 text-start">السعر القاعدي</th>
                    <th className="py-4 px-5 text-start">منحة دعم الدولة</th>
                    <th className="py-4 px-5 text-start text-orange-deep font-bold">
                      السعر الصافي للفلاح
                    </th>
                    <th className="py-4 px-6 text-start">المواصفات والشروط</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {buyingPrices.map((item) => (
                    <tr
                      key={item.crop}
                      className={`transition-colors hover:bg-bg-alt/50 ${
                        item.highlight ? "bg-orange/[0.03]" : ""
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm ${
                              item.highlight
                                ? "bg-orange text-white"
                                : "bg-bg-alt text-ink/70"
                            }`}
                          >
                            <Sprout className="size-4" />
                          </span>
                          <div>
                            <span className="font-bold text-ink block">
                              {item.crop}
                            </span>
                            <span className="text-[12px] text-muted">
                              {item.variety}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 font-medium tabular-nums text-ink/80">
                        {item.basePrice}
                      </td>
                      <td className="py-4 px-5 text-[12.5px] font-medium text-green tabular-nums">
                        {item.bonus}
                      </td>
                      <td className="py-4 px-5 tabular-nums">
                        <span className="inline-flex items-baseline gap-1 rounded-lg bg-orange/15 px-2.5 py-1 text-[15px] font-bold text-orange-deep">
                          <span>{item.finalPrice}</span>
                          <span className="text-[11px] font-normal text-muted">
                            / قنطار
                          </span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[12px] text-muted max-w-xs leading-relaxed">
                        {item.specs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-bg-alt px-5 py-3 text-[12.5px] text-muted">
              <div className="flex items-center gap-2">
                <Info className="size-4 shrink-0 text-orange" />
                <span>
                  تُحتسب الأسعار على أساس الوزن الصافي بعد التحليل المخبري لنسبة
                  الرطوبة والأجسام الغريبة.
                </span>
              </div>
              <span className="font-semibold text-ink/70">
                المرجع: المنشور الوزاري المشترك لموسم 2026/2027 — OAIC
              </span>
            </div>
          </div>
        </section>

        {/* Input Prices Section (Seeds & Fertilizers) */}
        <section className="py-14 sm:py-20 border-b border-line bg-bg-alt">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <div className="max-w-2xl mb-10">
              <p className="kicker">المدخلات الفلاحية المدعومة</p>
              <h2 className="display mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">
                أسعار البذور المعالجة والأسمدة الفلاحية
              </h2>
              <p className="mt-2 text-[13.5px] text-muted">
                توفر تعاونية غليزان مختلف أصناف البذور المصادق عليها والمدخلات
                بأسعار تعاونية محددة لضمان أفضل مردودية للهكتار.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {inputPrices.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-tint-green text-green">
                        <Tag className="size-5" />
                      </span>
                      <span className="inline-block rounded-full bg-bg-alt px-3 py-1 text-[11px] font-semibold text-muted">
                        {item.rate}
                      </span>
                    </div>

                    <h3 className="font-display mt-4 text-[16px] font-bold text-ink leading-snug">
                      {item.category}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                      {item.details}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                    <span className="text-[12px] font-medium text-muted">
                      السعر التعاوني:
                    </span>
                    <span className="font-display text-[15px] font-bold text-orange-deep">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}

              {/* Machinery & Rental Card */}
              <div className="flex flex-col justify-between rounded-[20px] border border-dashed border-orange/40 bg-tint-orange/20 p-6">
                <div>
                  <span className="grid size-10 place-items-center rounded-xl bg-orange text-white">
                    <Scale className="size-5" />
                  </span>
                  <h3 className="font-display mt-4 text-[16px] font-bold text-ink">
                    كراء العتاد الفلاحي والحاصدات
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                    جرارات، آلات بذر دقيقة، وحاصدات حديثة متوفرة تحت تصرف فلاحي
                    الولاية بأسعار كراء تفضيلية للمنخرطين.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-orange-deep hover:underline"
                  >
                    <span>تفاصيل كراء العتاد الفلاحي</span>
                    <ArrowLeft className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agricultural Calendar Section */}
        <section id="calendrier" className="py-14 sm:py-24 bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="kicker">رزنامة موسم 2026/2027</p>
                <h2 className="display mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">
                  الرزنامة الفلاحية المعتمدة لولاية غليزان
                </h2>
                <p className="mt-2 text-[13.5px] text-muted">
                  مراحل ومواعيد التدخلات الزراعية، بيع المدخلات، ومتابعة المحاصيل
                  عبر مختلف دوائر وبلديات الولاية.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
                  <Clock className="size-4 text-orange" />
                  <span>تحديث دوري حسب الظروف الجوية</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {calendarPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col justify-between rounded-[22px] border border-line bg-bg p-6 shadow-soft transition-all duration-300 hover:border-orange hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-[12px] font-bold text-muted tabular-nums">
                        المرحلة 0{idx + 1}
                      </span>
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${phase.badgeColor}`}
                      >
                        {phase.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-[12px] font-semibold text-orange-deep">
                      {phase.period}
                    </p>
                    <h3 className="font-display mt-1 text-[17px] font-bold text-ink leading-snug">
                      {phase.title}
                    </h3>

                    <ul className="mt-4 flex flex-col gap-2.5">
                      {phase.actions.map((act, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[12px] leading-relaxed text-muted"
                        >
                          <CheckCircle2 className="size-3.5 shrink-0 text-green mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60">
                    <span className="text-[11px] font-medium text-muted">
                      مواقع الاستقبال: كافة مستودعات وصوامع CCLS غليزان
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Download & Help Banner */}
            <div className="mt-12 rounded-[24px] border border-line bg-gradient-to-r from-tint-green/40 via-white to-tint-orange/30 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-soft">
              <div className="max-w-2xl text-center lg:text-start">
                <h3 className="font-display text-[18px] sm:text-[20px] font-bold text-ink">
                  هل تحتاج إلى استشارة خاصة بمحصولك أو كشف حساب فلاح؟
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  فريقنا التقني والتجاري في خدمتكم يومياً عبر شبكة فروعنا أو من
                  خلال فضاء الزبون الرقمي المباشر.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/espace-client"
                  className="btn btn-orange text-[13px] px-6 py-3"
                >
                  <span>الدخول إلى فضاء الزبون</span>
                  <ArrowLeft className="size-4" />
                </Link>
                <Link
                  href="/conseil-agricole"
                  className="btn btn-outline text-[13px] px-5 py-3"
                >
                  <Sparkles className="size-4 text-orange" />
                  <span>دليل الإرشاد الفلاحي</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
