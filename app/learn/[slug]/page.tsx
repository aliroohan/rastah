"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronDown, 
  CheckCircle, 
  Play, 
  Download, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Menu,
  X,
  FileText,
  ShieldCheck
} from "lucide-react";
import SessionGuard from "@/app/components/lms/SessionGuard";
import HlsPlayer from "@/app/components/lms/HlsPlayer";
import { DEFAULT_COURSE, ILesson } from "@/lib/models/Course";

interface LearnPageProps {
  params: Promise<{ slug: string }>;
}

export default function LearnPage({ params }: LearnPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active lesson
  const [activeLesson, setActiveLesson] = useState<ILesson>(
    DEFAULT_COURSE.modules[0].lessons[0]
  );

  // Progress
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [openModules, setOpenModules] = useState<number[]>([1]);

  useEffect(() => {
    const fetchUserAndProgress = async () => {
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

        // Access check
        if (data.user.enrolmentStatus !== "ACTIVE") {
          router.push("/dashboard");
          return;
        }
        setUser(data.user);

        // Fetch user progress
        const progRes = await fetch(`/api/progress?courseSlug=${resolvedParams.slug}`);
        if (progRes.ok) {
          const progData = await progRes.json();
          setCompletedLessonIds(progData.completedLessonIds || []);

          // Restore last watched lesson if available
          if (progData.lastWatchedLessonId) {
            for (const mod of DEFAULT_COURSE.modules) {
              const found = mod.lessons.find((l) => l.id === progData.lastWatchedLessonId);
              if (found) {
                setActiveLesson(found);
                setOpenModules((prev) => [...new Set([...prev, mod.moduleNumber])]);
                break;
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load classroom:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProgress();
  }, [resolvedParams.slug, router]);

  // Toggle module open/close in sidebar
  const toggleModuleAccordion = (num: number) => {
    setOpenModules((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  // Select a lesson
  const handleSelectLesson = async (lesson: ILesson, moduleNumber: number) => {
    setActiveLesson(lesson);
    setSidebarOpen(false);

    // Update last watched lesson on backend
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: resolvedParams.slug,
          lessonId: lesson.id,
          markCompleted: false,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Mark active lesson as completed
  const handleMarkCompleted = async () => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: resolvedParams.slug,
          lessonId: activeLesson.id,
          markCompleted: true,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCompletedLessonIds(data.completedLessonIds);

        // Auto advance to next lesson if available
        goToNextLesson();
      }
    } catch (err) {
      console.error("Error marking completed:", err);
    }
  };

  // Helper to find all lessons flat
  const allLessons = DEFAULT_COURSE.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const goToNextLesson = () => {
    if (nextLesson) {
      setActiveLesson(nextLesson);
    }
  };

  const goToPrevLesson = () => {
    if (prevLesson) {
      setActiveLesson(prevLesson);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
        Loading Classroom...
      </div>
    );
  }

  const isCurrentCompleted = completedLessonIds.includes(activeLesson.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Concurrency guard */}
      <SessionGuard />

      {/* Classroom Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <h1 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
              {DEFAULT_COURSE.title}
            </h1>
            <p className="text-[11px] text-emerald-700 font-semibold hidden sm:block">
              {activeLesson.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-xs font-bold text-slate-700 block">Student: {user?.name}</span>
            <span className="text-[11px] text-emerald-600 font-mono font-semibold">{user?.whatsapp}</span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            aria-label="Toggle modules syllabus"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left / Drawer Sidebar: Course Sections & Modules */}
        <aside
          className={`fixed inset-y-16 left-0 z-30 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Curriculum</h2>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {completedLessonIds.length} of {allLessons.length} Lessons Completed
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {DEFAULT_COURSE.modules.map((mod) => {
              const isOpen = openModules.includes(mod.moduleNumber);
              const modCompletedCount = mod.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;

              return (
                <div key={mod.moduleNumber} className="border-b border-slate-100">
                  <button
                    onClick={() => toggleModuleAccordion(mod.moduleNumber)}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
                        Module {mod.moduleNumber}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {mod.title.replace(/^Module \d+:\s*/, "")}
                      </h3>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {modCompletedCount}/{mod.lessons.length} Completed
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="bg-slate-50/70 py-1 space-y-0.5">
                      {mod.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLesson.id;
                        const isCompleted = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson, mod.moduleNumber)}
                            className={`w-full px-4 py-2.5 flex items-start gap-2.5 text-left text-xs transition-colors ${
                              isActive
                                ? "bg-emerald-100/70 text-emerald-900 font-bold border-l-4 border-emerald-600"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                              ) : isActive ? (
                                <Play className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-300" />
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <p className="line-clamp-2">{lesson.title}</p>
                              <span className="text-[10px] text-slate-400 font-normal">{lesson.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center / Main Area: Protected Hls Video Player & Lesson Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Protected Video Player with Student Phone Watermark */}
            <div className="space-y-3">
              <HlsPlayer
                videoUrl={activeLesson.videoHlsUrl}
                studentIdentity={user?.whatsapp || user?.email}
                onEnded={handleMarkCompleted}
              />
            </div>

            {/* Lesson Title & Completion Controls */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Lesson {activeLesson.lessonNumber} • {activeLesson.duration}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeLesson.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleMarkCompleted}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer ${
                    isCurrentCompleted
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isCurrentCompleted ? "Completed ✓" : "Mark as Complete & Next"}</span>
                </button>
              </div>
            </div>

            {/* Lesson Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Lesson Overview:
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeLesson.summary}
              </p>

              {/* Downloadable Resources */}
              {activeLesson.resources && activeLesson.resources.length > 0 && (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Lesson Attachments & Resources:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 text-xs font-semibold transition-colors"
                      >
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>{res.title}</span>
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons: Previous / Next Lesson */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={goToPrevLesson}
                disabled={!prevLesson}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                onClick={goToNextLesson}
                disabled={!nextLesson}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}
