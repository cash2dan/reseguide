import React, { useState, useMemo } from "react";
import { Route, WifiOff } from "lucide-react";
import { TRIP, DAYS } from "./data/trip";
import { BRAND, PAPER, INK, MIST, MUTE, rgba } from "./lib/palette";
import RouteRail from "./components/RouteRail";
import DayCard from "./components/DayCard";
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

  const [sel, setSel] = useState(todayIdx >= 0 ? todayIdx : 0);
  const day = DAYS[sel];

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: PAPER, color: INK, fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <div className="w-full max-w-md pb-10">

        <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: BRAND, paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
          <div className="flex items-center gap-2">
            <Route size={18} style={{ color: "#B08D57" }} />
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: rgba("#FFFFFF", 0.7) }}>{TRIP.title}</div>
              <div className="text-base font-bold text-white leading-tight">{TRIP.subtitle}</div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: rgba("#FFFFFF", 0.14), color: "#FFF" }}>
              <WifiOff size={12} /> Offline-ok
            </span>
          </div>
          {todayIdx >= 0 ? (
            <div className="mt-3 text-xs font-medium text-white" style={{ opacity: 0.9 }}>Idag: dag {DAYS[todayIdx].n} · {DAYS[todayIdx].title}</div>
          ) : daysToDeparture > 0 ? (
            <div className="mt-3 text-xs font-medium text-white" style={{ opacity: 0.9 }}>{daysToDeparture} dagar kvar till avresa</div>
          ) : null}
        </div>

        <RouteRail days={DAYS} sel={sel} setSel={setSel} todayIdx={todayIdx} />

        <DayCard key={day.n} day={day} checklist={checklist} />

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

      </div>
    </div>
  );
}
