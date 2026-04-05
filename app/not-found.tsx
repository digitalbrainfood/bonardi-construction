import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-obsidian">
      <div className="text-center px-6">
        <span className="font-display font-bold text-[12rem] text-slate/30 leading-none block select-none">
          404
        </span>
        <div className="gold-rule max-w-xs mx-auto my-8" />
        <h1 className="font-display font-bold text-3xl text-ivory mb-4">Page Not Found</h1>
        <p className="font-body text-ash mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-gold hover:bg-gold-light text-obsidian px-6 py-3 font-body font-semibold text-sm tracking-wide transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="border border-slate hover:border-gold text-ash hover:text-gold px-6 py-3 font-body font-medium text-sm tracking-wide transition-all"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
