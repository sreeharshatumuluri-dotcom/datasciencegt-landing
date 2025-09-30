import React from "react";
import approachImg from "../assets/asset-approach.png";
import approachImg2 from "../assets/2.png";
import TeamCarousel from "../components/TeamCarousel";
import heroImg from "../assets/hero.png";
import swissArmyImg from "../assets/swissarmy.png"; // ⬅️ NEW

export default function WhoWeAre() {
  return (
    <main className="bg-[#1A1A1A] min-h-screen">
      <Hero />
      <About />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="pt-16 relative bg-[#1A1A1A]">
      <div className="relative h-[64vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="DataScienceGT hero"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(1.12) contrast(1.04) saturate(1.05)" }}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
        <div className="relative z-10 h-full w-full">
          <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <p className="uppercase tracking-widest text-xs text-white/80 drop-shadow mb-3">
              Since 2015 • Chicago IL • Data + AI + ML + Analytics
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow">
              End-to-end data platforms
              <br />
              for <span className="text-white/95">decisive teams</span>
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-medium shadow-lg shadow-rose-500/25">
                Ride With US
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-transparent border border-white/30 text-white hover:bg-white/10">
                Learn More
              </button>
            </div>
            {/* Labels */}
            <div className="mt-10 w-full max-w-xl">
              <div className="flex items-center justify-between text-2xl">
                <span className="inline-flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#8e4f53" }} />
                  <span style={{ color: "#8e4f53" }}>Slide 1</span>
                </span>
                <span className="text-white/70">Slide 2</span>
                <span className="text-white/70">Slide 3</span>
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
    <section className="relative py-24 sm:py-28 lg:py-32 bg-[#1A1A1A] overflow-hidden">
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none flex justify-center">
          <div
            className="
              text-[80px] sm:text-[120px] lg:text-[180px]
              font-black tracking-[0.08em] select-none leading-none
              text-transparent bg-clip-text
              bg-[linear-gradient(to_bottom,#15303b_0%,#173439_50%,#3d4850_100%)]
            "
            style={{ animation: "fadeDown 700ms ease-out both", textShadow: "0 0 24px rgba(23,52,58,0.35)" }}
          >
            ABOUT US
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Who We Are?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-slate-300">
            For over a decade, DATASCIENCEGT has been helping organizations leverage data for
            AI- and ML-driven business results. We work relentlessly on behalf of our clients
            to add business value fast. Our technical expertise and business savvy intersect
            to produce high-impact, lasting solutions fast. The team has experience in the
            entire end-to-end value chain of data, from platform architecture to engineering
            data pipelines to building and operationalizing production-scale custom AI models.
            Work with us, ride with us, and benefit your business through us.
          </p>
        </div>

        <div className="mt-14 space-y-16">
          <FeatureRow
            flip={false}
            title="Who is Behind DATASCIENCEGT?"
            text="The company was created by our founder, Gopala Tumuluri. He has over 30 years of experience 
            in the technology industry in numerous roles, starting as a software engineer and rising up to lead 
            a 100+ member engineering team to build cloud-based data products and services. Gopala created 
            DATASCIENCEGT over 10 years ago when he pivoted to a hands-on career in the field of data science 
            and decided to work with clients on their diverse, impactful, and high-value projects. In his prior
             professional career, he also worked as a product line owner, marketing leader, and business unit 
             head for products and cloud services that generated tens of millions in annual revenue. During 
             this time, he also honed his business skills and insistence on business value add. At DATASCIENCEGT, 
             Gopala brings together his hard-coded technical and business skills to deliver value to the company's 
             clients. Now, he has also built a team and trained them to be laser-focused on value delivery through 
             high-quality technical work. Gopala holds three master's degrees - an MS in computer science from the 
             University of Kentucky, an MBA from Carnegie Mellon University, and a Master's degree in data science 
             from the University of California, Berkeley. You can win with him and his team."
            imageSrc={approachImg}
          />

          <FeatureRow
            flip={true}
            title="Story Behind Our Name"
            text={
              <>
                Over 20 years ago, on the cusp of launching a new family of products as part of the product
                line portfolio Gopala was leading, he received a call from his CEO suggesting (well, insisting)
                they name the new family GT. Gopala was puzzled and unsure. He had heard of many cars named GT, but
                did not have immersed knowledge of the history behind the GT. The CEO explained that GT stood for{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Gran_Turismo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted hover:text-rose-300"
                >
                  Gran Tourismo
                </a>
                , and that it signified performance and comfort for the long journey, and that the name was apt for the
                product line being launched. Since then, he embraced the name for being reflective of his own work and the work
                done by this new Data Science and AI company. Riding from data to AI with us is like riding the Gran Tourismo —
                high performance, high comfort, and high reliability. All in the name.
              </>
            }
            imageSrc={approachImg2}
          />

          <TeamCarousel />

          {/* ---------- SWISS ARMY BANNER (NEW) ---------- */}
          <SwissArmyBanner />
        </div>
      </div>
    </section>
  );
}

/* -------------- FEATURE ROW -------------- */
function FeatureRow({ flip = false, title, text, imageSrc }) {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
      <div className={flip ? "lg:order-2" : "lg:order-1"}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full max-w-md mx-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <div className="relative aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-2xl bg-gradient-to-br from-cyan-300 to-fuchsia-500 rotate-12 blur-[1px]" />
            <div className="absolute right-8 bottom-6 h-28 w-28 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 blur-[0.5px]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-48 w-48 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-500 rotate-6" />
          </div>
        )}
      </div>

      <div className={flip ? "lg:order-1" : "lg:order-2"}>
        <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
        <ul className="mt-4 space-y-3">
          {paragraphs.map((p, i) => (
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

/* -------------- SWISS ARMY BANNER -------------- */
/* -------------- SWISS ARMY BANNER (UPDATED) -------------- */
function SwissArmyBanner() {
  return (
    <section className="relative mt-8 rounded-3xl overflow-hidden border border-white/10">
      {/* Brighter background image */}
      <img
        src={swissArmyImg}
        alt="Swiss Army Knife metaphor for our data capabilities"
        className="w-full h-[60vh] min-h-[420px] object-cover"
        loading="lazy"
        decoding="async"
        // brighter, slightly more saturated for pop
        style={{ filter: "brightness(1.15) contrast(1.03) saturate(1.08)" }}
      />

      {/* Lighter overlay for readability without dimming too much */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.22)_30%,rgba(0,0,0,0.14)_60%,rgba(0,0,0,0.08)_100%)]" />

      {/* Watermark with SAME effect as ABOUT US */}
      <div className="pointer-events-none absolute inset-x-0 top-6 sm:top-10 flex justify-center">
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
          OUR WORK
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-white font-extrabold text-3xl sm:text-4xl drop-shadow">
            What We Do?
          </h3>

          {/* Slider affordance */}
          <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
            <span className="h-2 w-2 rounded-full bg-white/50" />
            <span className="h-2 w-10 rounded-full bg-white" />
          </div>

          <p className="mt-6 mx-auto max-w-4xl text-lg sm:text-xl text-white/95 leading-relaxed drop-shadow">
            Think of us as the Swiss Army Knife for data. From data architecture to engineering,
            from analytics&nbsp; to predictive modeling, from generative AI to automation, we cover the full
            spectrum. What sets us&nbsp; apart is how we bring the right tools together to address your challenge
            and deliver results that last.
          </p>
        </div>
      </div>
    </section>
  );
}

