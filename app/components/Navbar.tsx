"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";

interface NavbarProps {
  onBuyClick: () => void;
}

export default function Navbar({ onBuyClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Demo Class", href: "#demo-class" },
    { name: "About Course", href: "#about-course" },
    { name: "Tutor", href: "#tutor" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Rastah
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
              <p className="text-[11px] font-medium text-emerald-700 uppercase tracking-widest">
                E-Commerce Academy
              </p>
            </div>
          </a>

          {/* Desktop Nav Options */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action: Student Portal & Buy Now Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Student Login
            </a>
            <button
              onClick={onBuyClick}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Now</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-800/60 text-xs font-semibold text-emerald-100">
                Rs. 2,000
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onBuyClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm"
            >
              <span>Buy Now</span>
              <span className="text-[11px] text-emerald-200">Rs. 2k</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            <a
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              Student Portal Login
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBuyClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Course Now — Rs. 2,000</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
