import React from "react";
import { Grape, MapPin, ExternalLink, CalendarCheck, Globe } from "lucide-react";
import { INK, MIST, MUTE, rgba } from "../lib/palette";
import Collapsible from "./Collapsible";

export default function WineryList({ wineries, allMap, color }) {
  if (!wineries || !wineries.length) return null;
  return (
    <Collapsible label="Vinproducenter att besöka" icon={Grape} color={color}>
      <div className="text-[11px] mb-2" style={{ color: MUTE }}>Utvalda gårdar i och runt Bernkastel – välj efter hur spontana ni vill vara</div>

      <a href={allMap} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl mb-3 active:scale-[0.98] transition-transform"
        style={{ background: color, boxShadow: `0 4px 10px ${rgba(color, 0.3)}` }}>
        <MapPin size={16} color="#fff" />
        <span className="text-[12px] font-bold text-white flex-1 text-left">Visa alla på karta</span>
        <ExternalLink size={14} color="#fff" />
      </a>

      <div className="space-y-2.5">
        {wineries.map((w, i) => (
          <div key={i} className="rounded-xl px-3 py-2.5" style={{ background: "#fff", border: `1px solid ${MIST}` }}>
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[13px] font-bold" style={{ color: INK }}>{w.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: rgba(color, 0.1), color }}>{w.village}</span>
                </div>
                <div className="text-[12px] mt-1 leading-relaxed" style={{ color: MUTE }}>{w.note}</div>
                <div className="flex items-center gap-1 mt-1.5 text-[11px] font-medium" style={{ color: w.appt ? "#B08D57" : "#3B7A6E" }}>
                  <CalendarCheck size={11} /> {w.appt ? "Bokning krävs" : "Drop-in möjligt"}
                </div>
              </div>
              <a href={w.map} target="_blank" rel="noopener noreferrer"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                style={{ background: rgba(color, 0.1) }} title="Visa på karta">
                <MapPin size={15} style={{ color }} />
              </a>
            </div>
            {w.web && (
              <a href={w.web} target="_blank" rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-full active:scale-95 transition-transform"
                style={{ background: rgba(color, 0.08), color }}>
                <Globe size={12} /> Läs mer & boka
              </a>
            )}
          </div>
        ))}
      </div>
    </Collapsible>
  );
}
