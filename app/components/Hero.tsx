"use client";

import { ShoppingBag, Play, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, Star } from "lucide-react";

interface HeroProps {
  onBuyClick: () => void;
}

export default function Hero({ onBuyClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 border-b border-slate-200/70">
      {/* Background Subtle Ambient Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Price Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
              <span className="font-bold text-emerald-800">Special Launch Offer:</span>
              <span>Complete Lifetime Access for just <strong className="text-emerald-950 font-extrabold text-sm">Rs. 2,000</strong></span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Apna Profitable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                E-Commerce Business
              </span> <br />
              Shuru Karein
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Winning products dhoondne se le kar, local wholesalers se sourcing, high-converting Shopify store banana aur Meta & TikTok ads se orders scale karna—sab kuch step-by-step seekhein.
            </p>

            {/* Key Quick Bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Coding Required</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pakistan Local COD Model</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Community Access</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBuyClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Buy Course Now — Rs. 2,000</span>
              </button>

              <a
                href="#demo-class"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Free Demo Class</span>
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-200/80">
              <div>
                <p className="text-2xl font-black text-slate-900">1,500+</p>
                <p className="text-xs text-slate-500 font-medium">Students Enrolled</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-slate-900">94%</p>
                <p className="text-xs text-slate-500 font-medium">Store Launch Rate</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium">4.9 / 5 Rating</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive E-Commerce Dashboard Simulation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Simulated Store Performance Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 space-y-6 relative z-10">
                {/* Store Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                      🛍️
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Lahore Mart (Live Store)</h4>
                      <p className="text-xs text-slate-500">Shopify + Trax COD Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Sales</span>
                  </div>
                </div>

                {/* Big Metric Display */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today&apos;s Revenue</p>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">Rs. 248,650</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +38.4%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Generated from 52 Cash-on-Delivery orders</p>
                </div>

                {/* 3 Metric Grid */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <span className="text-xs text-slate-500 block">Orders</span>
                    <span className="text-base font-extrabold text-slate-900">52</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <span className="text-xs text-slate-500 block">Meta ROAS</span>
                    <span className="text-base font-extrabold text-emerald-600">4.8x</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <span className="text-xs text-slate-500 block">Delivery %</span>
                    <span className="text-base font-extrabold text-slate-900">89%</span>
                  </div>
                </div>

                {/* Recent Order Notification Simulation */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">New Order #2894 Dispatched</p>
                      <p className="text-[11px] text-slate-600">Karachi — Rs. 4,950 (COD)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Just now
                  </span>
                </div>

                {/* Course Guarantee Badge */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified Practical Strategy
                  </span>
                  <span className="font-bold text-emerald-700">Course Fee: Rs. 2,000</span>
                </div>
              </div>

              {/* Floating Student Achievement Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white border border-slate-200 rounded-xl shadow-lg p-3 flex items-center gap-3 z-20 max-w-[260px]">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
                  🚀
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Hamza (Student)</p>
                  <p className="text-[11px] text-slate-600">First ₨60,000 sale in 18 days</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
