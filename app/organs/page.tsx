"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building,
  Percent,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  SlidersHorizontal,
  X,
  Sparkles,
} from "lucide-react";

// ======================= تایپ‌ها =======================
export type OrganType = "all" | "accommodation" | "discount";
export type SortOption = "popular" | "rating" | "price-asc" | "price-desc";

export interface Organ {
  id: string;
  title: string;
  description: string;
  type: "accommodation" | "discount";
  images: string[];
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number; // قیمت بر حسب تومان
  discountRate?: number; // درصد تخفیف
  features: string[];
}

// ======================= داده‌های تستی تمیز =======================
const mockOrgans: Organ[] = [
  {
    id: "1",
    title: "هتل بین‌المللی پارس",
    description:
      "اقامتگاهی لوکس با امکانات رفاهی کامل، استخر، سونا و رستوران بین‌المللی.",
    type: "accommodation",
    images: ["/assets/img/a.jpg", "/assets/img/b.jpg", "/assets/img/c.jpg"],
    city: "مشهد",
    rating: 4.8,
    reviewCount: 128,
    pricePerNight: 2400000,
    features: ["صبحانه رایگان", "استخر", "ترانسفر فرودگاهی"],
  },
  {
    id: "2",
    title: "رستوران‌های زنجیره‌ای سیندخت",
    description:
      "ارائه انواع غذاهای اصیل ایرانی و فرنگی با محیطی خانوادگی و دلنشین.",
    type: "discount",
    images: ["/assets/img/b.jpg", "/assets/img/d.jpg"],
    city: "تهران",
    rating: 4.5,
    reviewCount: 94,
    pricePerNight: 450000,
    discountRate: 25,
    features: ["فضای باز", "موسیقی زنده", "پارکینگ"],
  },
  {
    id: "3",
    title: "اقامتگاه بوم‌گردی کوهستان",
    description:
      "تجربه زندگی روستایی در دل طبیعت بکر با غذاهای محلی، ارگانیک و تورهای راهنما.",
    type: "accommodation",
    images: ["/assets/img/c.jpg", "/assets/img/a.jpg", "/assets/img/e.jpg"],
    city: "رشت",
    rating: 4.9,
    reviewCount: 215,
    pricePerNight: 1200000,
    features: ["طبیعت‌گردی", "غذاهای محلی", "اینترنت پرسرعت"],
  },
  {
    id: "4",
    title: "مجتمع تفریحی و ورزشی موج",
    description:
      "پارک آبی سرپوشیده، سالن بدنسازی، اسپا، ماساژ و خدمات رفاهی تفریحی استاندارد.",
    type: "discount",
    images: ["/assets/img/d.jpg", "/assets/img/f.jpg"],
    city: "شیراز",
    rating: 4.6,
    reviewCount: 76,
    pricePerNight: 350000,
    discountRate: 30,
    features: ["پارک آبی", "سالن ماساژ", "کافی‌شاپ"],
  },
  {
    id: "5",
    title: "بوتیک هتل سنتی کاروانسرای ماه",
    description:
      "معماری تاریخی دوران صفوی همراه با اتاق‌های شاه‌نشین و خدمات VIP مدرن.",
    type: "accommodation",
    images: ["/assets/img/e.jpg", "/assets/img/b.jpg"],
    city: "اصفهان",
    rating: 4.9,
    reviewCount: 310,
    pricePerNight: 3100000,
    discountRate: 15,
    features: ["حیاط مرکزی", "چای‌خانه سنتی", "راهنمای دوزبانه"],
  },
];

// فرمت‌کننده عدد به ریال/تومان با فونت استاندارد
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

