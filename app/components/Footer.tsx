"use client";

import { ArrowUp, ShoppingBag, ShieldCheck } from "lucide-react";

interface FooterProps {
  onBuyClick: () => void;
}

// Crisp inline SVGs for social platforms
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

export default function Footer({ onBuyClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navSections = [
    { name: "Demo Class", href: "#demo-class" },
    { name: "About Course", href: "#about-course" },
    { name: "Meet The Tutor", href: "#tutor" },
    { name: "Why Rastah", href: "#demo-class" },
  ];

  const courseHighlights = [
    "Winning Product Hunting",
    "Pakistani Wholesale Sourcing",
    "Shopify Store Setup (No Code)",
    "Meta & TikTok Ads Mastery",
    "Returns & COD Management",
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      href: "https://wa.me/923001234567?text=Hi%20Rastah%20team,%20I%20have%20an%20inquiry",
      color: "hover:text-emerald-600 hover:border-emerald-300",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: "https://instagram.com",
      color: "hover:text-pink-600 hover:border-pink-300",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://facebook.com",
      color: "hover:text-blue-600 hover:border-blue-300",
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      href: "https://youtube.com",
      color: "hover:text-red-600 hover:border-red-300",
    },
  ];

  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-xs">
                R
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">Rastah</span>
                <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  E-Commerce Academy
                </p>
              </div>
            </a>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Rastah Pakistan ka most affordable aur practical e-commerce learning platform hai. Humara maqsad har shakhs ko apna online brand shuru karne ka sahi rasta dikhana hai.
            </p>

            <div className="pt-2">
              <button
                onClick={onBuyClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Enroll in Course — Rs. 2,000</span>
              </button>
            </div>
          </div>

          {/* Col 3: Page Sections */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Page Sections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navSections.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                  >
                    <span>→</span> {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Course Modules */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Key Syllabus
            </h4>
            <ul className="space-y-2.5 text-sm">
              {courseHighlights.map((topic, i) => (
                <li key={i} className="text-slate-600">
                  • {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Social Channels & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-500">
              Follow our social channels for daily free e-commerce tips, case studies, and winning product alerts:
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Rastah on ${social.name}`}
                    className={`w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rastah E-Commerce Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              100% Verified Education
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-700 hover:text-emerald-600 font-bold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
