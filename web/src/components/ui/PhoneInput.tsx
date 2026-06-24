"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  countryFlag,
  formatPhoneNumber,
  parsePhoneNumber,
  type CountryCode,
} from "@/lib/country-codes";

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
};

export function PhoneInput({
  value,
  onChange,
  label,
  placeholder = "Phone number",
  searchPlaceholder = "Search country…",
  className,
}: PhoneInputProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [national, setNational] = useState("");

  useEffect(() => {
    const parsed = parsePhoneNumber(value);
    setCountry(parsed.country);
    setNational(parsed.national);
  }, [value]);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [open]);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
      requestAnimationFrame(() => {
        const selected = listRef.current?.querySelector('[aria-selected="true"]');
        selected?.scrollIntoView({ block: "nearest" });
      });
    }
  }, [open, country.iso]);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return COUNTRY_CODES;

    return COUNTRY_CODES.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.dial.includes(query.replace(/\D/g, "")) ||
        item.iso.toLowerCase().includes(query)
    );
  }, [search]);

  function updatePhone(nextCountry: CountryCode, nextNational: string) {
    setCountry(nextCountry);
    setNational(nextNational);
    onChange(formatPhoneNumber(nextCountry, nextNational));
  }

  function selectCountry(nextCountry: CountryCode) {
    updatePhone(nextCountry, national);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {label && (
        <span className="block text-xs font-bold uppercase text-white/40">{label}</span>
      )}

      <div
        className={cn(
          "mt-2 flex overflow-hidden rounded-xl border border-white/10 bg-black/30 focus-within:border-deweb-cyan/50",
          open && "border-deweb-cyan/50"
        )}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((current) => !current)}
          className="flex shrink-0 items-center gap-2 border-r border-white/10 px-3 py-3 text-left text-white transition hover:bg-white/5"
        >
          <span className="text-lg leading-none" aria-hidden>
            {countryFlag(country.iso)}
          </span>
          <span className="text-sm font-medium">+{country.dial}</span>
          <svg
            className={cn("h-4 w-4 text-white/50 transition", open && "rotate-180")}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={national}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            updatePhone(country, event.target.value.replace(/\D/g, ""));
          }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#10131a] shadow-2xl shadow-black/40">
          <div className="border-b border-white/10 p-3">
            <input
              ref={searchRef}
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-deweb-cyan/50 focus:outline-none"
            />
          </div>

          <ul
            ref={listRef}
            role="listbox"
            data-lenis-prevent
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            className="phone-country-scroll max-h-80 overflow-y-auto overscroll-y-contain py-1"
            aria-label="Country codes"
          >
            {filteredCountries.length === 0 ? (
              <li className="px-4 py-3 text-sm text-white/40">No countries found</li>
            ) : (
              filteredCountries.map((item) => {
                const selected = item.iso === country.iso;
                return (
                  <li key={item.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => selectCountry(item)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-white/5",
                        selected && "bg-deweb-cyan/10 text-deweb-cyan"
                      )}
                    >
                      <span className="text-lg leading-none" aria-hidden>
                        {countryFlag(item.iso)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-white">{item.name}</span>
                      <span className="shrink-0 text-white/50">+{item.dial}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
