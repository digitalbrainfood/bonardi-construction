"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { value: 30, suffix: "+", label: "Years of Experience", description: "Decades of mastery in the field" },
  { value: 500, suffix: "+", label: "Projects Completed", description: "Residential & commercial builds" },
  { value: 20, suffix: "+", label: "Service Offerings", description: "From asphalt to fire restoration" },
  { value: 3, suffix: "", label: "Licensed Jurisdictions", description: "NYC, Nassau & Suffolk County" },
];

function StatItem({ value, suffix, label, description, start }: (typeof stats)[0] & { start: boolean }) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="relative group text-center py-10 px-6">
      <div className="flex items-start justify-center gap-1 mb-3">
        <span className="font-display font-bold text-display-lg text-brand">
          {count}
        </span>
        {suffix && (
          <span className="font-display font-bold text-display-md text-accent mt-1">
            {suffix}
          </span>
        )}
      </div>
      <p className="font-body font-semibold text-gray-900 text-base mb-1">
        {label}
      </p>
      <p className="font-body text-gray-500 text-sm">{description}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-white border-y border-gray-200 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display font-bold text-[20vw] text-gray-100 select-none tracking-tighter leading-none">
          BUILT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-brand" />
          <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand">
            By The Numbers
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`${
                i < stats.length - 1 ? "lg:border-r lg:border-gray-200" : ""
              } ${i < 2 ? "border-b border-gray-200 lg:border-b-0" : ""}`}
            >
              <StatItem {...stat} start={started} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
