"use client";

import { useState } from "react";
import { ChevronDown, BookOpen, CheckCircle2, Gift, ShoppingBag, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

interface CourseDetailsProps {
  onBuyClick: () => void;
}

export default function CourseDetails({ onBuyClick }: CourseDetailsProps) {
  const [openModule, setOpenModule] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  const modules = [
    {
      title: "Module 1: E-Commerce Foundations & Mindset",
      lessons: "3 Lessons • 45 mins",
      summary: "Understand the Pakistani e-commerce landscape, Cash-on-Delivery economics, initial budget planning (starting with Rs. 15k-25k), and picking the right niche.",
      topics: [
        "White-label brand vs Dropshipping in Pakistan",
        "Understanding COD cycle and working capital management",
        "Essential tools checklist & mindset needed for 7-figure scale",
      ],
    },
    {
      title: "Module 2: High-Margin Winning Product Hunting",
      lessons: "4 Lessons • 65 mins",
      summary: "Master the exact search algorithms, Facebook Ad Library spying methods, TikTok trending searches, and profit calculators to find products with 60%+ margins.",
      topics: [
        "The 5 criteria of a winning e-commerce product",
        "Competitor ad spying & validation techniques",
        "Calculating true cost: Product + Shipping + Packaging + Meta Ad Cost",
        "Avoiding high-return / fragile items that burn money",
      ],
    },
    {
      title: "Module 3: Local Sourcing & Courier Logistics",
      lessons: "4 Lessons • 55 mins",
      summary: "Direct wholesale market guide (Shah Alam Lahore, Bolton Market Karachi, Raja Bazar Rawalpindi) and how to partner with top courier companies for fast COD remittance.",
      topics: [
        "How to talk to wholesalers and get sample pieces",
        "Opening COD accounts with Trax, TCS, Leopards, CallCourier",
        "Packaging standards to protect products and enhance unboxing experience",
        "Negotiating courier shipping rates and return charges",
      ],
    },
    {
      title: "Module 4: High-Converting Shopify Store Creation",
      lessons: "4 Lessons • 70 mins",
      summary: "Build an ultra-fast, modern, mobile-friendly online store without writing a single line of code. Includes premium templates and 1-click cash on delivery form.",
      topics: [
        "Shopify setup and domain connection in 30 minutes",
        "High-converting product page layout (Urdu + English copy)",
        "Integrating custom 1-click Cash on Delivery (COD) form app",
        "Adding social proof, customer reviews, and countdown trust triggers",
      ],
    },
    {
      title: "Module 5: Meta & TikTok Paid Ads Blueprint",
      lessons: "5 Lessons • 90 mins",
      summary: "The core engine of your business: how to run profitable ads on Facebook, Instagram, and TikTok starting with just Rs. 1,000 daily ad spend.",
      topics: [
        "Setting up Facebook Business Manager, Pixel & Conversion API",
        "Creating winning UGC (User Generated Content) video hooks with your phone",
        "Campaign budget optimization (CBO) vs Ad Set budget (ABO)",
        "Reading metrics: CPC, CPM, CTR, and Purchase ROAS",
        "Scaling winning ads from 10 orders a day to 100+ orders a day",
      ],
    },
    {
      title: "Module 6: Returns (RTO) Control, Customer Support & Scaling",
      lessons: "3 Lessons • 50 mins",
      summary: "Protect your cashflow. Automate order confirmation calls, manage courier tracking via WhatsApp, handle returns, and build a sustainable brand.",
      topics: [
        "WhatsApp automated order confirmation to reduce fake orders",
        "Step-by-step procedure to resolve customer delivery complaints",
        "Reinvesting profits to hire virtual assistants and scale inventory",
      ],
    },
  ];

  const bonuses = [
    "Verified Wholesaler Contact Directory (Lahore, Karachi & Rawalpindi)",
    "Ready-to-use High-Converting Shopify Store Theme",
    "Proven Meta & TikTok Ad Scripts & Hook Templates",
    "Net Profit & Ad ROAS Calculation Spreadsheet",
    "Private Student WhatsApp Discussion & Networking Group",
    "Lifetime Course Updates & Certificate of Completion",
  ];

  return (
    <section id="about-course" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Course Details</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Complete E-Commerce Masterclass Syllabus
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Zero se start karne walon ke liye mukammal practical roadmap. Har module step-by-step screen recording aur practical misalon par mabni hai.
          </p>
        </div>

        {/* Accordion Curriculum List */}
        <div className="space-y-4">
          {modules.map((mod, idx) => {
            const isOpen = openModule === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all"
              >
                <button
                  onClick={() => toggleModule(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      {mod.lessons}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {mod.title}
                    </h3>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-emerald-100 text-emerald-700" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-slate-600 space-y-4 animate-fadeIn">
                    <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                      {mod.summary}
                    </p>
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Topics Covered:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        {mod.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Course Deliverables & Bonuses Box */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Included Free with Course (Worth Rs. 15,000+)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Ready-made resources that save you weeks of trial and error
                </p>
              </div>
            </div>
            <div className="inline-block self-start sm:self-auto bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
              100% Free with Enrolment
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {bonuses.map((bonus, bIdx) => (
              <div key={bIdx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{bonus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON OF "GET YOUR COURSE NOW" (As explicitly requested by user: "Below that course details then button of get your course now") */}
        <div className="mt-12 text-center space-y-3">
          <button
            onClick={onBuyClick}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>Get Your Course Now — Rs. 2,000</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-xs text-slate-500">
            One-time payment • Lifetime access to all modules & future updates • Zero recurring charges
          </p>
        </div>

      </div>
    </section>
  );
}
