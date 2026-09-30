import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { Users, Settings, MapPinned, Tv, Radio, Compass } from "lucide-react";
import "./globals.css";

// ۱. تعریف فونت محلی یکان
const yekan = localFont({
  src: [
    {
      path: "../public/assets/fonts/Yekan/Font Web/yekan-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Yekan/Font Web/yekan-regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tour Leader | سامانه لیدر و گردشگری",
  description: "Next.js App with Socket.io and Redux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={yekan.variable}>
      <body
        className={`${yekan.className} bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col selection:bg-amber-400 selection:text-slate-950`}
      >
        {/* نوار ناوبری دسکتاپ (هدر تیره سرمه‌ای با المان‌های زرد) */}
        <nav className="hidden md:block bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            {/* لوگو و عنوان برند */}
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Compass className="w-5 h-5 animate-pulse" />
              </span>
              <span className="font-extrabold text-lg text-amber-400 tracking-tight">
                <Image
                  src="/assets/img/logo.png"
                  alt="لوگوی سامانه گردشگری"
                  width={65}
                  height={100}
                  priority
                  className="object-cover"
                />
              </span>
            </div>

            {/* لینک‌های ناوبری دسکتاپ */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all font-medium"
              >
                <Users className="w-4 h-4" />
                <span>تیم‌ها</span>
              </Link>
              <Link
                href="/show"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all font-medium"
              >
                <Tv className="w-4 h-4" />
                <span>نمایش زنده</span>
              </Link>
              <Link
                href="/organs"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all font-medium"
              >
                <MapPinned className="w-4 h-4" />
                <span>مقاصد</span>
              </Link>
              <Link
                href="/leaders"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all font-medium"
              >
                <Radio className="w-4 h-4" />
                <span>راهنماها</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all font-medium"
              >
                <Settings className="w-4 h-4" />
                <span>تنظیمات</span>
              </Link>
            </div>

            {/* وضعیت سرور / سوکت */}
            <div className="flex items-center gap-2 text-xs bg-slate-800/90 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>آنلاین</span>
            </div>
          </div>
        </nav>

        <header className="md:hidden bg-slate-900 border-b border-slate-800 px-4 h-14 sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white text-base">توروین</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </header>

        <main className="container mx-auto  sm:p-6 flex-1 pb-24 md:pb-8">
          {children}
        </main>

        {/* نوار ناوبری پایین صفحه در موبایل (Bottom Navigation Bar) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-around py-1.5 px-1">
            <Link
              href="/"
              className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-amber-400 transition-colors group"
            >
              <Users className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            </Link>

            <Link
              href="/show"
              className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-amber-400 transition-colors group"
            >
              <Tv className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            </Link>

            <Link
              href="/organs"
              className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-amber-400 transition-colors group"
            >
              <MapPinned className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            </Link>

            <Link
              href="/leaders"
              className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-amber-400 transition-colors group"
            >
              <Radio className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            </Link>

            <Link
              href="/settings"
              className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-amber-400 transition-colors group"
            >
              <Settings className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
