import React from "react";
import { Check } from "lucide-react";
import { MUTE, rgba } from "../lib/palette";

export default function RouteRail({ days, sel, setSel, todayIdx, checklist }) {
  return (
    <div className="px-3 py-3 overflow-x-auto bg-white" style={{ borderBottom: `1px solid #EAF1EC` }}>
      <div className="flex items-stretch gap-1.5 min-w-max">
        {days.map((d, i) => {
          const active = i === sel;
          const isToday = i === todayIdx;
          const done = checklist && d.plan.length > 0 && checklist.countFor(`d${d.n}.plan.`) === d.plan.length;
          return (
            <button
              key={d.n}
              onClick={() => setSel(i)}
              className="relative flex flex-col items-center px-2.5 py-2 rounded-xl transition-all"
              style={{
                minWidth: 58,
                background: active ? d.color : rgba(d.color, 0.08),
                boxShadow: active ? `0 4px 12px ${rgba(d.color, 0.35)}` : "none",
                border: isToday && !active ? `1.5px solid ${d.color}` : "1.5px solid transparent",
              }}
            >
              {done && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: active ? "#fff" : d.color }}>
                  <Check size={10} strokeWidth={3} color={active ? d.color : "#fff"} />
                </span>
              )}
              <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: active ? "rgba(255,255,255,0.85)" : MUTE }}>Dag</span>
              <span className="text-lg font-extrabold leading-none" style={{ color: active ? "#fff" : d.color }}>{d.n}</span>
              <span className="text-[9px] mt-0.5 font-medium" style={{ color: active ? "rgba(255,255,255,0.85)" : MUTE }}>{d.date.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
