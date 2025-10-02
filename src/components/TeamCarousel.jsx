// src/components/TeamCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules"; // ⬅️ removed Autoplay
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
      "Madhav is a vital member of the DATASCIENCEGT team, specializing in finance and strategy. As an experienced financial analyst and an MBA in Finance, he brings a sharp business focus to every project. Madhav is responsible for key internal operations, including payroll and client management systems. He also leads internal automation efforts, ensuring the company runs efficiently so the team can stay laser-focused on delivering value to our clients. Madhav’s unique combination of business acumen and technical skill makes him an invaluable asset to both the company and its partners.",
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

export default function TeamCarousel() {
  return (
    <section className="relative py-16">
      <style>{`
        .team-swiper { width: 100%; padding-top: 50px; padding-bottom: 50px; overflow: visible; }
        /* Responsive slide width: fits phones but caps at 400px */
        .team-swiper .swiper-slide { width: clamp(260px, 85vw, 400px); }

        /* Coverflow shadows */
        .swiper-3d .swiper-slide-shadow-left {
          background-image: linear-gradient(to left, #000, #0000);
          border-right: 1px solid #000; border-radius: 10px;
        }
        .swiper-3d .swiper-slide-shadow-right {
          background-image: linear-gradient(to right, #000, #0000);
          box-shadow: 0 0 0 1px #000; border-radius: 10px;
        }

        /* Pagination bullets */
        .team-swiper .swiper-pagination-bullet {
          background: rgba(59, 130, 246, 0.35);
          transition: all .3s ease 0s; border-radius: 8px;
        }
        .team-swiper .swiper-pagination-bullet-active { background:#3b82f6; width: 30px; }

        /* Very small devices */
        @media (max-width: 380px) {
          .team-card { height: 440px; }
          .team-desc { font-size: 0.9rem; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">The Team</h2>
        <p className="mt-2 text-center text-slate-300">The people behind DATASCIENCEGT</p>

        <Swiper
          modules={[EffectCoverflow, Pagination]}
          className="team-swiper !pb-12"
          effect="coverflow"
          centeredSlides
          grabCursor
          slidesPerView="auto"
          initialSlide={1}                 // start on the middle person
          loop                              // keep circular
          loopAdditionalSlides={TEAM.length * 3}
          watchSlidesProgress
          // === Swipe feel tuning (no auto-play) ===
          speed={450}                       // snappy slide transition
          simulateTouch={true}
          allowTouchMove={true}
          followFinger={true}
          resistanceRatio={0.65}
          threshold={5}
          shortSwipes={true}
          longSwipes={true}
          longSwipesMs={120}
          longSwipesRatio={0.2}            // smaller move still advances
          touchAngle={45}
          touchReleaseOnEdges={true}
          // autoplay is OFF
          // autoplay={false}
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
              <Slide m={m} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ m }) {
  const bgUrl = typeof m.bg === "string" ? m.bg : m.bg?.src ?? m.bg;
  return (
    <div className="w-[min(85vw,400px)]">
      {/* Photo Card */}
      <div className="team-card relative w-full h-[500px] md:h-[500px] rounded-[10px] overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />

        {/* Name + Title only (on photo) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="backdrop-blur-sm bg-black/35 border border-white/10 rounded-xl px-4 py-3">
            <div className="text-white text-lg font-semibold leading-tight">{m.name}</div>
            <div className="text-white/80 text-sm">{m.title}</div>
          </div>
        </div>
      </div>

      {/* Separate Description Box below photo */}
      <div className="mt-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="team-desc text-slate-200 text-sm leading-relaxed">{m.desc}</p>
        </div>
      </div>
    </div>
  );
}
