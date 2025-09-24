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
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 grid place-items-center ring-1 ring-white/20">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90">
              <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20Zm0 2a8 8 0 110 16A8 8 0 0112 4Zm3.5 8a7.5 7.5 0 01-1.2 4.1 12 12 0 00-6.6 0A7.5 7.5 0 016.5 12c0-.9.15-1.8.44-2.6a10.9 10.9 0 016.12 0c.29.83.44 1.7.44 2.6Zm1.86 3.4A9.5 9.5 0 0019 12c0-1.2-.21-2.3-.64-3.36-1.32-.4-2.72-.64-4.36-.64-1.64 0-3.04.24-4.36.64A9.5 9.5 0 007 12c0 1.2.21 2.3.64 3.36 1.32.4 2.72.64 4.36.64 1.64 0 3.04-.24 4.36-.64Z"/>
            </svg>
          </div>
          <div className="font-semibold tracking-wide">
            DATASCIENCE<span className="text-cyan-400">GT</span>
          </div>
        </Link>

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

        {/* Mobile menu button (kept) */}
        <button className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 border border-white/10">
          <span className="sr-only">Open menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="currentColor" d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
