import React, { useMemo, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * items: Array<{ src: string, alt?: string, title?: string, body?: string }>
 * imageHeight: CSS length for the image box height (e.g. "280px" or "clamp(220px, 40vh, 320px)")
 * containerMaxWidth: number (px) max width for the whole two-column area (default 1120)
 */
export default function WhoWeWorkedWithCarousel({
  items = [],
  startIndex = 0,
  className = "",
  imageHeight = "clamp(220px, 40vh, 320px)",
  containerMaxWidth = 1120,
}) {
  const data = useMemo(() => items.filter(Boolean), [items]);
  const [idx, setIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // modal open

  useEffect(() => {
    if (!data.length) return;
    const clamped = ((startIndex % data.length) + data.length) % data.length;
    setIdx(clamped);
  }, [data.length, startIndex]);

  const goPrev = useCallback(() => {
    if (!data.length) return;
    setIdx((p) => (p - 1 + data.length) % data.length);
  }, [data.length]);

  const goNext = useCallback(() => {
    if (!data.length) return;
    setIdx((p) => (p + 1) % data.length);
  }, [data.length]);

  const onKey = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  if (!data.length) return null;
  const curr = data[idx];

  return (
    <div className={`relative w-full ${className}`} onKeyDown={onKey} tabIndex={0}>
      {/* Two-column layout: image LEFT, text RIGHT (stacks on mobile) */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mx-auto"
        style={{ maxWidth: `${containerMaxWidth}px` }}
      >
        {/* === LEFT: IMAGE (clickable) === */}
        <div className="relative">
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow group"
            style={{ height: imageHeight }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 z-10"
              aria-label="Open details"
              title="Open"
            />
            <img
              src={curr.src}
              alt={curr.alt || curr.title || "client"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
              loading="lazy"
              decoding="async"
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />

            {/* === CONTROL BAR: [←] • dots • [→] (inside image, bottom-center) === */}
            <ControlBar
              length={data.length}
              activeIndex={idx}
              onPrev={goPrev}
              onNext={goNext}
              onDot={(i) => setIdx(i)}
            />
          </div>
        </div>

        {/* === RIGHT: TEXT (also clickable) === */}
        <div className="flex items-start">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-[#52C1C4]/60 rounded-lg"
            aria-label="Open details"
            title="Open"
          >
            {curr.title && (
              <h3 className="text-[#52C1C4] text-lg md:text-2xl font-semibold leading-tight underline-offset-4 hover:underline">
                {curr.title}
              </h3>
            )}
            {curr.body && (
              <p className="mt-2 text-sm md:text-base text-slate-200 leading-7 whitespace-pre-line">
                {curr.body}
              </p>
            )}
          </button>
        </div>
      </div>

      {/* === MODAL (portal) === */}
      {isOpen &&
        createPortal(
          <Modal curr={curr} onClose={() => setIsOpen(false)} />,
          document.body
        )}
    </div>
  );
}

/* ---------- Controls under image ---------- */
function ControlBar({ length, activeIndex, onPrev, onNext, onDot }) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-3 bg-black/35 backdrop-blur rounded-full px-3 py-1.5">
        {/* Left arrow */}
        <button
          type="button"
          aria-label="Previous"
          onClick={onPrev}
          className="h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-white/20 flex items-center justify-center"
        >
          {/* chevron-left */}
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dots */}
        {length > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => onDot(i)}
                className={`h-2.5 w-2.5 rounded-full ${
                  i === activeIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Right arrow */}
        <button
          type="button"
          aria-label="Next"
          onClick={onNext}
          className="h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-white/20 flex items-center justify-center"
        >
          {/* chevron-right */}
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8.25 4.5 15.75 12l-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------- Modal (Portal) ---------- */
function Modal({ curr, onClose }) {
  // lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // close on Esc
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-[880px] rounded-2xl bg-[#121417] shadow-xl overflow-hidden">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[240px] md:min-h-[420px]">
            <img
              src={curr.src}
              alt={curr.alt || curr.title || "client"}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Text */}
          <div className="p-5 md:p-7">
            {curr.title && (
              <h3 className="text-[#52C1C4] text-xl md:text-2xl font-semibold leading-tight">
                {curr.title}
              </h3>
            )}
            {curr.body && (
              <p className="mt-3 text-slate-200 leading-7 whitespace-pre-line">
                {curr.body}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
