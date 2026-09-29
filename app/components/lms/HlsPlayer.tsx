"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import { 
  Play, 
  Pause, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw,
  Settings, 
  Check, 
  ShieldCheck,
  Gauge
} from "lucide-react";

interface HlsPlayerProps {
  videoUrl: string;
  studentIdentity: string; // Phone number or email for dynamic watermark
  onEnded?: () => void;
}

interface QualityLevel {
  height: number;
  index: number;
  label: string;
}

export default function HlsPlayer({ videoUrl, studentIdentity, onEnded }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Quality & Speed menus
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = Auto
  const [showSettingsMenu, setShowSettingsMenu] = useState<"none" | "speed" | "quality">("none");

  // Dynamic floating watermark position
  const [watermarkPos, setWatermarkPos] = useState({ top: "25%", left: "20%" });

  // Floating watermark position shifter
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 60 + 15) + "%";
      const left = Math.floor(Math.random() * 55 + 15) + "%";
      setWatermarkPos({ top, left });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Format time (seconds -> MM:SS or HH:MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    const pad = (n: number) => n.toString().padStart(2, "0");
    if (hours > 0) {
      return `${hours}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  // Initialize HLS & Video Stream
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Extract available stream qualities
        if (hls && hls.levels && hls.levels.length > 0) {
          const levels: QualityLevel[] = hls.levels.map((lvl, index) => ({
            height: lvl.height,
            index,
            label: lvl.height ? `${lvl.height}p` : `Level ${index + 1}`,
          }));
          // Sort highest resolution first
          levels.sort((a, b) => b.height - a.height);
          setQualityLevels(levels);
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        if (hls?.autoLevelEnabled) {
          setCurrentQuality(-1);
        } else {
          setCurrentQuality(data.level);
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS for Safari/iOS
      video.src = videoUrl;
    }

    return () => {
      if (hls) {
        hls.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl]);

  // Video playback listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const onDurationChange = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEndedInternal = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEndedInternal);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEndedInternal);
    };
  }, [onEnded]);

  // Controls auto-hide on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSettingsMenu("none");
      }, 3200);
    }
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  // Seek forward / backward
  const seekRelative = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  // Scrubber change
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  // Volume & Mute
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Speed change
  const handleSpeedSelect = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettingsMenu("none");
  };

  // Quality change (HLS Level)
  const handleQualitySelect = (levelIndex: number) => {
    setCurrentQuality(levelIndex);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex; // -1 for Auto
    }
    setShowSettingsMenu("none");
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Keyboard Shortcuts & Anti-Inspection hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Anti-inspection (F12, Ctrl+Shift+I, Ctrl+U)
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return;
      }

      // Avoid shortcut triggers when typing in an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekRelative(-10);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekRelative(10);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay]);

  const speedOptions = [0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 select-none group"
    >
      {/* HTML5 Video element (Custom Controls Only, no native browser controls) */}
      <video
        ref={videoRef}
        onClick={togglePlay}
        playsInline
        disablePictureInPicture
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Dynamic Floating Anti-Piracy Watermark */}
      <div
        style={{
          top: watermarkPos.top,
          left: watermarkPos.left,
          transition: "top 2.5s ease-in-out, left 2.5s ease-in-out",
        }}
        className="absolute pointer-events-none z-30 select-none opacity-35 font-mono text-xs sm:text-sm font-bold text-white bg-black/50 px-3.5 py-1 rounded-full border border-white/20 backdrop-blur-xs tracking-wider shadow-sm"
      >
        <span>Rastah LMS • {studentIdentity || "Active Student"}</span>
      </div>

      {/* Protected Stream Status Pill (Top Right) */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-2">
        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted HLS Stream</span>
        </div>
      </div>

      {/* Center Big Play/Pause Splash Button */}
      {(!isPlaying || showControls) && (
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition-all duration-200 transform active:scale-90 z-20 cursor-pointer ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </button>
      )}

      {/* Settings Popover Menu (Speed / Quality) */}
      {showSettingsMenu !== "none" && (
        <div className="absolute bottom-20 right-6 z-40 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md text-white rounded-2xl p-3 shadow-2xl min-w-[170px] animate-fadeIn text-xs space-y-2">
          {/* Speed Menu */}
          {showSettingsMenu === "speed" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Playback Speed</span>
                <button
                  onClick={() => setShowSettingsMenu("none")}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedSelect(speed)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left font-semibold transition-colors cursor-pointer"
                >
                  <span>{speed === 1 ? "1.0x (Normal)" : `${speed}x`}</span>
                  {playbackSpeed === speed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}

          {/* Quality Menu */}
          {showSettingsMenu === "quality" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Video Quality</span>
                <button
                  onClick={() => setShowSettingsMenu("none")}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <button
                onClick={() => handleQualitySelect(-1)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left font-semibold transition-colors cursor-pointer"
              >
                <span>Auto (Adaptive)</span>
                {currentQuality === -1 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              {qualityLevels.map((lvl) => (
                <button
                  key={lvl.index}
                  onClick={() => handleQualitySelect(lvl.index)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left font-semibold transition-colors cursor-pointer"
                >
                  <span>{lvl.label}</span>
                  {currentQuality === lvl.index && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 z-30 pt-10 pb-4 px-4 sm:px-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-3 max-w-5xl mx-auto">
          
          {/* Scrubber / Progress Bar */}
          <div className="relative group/scrub flex items-center cursor-pointer">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleScrub}
              className="w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-emerald-500 transition-all z-20"
            />
            {/* Buffer Progress bar behind */}
            <div
              style={{ width: `${(buffered / (duration || 1)) * 100}%` }}
              className="absolute left-0 h-1.5 bg-white/30 rounded-full pointer-events-none z-10"
            />
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between text-white text-xs font-semibold gap-2 sm:gap-4">
            
            {/* Left Controls: Play/Pause, Rewind, Forward, Volume, Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              {/* 10s Rewind */}
              <button
                onClick={() => seekRelative(-10)}
                title="Rewind 10 seconds (Left Arrow)"
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer hidden sm:block"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* 10s Fast Forward */}
              <button
                onClick={() => seekRelative(10)}
                title="Forward 10 seconds (Right Arrow)"
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer hidden sm:block"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Volume & Slider */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 rounded-full appearance-none accent-emerald-400 cursor-pointer hidden sm:block"
                />
              </div>

              {/* Time Display */}
              <span className="font-mono text-[11px] sm:text-xs text-slate-300 pl-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls: Speed, Quality, Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2 relative">
              
              {/* Speed Selector Button */}
              <button
                onClick={() =>
                  setShowSettingsMenu(showSettingsMenu === "speed" ? "none" : "speed")
                }
                title="Playback Speed"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  showSettingsMenu === "speed"
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-white/10 hover:bg-white/20 border-white/15 text-slate-200"
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{playbackSpeed}x</span>
              </button>

              {/* Quality Selector Button */}
              <button
                onClick={() =>
                  setShowSettingsMenu(showSettingsMenu === "quality" ? "none" : "quality")
                }
                title="Video Quality"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  showSettingsMenu === "quality"
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-white/10 hover:bg-white/20 border-white/15 text-slate-200"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>
                  {currentQuality === -1
                    ? "Auto"
                    : qualityLevels.find((q) => q.index === currentQuality)?.label || "Auto"}
                </span>
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
