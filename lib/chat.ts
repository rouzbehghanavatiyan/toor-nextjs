export type Role = "leader" | "co-leader" | "member";
export type MessageKind = "text" | "announcement" | "system";

export interface Message {
  id: string;
  kind: MessageKind;
  text: string;
  senderName: string;
  role?: Role;
  avatar?: string;
  time: string;
  isMine: boolean;
}

export interface StorySlide {
  id: string;
  image: string;
  title: string;
  caption?: string;
}

export interface StoryGroup {
  id: string;
  label: string;
  thumb: string;
  author: string;
  slides: StorySlide[];
}

export interface PinnedMessage {
  author: string;
  text: string;
}

export interface RoomEvent {
  id: string;
  title: string;
  description: string;
  startsInMs: number;
  goingCount: number;
}

export interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
}

/* ───────── داده‌ی تستی ───────── */

const IMG_1 =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80";
const IMG_2 =
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80";
const IMG_3 =
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80";

export const mockStories: StoryGroup[] = [
  {
    id: "st1",
    label: "اعلان لیدر",
    thumb: IMG_1,
    author: "روزبه",
    slides: [
      {
        id: "st1-1",
        image: IMG_1,
        title: "وار لیگ این ماه",
        caption: "ثبت‌نام تا جمعه ساعت ۲۲ باز است. اتک‌ها الزامی است!",
      },
      {
        id: "st1-2",
        image: IMG_2,
        title: "قانون جدید دانه‌ها",
        caption: "دانه‌ها فقط برای اعضای فعال وار ارسال می‌شود.",
      },
    ],
  },
  {
    id: "st2",
    label: "وار",
    thumb: IMG_2,
    author: "روزبه",
    slides: [
      {
        id: "st2-1",
        image: IMG_2,
        title: "لاین‌آپ امشب",
        caption: "۱۰ نفر اول لیست اتک می‌زنند. بقیه اسکات بگیرند.",
      },
    ],
  },
  {
    id: "st3",
    label: "قوانین",
    thumb: IMG_3,
    author: "سعید",
    slides: [
      {
        id: "st3-1",
        image: IMG_3,
        title: "قوانین اتاق",
        caption: "احترام، بدون تبلیغ و بدون اسپم. تخلف = اخراج.",
      },
    ],
  },
  {
    id: "st4",
    label: "تورنومنت",
    thumb: IMG_1,
    author: "آرمان",
    slides: [
      {
        id: "st4-1",
        image: IMG_1,
        title: "تورنومنت آخر هفته",
        caption: "جایزه برای ۳ تیم برتر. ظرفیت محدود است.",
      },
    ],
  },
];

export const mockPinned: PinnedMessage = {
  author: "روزبه",
  text: "امشب ساعت ۲۲ وار شروع می‌شود؛ همه حتماً قبل از شروع اتک‌هایشان را آماده کنند و حضورشان را اعلام کنند.",
};

export const mockEvent: RoomEvent = {
  id: "ev1",
  title: "شروع وار لیگ",
  description: "هماهنگی نهایی و اعلام تارگت‌ها",
  startsInMs: 2 * 60 * 60 * 1000 + 15 * 60 * 1000,
  goingCount: 18,
};

export const mockPoll: Poll = {
  id: "p1",
  question: "ساعت مناسب تمرین وار؟",
  options: [
    { id: "a", text: "۲۰:۰۰", votes: 9 },
    { id: "b", text: "۲۱:۰۰", votes: 14 },
    { id: "c", text: "۲۲:۰۰", votes: 5 },
  ],
};

export const initialMessages: Message[] = [
  {
    id: "m0",
    kind: "system",
    text: "روزبه اتاق را ایجاد کرد",
    senderName: "سیستم",
    time: "19:00",
    isMine: false,
  },
  {
    id: "m1",
    kind: "announcement",
    text: "بچه‌ها ثبت‌نام وار لیگ امشب ساعت ۲۱ بسته می‌شود. هر کس نمی‌تواند بیاید همین حالا اعلام کند.",
    senderName: "روزبه",
    role: "leader",
    time: "19:30",
    isMine: false,
  },
  {
    id: "m2",
    kind: "text",
    text: "سلام بچه‌ها، کسی برای وار امشب آماده هست؟",
    senderName: "سعید",
    role: "co-leader",
    avatar: "/assets/img/cook1.jpg",
    time: "20:15",
    isMine: false,
  },
  {
    id: "m3",
    kind: "text",
    text: "سلام! آره من ترکیب لاوالون رو تمرین کردم، اوکیه.",
    senderName: "شما",
    time: "20:17",
    isMine: true,
  },
  {
    id: "m4",
    kind: "text",
    text: "عالیه، فقط حواستون به کستل حریف باشه که الکترو دراگون داره.",
    senderName: "آرمان",
    avatar: "/assets/img/inv3.jpeg",
    time: "20:18",
    isMine: false,
  },
  {
    id: "m5",
    kind: "text",
    text: "من هم آماده‌ام، ساعت ۱۰ شروع کنیم؟",
    senderName: "آرمان",
    avatar: "/assets/img/inv3.jpeg",
    time: "20:18",
    isMine: false,
  },
];