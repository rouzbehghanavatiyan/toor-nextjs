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
  Pin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import StoryBar from "./StoryBar";
import StoryViewer from "./StoryViewer";
import LeaderCards from "./LeaderCards";
import {
  initialMessages,
  mockEvent,
  mockPinned,
  mockPoll,
  mockStories,
  type Message,
  type Role,
} from "@/lib/chat";
import type { Room } from "@/lib/rooms";

const currentUser: { name: string; role: Role } = {
  name: "شما",
  role: "leader",
};
const canModerate =
  currentUser.role === "leader" || currentUser.role === "co-leader";

const MAX_INPUT_HEIGHT = 140;

export default function ChatRoom({ room }: { room: Room }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");
  const [asAnnouncement, setAsAnnouncement] = useState(false);

  const [panelOpen, setPanelOpen] = useState(true);
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
      scrollToBottom(false); // ورود اولیه
    } else if (last?.isMine || nearBottomRef.current) {
      scrollToBottom(true);
    } else {
      // پیام جدید وقتی کاربر بالا اسکرول کرده
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

    // TODO: socket.emit("message", msg)
    setMessages((prev) => [...prev, msg]);
    setText("");
    setAsAnnouncement(false);
    inputRef.current?.focus();
  };

  // در موبایل با فوکوس روی ورودی، پنل جمع می‌شود تا کیبورد جا را نگیرد
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
      className="fixed inset-0 z-[60] flex flex-col bg-slate-50"
      dir="rtl"
      style={{ height: "100dvh" }}
    >
      {/* ───── هدر ───── */}
      <header className="shrink-0 bg-white border-b border-gray-100 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            aria-label="بازگشت"
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src={room.coverImage}
                alt={room.title}
                fill
                sizes="40px"
                className="rounded-full object-cover ring-2 ring-indigo-50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                {room.title}
              </h1>
              <p className="text-xs text-gray-500 truncate">
                <span className="text-emerald-600 font-medium">
                  {room.membersCount} نفر آنلاین
                </span>
                {" · "}لیدر: {room.creatorName}
              </p>
            </div>
          </div>
        </div>
        <button
          aria-label="گزینه‌ها"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* ───── پنل لیدر: استوری + سنجاق + کارت‌ها ───── */}
      <section className="shrink-0 bg-white border-b border-gray-100 shadow-sm">
        {panelOpen && (
          <StoryBar
            groups={mockStories}
            viewed={viewedStories}
            onOpen={setStoryStart}
            canAdd={canModerate}
            onAdd={() => {
              /* TODO: آپلود استوری جدید */
            }}
          />
        )}

        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50/70 border-y border-amber-100">
          <Pin className="w-4 h-4 text-amber-600 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-amber-700">
              پیام سنجاق‌شده · {mockPinned.author}
            </p>
            <p className="text-xs text-gray-700 truncate">{mockPinned.text}</p>
          </div>
          <button
            onClick={() => setPanelOpen((o) => !o)}
            aria-label={panelOpen ? "بستن پنل لیدر" : "باز کردن پنل لیدر"}
            className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-full transition-colors cursor-pointer"
          >
            {panelOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {panelOpen && (
          <div className="pt-3 bg-slate-50/60">
            <LeaderCards event={mockEvent} poll={mockPoll} />
          </div>
        )}
      </section>

      {/* ───── پیام‌ها (تنها بخش اسکرول‌شونده) ───── */}
      <div className="relative flex-1 min-h-0">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto overscroll-contain px-3 sm:px-4 py-4"
        >
          <div className="max-w-4xl mx-auto flex flex-col">
            <div className="flex justify-center mb-4">
              <span className="text-[10px] sm:text-xs font-medium bg-gray-200/70 text-gray-500 px-3 py-1 rounded-full">
                امروز
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
            className="absolute bottom-3 left-3 p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 rounded-full shadow-md active:scale-95 transition cursor-pointer"
          >
            <ArrowDown className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unread.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
        )}
      </div>

      {/* ───── ورودی (چسبیده به کف + safe-area) ───── */}
      <footer
        className="shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-2 sm:px-5"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        {asAnnouncement && (
          <p className="max-w-4xl mx-auto text-[11px] text-amber-700 font-medium mb-1.5 px-2 flex items-center gap-1">
            <Megaphone className="w-3.5 h-3.5" />
            این پیام به‌صورت «اعلان لیدر» برای همه ارسال می‌شود
          </p>
        )}
        <div
          className={`max-w-4xl mx-auto flex items-end gap-2 border rounded-3xl p-1.5 shadow-sm transition-all duration-200 focus-within:bg-white focus-within:ring-4 ${
            asAnnouncement
              ? "bg-amber-50 border-amber-300 focus-within:border-amber-500 focus-within:ring-amber-100/70"
              : "bg-slate-50 border-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-100/60"
          }`}
        >
          <div className="flex items-center gap-0.5 pb-0.5 text-slate-400">
            <button
              type="button"
              aria-label="ایموجی"
              className="p-2 rounded-full hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="پیوست فایل"
              className="p-2 rounded-full hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            {canModerate && (
              <button
                type="button"
                onClick={() => setAsAnnouncement((v) => !v)}
                aria-label="ارسال به‌عنوان اعلان"
                aria-pressed={asAnnouncement}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  asAnnouncement
                    ? "text-amber-600 bg-amber-100"
                    : "hover:text-amber-600 hover:bg-slate-100"
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
              asAnnouncement ? "اعلان برای اعضا..." : "پیامی بنویسید..."
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
            className="flex-1 min-w-0 bg-transparent border-none focus:outline-none resize-none py-2 text-[14px] sm:text-base text-slate-800 placeholder-slate-400 leading-6 max-h-[140px] overflow-y-auto"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={isEmpty}
            aria-label="ارسال پیام"
            className={`p-2.5 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ${
              !isEmpty
                ? `${
                    asAnnouncement
                      ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25"
                  } text-white shadow-md active:scale-90 cursor-pointer`
                : "bg-slate-200/80 text-slate-400 cursor-not-allowed opacity-60"
            }`}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 -scale-x-100" />
          </button>
        </div>
      </footer>

      {/* ───── نمایشگر استوری ───── */}
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

