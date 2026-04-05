import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-300 text-xs">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-400 hover:text-gray-600 text-xs font-mono tracking-wide transition-colors uppercase"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand text-xs font-mono tracking-wide uppercase">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
