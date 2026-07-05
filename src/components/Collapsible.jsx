import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { INK, MIST, MUTE, rgba } from "../lib/palette";

export default function Collapsible({ label, icon: Ico, color, children, openDefault = false, right = null }) {
  const [open, setOpen] = useState(openDefault);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${MIST}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-4 py-3"
        style={{ background: rgba(color, 0.07) }}
      >
        <Ico size={17} style={{ color }} />
        <span className="text-sm font-semibold tracking-wide" style={{ color: INK }}>{label}</span>
        {right && <span className="ml-1">{right}</span>}
        <ChevronDown
          size={18}
          className="ml-auto transition-transform"
          style={{ color: MUTE, transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && <div className="px-4 py-3 bg-white">{children}</div>}
    </div>
  );
}
