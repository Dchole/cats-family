"use client";

export default function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute! focus:top-4 focus:left-4 focus:z-9999 focus:px-6! focus:py-3! focus:bg-[#D4766A] focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#D4766A]/50"
    >
      Skip to main content
    </a>
  );
}
