import React, { useState, useMemo } from "react";
import { Route, WifiOff, LayoutGrid, Share2, ChevronLeft } from "lucide-react";
import { TRIP, DAYS } from "./data/trip";
import { BRAND, PAPER, INK, MIST, MUTE, GOLD, rgba } from "./lib/palette";
import RouteRail from "./components/RouteRail";
import DayCard from "./components/DayCard";
import HomeView from "./components/HomeView";
import { useChecklist } from "./hooks/useChecklist";

export default function App() {
  const checklist = useChecklist();

  const today = useMemo(() => new Date(), []);
  const todayIdx = useMemo(() => {
    const iso = today.toISOString().slice(0, 10);
    return DAYS.findIndex((d) => d.iso === iso);
  }, [today]);
  const daysToDeparture = useMemo(() => {
    const dep = new Date(TRIP.departISO + "T00:00:00");
    return Math.ceil((dep - today) / 86400000);
  }, [today]);

  const [view, setView] = useState("home"); // "home" | "day"
  const [sel, setSel] = useState(todayIdx >= 0 ? todayIdx : 0);
  const day = DAYS[sel];

  const openDay = (i) => { setSel(i); setView("day"); };

  const onShare = async () => {
    const url = "https://cash2dan.github.io/reseguide/";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Reseguide – Europa 2026", text: "Vår bilsemester i Europa 10–19 juli 2026", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Länk kopierad till urklipp!");
      }
    } catch (e) { /* user cancelled */ }
  };

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: PAPER, color: INK, fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <div className="w-full max-w-md pb-10">

        {/* sticky header */}
        <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: BRAND, paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
          <div className="flex items-center gap-2">
            {view === "day" ? (
              <button onClick={() => setView("home")} className="flex items-center justify-center w-8 h-8 rounded-full active:scale-95 transition-transform" style={{ background: rgba("#FFFFFF", 0.14) }}>
                <ChevronLeft size={18} color="#fff" />
              </button>
            ) : (
              <Route size={18} style={{ color: GOLD }} />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-[0.2em] truncate" style={{ color: rgba("#FFFFFF", 0.7) }}>{TRIP.title}</div>
              <div className="text-base font-bold text-white leading-tight truncate">{TRIP.subtitle}</div>
            </div>
            {view === "day" ? (
              <button onClick={() => setView("home")} className="flex items-center justify-center w-8 h-8 rounded-full active:scale-95 transition-transform" style={{ background: rgba("#FFFFFF", 0.14) }} title="Översikt">
                <LayoutGrid size={16} color="#fff" />
              </button>
            ) : (
              <button onClick={onShare} className="flex items-center justify-center w-8 h-8 rounded-full active:scale-95 transition-transform" style={{ background: rgba("#FFFFFF", 0.14) }} title="Dela">
                <Share2 size={16} color="#fff" />
              </button>
            )}
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: rgba("#FFFFFF", 0.14), color: "#FFF" }}>
              <WifiOff size={12} /> Offline
            </span>
          </div>
        </div>

        {view === "home" ? (
          <HomeView onOpenDay={openDay} todayIdx={todayIdx} daysToDeparture={daysToDeparture} checklist={checklist} />
        ) : (
          <>
            <RouteRail days={DAYS} sel={sel} setSel={setSel} todayIdx={todayIdx} checklist={checklist} />

            <div className="animate-day" key={day.n}>
              <DayCard day={day} checklist={checklist} />
            </div>

            <div className="flex items-center justify-between px-4 pt-6">
              <button
                onClick={() => setSel((s) => Math.max(0, s - 1))}
                disabled={sel === 0}
                className="text-sm font-semibold px-4 py-2 rounded-full disabled:opacity-30"
                style={{ background: "#fff", border: `1px solid ${MIST}`, color: INK }}
              >← Föregående</button>
              <span className="text-xs font-medium" style={{ color: MUTE }}>{sel + 1} / {DAYS.length}</span>
              <button
                onClick={() => setSel((s) => Math.min(DAYS.length - 1, s + 1))}
                disabled={sel === DAYS.length - 1}
                className="text-sm font-semibold px-4 py-2 rounded-full disabled:opacity-30"
                style={{ background: BRAND, color: "#fff" }}
              >Nästa →</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
