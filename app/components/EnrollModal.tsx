"use client";

import { useState } from "react";
import { X, CheckCircle2, ShoppingBag, ShieldCheck, ArrowRight, Copy, Check } from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    paymentMethod: "easypaisa",
  });

  if (!isOpen) return null;

  const paymentAccounts = {
    easypaisa: {
      name: "EasyPaisa",
      title: "Muhammad Ali (Rastah)",
      number: "0300 1234567",
      instructions: "EasyPaisa app se oper diye gaye number par Rs. 2,000 bhejein aur screenshot WhatsApp par share karein.",
    },
    jazzcash: {
      name: "JazzCash",
      title: "Muhammad Ali (Rastah)",
      number: "0300 1234567",
      instructions: "JazzCash app se oper diye gaye number par Rs. 2,000 send karein aur transaction ID WhatsApp par dein.",
    },
    bank: {
      name: "Bank Transfer (Meezan Bank)",
      title: "Rastah E-Commerce Academy",
      number: "0101 0102 3456 7890",
      iban: "PK36MEZN0001010102345678",
      instructions: "Any bank app se transfer karein. Reference mein apna phone number lazmi likhein.",
    },
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleWhatsAppConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Salam Rastah Team!\n\nI want to enroll in the E-Commerce Course (Rs. 2,000).\n` +
      `Name: ${formData.name || "N/A"}\n` +
      `WhatsApp: ${formData.whatsapp || "N/A"}\n` +
      `Email: ${formData.email || "N/A"}\n` +
      `Selected Payment: ${paymentAccounts[formData.paymentMethod as keyof typeof paymentAccounts].name}\n\n` +
      `Please verify and activate my course access.`
    );
    window.open(`https://wa.me/923001234567?text=${msg}`, "_blank");
  };

  const currentMethod = paymentAccounts[formData.paymentMethod as keyof typeof paymentAccounts];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden relative max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
              R
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Enrolment & Checkout</h3>
              <p className="text-xs text-slate-500">Rastah E-Commerce Masterclass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-300/70 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          
          {/* Course Summary Box */}
          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Special Early-Bird Access
              </span>
              <h4 className="text-base font-bold text-slate-900">Complete Course + All Bonuses</h4>
              <p className="text-xs text-slate-600 mt-0.5">Lifetime access • WhatsApp VIP Group</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">Rs. 10,000</span>
              <span className="text-2xl font-black text-emerald-700">Rs. 2,000</span>
            </div>
          </div>

          {/* Form: Student Info */}
          <form onSubmit={handleWhatsAppConfirm} className="space-y-4">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. Aapki Information (Your Details)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name (Aapka Naam)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number (0300...)"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address (Course access links ke liye)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Select Payment Method
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "easypaisa", label: "EasyPaisa" },
                  { key: "jazzcash", label: "JazzCash" },
                  { key: "bank", label: "Bank Transfer" },
                ].map((method) => (
                  <button
                    key={method.key}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.key })}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      formData.paymentMethod === method.key
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              {/* Selected Payment Details Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Account Title</p>
                    <p className="text-sm font-bold text-slate-900">{currentMethod.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium">Account / Mobile Number</p>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-sm font-black text-slate-900">{currentMethod.number}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(currentMethod.number, "num")}
                        className="text-xs p-1 rounded hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Copy account number"
                      >
                        {copiedAccount === "num" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 border-t border-slate-200 pt-2.5 leading-relaxed">
                  💡 {currentMethod.instructions}
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>Confirm & Send on WhatsApp (Rs. 2,000)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Click karne par WhatsApp open hoga jahan aap payment proof send kar ke foran access le sakte hain.
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
