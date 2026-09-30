"use client";

import { useEffect, useState } from "react";
import { CalendarClock, BarChart3, Check } from "lucide-react";
import type { Poll, RoomEvent } from "@/lib/chat";

const fa = (n: number, pad = 0) =>
  n.toLocaleString("fa-IR", {
    minimumIntegerDigits: pad || 1,
    useGrouping: false,
  });

export default function LeaderCards({
  event,
  poll,
}: {
  event: RoomEvent;
  poll: Poll;
}) {}

/* ───────── کارت رویداد با شمارش معکوس ───────── */
function EventCard({ event }: { event: RoomEvent }) {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [going, setGoing] = useState(false);

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
}

function PollCard({ poll }: { poll: Poll }) {
  const [options, setOptions] = useState(poll.options);
  const [selected, setSelected] = useState<string | null>(null);

  const total = options.reduce((sum, o) => sum + o.votes, 0);

  const vote = (id: string) => {
    if (selected) return; // هر کاربر یک رأی
    setSelected(id);
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o)),
    );
  };
}
