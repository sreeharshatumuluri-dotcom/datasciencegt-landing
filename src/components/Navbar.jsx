// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg"; // <-- final SVG logo

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = [
    { to: "/", label: "Who We Are" },
    { to: "/what-we-do", label: "What We Do?" },
    { to: "/testimonials", label: "What Others Say" },
    
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#1A1A1A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1A1A1A]/80 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand: big logo only */}
        <Link to="/" className="flex items-center" aria-label="DataScienceGT Home">
          <img
            src={Logo}
            alt="DataScienceGT logo"
            className="block h-36 w-auto sm:h-42 md:h-48" // 3x larger
            loading="eager"
            decoding="async"
          />
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

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {!open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path fill="currentColor" d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29 10.59 10.6l6.3-6.31z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <nav className="mx-4 sm:mx-6 lg:mx-8 mt-2 mb-4 rounded-xl border border-white/10 bg-[#101010]/95">
          <ul className="py-2">
            {nav.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    [
                      "block px-4 py-3 text-sm",
                      "hover:bg-white/5",
                      isActive ? "text-white" : "text-slate-300",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
