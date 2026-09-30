export default function TeamsPage() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">مدیریت تیم‌ها</h1>
      <p className="text-gray-600 mb-6">
        در این بخش می‌توانید اعضای تیم، وضعیت حضور آن‌ها (آنلاین/آفلاین) را در
        آینده از طریق سوکت مشاهده کنید.
      </p>

      {/* یک لیست تستی */}
      <div className="grid gap-4 mt-4">
        <div className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
          <span className="font-medium text-gray-700">تیم توسعه فرانت‌اند</span>
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
            فعال
          </span>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
          <span className="font-medium text-gray-700">تیم بک‌اند</span>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            ۳ عضو آنلاین
          </span>
        </div>
      </div>
    </div>
  );
}
