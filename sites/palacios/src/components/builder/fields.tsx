"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-800">{label}</span>
      {hint && <span className="block text-xs text-gray-500 mt-0.5">{hint}</span>}
      <span className="block mt-1.5">{children}</span>
    </label>
  );
}

const inputClass =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white " +
  "focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 " +
  "placeholder:text-gray-400";

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  );
}

export function StepHeading({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-1">{lead}</p>
    </div>
  );
}
