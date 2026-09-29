"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Play, 
  LogOut, 
  CreditCard, 
  MessageCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import SessionGuard from "@/app/components/lms/SessionGuard";
import { DEFAULT_COURSE } from "@/lib/models/Course";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<{ completedLessonIds: string[]; lastWatchedLessonId: string }>({
    completedLessonIds: [],
    lastWatchedLessonId: "m1-l1",
  });
  const [loading, setLoading] = useState(true);

  // Payment form state
  const [payMethod, setPayMethod] = useState("easypaisa");
  const [trxId, setTrxId] = useState("");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (!data.user) {
          router.push("/login");
          return;
        }
        setUser(data.user);

        // If enrolled, fetch progress
        if (data.user.enrolmentStatus === "ACTIVE") {
          const progRes = await fetch("/api/progress?courseSlug=ecommerce-business-masterclass");
          if (progRes.ok) {
            const progData = await progRes.json();
            setProgress(progData);
          }
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingPayment(true);
    try {
      const res = await fetch("/api/enrolment/submit-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: payMethod, trxId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev: any) => ({
          ...prev,
          enrolmentStatus: "PENDING_VERIFICATION",
          paymentDetails: { method: payMethod, trxId },
        }));
      } else {
        alert(data.error || "Failed to submit payment");
      }
    } catch (err) {
      alert("Error submitting payment proof");
    } finally {
      setSubmittingPayment(false);
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Loading Student Dashboard...
      </div>
    );
  }

  const totalLessons = DEFAULT_COURSE.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessonIds.length;
  const percentComplete = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Background Device Concurrency Guard */}
      <SessionGuard />

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-xs">
              R
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight">Rastah LMS</span>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Student Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.whatsapp}</p>
            </div>
            {user?.role === "admin" && (
              <Link
                href="/admin/enrolments"
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Welcome Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Your journey to starting and scaling a 7-figure e-commerce business.
            </p>
          </div>

          <div>
            {user?.enrolmentStatus === "ACTIVE" ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Active Enrolment (Lifetime Access)
              </span>
            ) : user?.enrolmentStatus === "PENDING_VERIFICATION" ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                Payment Under Review
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
                Enrolment Pending (Rs. 2,000)
              </span>
            )}
          </div>
        </div>

        {/* CONDITION 1: User has ACTIVE enrolment */}
        {user?.enrolmentStatus === "ACTIVE" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  Enrolled Masterclass
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  {DEFAULT_COURSE.title}
                </h2>
                <p className="text-sm text-slate-600">
                  {DEFAULT_COURSE.description}
                </p>
              </div>

              <div>
                <Link
                  href={`/learn/${DEFAULT_COURSE.slug}`}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Continue Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Progress Bar & Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-slate-700">Course Completion</span>
                <span className="text-emerald-700 font-extrabold">{percentComplete}% ({completedCount} of {totalLessons} Lessons)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            {/* Quick Module Previews */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Course Modules:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DEFAULT_COURSE.modules.map((m) => (
                  <div key={m.moduleNumber} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                    <span className="font-extrabold text-emerald-700 block">Module {m.moduleNumber}</span>
                    <p className="font-bold text-slate-900 text-sm">{m.title}</p>
                    <p className="text-slate-500 text-[11px]">{m.lessons.length} video lessons</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONDITION 2: User payment is PENDING VERIFICATION */}
        {user?.enrolmentStatus === "PENDING_VERIFICATION" && (
          <div className="bg-amber-50/70 rounded-3xl border-2 border-amber-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-900">
                  Payment Verification in Progress
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
                  Aapki Rs. 2,000 payment details receive ho chuki hain. Admin team verification kar rahi hai aur aglay 15-30 minute mein aapka course access unlock ho jayega.
                </p>
                {user?.paymentDetails?.trxId && (
                  <p className="text-xs font-mono font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-amber-200 inline-block mt-2">
                    Trx ID: {user.paymentDetails.trxId} ({user.paymentDetails.method})
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/923001234567?text=Salam!%20I%20submitted%20Rs.%202000%20payment%20proof%20for%20email%20${user.email}.%20TrxID:%20${user?.paymentDetails?.trxId}%20Please%20approve.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Expedite via WhatsApp Support</span>
              </a>
            </div>
          </div>
        )}

        {/* CONDITION 3: User hasn't paid yet (NONE) */}
        {user?.enrolmentStatus === "NONE" && (
          <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-xl shadow-emerald-600/5 p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 fill-emerald-700" />
                  One Step Remaining
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Unlock Full Course Access (Rs. 2,000)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Complete your one-time payment to get instant lifetime access to all 6 modules, templates & WhatsApp group.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through block">Rs. 10,000</span>
                <span className="text-3xl font-black text-emerald-700">Rs. 2,000</span>
              </div>
            </div>

            {/* Payment Details & Accounts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Option 1: EasyPaisa</span>
                <p className="text-sm font-bold text-slate-900">Muhammad Ali</p>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-xs">0300 1234567</span>
                  <button onClick={() => copyText("03001234567", "ep")} className="text-slate-500 hover:text-emerald-600">
                    {copiedKey === "ep" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Option 2: JazzCash</span>
                <p className="text-sm font-bold text-slate-900">Muhammad Ali</p>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-xs">0300 1234567</span>
                  <button onClick={() => copyText("03001234567", "jc")} className="text-slate-500 hover:text-emerald-600">
                    {copiedKey === "jc" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Option 3: Meezan Bank</span>
                <p className="text-sm font-bold text-slate-900">Rastah Academy</p>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-xs">0101 0102 3456 7890</span>
                  <button onClick={() => copyText("0101010234567890", "bk")} className="text-slate-500 hover:text-emerald-600">
                    {copiedKey === "bk" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4 max-w-xl">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Submit Payment Verification:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1">Paid Via</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1">Transaction ID (TID / Ref)</label>
                  <input
                    type="text"
                    required
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. 29384910294"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingPayment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{submittingPayment ? "Submitting..." : "Submit Payment for Approval"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
