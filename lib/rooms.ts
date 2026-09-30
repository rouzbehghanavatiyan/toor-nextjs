export interface Room {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  avatarImage: string;
  creatorName: string;
  score: number;
  membersCount: number;
  city: string;
}

export const rooms: Room[] = [
  {
    id: "1",
    title: "اتاق استراتژی کلش",
    description: "بررسی ترکیب‌های اتک، وارها و استراتژی‌های جدید تاون‌هال.",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg",
    creatorName: "روزبه",
    score: 4.9,
    membersCount: 24,
    city: "اهواز",
  },
  {
    id: "2",
    title: "اتاق وار و کلن‌وار لیگ",
    description: "هماهنگی تارگت‌ها، اعلام دانه‌ها و لاین‌آپ وار لیگ ماهانه.",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/cook1.jpg",
    creatorName: "سعید",
    score: 4.7,
    membersCount: 18,
    city: "تهران",
  },
  {
    id: "3",
    title: "گپ آزاد و تبادل تجربه",
    description: "گفت‌وگو درباره آپدیت‌ها، ترید اکانت و تبادل تجربیات بازی.",
    coverImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/inv3.jpeg",
    creatorName: "آرمان",
    score: 4.5,
    membersCount: 35,
    city: "اصفهان",
  },
  {
    id: "4",
    title: "دورهمی گیمرهای شیراز",
    description: "هماهنگی ایونت‌های حضوری و آنلاین کلش و تورنومنت‌ها.",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    avatarImage: "/assets/img/4d688bcf-f53b-42b6-a98d-3254619f3b58.jpg",
    creatorName: "نوید",
    score: 4.8,
    membersCount: 12,
    city: "شیراز",
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}