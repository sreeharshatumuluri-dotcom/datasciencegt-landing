// src/pages/Testimonials.jsx
import React, { useEffect, useRef, useState } from "react";
import defaultPhoto from "../assets/austin-distel-jpHw8ndwJ_Q-unsplash.jpg";
import heroPhoto from "../assets/testimonials.png"; // ← your cover image

/* ===================== Config ===================== */
const AUTOPLAY_MS = 4500;
const TILE_HEIGHT = 220;        // overall tile height (px)
const BODY_WINDOW_PX = 160;     // visible text area height inside white card (px)
const SHOW_TITLE = true;        // toggle title line on/off

/* ===================== Content Loaders ===================== */
async function loadPageMeta() {
  try {
    const res = await fetch("/content/pages/what-others-say/page.txt", { cache: "no-store" });
    if (!res.ok) throw new Error();
    const json = await res.json();
    return {
      // we won’t render watermark text on the hero anymore
      watermark: json.watermark ?? "Testimonials",
      heading: json.heading ?? "What Our Clients Say About Us",
      intro: json.intro ?? "",
      bg: json.meta?.bg || "#0b0b0b",
    };
  } catch {
    return { watermark: "Testimonials", heading: "What Our Clients Say About Us", intro: "", bg: "#0b0b0b" };
  }
}

function firstSentence(quote = "") {
  const s = quote.split(/(?<=[.?!])\s+/)[0] || quote;
  return s.slice(0, 120).replace(/\s+/g, " ").trim();
}

/** Parse /public/content/pages/what-others-say/testimonials.txt
 * Blocks separated by blank lines; author line begins with "- "
 */
function parseTestimonials(txt) {
  return txt
    .split(/\n\s*\n+/g)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim());
      const ai = lines.findIndex((l) => /^-\s*/.test(l));
      let author = "Anonymous";
      if (ai !== -1) {
        author = lines[ai].replace(/^-+\s*/, "").trim() || "Anonymous";
        lines.splice(ai, 1);
      }
      const quote = lines.join(" ").replace(/\s{2,}/g, " ").trim();
      return { quote, author, title: firstSentence(quote) };
    });
}

async function loadTestimonials() {
  const [meta, resTxt] = await Promise.all([
    loadPageMeta(),
    fetch("/content/pages/what-others-say/testimonials.txt", { cache: "no-store" }).catch(() => null),
  ]);

  let items = [];
  if (resTxt?.ok) items = parseTestimonials(await resTxt.text());

  // Remove empties so no blank white window renders
  items = items.filter((it) => it.quote && it.quote.trim().length > 0);

  if (!items.length) {
    const q =
      "I’ve had the opportunity to work with Gopala for over 6 years and have consistently appreciated his technical expertise and problem-solving skills. He is especially strong in data engineering, AI / ML pipelines, and the processes that support reliable production-grade delivery. Gopala adds real value by building scalable infrastructure and streamlined workflows. His ability to connect technical detail with business needs makes him a dependable and valuable.";
    items = [{ quote: q, author: "Anonymous", title: firstSentence(q) }];
  }

  // Use the same photo for every window as requested
  return {
    ...meta,
    items: items.map((it) => ({
      ...it,
      centerImage: defaultPhoto,
      rightImage: defaultPhoto,
    })),
  };
}

