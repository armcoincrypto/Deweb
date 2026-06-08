"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

export function PasswordField({
  label,
  value,
  onChange,
  required,
  autoComplete = "current-password",
  placeholder,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
      {label}
      <div className="relative mt-2">
        <input
          type={visible ? "text" : "password"}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-4 pr-12 text-white placeholder:text-white/25 focus:border-deweb-cyan/50 focus:outline-none focus:ring-1 focus:ring-deweb-cyan/30"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-white/45 hover:text-deweb-cyan"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.414-.586M9.88 4.24A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 01-4.12 5.12M6.61 6.61A11.8 11.8 0 001 12.5C2.73 16.89 7 20 12 20a10.9 10.9 0 004.24-.88"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M2 12.5C3.73 8.11 8 5 13 5s9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S3.73 16.89 2 12.5z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="13" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>
    </label>
  );
}

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(
          "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white",
          "placeholder:text-white/25 focus:border-deweb-cyan/50 focus:outline-none focus:ring-1 focus:ring-deweb-cyan/30"
        )}
      />
    </label>
  );
}
