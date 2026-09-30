"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Users,
  Compass,
  Star,
  Award,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

// ======================= ساختار داده لیدرها =======================
export interface TourLeader {
  id: string;
  name: string;
  title: string; // عنوان یا تخصص لیدر (مثلاً: راهنمای ارشد بوم‌گردی و کویر)
  bio: string;
  avatarImage: string;
  coverImages: string[];
  city: string;
  score: number;
  reviewsCount: number;
  completedToursCount: number; // تعداد تورهای موفق
  totalTravelers: number; // تعداد کل همسفران
  isCertified: boolean; // دارای کارت راهنمای رسمی میراث فرهنگی
  specialties: string[]; // تخصص‌ها (کوهنوردی، کویر، رفتینگ، عکاسی و...)
  languages: string[];
}

// دیتای نمونه استاندارد توریسم
const leaders: TourLeader[] = [
  {
    id: "1",
    name: "روزبه قنواتیان",
    title: "راهنمای رسمی اکوتوریسم و کویرنوردی",
    bio: "بیش از ۶ سال سابقه برگزاری تورهای تخصصی کویر مرنجاب و ریگ جن، مربی بقا در طبیعت و عکاس حیات وحش.",
    avatarImage: "/assets/img/cook1.jpg",
    coverImages: [
      "/assets/img/1.jpg",
      "/assets/img/2.jpg",
      "/assets/img/3.jpg",
    ],
    city: "اهواز",
    score: 4.9,
    reviewsCount: 84,
    completedToursCount: 52,
    totalTravelers: 720,
    isCertified: true,
    specialties: ["کمپینگ", "کویرنوردی", "بقا در طبیعت"],
    languages: ["فارسی", "انگلیسی"],
  },
  {
    id: "2",
    name: "سارا نیکزاد",
    title: "مترجم و راهنمای تورهای فرهنگی و تاریخی",
    bio: "کارشناس ارشد تاریخ هنر با تخصص در محور توریستی تخت جمشید، پاسارگاد و بافت کهن شیراز و اصفهان.",
    avatarImage: "/assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg",
    coverImages: ["/assets/img/4.jpg", "/assets/img/5.jpg"],
    city: "شیراز",
    score: 4.8,
    reviewsCount: 112,
    completedToursCount: 68,
    totalTravelers: 950,
    isCertified: true,
    specialties: ["تاریخی و باستانی", "تور خارجی", "موزه‌گردی"],
    languages: ["فارسی", "فرانسوی", "انگلیسی"],
  },
  {
    id: "3",
    name: "آرمان کمالی",
    title: "سرپرست برنامه‌های ترکینگ و صعودهای آلپاین",
    bio: "صعود به قلل دماوند، علم‌کوه و سبلان؛ دارای مدرک بین‌المللی کوهنوردی و پزشکی کوهستان.",
    avatarImage: "/assets/img/inv3.jpeg",
    coverImages: [
      "/assets/img/g.jpg",
      "/assets/img/h.jpg",
      "/assets/img/i.jpg",
    ],
    city: "تهران",
    score: 4.7,
    reviewsCount: 63,
    completedToursCount: 41,
    totalTravelers: 490,
    isCertified: true,
    specialties: ["کوهنوردی", "پیمایش جنگل", "غارنوردی"],
    languages: ["فارسی", "انگلیسی"],
  },
  {
    id: "4",
    name: "نوید رستگار",
    title: "مجری تورهای ماجراجویانه شمال و غارنوردی",
    bio: "طراحی مسیرهای جنگل‌پیمایی اختصاصی هیرکانی و رفتینگ در رودخانه‌های خروشان مازندران و گیلان.",
    avatarImage: "/assets/img/cook1.jpg",
    coverImages: ["/assets/img/6.jpg", "/assets/img/j.jpg"],
    city: "رشت",
    score: 4.9,
    reviewsCount: 97,
    completedToursCount: 59,
    totalTravelers: 810,
    isCertified: false,
    specialties: ["جنگل‌پیمایی", "رفتینگ", "دوچرخه‌سواری"],
    languages: ["فارسی", "گیلکی"],
  },
];

