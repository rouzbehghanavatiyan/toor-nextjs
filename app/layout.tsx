import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { Users, Settings, MapPinned, Tv, Radio } from "lucide-react";
import "./globals.css";

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
        {/* نوار بالایی دسکتاپ */}
        <nav className="hidden md:block bg-gradient-to-l from-slate-950 via-slate-900 to-slate-800 border-b border-amber-400/20 text-white sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
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
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/img/logo.png"
                alt="لوگوی سامانه گردشگری"
                width={120}
                height={40}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>
          </div>
        </nav>
        <header className="md:hidden sticky top-0 z-40 h-10 bg-white backdrop-blur-md border-b border-gray-100 px-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2"></div>
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/img/logo.png"
              alt="لوگوی سامانه گردشگری"
              width={60}
              height={42}
              priority
              className="w-auto object-contain"
            />
          </Link>
        </header>

        <main className="container mx-auto p-4 sm:p-6 flex-1 pb-24 md:pb-8">
          {children}
        </main>

        <nav
          aria-label="منوی موبایل"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-[env(safe-area-inset-bottom)]"
        >
          <div className="grid grid-cols-5 h-12 items-center px-2">
            <Link
              href="/"
              className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Users className="w-5 h-5" />
            </Link>

            <Link
              href="/show"
              className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Tv className="w-5 h-5" />
            </Link>

            <Link
              href="/organs"
              className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <MapPinned className="w-5 h-5" />
            </Link>

            <Link
              href="/leaders"
              className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Radio className="w-5 h-5" />
            </Link>

            <Link
              href="/settings"
              className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
