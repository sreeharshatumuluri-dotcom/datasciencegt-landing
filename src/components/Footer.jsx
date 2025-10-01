import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A]">
      {/* ===== Full-bleed CTA with 10px gutters and rounded corners ===== */}
      <section className="relative w-screen">
        {/* 10px side margins (gutters) + rounded container */}
        <div className="mx-[10px]">
          <div className="relative h-[560px] w-full">
            {/* Background image */}
            <img
              src="/footer-bg.jpg"
              alt="Consultation banner"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Overlays for contrast */}
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_25%_35%,rgba(0,0,0,0.45),rgba(0,0,0,0))]" />

            {/* Content */}
            <div className="relative z-10 h-full">
              <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-3xl text-white">
                  <p className="uppercase tracking-[0.2em] text-xs text-white/70 mb-3">
                    Since 2015 • Data • Cloud • AI • Analytics
                  </p>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                    TEXT <span className="whitespace-nowrap">RIDEAGT</span> to{" "}
                    <span className="whitespace-nowrap">(872)332-7221</span>
                  </h3>

                  <p className="mt-3 text-2xl sm:text-3xl font-semibold text-white/90">
                    For Free Consultation or email us @
                  </p>

                  {/* Action chips */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="mailto:Ride@datasciencegt.com"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 text-white px-4 py-2 font-medium hover:bg-white/20 transition"
                    >
                      Ride@datasciencegt.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft fade into page bg */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-black/90" />
          </div>
        </div>
      </section>

      {/* ===== Thin site footer ===== */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex flex-col sm:flex-row items-center justify-between text-sm text-white/60">
          <span>© {new Date().getFullYear()} DataScienceGT. All rights reserved.</span>
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <a href="/what-we-do" className="hover:text-white">What We Do?</a>
            <a href="/testimonials" className="hover:text-white">Testimonials</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
