"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, MessageCircle, ShieldCheck, RefreshCw, UserCheck, Search, ArrowLeft } from "lucide-react";

export default function AdminEnrolmentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "ACTIVE">("PENDING");
  const [searchTerm, setSearchTerm] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/enrolments", {
        headers: { "x-admin-key": "rastah_admin_secret_2026" },
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAction = async (userId: string, action: "APPROVE" | "REJECT") => {
    setProcessingId(userId);
    try {
      const res = await fetch("/api/admin/enrolments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "rastah_admin_secret_2026",
        },
        body: JSON.stringify({ userId, action }),
      });
      if (res.ok) {
        await fetchStudents();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = students.filter((s) => {
    const matchesFilter =
      filter === "ALL"
        ? true
        : filter === "PENDING"
        ? s.enrolmentStatus === "PENDING_VERIFICATION"
        : s.enrolmentStatus === "ACTIVE";

    const matchesSearch =
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.whatsapp?.includes(searchTerm) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.paymentDetails?.trxId?.includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
              👑
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900">Rastah Admin Portal</h1>
              <p className="text-xs text-slate-500">Student Payment & Enrolment Approvals (Rs. 2,000)</p>
            </div>
          </div>

          <button
            onClick={fetchStudents}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {[
              { key: "PENDING", label: "Pending Verification" },
              { key: "ACTIVE", label: "Active Students" },
              { key: "ALL", label: "All Records" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.key
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search name, phone, Trx ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        {/* Table of Students */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">WhatsApp / Email</th>
                  <th className="px-5 py-3.5">Payment Details</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                      No records found matching this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => {
                    const isPending = s.enrolmentStatus === "PENDING_VERIFICATION";
                    const isActive = s.enrolmentStatus === "ACTIVE";

                    return (
                      <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                          <span className="text-[10px] text-slate-400">
                            Joined: {new Date(s.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-mono text-slate-900 font-bold">{s.whatsapp}</p>
                          <p className="text-slate-500 text-[11px]">{s.email}</p>
                        </td>

                        <td className="px-5 py-4">
                          {s.paymentDetails?.trxId ? (
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-800 block">
                                {s.paymentDetails.method} • Rs. 2,000
                              </span>
                              <span className="font-mono text-emerald-700 text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-bold">
                                Trx: {s.paymentDetails.trxId}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">No Trx ID submitted yet</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                              Active
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold animate-pulse">
                              Pending Review
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                              Unpaid
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right space-x-2">
                          {/* Approve Button */}
                          {!isActive && (
                            <button
                              onClick={() => handleAction(s._id, "APPROVE")}
                              disabled={processingId === s._id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve (Rs. 2k)</span>
                            </button>
                          )}

                          {/* WhatsApp Direct Chat Button */}
                          <a
                            href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=Salam%20${encodeURIComponent(
                              s.name
                            )}!%20Aapka%20Rastah%20E-Commerce%20Masterclass%20course%20access%20activate%20kar%20diya%20gaya%20hai.%20Aap%20http://localhost:3001/login%20par%20apne%20credentials%20se%20log%20in%20kar%20ke%20videos%20start%20kar%20sakte%20hain.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
