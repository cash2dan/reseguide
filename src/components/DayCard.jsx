import React from "react";
import {
  Anchor, Grape, Bike, Mountain, MountainSnow, Flower2, Castle, Ship, Home, Wine,
  Zap, Clock, MapPin, ExternalLink, Check, BedDouble, Utensils, Lightbulb,
} from "lucide-react";
import { BRAND, INK, MIST, MUTE, rgba } from "../lib/palette";
import Collapsible from "./Collapsible";
import MapButton from "./MapButton";
import Weather from "./Weather";

const ICONS = {
  anchor: Anchor, grape: Grape, bike: Bike, mountain: Mountain,
  "mountain-snow": MountainSnow, flower: Flower2, castle: Castle, ship: Ship, home: Home, wine: Wine,
};

function CheckRow({ id, isChecked, toggle, color, children }) {
  const on = isChecked(id);
  return (
    <button onClick={() => toggle(id)} className="w-full flex gap-3 py-2 text-left">
      <span
        className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors"
        style={{ background: on ? color : "#fff", border: `1.5px solid ${on ? color : MIST}` }}
      >
        {on && <Check size={13} color="#fff" strokeWidth={3} />}
      </span>
      <span className="flex-1" style={{ opacity: on ? 0.5 : 1, textDecoration: on ? "line-through" : "none" }}>
        {children}
      </span>
    </button>
  );
}

export default function DayCard({ day, checklist }) {
  const { isChecked, toggle, countFor } = checklist;
  const Icon = ICONS[day.icon] || Mountain;
  const planDone = countFor(`d${day.n}.plan.`);

  return (
    <>
      {/* banner + stats */}
      <div className="px-4 pt-4">
        <div className="rounded-3xl overflow-hidden shadow-sm" style={{ border: `1px solid ${MIST}` }}>
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: day.color }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: rgba("#FFFFFF", 0.16) }}>
              <Icon size={24} color="#fff" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: rgba("#FFFFFF", 0.82) }}>Dag {day.n} · {day.date}</div>
              <div className="text-white font-bold text-[17px] leading-tight mt-0.5">{day.title}</div>
            </div>
            <Weather coords={day.coords} iso={day.iso} variant="banner" linked />
          </div>
          <div className="grid grid-cols-3 bg-white">
            {[["Körning", day.drive], ["Bas", day.base], ["Karaktär", day.vibe]].map(([l, v], i) => (
              <div key={l} className="px-3 py-3" style={{ borderLeft: i === 0 ? "none" : `1px solid ${MIST}` }}>
                <div className="text-[9px] uppercase tracking-wider font-bold mb-1" style={{ color: day.color }}>{l}</div>
                <div className="text-[11px] leading-snug" style={{ color: INK }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* accommodation */}
      {day.stay && (
        <div className="px-4 pt-4">
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ border: `1px solid ${MIST}`, background: "#fff" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: rgba(day.color, 0.12) }}>
              <BedDouble size={18} style={{ color: day.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] uppercase tracking-wider font-bold" style={{ color: day.color }}>Boende</div>
              <div className="text-[13px] font-semibold leading-tight" style={{ color: INK }}>{day.stay.name}</div>
              <div className="flex items-center gap-1 text-[11px] mt-0.5" style={{ color: MUTE }}>
                <Utensils size={11} /> {day.stay.meal}
              </div>
            </div>
            <a href={day.stay.map} target="_blank" rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-2 rounded-full active:scale-95 transition-transform"
              style={{ background: rgba(day.color, 0.1), color: day.color }}>
              <MapPin size={12} /> Karta
            </a>
          </div>
        </div>
      )}

      {/* map button */}
      <div className="px-4 pt-4">
        <MapButton url={day.map} label={day.mapLabel} color={day.color} />
      </div>

      {/* note */}
      {day.note && (
        <div className="px-4 pt-4">
          <div className="rounded-2xl px-4 py-3 text-[13px] leading-relaxed" style={{ background: rgba("#B08D57", 0.12), border: `1px solid ${rgba("#B08D57", 0.4)}`, color: INK }}>
            {day.note}
          </div>
        </div>
      )}

      {/* stacks */}
      <div className="px-4 pt-4 space-y-3">
        {day.legs && (
          <Collapsible label="Körschema · etapp för etapp" icon={Zap} color={day.color} openDefault>
            <div className="space-y-2.5">
              {day.legs.map((lg, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: day.color }} />
                    {i < day.legs.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ background: rgba(day.color, 0.25) }} />}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="text-[13px] font-semibold" style={{ color: INK }}>{lg.a} <span style={{ color: MUTE }}>→ {lg.b}</span></div>
                    <div className="text-[11px] mt-0.5" style={{ color: MUTE }}>{lg.road}</div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[11px] font-medium" style={{ color: INK }}>{lg.dt}</span>
                      {lg.chg !== "—" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: rgba(day.color, 0.1), color: day.color }}>
                          <Zap size={10} /> {lg.chg}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>
        )}

        <Collapsible label="Se & tänka på" icon={MapPin} color={day.color} openDefault>
          <ul className="space-y-2">
            {day.see.map((s, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-relaxed" style={{ color: INK }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: day.color }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Collapsible>

        {day.tips && (
          <Collapsible label="Tips & alternativ" icon={Lightbulb} color={day.color}>
            <div className="text-[11px] mb-2" style={{ color: MUTE }}>Välj efter väder och lust</div>
            <div className="space-y-3">
              {day.tips.map((t, i) => (
                <div key={i} style={{ paddingBottom: i < day.tips.length - 1 ? 10 : 0, borderBottom: i < day.tips.length - 1 ? `1px solid ${MIST}` : "none" }}>
                  <div className="text-[13px] font-semibold" style={{ color: INK }}>{t.name}</div>
                  <div className="text-[12px] mt-0.5 leading-relaxed" style={{ color: MUTE }}>{t.desc}</div>
                  {t.links && t.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {t.links.map(([tx, u]) => (
                        <a key={u} href={u} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full active:scale-95 transition-transform"
                          style={{ background: rgba(day.color, 0.08), color: day.color }}>
                          <ExternalLink size={11} /> {tx}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Collapsible>
        )}

        <Collapsible
          label="Dagsprogram"
          icon={Clock}
          color={day.color}
          right={
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: rgba(day.color, 0.12), color: day.color }}>
              {planDone}/{day.plan.length}
            </span>
          }
        >
          <div className="text-[11px] mb-1" style={{ color: MUTE }}>Tryck för att bocka av under dagen</div>
          <div>
            {day.plan.map(([t, p], i) => (
              <div key={i} style={{ borderBottom: i < day.plan.length - 1 ? `1px solid ${MIST}` : "none" }}>
                <CheckRow id={`d${day.n}.plan.${i}`} isChecked={isChecked} toggle={toggle} color={day.color}>
                  <span className="flex gap-3">
                    <span className="text-[12px] font-bold w-24 shrink-0" style={{ color: day.color }}>{t}</span>
                    <span className="text-[12px]" style={{ color: INK }}>{p}</span>
                  </span>
                </CheckRow>
              </div>
            ))}
          </div>
        </Collapsible>

        <div className="flex flex-wrap gap-2 pt-1">
          {day.links.map(([t, u]) => (
            <a key={u} href={u} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full active:scale-95 transition-transform"
              style={{ background: "#fff", border: `1px solid ${MIST}`, color: BRAND }}>
              <ExternalLink size={12} /> {t}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