/* ───────────── انواع پیام ───────────── */

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
        <span className="text-[11px] text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full">
          {msg.text}
        </span>
      </div>
    );
  }

  if (msg.kind === "announcement") {
    return (
      <div className="flex justify-center my-3">
        <div className="w-full max-w-[92%] sm:max-w-[80%] rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Megaphone className="w-4 h-4" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-bold text-amber-800">اعلان لیدر</p>
              <p className="text-[11px] text-amber-700/80">{msg.senderName}</p>
            </div>
            <span className="mr-auto text-[10px] text-amber-700/70">
              {msg.time}
            </span>
          </div>
          <p className="text-sm text-gray-800 leading-7 whitespace-pre-wrap break-words">
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
  if (!role || role === "member") return null;
  return (
    <span
      className={`text-[9px] font-bold px-1.5 py-px rounded-md ${
        role === "leader"
          ? "bg-amber-100 text-amber-700"
          : "bg-indigo-100 text-indigo-700"
      }`}
    >
      {role === "leader" ? "لیدر" : "کو-لیدر"}
    </span>
  );
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
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">
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
          className={`flex flex-col gap-0.5 px-3 py-2 shadow-sm ${
            isMine
              ? "bg-indigo-600 text-white rounded-2xl rounded-bl-sm"
              : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-br-sm"
          }`}
        >
          {showName && (
            <span className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-indigo-600">
                {msg.senderName}
              </span>
              <RoleBadge role={msg.role} />
            </span>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {msg.text}
          </p>
          <span
            className={`text-[10px] self-end ${
              isMine ? "text-indigo-200" : "text-gray-400"
            }`}
          >
            {msg.time}
          </span>
        </div>
      </div>
    </div>
  );
}
