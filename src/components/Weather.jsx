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

// variant: "banner" (white on colored bg) or "plain" (colored on light bg)
export default function Weather({ coords, iso, variant = "banner", color }) {
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

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full shrink-0" style={{ background: rgba("#FFFFFF", 0.18) }}>
      <Icon size={14} color="#fff" />
      <span className="text-[12px] font-bold text-white">
        {data.tmax}°<span style={{ opacity: 0.75 }}>/{data.tmin}°</span>
      </span>
    </span>
  );
}
