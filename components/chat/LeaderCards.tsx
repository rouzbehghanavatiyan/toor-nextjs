"use client";

import { useEffect, useState } from "react";
import { CalendarClock, BarChart3, Check } from "lucide-react";
import type { Poll, RoomEvent } from "@/lib/chat";

const fa = (n: number, pad = 0) =>
  n.toLocaleString("fa-IR", { minimumIntegerDigits: pad || 1, useGrouping: false });

export default function LeaderCards({
  event,
  poll,
}: {
  event: RoomEvent;
  poll: Poll;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-3 pb-3 items-stretch">
      <EventCard event={event} />
      <PollCard poll={poll} />
    </div>
  );
}

/* ───────── کارت رویداد با شمارش معکوس ───────── */
function EventCard({ event }: { event: RoomEvent }) {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [going, setGoing] = useState(false);

  // زمان فقط بعد از mount محاسبه می‌شود تا hydration mismatch نداشته باشیم
  useEffect(() => {
    setTarget(Date.now() + event.startsInMs);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [event.startsInMs]);

  const diff = target === null ? null : Math.max(0, target - now);
  const h = diff === null ? null : Math.floor(diff / 3_600_000);
  const m = diff === null ? null : Math.floor((diff % 3_600_000) / 60_000);
  const s = diff === null ? null : Math.floor((diff % 60_000) / 1000);

  return (
    <div className="snap-start shrink-0 w-[260px] rounded-2xl p-3.5 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-indigo-100 font-medium">
          <CalendarClock className="w-4 h-4" />
          <span>رویداد بعدی</span>
        </div>
        <h3 className="font-bold mt-1.5">{event.title}</h3>
        <p className="text-xs text-indigo-100 mt-0.5">{event.description}</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-1 font-mono text-lg font-bold tabular-nums"
          dir="ltr"
        >
          {diff === null ? (
            <span>--:--:--</span>
          ) : (
            <span>
              {fa(h!, 2)}:{fa(m!, 2)}:{fa(s!, 2)}
            </span>
          )}
        </div>
        <button
          onClick={() => setGoing((g) => !g)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 cursor-pointer ${
            going
              ? "bg-white text-indigo-700"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
        >
          {going ? "✓ حاضرم" : "حاضرم"}
        </button>
      </div>
      <p className="text-[11px] text-indigo-100 mt-2">
        {fa(event.goingCount + (going ? 1 : 0))} نفر اعلام حضور کرده‌اند
      </p>
    </div>
  );
}

/* ───────── کارت نظرسنجی ───────── */
function PollCard({ poll }: { poll: Poll }) {
  const [options, setOptions] = useState(poll.options);
  const [selected, setSelected] = useState<string | null>(null);

  const total = options.reduce((sum, o) => sum + o.votes, 0);

  const vote = (id: string) => {
    if (selected) return; // هر کاربر یک رأی
    setSelected(id);
    // TODO: socket.emit("poll:vote", { pollId: poll.id, optionId: id })
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o))
    );
  };

  return (
    <div className="snap-start shrink-0 w-[260px] rounded-2xl p-3.5 bg-white border border-gray-200 shadow-sm">
      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
        <BarChart3 className="w-4 h-4 text-indigo-600" />
        <span>نظرسنجی لیدر</span>
      </div>
      <h3 className="font-bold text-sm text-gray-900 mt-1.5 mb-2.5">
        {poll.question}
      </h3>

      <div className="space-y-1.5">
        {options.map((o) => {
          const pct = total ? Math.round((o.votes / total) * 100) : 0;
          const isSel = selected === o.id;
          return (
            <button
              key={o.id}
              onClick={() => vote(o.id)}
              disabled={!!selected}
              className={`relative w-full overflow-hidden rounded-xl border text-xs px-3 py-2 flex items-center justify-between transition-colors ${
                isSel
                  ? "border-indigo-400"
                  : "border-gray-200 hover:border-indigo-300"
              } ${selected ? "cursor-default" : "cursor-pointer"}`}
            >
              {selected && (
                <span
                  className={`absolute inset-y-0 right-0 ${
                    isSel ? "bg-indigo-100" : "bg-gray-100"
                  } transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative flex items-center gap-1 text-gray-800 font-medium">
                {isSel && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                {o.text}
              </span>
              {selected && (
                <span className="relative text-gray-500">{fa(pct)}٪</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-gray-400 mt-2">{fa(total)} رأی</p>
    </div>
  );
}