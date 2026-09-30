// app/leaders/[id]/page.tsx
import LeaderProfile from '@/components/Leaders/LeaderProfile';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function SingleLeaderPage({ params }: Props) {
  const leaderId = params.id;

  // در یک پروژه واقعی، اینجا اطلاعات لیدر را از API یا دیتابیس (مثل EF Core/PostgreSQL) می‌گیرید
  // const leaderData = await fetchLeaderById(leaderId);
  // if (!leaderData) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* کامپوننت پروفایل را صدا می‌زنیم و آیدی لیدر را به آن پاس می‌دهیم */}
      <LeaderProfile id={leaderId} />
    </main>
  );
}
