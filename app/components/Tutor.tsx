"use client";

import { Award, CheckCircle2, TrendingUp, Users, MessageSquare, Star } from "lucide-react";

export default function Tutor() {
  const milestones = [
    { label: "Total E-Com Revenue", value: "₨ 45M+" },
    { label: "Active Stores Launched", value: "120+" },
    { label: "Students Trained", value: "1,500+" },
    { label: "Years in Pakistani E-Com", value: "5+ Years" },
  ];

  return (
    <section id="tutor" className="py-20 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Instructor Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet Your E-Commerce Mentor
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Practical knowledge un logon se seekhein jo rozana Pakistani market mein actual stores chala rahe hain.
          </p>
        </div>

        {/* Tutor Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Avatar & Badges */}
            <div className="lg:col-span-4 text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 mx-auto flex items-center justify-center text-white text-5xl font-black shadow-xl shadow-emerald-600/20 border-4 border-white">
                  M.A
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm text-xs font-bold text-emerald-700 whitespace-nowrap flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  Verified Mentor
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Muhammad Ali</h3>
                <p className="text-sm font-semibold text-emerald-700">Founder, Rastah Academy</p>
                <p className="text-xs text-slate-500 mt-1">E-Commerce Brand Builder & Growth Strategist</p>
              </div>
            </div>

            {/* Right: Bio & Philosophy */}
            <div className="lg:col-span-8 space-y-5 text-slate-700">
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900">
                  &ldquo;Mera maqsad hai har Pakistani ko apna independent source of income dena.&rdquo;
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  Maine 2019 mein sirf 20,000 rupay se local e-commerce shuru kiya tha. Hazaron galtiyan karne aur lakhoon rupay zaya karne ke baad mujhe samajh aayi ke Pakistani Cash-on-Delivery market ka asal formula kya hai.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  Is course ko <strong>Rs. 2,000</strong> mein rakhne ki wajah yeh hai ke koi bhi mehenge 40k-50k ke courses ki wajah se peche na reh jaye. Jo kuch maine 5 saal mein seekha, woh sab aapko is mukammal masterclass mein milega.
                </p>
              </div>

              {/* Milestone Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {milestones.map((m, mIdx) => (
                  <div key={mIdx} className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-lg font-black text-slate-900 block">{m.value}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real Case Studies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Weekly Live Student Q&As</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp Guidance</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
