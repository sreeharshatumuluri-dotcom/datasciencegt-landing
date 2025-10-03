// src/components/TestimonialsCarousel.jsx
import React, { useId, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Images
import GT1 from "../assets/GT1.jpg";
import GT2 from "../assets/GT2.png";
import GT3 from "../assets/GT3.png";
import GT4 from "../assets/GT4.png";
import GT5 from "../assets/GT5.png";

export default function TestimonialsCarousel({ items = [], showTitle = true }) {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const uid = useId().replace(/[:]/g, "");
  const prevCls = `t-prev-${uid}`;
  const nextCls = `t-next-${uid}`;
  const pagCls = `t-pag-${uid}`;
  const scrollYRef = useRef(0);

  const DATA = (items && items.length
    ? items
    : [
        {
          quote:
            "Working with the team at DataScienceGT was a game-changer. They translated our messy data into decisions.",
          author: "Anonymous",
          title: "They translated our messy data into decisions.",
        },
      ]).map((it) => ({ ...it }));

  const closeModal = () => setExpandedIdx(null);

  // === Body scroll lock when modal is open ===
  useEffect(() => {
    const body = document.body;
    if (expandedIdx !== null) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overscrollBehavior = "contain";
      body.style.overflow = "hidden";
    } else {
      const y = -parseInt(body.style.top || "0", 10) || 0;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      body.style.overflow = "";
    }
    return () => {
      const y = -parseInt(document.body.style.top || "0", 10) || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      if (expandedIdx !== null) window.scrollTo(0, y);
    };
  }, [expandedIdx]);

  // === Photos 1..5 then repeat ===
  const ALT_PHOTOS = [GT1, GT2, GT3, GT4, GT5];
  const photoForIndex = (idx) => ALT_PHOTOS[idx % ALT_PHOTOS.length];

  const expandedItem =
    expandedIdx !== null
      ? { ...DATA[expandedIdx], photo: photoForIndex(expandedIdx) }
      : null;

  return (
    <div className="w-full relative overflow-hidden">
      {/* Swiper */}
      <Swiper
        modules={[Pagination, Navigation]}
        className="testimonials-swiper"
        slidesPerView={1}
        centeredSlides={false}
        grabCursor
        initialSlide={0}
        loop
        loopAdditionalSlides={DATA.length}
        speed={600}
        spaceBetween={0}
        pagination={{ el: `.${pagCls}`, clickable: true }}
        navigation={{ prevEl: `.${prevCls}`, nextEl: `.${nextCls}` }}
      >
        {DATA.map((m, i) => {
          const itemWithAltPhoto = { ...m, photo: photoForIndex(i) };
          return (
            <SwiperSlide key={i} className="t-slide !pb-0">
              <button
                type="button"
                className="block w-full text-left"
                onClick={() => setExpandedIdx(i)}
                aria-label="Read full testimonial"
              >
                <TestimonialCard
                  item={itemWithAltPhoto}
                  showTitle={showTitle}
                  compactMasked
                />
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Controls row */}
      <div className="mt-6 grid grid-cols-[1fr,auto,1fr] items-center gap-3">
        <button
          className={`${prevCls} justify-self-end group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur transition`}
          aria-label="Previous testimonial"
          type="button"
        >
          <ChevronLeft />
        </button>

        <div className={`${pagCls} swiper-pagination-static flex items-center justify-center`} />

        <button
          className={`${nextCls} justify-self-start group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur transition`}
          aria-label="Next testimonial"
          type="button"
        >
          <ChevronRight />
        </button>
      </div>

      <style>{`
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
        .swiper-pagination-static { position: static !important; }
        .${pagCls}.swiper-pagination-bullets .swiper-pagination-bullet {
          margin: 0 6px !important;
          width: 8px;
          height: 8px;
          opacity: 0.5;
          background: #fff;
        }
        .${pagCls}.swiper-pagination-bullets .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>

      {expandedIdx !== null ? (
        <Modal onClose={closeModal}>
          <ExpandedTestimonial
            item={expandedItem}
            showTitle={showTitle}
            onClose={closeModal}
          />
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
      <div className="flex items-stretch">
        {/* Image always flush left */}
        <div className="w-40 md:w-56 flex-shrink-0">
          <img
            src={photo}
            alt=""
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        {/* Text content */}
        <div className="p-4 md:p-5 flex flex-col min-w-0 flex-1">
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
            <p className="text-[15px] leading-relaxed whitespace-normal">
              {quote}
            </p>
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

      <div className="flex flex-col md:flex-row">
        {/* Image left */}
        <div className="w-full md:w-72 flex-shrink-0">
          <img src={photo} alt="" className="h-full w-full object-contain" />
        </div>
        {/* Text */}
        <div className="p-5 md:p-6 flex-1">
          {showTitle && first ? (
            <h3 className="font-semibold text-lg md:text-xl leading-snug mb-3">
              {first}
            </h3>
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
  // stop wheel/touch scroll from bubbling
  const stop = (e) => e.stopPropagation();

  const modalNode = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      onWheel={stop}
      onTouchMove={stop}
    >
      {/* Solid overlay to fully hide background text */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 max-h-[90vh] overflow-auto">{children}</div>
    </div>
  );

  return createPortal(modalNode, document.body);
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
