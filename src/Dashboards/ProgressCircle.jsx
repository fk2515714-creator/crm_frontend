import React from "react";

export default function ProgressCircle({ value = 0, label = "No Label" }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const safeValue = Number(value) || 0;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200">
      {/* Circle */}
      <div className="relative">
        <svg viewBox="0 0 40 40" className="w-16 h-16">
          {/* Background */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="4"
          />

          {/* Progress */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            fill="transparent"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 20 20)"
          />

          {/* Gradient */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Value */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-slate-900 text-[10px] font-bold"
          >
            {safeValue}%
          </text>
        </svg>
      </div>

      {/* Info */}
      <div className="leading-tight">
        <span className="text-[11px] text-slate-500 uppercase tracking-wide">
          {label}
        </span>
        <p className="text-sm font-semibold text-slate-800">Progress</p>
      </div>
    </div>
  );
}
