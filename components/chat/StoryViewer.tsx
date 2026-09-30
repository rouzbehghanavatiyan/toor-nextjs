"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const DURATION = 5000; // مدت هر اسلاید
const TICK = 50;

interface Props {
  groups: StoryGroup[];
  startIndex: number;
  onClose: () => void;
  onViewed: (groupId: string) => void;
}

export default function StoryViewer({
  groups,
  startIndex,
  onClose,
  onViewed,
}: Props) {
  const [gi, setGi] = useState(startIndex);
  const [si, setSi] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const pressStart = useRef(0);

  const group = groups[gi];
  const slide = group.slides[si];

  const next = useCallback(() => {
    setProgress(0);
    if (si < group.slides.length - 1) {
      setSi(si + 1);
    } else if (gi < groups.length - 1) {
      setGi(gi + 1);
      setSi(0);
    } else {
      onClose();
    }
  }, [si, gi, group.slides.length, groups.length, onClose]);

  const prev = useCallback(() => {
    setProgress(0);
    if (si > 0) {
      setSi(si - 1);
    } else if (gi > 0) {
      setGi(gi - 1);
      setSi(0);
    }
  }, [si, gi]);

  // علامت‌گذاری به‌عنوان دیده‌شده
  useEffect(() => {
    onViewed(group.id);
  }, [group.id, onViewed]);

  // تایمر پیشرفت
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setProgress((p) => p + (TICK / DURATION) * 100),
      TICK
    );
    return () => clearInterval(t);
  }, [paused, gi, si]);

  useEffect(() => {
    if (progress >= 100) next();
  }, [progress, next]);

  // کیبورد (در RTL فلش چپ = بعدی)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // نگه‌داشتن انگشت = مکث ، تپ کوتاه = رفتن به اسلاید بعد/قبل
  const pressHandlers = (action: () => void) => ({
    onPointerDown: () => {
      pressStart.current = Date.now();
      setPaused(true);
    },
    onPointerUp: () => {
      setPaused(false);
      if (Date.now() - pressStart.current < 250) action();
    },
    onPointerLeave: () => setPaused(false),
  });

  return (
    <div
      className="fixed inset-0 z-[80] bg-black flex items-center justify-center"
      dir="rtl"
      role="dialog"
      aria-label={`استوری ${group.label}`}
    >
      <div className="relative h-full w-full max-w-[440px] select-none">
        <Image
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="440px"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/85 to-transparent" />

        {/* نواحی تپ: چپ = بعدی ، راست = قبلی (مطابق RTL) */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 z-10"
          {...pressHandlers(next)}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 z-10"
          {...pressHandlers(prev)}
        />

        {/* نوار پیشرفت + هدر */}
        <div
          className="absolute inset-x-0 top-0 z-20 px-3 pointer-events-none"
          style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
        >
          <div className="flex gap-1">
            {group.slides.map((s, idx) => (
              <div
                key={s.id}
                className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div
                  className="h-full bg-white"
                  style={{
                    width: `${
                      idx < si ? 100 : idx === si ? Math.min(progress, 100) : 0
                    }%`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src={group.thumb}
                  alt=""
                  fill
                  sizes="32px"
                  className="rounded-full object-cover ring-1 ring-white/60"
                />
              </div>
              <div className="leading-tight">
                <p className="text-white text-sm font-semibold">{group.label}</p>
                <p className="text-white/70 text-[11px]">{group.author}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="بستن"
              className="pointer-events-auto p-2 text-white hover:bg-white/10 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* متن استوری */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 px-5 pointer-events-none"
          style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
        >
          <h2 className="text-white text-xl font-bold">{slide.title}</h2>
          {slide.caption && (
            <p className="text-white/85 text-sm leading-7 mt-2">
              {slide.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}