import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} DataScienceGT. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <a href="#" className="hover:text-white">Privacy</a>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-white">Terms</a>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
