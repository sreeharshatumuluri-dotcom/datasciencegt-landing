// src/components/TeamCarousel.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { createPortal } from "react-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Team photos
import madhavImg from "../assets/team/madhav.jpg";
import gopalaImg from "../assets/team/gopala.jpg";
import harshaImg from "../assets/team/harsha.jpg";

const TEAM = [
  {
    bg: madhavImg,
    name: "Madhav",
    title: "Manager, Business & Strategy",
    desc:
      "Madhav is a vital member of the DATASCIENCEGT team, specializing in finance and strategy. As an experienced financial analyst and an MBA in Finance, he brings a sharp business focus to every project. Madhav is responsible for key internal operations, including payroll and client management systems. He also leads internal automation efforts, ensuring the company runs efficiently so the team stays immersed in delivering value to our clients. Madhav’s unique combination of business acumen and technical skill makes him an invaluable asset to both the company and its partners.",
  },
  {
    bg: gopalaImg,
    name: "Gopala",
    title: "Technology and Business Lead",
    desc:
      "Gopala is passionate about solving human and business problems through data, leveraging emerging data science and AI technologies. Before founding DATASCIENCEGT in 2015, Gopala led, shaped, and expanded technology products in numerous mid-sized and startup companies for over 20 years. He defined, developed, marketed, and grew highly differentiated and profitable products in global markets. In his personal life, Gopala is a dad of three sons. He maintains a deep commitment to fitness through exercise and a whole-foods-based, vegetarian diet. He currently divides his time between Pittsburgh and Chicago.",
  },
  {
    bg: harshaImg,
    name: "Sree Harsha",
    title: "Developer, Software & AI",
    desc:
      "Harsha is an integral member of the DATASCIENCEGT team, bringing strong technical expertise in software engineering, data systems, and AI/ML solutions. He focuses on designing scalable architectures, building reliable platforms, and ensuring smooth integration across cloud and data environments. In addition to his engineering contributions, Harsha supports client delivery by aligning technical solutions with business goals, ensuring projects create measurable impact. His blend of technical skill and problem-solving mindset adds significant value to both the company and its clients.",
  },
];

/* ------------ helpers ------------ */
function splitIntoSentences(text) {
  return text.split(/(?<=[\.!?])\s+/).filter(Boolean);
}
function truncateBySentences(text, maxSentences = 4) {
  const parts = splitIntoSentences(text);
  const needsMore = parts.length > maxSentences;
  const short = needsMore ? parts.slice(0, maxSentences).join(" ") : text;
  return { short, needsMore };
}

/* ------------ lock body scroll while modal open ------------ */
function useBodyScrollLock(isOpen) {
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement: html } = document;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const original = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };

    html.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const preventTouchMove = (e) => {
      const modalRoot = document.getElementById("team-modal-root");
      if (modalRoot && modalRoot.contains(e.target)) return;
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventTouchMove);
      html.style.overscrollBehavior = original.htmlOverscroll || "";
      body.style.position = original.bodyPosition || "";
      body.style.top = original.bodyTop || "";
      body.style.width = original.bodyWidth || "";
      body.style.overflow = original.bodyOverflow || "";
      const y = parseInt((original.bodyTop || "0").replace("-", ""), 10) || scrollY;
      window.scrollTo(0, y);
    };
  }, [isOpen]);
}

