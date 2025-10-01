// src/components/TestimonialsCarousel.jsx
import React, { useId, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import defaultPhoto from "../assets/austin-distel-jpHw8ndwJ_Q-unsplash.jpg";

export default function TestimonialsCarousel({ items = [], showTitle = true }) {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const uid = useId().replace(/[:]/g, "");
  const prevCls = `t-prev-${uid}`;
  const nextCls = `t-next-${uid}`;

  const DATA = (items && items.length
    ? items
    : [
        {
          quote:
            "Working with the team at DataScienceGT was a game-changer. They translated our messy data into decisions.",
          author: "Anonymous",
          title: "They translated our messy data into decisions.",
          photo: defaultPhoto,
        },
      ]).map((it) => ({ ...it, photo: it.photo || defaultPhoto }));

  const closeModal = () => setExpandedIdx(null);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Left/Right nav buttons */}
      <button
        className={`${prevCls} group absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur transition`}
        aria-label="Previous testimonial"
        type="button"
      >
        <ChevronLeft />
      </button>
      <button
        className={`${nextCls} group absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur transition`}
        aria-label="Next testimonial"
        type="button"
      >
        <ChevronRight />
      </button>

      {/* One slide visible; no peeking */}
      <Swiper
        modules={[Pagination, Navigation]}
        className="testimonials-swiper !pb-12"
        slidesPerView={1}
        centeredSlides={false}
        grabCursor
        initialSlide={0}
        loop
        loopAdditionalSlides={DATA.length}
        speed={600}
        spaceBetween={0}
        pagination={{ clickable: true }}
        navigation={{ prevEl: `.${prevCls}`, nextEl: `.${nextCls}` }}
      >
        {DATA.map((m, i) => (
          <SwiperSlide key={i} className="t-slide">
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => setExpandedIdx(i)}
              aria-label="Read full testimonial"
            >
              <TestimonialCard item={m} showTitle={showTitle} compactMasked />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

<style>{`
  /* No peeking */
  .testimonials-swiper { overflow: hidden; }
  .testimonials-swiper .swiper-slide { width: 100% !important; z-index: 0; }
  .testimonials-swiper .swiper-slide:not(.swiper-slide-active) {
    opacity: 0;
    visibility: hidden;
  }
  .testimonials-swiper .swiper-slide.swiper-slide-active {
    opacity: 1;
    visibility: visible;
    z-index: 1;
  }
`}</style>


      {expandedIdx !== null ? (
        <Modal onClose={closeModal}>
          <ExpandedTestimonial item={DATA[expandedIdx]} showTitle={showTitle} onClose={closeModal} />
        </Modal>
      ) : null}
    </div>
  );
}

function TestimonialCard({ item, showTitle, compactMasked = false }) {
  const { quote, author, title, photo } = item;
  const first = title || (quote?.split(".")[0] || "").trim();

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] md:h-[220px]">
        <div className="relative h-48 md:h-full">
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="p-4 md:p-5 flex flex-col min-w-0">
          {showTitle && first ? (
            <h3 className="font-semibold leading-snug mb-2 truncate" title={first}>
              {first}
            </h3>
          ) : null}
          <div
            className={`relative min-w-0 ${compactMasked ? "h-40 md:h-[160px]" : "h-auto"}`}
            style={
              compactMasked
                ? {
                    overflow: "hidden",
                    wordBreak: "break-word",
                    hyphens: "auto",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                  }
                : {
                    overflow: "visible",
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }
            }
          >
            <p className="text-[15px] leading-relaxed whitespace-normal">{quote}</p>
          </div>
          {author ? <div className="mt-3 text-sm text-white/70">— {author}</div> : null}
        </div>
      </div>
    </article>
  );
}

function ExpandedTestimonial({ item, showTitle, onClose }) {
  const { quote, author, title, photo } = item;
  const first = title || (quote?.split(".")[0] || "").trim();

  return (
    <div className="relative w-full max-w-[95vw] sm:max-w-3xl bg-neutral-900 text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
        aria-label="Close"
      >
        <CloseX />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[280px,1fr]">
        <div className="relative h-56 md:h-full">
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="p-5 md:p-6">
          {showTitle && first ? (
            <h3 className="font-semibold text-lg md:text-xl leading-snug mb-3">{first}</h3>
          ) : null}
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {quote}
          </div>
          {author ? <div className="mt-4 text-sm text-white/70">— {author}</div> : null}
        </div>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 max-h-[90vh] overflow-auto">{children}</div>
    </div>
  );
}

/* Icons */
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CloseX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
