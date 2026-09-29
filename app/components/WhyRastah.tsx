"use client";

import { Check, X, Target, PackageSearch, Smartphone, BarChart3, Users, Zap } from "lucide-react";

export default function WhyRastah() {
  const pillars = [
    {
      icon: PackageSearch,
      title: "Local Pakistani Sourcing & COD",
      description: "Direct wholesale markets (Shah Alam, Bolton Market, Raja Bazar) ke authentic contacts aur reliable courier accounts (TCS, Trax, Leopards) setup karne ka practical tareeqa.",
      badge: "Local Blueprint",
    },
    {
      icon: Target,
      title: "Data-Driven Winning Products",
      description: "Tukkay lagana band karein. Seekhein kaisay ad library, TikTok creative center aur competitor analysis se 60%+ profit margin wale products hunt kiye jaate hain.",
      badge: "High Margin",
    },
    {
      icon: Smartphone,
      title: "High-Converting Store Design",
      description: "Baghair kisi coding ke, mobile-friendly Shopify aur custom checkout store banana jo Pakistani buyers ka trust jeet kar order conversions ko 3x kar de.",
      badge: "No Coding",
    },
    {
      icon: BarChart3,
      title: "Meta & TikTok Ads Scaling",
      description: "Rs. 1,000/din se start kar ke winning ad creatives, audience targeting aur low-cost per purchase achieve karne ka step-by-step formula.",
      badge: "Budget Friendly",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>Why Rastah?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kyun Rastah Har Pakistani Entrepreneur Ki Pehli Pasand Hai?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Market mein lakhoon rupay ke be-faida theoretical courses chal rahe hain. Rastah sirf 100% practical, actionable aur ground-reality par mabni hai.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Comparison Card: Others vs Rastah */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Clear Comparison: Why You Save Thousands With Rastah
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Quality education should be affordable, not an expensive barrier to entry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Traditional Institutes */}
            <div className="rounded-xl border border-slate-200 p-6 bg-slate-50/70 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-bold text-slate-700">Other Training Institutes</h4>
                  <p className="text-xs text-slate-500">Outdated recorded slides</p>
                </div>
                <span className="text-sm font-extrabold text-slate-500 line-through">Rs. 35,000+</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Expensive fees with low ROI</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Theoretical knowledge with zero Pakistan COD context</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  <span>No supplier directories or vetted contacts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Zero community or mentor follow-up</span>
                </li>
              </ul>
            </div>

            {/* Rastah Academy */}
            <div className="rounded-xl border-2 border-emerald-500 p-6 bg-emerald-50/40 space-y-4 relative shadow-xs">
              <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Unmatched Value
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div>
                  <h4 className="font-black text-slate-900">Rastah E-Commerce Academy</h4>
                  <p className="text-xs text-emerald-700 font-semibold">Practical hands-on masterclass</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-700">Rs. 2,000</span>
                  <span className="block text-[10px] text-slate-500">Lifetime access</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm font-medium text-slate-800">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>Affordable Rs. 2,000 fee for complete access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>100% focused on Pakistani e-commerce & Cash-on-Delivery</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>Verified local supplier list & courier setup guides</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>Dedicated WhatsApp student community support</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
