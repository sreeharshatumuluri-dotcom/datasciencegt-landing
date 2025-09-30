// src/pages/Testimonials.jsx
import React, { useEffect, useRef, useState } from "react";
import defaultPhoto from "../assets/austin-distel-jpHw8ndwJ_Q-unsplash.jpg";
import heroPhoto from "../assets/testimonials.png";
import ornamentImg from "../assets/Ornament81.png"; // PNG pattern

/* =============== Config =============== */
const AUTOPLAY_MS = 4500;
const SHOW_TITLE = true;

/* =============== Loaders =============== */
async function loadPageMeta() {
  try {
    const res = await fetch("/content/pages/what-others-say/page.txt", { cache: "no-store" });
    if (!res.ok) throw new Error();
    const json = await res.json();
    return {
      heading: json.heading ?? "What Our Clients Say About Us",
      intro: json.intro ?? "",
      bg: json.meta?.bg || "#0b0b0b",
    };
  } catch {
    return { heading: "What Our Clients Say About Us", intro: "", bg: "#0b0b0b" };
  }
}

function firstSentence(q = "") {
  const s = q.split(/(?<=[.?!])\s+/)[0] || q;
  return s.slice(0, 120).replace(/\s+/g, " ").trim();
}

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
  items = items.filter((it) => it.quote && it.quote.trim().length > 0);

  if (!items.length) {
    const q =
      "I’ve had the opportunity to work with Gopala for over 6 years and have consistently appreciated his technical expertise and problem-solving skills.";
    items = [{ quote: q, author: "Anonymous", title: firstSentence(q) }];
  }

  return {
    ...meta,
    items: items.map((it) => ({ ...it, photo: defaultPhoto })),
  };
}

/* =============== UI atoms =============== */
function Dot({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-3 w-3 rounded-full ${active ? "bg-white" : "bg-white/35 hover:bg-white/60"}`}
      aria-label="Go to slide"
    />
  );
}

/* Photo-inside-card tile */
function Tile({ img, title, body, compact = false }) {
  const cardClasses = compact ? "opacity-80 scale-[0.98] pointer-events-none" : "";
  return (
    <article
      className={`
        bg-white text-black shadow
        rounded-xl overflow-hidden
        border border-white/10
        transition-transform duration-300 ${cardClasses}
        w-full
      `}
    >
      <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] md:h-[220px]">
        <div className="relative h-48 md:h-full">
          <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="p-4 md:p-5 flex flex-col min-w-0">
          {SHOW_TITLE && title ? (
            <h3 className="font-semibold leading-snug mb-2 truncate" title={title}>
              {title}
            </h3>
          ) : null}
          <div
            className="relative min-w-0 h-40 md:h-[160px]"
            style={{
              overflow: "hidden",
              wordBreak: "break-word",
              hyphens: "auto",
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
    </article>
  );
}

/* =============== Page =============== */
export default function Testimonials() {
  const [data, setData] = useState({ heading: "", intro: "", items: [], bg: "#0b0b0b" });
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

  const items = data.items || [];
  const n = items.length;
  const curr = n ? i % n : 0;
  const prev = n ? (curr - 1 + n) % n : 0;
  const next = n ? (curr + 1) % n : 0;

  return (
    <main className="min-h-screen text-white" style={{ background: data.bg }}>
      {/* Spacer for fixed navbar */}
      <div className="h-[64px] md:h-[80px]" aria-hidden="true" />

      {/* Hero cover image */}
      <section className="relative m-0 p-0">
        <img
          src={heroPhoto}
          alt="Testimonials cover"
          className="block w-full h-[220px] md:h-[307px] object-cover"
        />
      </section>

      {/* Heading */}
      <section className="px-5 md:px-10 lg:px-16 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90">{data.heading}</h2>
          {data.intro && <p className="text-white/70 mt-3 max-w-2xl">{data.intro}</p>}
        </div>
      </section>

      {/* Carousel */}
      <section className="px-3 md:px-6 lg:px-10 pb-16">
        <div className="relative mx-auto max-w-[1100px]">
          <div className="flex items-stretch gap-3 md:gap-4 overflow-visible">
            {/* ~20% prev preview (left) */}
            {n > 1 && (
              <div className="basis-[10%] min-w-0 hidden sm:block">
                <Tile img={items[prev].photo} title={items[prev].title} body={items[prev].quote} compact />
              </div>
            )}

            {/* ~60% current */}
            <div className="basis-full sm:basis-[80%] min-w-0">
              {n ? <Tile img={items[curr].photo} title={items[curr].title} body={items[curr].quote} /> : null}
            </div>

            {/* ~20% next preview (right) — ornament is anchored to THIS wrapper */}
            {n > 1 && (
              <div className="basis-[10%] min-w-0 hidden sm:block relative">
                {/* Ornament: behind carousel, top-right of this column, shifted left into the gap */}
                <img
  src={ornamentImg}            // import ornamentImg from "../assets/Ornament-81.png"
  alt="pattern"
  className="absolute z-0 pointer-events-none"
  style={{
    top: "-88px",              // position you liked
    right: "90px",
    width: "400px",            // ~50% of the preview column
    opacity: 1,                // fully visible
    // Make it darker and crisper on a dark background
    filter: "brightness(0.35) contrast(1.6) saturate(0.9) drop-shadow(0 2px 6px rgba(0,0,0,0.55))",
    // IMPORTANT: ensure we’re using normal blending (no screen/overlay)
    mixBlendMode: "normal",
  }}
/>
                {/* The preview tile goes above the ornament */}
                <div className="relative z-10">
                  <Tile img={items[next].photo} title={items[next].title} body={items[next].quote} compact />
                </div>
              </div>
            )}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((_, idx) => (
              <Dot key={idx} active={idx === curr} onClick={() => setI(idx)} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
