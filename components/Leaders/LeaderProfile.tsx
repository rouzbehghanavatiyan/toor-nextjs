"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  MapPin,
  Users,
  Calendar,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

interface Props {
  id?: string;
}

export default function LeaderProfile({ id }: Props) {
  const [activeTab, setActiveTab] = useState<"tours" | "events">("tours");

  const profile = {
    name: "علی صبوری",
    role: "راهنمای ارشد طبیعت‌گردی و کویرنوردی",
    avatar: "/assets/img/cook1.jpg",
    cover: "/assets/img/3.jpg",
    city: "تهران",
    isVerified: true,
    rating: 4.9,
    reviewsCount: 128,
    companionsCount: 650,
    toursCount: 42,
    bio: "بیش از ۷ سال سابقه لیدری در کویرهای ایران و رشته‌کوه‌های البرز و زاگرس. فارغ‌التحصیل رشته مدیریت جهانگردی و دارنده کارت رسمی راهنمای گردشگری از وزارت میراث فرهنگی.",

    // ارزیابی عملکرد (Progress Bar با مقیاس ۱ تا ۱۰۰)
    skillScores: [
      { title: "تسلط بر منطقه و دانش فنی", score: 96 },
      { title: "اخلاق حرفه‌ای و روحیه کار گروهی", score: 92 },
      { title: "مدیریت بحران و ایمنی همسفران", score: 98 },
      { title: "مدیریت زمان و تعهد به برنامه", score: 88 },
    ],

    // تجربیات و تورهای قبلی
    pastTours: [
      {
        id: "t1",
        title: "پیمایش کویر ریگ جن (۳ روزه)",
        date: "آبان ۱۴۰۴",
        count: 18,
        image: "/assets/img/d.jpg",
      },
      {
        id: "t2",
        title: "دره‌نوردی رغز فارس",
        date: "شهریور ۱۴۰۴",
        count: 14,
        image: "/assets/img/6.jpg",
      },
      {
        id: "t3",
        title: "کمپینگ پاییزی در جنگل الیمستان",
        date: "مهر ۱۴۰۴",
        count: 22,
        image: "/assets/img/5.jpg",
      },
    ],

    // دورهمی‌ها و ایونت‌ها
    events: [
      {
        id: "e1",
        title: "کارگاه آشنایی با بقا در شرایط اضطراری",
        date: "۲۵ آبان ۱۴۰۵",
        location: "تهران، پارک نیاوران",
        status: "در حال ثبت نام",
      },
      {
        id: "e2",
        title: "دورهمی بررسی عکس‌های سفر کویر مرنجاب",
        date: "۲ آذر ۱۴۰۵",
        location: "کافه کتاب لاله، تهران",
        status: "به زودی",
      },
    ],
  };

  return (
    <div className="pb-16" dir="rtl">
      {/* کاور صفحه */}
      <div className="relative h-64 sm:h-80 w-full bg-gray-200">
        <Image
          src={profile.cover}
          alt={profile.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <Link
          href="/leaders"
          className="absolute top-6 right-6 flex items-center gap-1 text-sm bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به لیست</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* بخش اطلاعات بالای پروفایل */}
        <div className="relative -mt-20 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-right">
            {/* آواتار گرد لیدر */}
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-white">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-2 sm:mt-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-gray-900">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                    <ShieldCheck className="w-4 h-4" />
                    لیدر رسمی میراث فرهنگی
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                {profile.role}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {profile.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <strong className="text-gray-900">{profile.rating}</strong> (
                  {profile.reviewsCount} بازخورد)
                </span>
              </div>
            </div>
          </div>

          {/* آمار سریع */}
          <div className="flex items-center gap-6 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-center">
              <span className="block text-xl font-bold text-gray-900">
                {profile.toursCount}
              </span>
              <span className="text-xs text-gray-500">تور برگزار شده</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <span className="block text-xl font-bold text-gray-900">
                {profile.companionsCount}+
              </span>
              <span className="text-xs text-gray-500">همسفر راضی</span>
            </div>
          </div>
        </div>

        {/* گرید بدنه اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-2 space-y-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                درباره من
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {profile.bio}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                ارزیابی همسفران (از ۱۰۰)
              </h2>

              <div className="space-y-4">
                {profile.skillScores.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-700">{item.title}</span>
                      <span className="text-blue-600 font-bold">
                        {item.score}٪
                      </span>
                    </div>
                    {/* نوار پیشرفت */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ستون چپ: تب‌های تجربیات و ایونت‌ها */}
          <div className="lg:col-span-2 space-y-6">
            {/* هدر تب‌ها */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("tours")}
                className={`pb-3 px-4 font-semibold text-sm transition flex items-center gap-2 border-b-2 ${
                  activeTab === "tours"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <Calendar className="w-4 h-4" />
                تجربیات و تورهای قبلی
              </button>

              <button
                onClick={() => setActiveTab("events")}
                className={`pb-3 px-4 font-semibold text-sm transition flex items-center gap-2 border-b-2 ${
                  activeTab === "events"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <Users className="w-4 h-4" />
                دورهمی‌ها و ایونت‌ها
              </button>
            </div>

            {activeTab === "tours" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.pastTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                  >
                    <div className="relative h-36 w-full">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-gray-800 text-sm">
                        {tour.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {tour.date}
                        </span>
                        <span>{tour.count} همسفر</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* محتوای تب ایونت‌ها */}
            {activeTab === "events" && (
              <div className="space-y-4">
                {profile.events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-gray-900">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-3 py-1 rounded-full border border-amber-200">
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
