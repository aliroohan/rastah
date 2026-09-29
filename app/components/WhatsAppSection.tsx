"use client";

import { MessageCircle, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function WhatsAppSection() {
  const whatsappNumber = "923001234567"; // Can be replaced with actual WhatsApp number
  const whatsappMessage = encodeURIComponent(
    "Salam! I want to enroll in the Rastah E-Commerce Course for Rs. 2,000. Please guide me on payment details."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* In-Page WhatsApp Support Banner */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 sm:p-12 text-white shadow-xl shadow-emerald-600/15 relative overflow-hidden">
            {/* Ambient background blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-emerald-100">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Instant Response • Active Now</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                  Koi Sawaal Hai? Direct WhatsApp Par Rabta Karein
                </h3>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  Agar aap ko payment tareeqay, course access, ya curriculum ke mutaliq koi bhi confusion hai, humari admissions team direct WhatsApp par live support ke liye dastyab hai.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    Official Verified Support
                  </span>
                  <span>•</span>
                  <span>Rs. 2,000 Special Offer Inquiry</span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rastah on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
          </span>
        </div>
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
}
