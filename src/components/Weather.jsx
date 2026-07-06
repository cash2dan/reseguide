import React from "react";
import {
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
} from "lucide-react";
import { useWeather } from "../hooks/useWeather";
import { rgba, MUTE } from "../lib/palette";

function iconFor(code) {
  if (code === 0) return Sun;
  if (code === 1 || code === 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code === 45 || code === 48) return CloudFog;
  if ([51, 53, 55, 56, 57].includes(code)) return CloudDrizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow;
  if ([95, 96, 99].includes(code)) return CloudLightning;
  return Cloud;
}

function weatherUrl(coords) {
  return `https://www.yr.no/en/forecast/daily-table/${coords[0]},${coords[1]}`;
}

// variant: "banner" (white on colored bg) or "plain" (colored on light bg)
export default function Weather({ coords, iso, variant = "banner", color, linked = false }) {
  const { loading, data } = useWeather(coords, iso);
  if (loading || !data) return null;
  const Icon = iconFor(data.code);

  if (variant === "plain") {
    const c = color || MUTE;
    return (
      <span className="inline-flex items-center gap-1">
        <Icon size={13} style={{ color: c }} />
        <span className="text-[11px] font-semibold" style={{ color: c }}>
          {data.tmax}°<span style={{ opacity: 0.6 }}>/{data.tmin}°</span>
        </span>
      </span>
    );
  }

  const content = (
    <>
      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: rgba("#FFFFFF", 0.18) }}>
        <Icon size={20} color="#fff" />
      </span>
      <span className="text-left leading-none">
        <span className="block text-[9px] uppercase tracking-wider font-bold text-white" style={{ opacity: 0.78 }}>Väder</span>
        <span className="block text-[15px] font-extrabold text-white mt-0.5">
          {data.tmax}°<span style={{ opacity: 0.75 }}>/{data.tmin}°</span>
        </span>
      </span>
    </>
  );
  const className = "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-2xl shrink-0 active:scale-95 transition-transform";
  const style = { background: rgba("#000000", 0.18), boxShadow: `0 4px 12px ${rgba("#000000", 0.12)}` };

  if (linked) {
    return (
      <a href={weatherUrl(coords)} target="_blank" rel="noopener noreferrer" className={className} style={style} title="Öppna detaljerad väderprognos">
        {content}
      </a>
    );
  }

  return (
    <span className={className} style={style}>
      {content}
    </span>
  );
}
