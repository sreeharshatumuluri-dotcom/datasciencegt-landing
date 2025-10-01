import React, { useEffect, useState } from "react";
import HeroImg from "../assets/Group 28.png";

// ⬇️ Replace with your actual images
import img1 from "../assets/3.png";
import img2 from "../assets/asset-approach.png";
import img3 from "../assets/2.png";
import img4 from "../assets/3.png";
import img5 from "../assets/asset-approach.png";
import img6 from "../assets/2.png";
import img7 from "../assets/3.png";

import FallbackImg from "../assets/2.png"; // fallback

const PUBLIC_TXT_PATH = "/content/pages/what-we-do/what-we-do.txt";
const gallery = [img1, img2, img3, img4, img5, img6, img7];

function splitLines(txt) {
  return txt.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
}

function parseFrontMatter(lines) {
  let eyebrow = "Our Work";
  let title = "Areas of our expertise, experience, and what value we can add?";
  let subtitle = "";
  let idx = 0;

  while (idx < lines.length) {
    const line = lines[idx].trim();
    if (line === "") { idx++; break; }

    const m = line.match(/^([\w\s-]+):\s*(.*)$/i);
    if (m) {
      const key = m[1].toLowerCase();
      const val = m[2].trim();
      if (key.startsWith("eyebrow")) eyebrow = val || eyebrow;
      else if (key.startsWith("title")) title = val || title;
      else if (key.startsWith("subtitle")) subtitle = val || subtitle;
    } else {
      let h1 = line, h2 = "", h3 = "";
      let j = idx + 1;
      while (j < lines.length && lines[j].trim() !== "") {
        if (!h2) h2 = lines[j].trim();
        else if (!h3) h3 = lines[j].trim();
        else break;
        j++;
      }
      eyebrow = h1 || eyebrow;
      title = h2 || title;
      subtitle = h3 || subtitle;
      idx = j + 1;
      return { eyebrow, title, subtitle, nextIndex: idx };
    }
    idx++;
  }
  return { eyebrow, title, subtitle, nextIndex: idx };
}

function parseItems(lines, startIndex) {
  const items = [];
  const N = lines.length;
  let i = startIndex;

  const pushItem = (title, body) => {
    if (title?.trim()) items.push({ title: title.trim(), body: body.trim() });
  };

  while (i < N) {
    while (i < N && lines[i].trim() === "") i++;
    if (i >= N) break;

    let title = lines[i].replace(/^-\s*/, "").trim();
    i++;

    const buf = [];
    while (i < N && lines[i].trim() !== "") {
      buf.push(lines[i]);
      i++;
    }
    pushItem(title, buf.join("\n"));
    while (i < N && lines[i].trim() === "") i++;
  }
  return items;
}

const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function WhatWeDo() {
  const [data, setData] = useState({ eyebrow: "", title: "", subtitle: "", items: [] });
  const [err, setErr] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-animate]"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data.items.length]);

  useEffect(() => {
    let cancelled = false;
    fetch(PUBLIC_TXT_PATH, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load ${PUBLIC_TXT_PATH}`);
        const text = await res.text();
        const lines = splitLines(text);
        const head = parseFrontMatter(lines);
        let items = parseItems(lines, head.nextIndex);
        const pageTitleNorm = norm(head.title || "");
        items = items.filter((it) => norm(it.title) !== pageTitleNorm);
        if (!cancelled) setData({ eyebrow: head.eyebrow, title: head.title, subtitle: head.subtitle, items });
      })
      .catch((e) => !cancelled && setErr(e.message));
    return () => { cancelled = true; };
  }, []);

  if (err) {
    return (
      <main className="pt-28 pb-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-xl">
          <h1 className="text-white font-semibold text-xl">Couldn&apos;t load page content</h1>
        </div>
      </main>
    );
  }

  const imageForIndex = (idx) => gallery[idx % gallery.length] || FallbackImg;

  return (
    <main className="relative pt-16 pb-24">
      {/* Hero */}
      <section className="w-full opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate>
        <img src={HeroImg} alt="What We Do hero" className="block w-full h-auto select-none" />
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 sm:mt-12">
        {/* Heading */}
        <div className="relative text-center mb-12 sm:mb-16 opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate>
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 flex items-center justify-center
                       font-black tracking-[0.08em] uppercase leading-none
                       text-transparent bg-clip-text
                       text-[60px] sm:text-[100px] lg:text-[160px]
                       bg-[linear-gradient(to_bottom,#15303b_0%,#173439_50%,#3d4850_100%)]"
            style={{ WebkitTextFillColor: "transparent", textShadow: "0 0 24px rgba(23,52,58,0.35)" }}
          >
            OUR WORK
          </span>

          <div className="relative z-[1]">
            
            <h1 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-bold text-white">
              {data.title}
            </h1>
            {data.subtitle && (
              <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-slate-400 whitespace-pre-line">
                {data.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Items responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.items.map((card, idx) => (
            <div
              key={idx}
              className="w-full md:w-[515px] h-auto md:h-[541px] flex flex-col opacity-0 translate-y-6 transition-all duration-700 ease-out"
              data-animate
              style={{ transitionDelay: `${80 * (idx % 8)}ms` }}
            >
              {/* Per-title image — LEFT-ALIGNED */}
              <div className="flex items-start justify-start mb-4">
                <img
                  src={imageForIndex(idx)}
                  alt={card.title}
                  className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] object-contain"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FallbackImg; }}
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

      <style>{`
        [data-animate].in-view {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </main>
  );
}
