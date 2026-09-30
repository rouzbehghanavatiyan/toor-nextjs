"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { StoryGroup } from "@/lib/chat";

interface Props {
  groups: StoryGroup[];
  viewed: Set<string>;
  onOpen: (index: number) => void;
  canAdd?: boolean;
  onAdd?: () => void;
}

export default function StoryBar({
  groups,
  viewed,
  onOpen,
  canAdd,
  onAdd,
}: Props) {
  return (
    <div className="flex items-start gap-3.5 overflow-x-auto no-scrollbar px-3 py-3">
      {canAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex flex-col items-center gap-1.5 shrink-0 w-16 cursor-pointer"
        >
          <span className="w-[63px] h-[63px] rounded-full border-2 border-dashed border-indigo-300 bg-indigo-50 text-indigo-500 flex items-center justify-center hover:bg-indigo-100 transition-colors">
            <Plus className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-gray-500 truncate w-full text-center">
            استوری جدید
          </span>
        </button>
      )}

      {groups.map((g, i) => {
        const isViewed = viewed.has(g.id);
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => onOpen(i)}
            className="flex flex-col items-center gap-1.5 shrink-0 w-16 cursor-pointer group"
          >
            <span
              className={`p-[2.5px] rounded-full transition-colors ${
                isViewed
                  ? "bg-gray-300"
                  : "bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600"
              }`}
            >
              <span className="block p-[2px] bg-white rounded-full">
                <span className="relative block w-[54px] h-[54px]">
                  <Image
                    src={g.thumb}
                    alt={g.label}
                    fill
                    sizes="54px"
                    className="rounded-full object-cover group-active:scale-95 transition-transform"
                  />
                </span>
              </span>
            </span>
            <span
              className={`text-[11px] truncate w-full text-center ${
                isViewed ? "text-gray-400" : "text-gray-700 font-medium"
              }`}
            >
              {g.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
