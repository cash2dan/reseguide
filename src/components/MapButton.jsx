import React from "react";
import { Navigation, ExternalLink } from "lucide-react";
import { rgba } from "../lib/palette";

export default function MapButton({ url, label, color }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl active:scale-[0.98] transition-transform"
      style={{ background: color, boxShadow: `0 6px 16px ${rgba(color, 0.32)}` }}
    >
      <Navigation size={22} color="#fff" fill="#fff" />
      <div className="flex-1 text-left">
        <div className="text-white font-bold text-sm">Öppna rutten i Maps</div>
        <div className="text-[11px] leading-snug" style={{ color: rgba("#FFFFFF", 0.85) }}>{label}</div>
      </div>
      <ExternalLink size={18} color="#fff" />
    </a>
  );
}
