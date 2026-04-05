import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <span className="font-display font-bold text-[12rem] text-gray-200 leading-none block select-none">
          404
        </span>
        <div className="brand-rule max-w-xs mx-auto my-8" />
        <h1 className="font-display font-bold text-3xl text-black mb-4">Page Not Found</h1>
        <p className="font-body text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg font-body font-semibold text-sm tracking-wide transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand px-6 py-3 rounded-lg font-body font-medium text-sm tracking-wide transition-all"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
