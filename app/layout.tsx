import type { Metadata } from "next";
import Link from "next/link";
import { Home, Users, Settings } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Socket App",
  description: "Next.js App with Socket.io and Redux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col">
        {/* نوبار نسخه دسکتاپ (در موبایل مخفی است) */}
        <nav className="hidden md:block bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex gap-6">
            <Link href="/" className="hover:text-blue-200 transition font-medium">
              خانه
            </Link>
            <Link href="/teams" className="hover:text-blue-200 transition font-medium">
              تیم‌ها
            </Link>
            <Link href="/settings" className="hover:text-blue-200 transition font-medium">
              تنظیمات
            </Link>
          </div>
        </nav>

        {/* هدر ساده برای موبایل */}
        <header className="md:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-40 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-lg">My Socket App</span>
        </header>

        {/* محتوای اصلی - فاصله از پایین برای جا دادن تب بار در موبایل */}
        <main className="container mx-auto p-4 sm:p-6 flex-1 pb-24 md:pb-8">
          {children}
        </main>

        {/* تب‌بار پایین صفحه مثل اینستاگرام (فقط در موبایل نمایش داده می‌شود) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg safe-bottom">
          <div className="flex items-center justify-around py-2">
            <Link
              href="/"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium">خانه</span>
            </Link>

            <Link
              href="/teams"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium">تیم‌ها</span>
            </Link>

            <Link
              href="/settings"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Settings className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium">تنظیمات</span>
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