// لیست شهرها برای فیلتر
const cities = ["همه", ...Array.from(new Set(leaders.map((l) => l.city)))];

// ======================= کامپوننت اختصاصی کارت لیدر =======================
// ======================= کامپوننت اختصاصی کارت لیدر =======================
function LeaderCard({ leader }: { leader: TourLeader }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images =
    leader.coverImages.length > 0 ? leader.coverImages : ["/assets/img/1.jpg"];
  const hasMultipleImages = images.length > 1;

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article className="group bg-white border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden select-none">
        <Image
          src={images[currentIdx]}
          alt={leader.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority={leader.id === "1"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* برچسب شهر */}
        <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-medium text-white flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span>{leader.city}</span>
        </div>

        {/* نشان رسمی بودن لیدر (کارت میراث) */}
        {leader.isCertified && (
          <div className="absolute top-3 left-3 z-10 bg-emerald-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>لیدر رسمی</span>
          </div>
        )}

        {/* کنترل‌های اسلایدر عکس */}
        {hasMultipleImages && (
          <>
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-10">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="تصویر قبلی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="تصویر بعدی"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* نقاط پایین اسلایدر */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIdx === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-2  flex-1 flex flex-col justify-between">
        <div>
          {/* آواتار و نام و تاییدیه */}
          <div className="flex items-start justify-between -mt-12 sm:-mt-14 mb-3">
            <Link
              href={`/leaders/${leader.id}`}
              className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 z-10 block rounded-2xl transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title={`مشاهده پروفایل ${leader.name}`}
            >
              <Image
                src={leader.avatarImage}
                alt={leader.name}
                fill
                sizes="80px"
                className="rounded-2xl object-cover   border-white shadow-md ring-1 ring-gray-100"
              />
              {leader.isCertified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
                  title="تایید مدارک و قرارداد"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                </div>
              )}
            </Link>

            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl text-amber-700 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{leader.score.toFixed(1)}</span>
              <span className="text-[10px] text-gray-400 font-normal">
                ({leader.reviewsCount})
              </span>
            </div>
          </div>

          <div className="mb-2.5">
            <h3 className="text-base font-extrabold text-gray-900 hover:text-indigo-600 transition-colors">
              {leader.name}
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-0.5">
              {leader.title}
            </p>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {leader.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {leader.specialties.map((spec, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-gray-50 border border-gray-100 text-[11px] text-gray-600 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-center py-2 bg-slate-50/70 rounded-xl mb-3.5">
            <div>
              <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <CalendarDays className="w-3 h-3 text-gray-400" />
                <span>تورهای اجرا شده</span>
              </div>
              <div className="text-sm font-black text-gray-800 mt-0.5">
                {leader.completedToursCount}+
              </div>
            </div>

            <div className="border-r border-gray-200">
              <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-gray-400" />
                <span>همسفران همراه</span>
              </div>
              <div className="text-sm font-black text-gray-800 mt-0.5">
                {leader.totalTravelers}+
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/room/${leader.id}`}
              className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-bold text-center transition-all shadow-sm shadow-indigo-200"
            >
              ورود به گروه
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LeadersGrid() {
  const [selectedCity, setSelectedCity] = useState<string>("همه");

  const filteredLeaders = useMemo(() => {
    if (selectedCity === "همه") return leaders;
    return leaders.filter((l) => l.city === selectedCity);
  }, [selectedCity]);
  return (
    <section className="w-full max-w-7xl mx-auto sm:px-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {cities.map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {city !== "همه" && <MapPin className="w-3 h-3" />}
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {filteredLeaders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center text-gray-500 text-sm">
          هیچ لیدری برای شهر انتخابی یافت نشد.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredLeaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      )}
    </section>
  );
}
