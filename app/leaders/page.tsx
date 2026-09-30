import LeaderCards from "@/components/Leaders/LeaderCards";

export default function LeadersPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            تور لیدرهای ما
          </h1>
          <p className="mt-2 text-gray-600">
            بهترین راهنمایان تور را برای سفر بعدی خود پیدا کنید.
          </p>
        </div>
        <LeaderCards />
      </div>
    </main>
  );
}
