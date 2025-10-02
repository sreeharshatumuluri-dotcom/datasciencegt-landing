// src/pages/Testimonials.jsx
import React, { useEffect, useState } from "react";
import defaultPhoto from "../assets/GT1.jpg";
import heroPhoto from "../assets/testimonials.png";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

import img1 from "../assets/3.png";
import img2 from "../assets/asset-approach.png";
import img3 from "../assets/2.png";
import img4 from "../assets/3.png";
import img5 from "../assets/asset-approach.png";
import img6 from "../assets/2.png";
import img7 from "../assets/3.png";
import FallbackImg from "../assets/2.png";

import WhoWeWorkedWithCarousel from "../components/WhoWeWorkedWithCarousel";

const WW_PATH = "/content/pages/what-others-say/who-we-worked-with.txt";
const gallery = [img1, img2, img3, img4, img5, img6, img7];

function splitLines(txt) {
  return (txt || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
}

function firstSentence(q = "") {
  const s = q.split(/(?<=[.?!])\s+/)[0] || q;
  return s.slice(0, 120).replace(/\s+/g, " ").trim();
}

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

function parseWhoWeWorkedWith(txt) {
  const rawLines = splitLines(txt);
  const lines = rawLines.map((l) => l.replace(/\u00A0/g, " ").trim());
  const N = lines.length;

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

  const HEADING_TITLE = "Affirmation";
  const HEADING_SUBHEAD =
    "The success of DATASCIENCEGT is built on a foundation of trust and expertise. These testimonials reflect the experience of working with our company.";

  // BUILD CAROUSEL ITEMS: image + who-we-worked-with text
  const CLIENT_ITEMS =
    who.items.length
      ? who.items.map((card, idx) => ({
          src: gallery[idx % gallery.length],
          alt: card.title,
          title: card.title,
          body: card.body || "",
        }))
      : // fallback if file is empty/unavailable -> at least show captions
        [
          {
            src: gallery[0] || FallbackImg,
            alt: "Client",
            title: "Trusted partners",
            body:
              "We’ve collaborated with startups and enterprises across finance, healthcare, public sector, and more—delivering reliable data platforms and ML solutions.",
          },
          {
            src: gallery[1] || FallbackImg,
            alt: "Client",
            title: "Enterprise data programs",
            body:
              "Data pipelines, governance, observability, and analytics—designed for scale and maintainability.",
          },
          {
            src: gallery[2] || FallbackImg,
            alt: "Client",
            title: "ML systems",
            body:
              "Model development to deployment: experimentation, MLOps automation, inference APIs, and monitoring.",
          },
          {
            src: gallery[3] || FallbackImg,
            alt: "Client",
            title: "Cloud & real-time",
            body:
              "AWS-native architectures, real-time streaming, and cost-optimized deployments.",
          },
          {
            src: gallery[4] || FallbackImg,
            alt: "Client",
            title: "Outcomes",
            body:
              "We focus on measurable impact—better decisions, faster delivery, and higher reliability.",
          },
        ];

  return (
    <main className="min-h-screen text-white" style={{ background: data.bg }}>
      {/* ===== HERO ===== */}
      <section className="relative w-full h-[60vh] min-h-[300px]">
        <img
          src={heroPhoto}
          alt="DatascienceGT — office collaboration"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          style={{ filter: "brightness(1.05) contrast(1.02)" }}
        />
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="px-5 md:px-10 lg:px-16 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-black tracking-[0.08em] leading-none  bg-clip-text
                       text-[32px] sm:text-[44px] lg:text-[52px]
                       bg-[linear-gradient(180deg,#8b9aa3_0%,#6a7a82_50%,#aebbc2_100%)]"
            style={{
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 8px rgba(124,146,155,0.15)",
            }}
          >
            {HEADING_TITLE}
          </h2>

          <p className="mt-3 text-sm md:text-base leading-7 text-white/80 max-w-3xl">
            {HEADING_SUBHEAD}
          </p>

          {data.intro && (
            <p className="text-white/70 mt-3 max-w-2xl text-sm md:text-base">
              {data.intro}
            </p>
          )}
        </div>
      </section>

      <section className="px-3 md:px-6 lg:px-10 pb-10 md:pb-16">
        <div className="relative mx-auto max-w-[1100px] overflow-hidden">
          <div className="relative z-10">
            <TestimonialsCarousel items={data.items || []} showTitle={false} />
          </div>
        </div>
      </section>

      {/* ===== WHO WE WORKED WITH ===== */}
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

      {/* === The new CodePen-style carousel with content on center card === */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-14">
        <WhoWeWorkedWithCarousel items={CLIENT_ITEMS} className="mx-auto" />
      </section>
    </main>
  );
}
