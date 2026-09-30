"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter, MapPin } from "lucide-react";
import Link from "next/link";

export interface Room {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  avatarImage: string;
  creatorName: string;
  score: number;
  membersCount: number;
  city: string;
}

const rooms: Room[] = [
  {
    id: "1",
    title: "اتاق استراتژی کلش",
    description: "بررسی ترکیب‌های اتک، وارها و استراتژی‌های جدید تاون‌هال.",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg",
    creatorName: "روزبه",
    score: 4.9,
    membersCount: 24,
    city: "اهواز",
  },
  {
    id: "2",
    title: "اتاق وار و کلن‌وار لیگ",
    description: "هماهنگی تارگت‌ها، اعلام دانه‌ها و لاین‌آپ وار لیگ ماهانه.",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/cook1.jpg",
    creatorName: "سعید",
    score: 4.7,
    membersCount: 18,
    city: "تهران",
  },
  {
    id: "3",
    title: "گپ آزاد و تبادل تجربه",
    description: "گفت‌وگو درباره آپدیت‌ها، ترید اکانت و تبادل تجربیات بازی.",
    coverImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/inv3.jpeg",
    creatorName: "آرمان",
    score: 4.5,
    membersCount: 35,
    city: "اصفهان",
  },
  {
    id: "4",
    title: "دورهمی گیمرهای شیراز",
    description: "هماهنگی ایونت‌های حضوری و آنلاین کلش و تورنومنت‌ها.",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg",
    creatorName: "نوید",
    score: 4.8,
    membersCount: 12,
    city: "شیراز",
  },
];

// لیست شهرها به صورت خودکار از داده‌ها استخراج می‌شود
const cities = ["همه", ...Array.from(new Set(rooms.map((r) => r.city)))];

export default function RoomsGrid() {
  const [selectedCity, setSelectedCity] = useState<string>("همه");

  // فیلتر کردن اتاق‌ها بر اساس شهر انتخاب شده
  const filteredRooms =
    selectedCity === "همه"
      ? rooms
      : rooms.filter((room) => room.city === selectedCity);

  return (
    <section className="w-full max-w-7xl mx-auto" dir="rtl">
      {/* هدر صفحه */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
            اتاق‌های فعال گفتگو
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            یک اتاق را برای شروع گفتگو انتخاب کنید.
          </p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          {filteredRooms.length} اتاق در دسترس
        </span>
      </div>

      {/* نوار فیلتر شهرها */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium shrink-0 ml-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>شهر:</span>
        </div>

        <div className="flex items-center gap-2">
          {cities.map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {city !== "همه" && <MapPin className="w-3 h-3" />}
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* نمایش لیست یا وضعیت خالی */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-500 text-sm">
          هیچ اتاقی برای شهر انتخاب شده یافت نشد.
        </div>
      ) : (
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* تصویر کاور برای دسکتاپ */}
              <div className="hidden sm:block relative h-40 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={room.coverImage}
                  alt={room.title}
                  fill
                  sizes="(max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-semibold text-amber-600 flex items-center gap-1 shadow-sm">
                  <span>★</span>
                  <span>{room.score.toFixed(1)}</span>
                </div>
                {/* برچسب شهر روی کاور در دسکتاپ */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-medium text-white flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3" />
                  <span>{room.city}</span>
                </div>
              </div>

              {/* بخش محتوا */}
              <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center sm:justify-between sm:items-end sm:-mt-9 mb-2.5 sm:mb-3 gap-3">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0">
                      <Image
                        src={room.avatarImage}
                        alt={room.creatorName}
                        fill
                        sizes="64px"
                        className="rounded-full object-cover border-2 sm:border-4 border-white shadow-sm ring-1 ring-gray-100"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full z-10" />
                    </div>

                    <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-end gap-2 flex-wrap">
                      {/* برچسب شهر در موبایل */}
                      <span className="sm:hidden text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 font-medium border border-indigo-100">
                        <MapPin className="w-3 h-3" />
                        {room.city}
                      </span>

                      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        مدیر: {room.creatorName}
                      </span>
                      <span className="sm:hidden text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        ★ {room.score.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {room.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{room.membersCount} آنلاین</span>
                  </div>

                  <Link
                    href={`/room/${room.id}`}
                    className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-indigo-200 cursor-pointer"
                  >
                    ورود به اتاق
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
