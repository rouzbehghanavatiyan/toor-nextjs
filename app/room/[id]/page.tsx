import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChatRoom from "@/components/chat/ChatRoom";
import { getRoomById } from "@/lib/rooms";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const room = getRoomById(id);
  return { title: room ? room.title : "اتاق یافت نشد" };
}

export default async function RoomPage({ params }: Props) {
  const { id } = await params;
  const room = getRoomById(id);
  if (!room) notFound();

  return <ChatRoom room={room} />;
}