import React from "react";
import { Play, Clock, Eye } from "lucide-react";

// داده‌های تستی ویدیوهای لیدرها
const mockLeaderVideos = [
  {
    id: 1,
    title: "معرفی مسیر پیمایش دره چاک‌رود",
    leaderName: "علیرضا رضایی",
    leaderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    duration: "03:40",
    views: "۱.۲k",
  },
  {
    id: 2,
    title: "تجهیزات ضروری صعود زمستانه دماوند",
    leaderName: "سارا حسینی",
    leaderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80",
    duration: "05:15",
    views: "۸۵۰",
  },
  {
    id: 3,
    title: "کمپینگ شبانه در کویر مرنجاب",
    leaderName: "محمدرضا کاظمی",
    leaderAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
    duration: "02:10",
    views: "۲.۱k",
  },
  {
    id: 4,
    title: "نکات بقا و جهت‌یابی در جنگل‌های هیرکانی",
    leaderName: "فرزاد نوری",
    leaderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    duration: "04:30",
    views: "۳.۴k",
  },
  {
    id: 5,
    title: "آشنایی با اصول اکوتوریسم و رد پای صفر",
    leaderName: "مینا رستگار",
    leaderAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80",
    duration: "06:05",
    views: "۹۸۰",
  },
  {
    id: 6,
    title: "پیمایش غار علیصدر؛ شگفتی آبی ایران",
    leaderName: "حمید صادقی",
    leaderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    duration: "01:50",
    views: "۱.۵k",
  },
];

export default function ShowPage() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-6xl mx-auto" dir="rtl">
      {/* تیتر بخش */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">ویدیوها و تجربیات لیدرها</h2>
          <p className="text-sm text-gray-500 mt-1">گزیده‌ای از آموزش‌ها، معرفی مقاصد و خاطرات تورلیدرها</p>
        </div>
      </div>

      {/* چیدمان شبکه‌ای ۳ ستونه */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLeaderVideos.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col bg-gray-50/70 hover:bg-white rounded-xl border border-gray-200/80 hover:border-blue-200 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* پلیر ویدیو */}
            <div className="relative aspect-video w-full bg-black">
              <video
                controls
                preload="none"
                poster={item.poster}
                className="w-full h-full object-cover"
              >
                <source src={item.videoUrl} type="video/mp4" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>

              {/* برچسب مدت زمان ویدیو */}
              <div className="absolute bottom-2 left-2 pointer-events-none flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3" />
                <span>{item.duration}</span>
              </div>
            </div>

            {/* اطلاعات ویدیو و لیدر */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                {/* مشخصات لیدر */}
                <div className="flex items-center gap-2">
                  <img
                    src={item.leaderAvatar}
                    alt={item.leaderName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
                  />
                  <span className="font-medium text-gray-700">{item.leaderName}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
