"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  FilePlus,
  FileText,
  LayoutDashboard,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sprout,
  Tractor,
  TrendingUp,
  Wheat,
} from "lucide-react";

type TabId = "overview" | "producer" | "buyer" | "dossier";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [submitted, setSubmitted] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  // Sample Delivery Slips (وصولات الدفع والتوريد)
  const deliverySlips = [
    {
      id: "BL-2026-0842",
      crop: "قمح صلب (سيميتو)",
      site: "صومعة وادي الجمعة",
      date: "24 جوان 2026",
      grossWeight: "145.2 قنطار",
      humidity: "11.8%",
      amount: "871 200 دج",
      status: "تم الدفع",
      statusColor: "bg-green/15 text-green border-green/30",
    },
    {
      id: "BL-2026-0619",
      crop: "قمح لين (فرينة)",
      site: "مستودع الحمادنة",
      date: "18 جوان 2026",
      grossWeight: "98.0 قنطار",
      humidity: "12.1%",
      amount: "490 000 دج",
      status: "تم الدفع",
      statusColor: "bg-green/15 text-green border-green/30",
    },
    {
      id: "BL-2026-0155",
      crop: "شعير محلي",
      site: "نقطة وادي ارهيو",
      date: "12 جوان 2026",
      grossWeight: "62.5 قنطار",
      humidity: "10.9%",
      amount: "212 500 دج",
      status: "قيد التحويل",
      statusColor: "bg-orange/15 text-orange border-orange/30",
    },
  ];

  // Sample Machinery Reservations (حجوزات العتاد)
  const machineryBookings = [
    {
      id: "EQ-104",
      machinery: "باذرة ميكانيكية دقيقة (17 خط)",
      date: "15 نوفمبر 2026",
      duration: "03 أيام",
      driver: "مع سائق معتمد",
      status: "مؤكد وجاهز",
      statusColor: "bg-green/15 text-green border-green/30",
    },
    {
      id: "EQ-088",
      machinery: "جرار فلاحي 120 حصان مع آلة حرث",
      date: "02 نوفمبر 2026",
      duration: "04 أيام",
      driver: "مع سائق معتمد",
      status: "قيد المراجعة",
      statusColor: "bg-orange/15 text-orange border-orange/30",
    },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10 py-10">
      {/* Top Welcome Card */}
      <div className="relative overflow-hidden rounded-[26px] border border-line bg-gradient-to-r from-tint-green/40 via-white to-tint-orange/20 p-6 sm:p-8 lg:p-10 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-3 py-0.5 text-[11.5px] font-semibold text-green">
                <BadgeCheck className="size-3.5" />
                <span>فضاء الزبون المعتمد</span>
              </span>
              <span className="text-[12px] font-medium text-muted">
                CCLS Relizane Portal
              </span>
            </div>
            <h2 className="font-display mt-3 text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-ink leading-tight">
              لوحة التحكم والمتابعة الفلاحية
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
              منصة رقمية موحدة لخدمة فلاحي الولاية، مكثفي البذور والمطاحن
              والمحولين: تتبع طلبات البذور، وصولات تسليم المحصول، كراء العتاد
              والاستفادة من برامج الدعم.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("dossier")}
              className="btn btn-orange text-[13px] px-5 py-2.5 shadow-sm"
            >
              <FilePlus className="size-4" />
              <span>طلب فتح حساب جديد</span>
            </button>
            <Link
              href="/#contact"
              className="btn btn-outline text-[13px] px-4 py-2.5"
            >
              <Phone className="size-4 text-orange" />
              <span>الاتصال بالخلية التجارية</span>
            </Link>
          </div>
        </div>

        {/* Quick Nav Tabs Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line/70 pt-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-ink text-white shadow-sm"
                : "bg-white/80 text-ink/70 hover:bg-white hover:text-ink border border-line"
            }`}
          >
            <LayoutDashboard className="size-4" />
            <span>نظرة عامة وإحصائيات</span>
          </button>

          <button
            onClick={() => setActiveTab("producer")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
              activeTab === "producer"
                ? "bg-orange text-white shadow-sm"
                : "bg-white/80 text-ink/70 hover:bg-white hover:text-ink border border-line"
            }`}
          >
            <Wheat className="size-4" />
            <span>فضاء الفلاحين والمنتجين</span>
          </button>

          <button
            onClick={() => setActiveTab("buyer")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
              activeTab === "buyer"
                ? "bg-green text-white shadow-sm"
                : "bg-white/80 text-ink/70 hover:bg-white hover:text-ink border border-line"
            }`}
          >
            <Building2 className="size-4" />
            <span>فضاء المطاحن والمحولين</span>
          </button>

          <button
            onClick={() => setActiveTab("dossier")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
              activeTab === "dossier"
                ? "bg-orange-deep text-white shadow-sm"
                : "bg-white/80 text-ink/70 hover:bg-white hover:text-ink border border-line"
            }`}
          >
            <ClipboardList className="size-4" />
            <span>ملف فتح الحساب والوثائق</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="mt-8 space-y-8 animate-fade-in">
          {/* Top Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[20px] border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-muted">
                  إجمالي المحصول المورد (2026)
                </span>
                <span className="grid size-9 place-items-center rounded-xl bg-tint-green text-green">
                  <Wheat className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-[24px] font-bold text-ink">
                305.7 <span className="text-[14px] font-normal text-muted">قنطار</span>
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-green">
                <TrendingUp className="size-3" />
                <span>تم التحليل والتسليم بنجاح</span>
              </span>
            </div>

            <div className="rounded-[20px] border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-muted">
                  مستحقات الشراء المحولة
                </span>
                <span className="grid size-9 place-items-center rounded-xl bg-tint-orange text-orange">
                  <TrendingUp className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-[24px] font-bold text-ink">
                1 573 700 <span className="text-[14px] font-normal text-muted">دج</span>
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-muted">
                <span>تم تسوية 100% من الملفات</span>
              </span>
            </div>

            <div className="rounded-[20px] border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-muted">
                  حصة البذور المعتمدة المحجوزة
                </span>
                <span className="grid size-9 place-items-center rounded-xl bg-orange/15 text-orange-deep">
                  <Sprout className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-[24px] font-bold text-ink">
                45 <span className="text-[14px] font-normal text-muted">قنطار R1</span>
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-orange-deep">
                <span>جاهزة للاستلام بمخزن وادي الجمعة</span>
              </span>
            </div>

            <div className="rounded-[20px] border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-muted">
                  حالة حساب الفلاح
                </span>
                <span className="grid size-9 place-items-center rounded-xl bg-tint-green text-green">
                  <ShieldCheck className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-[22px] font-bold text-green">
                نشط ومعتمد
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-muted">
                <span>رقم الانخراط: CCLS-48-2026-F981</span>
              </span>
            </div>
          </div>

          {/* Recent Slips & Bookings Grid */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Slips table */}
            <div className="lg:col-span-8 rounded-[22px] border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display text-[17px] font-bold text-ink">
                    آخر وصولات توريد ودفع المحصول
                  </h3>
                  <p className="text-[12px] text-muted">
                    سجل التوريدات عبر مختلف مراكز وصوامع التعاونية
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("producer")}
                  className="text-[12.5px] font-semibold text-orange-deep hover:underline"
                >
                  عرض كافة الوصولات
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-start text-[13px]">
                  <thead>
                    <tr className="border-b border-line bg-bg-alt text-muted text-[12px] font-semibold">
                      <th className="py-3 px-4 text-start">رقم الوصل</th>
                      <th className="py-3 px-4 text-start">المحصول</th>
                      <th className="py-3 px-4 text-start">الموقع</th>
                      <th className="py-3 px-4 text-start">الوزن</th>
                      <th className="py-3 px-4 text-start">المبلغ</th>
                      <th className="py-3 px-4 text-start">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {deliverySlips.map((slip) => (
                      <tr key={slip.id} className="hover:bg-bg-alt/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-ink">
                          {slip.id}
                        </td>
                        <td className="py-3.5 px-4 text-muted">{slip.crop}</td>
                        <td className="py-3.5 px-4 text-[12px] text-muted">
                          {slip.site}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-ink tabular-nums">
                          {slip.grossWeight}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-orange-deep tabular-nums">
                          {slip.amount}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${slip.statusColor}`}
                          >
                            {slip.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Machinery Bookings */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-[22px] border border-line bg-white p-6 shadow-soft">
                <h3 className="font-display text-[16px] font-bold text-ink mb-4">
                  حجوزات العتاد الفلاحي
                </h3>
                <div className="space-y-3">
                  {machineryBookings.map((b) => (
                    <div
                      key={b.id}
                      className="rounded-xl border border-line bg-bg p-3.5 text-[12.5px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">{b.machinery}</span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${b.statusColor}`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-muted text-[11.5px]">
                        <span>الموعد: {b.date}</span>
                        <span>{b.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("producer")}
                  className="mt-4 w-full rounded-xl border border-dashed border-orange/40 bg-tint-orange/20 py-2.5 text-center text-[12px] font-bold text-orange-deep hover:bg-orange/20 transition-colors"
                >
                  + حجز آلة بذر أو جرار جديد
                </button>
              </div>

              {/* Assistance Box */}
              <div className="rounded-[22px] border border-line bg-gradient-to-br from-tint-green/40 to-bg p-5 shadow-soft">
                <div className="flex items-center gap-2 text-green font-bold text-[13px]">
                  <Phone className="size-4" />
                  <span>المساعدة التقنية والتجارية</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  مصلحة متابعة الفلاحين مفتوحة من الأحد إلى الخميس من 08:00 إلى
                  16:30 للرد على كافة انشغالاتكم.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[13px] font-bold text-ink">
                  <span dir="ltr">046 92 11 00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCER SPACE */}
      {activeTab === "producer" && (
        <div className="mt-8 space-y-8 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Seeds Request */}
            <div className="rounded-[22px] border border-line bg-white p-6 shadow-soft flex flex-col justify-between">
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-tint-orange text-orange mb-4">
                  <Sprout className="size-6" />
                </span>
                <h3 className="font-display text-[17px] font-bold text-ink">
                  طلب البذور المصادق عليها والأسمدة
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  حجز كميات البذور المعالجة (قمح صلب، لين، شعير، بقول) وأسمدة
                  العمق والتغطية لموسم 2026/2027.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <button
                  onClick={() => alert("سيتم توجيهك إلى استمارة حجز البذور لدى أقرب صومعة تابعة لموقعك.")}
                  className="btn btn-orange w-full text-[12.5px] py-2"
                >
                  تقديم طلب بذور وأسمدة
                </button>
              </div>
            </div>

            {/* Card 2: Machinery Booking */}
            <div className="rounded-[22px] border border-line bg-white p-6 shadow-soft flex flex-col justify-between">
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-tint-green text-green mb-4">
                  <Tractor className="size-6" />
                </span>
                <h3 className="font-display text-[17px] font-bold text-ink">
                  حجز العتاد الفلاحي والحاصدات
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  كراء الجرارات، آلات البذر، صهاريج السقي والحاصدات المتطورة بأسعار
                  تعاونية معتمدة.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <button
                  onClick={() => alert("تم فتح جدول الحجوزات: يرجى تحديد نوع الآلة وتاريخ التدخل.")}
                  className="btn btn-outline w-full text-[12.5px] py-2"
                >
                  حجز عتاد فلاحي
                </button>
              </div>
            </div>

            {/* Card 3: Seed Multiplication */}
            <div className="rounded-[22px] border border-line bg-white p-6 shadow-soft flex flex-col justify-between">
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-tint-orange text-orange-deep mb-4">
                  <FileCheck className="size-6" />
                </span>
                <h3 className="font-display text-[17px] font-bold text-ink">
                  عقود تكثيف البذور
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  انخراط المنتجين في برنامج تكثيف البذور مع متابعة ميدانية من
                  مهندسي التعاونية ومعهد CNCC.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <a
                  href="/tarifs#calendrier"
                  className="btn btn-outline w-full text-[12.5px] py-2 text-center"
                >
                  شروط عقد التكثيف
                </a>
              </div>
            </div>
          </div>

          {/* Full Slips History Table */}
          <div className="rounded-[22px] border border-line bg-white p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-[18px] font-bold text-ink">
                  سجل وصولات توريد المحاصيل والمستحقات
                </h3>
                <p className="text-[12.5px] text-muted">
                  تفاصيل الأوزان، التحاليل المخبرية، ومبالغ الدفع المسددة
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="size-4 absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="بحث برقم الوصل أو المحصول..."
                    className="rounded-xl border border-line bg-bg pe-4 ps-9 py-2 text-[12px] text-ink focus:outline-none focus:border-orange"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-start text-[13px]">
                <thead>
                  <tr className="border-b border-line bg-bg-alt text-muted text-[12px] font-semibold">
                    <th className="py-3 px-4 text-start">رقم الوصل</th>
                    <th className="py-3 px-4 text-start">تاريخ التفريغ</th>
                    <th className="py-3 px-4 text-start">المحصول والصنف</th>
                    <th className="py-3 px-4 text-start">موقع التخزين</th>
                    <th className="py-3 px-4 text-start">الوزن الصافي</th>
                    <th className="py-3 px-4 text-start">نسبة الرطوبة</th>
                    <th className="py-3 px-4 text-start">المبلغ الصافي</th>
                    <th className="py-3 px-4 text-start">حالة التسوية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {deliverySlips
                    .filter(
                      (slip) =>
                        !filterQuery.trim() ||
                        slip.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
                        slip.crop.includes(filterQuery) ||
                        slip.site.includes(filterQuery)
                    )
                    .map((slip) => (
                    <tr key={slip.id} className="hover:bg-bg-alt/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-ink font-mono text-[12.5px]">
                        {slip.id}
                      </td>
                      <td className="py-4 px-4 text-muted">{slip.date}</td>
                      <td className="py-4 px-4 font-medium text-ink">{slip.crop}</td>
                      <td className="py-4 px-4 text-muted">{slip.site}</td>
                      <td className="py-4 px-4 font-bold tabular-nums text-ink">
                        {slip.grossWeight}
                      </td>
                      <td className="py-4 px-4 tabular-nums text-muted">
                        {slip.humidity}
                      </td>
                      <td className="py-4 px-4 font-bold text-orange-deep tabular-nums">
                        {slip.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${slip.statusColor}`}
                        >
                          {slip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BUYER SPACE (MINOTERIES & COMMERÇANTS) */}
      {activeTab === "buyer" && (
        <div className="mt-8 space-y-8 animate-fade-in">
          <div className="rounded-[22px] border border-line bg-white p-6 sm:p-8 shadow-soft">
            <div className="max-w-2xl mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-3 py-0.5 text-[11.5px] font-semibold text-green mb-3">
                <Building2 className="size-3.5" />
                <span>المطاحن وتجار الجملة والمحولين</span>
              </span>
              <h3 className="font-display text-[20px] sm:text-[22px] font-bold text-ink">
                فضاء تموين المطاحن ومشتري البقول الجافة
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                تلتزم تعاونية غليزان بتموين وحدات التحويل والمطاحن بحصص القمح
                الصلب واللين المقررة من الديوان الجزائري المهني للحبوب (OAIC)،
                بالإضافة إلى بيع وتوزيع البقول الجافة الموضبة.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[18px] border border-line bg-bg p-6">
                <h4 className="font-display text-[16px] font-bold text-ink flex items-center gap-2">
                  <Wheat className="size-4 text-orange" />
                  <span>حصص القمح للمطاحن المتعاقدة</span>
                </h4>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  متابعة وصولات السحب الأسبوعية والشهرية، جداول التفريغ من
                  صوامع غليزان، وشهادات الجودة المرافقة للشحنات.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-[12px] text-muted">
                  <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                    <span>الحصة الشهرية المخصصة:</span>
                    <span className="font-bold text-ink">وفق ترخيص OAIC</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                    <span>نقاط الرفع والتفريغ:</span>
                    <span className="font-bold text-ink">صومعة وادي الجمعة وصوامع وادي ارهيو</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-line bg-bg p-6">
                <h4 className="font-display text-[16px] font-bold text-ink flex items-center gap-2">
                  <Sprout className="size-4 text-green" />
                  <span>طلبيات البقول الجافة بالجملة والتجزئة</span>
                </h4>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  شراء الحمص والعدس والفاصوليا المنتجة محلياً والموضبة في أكياس
                  غذائية (1 كغ، 5 كغ، 25 كغ) لفائدة تجار الجملة ومؤسسات الإطعام.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-[12px] text-muted">
                  <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                    <span>التوضيب المتاح:</span>
                    <span className="font-bold text-ink">أكياس محكمة الغلق 1 كغ و 25 كغ</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                    <span>الأسعار الرسمية:</span>
                    <span className="font-bold text-orange-deep">أسعار مقننة مدعمة</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Banner for Buyers */}
            <div className="mt-8 rounded-xl border border-line bg-tint-green/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-[14px] text-ink">
                  هل ترغب في توقيع اتفاقية تموين أو رفع شحنة جديدة؟
                </h4>
                <p className="text-[12px] text-muted mt-1">
                  تواصل مباشرة مع المصلحة التجارية للتعاونية لتنسيق إجراءات
                  الفاتورة وسند الشحن.
                </p>
              </div>
              <Link
                href="/#contact"
                className="btn btn-orange text-[12.5px] px-5 py-2 shrink-0"
              >
                <span>طلب تموين تجاري</span>
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOSSIER & ACCOUNT OPENING CHECKLIST */}
      {activeTab === "dossier" && (
        <div id="dossier" className="mt-8 space-y-8 animate-fade-in">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Checklist Guide */}
            <div className="lg:col-span-7 rounded-[24px] border border-line bg-white p-6 sm:p-8 shadow-soft">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-3 py-0.5 text-[11.5px] font-semibold text-orange-deep mb-3">
                <FileText className="size-3.5" />
                <span>دليل الانخراط</span>
              </span>
              <h3 className="font-display text-[20px] font-bold text-ink">
                الوثائق المطلوبة لفتح حساب بالتعاونية
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                لتمكين الفلاحين والمربين من الاستفادة من بذور الموسم المدعومة،
                كراء العتاد، وبيع المحصول، يُرجى تجهيز الملف التالي:
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  {
                    title: "نسخة من بطاقة الفلاح سارية المفعول",
                    sub: "أو بطاقة المربي مسلمة من الغرفة الفلاحية لولاية غليزان.",
                  },
                  {
                    title: "شهادة الحيازة أو عقد الملكية أو عقد الإيجار الفلاحي",
                    sub: "تثبت المساحة المزروعة وموقع المستثمرة الفلاحية.",
                  },
                  {
                    title: "نسخة من بطاقة التعريف الوطنية البيومترية",
                    sub: "سارية الصلاحية لصاحب الاستغلالية أو وكيله الشرعي.",
                  },
                  {
                    title: "صك بريدي أو بنكي مشطوب (Chèque barré)",
                    sub: "لضمان التحويل الفوري لمستحقات توريد المحصول دون تأخير.",
                  },
                  {
                    title: "استمارة فتح الحساب مصادق عليها",
                    sub: "يمكن تحميلها مباشرة من هذا الفضاء أو ملؤها بمقر التعاونية.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-line bg-bg p-3.5"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-green text-white text-[12px] font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[13.5px] text-ink leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[12px] text-muted mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Online Pre-Registration Form */}
            <div className="lg:col-span-5 rounded-[24px] border border-line bg-white p-6 sm:p-8 shadow-soft">
              <h3 className="font-display text-[18px] font-bold text-ink">
                التسجيل الأولي لفتح الحساب
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                املأ بياناتك وسيتواصل معك أعوان التعاونية لتأكيد تسجيلك واستلام
                ملفك.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-green/30 bg-green/10 p-6 text-center animate-fade-in">
                  <CheckCircle2 className="size-10 text-green mx-auto mb-2" />
                  <h4 className="font-bold text-ink text-[16px]">
                    تم إرسال طلبكم بنجاح!
                  </h4>
                  <p className="text-[12.5px] text-muted mt-1 leading-relaxed">
                    تم تسجيل طلب فتح الحساب تحت رقم إلكتروني مؤقت. سيتصل بكم عون
                    التعاونية في أقرب وقت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold text-ink mb-1">
                      الاسم واللقب الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: بلخير محمد"
                      className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[13px] text-ink focus:outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-ink mb-1">
                      رقم الهاتف للتواصل *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05 / 06 / 07 XX XX XX"
                      className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[13px] text-ink focus:outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-ink mb-1">
                      البلدية والموقع الفلاحي *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: وادي الجمعة — مستثمرة رقم 12"
                      className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[13px] text-ink focus:outline-none focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-ink mb-1">
                      نوع النشاط *
                    </label>
                    <select
                      className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[13px] text-ink focus:outline-none focus:border-orange"
                    >
                      <option value="cereales">منتج حبوب وبقول جافة</option>
                      <option value="multiplicateur">مكثف بذور معتمد</option>
                      <option value="minoterie">مطحنة / محول حبوب</option>
                      <option value="commercant">تاجر بقول جافة بالجملة</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-orange w-full text-[13px] py-3 mt-2 shadow-md"
                  >
                    <Send className="size-4" />
                    <span>إرسال طلب فتح الحساب</span>
                  </button>

                  <p className="text-[11px] text-center text-muted">
                    معلوماتكم محمية وتستخدم حصرياً لإتمام إجراءات الانخراط
                    الرسمية.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
