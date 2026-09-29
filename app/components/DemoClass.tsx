"use client";

import { useState } from "react";
import { Play, ShoppingBag, ArrowRight, Video, Sparkles, CheckCircle2 } from "lucide-react";

interface DemoClassProps {
  onBuyClick: () => void;
}

export default function DemoClass({ onBuyClick }: DemoClassProps) {
  // Use state to track if the user clicked play or directly view iframe
  const [isPlaying, setIsPlaying] = useState(false);

  // High quality educational e-commerce tutorial video (standard youtube embed)
  const videoEmbedUrl = "https://www.youtube.com/embed/gM9_8c30aA8?autoplay=1&rel=0";

  const numberedPoints = [
    {
      number: "01",
      title: "Winning Product Hunting & Validation Formula",
      description: "Dekhein kaisay Pakistani market ke liye aise products filter kiye jaate hain jin ki demand high ho, return (RTO) rate low ho, aur profit margin kam az kam 50% se 70% ho.",
    },
    {
      number: "02",
      title: "Local Wholesalers & Cash-On-Delivery Logistics",
      description: "Shah Alam, Bolton Market, ya local manufacturers se baghair barri investment ke inventory secure karne ka tareeqa aur TCS/Trax ke COD portal setup ki guidelines.",
    },
    {
      number: "03",
      title: "High-Converting Shopify Store Creation",
      description: "Baghair web development ya coding seekhe 2 ghante mein professional, fast-loading e-commerce store banana jo mobile users ko foran khareedne par aamada kare.",
    },
    {
      number: "04",
      title: "Meta (Facebook/Instagram) & TikTok Ads Strategy",
      description: "Small budget (Rs. 1,000/day) se winning ad creative banana, accurate audiences ko target karna aur campaigns ko profitable ROAS (4x+) par scale karna.",
    },
    {
      number: "05",
      title: "Cashflow Management & Controlling Returns (RTO)",
      description: "Pakistani e-commerce ka sab se bara challenge returns hain. Customer confirmation calls aur automated WhatsApp messages se returns ko 10% se kam rakhne ka secret system.",
    },
  ];

  return (
    <section id="demo-class" className="py-20 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-emerald-700" />
            <span>Watch Demo Class</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Demo Class: Watch Before You Decide
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Khareedne se pehle demo video mukammal dekhein aur khud dekhein kaisay aap step-by-step apna e-commerce safar shuru kar sakte hain.
          </p>
        </div>

        {/* YouTube Video Container */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900 aspect-video group">
          {!isPlaying ? (
            /* Custom Clean Light Preview Overlay */
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-slate-950/80 via-slate-900/60 to-emerald-950/50 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300"
              onClick={() => setIsPlaying(true)}
            >
              {/* Decorative background visual */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

              {/* Big Animated Play Button */}
              <button
                aria-label="Play Demo Class Video"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 transform group-hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-current ml-1" />
              </button>

              <div className="mt-6 space-y-1.5 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase">
                  Class Preview • 24 Mins
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Pakistan E-Commerce Roadmap (Demo Session)
                </h3>
                <p className="text-sm text-slate-200">
                  Click to start the class video directly from YouTube
                </p>
              </div>
            </div>
          ) : (
            /* Active YouTube Iframe */
            <iframe
              className="w-full h-full"
              src={videoEmbedUrl}
              title="Rastah E-Commerce Free Demo Class"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Numbered Points Written Below the Video (As explicitly requested by user) */}
        <div className="mt-16 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-black text-slate-900">
              Key Lessons Covered in This Masterclass:
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Demo class aur mukammal course ke 5 bunyadi asbaaq jin se aap ka business step-by-step set hoga:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2">
            {numberedPoints.map((item) => (
              <div
                key={item.number}
                className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition-all duration-200"
              >
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                  {item.number}
                </div>

                {/* Point Content */}
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AGAIN BUY NOW BUTTON (As explicitly requested by user: "below that some points with numbers are written Again Buy now button") */}
        <div className="mt-12 p-8 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
            Limited Early-Bird Enrolment
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to Build Your Store? Join Rastah Today
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Don&apos;t wait. Get instant lifetime access to all 20+ video lessons, templates, and supplier lists for just <strong className="text-slate-950 font-extrabold">Rs. 2,000</strong>.
          </p>
          <div className="pt-2">
            <button
              onClick={onBuyClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Buy Now — Rs. 2,000</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-500">
            ⚡ Instant Access via WhatsApp & Email • 100% One-Time Fee
          </p>
        </div>

      </div>
    </section>
  );
}
