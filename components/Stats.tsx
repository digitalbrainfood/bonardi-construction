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
    <div className="relative group">
      {/* Gold accent line on hover */}
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-gold transition-all duration-500" />
      <div className="pt-6 pb-8 px-2">
        <div className="flex items-start gap-1 mb-2">
          <span className="font-display font-bold text-display-lg text-ivory">{count}</span>
          <span className="font-display font-bold text-display-md text-gold mt-1">{suffix}</span>
        </div>
        <p className="font-body font-semibold text-ivory text-base mb-1">{label}</p>
        <p className="font-body text-cement text-sm">{description}</p>
      </div>
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
    <section ref={sectionRef} className="relative py-20 bg-charcoal border-y border-slate overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display font-bold text-[20vw] text-slate/[0.06] select-none tracking-tighter leading-none">
          BUILT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-gold" />
          <span className="section-label">By The Numbers</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-charcoal">
              <StatItem {...stat} start={started} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
