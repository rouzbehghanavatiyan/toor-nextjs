import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-gray-500 mb-4">این اتاق وجود ندارد.</p>
      <Link href="/" className="text-indigo-600 font-medium hover:underline">
        بازگشت به لیست اتاق‌ها
      </Link>
    </div>
  );
}