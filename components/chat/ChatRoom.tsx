"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Megaphone,
  MapPin,
  Compass,
  ShieldCheck,
} from "lucide-react";
import StoryBar from "./StoryBar";
import StoryViewer from "./TourReserve";
import {
  initialMessages,
  mockStories,
  type Message,
  type Role,
} from "@/lib/chat";
import type { Room } from "@/lib/rooms";

interface TourDetails {
  destination: string;
  startDate: string;
  meetingPoint: string;
  meetingTime: string;
  status: "upcoming" | "in-progress" | "completed";
  weatherTemp: string;
  leaderPhone: string;
}

const TOUR_MOCK_DATA: TourDetails = {
  destination: "کویر مرنجاب و دریاچه نمک",
  startDate: "۱۵ الی ۱۷ آبان",
  meetingPoint: "میدان آزادی، روبروی ایران‌فیلم",
  meetingTime: "۰۵:۰۰ صبح پنجشنبه",
  status: "in-progress",
  weatherTemp: "۲۴°C آفتابی",
  leaderPhone: "09120000000",
};

const currentUser: { name: string; role: Role } = {
  name: "شما",
  role: "leader",
};
const canModerate =
  currentUser.role === "leader" || currentUser.role === "co-leader";

const MAX_INPUT_HEIGHT = 140;

