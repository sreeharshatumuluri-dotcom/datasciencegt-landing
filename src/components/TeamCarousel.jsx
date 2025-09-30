// src/components/TeamCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Replace with your real images (or use /public and set bg: "/team/xxx.jpg")
import madhavImg from "../assets/team/madhav.jpg";
import gopalaImg from "../assets/team/gopala.jpg";
import harshaImg from "../assets/team/harsha.jpg";

const TEAM = [
  {
    // 1st
    bg: madhavImg,
    name: "Madhav Tumuluri",
    title: "Manager, Business & Strategy",
    desc:
      "Finance & strategy specialist (MBA in Finance). Leads payroll, client management systems, and internal automations so the team stays laser-focused on client value.",
  },
  {
    // 2nd (default centered)
    bg: gopalaImg,
    name: "Gopala Tumuluri",
    title: "Founder & Principal",
    desc:
      "Hands-on leader combining deep tech with business value delivery. Focus areas: data platforms, AI/ML strategy, and end-to-end execution.",
  },
  {
    // 3rd
    bg: harshaImg,
    name: "Sree Harsha Tumuluri",
    title: "Developer, Software & AI",
    desc:
      "Building scalable software and AI features across the stack. (Full bio coming soon.)",
  },
];

export default function TeamCarousel() {
  return (
    <section className="relative py-16">
      <style>{`
        .team-swiper { width: 100%; padding-top: 50px; padding-bottom: 50px; overflow: hidden; }
        .team-swiper .swiper-slide {
          width: 400px; /* fixed width for coverflow */
        }
        /* 3D coverflow shadows like the pen */
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
          background: #696969; transition: all .5s ease 0s; border-radius: 8px;
        }
        .team-swiper .swiper-pagination-bullet-active { background: #ffc107; width: 30px; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">The Team</h2>
        <p className="mt-2 text-center text-slate-300">The people behind DATASCIENCEGT</p>

        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="team-swiper !pb-12"
          effect="coverflow"
          centeredSlides
          grabCursor
          slidesPerView="auto"
          initialSlide={1}               // start on Gopala (second)
          loop
          loopAdditionalSlides={TEAM.length}
          autoplay={{
            delay: 8000,                 // 8s
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: true,
          }}
          speed={900}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
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
    <div className="w-[400px]">
      {/* Photo Card */}
      <div className="relative w-full h-[500px] rounded-[10px] overflow-hidden shadow-2xl">
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
          <p className="text-slate-200 text-sm leading-relaxed">{m.desc}</p>
        </div>
      </div>
    </div>
  );
}
