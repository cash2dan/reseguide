import React from "react";
import { ChevronRight, Navigation2, CalendarClock, Route as RouteIcon } from "lucide-react";
import { TRIP, DAYS } from "../data/trip";
import { BRAND, GOLD, INK, MIST, MUTE, rgba } from "../lib/palette";
import Weather from "./Weather";

function Stat({ big, small, accent }) {
  return (
    <div className="flex-1 px-2 py-3 rounded-2xl" style={{ background: rgba("#FFFFFF", 0.1) }}>
      <div className="text-center text-white font-extrabold text-xl leading-none">{big}</div>
      <div className="text-center mt-1 text-[10px] uppercase tracking-wider font-semibold" style={{ color: rgba("#FFFFFF", 0.75) }}>{small}</div>
    </div>
  );
}

export default function HomeView({ onOpenDay, todayIdx, daysToDeparture, checklist }) {
  const totalPlan = DAYS.reduce((s, d) => s + d.plan.length, 0);
  const donePlan = DAYS.reduce((s, d) => s + checklist.countFor(`d${d.n}.plan.`), 0);
  const pct = totalPlan ? Math.round((donePlan / totalPlan) * 100) : 0;

  return (
    <div className="animate-day">
      {/* hero */}
      <div className="px-4 pt-4">
        <div className="rounded-3xl overflow-hidden" style={{ background: BRAND }}>
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <RouteIcon size={16} style={{ color: GOLD }} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: rgba("#FFFFFF", 0.7) }}>Reseöversikt</span>
            </div>
            <div className="text-white font-bold text-2xl leading-tight">{TRIP.title}</div>
            <div className="text-[13px] mt-1" style={{ color: rgba("#FFFFFF", 0.85) }}>
              Linköping → Mosel → Alperna → Hamburg → hem
            </div>

            <div className="flex gap-2 mt-4">
              <Stat big="9" small="nätter" />
              <Stat big="4" small="länder" />
              <Stat big="~430" small="mil" />
              <Stat big="2" small="färjor" />
            </div>
          </div>

          {/* today / countdown bar */}
          <button
            onClick={() => todayIdx >= 0 && onOpenDay(todayIdx)}
            className="w-full flex items-center gap-2 px-5 py-3 active:opacity-90"
            style={{ background: rgba("#000000", 0.14) }}
          >
            <CalendarClock size={16} style={{ color: GOLD }} />
            {todayIdx >= 0 ? (
              <>
                <span className="text-[13px] font-semibold text-white">Idag: dag {DAYS[todayIdx].n} · {DAYS[todayIdx].title}</span>
                <ChevronRight size={16} className="ml-auto" style={{ color: rgba("#FFFFFF", 0.8) }} />
              </>
            ) : daysToDeparture > 0 ? (
              <span className="text-[13px] font-semibold text-white">{daysToDeparture} dagar kvar till avresa</span>
            ) : (
              <span className="text-[13px] font-semibold text-white">Resan är genomförd 🏁</span>
            )}
          </button>
        </div>
      </div>

      {/* progress */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] uppercase tracking-wider font-bold" style={{ color: MUTE }}>Avbockat under resan</span>
          <span className="text-[11px] font-bold" style={{ color: BRAND }}>{donePlan}/{totalPlan}</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: MIST }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: GOLD }} />
        </div>
      </div>

      {/* timeline */}
      <div className="px-4 pt-5 pb-2">
        <span className="text-[11px] uppercase tracking-wider font-bold" style={{ color: MUTE }}>Hela resan</span>
      </div>
      <div className="px-4 pb-4">
        {DAYS.map((d, i) => {
          const isToday = i === todayIdx;
          const done = d.plan.length > 0 && checklist.countFor(`d${d.n}.plan.`) === d.plan.length;
          return (
            <button
              key={d.n}
              onClick={() => onOpenDay(i)}
              className="w-full flex items-stretch gap-3 text-left active:scale-[0.99] transition-transform"
            >
              {/* spine + node */}
              <div className="flex flex-col items-center" style={{ width: 34 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-extrabold text-[13px]"
                  style={{ background: d.color, color: "#fff", boxShadow: isToday ? `0 0 0 3px ${rgba(d.color, 0.3)}` : "none" }}>
                  {d.n}
                </div>
                {i < DAYS.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ background: rgba(d.color, 0.3) }} />}
              </div>

              {/* card */}
              <div className="flex-1 mb-2.5 rounded-2xl px-4 py-3" style={{ background: "#fff", border: `1px solid ${MIST}`, borderLeft: `3px solid ${d.color}` }}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: d.color }}>{d.date}</span>
                  {isToday && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: d.color }}>IDAG</span>}
                  {done && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: rgba(d.color, 0.12), color: d.color }}>KLAR</span>}
                  <span className="ml-auto"><Weather coords={d.coords} iso={d.iso} variant="plain" color={MUTE} /></span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold leading-tight truncate" style={{ color: INK }}>{d.title}</div>
                    <div className="text-[11px] truncate" style={{ color: MUTE }}>{d.base}</div>
                  </div>
                  <ChevronRight size={18} style={{ color: MUTE }} className="shrink-0" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