export default function TourChatRoom({ room }: { room: Room }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");
  const [asAnnouncement, setAsAnnouncement] = useState(false);

  const [panelOpen, setPanelOpen] = useState(false); // پیش‌فرض بسته در موبایل برای دیدن بهتر چت
  const [activeQuickTab, setActiveQuickTab] = useState<string | null>(
    "meeting",
  );
  const [storyStart, setStoryStart] = useState<number | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [unread, setUnread] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nearBottomRef = useRef(true);
  const prevLenRef = useRef(0);

  /* ───── اسکرول ───── */
  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (prevLenRef.current === 0) {
      scrollToBottom(false);
    } else if (last?.isMine || nearBottomRef.current) {
      scrollToBottom(true);
    } else {
      setUnread((u) => u + (messages.length - prevLenRef.current));
    }
    prevLenRef.current = messages.length;
  }, [messages, scrollToBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    nearBottomRef.current = distance < 120;
    setShowScrollBtn(distance > 200);
    if (distance < 120) setUnread(0);
  };

  /* ───── textarea ───── */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_INPUT_HEIGHT)}px`;
  }, [text]);

  const isEmpty = !text.trim();

  const sendMessage = () => {
    const value = text.trim();
    if (!value) return;

    const msg: Message = {
      id: Date.now().toString(),
      kind: asAnnouncement && canModerate ? "announcement" : "text",
      text: value,
      senderName: currentUser.name,
      role: currentUser.role,
      time: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
    };

    setMessages((prev) => [...prev, msg]);
    setText("");
    setAsAnnouncement(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (window.matchMedia("(max-width: 640px)").matches) setPanelOpen(false);
  };

  const markViewed = useCallback((id: string) => {
    setViewedStories((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-stone-50"
      dir="rtl"
      style={{ height: "100dvh" }}
    >
      {/* ───── ۱. هدر اختصاصی تور گردشگری ───── */}
      <header className="shrink-0 bg-white border-b border-gray-100 px-3 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            aria-label="بازگشت"
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src={room.coverImage || "/default-tour.jpg"}
                alt={room.title}
                fill
                sizes="44px"
                className="rounded-2xl object-cover ring-2 ring-emerald-100"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                <Compass className="w-2 h-2 text-white" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                  {room.title}
                </h1>
              </div>
              <p className="text-xs text-gray-500 truncate flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <MapPin className="w-3 h-3" />
                  {TOUR_MOCK_DATA.destination}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label="گزینه‌ها"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>
      <section className="shrink-0 bg-white border-b border-gray-100 shadow-xs">
        {true && (
          <StoryBar
            groups={mockStories}
            viewed={viewedStories}
            onOpen={setStoryStart}
            canAdd={canModerate}
            onAdd={() => {}}
          />
        )}
      </section>

      <div className="relative flex-1 min-h-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto overscroll-contain px-3 sm:px-4 py-4"
        >
          <div className="max-w-3xl mx-auto flex flex-col">
            <div className="flex justify-center mb-4">
              <span className="text-[11px] font-medium bg-white/90 border border-gray-200 text-gray-600 px-3.5 py-1 rounded-full shadow-xs">
                برنامه سفر: {TOUR_MOCK_DATA.destination}
              </span>
            </div>

            {messages.map((msg, i) => {
              const prev = messages[i - 1];
              const next = messages[i + 1];
              const sameAs = (o?: Message) =>
                !!o &&
                o.kind === "text" &&
                o.senderName === msg.senderName &&
                o.isMine === msg.isMine;

              return (
                <MessageItem
                  key={msg.id}
                  msg={msg}
                  isFirstInGroup={!sameAs(prev)}
                  isLastInGroup={!sameAs(next)}
                />
              );
            })}
          </div>
        </div>

        {showScrollBtn && (
          <button
            onClick={() => scrollToBottom(true)}
            aria-label="رفتن به آخرین پیام"
            className="absolute bottom-3 left-3 p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-emerald-600 rounded-full shadow-md active:scale-95 transition"
          >
            <ArrowDown className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unread.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
        )}
      </div>

      {/* ───── ۵. اینپوت چت ویژه همسفران و لیدر ───── */}
      <footer
        className="shrink-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2.5 sm:px-5"
        style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
      >
        {asAnnouncement && (
          <p className="max-w-3xl mx-auto text-[11px] text-amber-800 font-semibold mb-1.5 px-2 flex items-center gap-1.5 bg-amber-50 py-1 rounded-lg border border-amber-200">
            <Megaphone className="w-3.5 h-3.5 text-amber-600" />
            این پیام به عنوان «اعلان رسمی راهنمای تور» برای تمام همسفران سنجاق
            می‌شود.
          </p>
        )}

        <div
          className={`max-w-3xl mx-auto flex items-end gap-2 border rounded-2xl p-1.5 shadow-xs transition-all duration-200 ${
            asAnnouncement
              ? "bg-amber-50/60 border-amber-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200"
              : "bg-stone-50 border-stone-200 focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
          }`}
        >
          <div className="flex items-center gap-0.5 pb-0.5 text-stone-400">
            <button
              type="button"
              aria-label="ارسال تصویر یا فایل"
              className="p-2 rounded-xl hover:text-emerald-600 hover:bg-stone-100 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="ایموجی"
              className="p-2 rounded-xl hover:text-emerald-600 hover:bg-stone-100 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            {canModerate && (
              <button
                type="button"
                onClick={() => setAsAnnouncement((v) => !v)}
                title="ارسال اعلان به عنوان راهنمای تور"
                className={`p-2 rounded-xl transition-all ${
                  asAnnouncement
                    ? "text-amber-700 bg-amber-200 shadow-xs"
                    : "hover:text-amber-600 hover:bg-stone-100"
                }`}
              >
                <Megaphone className="w-5 h-5" />
              </button>
            )}
          </div>

          <textarea
            ref={inputRef}
            rows={1}
            dir="auto"
            value={text}
            placeholder={
              asAnnouncement
                ? "اعلان فوری برای همسفران (تغییر ساعت، توقف و...)..."
                : "پیامی برای همسفران بنویسید..."
            }
            onFocus={handleInputFocus}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 min-w-0 bg-transparent border-none focus:outline-none resize-none py-2 text-[14px] text-stone-800 placeholder-stone-400 leading-6 max-h-[140px] overflow-y-auto"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={isEmpty}
            aria-label="ارسال پیام"
            className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center transition-all ${
              !isEmpty
                ? `${
                    asAnnouncement
                      ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                  } text-white shadow-md active:scale-95`
                : "bg-stone-200 text-stone-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4 -scale-x-100" />
          </button>
        </div>
      </footer>

      {storyStart !== null && (
        <StoryViewer
          groups={mockStories}
          startIndex={storyStart}
          onClose={() => setStoryStart(null)}
          onViewed={markViewed}
        />
      )}
    </div>
  );
}

/* ───────────── کامپوننت‌های پیام با تم تور ───────────── */

function MessageItem({
  msg,
  isFirstInGroup,
  isLastInGroup,
}: {
  msg: Message;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}) {
  if (msg.kind === "system") {
    return (
      <div className="flex justify-center my-3">
        <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-emerald-600" />
          {msg.text}
        </span>
      </div>
    );
  }

  if (msg.kind === "announcement") {
    return (
      <div className="flex justify-center my-3">
        <div className="w-full max-w-[95%] sm:max-w-[85%] rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-200/60">
            <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Megaphone className="w-4 h-4" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-black text-amber-900">
                اعلان رسمی سفر
              </p>
              <p className="text-[11px] text-amber-700">
                {msg.senderName} (سرپرست تور)
              </p>
            </div>
            <span className="mr-auto text-[10px] text-amber-700/80 font-medium">
              {msg.time}
            </span>
          </div>
          <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap break-words font-medium">
            {msg.text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <TextBubble
      msg={msg}
      isFirstInGroup={isFirstInGroup}
      isLastInGroup={isLastInGroup}
    />
  );
}

function RoleBadge({ role }: { role?: Role }) {
  if (role === "leader") {
    return (
      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-1">
        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
        سرپرست تور
      </span>
    );
  }
  if (role === "co-leader") {
    return (
      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
        کمک‌لیدر
      </span>
    );
  }
  return null;
}

function Avatar({ src, name }: { src?: string; name: string }) {
  return (
    <div className="relative w-8 h-8 shrink-0">
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="32px"
          className="rounded-xl object-cover ring-1 ring-stone-200"
        />
      ) : (
        <div className="w-full h-full rounded-xl bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
          {name.charAt(0)}
        </div>
      )}
    </div>
  );
}

function TextBubble({
  msg,
  isFirstInGroup,
  isLastInGroup,
}: {
  msg: Message;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}) {
  const { isMine } = msg;
  const showName = isFirstInGroup && !isMine;
  const showAvatar = isLastInGroup && !isMine;

  return (
    <div
      className={`flex w-full ${isMine ? "justify-end" : "justify-start"} ${
        isFirstInGroup ? "mt-3 first:mt-0" : "mt-1"
      }`}
    >
      <div
        className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${
          isMine ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isMine &&
          (showAvatar ? (
            <Avatar src={msg.avatar} name={msg.senderName} />
          ) : (
            <div className="w-8 shrink-0" />
          ))}

        <div
          className={`flex flex-col gap-1 px-3.5 py-2 shadow-xs ${
            isMine
              ? "bg-emerald-700 text-white rounded-2xl rounded-bl-xs"
              : "bg-white border border-stone-200/80 text-stone-800 rounded-2xl rounded-br-xs"
          }`}
        >
          {showName && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] font-bold text-stone-700">
                {msg.senderName}
              </span>
              <RoleBadge role={msg.role} />
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {msg.text}
          </p>
          <span
            className={`text-[10px] self-end mt-0.5 ${
              isMine ? "text-emerald-200" : "text-stone-400"
            }`}
          >
            {msg.time}
          </span>
        </div>
      </div>
    </div>
  );
}
