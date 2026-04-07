import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="font-sora font-bold text-7xl text-bright-turquoise mb-4">404</p>
        <h1 className="font-sora font-bold text-2xl text-white mb-3">Page Not Found</h1>
        <p className="font-inter text-white/60 mb-8">
          This page doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block font-inter font-semibold text-sm bg-deep-teal text-white px-8 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
