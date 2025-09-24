import React from "react";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="pt-16 relative">
      <div className="relative h-[64vh] min-h-[460px] w-full overflow-hidden">
        {/* Full-bleed video (place file in /public/hero-bg.mp4) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Content */}
        <div className="relative z-10 h-full w-full">
          <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <p className="uppercase tracking-widest text-xs text-white/70 mb-3">
              Since 2015 • Pittsburgh HQ • Cloud + ML + Analytics
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              End-to-end data platforms
              <br />
              for <span className="text-white/90">decisive teams</span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300/90">
              Since 2015, DataScienceGT has been helping organizations turn
              complex data into clear results. We work at the intersection of
              data science, engineering, and strategy. Our goal is simple is to
              deliver solutions that are precise, scalable, and built to last.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-medium shadow-lg shadow-rose-500/25">
                Get a proposal
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-transparent border border-white/20 text-white hover:bg-white/10">
                Learn More
              </button>
            </div>

            {/* Labels (not buttons) — bigger (~+70%) and spanned across */}
            <div className="mt-10 w-full max-w-xl">
              <div className="flex items-center justify-between text-2xl">
                <span className="inline-flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#8e4f53" }}
                  />
                  <span style={{ color: "#8e4f53" }}>First Slide</span>
                </span>

                <span className="text-white/70">Second Slide</span>
                <span className="text-white/70">Third Slide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32 bg-black overflow-hidden">
      {/* Local keyframes for a gentle top-to-bottom reveal */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Soft blobs behind everything */}
      <GradientBlob className="-left-24 top-24 z-0 opacity-30" size={400} from="#7dd3fc" to="#a78bfa" />
      <GradientBlob className="right-0 top-64 z-0 opacity-20" size={320} from="#fb7185" to="#f59e0b" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Watermark occupies layout space, so H2 sits right beneath */}
        <div className="pointer-events-none flex justify-center">
          <div
            className="
              text-[80px] sm:text-[120px] lg:text-[180px]
              font-black tracking-[0.08em] select-none leading-none
              text-transparent bg-clip-text
              bg-[linear-gradient(to_bottom,#15303b_0%,#173439_50%,#3d4850_100%)]
            "
            style={{
              animation: "fadeDown 700ms ease-out both",
              textShadow: "0 0 24px rgba(23,52,58,0.35)",
            }}
          >
            ABOUT US
          </div>
        </div>

        {/* Heading directly under watermark */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Who We Are?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-slate-300">
            Since 2015, DataScienceGT has been helping organizations turn
            complex data into clear results. We work at the intersection of data
            science, engineering, and strategy to deliver solutions that are
            precise, scalable, and built to last.
          </p>
        </div>

        {/* Left → Right → Left features */}
        <div className="mt-14 space-y-16">
          <FeatureRow
            flip={false}
            title="Our Approach to Data Engineering"
            text="Like the Gran Turismo standard that inspires our name, we focus on complete performance: from neural architecture to predictive analytics, from raw data to actionable insights."
          />
          <FeatureRow
            flip={true}
            title="Our Credibility"
            text="For nearly a decade, we’ve supported enterprises with the depth of a global firm and the agility of a boutique team. We design architectures in AWS, Azure, and GCP. We build data pipelines in Python, Spark, and SQL."
          />
          <FeatureRow
            flip={false}
            title="AI + Analytics"
            text="We enable analytics and AI through platforms like Snowflake, Hadoop, Hive, and BigQuery. Increasingly, we help clients use predictive models, automation, and generative AI to unlock faster decisions and new opportunities."
          />
        </div>
      </div>
    </section>
  );
}

/* -------------- FEATURE ROW (order-only flip) -------------- */
function FeatureRow({ flip = false, title, text }) {
  return (
    <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
      {/* Graphic */}
      <div className={flip ? "lg:order-2" : "lg:order-1"}>
        <div className="relative aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
          <div className="absolute -left-10 top-8 h-40 w-40 rounded-2xl bg-gradient-to-br from-cyan-300 to-fuchsia-500 rotate-12 blur-[1px]" />
          <div className="absolute right-8 bottom-6 h-28 w-28 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 blur-[0.5px]" />
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-48 w-48 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-500 rotate-6" />
        </div>
      </div>

      {/* Text */}
      <div className={flip ? "lg:order-1" : "lg:order-2"}>
        <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
        <ul className="mt-4 space-y-3">
          {[text, text].map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                  <path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.4-1.4z" />
                </svg>
              </span>
              <p className="text-slate-300/95 leading-relaxed">{p}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- UTIL ---------------- */
function GradientBlob({ className = "", size = 320, from = "#7dd3fc", to = "#a78bfa" }) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    background: `conic-gradient(from 180deg at 50% 50%, ${from}, ${to}, ${from})`,
    filter: "blur(60px)",
    opacity: 0.25,
  };
  return <div style={style} className={`pointer-events-none absolute rounded-full ${className}`} />;
}
