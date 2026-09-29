"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LogIn } from "lucide-react";

export default function SessionGuard() {
  const router = useRouter();
  const [sessionTerminated, setSessionTerminated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const res = await fetch("/api/session/verify", { cache: "no-store" });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (data.code === "CONCURRENT_DEVICE_LOGIN") {
            if (isMounted) {
              setSessionTerminated(true);
            }
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
      }
    };

    // Check on mount and periodically every 20 seconds
    checkSession();
    const interval = setInterval(checkSession, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!sessionTerminated) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-red-200 shadow-2xl max-w-md w-full p-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-slate-900">
            Account Logged Out
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Someone else has logged into your Rastah account from another device or browser. To maintain account security, this active session has been terminated.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => router.push("/login?reason=concurrent_device")}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