/* ===================== Atoms ===================== */
function Arrow({ dir = "left", onClick }) {
  const left = dir === "left";
  return (
    <button
      onClick={onClick}
      aria-label={left ? "Previous" : "Next"}
      className="absolute top-1/2 -translate-y-1/2 px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white"
      style={{ [left ? "left" : "right"]: "-14px" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        {left ? (
          <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        ) : (
          <path fill="currentColor" d="m10 6 1.41 1.41L7.83 11H20v2H7.83l3.58 3.59L10 18l-6-6z" />
        )}
      </svg>
    </button>
  );
}

function Dot({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-2.5 w-2.5 rounded-full ${active ? "bg-white" : "bg-white/35 hover:bg-white/60"}`}
      aria-label="Go to slide"
    />
  );
}

/* ===================== Panels ===================== */
function CenterPanel({ img, title, body }) {
  const TILE_HEIGHT = 220;
  const BODY_WINDOW_PX = 160;

  return (
    <div className="flex items-stretch gap-3 min-w-0">
      {/* Left image */}
      <div
        className="w-[220px] rounded-lg overflow-hidden border border-white/10 bg-white/10 shrink-0"
        style={{ height: `${TILE_HEIGHT}px` }}
      >
        <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* White text card */}
      <div
        className="w-[520px] max-w-[60vw] rounded-xl bg-white text-black p-4 md:p-5 shadow flex flex-col min-w-0"
        style={{ height: `${TILE_HEIGHT}px` }}
      >
        {SHOW_TITLE && title ? (
          <h3 className="font-semibold leading-snug mb-2 truncate" title={title}>
            {title}
          </h3>
        ) : null}

        {/* Windowed body — never overflows */}
        <div
          className="relative min-w-0"
          style={{
            height: `${BODY_WINDOW_PX}px`,
            overflow: "hidden",
            wordBreak: "break-word",
            hyphens: "auto",
            WebkitHyphens: "auto",
            msHyphens: "auto",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <p className="text-[15px] leading-relaxed whitespace-normal">{body}</p>
        </div>
      </div>
    </div>
  );
}

function RightTile({ img }) {
  return (
    <div
      className="w-[120px] rounded-lg overflow-hidden border border-white/10 bg-white/10 shrink-0"
      style={{ height: `220px` }}
    >
      <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

/* ===================== Page ===================== */
export default function Testimonials() {
  const [data, setData] = useState({ watermark: "", heading: "", intro: "", items: [], bg: "#0b0b0b" });
  const [i, setI] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    (async () => setData(await loadTestimonials()))();
  }, []);

  useEffect(() => {
    if (!data.items.length) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => setI((p) => (p + 1) % data.items.length), AUTOPLAY_MS);
    return () => clearInterval(timer.current);
  }, [data.items.length]);

  const safeItems = data.items || [];
  const safeIndex = safeItems.length ? i % safeItems.length : 0;
  const slide = safeItems[safeIndex] || {};

  const prev = () => setI((p) => (p - 1 + safeItems.length) % safeItems.length);
  const next = () => setI((p) => (p + 1) % safeItems.length);

  return (
<main className="min-h-screen text-white" style={{ background: data.bg }}>
  {/* spacer for fixed navbar */}
  <div className="h-[64px] md:h-[80px]" aria-hidden="true" />
  {/* HERO / COVER */}
  <section className="relative m-0 p-0">
    <img
      src={heroPhoto}
      alt="Testimonials cover"
      className="block w-full h-[600px] md:h-[307px] object-cover"
    />
  </section>


      {/* Heading under the cover */}
      <section className="px-5 md:px-10 lg:px-16 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90">{data.heading}</h2>
          {data.intro && <p className="text-white/70 mt-3 max-w-2xl">{data.intro}</p>}
        </div>
      </section>

      {/* Two-panel layout */}
      <section className="px-3 md:px-6 lg:px-10 pb-16">
        <div className="relative mx-auto max-w-[900px]">
          <div className="flex items-center justify-center gap-4">
            {slide.quote ? (
              <>
                <CenterPanel img={slide.centerImage} title={slide.title} body={slide.quote} />
                <RightTile img={slide.rightImage} />
              </>
            ) : (
              <RightTile img={defaultPhoto} />
            )}
          </div>

          {/* Arrows */}
          {safeItems.length > 1 && (
            <>
              <Arrow dir="left" onClick={prev} />
              <Arrow dir="right" onClick={next} />
            </>
          )}

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {safeItems.map((_, idx) => (
              <Dot key={idx} active={idx === safeIndex} onClick={() => setI(idx)} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