// ======================= کامپوننت اختصاصی کارت =======================
function OrganCard({ organ }: { organ: Organ }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const finalPrice = organ.discountRate
    ? organ.pricePerNight * (1 - organ.discountRate / 100)
    : organ.pricePerNight;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % organ.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + organ.images.length) % organ.images.length,
    );
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* بخش اسلایدر تصویر */}
      <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
        <Image
          src={organ.images[currentImageIndex] || organ.images[0]}
          alt={organ.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* دکمه‌های ناوبری اسلایدر تصاویر */}
        {organ.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={prevImage}
              aria-label="عکس قبلی"
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="عکس بعدی"
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* نقاط اندیکاتور اسلایدر */}
        {organ.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {organ.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* نشانگر نوع مرکز (اقامتگاه یا تخفیف) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {organ.type === "accommodation" ? (
            <span className="bg-teal-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-white flex items-center gap-1 shadow-sm">
              <Building className="w-3.5 h-3.5" />
              اقامتگاه
            </span>
          ) : (
            <span className="bg-rose-500/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-white flex items-center gap-1 shadow-sm">
              <Percent className="w-3.5 h-3.5" />
              {organ.discountRate}٪ تخفیف ویژه
            </span>
          )}
        </div>

        {/* دکمه بوکمارک / لایک */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          aria-label="ذخیره در علاقه‌مندی‌ها"
          className="absolute top-3 left-3 p-2 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md shadow-sm transition-all text-gray-700"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "fill-rose-500 text-rose-500" : "hover:text-rose-500"
            }`}
          />
        </button>
      </div>

      {/* بخش محتوا و اطلاعات */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* شهر و امتیاز */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium text-gray-600">{organ.city}</span>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{organ.rating}</span>
              <span className="text-[10px] text-gray-400 font-normal">
                ({organ.reviewCount})
              </span>
            </div>
          </div>

          {/* عنوان */}
          <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {organ.title}
          </h2>

          {/* توضیحات مختصر */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
            {organ.description}
          </p>

          {/* تگ‌های امکانات */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {organ.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[11px] text-gray-600"
              >
                {feature}
              </span>
            ))}
            {organ.features.length > 3 && (
              <span className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[10px] text-gray-400">
                +{organ.features.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* قیمت و دکمه اکشن نهایی */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-400">شروع قیمت از</div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-gray-900">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-[11px] text-gray-500">تومان</span>
            </div>
            {organ.discountRate && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatPrice(organ.pricePerNight)}
              </span>
            )}
          </div>

          <Link
            href={`/organs/${organ.id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            مشاهده و رزرو
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ======================= کامپوننت اصلی صفحه =======================
export default function OrgansPage() {
  const [activeFilter, setActiveFilter] = useState<OrganType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  // فیلتر و جستجوی چند لایه
  const filteredOrgans = useMemo(() => {
    let result = mockOrgans.filter((organ) => {
      const matchesFilter =
        activeFilter === "all" || organ.type === activeFilter;
      const matchesSearch =
        organ.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organ.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organ.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    // مرتب‌سازی
    return result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "price-desc") return b.pricePerNight - a.pricePerNight;
      return b.reviewCount - a.reviewCount; // پیش‌فرض: محبوب‌ترین
    });
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ۱. هدر اصلی صفحه + نوار جستجوی استاندارد */}
        <header className="bg-white p-5 sm:p-7 rounded-3xl shadow-xs border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-indigo-600 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>مرکز اقامت و گردشگری ایران</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              رزرو اقامتگاه و مراکز تخفیف‌دار
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              مجموعه‌ای از بهترین هتل‌ها، بوم‌گردی‌ها و تفریحات ویژه سراسر کشور
            </p>
          </div>

          {/* فیلد جستجوی اصلاح‌شده */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام هتل، شهر یا تفریح..."
              className="w-full pr-10 pl-9 py-2.5 bg-gray-50/80 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* ۲. ردیف فیلتر دسته‌بندی و مرتب‌سازی */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* تب‌های دسته‌بندی */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeFilter === "all"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              همه مراکز
            </button>

            <button
              onClick={() => setActiveFilter("accommodation")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeFilter === "accommodation"
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-200"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Building className="w-4 h-4" />
              اقامتگاه‌ها
            </button>

            <button
              onClick={() => setActiveFilter("discount")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeFilter === "discount"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Percent className="w-4 h-4" />
              مراکز تخفیف‌دار
            </button>
          </div>

          {/* ابزار مرتب‌سازی و تعداد یافته‌ها */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <span className="text-gray-500">
              <strong className="text-gray-800">{filteredOrgans.length}</strong>{" "}
              مرکز یافت شد
            </span>

            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="مرتب‌سازی بر اساس"
                className="bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="popular">محبوب‌ترین</option>
                <option value="rating">بالاترین امتیاز</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
              </select>
            </div>
          </div>
        </div>

        {/* ۳. کانتینر گرید کارت‌ها */}
        {filteredOrgans.length === 0 ? (
          <div className="bg-white p-12 sm:p-16 rounded-3xl border border-gray-100 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                نتیجه‌ای یافت نشد
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                عبارت جستجو یا فیلترهای انتخابی خود را بررسی یا بازنشانی کنید.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              پاک کردن تمام فیلترها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrgans.map((organ) => (
              <OrganCard key={organ.id} organ={organ} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
