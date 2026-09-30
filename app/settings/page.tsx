export default function SettingsPage() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">تنظیمات سیستم</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
          <input 
            type="text" 
            placeholder="نام خود را وارد کنید..." 
            className="w-full border-gray-300 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">دریافت اعلان‌ها (Notifications)</label>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="notif" className="w-4 h-4 text-blue-600" />
            <label htmlFor="notif" className="text-gray-600 cursor-pointer">
              فعال‌سازی اعلان‌های وب‌سوکت
            </label>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}
