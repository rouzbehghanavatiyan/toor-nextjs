"use client";

import Image from "next/image";
import { MapPin, CalendarDays, Users, Star, Award, Coffee } from "lucide-react";

const leaderProfile = {
  id: "1",
  name: "روزبه قنواتیان",
  title: "راهنمای رسمی اکوتوریسم و کویرنوردی",
  bio: "من بیش از ۶ سال است که در زمینه برگزاری تورهای تخصصی کویر، کمپینگ و بقا در طبیعت فعالیت می‌کنم. هدف من ایجاد تجربه‌ای امن، هیجان‌انگیز و فراموش‌نشدنی برای همسفرانم است. عاشق طبیعت، عکاسی و کشف مسیرهای بکر هستم.",
  avatarImage: "/assets/img/cook1.jpg", // عکس گرد لیدر
  coverImage: "/assets/img/1.jpg", // کاور بالای صفحه
  city: "تهران",
  isCertified: true,
  // امتیازات کاربران از ۱ تا ۱۰۰
  ratings: [
    { label: "تسلط و دانش تور", value: 95 },
    { label: "اخلاق و برخورد", value: 98 },
    { label: "مدیریت زمان", value: 85 },
    { label: "ایمنی و مراقبت", value: 92 },
    { label: "کیفیت پذیرایی و امکانات", value: 88 },
  ],
  // تورهای برگزار شده
  pastTours: [
    {
      id: "t1",
      title: "پیمایش دره نی‌گا و کمپینگ شبانه",
      image: "/assets/img/2.jpg",
      date: "شهریور ۱۴۰۵",
      duration: "۳ روزه",
      travelers: 24,
    },
    {
      id: "t2",
      title: "سفر به قلب کویر ریگ جن",
      image: "/assets/img/3.jpg",
      date: "آبان ۱۴۰۴",
      duration: "۲ روز و ۱ شب",
      travelers: 18,
    },
    {
      id: "t3",
      title: "صعود تابستانه به قله سبلان",
      image: "/assets/img/4.jpg",
      date: "مرداد ۱۴۰۴",
      duration: "۴ روزه",
      travelers: 15,
    },
  ],
  // دورهمی‌ها
  meetups: [
    {
      id: "m1",
      title: "دورهمی انتقال تجربه: بقا در کویر",
      image: "/assets/img/5.jpg",
      date: "۱۲ مهر ۱۴۰۵",
      location: "کافه طبیعت، تهران",
      type: "آموزشی / دوستانه",
    },
    {
      id: "m2",
      title: "شب‌گا و کمپینگ شبانه",
      image: "/assets/img/2.jpg",
      date: "شهریور ۱۴۰۵",
      duration: "۳ روزه",
      travelers: 24,
    },
    {
      id: "t2",
      title: "سفر به قلب کویر ریگ جن",
      image: "/assets/img/3.jpg",
      date: "آبان ۱۴۰۴",
      duration: "۲ روز و ۱ شب",
      travelers: 18,
    },
    {
      id: "t3",
      title: "صعود تابستانه به قله سبلان",
      image: "/assets/img/4.jpg",
      date: "مرداد ۱۴۰۴",
      duration: "۴ روزه",
      travelers: 15,
    },
  ],
};

export default function LeaderProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16" dir="rtl">
      {/* 1. هدر و تصویر کاور */}
      <div className="relative h-64 sm:h-80 w-full">
        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            {leaderProfile.city}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            میانگین امتیاز عالی
          </span>
        </div>
      </div>
    </main>
  );
}
