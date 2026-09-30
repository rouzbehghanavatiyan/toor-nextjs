"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Users,
  Calendar,
  MapPin,
  SendHorizontal,
  CheckCircle2,
  Ticket,
  ChevronLeft,
} from "lucide-react";

export interface TourItem {
  id: string;
  title: string;
  destination: string;
  bannerImage: string;
  date: string;
  maxCapacity: number;
  currentMembers: number;
  leaderName: string;
  leaderAvatar?: string;
  price?: string;
  description?: string;
}

export interface TourReserveProps {
  tours?: TourItem[];
}

const DEFAULT_TOURS: TourItem[] = [
  {
    id: "tour-1",
    title: "نمک آبرود",
    destination: "مازندران، نمک آبرود",
    bannerImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    date: "۱۸ الی ۲۰ آبان‌ماه",
    maxCapacity: 5,
    currentMembers: 4,
    leaderName: "آرمین رضایی",
    price: "۱,۸۵۰,۰۰۰ تومان",
    description:
      "سفر ساحلی و جنگلی همراه با اقامت ویلایی، تلکابین و دورهمی شبانه.",
  },
  {
    id: "tour-2",
    title: "کویر مرنجاب",
    destination: "کاشان، کویر مرنجاب",
    bannerImage:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    date: "۲۵ الی ۲۷ آبان‌ماه",
    maxCapacity: 20,
    currentMembers: 16,
    leaderName: "سارا کیانی",
    price: "۲,۴۵۰,۰۰۰ تومان",
    description: "رصد ستارگان، آفرودسواری در رمل‌های شنی و عکاسی حرفه‌ای.",
  },
  {
    id: "tour-3",
    title: "جنگل ابر",
    destination: "سمنان، شاهرود",
    bannerImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    date: "۲ الی ۴ آذر‌ماه",
    maxCapacity: 15,
    currentMembers: 15,
    leaderName: "نوید شمس",
    price: "۲,۱۰۰,۰۰۰ تومان",
    description: "کمپینگ در اقیانوس ابر و پیاده‌روی در جنگل‌های هیرکانی.",
  },
];

export default function TourReserve({
  tours = DEFAULT_TOURS,
}: TourReserveProps) {
  const [selectedTour, setSelectedTour] = useState<TourItem | null>(null);
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "sent"
  >("idle");

  const openTourModal = (tour: TourItem) => {
    setSelectedTour(tour);
    setRequestStatus("idle");
  };

  const handleSendRequest = () => {
    setRequestStatus("loading");
    setTimeout(() => {
      setRequestStatus("sent");
    }, 900);
  };

  const remaining = selectedTour
    ? Math.max(0, selectedTour.maxCapacity - selectedTour.currentMembers)
    : 0;

  const capacityPercent = selectedTour
    ? Math.min(
        100,
        Math.round(
          (selectedTour.currentMembers / selectedTour.maxCapacity) * 100
        )
      )
    : 0;

  return (
    <>
      {/* ─── نوار افقی کارت‌های رزرو کنار هم ─── */}
      <div className="w-full px-3.5 py-2.5">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tours.map((tour) => {
            const tourRemaining = Math.max(
              0,
              tour.maxCapacity - tour.currentMembers
            );
            const isFull = tourRemaining === 0;

            return (
              <button
                key={tour.id}
                type="button"
                onClick={() => openTourModal(tour)}
                className="group shrink-0 flex items-center gap-3 p-1.5 pe-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/40 border border-amber-200/80 hover:border-amber-400 hover:shadow-sm transition-all text-right w-64 sm:w-72"
              >
                {/* آیکون استوری */}
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 shadow-sm group-hover:scale-105 transition-transform">
                    <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-slate-900 border-2 border-white">
                      <Image
                        src={tour.bannerImage}
                        alt={tour.title}
                        fill
                        sizes="52px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -left-1 w-5 h-5 bg-amber-600 border-2 border-white rounded-full flex items-center justify-center shadow-xs">
                    <Ticket className="w-2.5 h-2.5 text-white" />
                  </span>
                </div>

                {/* اطلاعات خلاصه تور */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        isFull
                          ? "text-rose-700 bg-rose-50 border-rose-200"
                          : "text-emerald-700 bg-emerald-50 border-emerald-200"
                      }`}
                    >
                      {isFull ? "ظرفیت تکمیل" : `${tourRemaining} جای خالی`}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 truncate mt-1">
                    {tour.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {tour.currentMembers} از {tour.maxCapacity} نفر
                  </p>
                </div>

                <ChevronLeft className="w-4 h-4 text-amber-600/70 mr-auto shrink-0 group-hover:-translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── مودال نمایش بنر تور انتخابی ─── */}
      {selectedTour && (
        <div
          className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          dir="rtl"
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* تصویر بنر */}
            <div className="relative w-full h-52 sm:h-64 shrink-0 bg-slate-900">
              <Image
                src={selectedTour.bannerImage}
                alt={selectedTour.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40" />

              <button
                type="button"
                onClick={() => setSelectedTour(null)}
                className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-3.5 right-3.5">
                <span className="bg-amber-500/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-xl shadow-md flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5" />
                  رزرو اختصاصی سفر
                </span>
              </div>

              <div className="absolute bottom-3 inset-x-4 text-white">
                <h3 className="font-extrabold text-base sm:text-lg drop-shadow-sm leading-snug">
                  {selectedTour.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-200 mt-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {selectedTour.destination}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {selectedTour.date}
                  </span>
                </div>
              </div>
            </div>

            {/* بدنه و ظرفیت */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">
                      وضعیت و سقف همسفران
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800">
                    {selectedTour.currentMembers} از {selectedTour.maxCapacity} نفر
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      remaining <= 2 ? "bg-rose-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mt-2">
                  <span>سقف مجاز: {selectedTour.maxCapacity} نفر</span>
                  {remaining > 0 ? (
                    <span className="text-amber-700 font-bold">
                      تنها {remaining} صندلی خالی باقی مانده
                    </span>
                  ) : (
                    <span className="text-rose-600 font-bold">
                      ظرفیت این سفر تکمیل شده است
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-200 relative overflow-hidden shrink-0">
                    {selectedTour.leaderAvatar ? (
                      <Image
                        src={selectedTour.leaderAvatar}
                        alt={selectedTour.leaderName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center font-bold text-amber-900">
                        {selectedTour.leaderName[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] text-amber-800 block">
                      سرپرست و میزبان
                    </span>
                    <strong className="text-slate-900 font-bold">
                      {selectedTour.leaderName}
                    </strong>
                  </div>
                </div>

                {selectedTour.price && (
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 block">
                      هزینه سفر
                    </span>
                    <strong className="text-slate-900 font-bold text-xs">
                      {selectedTour.price}
                    </strong>
                  </div>
                )}
              </div>

              {selectedTour.description && (
                <p className="text-xs text-slate-600 leading-relaxed bg-white p-2 text-justify">
                  {selectedTour.description}
                </p>
              )}
            </div>

            {/* دکمه ارسال درخواست */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
              {requestStatus === "sent" ? (
                <div className="w-full py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  درخواست دعوت شما با موفقیت برای سرپرست تور ارسال شد.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSendRequest}
                  disabled={requestStatus === "loading" || remaining === 0}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                    remaining === 0
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20"
                  }`}
                >
                  {requestStatus === "loading" ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <SendHorizontal className="w-4 h-4" />
                      <span>
                        {remaining === 0 ? "تکمیل ظرفیت" : "درخواست دعوت به تور"}
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
