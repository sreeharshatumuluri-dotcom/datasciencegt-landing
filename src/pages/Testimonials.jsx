// src/pages/Testimonials.jsx
import React, { useEffect, useState } from "react";
import defaultPhoto from "../assets/austin-distel-jpHw8ndwJ_Q-unsplash.jpg";
import heroPhoto from "../assets/Group 28.png";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

import img1 from "../assets/3.png";
import img2 from "../assets/asset-approach.png";
import img3 from "../assets/2.png";
import img4 from "../assets/3.png";
import img5 from "../assets/asset-approach.png";
import img6 from "../assets/2.png";
import img7 from "../assets/3.png";
import FallbackImg from "../assets/2.png";

const WW_PATH = "/content/pages/what-others-say/who-we-worked-with.txt";
const gallery = [img1, img2, img3, img4, img5, img6, img7];

function splitLines(txt) {
  return (txt || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
}

function firstSentence(q = "") {
  const s = q.split(/(?<=[.?!])\s+/)[0] || q;
  return s.slice(0, 120).replace(/\s+/g, " ").trim();
}

/* ---------- Page meta (unchanged) ---------- */
async function loadPageMeta() {
  try {
    const res = await fetch("/content/pages/what-others-say/page.txt", { cache: "no-store" });
    if (!res.ok) throw new Error();
    const json = await res.json();

    return {
      heading: json.heading ?? "What Our Clients Say About Us",
      intro: "", 
      bg: json.meta?.bg || "#0b0b0b",
    };
  } catch {
    return { heading: "What Our Clients Say About Us", intro: "", bg: "#0b0b0b" };
  }
}


/* ---------- Testimonials parser (unchanged) ---------- */
function parseTestimonials(txt) {
  const lines = (txt || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\u00A0/g, " ").trim());

  const items = [];
  let buf = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      buf.push("");
      continue;
    }

    const authorMatch = line.match(/^\-\s+(.+?)\s*\.?\s*$/);
    if (authorMatch) {
      const author = authorMatch[1].trim();
      const quote = buf.join(" ").replace(/\s{2,}/g, " ").trim();
      if (quote && author) items.push({ quote, author, title: firstSentence(quote) });
      buf = [];
      continue;
    }
    buf.push(line);
  }
  return items;
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

/* ---------- Who We Worked With parser (unchanged) ---------- */
function parseWhoWeWorkedWith(txt) {
  const rawLines = splitLines(txt);
  const lines = rawLines.map((l) => l.replace(/\u00A0/g, " ").trim());
  const N = lines.length;

  // Intro paragraph
  let i = 0;
  const introBuf = [];
  while (i < N && lines[i] !== "") {
    introBuf.push(lines[i]);
    i++;
  }
  let intro = introBuf
    .reduce((acc, cur) => {
      if (acc.length && acc[acc.length - 1].endsWith("-") && /^[A-Za-z]/.test(cur)) {
        acc[acc.length - 1] = acc[acc.length - 1].slice(0, -1) + cur;
      } else {
        acc.push(cur);
      }
      return acc;
    }, [])
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();

  while (i < N && lines[i] === "") i++;

  const items = [];
  while (i < N) {
    while (i < N && lines[i] === "") i++;
    if (i >= N) break;

    if (!/:$/.test(lines[i])) {
      i++;
      continue;
    }
    const itemTitle = lines[i].replace(/:$/, "").trim();
    i++;

    const bodyBuf = [];
    while (i < N && lines[i] !== "" && !/:$/.test(lines[i])) {
      bodyBuf.push(lines[i]);
      i++;
    }
    const body = bodyBuf.join("\n").trim();
    if (itemTitle) items.push({ title: itemTitle, body });
  }

  return { intro, items };
}

