import React from "react";

export default function Stats({ stats = [] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="relative rounded-2xl bg-white border border-slate-200 shadow-sm p-5 hover:shadow-md transition"
        >
          {/* Accent */}
          <div className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-cyan-500 to-blue-600" />

          <div className="pl-3">
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">
              {item.label || "Stat"}
            </p>

            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {item.value || 0}
            </p>

            {item.sub && (
              <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
