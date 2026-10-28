import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import TutelleBar from "@/components/sections/TutelleBar";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ClientDashboard from "@/components/dashboard/ClientDashboard";

export const metadata: Metadata = {
  title: "فضاء الزبون ولوحة التحكم — تعاونية الحبوب والبقول الجافة غليزان",
  description:
    "الفضاء الرقمي الموحد لفلاحي ومنتجي الحبوب، مكثفي البذور والمطاحن بولاية غليزان: تتبع وصولات المحصول، حجز العتاد، وملف فتح الحساب.",
};

export default function EspaceClientPage() {
  return (
    <>
      <TutelleBar />
      <Header />

      <main className="bg-bg min-h-screen text-ink">
        {/* Breadcrumb Bar */}
        <div className="border-b border-line bg-bg-alt py-3">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
            <nav
              aria-label="مسار التصفح"
              className="flex items-center gap-2 text-[12.5px] font-medium text-muted"
            >
              <Link href="/" className="transition-colors hover:text-orange">
                الرئيسية
              </Link>
              <ChevronLeft className="size-3.5 opacity-50" />
              <span className="text-orange-deep font-semibold">
                فضاء الزبون ولوحة التحكم
              </span>
            </nav>
          </div>
        </div>

        {/* Dashboard Component */}
        <ClientDashboard />
      </main>

      <Footer />
    </>
  );
}