/* ---------- Page ---------- */
export default function Testimonials() {
  const [data, setData] = useState({ heading: "", intro: "", items: [], bg: "#0b0b0b" });
  const [who, setWho] = useState({ intro: "", items: [] });
  const [whoErr, setWhoErr] = useState("");

  useEffect(() => {
    (async () => setData(await loadTestimonials()))();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(WW_PATH, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load ${WW_PATH}`);
        const text = await res.text();
        const parsed = parseWhoWeWorkedWith(text);
        if (!cancelled) setWho(parsed);
      })
      .catch((e) => {
        console.warn(e);
        if (!cancelled) setWhoErr(e.message || "Failed to load who-we-worked-with");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const FIXED_HEADING =
    "The success of DATASCIENCEGT is built on a foundation of trust and expertise. These testimonials reflect the experience of working with our company.";

  const imageForIndex = (idx) => gallery[idx % gallery.length] || FallbackImg;

  return (
    <main className="min-h-screen text-white" style={{ background: data.bg }}>
      {/* Spacer for fixed navbar */}
      <div className="h-[64px] md:h-[80px]" aria-hidden="true" />

      {/* Hero */}
      <section className="relative m-0 p-0">
        <img
          src={heroPhoto}
          alt="Testimonials cover"
          className="block w-full h-[220px] md:h-[307px] object-cover"
        />
      </section>

      {/* ===== TESTIMONIALS (moved up) ===== */}
      <section className="px-5 md:px-10 lg:px-16 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90">{FIXED_HEADING}</h2>
          {data.intro && <p className="text-white/70 mt-3 max-w-2xl">{data.intro}</p>}
        </div>
      </section>

      <section className="px-3 md:px-6 lg:px-10 pb-10 md:pb-16">
        <div className="relative mx-auto max-w-[1100px]">
          {/* background ornament kept behind carousel */}

          <div className="relative z-10">
            <TestimonialsCarousel items={data.items || []} showTitle={false} />
          </div>
        </div>
      </section>

      {/* ===== WHO WE WORKED WITH (now below testimonials) ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 sm:mt-8">
        <div className="relative h-[120px] sm:h-[180px] lg:h-[220px] flex items-center justify-center">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 flex items-center justify-center
                       font-black tracking-[0.08em] uppercase leading-none
                       text-transparent bg-clip-text text-center
                       text-[36px] sm:text-[80px] lg:text-[120px]
                       bg-[linear-gradient(to_bottom,#15303b_0%,#173439_50%,#3d4850_100%)]"
            style={{ WebkitTextFillColor: "transparent", textShadow: "0 0 24px rgba(23,52,58,0.35)" }}
          >
            WHO WE WORKED WITH
          </span>
        </div>
      </section>

      {/* Intro paragraph BELOW the backdrop */}
      {who.intro && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-2 mb-8">
          <p className="text-base sm:text-lg leading-7 text-slate-300 whitespace-pre-line relative z-10">
            {who.intro}
          </p>
        </section>
      )}
      {whoErr && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-2 mb-8">
          <p className="text-sm text-amber-300/90">
            Couldn’t load “who we worked with” content. Check the file path: {WW_PATH}
          </p>
        </section>
      )}

      {/* Items grid */}
      {!!who.items.length && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {who.items.map((card, idx) => (
              <div key={idx} className="w-full md:w-[515px] h-auto md:h-[541px] flex flex-col">
                {/* Per-title image — LEFT */}
                <div className="flex items-start justify-start mb-4">
                  <img
                    src={imageForIndex(idx)}
                    alt={card.title}
                    className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FallbackImg;
                    }}
                  />
                </div>

                {/* Title + dot + body */}
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#52C1C4] shrink-0" />
                    <h3 className="text-lg sm:text-xl md:text-[22px] leading-tight font-semibold text-[#52C1C4]">
                      {card.title}
                    </h3>
                  </div>
                  {card.body && (
                    <p className="mt-2 text-sm sm:text-[14px] leading-6 text-slate-400 whitespace-pre-line">
                      {card.body}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
