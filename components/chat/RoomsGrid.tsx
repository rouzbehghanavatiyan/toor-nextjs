"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Users,
  Star,
  CalendarDays,
  Globe2,
  Filter,
  ChevronDown,
  Tent,
  Check,
  Wallet,
  UserPlus,
  Compass,
} from "lucide-react";

export interface ActiveTour {
  destination: string;
  date: string;
  price: string;
  capacity: number;
}

export interface TourLeader {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarImage: string;
  coverImages: string[];
  country: string;
  city: string;
  score: number;
  reviewsCount: number;
  completedToursCount: number;
  totalTravelers: number;
  isCertified: boolean;
  specialties: string[];
  languages: string[];
  activeTour?: ActiveTour;
}

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
    country: "ایران",
    city: "اهواز",
    score: 4.9,
    reviewsCount: 84,
    completedToursCount: 52,
    totalTravelers: 720,
    isCertified: true,
    specialties: ["کمپینگ", "کویرنوردی", "بقا در طبیعت"],
    languages: ["فارسی", "انگلیسی"],
    activeTour: {
      destination: "کویر ریگ جن",
      date: "۱۲ تا ۱۴ آبان",
      price: "۴,۵۰۰,۰۰۰ تومان",
      capacity: 3,
    },
  },
  {
    id: "2",
    name: "سارا نیکزاد",
    title: "مترجم و راهنمای تورهای فرهنگی و تاریخی",
    bio: "کارشناس ارشد تاریخ هنر با تخصص در محور توریستی تخت جمشید، پاسارگاد و بافت کهن شیراز و اصفهان.",
    avatarImage: "/assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg",
    coverImages: ["/assets/img/4.jpg", "/assets/img/5.jpg"],
    country: "ایران",
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
    country: "ایران",
    city: "تهران",
    score: 4.7,
    reviewsCount: 63,
    completedToursCount: 41,
    totalTravelers: 490,
    isCertified: true,
    specialties: ["کوهنوردی", "پیمایش جنگل", "غارنوردی"],
    languages: ["فارسی", "انگلیسی"],
    activeTour: {
      destination: "صعود پاییزه دماوند",
      date: "۲۰ آبان",
      price: "۳,۲۰۰,۰۰۰ تومان",
      capacity: 5,
    },
  },
  {
    id: "4",
    name: "نوید رستگار",
    title: "مجری تورهای ماجراجویانه شمال و غارنوردی",
    bio: "طراحی مسیرهای جنگل‌پیمایی اختصاصی هیرکانی و رفتینگ در رودخانه‌های خروشان مازندران و گیلان.",
    avatarImage: "/assets/img/cook1.jpg",
    coverImages: ["/assets/img/6.jpg", "/assets/img/j.jpg"],
    country: "ایران",
    city: "رشت",
    score: 4.9,
    reviewsCount: 97,
    completedToursCount: 59,
    totalTravelers: 810,
    isCertified: false,
    specialties: ["جنگل‌پیمایی", "رفتینگ", "دوچرخه‌سواری"],
    languages: ["فارسی", "گیلکی"],
  },
  {
    id: "5",
    name: "مایا کاخیدزه",
    title: "راهنمای فارسی‌زبان تورهای قفقاز",
    bio: "متخصص تورهای کازبگی و بافت کهن تفلیس، راهنمای بومی با ۱۰ سال تجربه هماهنگی گروه‌ها.",
    avatarImage: "/assets/img/cook1.jpg",
    coverImages: ["/assets/img/1.jpg"],
    country: "گرجستان",
    city: "تفلیس",
    score: 4.95,
    reviewsCount: 44,
    completedToursCount: 30,
    totalTravelers: 410,
    isCertified: true,
    specialties: ["گردشگری شهری", "طبیعت‌گردی"],
    languages: ["گرجی", "فارسی", "روسی"],
    activeTour: {
      destination: "گشت ویژه باتومی",
      date: "۵ آذر",
      price: "۱۵۰ دلار",
      capacity: 8,
    },
  },
];

