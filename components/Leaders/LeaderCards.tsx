"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  MapPin,
  Users,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export interface TourLeader {
  id: string;
  name: string;
  avatar: string;
  coverImages: string[];
  isVerified: boolean; // تاییدیه میراث فرهنگی
  rating: number;
  totalReviews: number;
  city: string;
  toursCount: number;
  companionsCount: number; // تعداد همسفران
  specialties: string[];
  languages: string[];
}

const MOCK_LEADERS: TourLeader[] = [
  {
    id: "1",
    name: "علی صبوری",
    avatar: "/assets/img/cook1.jpg",
    coverImages: ["/assets/img/cook1.jpg", "/assets/img/cook1.jpg"],
    isVerified: true,
    rating: 4.9,
    totalReviews: 128,
    city: "تهران",
    toursCount: 42,
    companionsCount: 650,
    specialties: ["کویرنوردی", "اکوتوریسم", "کمپینگ حرفه‌ای"],
    languages: ["فارسی", "انگلیسی"],
  },
  {
    id: "2",
    name: "مریم احمدی",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    coverImages: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80",
    ],
    isVerified: true,
    rating: 4.8,
    totalReviews: 95,
    city: "شیراز",
    toursCount: 35,
    companionsCount: 480,
    specialties: ["تورهای تاریخی", "طبیعت‌گردی زاگرس"],
    languages: ["فارسی", "فرانسوی"],
  },
];

export default function LeaderCards() {
  const [selectedCity, setSelectedCity] = useState<string>("همه");

  const filteredLeaders = useMemo(() => {
    if (selectedCity === "همه") return MOCK_LEADERS;
    return MOCK_LEADERS.filter((l) => l.city === selectedCity);
  }, [selectedCity]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* فیلتر سریع */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["همه", "تهران", "شیراز", "اصفهان"].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCity === city
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-700 border hover:bg-gray-100"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* گرید کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeaders.map((leader) => (
          <SingleLeaderCard key={leader.id} leader={leader} />
        ))}
      </div>
    </div>
  );
}

function SingleLeaderCard({ leader }: { leader: TourLeader }) {
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentCoverIndex((prev) => (prev + 1) % leader.coverImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentCoverIndex(
      (prev) =>
        (prev - 1 + leader.coverImages.length) % leader.coverImages.length,
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
      {/* بخش اسلایدر کاور */}
      <div className="relative h-48 w-full group bg-gray-100">
        <Image
          src={leader.coverImages[currentCoverIndex]}
          alt={leader.name}
          fill
          className="object-cover"
        />

        {leader.coverImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={prevImage}
              className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* بج شهر */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 text-gray-700 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          {leader.city}
        </span>
      </div>

      {/* اطلاعات لیدر */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            {/* آواتار و نام (لینک به پروفایل اختصاصی) */}
            <Link
              href={`/leaders/${leader.id}`}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src={leader.avatar}
                  alt={leader.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {leader.name}
                  </h3>
                  {leader.isVerified && (
                    <ShieldCheck
                      className="w-4 h-4 text-emerald-600"
                      title="لیدر رسمی میراث فرهنگی"
                    />
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-gray-800">
                    {leader.rating}
                  </span>
                  <span>({leader.totalReviews} نظر)</span>
                </div>
              </div>
            </Link>
          </div>

          {/* آمار همسفران و تورها */}
          <div className="grid grid-cols-2 gap-2 mt-4 py-2.5 px-3 bg-gray-50 rounded-xl text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-gray-500" />
              <span>{leader.toursCount} تور اجرا شده</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{leader.companionsCount} همسفر</span>
            </div>
          </div>

          {/* تگ‌های تخصص */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {leader.specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* دکمه مشاهده پروفایل */}
        <Link
          href={`/leaders/${leader.id}`}
          className="mt-5 block w-full text-center py-2.5 px-4 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-blue-600 transition"
        >
          مشاهده پروفایل و تورها
        </Link>
      </div>
    </div>
  );
}
