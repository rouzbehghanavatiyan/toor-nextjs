"use client";

import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  Users,
  Star,
  Award,
  Coffee,
  MessageCircle,
  Share2,
  CheckCircle2,
  Mountain,
} from "lucide-react";

// ======================= Mock Data =======================
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
      title: "شب‌نشینی و بازی‌های گروهی همسفران قدیمی",
      image: "/assets/img/6.jpg",
      date: "۲۵ اسفند ۱۴۰۴",
      location: "باغ رستوران دربند",
      type: "تفریحی",
    },
  ],
};

// ======================= Components =======================

export default function LeaderProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16" dir="rtl">
      {/* 1. هدر و تصویر کاور */}
      <div className="relative h-64 sm:h-80 w-full">
        <Image
          src={leaderProfile.coverImage}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset />
              </div>
            )}
          </div>

          {/* نام و توضیحات کوتاه */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {leaderProfile.name}
                </h1>
                <p className="text-indigo-600 font-semibold mt-1 flex items-center justify-center md:justify-start gap-1">
                  <Award className="w-4 h-4" />
                  {leaderProfile.title}
                </p>
              </div>

              {/* دکمه‌های اکشن */}
              <div className="flex items-center justify-center gap-2">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-md shadow-indigo-200">
                  <MessageCircle className="w-4 h-4" />
                  درخواست مشاوره/تور
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

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
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ستون کناری: درباره لیدر و امتیازات */}
        <div className="lg:col-span-1 space-y-6">
          {/* درباره من */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-3">
              درباره لیدر
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {leaderProfile.bio}
            </p>
          </div>

          {/* امتیازات و نظرات (پروگرس بار 1 تا 100) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-500" />
              ارزیابی مسافران
            </h3>
            <div className="space-y-4">
              {leaderProfile.ratings.map((rating, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">
                      {rating.label}
                    </span>
                    <span className="text-xs font-bold text-indigo-600">
                      {rating.value} / ۱۰۰
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-indigo-600 to-indigo-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${rating.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ستون اصلی: تورها و دورهمی‌ها */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* بخش تورهای برگزار شده */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-black text-gray-900">تجربیات و تورهای قبلی</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leaderProfile.pastTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex gap-3"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                      {tour.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {tour.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {tour.travelers} همسفر
                      </span>
                    </div>
                    <div className="mt-2 inline-block bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md w-fit">
                      {tour.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* بخش دورهمی‌ها */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-rose-500" />
              <h2 className="text-xl font-black text-gray-900">دورهمی‌ها و ایونت‌ها</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {leaderProfile.meetups.map((meetup) => (
                <div
                  key={meetup.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  <div className="relative w-full sm:w-32 h-32 sm:h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={meetup.image}
                      alt={meetup.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      {meetup.title}
                    </h4>
                    <span className="inline-block px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-md mb-2">
                      {meetup.type}
                    </span>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        {meetup.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {meetup.location}
                      </span>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 text-xs font-bold text-indigo-600 border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl transition-colors">
                    مشاهده تصاویر
                  </button>
                </div>
              ))}
            </div>
          </section>
          
        </div>
      </div>
    </main>
  );
}