export default function TeamCarousel() {
  const [openIdx, setOpenIdx] = useState(null);
  useBodyScrollLock(openIdx !== null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative py-16">
      <style>{`
        .team-swiper { width: 100%; padding-top: 50px; padding-bottom: 50px; overflow: visible; }
        .team-swiper .swiper-slide { width: clamp(260px, 85vw, 400px); }
        .no-highlight { -webkit-tap-highlight-color: transparent; }

        .swiper-3d .swiper-slide-shadow-left {
          background-image: linear-gradient(to left, #000, #0000);
          border-right: 1px solid #000; border-radius: 10px;
        }
        .swiper-3d .swiper-slide-shadow-right {
          background-image: linear-gradient(to right, #000, #0000);
          box-shadow: 0 0 0 1px #000; border-radius: 10px;
        }

        .team-swiper .swiper-pagination-bullet {
          background: rgba(59, 130, 246, 0.35);
          transition: all .3s ease 0s; border-radius: 8px;
        }
        .team-swiper .swiper-pagination-bullet-active { background:#3b82f6; width: 30px; }
        
        @keyframes fadeIn {
          to {opacity: 1;}
        }

        @media (max-width: 380px) {
          .team-card { height: 440px; }
          .team-desc { font-size: 0.9rem; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">The Team</h2>
        <p className="mt-2 text-center text-slate-300">The people behind DATASCIENCEGT</p>

        {/* Using rewind (not loop) to prevent index skip with coverflow + auto width */}
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          className="team-swiper !pb-12"
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
          rewind
          slidesPerGroup={1}
          initialSlide={0}
          grabCursor
          speed={450}
          allowTouchMove
          threshold={6}
          shortSwipes
          longSwipes
          longSwipesRatio={0.5}
          touchAngle={45}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
        >
          {TEAM.map((m, i) => (
            <SwiperSlide key={i}>
              <Slide m={m} onOpen={() => setOpenIdx(i)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {openIdx !== null && (
        <FullscreenModal member={TEAM[openIdx]} onClose={() => setOpenIdx(null)} />
      )}
    </section>
  );
}

function Slide({ m, onOpen }) {
  const bgUrl = typeof m.bg === "string" ? m.bg : m.bg?.src ?? m.bg;
  const { short } = truncateBySentences(m.desc, 4);

  return (
    <div className="w-[min(85vw,400px)]">
      <button
        type="button"
        onClick={onOpen}
        className="no-highlight team-card relative w-full h-[500px] md:h-[500px] rounded-[10px] overflow-hidden shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
        style={{ WebkitAppearance: "none", appearance: "none" }}
        aria-label={`Open bio of ${m.name}`}
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="backdrop-blur-sm bg-black/35 border border-white/10 rounded-xl px-4 py-3">
            <div className="text-white text-lg font-semibold leading-tight">{m.name}</div>
            <div className="text-white/80 text-sm">{m.title}</div>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={onOpen}
        className="no-highlight group mt-3 w-full text-left rounded-xl border border-white/10 bg-[#1A1A1A] p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ WebkitAppearance: "none", appearance: "none" }}
        aria-label={`Open full bio of ${m.name}`}
      >
        <p className="team-desc text-slate-200 text-sm leading-relaxed">{short}</p>
        <span className="mt-3 inline-block text-xs text-slate-400 group-hover:underline group-hover:underline-offset-4">
          Tap to read more
        </span>
      </button>
    </div>
  );
}

/* ---------------- FULL-SCREEN OVERLAY MODAL ---------------- */
function FullscreenModal({ member, onClose }) {
  const bgUrl = typeof member.bg === "string" ? member.bg : member.bg?.src ?? member.bg;

  const overlay = (
    <div
      id="team-modal-root"
      className="fixed inset-0 z-[99999] bg-[#1A1A1A]/95 overflow-y-auto opacity-0 animate-[fadeIn_0.2s_ease-in-out_forwards]"
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-center justify-center p-4">
        <div
          id="team-modal-card"
          className="w-[min(86vw,980px)] md:w-[min(92vw,980px)] rounded-2xl border border-white/10 bg-[#1A1A1A]"
        >
          <div className="grid md:grid-cols-[360px,1fr] gap-0 md:gap-6 p-5">
            <div className="relative h-[200px] sm:h-[230px] md:h-[420px] rounded-xl overflow-hidden">
              <img
                src={bgUrl}
                alt={`${member.name} portrait`}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="mt-4 md:mt-0">
              <div className="text-white text-xl font-semibold leading-tight">{member.name}</div>
              <div className="text-white/70 text-sm mb-3">{member.title}</div>
              <p className="text-slate-200 leading-relaxed text-[0.95rem] whitespace-pre-line">
                {member.desc}
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 z-10 px-5 pb-5 pt-3 bg-gradient-to-t from-[#1A1A1A] to-transparent">
            <button
              onClick={onClose}
              className="w-full rounded-xl py-3 text-sm font-medium bg-white/10 hover:bg-white/15 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}