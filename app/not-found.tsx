import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-6xl font-bold text-red-600">404</h1>
      <p className="mb-8 text-xl text-gray-700">
        Oops! The page you&pos;re looking for doesn&pos;t exist.
      </p>
      <Link
        href="/"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
