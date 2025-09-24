import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/what-we-do", label: "What We Do?" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Wordmark */}
        <Link to="/" className="flex items-center gap-3">
          {/* Company logo */}
          <img
            src="/logo-gt.svg"
            alt="DataScienceGT logo"
            className="h-32 w-auto"
            loading="eager"
            decoding="async"
          />
          {/* Optional wordmark (hide if your SVG already includes text) */}
          <span className="font-semibold tracking-wide hidden sm:inline-block">
            DATASCIENCE<span className="text-cyan-400">GT</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `hover:text-white transition ${isActive ? "text-white" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button (no drawer wired yet) */}
        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 border border-white/10"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="currentColor" d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