const countries = [
  "همه",
  ...Array.from(new Set(leaders.map((l) => l.country))),
];
const allTripTypes = [
  "همه",
  ...Array.from(new Set(leaders.flatMap((l) => l.specialties))),
];

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
    <article className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* اسلایدر تصویر کاور */}
      <div className="relative h-36 sm:h-40 w-full bg-slate-100 overflow-hidden select-none">
        <Image
          src={images[currentIdx]}
          alt={leader.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority={leader.id === "1"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span>
            {leader.city}، {leader.country}
          </span>
        </div>

        {leader.isCertified && (
          <div className="absolute top-3 left-3 z-10 border px-2.5 py-1 rounded-lg text-xs font-medium text-green-500 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-green-500" />
            <span>لیدر رسمی</span>
          </div>
        )}

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

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full">
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

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-end gap-3 mb-4">
            <Link
              href={`/leaders/${leader.id}`}
              className="relative -mt-8 sm:-mt-10 w-16 h-16 sm:w-18 sm:h-18 shrink-0 block rounded-2xl border-2 border-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 bg-white z-10"
              title={`مشاهده پروفایل ${leader.name}`}
            >
              <Image
                src={leader.avatarImage}
                alt={leader.name}
                fill
                sizes="(max-width: 640px) 64px, 72px"
                className="rounded-2xl object-cover bg-slate-100"
              />
              {leader.isCertified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                </div>
              )}
            </Link>

            <div className="min-w-0 flex-1 flex flex-col gap-1.5 pb-0.5">
              <Link href={`/leaders/${leader.id}`} className="group/name block">
                <h3 className="text-base font-bold text-gray-900 truncate group-hover/name:text-amber-600 transition-colors">
                  {leader.name}
                </h3>
              </Link>

              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-amber-900 font-bold text-xs w-fit">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{leader.score.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* بنر تمام عرض: تور آماده اجرا */}
          {leader.activeTour && (
            <div className="mb-4 relative overflow-hidden bg-amber-50/50 border border-amber-200 rounded-xl p-3 w-full">
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  آفـر آمـاده اجـرا
                </span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                  <UserPlus className="w-3 h-3 text-amber-600" />
                  <span>نیاز به {leader.activeTour.capacity} نفر</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">
                    {leader.activeTour.destination}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{leader.activeTour.date}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-amber-700 font-bold bg-white px-2 py-1.5 rounded-lg border border-amber-100 shadow-sm mt-0.5">
                  <Wallet className="w-4 h-4 text-amber-500" />
                  <span>مبلغ: {leader.activeTour.price}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-center py-2 bg-slate-50/70 rounded-xl mb-3.5">
            <div>
              <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <CalendarDays className="w-3 h-3 text-gray-400" />
                <span>تورهای اجرا شده</span>
              </div>
              <div className="text-sm font-black text-gray-800 mt-0.5 tabular-nums">
                {leader.completedToursCount}+
              </div>
            </div>

            <div className="border-r border-gray-200">
              <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-gray-400" />
                <span>همسفران همراه</span>
              </div>
              <div className="text-sm font-black text-gray-800 mt-0.5 tabular-nums">
                {leader.totalTravelers}+
              </div>
            </div>
          </div>

          <Link
            href={`/room/${leader.id}`}
            className="w-full block py-2.5 px-3 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white rounded-xl text-xs font-bold text-center transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            ورود به گروه
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function LeadersGrid() {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("همه");
  const [selectedCity, setSelectedCity] = useState<string>("همه");
  const [selectedTripType, setSelectedTripType] = useState<string>("همه");
  const [onlyActiveTours, setOnlyActiveTours] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<string>("همه");
  const filterRef = useRef<HTMLDivElement>(null);

  const availableDestinations = useMemo(() => {
    const destinations = leaders
      .filter((l) => !!l.activeTour)
      .map((l) => l.activeTour!.destination);
    return ["همه", ...Array.from(new Set(destinations))];
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      // اگر منوی فیلترها باز است، پنهان نشود تا پرش و تداخل ایجاد نکند
      if (isFiltersOpen) {
        if (filterRef.current) {
          filterRef.current.style.transform = "translateY(0)";
        }
        return;
      }

      const currentY = window.scrollY;
      const diff = currentY - lastY;

      if (!filterRef.current) return;

      // آستانه ۵ تا ۱۰ پیکسلی برای نادیده گرفتن لرزش‌های ریز
      if (Math.abs(diff) > 8) {
        if (currentY > 80 && diff > 0) {
          filterRef.current.style.transform = "translateY(-150%)";
        } else if (diff < 0) {
          filterRef.current.style.transform = "translateY(0)";
        }
        lastY = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFiltersOpen]);

  const availableCities = useMemo(() => {
    const list =
      selectedCountry === "همه"
        ? leaders
        : leaders.filter((l) => l.country === selectedCountry);
    return ["همه", ...Array.from(new Set(list.map((l) => l.city)))];
  }, [selectedCountry]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("همه");
  };

  const filteredLeaders = useMemo(() => {
    return leaders.filter((l) => {
      const matchCountry =
        selectedCountry === "همه" || l.country === selectedCountry;
      const matchCity = selectedCity === "همه" || l.city === selectedCity;
      const matchTripType =
        selectedTripType === "همه" || l.specialties.includes(selectedTripType);

      const matchDestination =
        selectedDestination === "همه" ||
        l.activeTour?.destination === selectedDestination;

      return matchCountry && matchCity && matchTripType && matchDestination;
    });
  }, [selectedCountry, selectedCity, selectedTripType, selectedDestination]);

  const activeFiltersCount =
    (selectedCountry !== "همه" ? 1 : 0) +
    (selectedCity !== "همه" ? 1 : 0) +
    (selectedTripType !== "همه" ? 1 : 0) +
    (selectedDestination !== "همه" ? 1 : 0);

  return (
    <section className="w-full max-w-7xl mx-auto sm:px-6" dir="rtl">
      <div
        ref={filterRef}
        className="sticky top-12 z-30 bg-gray-50/95 backdrop-blur-md border border-gray-300 rounded-2xl shadow-sm mb-6 overflow-hidden transition-transform duration-300 ease-in-out"
      >
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-sm text-amber-500">
              جستجو و فیلترها
            </span>
            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isFiltersOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isFiltersOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 p-4 border-t border-gray-100">
              {/* سطح ۱: کشور */}
              <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 shrink-0 pl-2 border-l border-gray-200">
                  <Globe2 className="w-4 h-4 text-amber-500" />
                  <span>کشور:</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {countries.map((country) => {
                    const isActive = selectedCountry === country;
                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountryChange(country)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {country}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* سطح ۲: شهر */}
              <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pt-1 border-t border-gray-50">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 shrink-0 pl-2 border-l border-gray-200">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>شهر:</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {availableCities.map((city) => {
                    const isActive = selectedCity === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setSelectedCity(city)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                          isActive
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
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

              {/* سطح ۳: نوع سفر */}
              <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pt-1 border-t border-gray-50">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 shrink-0 pl-2 border-l border-gray-200">
                  <Tent className="w-4 h-4 text-emerald-500" />
                  <span>نوع سفر:</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {allTripTypes.map((type) => {
                    const isActive = selectedTripType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedTripType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                          isActive
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* سطح ۴: فیلتر وضعیت تورهای آماده اجرا */}
              {/* سطح ۴: مقصد تورهای آماده اجرا */}
              <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pt-1 border-t border-gray-50">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 shrink-0 pl-2 border-l border-gray-200">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>مقصد تور:</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {availableDestinations.map((dest) => {
                    const isActive = selectedDestination === dest;
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => setSelectedDestination(dest)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {dest !== "همه" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                        {dest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredLeaders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center text-gray-500 text-sm">
          هیچ لیدری برای فیلتر انتخابی یافت نشد.
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
